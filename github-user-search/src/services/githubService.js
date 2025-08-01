// testApi.js

// Import the function you want to test
import { fetchUserData } from './services/githubService.js';

// Define an async function to run our tests
const runTests = async () => {
    console.log("--- Starting API Tests ---");

    // Test Case 1: Valid GitHub user
    console.log("\nTesting with a valid user ('octocat')...");
    try {
        const userData = await fetchUserData('octocat');
        console.log("SUCCESS! Found user:", userData.login);
        // You can add more assertions here, e.g.,
        // console.log("User has " + userData.public_repos + " public repos.");
    } catch (error) {
        console.error("FAILED! Unexpected error:", error.message);
    }

    // Test Case 2: Non-existent GitHub user
    console.log("\nTesting with a non-existent user ('this-user-does-not-exist-12345')...");
    try {
        await fetchUserData('this-user-does-not-exist-12345');
        console.error("FAILED! Expected an error but got a success.");
    } catch (error) {
        console.log("SUCCESS! Caught expected error:", error.message);
    }

    // Test Case 3: Empty username
    console.log("\nTesting with an empty username...");
    try {
        await fetchUserData('');
        console.error("FAILED! Expected an error but got a success.");
    } catch (error) {
        console.log("SUCCESS! Caught expected error:", error.message);
    }

    console.log("\n--- API Tests Complete ---");
};

// Execute the tests
runTests();