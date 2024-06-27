"use client"
import { MenuContext } from "@/stores/StoreContext";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useContext } from "react";



function UserBoard(){


    const menuStore = useContext(MenuContext);

    const handleUserClick = async (menu)=>{

        menuStore.setSelectedMenu(menu)
        if(menu === 'userboard'){
            try {
                const response = await axios.get(
                    '/api/public'
                )
                menuStore.setUserBoard(response.data);
            } catch (error) {
                
            }
            
        }
        
    }
    return(
        <Container> 
            유저게시판
            <span
                onClick={() => handleUserClick('userboard')}>
            </span>
        </Container>
    )
}
export default observer(UserBoard)