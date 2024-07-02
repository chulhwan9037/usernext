"use client";
import { useContext, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';

function WriteTrade() {
    const menuStore = useContext(MenuContext)
    const userInfo = menuStore.userInfo;
    

    const [formState, setFormState] = useState({
        id: userInfo.id,
        pw: '',
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleContentChange = (event, editor) => {
        const data = editor.getData();
        setFormState((prevState) => ({
            ...prevState,
            content: data
        }));
    };

    const handleSubmit = async (e, menu) => {
        e.preventDefault();
        menuStore.setSelectedMenu(menu);
        if (menu === 'tradelist'){
        try {
            // 데이터 저장 요청
            const postResponse = await axios.post('/api/writeTrade', formState);
            console.log('데이터 저장 성공:', postResponse.data);
    
            // 저장 후 데이터 조회 요청
            const getResponse = await axios.get('/api/tradeboard', {
                headers: {
                    Authorization: `Bearer ${menuStore.token}`
                }
            });
    
            // 조회한 데이터 상태 업데이트
            menuStore.setTradeList(getResponse.data);
        } catch (error) {
            console.error('데이터 저장 오류:', error);
        }
        }
    };
    

    const handleBack = async (e, menu) => {
        e.preventDefault();
        menuStore.setSelectedMenu(menu);
        if (menu === 'tradelist'){
            try {
                const response = await axios.get('/api/tradeboard', {
                headers: {
                    Authorization: `Bearer ${menuStore.token}`
                }
            });
                menuStore.setTradeList(response.data);
            } catch (error) {
                console.error("데이터 저장 오류:", error)
            }
        }
    };

    const editorConfiguration = {
        ckfinder: {
            uploadUrl: '/api/upload' // 파일 업로드 엔드포인트 설정
        },
        height: '400px' // 높이 조절
    };

    const initialText = '<p>내용을 입력하세요...</p>';

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                글쓰기 페이지
            </Typography>
            <form onSubmit={(e) => handleSubmit(e, 'tradelist')}> 
                <TextField type="text" name="id" label="ID" value={userInfo.id} fullWidth margin="normal" required readOnly />
                <TextField type="password" name="pw" label="Password" value={formState.pw} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="text" name="title" label="제목" value={formState.title} onChange={handleChange} fullWidth margin="normal" required />
                <CKEditor
                    name="content"
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    data={initialText}
                    onChange={handleContentChange}
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    작성 완료
                </Button>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={(e) => handleBack(e, 'tradelist')}>돌아가기</Button>
            </form>
        </Container>
    );
}
export default observer(WriteTrade);