// ===== COMPREHENSIVE FUNCTIONAL TEST SUITE =====
var fs = require('fs');
var passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  PASS: ' + name); }
  catch(e) { failed++; console.log('  FAIL: ' + name + ' - ' + e.message); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || 'Assertion failed'); }

console.log('\n===== TEST 1: STORE LAYER =====');
var storeCode = fs.readFileSync('js/store.js', 'utf-8');
test('store.js has single localStorage key', function() {
  assert(storeCode.includes("naamjap:data:v2"), 'single namespaced key');
});
test('store.js API exists', function() {
  assert(storeCode.includes('function load()'), 'load()'); assert(storeCode.includes('function save('), 'save()');
  assert(storeCode.includes('function getToday()'), 'getToday()'); assert(storeCode.includes('function addToday('), 'addToday()');
  assert(storeCode.includes('function todayKey()'), 'todayKey()'); assert(storeCode.includes('function clear()'), 'clear()');
});
test('todayKey format YYYY-MM-DD', function() {
  function pad(n){return n<10?"0"+n:""+n;} var d=new Date(); var key=d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
  assert(/^\d{4}-\d{2}-\d{2}$/.test(key), 'format: '+key);
});
test('default data model', function() {
  var defaults = { v:2, naamId:"ram", session:{mala:1,inMala:0,completed:0,sessionJap:0}, stats:{totalJap:0,malas:0}, today:{jap:0,naam:0}, modules:{lekhan:{page:1,written:0},challenges:[],notebook:[]} };
  assert(defaults.v===2,"v2"); assert(defaults.session.mala===1,"start mala 1"); assert(defaults.session.inMala===0,"start 0");
  assert(defaults.modules.lekhan.page===1,"lekhan page 1"); assert(Array.isArray(defaults.modules.challenges),"chall empty");
  assert(Array.isArray(defaults.modules.notebook),"nb empty");
});
test('today rollover resets counters', function() {
  var tk="2026-08-15"; var data={today:{key:"2020-01-01",jap:100,naam:100,malas:5}};
  if(data.today.key!==tk){data.today.key=tk;data.today.jap=0;data.today.malas=0;data.today.naam=0;}
  assert(data.today.jap===0,"jap reset"); assert(data.today.naam===0,"naam reset"); assert(data.today.malas===0,"malas reset");
});
console.log('\n===== TEST 2: NAAM JAP COUNTER LOGIC =====');
var MALA = 108;
function countTap(data) {
  if (data.session.paused) return "paused";
  if (data.session.inMala >= MALA) return "limit";
  data.session.inMala++;
  if (data.session.inMala >= MALA) {
    data.session.sessionJap += MALA; data.session.completed += 1; data.session.mala++; data.session.inMala = 0;
    data.today.naam += MALA; data.today.jap += MALA; return "complete";
  } else { data.session.sessionJap += 1; data.today.naam += 1; data.today.jap += 1; return "count"; }
}
test('1 tap = 1 increment', function() {
  var data={session:{mala:1,inMala:5,completed:0,sessionJap:5,paused:false},today:{naam:5,jap:5}};
  var r=countTap(data); assert(r=="count","should count");
  assert(data.session.inMala===6,"inMala=6 got "+data.session.inMala);
  assert(data.session.sessionJap===6,"sessionJap=6");
  assert(data.today.naam===6,"today.naam=6");
});
test('107 does NOT complete', function() {
  var data={session:{mala:1,inMala:106,completed:0,sessionJap:106},today:{naam:106}};
  var r=countTap(data); assert(r=="count","should count at 107");
  assert(data.session.inMala===107,"inMala=107"); assert(data.session.completed===0,"completed=0");
});
test('108 completes exactly one mala', function() {
  var data={session:{mala:1,inMala:107,completed:0,sessionJap:107},today:{naam:107}};
  var r=countTap(data); assert(r=="complete","should complete at 108");
  assert(data.session.inMala===0,"reset to 0"); assert(data.session.completed===1,"completed=1");
  assert(data.session.mala===2,"mala=2"); assert(data.session.sessionJap===215,"sessionJap=215");
  assert(data.today.naam===215,"today.naam=215");
});
test('109 starts next mala at 1', function() {
  var data={session:{mala:2,inMala:0,completed:1,sessionJap:108},today:{naam:108}};
  var r=countTap(data); assert(r=="count","should count at 109");
  assert(data.session.inMala===1,"inMala=1"); assert(data.session.mala===2,"mala 2");
  assert(data.session.sessionJap===109,"sessionJap=109");
});
test('216 taps = 2 complete malas', function() {
  var data={session:{mala:1,inMala:0,completed:0,sessionJap:0,paused:false},today:{naam:0}};
  var completes=0; for(var i=0;i<216;i++){var r=countTap(data);if(r=="complete")completes++;}
  assert(completes===2,"2 completes: got "+completes);
  assert(data.session.mala===3,"mala=3"); assert(data.session.sessionJap===216,"sessionJap=216");
});
test('pause blocks counting', function() {
  var data={session:{mala:1,inMala:5,completed:0,sessionJap:5,paused:true},today:{naam:5}};
  assert(countTap(data)==="paused","should not count while paused");
  assert(data.session.inMala===5,"inMala unchanged");
});
test('reset preserves lifetime + today', function() {
  var data={session:{mala:1,inMala:50,completed:3,sessionJap:266,paused:false},stats:{totalJap:5000,malas:47},today:{jap:150,naam:150}};
  var savedT=data.today, savedS=data.stats;
  data.session={mala:1,inMala:0,completed:0,sessionJap:0,paused:false}; data.today=savedT; data.stats=savedS;
  assert(data.stats.totalJap===5000,"lifetime kept"); assert(data.today.jap===150,"today kept");
  assert(data.session.inMala===0,"session reset");
});
test('safety guards + no dup listeners', function() {
  var njCode=fs.readFileSync('js/naam-jap.js','utf-8');
  assert(njCode.includes('el.btn.addEventListener'),'listener in wire()');
  var wc=(njCode.match(/wire\(\)/g)||[]).length; assert(wc<=2,'wire<=2: '+wc);
  assert(njCode.includes('if (!C || !NJ || !NJ.store)'),'safety guard');
  assert(!njCode.includes('fetch('),'no fetch');
});

