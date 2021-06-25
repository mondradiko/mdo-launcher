import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import DnsIcon from '@material-ui/icons/Dns';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

export default function Sidenav() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (
    _: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const StyledListItem = withStyles({
    root: {
      background: 'none',
      color: '#afafaf',
      '&$selected, &$selected:hover': {
        backgroundColor: 'white',
      },
    },
    selected: {
      background: 'white',
      color: '#333',
    },
  })(ListItem);

  return (
    <List component="nav">
      <StyledListItem
        button
        selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </StyledListItem>
      <StyledListItem
        button
        selected={selectedIndex === 1}
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <DnsIcon />
        </ListItemIcon>
        <ListItemText primary="Server Browser" />
      </StyledListItem>
      <StyledListItem
        button
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profiles" />
      </StyledListItem>
      <StyledListItem
        button
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </StyledListItem>
    </List>
  );
}
