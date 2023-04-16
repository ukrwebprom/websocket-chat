import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import './chatmodule.scss';

export const ChatModule = ({ID}) => {
    const testUsers = [
        {uid:1, name:'Peter', photo: 'https://loremfaces.com/#gallery-1'},
        {uid:12, name:'Duka', photo: 'https://loremfaces.com/#gallery-12'},
        {uid:8, name:'Mrs. Julia Robertson', photo: 'https://loremfaces.com/#gallery-8'},
        {uid:24, name:'Stive Jakkinson', photo: 'https://loremfaces.com/#gallery-24'},
        {uid:19, name:'Jerome Jerome', photo: 'https://lh3.googleusercontent.com/a/AEdFTp7odHwYvndQ6lPH8OqizffBOTmJ2tdENMshJiUN4w=s96-c'},
    ]
    const testMessages = [
        {uid:1, message:'Пахать еще и пахать'},
        {uid:8, message:'Если я скажу ты скажешь, что не в своем уме'},
        {uid:12, message:'https://www.instagram.com/reel/CrGY6FAAvwcSFGXsKfvP5JixmYK_WIVkikRQ2A0/?igshid=Mzc1MmZhNjY='},
        {uid:24, message:'Ну я ж незламный. Меня больше тревожит уровень наеденности'},
        {uid:8, message:'После твоей удачи страшно разболелась голова, больше так не делай. Посуду помыла, список написала, зубы почистила, легла'},
        {uid:19, message:'Один чувак работал на 2х работах, в дневную и в ночную смену. А домашки делал с планшета, пока на травмае ехал на работу. Так что да, у тебя норм условия'},
        {uid:1, message:'Какой смысл мне идти сецчас в кровать?'},
        {uid:19, message:'Отдыхать'},
        {uid:1, message:'Пахать еще и пахать'},
        {uid:8, message:'Если я скажу ты скажешь, что не в своем уме'},
        {uid:12, message:'https://www.instagram.com/reel/CrGY6FAAvwcSFGXsKfvP5JixmYK_WIVkikRQ2A0/?igshid=Mzc1MmZhNjY='},
        {uid:24, message:'Ну я ж незламный. Меня больше тревожит уровень наеденности'},
        {uid:8, message:'После твоей удачи страшно разболелась голова, больше так не делай. Посуду помыла, список написала, зубы почистила, легла'},
        {uid:19, message:'Один чувак работал на 2х работах, в дневную и в ночную смену. А домашки делал с планшета, пока на травмае ехал на работу. Так что да, у тебя норм условия'},
        {uid:1, message:'Какой смысл мне идти сецчас в кровать?'},
        {uid:19, message:'Отдыхать'},
    ]
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const socketUrl = 'ws://tranquil-reaches-58824.herokuapp.com/';

    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
      } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        onClose: () => console.log('closed'),
        shouldReconnect: (closeEvent) => true,
      });

    useEffect(() => {
        setUsers(testUsers);
        setMessages(testMessages);
        sendMessage('Hello');
    }, []);

    useEffect(() => {
        if(lastMessage) console.log(lastMessage.data);
    }, [lastMessage])

    const getUser = (uid) => {
        return testUsers.find(user => user.uid === uid);
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
          //defaultValue="Default Value"
        />
        <Button variant="contained" sx={{height:'35px'}}>Send</Button>
        </div>
        
        </>
    );
}