// Tiny CSV helpers (no dependency) for the admin exports.

// Spreadsheet apps run cells that start with = + - @ (or a tab / carriage return) as formulas.
// Visitors control what ends up in these cells, so such values get a leading apostrophe.
function safeCell(value) {
  if (value === null || value === undefined) return "";
  let text = value instanceof Date ? value.toISOString() : String(value);
  // "+92 300 1234567" is a phone number (digits, spaces, hyphens only: nothing a spreadsheet can run), keep it as is
  if (/^[=+\-@\t\r]/.test(text) && !/^\+[\d\s-]+$/.test(text)) text = `'${text}`;
  return text;
}

function csvCell(value) {
  const text = safeCell(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function csvLine(values) {
  return values.map(csvCell).join(",") + "\r\n";
}

// "\uFEFF" lets Excel open the file as UTF-8 (names with accents stay readable).
const BOM = "\uFEFF";

/**
 * Streams a CSV download. `columns` is [{ header, value: (doc) => any }].
 * `cursor` is an async iterable (e.g. Model.find().lean().cursor()), so a large export
 * never has to fit in memory and is not capped at 500 rows.
 */
async function sendCsv(res, filename, columns, cursor) {
  res.set({
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "no-store",
  });
  res.write(BOM + csvLine(columns.map((c) => c.header)));
  for await (const doc of cursor) {
    res.write(csvLine(columns.map((c) => c.value(doc))));
  }
  res.end();
}

module.exports = { safeCell, csvCell, csvLine, sendCsv, BOM };
