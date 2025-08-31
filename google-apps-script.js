// Working Google Apps Script for INKD waitlist (based on pantreat_landing)
// Deploy this as a web app in Google Apps Script console

function doPost(e) {
  console.log('Received request:', e.postData.contents);
  
  try {
    // Get the active sheet (make sure you're connected to your Google Sheet)
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