import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from 'firebase-func';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import './chatmodule.scss';


export const ChatModule = ({ client }) => {
  const { user, setUsersInChat } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  //const [users, setUsers] = useState([]);
  const users = useRef([])

  const onMessageHandler = useCallback((messageObject) => {
    switch(messageObject.message) {
      case 'ping':
        console.log('ping');
        break;
      
      case 'lm319':
        //updUsersList(messageObject.users);
        users.current = messageObject.users;
        setUsersInChat(users.current.length);
        break;

      default:
        const sender = users.current.find(user => user.userID === messageObject.userID);
        console.log(messageObject.userID, sender);
        setMessages(m => {
          return [...m, { userID: messageObject.userID, message: messageObject.message, messID: messageObject.messID, name:sender.name, photo:sender.photo }];
         });
    }
  }, [users, setUsersInChat]);

  useEffect(() => {
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      onMessageHandler(data);
    }
  }, [onMessageHandler, client])


  const SendData = message => {
    const data = {
      message,
      userID: user.userID,
    };
    client.send(JSON.stringify(data));
  };


  const handleType = e => {
    setNewMessage(e.target.value);
  };
  const handleOnSend = () => {
    SendData(newMessage);
    setNewMessage('');
  };

  return (
    <>
      <div className="dialogue">
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          {messages.map(({ userID, message, messID, name, photo }) => (
            <ListItem alignItems="flex-start" key={messID}>
              <ListItemAvatar>
                <Avatar alt={name} src={photo} />
              </ListItemAvatar>
              <ListItemText primary={message} secondary={name} />
            </ListItem>
          ))}
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
          onChange={handleType}
          //defaultValue="Default Value"
        />
        <Button
          variant="contained"
          sx={{ height: '35px' }}
          onClick={handleOnSend}
        >
          Send
        </Button>
      </div>
    </>
  );
};
