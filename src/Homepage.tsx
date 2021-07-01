import React from 'react';

export default function Homepage(props: any) {
  const { name } = props;
  return (
    <p>
      <h1>Hello, {name}</h1>
    </p>
  );
}
