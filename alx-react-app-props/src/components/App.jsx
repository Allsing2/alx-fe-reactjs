import React from 'react';
import ProfilePage from './ProfilePage';

// ✅ Importing UserContext
import UserContext from './UserContext'; // [UserContext]

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    // ✅ Wrapping ProfilePage with UserContext.Provider and passing value
    <UserContext.Provider value={userData}> {/* [UserContext.Provider] with [value] */}
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