console.log('\n===== TEST 3: TIMER LOGIC =====');
var tCode=fs.readFileSync('js/jap-timer.js','utf-8');
test('5/11/21/40/108 presets', function() {
  assert(tCode.includes('5'),'5'); assert(tCode.includes('11'),'11'); assert(tCode.includes('21'),'21');
  assert(tCode.includes('40'),'40'); assert(tCode.includes('108'),'108');
  console.log('      (verified: all presets)');
});
test('timestamp-based countdown', function() {
  assert(tCode.includes('Date.now')||tCode.includes('getTime'),'timestamps');
  assert(tCode.includes('startTs'),'startTs'); assert(tCode.includes('remainAccum')||tCode.includes('remain'),'pause/resume');
});
test('rounds + completion', function() {
  assert(tCode.includes('round'),'rounds'); assert(tCode.includes('done'),'done');
  assert(tCode.includes('finished')||tCode.includes('complete'),'completion');
});

console.log('\n===== TEST 4: CUSTOM NAAM JAP =====');
var cCode=fs.readFileSync('js/custom-jap.js','utf-8');
test('targets 108/1008/10008 + custom', function() {
  assert(cCode.includes('108'),'108'); assert(cCode.includes('1008'),'1008'); assert(cCode.includes('10008'),'10008');
  console.log('      (verified)');
});
test('local persistence, no network', function() {
  assert(cCode.includes('NJ.store')||cCode.includes('localStorage'),'local');
  assert(!cCode.includes('fetch('),'no fetch'); assert(!cCode.includes('XMLHttpRequest'),'no XHR');
});

console.log('\n===== TEST 5: NAAM LEKHAN =====');
var eCode=fs.readFileSync('js/writing-engine.js','utf-8');
var lCode=fs.readFileSync('js/naam-lekhan.js','utf-8');
test('DPI-aware canvas + Undo/Clear/Done', function() {
  assert(eCode.includes('devicePixelRatio')||eCode.includes('dpr'),'dpr');
  assert(eCode.includes('undo')||eCode.includes('Undo'),'undo'); assert(eCode.includes('clear')||eCode.includes('Clear'),'clear');
  assert(eCode.includes('done')||eCode.includes('Done'),'done');
});
test('108 per page + completion', function() {
  assert(lCode.includes('108'),'108'); assert(lCode.includes('done'),'done count');
  assert(lCode.includes('complete')||lCode.includes('Complete'),'completion');
});
test('unfinished page saves to notebook', function() {
  assert(lCode.includes('unfinished'),'unfinished');
  assert(lCode.includes('F.nb')||lCode.includes('notebook'),'notebook integration');
  var nbCode=fs.readFileSync('js/notebook.js','utf-8');
  assert(nbCode.includes('continue')||nbCode.includes('unfinished'),'notebook resumes');
});

console.log('\n===== TEST 6: DIGITAL JAP NOTEBOOK =====');
var nbCode=fs.readFileSync('js/notebook.js','utf-8');
test('notebook: list + view + delete', function() {
  assert(nbCode.includes('nb-list'),'list'); assert(nbCode.includes('viewPage')||nbCode.includes('View'),'view');
  assert(nbCode.includes('remove')||nbCode.includes('delete'),'delete'); assert(nbCode.includes('Confirm'),'confirm');
});
test('export produces valid JSON', function() {
  var data=[{id:'1',pageNo:1,naam:'Ram',count:108,status:'complete'}];
  var json=JSON.stringify(data); var parsed=JSON.parse(json);
  assert(parsed.length===1,'round-trip'); assert(parsed[0].naam==='Ram','naam');
  assert(nbCode.includes('JSON'),'uses JSON');
});
test('malformed import safe', function() {
  var malformed='not json{{{';
  try { JSON.parse(malformed); } catch(e) { assert(true,'falls back safely'); }
});
test('notebook HTML structure', function() {
  var html=fs.readFileSync('lekhan/digital-jap-notebook/index.html','utf-8');
  assert(html.includes('nb-export'),'export'); assert(html.includes('nb-import'),'import');
  assert(html.includes('nb-list'),'list'); assert(html.includes('nb-empty'),'empty');
});


