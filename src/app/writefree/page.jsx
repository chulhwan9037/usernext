"use client"
import { useContext, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { MenuContext } from '@/stores/StoreContext';

export default function WriteFree() {

    const menuStore = useContext(MenuContext)
    const [formState, setFormState] = useState({
        id: '',
        pw: '',
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e, menu) => {
        e.preventDefault(); 
        menuStore.setSelectedMenu(menu);
        if(menu === 'guestlist'){
        try {
            const response = await axios.post('/api/writeFreeboard', formState);
            console.log('데이터 저장 성공:', response.data);

            const getresponse = await axios.get('/api/freeBoard',{
                headers :{
                    Authorization:  `Bearer ${menuStore.token}`
                }
            });
            menuStore.setGuestList(getresponse.data)
        } catch (error) {
            console.error('데이터 저장 오류:', error);
        }
    }
    };

    const handleBack = async (e, menu) => {
        e.preventDefault();
        menuStore.setSelectedMenu(menu);
        if (menu === 'guestlist'){
            try {
                const response = await axios.get('/api/freeBoard', {
                headers: {
                    Authorization: `Bearer ${menuStore.token}`
                }
            });
                menuStore.setGuestList(response.data);
            } catch (error) {
                console.error("데이터 저장 오류:", error)
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                글쓰기 페이지
            </Typography>
            <form onSubmit={(e) => handleSubmit(e, 'guestlist')}>
                <TextField type="text" name="id" label="ID" value={formState.id} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="password" name="pw" label="Password" value={formState.password} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="text" name="title" label="제목" value={formState.title} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="text" name="content" label="내용" multiline rows={4} value={formState.content} onChange={handleChange} fullWidth margin="normal" required />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    작성 완료
                </Button>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={(e) => handleBack(e, 'guestlist')}>돌아가기</Button>
            </form>
        </Container>
    );
}
