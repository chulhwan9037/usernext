import { MenuContext } from "@/stores/StoreContext";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useContext } from "react";


function PublicTransport(){
    
    const menuStore = useContext(MenuContext);

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
    
    return(
        <div>
            교통정보 게시판
            <span
                onClick={() => handlePublicClick('publictransport')}>
            </span>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    )
}

export default observer(PublicTransport)