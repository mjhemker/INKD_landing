// Google Apps Script to handle INKD waitlist submissions
// Deploy this as a web app in Google Apps Script console

// Replace 'YOUR_SPREADSHEET_ID' with your actual Google Sheets ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'INKD Waitlist';

function doPost(e) {
  try {
    // Parse the request
    const data = JSON.parse(e.postData.contents);
    const { email, userType, timestamp } = data;
    
    // Validate data
    if (!email || !userType || !timestamp) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Missing required fields' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      sheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Email', 'User Type', 'Submitted At']]);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }
    
    // Add the new entry
    const formattedTimestamp = new Date(timestamp).toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    sheet.appendRow([
      formattedTimestamp,
      email,
      userType,
      new Date().toISOString()
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle preflight requests for CORS
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'INKD Waitlist API Ready' }))
    .setMimeType(ContentService.MimeType.JSON);
}