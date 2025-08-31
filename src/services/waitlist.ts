interface WaitlistEntry {
  email: string;
  userType: 'client' | 'artist';
  timestamp: string;
}

export const addToWaitlist = async (email: string, userType: 'client' | 'artist'): Promise<boolean> => {
  const webAppUrl = process.env.REACT_APP_WAITLIST_ENDPOINT;
  
  if (!webAppUrl || webAppUrl.trim() === '') {
    console.error('Waitlist endpoint not configured');
    return false;
  }

  const entry: WaitlistEntry = {
    email: email,
    userType: userType,
    timestamp: new Date().toISOString()
  };

  console.log('Submitting to waitlist:', entry);
  console.log('Endpoint:', webAppUrl);

  try {
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Response received:', result);
      return result.success === true;
    } else {
      console.error('HTTP error:', response.status, response.statusText);
      return false;
    }
    
  } catch (error) {
    console.error('Waitlist submission failed:', error);
    return false;
  }
};