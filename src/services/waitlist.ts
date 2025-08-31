interface WaitlistEntry {
  email: string;
  userType: 'client' | 'artist';
  timestamp: string;
}

export const addToWaitlist = async (email: string, userType: 'client' | 'artist'): Promise<boolean> => {
  const webAppUrl = process.env.REACT_APP_WAITLIST_ENDPOINT || 'https://script.google.com/macros/s/AKfycbzmYf1vcuUT31NqYQJhuz7CHo6LI1HB_UHghOtjWSuaI6S1AVoRtT5QvxpFT4IwFUcsqw/exec';
  
  console.log('Environment check:', {
    hasUrl: !!webAppUrl,
    url: webAppUrl,
    fromEnv: !!process.env.REACT_APP_WAITLIST_ENDPOINT,
    allEnv: Object.keys(process.env).filter(k => k.startsWith('REACT_APP'))
  });
  
  if (!webAppUrl || webAppUrl.trim() === '') {
    console.error('❌ Waitlist endpoint not configured');
    return false;
  }

  const entry: WaitlistEntry = {
    email: email,
    userType: userType,
    timestamp: new Date().toISOString()
  };

  console.log('📨 Submitting to waitlist:', entry);
  console.log('🎯 Endpoint:', webAppUrl);

  try {
    await fetch(webAppUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });

    console.log('✅ Submitted successfully (no-cors mode)');
    return true;
    
  } catch (error) {
    console.error('❌ Fetch failed:', error);
    return false;
  }
};