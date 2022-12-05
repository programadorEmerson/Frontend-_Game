import { FC } from 'react';

import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { drawerWidth } from '../styles';

const ItemsMenu: FC = () => {
  return (
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem sx={{ width: `${drawerWidth}px` }} key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemsMenu;
