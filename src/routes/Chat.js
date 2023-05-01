import { useWebSocket } from "server-api";
import { ChatModule } from "components/ChatModule/ChatModule";
import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";

export const Chat = () => {
    const {client, setChatID } = useWebSocket();
    const {chatID} = useParams();
    setChatID(chatID);
    
    return(
        
        <Container maxWidth="xl">
            {client !== null ?
            
            <ChatModule /> :
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            }
            
            
        </Container>
        
    )
}