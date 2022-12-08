import { FC, useEffect, useState } from 'react';

import { useAuthContext } from '@/hooks/useAuthContext';

import MenuIcon from '@mui/icons-material/Menu';

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import ButtonDialogDataAccess from '../DialogDataAccess';
import { AppBar, ToolbarApp } from './styles';

type TopBarProps = {
  open: boolean;
  statusMenu: () => void;
};

const TopBar: FC<TopBarProps> = ({ open, statusMenu }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user, handleLogout } = useAuthContext();

  const openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const statusDialog = () => setOpenDialog((prev) => !prev);

  useEffect(() => {
    if (user && user.active && !user.redefinePassword) {
      setOpenDialog(false);
    }
  }, [user]);

  return (
    <AppBar position="fixed" open={open}>
      <ToolbarApp>
        {user && user.active ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={statusMenu}
            edge="start"
            sx={{ mr: 2 }}
          >
            {!open && <MenuIcon />}
          </IconButton>
        ) : (
          <Typography variant="button" gutterBottom>
            {`Olá, seja bem vindo ao ${process.env.NEXT_PUBLIC_APP_NAME}`}
          </Typography>
        )}
        <Box display="flex" alignItems="center" justifyContent="center">
          {!user || !user.active ? (
            <>
              <ButtonDialogDataAccess
                openDialog={openDialog}
                statusDialog={statusDialog}
              />
            </>
          ) : (
            <Button
              id="basic-button"
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={handleClick}
            >
              <Avatar
                alt={user.email}
                src={user.urlImage}
                sx={{ width: 46, height: 46 }}
              />
            </Button>
          )}
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Meus dados</MenuItem>
          <MenuItem
            onClick={() => {
              handleLogout();
              setAnchorEl(null);
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </ToolbarApp>
    </AppBar>
  );
};

export default TopBar;
