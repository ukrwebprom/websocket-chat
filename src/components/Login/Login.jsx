import { useUser } from 'firebase-func';
import Button from '@mui/material/Button';
import { Description } from 'components/Utils/Utils';
import './login.css'

export const Login = () => {
    const { LogIn } = useUser();
    return (
        <div className='login-form'>
        
        <Button
              variant="outlined"
              onClick={() => LogIn()}
              sx={{ boxSizing: 'content-box', height: '34px' }}
            >Login
        </Button>
        <Description>Please login with your google account to use the chat</Description>
        </div>
        
    )
}