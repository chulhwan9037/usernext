"use client"

import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MenuContext } from "@/stores/StoreContext";
import { observer } from "mobx-react-lite";

function TopBar() {
    const menuStore = useContext(MenuContext);
    const router = useRouter();
    const API_URL = '/api/userInfo';

    const handleUserDetail = async (menu) => {
        menuStore.setSelectedMenu(menu);
        if (menu === 'userdetail') {
            try {
                const response = await axios.get(API_URL, {
                    params: {
                        token: menuStore.token
                    }
                });
                console.log("데이터", response.data);
                menuStore.setUserInfo(response.data);
            } catch (error) {
                console.error("요청 실패:", error);
                alert("사용자 정보를 가져오는데 실패했습니다.");
            }
        }
    };

    const handleLogout = async () => {
        await axios.post("/api/logout", {}, {
            headers: {
                "Authorization": `Bearer ${menuStore.token}`
            }
        });
        menuStore.setToken(null);
        router.push("/");
    };

    const handleDrawerToogle = () => {
        menuStore.setSidebarOpen(!menuStore.sidebarOpen);
    };

    return (
        <AppBar position="fixed" sx={{ width: `calc(100% - ${menuStore.sidebarOpen ? "240px" : 0 })` }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToogle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" style={{ fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold', color: '#4CAF50', textShadow: '2px 2px 4px #888888' }}>
                    마을 모아
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={()=> handleUserDetail("userdetail")}>MyPage</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default observer(TopBar);
