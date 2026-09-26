#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var OUT = path.join(ROOT, 'www');

var INCLUDE = [
  'index.html', '404.html', 'manifest.webmanifest', 'sw.js',
  'css', 'js', 'assets',
  'jap', 'lekh', 'lekhan', 'mantra', 'stotra', 'sadhana',
  'journey', 'tools', 'about', 'platform', 'privacy', 'terms', 'disclaimer'
];

function rmdir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(function (f) {
    var p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) rmdir(p);
    else fs.unlinkSync(p);
  });
  fs.rmdirSync(dir);
}

function cpdir(src, dest) {
  if (!fs.existsSync(src)) return;
  var stat = fs.statSync(src);
  if (stat.isFile()) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(function (f) {
    cpdir(path.join(src, f), path.join(dest, f));
  });
}

console.log('Building www/ for Capacitor...');
rmdir(OUT);
fs.mkdirSync(OUT, { recursive: true });

INCLUDE.forEach(function (name) {
  var src = path.join(ROOT, name);
  var dest = path.join(OUT, name);
  if (fs.existsSync(src)) {
    cpdir(src, dest);
    console.log('  + ' + name);
  }
});

console.log('Done. www/ is ready for cap sync.');
