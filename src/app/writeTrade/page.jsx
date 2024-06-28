"use client";
import { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function WriteTrade() {
    const [formState, setFormState] = useState({
        id: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/writeTrade', formState);
            console.log('데이터 저장 성공:', response.data);
        } catch (error) {
            console.error('데이터 저장 오류:', error);
        }
    };

    const editorConfiguration = {
        ckfinder: {
            uploadUrl: 'http://localhost:8080/api/upload' // 파일 업로드 엔드포인트 설정
        },
        height: '400px' // 높이 조절
    };

    const initialText = '<p>내용을 입력하세요...</p>';

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                글쓰기 페이지
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField type="text" name="id" label="ID" value={formState.id} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="password" name="pw" label="Password" value={formState.pw} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="text" name="title" label="제목" value={formState.title} onChange={handleChange} fullWidth margin="normal" required />
                <CKEditor
                        name="content"
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={initialText}
                        onChange={handleContentChange}
                    />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }} >
                    작성 완료
                </Button>
            </form>
        </Container>
    );
}
