interface WaitlistEntry {
  email: string;
  userType: 'client' | 'artist';
  timestamp: string;
}

export const submitToWaitlist = async (email: string, userType: 'client' | 'artist'): Promise<boolean> => {
  try {
    const timestamp = new Date().toISOString();
    
    // Since we're in a client-side React app, we'll use Google Sheets as a form endpoint
    // This requires setting up a Google Apps Script web app
    const response = await fetch(process.env.REACT_APP_GOOGLE_SHEETS_URL || '', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        userType: userType === 'client' ? 'Client' : 'Artist',
        timestamp
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error submitting to waitlist:', error);
    return false;
  }
};