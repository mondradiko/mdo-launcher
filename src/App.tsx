import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';

import React, { useState, useEffect } from 'react';
import {HashRouter as Router, Switch, Route, useHistory,  NoMatch, NavLink} from 'react-router-dom';
import '@fontsource/roboto';
import './App.global.css';
import logo from './emblem.svg';
import Homepage from './Homepage';
import Settings from './Settings';
import Profiles from "./Profiles";
import ServerBrowser from "./ServerBrowser";

import HomeIcon from '@material-ui/icons/Home';
import DnsIcon from '@material-ui/icons/Dns';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

export default function App() {
const [selectedIndex, setSelectedIndex] = React.useState(0);
const handleListItemClick = (
  _: React.MouseEvent<HTMLDivElement, MouseEvent>,
  index: number
) => {
  console.log("current: " + index);
  setSelectedIndex(index);
};

const StyledListItem = withStyles({
  root: {
    background: 'none',
    color: '#afafaf',
    '&$selected, &$selected:hover': {
      backgroundColor: '#FFF',
    },
  },
  selected: {
    background: '#FFF',
    color: '#16825D',
    fontWeight: "bold",
  },
})(ListItem);

const downloadReady = (affirm) => {
  return affirm;
}

const autoDownloadMondradiko = (affirm) => {
  return affirm;
}

const setError = (e) => {
  return e;
}

//This will need to be filled with the link for git release artefacts as they exist
//for now, the Fetch API is used to request a download and an additional function will
//handle displaying download time and where the file goes (if it is a blob this could be simpler)
useEffect(() => {
  fetch("https://api.example.com/items")
    .then(res => res.json())
    .then(
      (result) => {
        downloadReady(true);
        autoDownloadMondradiko(result);
      },
      (error) => {
        downloadReady(true);
        setError(error);
      }
    )
}, [])

//N-API MINI-MODULE, uncomment the below lines when the launcher successfully downloads
//Mondradiko for the first time, aka, when the useEffect is actually useable.
{/*async function pipeLogs() {
  const { spawn } = require('node/child_process').exec;
  const ls = spawn('mondradiko.exe', ['-debug', 'pipe.bat']);
  const exec = await execFile('mondradiko', ['--dump']);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}*/}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-name">Mondradiko</div>
      </header>
      
      <Router>
      <div className="sidenav">
          {/*<Sidenav />*/}
          <List component="nav">
          <NavLink className="nav-link" to="/">
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
        </NavLink>

        <NavLink className="nav-link" to="/server">
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
        </NavLink>

        <NavLink className="nav-link" to="/profile">
        <StyledListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profiles" />
        </StyledListItem></NavLink>
        <NavLink className="nav-link" to="/setting">
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
        </NavLink>
      </List>
      </div>

      <main className="main">
          <Switch>
            <Route exact path="/" component={() => <Homepage name={"react sucks"} />} />
            <Route exact path="/server" component={() => <ServerBrowser name={"react funny"} />} />
            <Route exact path="/profile"  component={() => <Profiles name={"react teaches"} /> } />
            <Route exact path="/setting"  component={() => <Settings name={"react rules"} /> } />
          </Switch>
      </main>

      </Router>
    </div>
  );
}
