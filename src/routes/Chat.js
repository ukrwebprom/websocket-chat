import { w3cwebsocket } from 'websocket';
import { useUser } from 'firebase-func';
import { useParams } from 'react-router-dom';
import { ChatModule } from "components/ChatModule/ChatModule";
import { Container } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

export const Chat = () => {
    const [client, setClient] = useState(null);
    const { user } = useUser();
    const { chatID } = useParams();
    const socketUrl = `wss://tranquil-reaches-58824.herokuapp.com/?userID=${user.userID}&chatID=${chatID}&photo=${user.photo}&name=${user.name}`;

    const connect = useCallback(() => {
        const client = new w3cwebsocket(socketUrl);

        client.onopen = () => {
            setClient(client);
        }

    }, [socketUrl]);
    
    useEffect(() => {
        connect();
    }, [connect])

    return(
        
        <Container maxWidth="xl">
            {client !== null && <ChatModule client={client} />}
        </Container>
        
    )
}