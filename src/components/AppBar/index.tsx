import { FC } from 'react';

import MenuIcon from '@mui/icons-material/Menu';

import { IconButton, Toolbar, Typography } from '@mui/material';

import { AppBar } from './styles';

type TopBarProps = {
  open: boolean;
  statusMenu: () => void;
};

const TopBar: FC<TopBarProps> = ({ open, statusMenu }) => {
  const propsIcon = { mr: 2, display: open ? 'none' : 'flex' };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={statusMenu}
          edge="start"
          sx={{ ...propsIcon }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
