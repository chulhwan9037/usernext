"use client"

import { useContext } from 'react';
import './guestDetail.css';
import { MenuContext } from '@/stores/StoreContext';

export default function GuestDetail({ guestDetail }) {
    const {
        idx,
        id,
        title,
        content,
        created_at
    } = guestDetail;

    const menuStore = useContext(MenuContext)

    const handleBack = async (e, menu) => {
        e.preventDefault();
        menuStore.setSelectedMenu(menu);
        if (menu === 'guestlist'){
            try {
                const response = await axios.get('/api/freeBoard', {
                headers: {
                    Authorization: `Bearer ${menuStore.token}`
                }
            });
                menuStore.setGuestList(response.data);
            } catch (error) {
                console.error("데이터 저장 오류:", error)
            }
        }
    };

    return (
        <div className="guest-detail-container">
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
                <button onClick={(e) => handleBack(e, 'guestlist')}>돌아가기</button>
            </div>
        </div>
    );
}
