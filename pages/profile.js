import React from 'react';
import Image from 'next/image';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Image alt="User Profile" src={user.photoURL} />
      <h1>{user.displayName}</h1>
      <h2>{user.email}</h2>
    </>
  );
}
