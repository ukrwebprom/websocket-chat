import { useUser } from 'firebase-func';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../imgs/logo.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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

import './header.scss';

export const Header = () => {
  const { user, LogIn, LogOut, UpdateChatName, usersInChat } = useUser();

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
const handleSubmit = () => {
  if(newChatName !== '') UpdateChatName(newChatName);
  setOpenDialog(false);
}

const handleChangeChatName = e => {
  setNewChatName(e.target.value);
}
  return (
    <>
    <AppBar position="fixed" color="clear">
      <Container maxWidth="xl">
      <Toolbar disableGutters sx={{justifyContent:'space-between'}}>
      <div className="userdata">
      <Link to="/"><img src={Logo} width="50px"/></Link>
      {usersInChat > 0 && <Badge badgeContent={usersInChat} color="primary">
        <PersonIcon color="action" />
      </Badge>}
      </div>

<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>
      {user ? (
            

            <Tooltip title="Open settings">
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <Avatar alt={user.name} src={user.photo} />
            </IconButton>
            </Tooltip>
            
          ) : (
            <Button
              variant="outlined"
              onClick={() => LogIn()}
              sx={{ boxSizing: 'content-box', height: '34px' }}
            >
              Login
            </Button>
          )}
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
