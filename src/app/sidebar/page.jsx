"use client"

import { MenuContext } from "@/stores/StoreContext";
import { AccountCircle } from "@mui/icons-material";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

const drawerWidth = 240 ;

function Sidebar(){
    // useContext 훅으로 MobX Store 가져오기 
    const menuStore = useContext(MenuContext) 

    // 메뉴 클릭시 선택된 메뉴를 상태관리에서 업데이트 하자 
    const handleMenuClick = async (menu) => {
        menuStore.setSelectedMenu(menu)
        if(menu === "guestlist"){
            try {
                const response = await axios.get("/api/freeBoard",{
                    headers :{
                        Authorization:  `Bearer ${menuStore.token}`
                    }
                });
                // 가지고 온 리스트를 MobX에 저장하자
                console.log("data",response.data)
                menuStore.setGuestList(response.data)
            } catch (error) {
                alert("실패")
            }
        }else if(menu === "userboard"){
            try {
                const response = await axios.get("/api/userboard",{
                    headers :{
                        Authorization:  `Bearer ${menuStore.token}`
                    }
                });
                // 가지고 온 리스트를 MobX에 저장하자
                menuStore.setUserBoard(response.data)
            } catch (error) {
                alert("실패")
            }
        }else if(menu === "tradelist"){
            try {
                console.log("여기는올까?")
                const response = await axios.get("/api/tradeboard",{
                    headers :{
                        Authorization:  `Bearer ${menuStore.token}`
                    }
                });
                // 가지고 온 리스트를 MobX에 저장하자
                menuStore.setTradeList(response.data)
            } catch (error) {
                alert("실패")
            }
        }else if(menu === "public"){
            try {
                const response = await axios.get("/api/public",{
                    headers :{
                        Authorization:  `Bearer ${menuStore.token}`
                    }
                });
                // 가지고 온 리스트를 MobX에 저장하자
                menuStore.setPublicInfo(response.data)
            } catch (error) {
                alert("실패")
            }
        }
    }

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItemButton onClick={() => handleMenuClick("guestlist")}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="익명 게시판" />
                </ListItemButton>   
                <ListItemButton onClick={() => handleMenuClick("userboard")}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="유저게시판" />
                </ListItemButton>   
                <ListItemButton onClick={() => handleMenuClick("tradelist")}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="Trade List" />
                </ListItemButton>   
                <ListItemButton onClick={() => handleMenuClick("public")}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="대중교통정보" />
                </ListItemButton>   
            </List>    
        </div>
    )
    return(
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
            {drawer}
        </Drawer>
    </Box>
    );
}

export default observer(Sidebar);