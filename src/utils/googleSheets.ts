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
    
    // Use the working pattern from pantreat_landing
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log('📊 Google Sheets response:', response.status, responseText);
    console.log('📊 Full response object:', response);

    // Since we can see the data is being saved to the sheet, 
    // let's be more forgiving with response parsing
    try {
      const result = JSON.parse(responseText);
      console.log('✅ Successfully saved to Google Sheets:', result);
      return result.success;
    } catch (parseError) {
      // If we can't parse the response but got a 200 status, assume success
      console.log('⚠️ Could not parse response, but got status:', response.status);
      if (response.status === 200) {
        console.log('✅ Assuming success based on 200 status');
        return true;
      }
      return false;
    }
    
  } catch (error) {
    console.error('❌ Google Sheets error:', error);
    return false;
  }
};