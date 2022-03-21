import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import {AppContext} from '../context/AppContext'
import { useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import ContactlessIcon from '@mui/icons-material/Contactless';
import ArticleIcon from '@mui/icons-material/Article';
import WarehouseIcon from '@mui/icons-material/Warehouse';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 115,
  },
}));

export default function ButtonAppBar({children}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {user, setUser} = useContext(AppContext);

  const handleLogout=()=>{
    setUser({})
    setAnchorEl(null);
  }

  function loggedIn(){
    
    return [
      <MenuItem key='home' onClick={handleClose}><Link to="/HomeForm" className="nav-link">Homes</Link></MenuItem>,
      <MenuItem key='categories' onClick={handleClose}>Categories</MenuItem>,
      <MenuItem key='logout' onClick={handleLogout}><Link to="/" className="nav-link">Logout</Link></MenuItem>
    ]
  }

  function loggedOut(){
    
    return <MenuItem key='login' onClick={handleClose}><Link to="/LoginForm" className="nav-link">Login</Link></MenuItem>
  }

  const handleMenu = (event) => {
    
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <IconButton sx={{ px: 1 }}>
            <Link to="/" className="nav-link"><Avatar alt="Cedar Heights Logo" src="https://res.cloudinary.com/dslbd7ifs/image/upload/v1647575971/CHLogo_qb6vdr.png" /></Link>
          </IconButton>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Cedar Heights Housing Community
                <Typography
                  variant="h5"
                  noWrap
                  component="div"
                  sx={{ display: 'flex', alignItems: 'center', pt:1.5 }}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  <Link to="/HomeList" className="nav-link">Inventory</Link>
                  <WarehouseIcon sx={{ mr: 0.5, ml:2 }} fontSize="inherit" />
                  <Link to="/" className="nav-link">Storage Solutions</Link>
                  <ArticleIcon sx={{ mr: 0.5, ml:2 }} fontSize="inherit" />
                  <Link to="/" className="nav-link">Apply Online</Link>
                  <ContactlessIcon sx={{ mr: 0.5, ml:2 }} fontSize="inherit" />
                  <Link to="/" className="nav-link">Contact Us</Link>
                </Typography>
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user?.token ? loggedIn() : loggedOut()}

              </Menu>
            </div>

        </StyledToolbar>
      </AppBar>
      {children}
    </Box>
  );
}