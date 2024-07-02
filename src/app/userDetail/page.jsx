"use client"

import { useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Container, List, ListItem, ListItemText, Paper, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { MenuContext } from "@/stores/StoreContext";
import axios from "axios";

const UserDetail = observer(() => {
    const menuStore = useContext(MenuContext);
    const userInfo = menuStore.userInfo;
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    if (!userInfo.id) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    const { 
        id, 
        name, 
        email, 
        provider,
        phone
    } = userInfo;

    const handleEdit = async (menu) => {
        menuStore.setSelectedMenu(menu);
        if(menu === 'infoedit'){
            try {
                const response = await axios.get('/api/userInfo', {
                  params: {
                      token: menuStore.token
                  }
              });
                console.log("데이터", response.data);
                menuStore.setUserInfo(response.data);
              } catch (error) {
                alert("글쓰러 가기 실패")
              }
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePassword = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post('/api/changePassword', { password, id });
            console.log("비밀번호 변경 성공:", response);
            handleClose();
        } catch (error) {
            console.error("비밀번호 변경 실패:", error);
            alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                유저 정보
            </Typography>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <List>
                    <ListItem>
                        <ListItemText primary="ID" secondary={id} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Name" secondary={name} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Email" secondary={email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Phone" secondary={phone} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Provider" secondary={provider} />
                    </ListItem>
                </List>
                <Button variant="contained" color="primary" onClick={()=>handleEdit("infoedit")} style={{ marginRight: '10px' }}>수정</Button>
                <Button variant="contained" color="secondary" onClick={handleOpen}>비밀번호 변경</Button>
            </Paper>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>비밀번호 변경</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" label="새 비밀번호" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField margin="dense" label="비밀번호 확인" type="password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">취소</Button>
                    <Button onClick={handleChangePassword} color="primary"> 변경</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
});

export default UserDetail;
