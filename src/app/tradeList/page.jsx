"use client";
import { MenuContext } from "@/stores/StoreContext";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation"; // 변경된 부분
import { useContext } from "react";

function TradeList({ tradeList }) {
  const API_URL = "/api/detailTrade";
  const menuStore = useContext(MenuContext);
  const router = useRouter(); // 변경된 부분

  const handleDetailClick = async (menu, idx) => {
    menuStore.setSelectedMenu(menu);
    if (menu === "detailtrade") {
      try {
        const response = await axios.get(API_URL, {
          params: { idx },
          headers: {
            Authorization: `Bearer ${menuStore.token}`
          }
        });
        console.log("데이터", response.data);
        menuStore.setDetailTrade(response.data);
      } catch (error) {
        alert("중고거래 상세정보 실패");
      }
    }
  };

  const handleWriteClick = async (menu) => {
    menuStore.setSelectedMenu(menu);
    if(menu === 'writetrade'){
      try {

      } catch (error) {
        alert("글쓰러 가기 실패")
      }
    }
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        중고거래
      </Typography>
      <Grid container spacing={3}>
        {tradeList &&
          tradeList.map((k) => (
            <Grid item key={k.idx} xs={12} sm={6} md={4} lg={3}>
              <Paper
                elevation={3}
                onClick={() => handleDetailClick("detailtrade", k.idx)}
                style={{ cursor: "pointer" }}
              >
                <Box p={2}>
                  <img
                    src={k.image}
                    alt={"이미지 없음"}
                    style={{ width: "100%", height: "auto", marginBottom: "10px" }}
                  />
                  <Typography
                    variant="subtitle1"
                    style={{ textDecoration: "underline", color: "blue" }}
                  >
                    {k.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    등록 날짜: {k.created_at.substring(0, 10)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleWriteClick("writetrade")} // 변경된 부분
        style={{ marginTop: "20px" }}
      >
        글쓰기
      </Button>
    </Container>
  );
}

export default observer(TradeList);
