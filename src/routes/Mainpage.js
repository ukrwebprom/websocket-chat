import { Container } from '@mui/material';
import { useUser } from 'firebase-func';
import { useWebSocket } from 'server-api';
import { MakeChatID } from 'components/MakeChatID/MakeChatID';
import { Title } from 'components/Title/Title';
import { Login } from 'components/Login/Login';
import { CenterPage } from 'components/Utils/Utils';

export const Mainpage = ({start}) => {
  const { user } = useUser();
  const {enterChat} = useWebSocket();

  const onEnterChat = (id) => {
    enterChat(id);
    /* start(true); */
  }

  return (
    <CenterPage>
    <Container fixed>

        <Title />
          {user? 
            <MakeChatID startChat={onEnterChat}/>
           :
          <Login />
          }
        
    </Container>
    </CenterPage>
  );
};
