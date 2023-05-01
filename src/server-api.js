import { createContext, useContext, useState, useEffect } from "react";
import { w3cwebsocket } from 'websocket';
import { useUser } from 'firebase-func';
import { nanoid } from "nanoid";
import axios from 'axios';
/* axios.defaults.baseURL = 'http://tranquil-reaches-58824.herokuapp.com:8000'; */
const ax = axios.create({
    baseURL:'http://tranquil-reaches-58824.herokuapp.com',
  });

const socketContext = createContext();
export const useWebSocket = () => useContext(socketContext);

export const SocketProvider = ({ children }) => { 
    const { user } = useUser();
    const [Hash] = useState(() => localStorage.getItem("WCHash")
      ? JSON.parse(localStorage.getItem("WCHash"))
      : nanoid());

    useEffect(() => {
        localStorage.setItem("WCHash", JSON.stringify(Hash));
    }, [Hash])

    const [chatID, setChatID] = useState(() => '');
    const [client, setClient] = useState(() => null);
    const [isConnected, setIsConnected] = useState(false);
    const [chatUsers, setChatUsers] = useState(() => []);
    const [Message, setMessage] = useState('');

    const makeChat = async (ID) => {
        try {
            const res = await ax.post('/chat', { id: ID });
            return res.data;
        } catch (err) {
            throw new Error(err);
        }
        
    }

    const getChat = async (chekID) => {
        console.log('this is fucking get chat:', chekID);
        try {
            const res = await ax.get('/chat', {params:{id:chekID}})
            if(res.data) setChatUsers(res.data)
            return (res.data);
        } catch (err) {
            throw new Error(err);
        }
    }

    const enterChat = async (ID) => {
        setChatID(ID);
    }

    const Send = (m) => {
        client.send(JSON.stringify({mess:m, name:user.name, photo:user.photo}));
    }

    useEffect(() => {
        if(chatUsers.length > 0) console.log("chat users:", chatUsers);
    }, [chatUsers])
    
    useEffect(() => {
        const toChat = (ID) => {
            try {
                ax.post('/chat/user', {id:ID, hash:Hash, uid:user.uid}).then(() => client.send(JSON.stringify('need_upd')));
            } catch (err) {
                throw new Error(err);
            }
        }
        if(chatID !== '') toChat(chatID);
    }, [chatID, Hash, user, client])

    useEffect(() => {
            if(Message === 'need_upd') getChat(chatID);
    }, [Message, chatID])

    useEffect(() => {
        const connect = () => {
        const socketUrl = `ws://tranquil-reaches-58824.herokuapp.com/?Hash=${Hash}`;
        const clientUnit = new w3cwebsocket(socketUrl);
        setClient(clientUnit);
        clientUnit.onopen = () => setIsConnected(true);
        clientUnit.onclose = () => setIsConnected(false);

        clientUnit.onmessage = (m) => {
            const data = JSON.parse(m.data);
            setMessage(data);
        }}
        if(!isConnected) connect();
    }, [user, chatID, Hash, isConnected])


    return (
        <socketContext.Provider
          value={{ Send, Message, isConnected, chatUsers, makeChat, getChat, enterChat, chatID}}>
          {children}
        </socketContext.Provider>
    );
}