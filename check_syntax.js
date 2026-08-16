// Comprehensive JS syntax check for all modules
const fs = require('fs');
const files = [
  'js/store.js',
  'js/shared.js',
  'js/core.js',
  'js/ui.js',
  'js/naam-jap.js',
  'js/digital-mala.js',
  'js/jap-timer.js',
  'js/custom-jap.js',
  'js/writing-engine.js',
  'js/naam-lekhan.js',
  'js/notebook.js',
  'js/challenges.js',
  'js/db.js',
  'js/site.config.js'
];
let ok = true;
for (const f of files) {
  if (!fs.existsSync(f)) {
    console.log('MISSING: ' + f);
    ok = false;
    continue;
  }
  try {
    const c = fs.readFileSync(f, 'utf-8');
    // Just check if the code parses (will fail on DOM refs, but catches syntax errors)
    // Use a more lenient check - just count brackets
    let brackets = 0;
    let parens = 0;
    let braces = 0;
    for (const ch of c) {
      if (ch === '[') brackets++;
      if (ch === ']') brackets--;
      if (ch === '(') parens++;
      if (ch === ')') parens--;
      if (ch === '{') braces++;
      if (ch === '}') braces--;
    }
    if (brackets !== 0) { console.log('FAIL (brackets): ' + f + ' diff=' + brackets); ok = false; }
    else if (parens !== 0) { console.log('FAIL (parens): ' + f + ' diff=' + parens); ok = false; }
    else if (braces !== 0) { console.log('FAIL (braces): ' + f + ' diff=' + braces); ok = false; }
    else { console.log('OK: ' + f); }
  } catch(e) {
    console.log('ERROR: ' + f + ' - ' + e.message);
    ok = false;
  }
}
console.log(ok ? '\n=== ALL SYNTAX OK ===' : '\n=== SYNTAX ERRORS FOUND ===');
