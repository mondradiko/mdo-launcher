import React from 'react';

import{
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

import DnsIcon from '@material-ui/icons/Dns';

import LaunchEngineProcess from './EngineProcess';

function OnClick(name : string) {
  console.log("clicked: " + name);
  LaunchEngineProcess(name);
}

export default function ServerListItem(props : any) {
  return (
  <ListItem button onClick={() => OnClick(props.name)}>
    <ListItemIcon>
      <DnsIcon />
    </ListItemIcon>
    <ListItemText primary={props.name} />
	</ListItem>
  );
}
