import { useParams } from "react-router-dom";
import { ChatModule } from "components/ChatModule/ChatModule";
import { Container } from '@mui/material';

export const Chat = () => {
    const { chatID } = useParams();
    return(
        <Container maxWidth="xl">
            <ChatModule ID={chatID} />    
        </Container>
        
    )
}