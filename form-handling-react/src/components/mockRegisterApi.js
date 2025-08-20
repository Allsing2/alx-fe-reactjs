// mockRegisterApi.js
// This utility function simulates an API call for user registration.
// It returns a Promise that resolves after a short delay, mimicking network latency.

const MockRegisterApi = (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Registering user:', userData);
      // Simulate a scenario where a specific user already exists
      if (userData.username === 'testuser' && userData.password === 'password123') {
        resolve({ success: false, message: 'User already exists!' });
      } else {
        // Simulate successful registration for other users
        resolve({ success: true, message: 'Registration successful!' });
      }
    }, 1000); // 1-second delay to simulate API response time
  });
};

export default MockRegisterApi;
