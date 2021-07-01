import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Profiles(props: any) {
  const { name } = props;
  return (
    <div>
    <p>
      <h1>This is Profiles, {name}</h1>
    </p>
          <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Basic Info
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
          Avatar-Specific
        </Link>
        <Typography color="textPrimary">Advanced</Typography>
      </Breadcrumbs>
    </div>
  );
}
