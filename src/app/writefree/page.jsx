"use client"
import { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useRouter } from 'next/navigation';

export default function WriteFree() {

    const router = useRouter();
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

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('/api/writeFreeboard', formState);

            console.log('데이터 저장 성공:', response.data);
            router.push('/main')
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
                <TextField type="password" name="pw" label="Password" value={formState.password} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="text" name="title" label="제목" value={formState.title} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="text" name="content" label="내용" multiline rows={4} value={formState.content} onChange={handleChange} fullWidth margin="normal" required />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    작성 완료
                </Button>
            </form>
        </Container>
    );
}
