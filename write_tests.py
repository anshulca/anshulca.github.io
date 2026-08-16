import os

tests = r'''// ===== COMPREHENSIVE FUNCTIONAL TEST SUITE =====
var fs = require('fs');
var passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  PASS: ' + name); }
  catch(e) { failed++; console.log('  FAIL: ' + name + ' — ' + e.message); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || 'Assertion failed'); }
'''
