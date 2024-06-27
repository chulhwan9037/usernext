"use client"
import { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function WriteTrade() {
    const [formState, setFormState] = useState({
        id: '',
        password: '',
        title: '',
        content: '',
        image: null
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormState({
            ...formState,
            image: e.target.files[0] 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('/api/writeTrade', formState);

            console.log('데이터 저장 성공:', response.data);

        } catch (error) {
            console.error('데이터 저장 오류:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                글쓰기 페이지
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField type="text" name="id" label="ID" value={formState.id} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="password" name="password" label="Password" value={formState.password} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="text" name="title" label="제목" value={formState.title} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="text" name="content" label="내용" multiline rows={4} value={formState.content} onChange={handleChange} fullWidth margin="normal" required />
                <input type="file" name="image" onChange={handleFileChange} style={{ marginTop: '20px' }} />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    작성 완료
                </Button>
            </form>
        </Container>
    );
}
