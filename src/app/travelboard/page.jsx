import { MenuContext } from "@/stores/StoreContext";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useContext } from "react";




function Travel(){


    const menuStore = useContext(MenuContext);

    const handleTravelClick = async (menu) =>{

        menuStore.setSelectedMenu(menu)
        if(menu === 'travelboard'){
            try {
                const response = await axios.get(
                    '/api/travel'
                )
                menuStore.setTravelBoard(response.data);
            } catch (error) {
                
            }
            
        }
    }
        
    return(
        <div>
            여행정보
            <span
                onClick={() => handleTravelClick('travelboard')}>
            </span>
        </div>
    )
}
export default observer(Travel)