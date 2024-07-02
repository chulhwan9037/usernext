"use client"

import { MenuContext } from "@/stores/StoreContext";
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { observer } from "mobx-react-lite"
import { useContext, useState } from "react";

function InfoEdit(){
    const menuStore = useContext(MenuContext)
    const userInfo = menuStore.userInfo;

    const [formState, setFormState] = useState({
        id : userInfo.id,
        name : userInfo.name,
        email : userInfo.email,
        phone : userInfo.phone
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e, menu) => {
        e.preventDefault();
        menuStore.setSelectedMenu(menu);
        if (menu === 'userinfo'){
        try {
            // 데이터 저장 요청
            const postResponse = await axios.post('/api/infoEdit', formState);
            console.log('데이터 저장 성공:', postResponse.data);
    
            // 저장 후 데이터 조회 요청
            const getResponse = await axios.get('/api/userInfo', {
                params: {
                    token: menuStore.token
                }
            });
    
            // 조회한 데이터 상태 업데이트
            menuStore.setUserInfo(getResponse.data);
        } catch (error) {
            console.error('데이터 저장 오류:', error);
        }
        }
    };
    

    const handleBack = async (e, menu) => {
        e.preventDefault();
        menuStore.setSelectedMenu(menu);
        if (menu === 'userinfo'){
            try {
                const response = await axios.get('/api/userInfo', {
                    params: {
                        token: menuStore.token
                    }
            });
                menuStore.setUserInfo(response.data);
            } catch (error) {
                console.error("데이터 저장 오류:", error)
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                유저 정보수정
            </Typography>
            <form onSubmit={(e) => handleSubmit(e, 'userinfo')}> 
                <TextField type="text" name="id" label="ID" value={userInfo.id} fullWidth margin="normal" required readOnly />
                <TextField type="text" name="name" label="Name" value={userInfo.name} onChange={handleChange} fullWidth margin="normal" required readOnly/>
                <TextField type="text" name="email" label="Email" value={formState.email} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="text" name="phone" label="Phone" value={formState.phone} onChange={handleChange} fullWidth margin="normal" required />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    수정 완료
                </Button>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={(e) => handleBack(e, 'userinfo')}>취소</Button>
            </form>
        </Container>
    );
}
export default observer(InfoEdit);