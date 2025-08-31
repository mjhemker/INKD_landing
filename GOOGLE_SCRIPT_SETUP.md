# EXACT Google Apps Script Setup (Working Code from Pantreat)

## Step 1: Google Apps Script Setup

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. **IMPORTANT**: Click on "Untitled Project" and rename it to "INKD Waitlist"

## Step 2: Connect to Your Google Sheet

1. In the Apps Script editor, click the "+" next to "Services"
2. Add "Google Sheets API" 
3. OR simply use the code below which uses `getActiveSpreadsheet()`

## Step 3: Replace Code with Working Version

Copy this EXACT code (from `google-apps-script-working.js`):

```javascript
function doPost(e) {
  console.log('Received request:', e.postData.contents);
  
  try {
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    console.log('Parsed data:', data);
    
    // Extract fields
    const email = data.email || 'No email';
    const userType = data.userType || 'Not specified';
    const timestamp = data.timestamp || new Date().toLocaleString();
    
    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Email', 'User Type', 'Signup Time']);
    }
    
    // Add row to sheet
    sheet.appendRow([email, userType, timestamp]);
    console.log('Row added successfully');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Added to sheet' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 4: Grant Permissions

1. Click "Run" button in the Apps Script editor
2. Grant all permissions when prompted
3. Make sure it runs without errors

## Step 5: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Settings:
   - Type: "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
3. Click "Deploy"
4. **IMPORTANT**: Update your .env file with the NEW web app URL

## Step 6: Test

The form should now work correctly and save:
- Email
- User Type (Client or Artist)
- Signup Time

## Troubleshooting

If still getting redirects:
1. Make sure you granted ALL permissions
2. Try running the script manually in the editor first
3. Create a BRAND NEW deployment (don't update existing)
4. Make sure you're using the newest deployment URL