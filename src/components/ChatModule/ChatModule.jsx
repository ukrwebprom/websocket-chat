import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useUser } from 'firebase-func';
import useWebSocket from 'react-use-websocket';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import './chatmodule.scss';

export const ChatModule = ({ID}) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);
    const socketUrl = 'ws://tranquil-reaches-58824.herokuapp.com/';
    //const socketUrl = 'ws://localhost:8080';
    const { user } = useUser();
    const {
        sendMessage,
        lastMessage,
/*         sendJsonMessage,
        lastJsonMessage,
        readyState,
        getWebSocket, */
      } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        onClose: () => console.log('closed'),
        shouldReconnect: (closeEvent) => true,
      });

    useEffect(() => {
        if(user) {
        setUsers(u => {
            return [
                ...u,
                {
                    uid:user.uid, 
                    photo:user.photo, 
                    name: user.name
                }
            ]
            

        });
            const data = {
            message:'',
            ID,
            uid: user.uid,
            photo: user.photo,
            name: user.name,
        };
        sendMessage(JSON.stringify(data));
        }
        
    }, [user, ID]);

    useEffect(() => {
        if(lastMessage) {
            const data = JSON.parse(lastMessage.data);
            setMessages(m => {
                return [...m, {uid:data.uid, message:data.message}]
            })
        }
        
    }, [lastMessage])
    const SendData = (message) => {
        const data = {
            message,
            ID,
            uid: user.uid,
            photo: user.photo,
            name: user.name,
        };
        sendMessage(JSON.stringify(data));
    }
    const getUser = (uid) => {
        return users.find(user => user.uid === uid);
    }
    const handleType = e => {
        setNewMessage(e.target.value);
    }
    const handleOnSend = () => {
        SendData(newMessage);
        setNewMessage('');
    }

    return (
        <>
        
        <div className='dialogue'>
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
            {messages.map(({uid, message}) => (
                
                   <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt={getUser(uid).name} src={getUser(uid).photo} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={message}
                            secondary={getUser(uid).name}
                        />
                    </ListItem> 
                
            ) )}
        </List>
        </div>
        <div className="sender">
        <TextField
          id="outlined-multiline-static"
          label="Type here"
          multiline
          maxRows={4}
          fullWidth
          value={newMessage}
          onChange = {handleType}
          //defaultValue="Default Value"
        />
        <Button variant="contained" sx={{height:'35px'}} onClick={handleOnSend}>Send</Button>
        </div>
        
        </>
    );
}