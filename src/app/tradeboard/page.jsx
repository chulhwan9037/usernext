import { MenuContext } from "@/stores/StoreContext";
import { Box, Container, Grid, Paper, Table, TableContainer, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useContext } from "react";


function TradeList(){
    
    const menuStore = useContext(MenuContext);

    const handleTradeClick = async(menu) =>{

        menuStore.setSelectedMenu(menu)
        if(menu === 'tradeboard'){
            try {
                const response = await axios.get(
                    '/api/trade'
                )
                menuStore.setTradeBoard(response.data);
            } catch (error) {
                
            }      
        }
        
    }
    
    
    return (
        <>
        
        </>
    );
}
export default observer(TradeList)