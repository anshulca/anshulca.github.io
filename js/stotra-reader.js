/* =========================================================================
   NAAM JAP · STOTRA READER  (/stotra/read/?id=...)
   Renders verses in Hindi/English, TTS playback, progress tracking,
   favourites, recitation counter.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var STOTRAS = global.NAAM_JAP_STOTRAS || [];
  if (!NJ || !NJ.store) return;

  var $ = function (id) { return doc.getElementById(id); };
  var FAV_KEY = 'nj:stotra-favs';
  var RECENT_KEY = 'nj:stotra-recent';
  var PROGRESS_KEY = 'nj:stotra-progress';

  function esc(s) {
    return String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---- Get stotra from URL ---------------------------------------------- */
  var stotraId = global.__STOTRA_ID || null;
  if (!stotraId) {
    var params = new URLSearchParams(global.location.search);
    stotraId = params.get('id');
  }
  if (!stotraId) {
    var pathParts = global.location.pathname.replace(/\/+$/, '').split('/');
    var lastPart = pathParts[pathParts.length - 1];
    if (lastPart && lastPart !== 'read' && lastPart !== 'stotra') stotraId = lastPart;
  }
  var stotra = null;
  for (var i = 0; i < STOTRAS.length; i++) {
    if (STOTRAS[i].id === stotraId) { stotra = STOTRAS[i]; break; }
  }

  if (!stotra) {
    var stage = $('reader-stage');
    if (stage) stage.innerHTML = '<div style="text-align:center;padding:var(--space-8)"><h2>Stotra not found</h2><p class="muted">Please go back and select a text from the library.</p><a class="btn btn--primary" href="/stotra/">Back to Library</a></div>';
    return;
  }

  /* ---- Track recently read ---------------------------------------------- */
  function trackRecent() {
    try {
      var recent = JSON.parse(global.localStorage.getItem(RECENT_KEY)) || [];
      var idx = recent.indexOf(stotraId);
      if (idx >= 0) recent.splice(idx, 1);
      recent.unshift(stotraId);
      if (recent.length > 20) recent = recent.slice(0, 20);
      global.localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    } catch (e) {}
  }
  trackRecent();

  /* ---- Progress (recitation count) -------------------------------------- */
  function loadProgress() {
    try {
      var all = JSON.parse(global.localStorage.getItem(PROGRESS_KEY)) || {};
      return all[stotraId] || { count: 0, lastRead: null };
    } catch (e) { return { count: 0, lastRead: null }; }
  }
  function saveProgress(data) {
    try {
      var all = JSON.parse(global.localStorage.getItem(PROGRESS_KEY)) || {};
      all[stotraId] = data;
      global.localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
    } catch (e) {}
  }

  /* ---- Favourites ------------------------------------------------------- */
  function loadFavs() {
    try { return JSON.parse(global.localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; }
  }
  function isFav() { return loadFavs().indexOf(stotraId) >= 0; }
  function toggleFav() {
    var favs = loadFavs();
    var idx = favs.indexOf(stotraId);
    if (idx >= 0) favs.splice(idx, 1); else favs.unshift(stotraId);
    try { global.localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) {}
    updateFavBtn();
  }
  function updateFavBtn() {
    var btn = $('reader-fav');
    if (!btn) return;
    var f = isFav();
    btn.textContent = f ? '★ Favourited' : '☆ Favourite';
    btn.classList.toggle('btn--primary', f);
    btn.classList.toggle('btn--ghost', !f);
  }

  /* ---- Build page ------------------------------------------------------- */
  var stage = $('reader-stage');
  if (!stage) return;

  doc.title = stotra.name + ' - Naam Jap by CA Anshul Karwa · ' + stotra.nameDev;

  var progress = loadProgress();
  var lang = 'both';

  var brandLine = '<p style="text-align:center;margin-top:var(--space-2);font-size:0.65rem;color:var(--ink-faint)">By <a href="/about/" style="color:var(--accent-strong);text-decoration:none;font-weight:500">CA Anshul Karwa</a></p>';

  var html = '<div class="reader-meta">' +
    '<p class="reader-meta__deity">' + esc(stotra.deityName) + ' · ' + esc(stotra.deityDev) + '</p>' +
    '<h1 class="reader-meta__title">' + esc(stotra.name) + '</h1>' +
    '<p class="reader-meta__title-dev">' + esc(stotra.nameDev) + '</p>' +
    brandLine +
    '</div>' +
    '<div class="reader-lang" id="reader-lang">' +
    '<button type="button" class="reader-lang__btn is-active" data-lang="both">Both</button>' +
    '<button type="button" class="reader-lang__btn" data-lang="hindi">हिन्दी</button>' +
    '<button type="button" class="reader-lang__btn" data-lang="english">English</button>' +
    '</div>' +
    '<div class="reader-verses" id="reader-verses">';

  stotra.verses.forEach(function (v, idx) {
    html += '<div class="reader-verse" data-verse="' + idx + '">';
    if (v.label) html += '<span class="reader-verse__label">' + esc(v.label) + '</span>';
    html += '<p class="reader-verse__dev">' + esc(v.dev) + '</p>';
    html += '<p class="reader-verse__en">' + esc(v.en) + '</p>';
    html += '</div>';
  });

  html += '</div>';

  html += brandLine;

  html += '<div class="reader-tts" id="reader-tts">' +
    '<div class="reader-tts__head">' +
    '<span class="reader-tts__title">Listen</span>' +
    '<button type="button" class="reader-tts__toggle" id="tts-toggle">' +
    '<span id="tts-toggle-label">Play</span></button>' +
    '</div>' +
    '<div class="reader-tts__track">' +
    '<span class="reader-tts__label">Slow</span>' +
    '<input type="range" class="voice-speed__slider" id="tts-rate" min="0.5" max="2" step="0.1" value="0.8" aria-label="Speech rate">' +
    '<span class="reader-tts__label">Fast</span>' +
    '</div>' +
    '</div>';

  html += '<div class="reader-progress" id="reader-progress">' +
    '<p class="reader-progress__count" id="progress-count">' + progress.count + '</p>' +
    '<p class="reader-progress__label">recitations completed</p>' +
    '</div>';

  html += '<div class="reader-actions">' +
    '<button type="button" class="btn btn--ghost" id="reader-fav">☆ Favourite</button>' +
    '<button type="button" class="btn btn--primary" id="reader-done">Mark as Read (+1)</button>' +
    '<a class="btn btn--ghost" href="/stotra/">Back to Library</a>' +
    '</div>';

  stage.innerHTML = html;

  /* ---- Language toggle -------------------------------------------------- */
  function setLang(l) {
    lang = l;
    doc.querySelectorAll('.reader-lang__btn').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang') === l);
    });
    doc.querySelectorAll('.reader-verse__dev').forEach(function (p) {
      p.hidden = l === 'english';
    });
    doc.querySelectorAll('.reader-verse__en').forEach(function (p) {
      p.hidden = l === 'hindi';
    });
  }

  $('reader-lang').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-lang]');
    if (btn) setLang(btn.getAttribute('data-lang'));
  });

  /* ---- TTS (Web Speech API) -------------------------------------------- */
  var ttsPlaying = false;
  var ttsUtterance = null;
  var ttsVerseIdx = 0;
  var hindiVoice = null;
  var chromeBugTimer = null;

  function pickHindiVoice() {
    if (!('speechSynthesis' in global)) return;
    var voices = global.speechSynthesis.getVoices();
    if (!voices.length) return;
    var hindi = [];
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].lang === 'hi-IN' || voices[i].lang === 'hi' || voices[i].lang.indexOf('hi-') === 0) {
        hindi.push(voices[i]);
      }
    }
    if (!hindi.length) return;
    for (var j = 0; j < hindi.length; j++) {
      if (hindi[j].name.indexOf('Google') >= 0) { hindiVoice = hindi[j]; return; }
    }
    for (var k = 0; k < hindi.length; k++) {
      if (hindi[k].localService) { hindiVoice = hindi[k]; return; }
    }
    hindiVoice = hindi[0];
  }

  pickHindiVoice();
  if ('speechSynthesis' in global) {
    global.speechSynthesis.onvoiceschanged = pickHindiVoice;
  }

  function cleanForTTS(text) {
    return text
      .replace(/[।॥]+/g, ',')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/,\s*$/, '')
      .trim();
  }

  function speakVerse(idx) {
    if (idx >= stotra.verses.length) { stopTTS(); return; }
    ttsVerseIdx = idx;
    var text = cleanForTTS(stotra.verses[idx].dev);
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'hi-IN';
    if (hindiVoice) u.voice = hindiVoice;
    u.rate = parseFloat(($('tts-rate') || {}).value || 0.8);
    u.pitch = 1.0;
    u.onend = function () {
      highlightVerse(-1);
      speakVerse(idx + 1);
    };
    u.onerror = function () { stopTTS(); };
    ttsUtterance = u;
    highlightVerse(idx);
    global.speechSynthesis.speak(u);
  }

  function highlightVerse(idx) {
    doc.querySelectorAll('.reader-verse').forEach(function (v, i) {
      v.style.background = i === idx ? 'var(--accent-soft)' : '';
      v.style.borderRadius = i === idx ? 'var(--radius-md)' : '';
      v.style.padding = i === idx ? 'var(--space-4)' : '';
    });
    if (idx >= 0) {
      var el = doc.querySelector('[data-verse="' + idx + '"]');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function startTTS() {
    if (!('speechSynthesis' in global)) {
      if (NJ.feature && NJ.feature.toast) NJ.feature.toast('Text-to-speech not supported on this device.');
      return;
    }
    global.speechSynthesis.cancel();
    ttsPlaying = true;
    updateTTSBtn();
    chromeBugTimer = setInterval(function () {
      if (ttsPlaying && global.speechSynthesis.speaking) {
        global.speechSynthesis.pause();
        global.speechSynthesis.resume();
      }
    }, 10000);
    speakVerse(0);
  }

  function stopTTS() {
    global.speechSynthesis.cancel();
    ttsPlaying = false;
    ttsUtterance = null;
    highlightVerse(-1);
    updateTTSBtn();
    if (chromeBugTimer) { clearInterval(chromeBugTimer); chromeBugTimer = null; }
  }

  function updateTTSBtn() {
    var btn = $('tts-toggle');
    var label = $('tts-toggle-label');
    if (!btn) return;
    label.textContent = ttsPlaying ? 'Stop' : 'Play';
    btn.classList.toggle('is-active', ttsPlaying);
  }

  var ttsToggle = $('tts-toggle');
  if (ttsToggle) {
    ttsToggle.addEventListener('click', function () {
      if (ttsPlaying) stopTTS(); else startTTS();
    });
  }

  var ttsRate = $('tts-rate');
  if (ttsRate) {
    var setRateFill = function (v) {
      var pct = ((v - 0.5) / 1.5) * 100;
      ttsRate.style.setProperty('--fill', pct + '%');
    };
    setRateFill(0.8);
    ttsRate.addEventListener('input', function () {
      setRateFill(parseFloat(this.value));
    });
  }

  /* ---- Recitation tracking ---------------------------------------------- */
  $('reader-done').addEventListener('click', function () {
    progress.count++;
    progress.lastRead = new Date().toISOString();
    saveProgress(progress);
    $('progress-count').textContent = progress.count;
    if (NJ.feature && NJ.feature.toast) NJ.feature.toast('Recitation recorded');
  });

  /* ---- Favourite -------------------------------------------------------- */
  updateFavBtn();
  $('reader-fav').addEventListener('click', toggleFav);

})(typeof window !== 'undefined' ? window : this);
