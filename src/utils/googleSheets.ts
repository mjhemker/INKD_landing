export const submitToWaitlist = async (email: string, userType: 'client' | 'artist'): Promise<boolean> => {
  try {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const url = process.env.REACT_APP_GOOGLE_SHEETS_URL;
    
    if (!url) {
      console.error('Google Sheets URL not configured');
      return false;
    }
    
    const payload = {
      email: email,
      userType: userType === 'client' ? 'Client' : 'Artist',
      timestamp: timestamp
    };
    
    console.log('📊 Submitting to waitlist:', payload);
    console.log('📊 URL:', url);
    
    // Use no-cors mode for deployed sites
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // With no-cors mode, we can't read the response
    // Since we know the script is working (test data appeared), assume success
    console.log('✅ Submitted to Google Sheets (no-cors mode)');
    return true;
    
  } catch (error) {
    console.error('❌ Google Sheets error:', error);
    return false;
  }
};