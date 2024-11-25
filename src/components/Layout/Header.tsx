import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Box
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Search, 
  PawPrint, 
  LogOut, 
  User, 
  Settings,
  Bell
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'primary.main' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        
        <PawPrint className="mr-2" />
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 600
          }}
        >
          PawfectLearning
        </Typography>

        <IconButton color="inherit" sx={{ mr: 2 }}>
          <Search />
        </IconButton>

        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              component={Link} 
              to="/create" 
              variant="contained"
              color="primary"
              sx={{ 
                borderRadius: '20px',
                px: 3
              }}
            >
              New Post
            </Button>
            
            <IconButton color="inherit">
              <Bell size={20} />
            </IconButton>

            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar 
                src={user?.avatar} 
                alt={user?.name}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Box>
        ) : (
          <>
            <Button 
              component={Link} 
              to="/login" 
              color="inherit" 
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Button 
              component={Link} 
              to="/register" 
              variant="contained" 
              color="primary"
              sx={{ borderRadius: '20px', px: 3 }}
            >
              Sign Up
            </Button>
          </>
        )}

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.08))',
              mt: 1.5,
              width: 220,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1.5,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {user?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 1 }} />
          
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <User size={18} />
            </ListItemIcon>
            Profile
          </MenuItem>
          
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings size={18} />
            </ListItemIcon>
            Settings
          </MenuItem>
          
          <Divider sx={{ my: 1 }} />
          
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <LogOut size={18} color="error" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};