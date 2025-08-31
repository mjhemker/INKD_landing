# Google Sheets Waitlist Setup Guide

## Step 1: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "INKD Waitlist"
4. The script will automatically create columns: `Timestamp | Email | User Type | Submitted At`

## Step 2: Set up Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Replace the default code with the contents of `google-apps-script.js`
4. Update the `SPREADSHEET_ID` variable with your spreadsheet ID from the URL
5. Save the project

## Step 3: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Click "Deploy"
6. Copy the web app URL

## Step 4: Configure Environment Variable
1. Create a `.env` file in the project root
2. Add: `REACT_APP_GOOGLE_SHEETS_URL=YOUR_WEB_APP_URL`
3. Replace `YOUR_WEB_APP_URL` with the URL from step 3

## Step 5: Test the Integration
1. Start the development server: `npm start`
2. Submit the waitlist form
3. Check your Google Sheet for the new entry

## Data Structure
The sheet will contain:
- **Timestamp**: Human-readable date/time
- **Email**: User's email address
- **User Type**: "Client" or "Artist"
- **Submitted At**: ISO timestamp for technical reference