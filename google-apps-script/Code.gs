// Replace this placeholder with the ID from the target Google Spreadsheet URL.
const SPREADSHEET_ID = "PASTE_YOUR_GOOGLE_SHEET_ID_HERE";
const SHEET_TAB_NAME = "Enquiries";
const HEADERS = [
  "Submitted at", "Name", "Email", "Phone", "Arrival", "Departure",
  "Guests", "Room", "Message", "Source",
];

function doPost(e) {
  try {
    if (!e || !e.postData || typeof e.postData.contents !== "string") {
      return jsonResponse({ ok: false, error: "Missing request body." });
    }

    const data = JSON.parse(e.postData.contents);
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return jsonResponse({ ok: false, error: "Invalid enquiry data." });
    }

    const enquiry = {};
    ["name", "email", "phone", "arrival", "departure", "guests", "room", "message", "source"].forEach(function (key) {
      const value = data[key];
      if (value !== undefined && value !== null && typeof value !== "string") {
        throw new Error("Invalid field type.");
      }
      enquiry[key] = String(value || "").trim();
      if (enquiry[key].length > (key === "message" ? 3000 : 300)) {
        throw new Error("Field exceeds maximum length.");
      }
    });

    if (!enquiry.name || (!enquiry.email && !enquiry.phone)) {
      return jsonResponse({ ok: false, error: "Name and an email address or phone number are required." });
    }
    if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
      return jsonResponse({ ok: false, error: "Invalid email address." });
    }
    if (!SPREADSHEET_ID || SPREADSHEET_ID.indexOf("PASTE_") === 0) {
      throw new Error("Spreadsheet is not configured.");
    }

    const idempotencyKey = typeof data.idempotencyKey === "string" && /^[a-f0-9]{64}$/.test(data.idempotencyKey)
      ? data.idempotencyKey
      : "";
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const cache = CacheService.getScriptCache();
      if (idempotencyKey && cache.get(idempotencyKey)) {
        return jsonResponse({ ok: true, duplicate: true });
      }

      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      let sheet = spreadsheet.getSheetByName(SHEET_TAB_NAME);
      if (!sheet) sheet = spreadsheet.insertSheet(SHEET_TAB_NAME);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.setFrozenRows(1);
      }

      const timestamp = data.submittedAt && !isNaN(Date.parse(data.submittedAt))
        ? new Date(data.submittedAt)
        : new Date();
      sheet.appendRow([
        timestamp,
        safeCell(enquiry.name), safeCell(enquiry.email), safeCell(enquiry.phone),
        safeCell(enquiry.arrival), safeCell(enquiry.departure), safeCell(enquiry.guests),
        safeCell(enquiry.room), safeCell(enquiry.message), safeCell(enquiry.source || "Website enquiry"),
      ]);
      if (idempotencyKey) cache.put(idempotencyKey, "1", 21600);
      return jsonResponse({ ok: true });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    // Log only a generic message; never return spreadsheet IDs or internal errors.
    console.error("Enquiry could not be written to the spreadsheet.");
    return jsonResponse({ ok: false, error: "The enquiry could not be saved." });
  }
}

// Escape formula-like values after optional leading whitespace/control characters.
function safeCell(value) {
  const text = String(value || "");
  return /^[\s\u0000-\u001f]*[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
