"use client"

import React, { useContext } from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';

function GuestList({ guestList }) {

    const API_URL = '/api/freeBoardDetail';
    const menuStore = useContext(MenuContext);

    const handleDetailClick = async (menu, idx) => {
        menuStore.setSelectedMenu(menu)
        if(menu === 'guestdetail'){
            try {
                const response = await axios.get(
                    API_URL, {params : {idx}} ,
                    {
                        headers: {
                            Authorization: `Bearer ${menuStore.token}`
                        }
                    }
                );
                console.log("데이터",response.data)
                menuStore.setGuestDetail(response.data);
            } catch (error) {
                alert("상세 정보를 가져오는 데 실패했습니다.");
            }
        }
    }


    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                게스트 리스트
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#87CEEB', color: 'white' }}>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>등록 날짜</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guestList && guestList.map((k) => (
                            <TableRow key={k.idx}>
                                <TableCell>{k.id}</TableCell>
                                <TableCell>
                                    <span
                                        style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
                                        onClick={() => handleDetailClick('guestdetail',k.idx)}>
                                        {k.title}
                                    </span>
                                </TableCell>
                                <TableCell>{k.created_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default observer(GuestList)