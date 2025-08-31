// Test script to verify waitlist endpoint
// Run with: node test-waitlist.js

const testWaitlist = async () => {
  const testData = {
    email: 'test@example.com',
    userType: 'client',
    timestamp: new Date().toISOString()
  };

  const testUrl = 'https://script.google.com/macros/s/AKfycbzmYf1vcuUT31NqYQJhuz7CHo6LI1HB_UHghOtjWSuaI6S1AVoRtT5QvxpFT4IwFUcsqw/exec';
  
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