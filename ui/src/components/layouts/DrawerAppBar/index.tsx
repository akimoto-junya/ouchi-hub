import { FC, useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';

import { updateWorks } from 'features/Library/api';

type Props = {
  visible: boolean;
  title: string;
};

type DrawerItem = {
  name: string;
  onClick: (navigate: NavigateFunction) => () => void;
};

const drawerWidth = 240;

const navItems: DrawerItem[] = [
  {
    name: 'ライブラリ',
    onClick: (navigate) => {
      return () => navigate('/library');
    },
  },
  {
    name: '作品の同期',
    onClick: (navigate) => {
      return () => {
        updateWorks();
        navigate(0);
      };
    },
  },
  {
    name: '作品の画像設定',
    onClick: (_) => {
      return () => {};
    },
  },
];

const DrawerAppBar: FC<Props> = ({ visible, title }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Ouchi Hub
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} onClick={item.onClick(navigate)} disablePadding>
            <ListItemButton sx={{ textAlign: 'left', pl: 2, py: 2 }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Fade in={visible} appear={false}>
      <Box sx={{ display: 'flex' }}>
        <AppBar component="nav" sx={{ background: 'orange' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item.name} onClick={item.onClick(navigate)} sx={{ color: '#fff' }}>
                  {item.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </Fade>
  );
};

export default DrawerAppBar;
