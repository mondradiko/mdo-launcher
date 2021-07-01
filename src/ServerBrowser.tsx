import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import DnsIcon from '@material-ui/icons/Dns';

export default function ServerBrowser(props: any) {
  const { name } = props;
  
  return (
    <div>
    <p>
      <h1>Server Settings, {name}</h1>
    </p>
    <List
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        All Servers
      </ListSubheader>
    }
  >
    <ListItem button>
      <ListItemIcon>
        <DnsIcon />
      </ListItemIcon>
      <ListItemText primary="X-COM" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DnsIcon />
      </ListItemIcon>
      <ListItemText primary="All Welcome" />
    </ListItem>
    <ListItem button onClick={() => console.log("clicked")}>
      <ListItemIcon>
        <DnsIcon />
      </ListItemIcon>
      <ListItemText primary="HOWDY" />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button>
          <ListItemIcon>
            <DnsIcon />
          </ListItemIcon>
          <ListItemText primary="Physics chat" />
        </ListItem>
      </List>
    </Collapse>
  </List>
  </div>
  );
}
