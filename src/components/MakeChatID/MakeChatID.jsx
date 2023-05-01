import { Button, Input, InputAdornment, TextField } from '@mui/material';
import { RxCopy } from 'react-icons/rx';
import { useCopyToClipboard } from 'usehooks-ts'
import { customAlphabet } from 'nanoid';
import './makechatid.scss';
import { TbMessages } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import { Description } from 'components/Utils/Utils';
import { useUser } from 'firebase-func';
import { useWebSocket } from 'server-api';




export const MakeChatID = ({startChat}) => {
    const {isChatExict, createChat} = useUser();
    const {makeChat, getChat} = useWebSocket();
    const nanoid = customAlphabet('1234567890abcdef', 4);
    const [inputvalue, setInputValue] = useState('');
    const [isValidChat, setIsValidChat] = useState(false);
    const [value, copy] = useCopyToClipboard();


    useEffect(() => {
        if(inputvalue.length === 4 || inputvalue.length === 9 ) setInputValue(i => i+"-");
        if(inputvalue.length !== 14) {setIsValidChat(false);}
        else {
            getChat(inputvalue).then((feedback) => {
                setIsValidChat(feedback !== "")}).catch((e) => console.log(e));
        }
    }, [inputvalue])
    
    const createNewChat = async () => {
        const id = [nanoid(), nanoid(), nanoid()].join("-");
        const res = await makeChat(id);
        console.log(res);
        setInputValue(res);
    }

    const handleEnterChat = () => {
        startChat(inputvalue);
    }

    return (
        <div className='make-module'>
            <Description>You can join the chat if you know the chat ID.<br />Enter a chat ID or create a new chat and share the ID with other participants.</Description>
            <div className='make-module-form'>
                <Button variant="outlined" onClick={createNewChat} size="large">Create a chat room</Button> 
                <Input variant="outlined" 
                placeholder="Enter chat ID"
                value={inputvalue}
                onChange={(event) => setInputValue(event.target.value.trim())}
                endAdornment={
                    <InputAdornment position="end">
                      <button type="button" onClick={() => copy(inputvalue)} className='code-line-btn' disabled={!isValidChat}><RxCopy size={20}/></button>
                    </InputAdornment>
                  }
                />
            </div>
            <Button variant="filled" onClick={handleEnterChat} size="large" disabled={!isValidChat}>enter the chat</Button> 
        </div>
    )
}