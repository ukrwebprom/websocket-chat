import { useState, useEffect, useMemo, useRef } from 'react';
import { useWebSocket } from 'server-api';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import './chatmodule.scss';
import { nanoid } from 'nanoid';


export const ChatModule = () => {
  const { Message, Send } = useWebSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const dontShow = useMemo(() => ['', 'ping', 'need_upd'], []);
  const dialogue = useRef();

  useEffect(() => {
    if(!dontShow.includes(Message)) setMessages(m => [...m, { message:Message.mess, messID:nanoid(), name:Message.name, photo:Message.photo }])
  }, [Message, dontShow])

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
/*     console.log(dialogue.current.scrollHeight-window.height);
    dialogue.current.scrollTop = dialogue.current.scrollHeight; */
  }, [messages])

  const handleType = e => {
    setNewMessage(e.target.value);
  };
  const handleOnSend = () => {
    Send(newMessage);
    setNewMessage('');
  };

  return (
    <>
      <div className="dialogue" ref={dialogue}>
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          {messages.map(({ message, messID, name, photo }) => (
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
