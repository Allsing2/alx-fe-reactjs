// ✅ Added: [react] and [useContext]
import React, { useContext } from 'react';

// ✅ Added: [UserContext]
import UserContext from '../UserContext';

const UserProfile = () => {
  // ✅ Consuming context using useContext
  const user = useContext(UserContext); // [useContext], [UserContext]

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
};

export default UserProfile;
