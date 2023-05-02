import { useUser } from 'firebase-func';
import { useWebSocket } from 'server-api';
import { useState } from 'react';
import { Container } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import { ReactComponent as MenuIcon } from '../../imgs/menu.svg';

import './header.scss';

export const Header = () => {
  const { user, LogOut, UpdateChatName  } = useUser();
  const {chatID, isConnected, chatUsers, leaveChat} = useWebSocket();
  const userNum = Object.keys(chatUsers).length;

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    LogOut();
  }
  const handleChatName = () => {
    setAnchorEl(null);
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleLeaveChat = () => {
    setAnchorEl(null);
    leaveChat(chatID);
  }
const handleSubmit = () => {
  if(newChatName !== '') UpdateChatName(newChatName);
  setOpenDialog(false);
}

const handleChangeChatName = e => {
  setNewChatName(e.target.value);
}

  return (
    <>
    <AppBar position="fixed" color="clear" sx={{boxShadow:'none'}}>
      <Container maxWidth="xl">
      <Toolbar disableGutters sx={{justifyContent:'space-between', alignItems:'center'}}>
      {user !== null && (
        <div className="userdata">

          {chatID !=='' && 
          <>
          <Badge badgeContent={userNum} color="primary">
            <PersonIcon color="action" />
          </Badge>
          {isConnected? <p>Chat ID: <span className='chatid'>{chatID}</span></p> : <p>Disconnected</p>}
          </>
          }
        </div>)}

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>
      {user && <MenuIcon onClick={handleClick} size={20} color='#339955' className='menuicon'/> }
      </Toolbar>
      </Container>
    </AppBar>
    <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}
  >
    {chatID !=='' && <MenuItem onClick={handleLeaveChat}>Leave chat</MenuItem>}
    <MenuItem onClick={handleChatName}>Set chat name</MenuItem>
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
    <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Set chat name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New chat name"
            type="text"
            fullWidth
            variant="standard"
            value={newChatName}
            onChange={handleChangeChatName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
