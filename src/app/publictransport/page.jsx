"use client"
import { MenuContext } from "@/stores/StoreContext";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";


function PublicTransport(){
    
    const menuStore = useContext(MenuContext);
/* 
    const handlePublicClick = async (menu) => {
        menuStore.setSelectedMenu(menu)
        if(menu === 'publictransport'){
            try{
                const response = await axios.get(
                    '/api/public-data?queryParam=value'
                )
                menuStore.setPublicTransport(response.data);
            }catch(error){
                console.error("There was an error fetching the data!", error);
            }
        }

    }
 */
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=3f599c1d6971197a01e6600cd397224a&autoload=false`; // 여기에 본인의 Kakao 지도 API 키를 넣어주세요.
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // LatLng 객체를 window.kakao.maps에서 가져와야 합니다.
                    level: 3
                };
                const map = new window.kakao.maps.Map(mapContainer, mapOption);
            });
        };

        // 컴포넌트가 언마운트될 때 스크립트 제거
        return () => {
            document.head.removeChild(script);
        };
    }, []);
    
    return(
        <div id="map" style={{ width: '100%', height: '400px' }}> </div>
    )
}

export default observer(PublicTransport)