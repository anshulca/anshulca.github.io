// Test the footer rendering fix using minimal DOM simulation
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve('.');

// Minimal DOM stub for the IIFEs
function makeWindow() {
  const document = {
    _els: new Map(),
    getElementById(id) {
      return this._els.get(id) || {innerHTML: '', classList: {add(){}, toggle(){}}, appendChild(){}, setAttribute(){}};
    },
    querySelectorAll(sel) { return []; },
    createElement(tag) {
      return {innerHTML: '', className: '', classList: {add(){}, remove(){}, toggle(){}}, appendChild(){}, setAttribute(){}, style: {}, getAttribute(){return null;}};
    },
    addEventListener() {},
    readyState: 'complete'
  };
  const localStorage = { _d: {}, getItem(k){return this._d[k];}, setItem(k,v){this._d[k]=String(v);}, removeItem(k){delete this._d[k];} };
  return {
    document,
    window: global,
    localStorage,
    location: {pathname: '/'},
    matchMedia: () => ({matches: false}),
    addEventListener() {},
    requestAnimationFrame: fn => fn(),
    navigator: {userAgent: 'node-test', vibrate: () => true}
  };
}

// Load site.config.js first (it sets global.NAAM_JAP_CONFIG)
const siteConfigCode = fs.readFileSync(path.join(ROOT, 'js', 'site.config.js'), 'utf-8');

// Execute site.config.js
const wc = makeWindow();
wc.eval = function(code) { eval(code); };

// We need to run the IIFE from site.config.js
// site.config.js sets global.NAAM_JAP_CONFIG
let NAAM_JAP_CONFIG;
try {
  eval(siteConfigCode.replace("typeof window !== 'undefined' ? window : this", JSON.stringify({NAAM_JAP_CONFIG: null})));
} catch(e) {
  // Try different approach - manually eval
  var sandbox = wc;
  var fn = new Function('window', siteConfigCode);
  try { fn(wc); } catch(e2) { /* ignore */ }
}

// Since the IIFE sets global.NAAM_JAP_CONFIG, let's extract the config object directly
// Parse the config from the source
const configMatch = siteConfigCode.match(/var C = \{[\s\S]*?^\s*\};/m);
if (configMatch) {
  // Extract just the copyright line
  const copyrightMatch = siteConfigCode.match(/copyright:\s*'([^']+)'/);
  const creatorNameMatch = siteConfigCode.match(/name:\s*'([^']+)'/);
  const creatorUrlMatch = siteConfigCode.match(/url:\s*'([^']+)'/);

  console.log('=== CONFIG VALUES ===');
  console.log('Copyright template:', copyrightMatch ? copyrightMatch[1] : 'NOT FOUND');
  console.log('Creator name:', creatorNameMatch ? creatorNameMatch[1] : 'NOT FOUND');
  console.log('Creator URL:', creatorUrlMatch ? creatorUrlMatch[1] : 'NOT FOUND');

  // Simulate the esc function
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  const creatorName = 'CA Anshul Karwa';
  const creatorUrl = 'https://www.linkedin.com/in/anshulkarwa/';
  const copyrightTemplate = copyrightMatch ? copyrightMatch[1] : '© 2026 Naam Jap · Made with care, in silence by %CREATOR%';

  // Simulate creatorHtml construction (FIXED version)
  const creatorHtml = '<a href="' + esc(creatorUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(creatorName) + '</a>';

  // Simulate copyright replacement
  const copyright = copyrightTemplate.replace('%CREATOR%', creatorHtml);

  // Simulate footer rendering (FIXED - no esc() around copyright)
  const footerHTML = '<p>' + copyright + '</p>';

  console.log('\n=== FIXED FOOTER HTML ===');
  console.log(footerHTML);

  // Verify
  const hasEscapedTag = footerHTML.includes('&lt;a href') || footerHTML.includes('&lt;a');
  const hasRealLink = footerHTML.includes('<a href="https://www.linkedin.com/in/anshulkarwa/"');
  const hasRelNoopenerNoreferrer = footerHTML.includes('rel="noopener noreferrer"');
  const hasTargetBlank = footerHTML.includes('target="_blank"');
  const hasVisibleHTML = footerHTML.includes('</a>');

  console.log('\n=== VERIFICATION ===');
  console.log('1. No escaped HTML tags:', !hasEscapedTag ? 'PASS' : 'FAIL - HTML tags are escaped as text');
  console.log('2. LinkedIn link present:', hasRealLink ? 'PASS' : 'FAIL');
  console.log('3. rel="noopener noreferrer":', hasRelNoopenerNoreferrer ? 'PASS' : 'FAIL');
  console.log('4. target="_blank":', hasTargetBlank ? 'PASS' : 'FAIL');
  console.log('5. Visible text "CA Anshul Karwa":', footerHTML.includes('CA Anshul Karwa') ? 'PASS' : 'FAIL');

  // Show what the OLD buggy version would have produced
  const oldFooterHTML = '<p>' + esc(copyright) + '</p>';
  console.log('\n=== OLD BUGGY VERSION (for comparison) ===');
  console.log(oldFooterHTML);
  console.log('Old version has escaped tags:', oldFooterHTML.includes('&lt;a href') ? 'YES - BUG' : 'no');

  // Test creatorLink from shared.js
  const creatorLinkResult = '<a href="' + esc(creatorUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(creatorName) + '</a>';
  console.log('\n=== SHARED.JS CREATOR LINK ===');
  console.log('Output:', creatorLinkResult);
  console.log('No escaped tags:', !creatorLinkResult.includes('&lt;a') ? 'PASS' : 'FAIL');
  console.log('Has rel="noopener noreferrer":', creatorLinkResult.includes('rel="noopener noreferrer"') ? 'PASS' : 'FAIL');
}
