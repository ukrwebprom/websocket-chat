import { useState, useEffect, useRef } from 'react';
import { useUser } from 'firebase-func';
import useWebSocket from 'react-use-websocket';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './chatmodule.scss';

export const ChatModule = ({ ID }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [connectedSnack, setConnectedSnack] = useState(false);
  const [disconnectedSnack, setDisconnectedSnack] = useState(false);
  const paper = useRef(null);
  const socketUrl = 'wss://tranquil-reaches-58824.herokuapp.com/';

  //const socketUrl = 'ws://localhost:8080';
  const { user, setUsersInChat } = useUser();

  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
    onOpen: () => setConnectedSnack(true),
    onClose: () => setDisconnectedSnack(true),
    shouldReconnect: closeEvent => true,
    queryParams: {
      chatID: ID,
      userID: user.userID,
      photo: user.photo,
      name: user.name,
    }
  });

/*   const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]; */

/*   const Handshake = () => {
    const data = {
        message:'lm318',
        chatID: ID,
        userID: user.userID,
        photo: user.photo,
        name: user.name,
    };
    sendMessage(JSON.stringify(data));
  } */

/*   useEffect(() => {
    if (readyState === 1) Handshake();
  }, [readyState]); */

/*   const getUser = uid => {
    return users.find(user => user.userID === uid);
  };
 */
  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      if(data.message === 'ping') {
        console.log('ping');
        return;
      }
      if(data.message === 'lm319') {
         setUsers(
          data.users
          );
        console.log(data.users);
        return;
      }
      const sender = users.find(user => user.userID === data.userID);
      setMessages(m => {
        return [...m, { userID: data.userID, message: data.message, messID: data.messID, name:sender.name, photo:sender.photo }];
      });
      paper.current.scrollTo(0, paper.current.scrollHeight);
      console.log(paper.current);
    }
  }, [lastMessage, users]);

  useEffect(() => {
    setUsersInChat(users.length);
  }, [users, setUsersInChat])

  const SendData = message => {
    const data = {
      message,
      chatID: ID,
      userID: user.userID,
    };
    sendMessage(JSON.stringify(data));
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
      <Snackbar
        open={connectedSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={() => setConnectedSnack(false)}
      >
        <Alert variant="filled" severity="success">
          Connected
        </Alert>
      </Snackbar>
      <Snackbar
        open={disconnectedSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={() => setDisconnectedSnack(false)}
      >
        <Alert variant="filled" severity="warning">
          Disconnected
        </Alert>
      </Snackbar>

      <div className="dialogue" ref={paper}>
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
