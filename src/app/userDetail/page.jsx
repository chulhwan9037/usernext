"use client"

import { Container, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { MenuContext } from "@/stores/StoreContext";

const UserDetail = observer(() => {
    const menuStore = useContext(MenuContext);
    const userInfo = menuStore.userInfo;

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
            </Paper>
        </Container>
    );
});

export default UserDetail;
