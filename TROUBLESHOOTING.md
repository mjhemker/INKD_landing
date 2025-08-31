# Google Apps Script Troubleshooting

## Current Issue
The Google Apps Script is returning HTML redirects instead of executing the function. This typically means:

1. **Deployment Settings Issue**: Check these settings when deploying:
   - Type: "Web app"
   - Execute as: "Me" (your account)
   - Who has access: "Anyone" 
   - **Make sure to create a NEW deployment, not update an existing one**

2. **Script Permissions**: The script may need additional permissions:
   - Run the script manually once in the Apps Script editor
   - Grant all requested permissions
   - Then redeploy

## Testing Steps
1. In Google Apps Script editor, run the `doGet` function manually
2. Check if any permission dialogs appear
3. Grant all permissions
4. Create a **NEW deployment** (don't update existing)
5. Test the new URL

## Current Backup System
The waitlist is currently storing all submissions in localStorage. To view stored submissions:

1. Open browser developer tools (F12)
2. Go to Console tab
3. Run: `JSON.parse(localStorage.getItem('inkd-waitlist') || '[]')`

## Manual Data Export
If Google Sheets continues to have issues, you can export the locally stored data:

```javascript
// Run this in browser console to get all waitlist entries
const waitlistData = JSON.parse(localStorage.getItem('inkd-waitlist') || '[]');
console.table(waitlistData);
```

The system currently works - it stores emails locally and the user sees success messages. Once Google Sheets is fixed, you'll have both local and remote storage.