"use client"
import { makeAutoObservable } from "mobx";


class MenuStore{
    selectedMenu = "mainpage" ;  // 선택된 메뉴
    sidebarOpen = true ;         // 사이드바 열림/닫힘 상태   
    isAuthenticated = false;     // 사용자 인증상태
    token = null  ;              // 사용자 토큰
    guestList = [] ;             // 서버에서 가져온 Guest List
    guestDetail = {
        idx : '' ,
        name : '',
        subject : '' ,
        content : '',
        email : '',
        regdate : '' 
    };           // 선택된 게스트의 상세 정보

    userBoard = [] ;              // 서버에서 가져온 userboard
    publicTransport = [] ;        // 서버에서 가져온 대중교통
    userInfo = {
        id:'',
        name : '',
        email : '',
        phone : '',
        provider : '',
        kakao : '',
        naver : '',
        google : '', 
    };

    tradeList = [];
    detailTrade = {
        idx : '',
        id : '',
        title : '' ,
        content : '',
        image : '',
        image_size : '',
        image_format : '',
        created_at : '',
        updated_at : ''
    };
    writeTrade = [];

    constructor(){
        // MobX 스토어를 자동으로 관찰 가능하게 설정
        makeAutoObservable(this);
    }

    // 메뉴 변경 
    setSelectedMenu(menu){
        this.selectedMenu = menu;
    }

    // 상단 바 열림/닫힘 변경 (toggle)
    setSidebarOpen(){
        this.sidebarOpen = !this.sidebarOpen;
    }

    // 인증상태 변경 액션 
    setAuthenticated(authenticated){
        this.isAuthenticated = authenticated;
    }

    // 토큰 설정 액션 
    setToken(token){
        this.token = token
        if(token){
            localStorage.setItem("token", token);
            this.setAuthenticated(true);
        }else{
            localStorage.removeItem("token");
            this.setAuthenticated(false);
        }
    }

    // 로컬 스토리지에서토큰 가져오기 
    loadToken(){
        const token = localStorage.getItem("token")
        this.setToken(token)
    }

    setMainPage(selectedMenu){
        this.selectedMenu = selectedMenu;
    }
    setGuestList(guestList){
        this.guestList = guestList;
    }
    setGuestDetail(guestDetail){
        this.guestDetail = guestDetail;
    }
    setUserBoard(userBoard){
        this.userBoard = userBoard;
    }
    setUserInfo(userInfo){
        this.userInfo = userInfo;
    }
    setTradeList(tradeList){
        this.tradeList = tradeList;
    }
    setDetailTrade(detailTrade){
        this.detailTrade = detailTrade;
    }
    setWriteTrade(writeTrade){
        this.writeTrade = writeTrade;
    }
    setPublicInfo(publicInfo){
        this.publicInfo = publicInfo;
    }
}

const menuStore = new MenuStore(); // 스토어 인스턴스 생성 
export default menuStore ;