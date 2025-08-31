// Simple Google Apps Script for INKD waitlist
// Copy this code to replace your Google Apps Script

const SPREADSHEET_ID = '1gt_KVZpe4bazVo04WrMyvTs_l6m1gbRwS8xPvcIPGEI';
const SHEET_NAME = 'INKD Waitlist';

function doGet(e) {
  return doPost(e);
}

function doPost(e) {
  try {
    // Get parameters from either GET or POST
    const email = e.parameter.email || e.parameters.email;
    const userType = e.parameter.userType || e.parameters.userType;
    const timestamp = e.parameter.timestamp || e.parameters.timestamp;
    
    // Validate
    if (!email || !userType) {
      return ContentService
        .createTextOutput('{"success":false,"error":"Missing email or userType"}')
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Open spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if needed
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'Email', 'User Type', 'Submitted At']]);
    }
    
    // Add entry
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    sheet.appendRow([
      formattedTime,
      email,
      userType,
      timestamp || now.toISOString()
    ]);
    
    return ContentService
      .createTextOutput('{"success":true}')
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput('{"success":false,"error":"' + error.toString() + '"}')
      .setMimeType(ContentService.MimeType.JSON);
  }
}