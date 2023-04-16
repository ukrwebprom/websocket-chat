import { useUser } from 'firebase-func';
import { useEffect, useState } from 'react';
import { Button, Avatar } from '@mui/material';
import { Container } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './header.scss';

export const Header = () => {
  const { user, LogIn, LogOut } = useUser();

  const [anchorEl, setAnchorEl] = useState(null);
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
  
  return (
    <>
    <AppBar position="fixed" color="clear">
      <Container maxWidth="xl">
      <Toolbar disableGutters sx={{justifyContent:'space-between'}}>
      <Typography
            variant="h6"
            noWrap
            component="a"
            href="/">the Chat</Typography>

<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}></Box>
      {user ? (
            <Tooltip title="Open settings">
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <Avatar alt={user.displayName} src={user.photoURL} />
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
    <MenuItem onClick={handleClose}>Profile</MenuItem>
    <MenuItem onClick={handleClose}>My account</MenuItem>
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
    </>
/*     <div className="header">
      <Container maxWidth="xl">
        <div className="header__contain">
          <p>Logo</p>
          {user ? (
            <Avatar alt={user.displayName} src={user.photoURL} onClick={handleClick}>
              {user.displayName[0]}
            </Avatar>
          ) : (
            <Button
              variant="outlined"
              onClick={() => LogIn()}
              sx={{ boxSizing: 'content-box', height: '34px' }}
            >
              Login
            </Button>
          )}
        </div>
        
      </Container>
    </div> */
  );
};
