# INKD Waitlist Setup Guide

## Step 1: Create New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "INKD Waitlist"
4. Add headers in row 1: `Email`, `User Type`, `Timestamp`

## Step 2: Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Name it "INKD Waitlist Handler"
4. Replace the default code with:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.email,
      data.userType,
      data.timestamp
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Link Script to Sheet
1. In Apps Script, click "Resources" → "Libraries" (if needed)
2. Or use the code above which auto-connects to the active sheet
3. Make sure to open your Google Sheet in another tab first

## Step 4: Deploy Web App
1. Click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Click "Deploy"
6. Copy the web app URL

## Step 5: Update Environment Variable
Add to your `.env` file:
```
REACT_APP_WAITLIST_ENDPOINT=YOUR_WEB_APP_URL_HERE
```

## Step 6: Deploy to Vercel
Make sure to add the environment variable in Vercel dashboard:
- Settings → Environment Variables
- Name: `REACT_APP_WAITLIST_ENDPOINT`
- Value: Your web app URL