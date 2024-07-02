"use client"

import { MenuContext } from "@/stores/StoreContext";
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { observer } from "mobx-react-lite"
import { useContext, useState } from "react";

function UpdateTrade(){
    const menuStore = useContext(MenuContext)
    const detailTrade = menuStore.detailTrade;

    const [formState, setFormState] = useState({
        id : detailTrade.id,
        title : detailTrade.title,
        content : detailTrade.content,
        idx : detailTrade.idx
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
        if (menu === 'detailtrade'){
        try {
            // 데이터 저장 요청
            const postResponse = await axios.post('/api/updateTrade', formState);
            console.log('데이터 저장 성공:', postResponse.data);
    
            // 저장 후 데이터 조회 요청
          const getResponse = await axios.get('/api/tradeboard' ,{
                headers: {
                    Authorization:  `Bearer ${menuStore.token}`
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
        if (menu === 'detailtrade'){
            try {
                const response = await axios.get('/api/detailTrade', {
                    params: {
                        token: menuStore.token
                    }
            });
                menuStore.setTradeList(response.data);
            } catch (error) {
                console.error("데이터 저장 오류:", error)
            }
        }
    };


    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                수정하기
            </Typography>
            <form onSubmit={(e) => handleSubmit(e, 'detailtrade')}> 
                <TextField type="text" name="id" label="ID" value={detailTrade.id} fullWidth margin="normal" required readOnly />
                <TextField type="text" name="title" label="Title" value={formState.title} onChange={handleChange} fullWidth margin="normal" required />
                <TextField type="text" name="content" label="Content" value={formState.content} onChange={handleChange} fullWidth margin="normal" required />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    수정 완료
                </Button>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={(e) => handleBack(e, 'detailtrade')}>취소</Button>
            </form>
        </Container>
    );
}
export default observer(UpdateTrade)

