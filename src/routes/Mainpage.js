import { Button } from '@mui/material';
import { ReactComponent as MainImg } from 'main-img.svg';
import { useUser } from 'firebase-func';
import { Container } from '@mui/material';
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";

export const Mainpage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const createChat = () => {
    navigate(`/${nanoid()}`);
  }
  return (
    <div className="centerpage">
    <Container fixed>
      <div className="mainpageblock">
        <MainImg />
        <div className='mainpageblock__content'>
          <h1>the Chat</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
          {user? 
          <Button variant="outlined" onClick={createChat}>Create a chat room</Button> :
          <ul>
            <li>Log In with your Google account</li>
            <li>Create a chat room</li>
            <li>Share the link withe other</li>
          </ul>
          }
        </div>
        
      </div>
    </Container>
    </div>
  );
};
