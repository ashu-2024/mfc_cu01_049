import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { userId } = useParams();

  const users = [
    { id: 1, name: 'Alice', details: 'Details of Alice' },
    { id: 2, name: 'Bob', details: 'Details of Bob' },
    { id: 3, name: 'Charlie', details: 'Details of Charlie' }
  ];

  const user = users.find(u => u.id === parseInt(userId));

  return (
    <div>
      <h1>{user ? user.details : 'User not found'}</h1>
    </div>
  );
};

export default UserDetails;
