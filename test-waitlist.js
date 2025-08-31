// Test script to verify waitlist endpoint
// Run with: node test-waitlist.js

const testWaitlist = async () => {
  const testData = {
    email: 'test@example.com',
    userType: 'client',
    timestamp: new Date().toISOString()
  };

  // You'll need to update this URL after creating your new Google Apps Script
  const testUrl = 'YOUR_NEW_WEB_APP_URL_HERE';
  
  console.log('Testing waitlist with:', testData);
  
  try {
    const response = await fetch(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Waitlist test successful!');
    } else {
      console.log('❌ Waitlist test failed:', result.error);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
};

testWaitlist();