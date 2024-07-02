"use client";

import { MenuContext } from '@/stores/StoreContext';
import axios from 'axios';
import { useContext } from 'react';

export default function DetailTrade({ detailTrade }) {
    const {
        idx,
        id,
        title,
        content,
        image,
        image_size,
        image_format,
        created_at
    } = detailTrade;
    const menuStore = useContext(MenuContext);
    const handleEdit = async (menu) => {
        menuStore.setSelectedMenu(menu);
        if(menu === 'updatetrade'){
            try {
                const response = await axios.get('/api/detailTrade', {
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

    const handleDelete = async (e, menu, idx) => {
        e.preventDefault();
        menuStore.setSelectedMenu(menu);
        if (menu === 'tradelist') {
            try {
                const postResponse = await axios.post('/api/deleteTrade', { idx }, {
                    headers: {
                        Authorization: `Bearer ${menuStore.token}`
                    }
                });
                alert("삭제되었습니다.")
                console.log('삭제 성공:', idx, postResponse.data);
    
                const getResponse = await axios.get('/api/tradeboard', {
                    headers: {
                        Authorization: `Bearer ${menuStore.token}`
                    }
                });
                menuStore.setTradeList(getResponse.data);
            } catch (error) {
                console.error("데이터 저장 오류:", error);
            }
        }
    };

    const handleBack = async (e, menu) => {
        e.preventDefault();
        menuStore.setSelectedMenu(menu);
        if (menu === 'tradelist'){
            try {
                const response = await axios.get('/api/tradeboard', {
                headers: {
                    Authorization: `Bearer ${menuStore.token}`
                }
            });
                menuStore.setTradeList(response.data);
            } catch (error) {
                console.error("데이터 저장 오류:", error)
            }
        }
    };

    const isOwner = menuStore.userInfo.id === id;
    console.log("menuStore",menuStore.userInfo.id)
    console.log("id",id)
    return (
        <div className="guest-detail-container">
            <div className="info-item">
                <label>Image:</label>
                <p className="info-name">{image_format}</p>
            </div>
            <div className="info-item">
                <label>ID:</label>
                <p className="info-name">{id}</p>
            </div>
            <div className="info-item">
                <label>Title:</label>
                <p className="info-subject">{title}</p>
            </div>
            <div className="info-item">
                <label>Content:</label>
                <p className="info-content">{content}</p>
            </div>
            <div className="info-item">
                <label>Registered Date:</label>
                <p className="info-regdate">{created_at}</p>
            </div>
            <div className="button-container">
                {isOwner && (
                    <>
                        <button onClick={() => handleEdit("updatetrade")}>수정</button>
                        <button onClick={(e) => handleDelete(e, 'tradelist', idx)}>삭제</button>
                    </>
                )}
                <button onClick={(e) => handleBack(e, 'tradelist')}>돌아가기</button>
            </div>
        </div>
    );
}
