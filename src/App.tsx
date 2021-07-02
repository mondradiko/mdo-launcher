import {
  Fab,
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
import AddIcon from '@material-ui/icons/Add'
import DnsIcon from '@material-ui/icons/Dns';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import EmailIcon from '@material-ui/icons/Email'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import GitHubIcon from '@material-ui/icons/GitHub';
import SimCardIcon from '@material-ui/icons/SimCard';

import { createClient } from '@supabase/supabase-js';
//XrStructureType;
//XrInstanceCreateFlags;
//XrApplicationInfo;

const XR_USE_GRAPHICS_API_OPENGL = "OpenGL"
const XR_USE_GRAPHICS_API_OPENGL_ES = "OpenGL ES"

const XR_USE_GRAPHICS_API_VULKAN = "Vulkan"

//D3D10 DEPRECATED (OpenXR 1.0)
const XR_USE_GRAPHICS_API_D3D11 = "Direct3D 11"
const XR_USE_GRAPHICS_API_D3D12 = "Direct3D 12"

//Window System Header Control
//Compile Time Symbol	Window System Name
const XR_USE_PLATFORM_WIN32 = "Microsoft Windows";
const XR_USE_PLATFORM_XLIB = "X Window System Xlib"
const XR_USE_PLATFORM_XCB = "X Window System Xcb"
const XR_USE_PLATFORM_WAYLAND = "Wayland"

const XR_USE_PLATFORM_ANDROID = "Android Native"
//XR_USE_PLATFORM_ARKIT = "ARKit"?

//Actual 1-to-1 function that can be passed to WASM or Mondradiko
type XrInstanceCreateInfo = {
      type: any;
      next: null;
      createFlags: any;
      applicationInfo: any;
      enabledApiLayerCount: number;
      enabledApiLayerNames: number;
      enabledExtensionCount: number;
      enabledExtensionNames: number;
} 

//an Assertable Query which Mondradiko/WASM can parse for Display Data
type OpenXRConfig = {
  user_id: string;
  channel_id: number;
  displayType: string;
  cvars: { graphicsAPI: string };
}

export default function App() {
const [session, setSession] = useState(null)
const [selectedIndex, setSelectedIndex] = React.useState(0);
const [loading, setLoading] = useState(false)
const [email, setEmail] = useState('')
const [username, setUsername] = useState(null)
const [website, setWebsite] = useState(null)
const [avatar_url, setAvatarUrl] = useState(null)
const [uploading, setUploading] = useState(false)

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

let REACT_APP_NEXT_PUBLIC_SUPABASE_URL = "https://nxsdswlefppxbctvsjpn.supabase.co";
let REACT_APP_SUPABASE_SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNDU4NTE1OCwiZXhwIjoxOTQwMTYxMTU4fQ.LX3N311P4eDPFXcgJCzF6j9qDYt3u3ArNLRBmmaYny0";

//RIP dotenv
//process.env.REACT_APP_NEXT_PUBLIC_SUPABASE_URL,
//process.env.REACT_APP_SUPABASE_SECRET_KEY

// Create a single supabase client for interacting with your database 
const supabase = createClient(
  REACT_APP_NEXT_PUBLIC_SUPABASE_URL,
  REACT_APP_SUPABASE_SECRET_KEY
);

const xrResponse = await OpenXR
  .from<OpenXRConfig>('displays') // Message maps to the type of the row in your database.
  .select('*, cvars:graphicsAPI(username)')
  .match({ channel_id: 0 }) // Your IDE will be able to help with auto-completion.
xrResponse.data // Response data will be of type Array<Message>.


useEffect(() => {
  setSession(supabase.auth.session())

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })
  
  if (avatar_url) downloadImage(avatar_url)
}, [])

const Account = (session: any) =>{
  return (
    <div className="form-widget">
      <div>
        <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url: string) => {
            setAvatarUrl(url)
            updateProfile({ username, website, avatar_url: url })
        }}
        />
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}

const Avatar = (url: string, size, onUpload ) => {
  return (
    <div>
      {url ? (
        <img
          src={url}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}

const Auth = () => {
  return(
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + Electron</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Fab color="primary" aria-label="add">
              <EmailIcon />
            </Fab>
            <Fab color="primary" aria-label="add">
              <VpnKeyIcon />
            </Fab>
            <Fab color="secondary" aria-label="add">
              <GitHubIcon />
            </Fab>
            <Fab color="primary" aria-label="add">
              <SimCardIcon />
            </Fab>
        </div>
        <div></div>
        <div style={{margin: "1px"}}>
            <button
              onClick={(e) => {
                e.preventDefault()
                handleLogin(email)
              }}
              className="button block"
              disabled={loading}
            >
              <span>{loading ? 'Loading' : 'Send magic link'}</span>
            </button>
        </div>
      </div>
    </div>
  )
}
/*const { user, session, error } = await supabase.auth.signUp({
  email: 'example@email.com',
  password: 'example-password',
})

const { user, session, error } = await supabase.auth.signIn({
  email: 'example@email.com',
  password: 'example-password',
})

const { error } = await supabase.auth.signOut()

type Message = {
  id: number;
  inserted_at: string;
  message: string;
  user_id: string;
  channel_id: number;
  author: { username: string };
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
*/

async function downloadImage(path: string) {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path)
    if (error) {
      throw error
    }
    const url = URL.createObjectURL(data)
    setAvatarUrl(url)
  } catch (error) {
    console.log('Error downloading image: ', error.message)
  }
}

async function uploadAvatar(event) {
  try {
    setUploading(true)

    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = event.target.files[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    let { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    //onUpload(filePath)
  } catch (error) {
    alert(error.message)
  } finally {
    setUploading(false)
  }
}

async function getProfile() {
  try {
    setLoading(true)
    const user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()

    if (error && status !== 406) {
      throw error
    }

    if (data) {
      setUsername(data.username)
      setWebsite(data.website)
      setAvatarUrl(data.avatar_url)
    }
  } catch (error) {
    alert(error.message)
  } finally {
    setLoading(false)
  }
}

async function updateProfile({username, website, avatar_url }) {
  try {
    setLoading(true)
    const user = supabase.auth.user()

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    }

    let { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })

    if (error) {
      throw error
    }
  } catch (error) {
    alert(error.message)
  } finally {
    setLoading(false)
  }
}

const downloadReady = (affirm) => {
  return affirm;
}

const autoDownloadMondradiko = (affirm) => {
  return affirm;
}

const setError = (e) => {
  return e;
}

const handleLogin = async (email: string) => {
  try {
    setLoading(true)
    const { error } = await supabase.auth.signIn({ email })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    setLoading(false)
  }
}


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
          { !session ? <Auth /> : <Switch>
            <Route exact path="/" component={() => <Homepage name={"react sucks"} />} />
            <Route exact path="/account" component={()=> <Account key={session.user.id} session={session} />} />
            <Route exact path="/server" component={() => <ServerBrowser name={"react funny"} />} />
            <Route exact path="/profile"  component={() => <Profiles name={"react teaches"} /> } />
            <Route exact path="/setting"  component={() => <Settings name={"react rules"} /> } />
          </Switch>}
      </main>

      </Router>
    </div>
  );
}
