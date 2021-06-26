import React from 'react';
import {
    Typography,
    Breadcrumbs,
    Link,
    Button,
    Menu,
    MenuItem,
} from '@material-ui/core';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export default function Settings(props: any) {
  const { name } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
    <p>
      <h1>Welcome to settings, {name}</h1>
    </p>

    <Breadcrumbs aria-label="breadcrumb">
    <Link color="inherit" href="/" onClick={handleClick}>
    Basic
    </Link>
    <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
    Advanced
    </Link>
    <Typography color="textPrimary">Download Rules</Typography>
    </Breadcrumbs>    


    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Mondradiko Download Policy Config
    </Button>
    <Menu
    id="simple-menu"
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={handleClose}
    >
    <MenuItem onClick={handleClose}>Auto</MenuItem>
    <MenuItem onClick={handleClose}>Manual</MenuItem>
    <MenuItem onClick={handleClose}>None</MenuItem>
    </Menu>
    </div>
  );
}
