# Hotel Orchid Bodhgaya

The public website is a Next.js App Router application. The homepage and contact page enquiry forms submit JSON to the same-origin `/api/enquiries` route. That route forwards submissions to Google Apps Script from the server and checks the script's JSON response, then sends a notification email using Resend. This avoids browser CORS and Apps Script redirect limitations; the Apps Script URL and Resend API key are never embedded in client-side code.

## Google Sheets enquiry setup

1. Create or choose a Google Spreadsheet. Copy its ID from the URL between `/d/` and `/edit`.
2. In the spreadsheet, create a worksheet named `Enquiries`, or keep the default name below. The script also creates the worksheet if it is missing.
3. Open **Extensions → Apps Script** and replace the editor contents with [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
4. In the script, replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with the spreadsheet ID and set `SHEET_TAB_NAME` to the worksheet name. Save the script.
5. Choose **Deploy → New deployment**, select **Web app**, set **Execute as** to your account, and set **Who has access** to **Anyone**. Deploy and authorize the requested spreadsheet access. Copy the Web App URL ending in `/exec`.
6. Set `GOOGLE_APPS_SCRIPT_URL` to that URL in `.env.local` for local development and in the Netlify site's environment variables for production. Do not use a `NEXT_PUBLIC_` prefix; the URL is only needed by the server route. `.env.example` contains a placeholder. After changing Netlify environment variables, trigger a site redeploy.
7. Submit a test enquiry on the deployed site and confirm it appears in the `Enquiries` worksheet.

Each row contains the timestamp, name, email, phone, arrival, departure, guests, room, message, and source. Values that could begin spreadsheet formulas are stored as text. The site reports success only after it receives `{ "ok": true }` from Apps Script; Apps Script's cross-origin redirect is handled by the server route, not by the browser.

## Resend email notifications

1. Create a Resend account and verify a sending domain. Use a `from` address belonging to that verified domain.
2. Create a Resend API key with permission to send email.
3. Set these server-side environment variables in `.env.local` and Netlify:
   - `RESEND_API_KEY` — the Resend API key. In Netlify, mark it as a secret.
   - `RESEND_FROM_EMAIL` — for example, `Hotel Orchid <enquiries@your-verified-domain.example>` using your verified domain.
   - `ENQUIRY_RECEIVER_EMAIL` — your business mailbox that should receive enquiries.
4. Redeploy the Netlify site after adding or changing environment variables.

The route writes the enquiry to Sheets first, then asks Resend to send the email. If the email notification fails after the row is saved, the form reports that partial outcome so the visitor is not told the enquiry failed to save. A successful Resend API response means Resend accepted the email request; inbox delivery can still depend on domain and recipient mail settings. Submission IDs plus Apps Script and Resend idempotency prevent duplicate rows and notification emails when the same form attempt is retried.

### Update the Apps Script

After changing the script code, save it and choose **Deploy → Manage deployments**. Edit the existing Web App deployment, select **New version**, and deploy. The `/exec` URL usually remains the same for an edited deployment; if Google gives you a new URL, update `GOOGLE_APPS_SCRIPT_URL` locally and in Netlify, then redeploy the site.

### Local development

Set `GOOGLE_APPS_SCRIPT_URL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `ENQUIRY_RECEIVER_EMAIL` in `.env.local`, then run `npm install` and `npm run dev`, and open `http://localhost:3000`. If any required setting is missing, the route returns a configuration error rather than claiming the enquiry was processed.

### Netlify environment sync

Install and link the Netlify CLI (`npm install --global netlify-cli`, `netlify login`, `netlify link`), then run `npm run netlify:env:sync`. The sync script reads `.env.example`, uses `.env.local` overrides, and skips placeholders and localhost URLs. Review the values before syncing and redeploy after updates.

### Spam and endpoint limitations

The forms include a hidden honeypot and the endpoint validates fields and limits their lengths. Anyone can still call a public Apps Script Web App directly, so this is basic filtering rather than strong abuse prevention. For higher traffic or targeted spam, add server-side rate limiting or CAPTCHA verification. No Google account credentials or service-account keys belong in the website or Apps Script source.

## Manual testing checklist

- In Netlify, confirm `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `ENQUIRY_RECEIVER_EMAIL` are set for the production deploy context; confirm the sender domain is verified in Resend, then redeploy.
- Submit valid enquiries through the homepage booking form, homepage compact form, and contact page; confirm the matching field values and timestamp appear as separate columns.
- Confirm each submission produces one email at `ENQUIRY_RECEIVER_EMAIL`, with the submitted form fields readable and any unavailable optional values omitted. Check Spam/Junk if it is not in the inbox.
- Attempt missing required values and malformed email addresses; confirm browser validation or the route rejects them and no row is added.
- Temporarily use an invalid Apps Script URL or spreadsheet ID; confirm the UI shows a failure and does not clear the contact form.
- Click submit repeatedly while a request is pending; confirm the button stays disabled and only one request is sent.
- Fill the hidden `website` honeypot in a request; confirm it is not forwarded to the sheet.
- Deploy to Netlify with its production `GOOGLE_APPS_SCRIPT_URL` and Resend settings; submit a production enquiry and confirm both the spreadsheet row and email notification arrive.
- Edit the Apps Script, deploy a new version, and repeat a production submission.
