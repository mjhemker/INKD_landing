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
    
    console.log('📊 Submitting to waitlist:', { email, userType, timestamp });
    
    // Use the working pattern from pantreat_landing
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        userType: userType === 'client' ? 'Client' : 'Artist',
        timestamp: timestamp
      }),
    });

    const responseText = await response.text();
    console.log('📊 Google Sheets response:', response.status, responseText);

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status} - ${responseText}`);
    }

    const result = JSON.parse(responseText);
    console.log('✅ Successfully saved to Google Sheets:', result);
    
    return result.success;
    
  } catch (error) {
    console.error('❌ Google Sheets error:', error);
    return false;
  }
};