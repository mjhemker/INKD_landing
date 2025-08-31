interface WaitlistEntry {
  email: string;
  userType: 'client' | 'artist';
  timestamp: string;
}

export const addToWaitlist = async (email: string, userType: 'client' | 'artist'): Promise<boolean> => {
  const webAppUrl = process.env.REACT_APP_WAITLIST_ENDPOINT;
  
  if (!webAppUrl) {
    console.error('Waitlist endpoint not configured');
    return false;
  }

  const entry: WaitlistEntry = {
    email: email,
    userType: userType,
    timestamp: new Date().toISOString()
  };

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
      return result.success === true;
    }
    
    return false;
  } catch (error) {
    console.error('Waitlist submission failed:', error);
    return false;
  }
};