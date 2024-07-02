"use client"

import { Box, Button, CssBaseline, Toolbar } from "@mui/material";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Children, useContext, useEffect, useState } from "react";
import TopBar from "../topbar/page";
import Sidebar from "../sidebar/page";
import GuestList from "../guestList/page";
import { observer } from "mobx-react-lite";
import { MenuContext } from "@/stores/StoreContext";
import MainPage from "../mainpage/page";
import UserBoard from "../userboard/page";
import TradeList from "../tradeList/page";
import PublicTransport from "../publictransport/page";
import GuestDetail from "../guestDetail/page";
import UserDetail from "../userDetail/page";
import DetailTrade from "../detailTrade/page";
import WriteTrade from "../writeTrade/page";
import WriteFree from "../writefree/page";
import InfoEdit from "../infoEdit/page";
import UpdateTrade from "../updateTrade/page";



function Main(){

  // useContext 훅으로 MobX Store를 가져오기
  const menuStore = useContext(MenuContext)

    const router = useRouter();
    
    // 사이드바에서 메뉴 선택 상태관리 : 초기값 userlist
    // const [selectedMenu, setSelectedMenu] = useState("userlist")
    // MobX 에서 관리
    // 상단 바에 대한 상태관리 : 초기값 true(열림상태)
    // const [sidebarOpen, setSidebarOpen] = useState(true)
    
    useEffect(() => {
        menuStore.loadToken();
        if(!menuStore.isAuthenticated){
            router.push("/")
        }
    },[router, menuStore]);

    //  선택된 메뉴에 따라 다른 컴포넌트를 임포트해서 랜더링 하기 
    const renderContent = () => {
       switch(menuStore.selectedMenu){
          case "mainpage" :
            return <MainPage mainPage={menuStore.mainPage} />;
          case "guestlist" :
            return <GuestList guestList={menuStore.guestList} />;
          case "guestdetail":
            return <GuestDetail guestDetail={menuStore.guestDetail} />
          case "userboard" :
            return <UserBoard userBoard={menuStore.userBoard}/>;
          case "tradelist" :
            return <TradeList tradeList={menuStore.tradeList}/>;
          case "detailtrade" :
            return <DetailTrade detailTrade={menuStore.detailTrade}/>;
          case "updatetrade" :
            return <UpdateTrade updateTrade={menuStore.updateTrade}/>;
          case "writetrade" :
            return <WriteTrade writeTrade={menuStore.writeTrade}/>;
          case "writefree" :
            return <WriteFree writeFree={menuStore.writeFree}/>;
          case "publictransport" :
            return <PublicTransport publicTransport={menuStore.publicTransport}/>;
          case "userdetail" :
            return <UserDetail userDetail={menuStore.userDetail}/>;
          case "infoedit" :
            return <InfoEdit InfoEdit={menuStore.infoEdit}/>;
          default:
            return <MainPage />
       }
    }

    return(
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
                {/* menuStore 를 이용해서 가져오기, Sidebar 컴포넌트에는 prop를 전달할 필요가 없다. */}
                {menuStore.sidebarOpen  && <Sidebar />}
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#ffffff', marginTop:"100px" }}>
                  {/* 선택된 메뉴에 따라 알맞는 컴포넌트를 랜더링 한다. */}
                  {renderContent()}
                </div>
            </div>
        </div>
    )
}


export default observer(Main);