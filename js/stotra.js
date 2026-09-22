/* =========================================================================
   NAAM JAP · STOTRA / CHALISA LIBRARY  (/stotra/)
   Renders deity categories, search, favourites, recently read, and card grid.
   ========================================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  var NJ = global.NJ;
  var STOTRAS = global.NAAM_JAP_STOTRAS || [];
  var DEITIES = global.NAAM_JAP_DEITIES || [];
  if (!NJ || !NJ.store) { if (console) console.error('stotra: NJ/store missing.'); return; }

  var $ = function (id) { return doc.getElementById(id); };
  var FAV_KEY = 'nj:stotra-favs';
  var RECENT_KEY = 'nj:stotra-recent';

  var el = {
    search: $('str-search'),
    deities: $('str-deities'),
    favRow: $('str-fav-row'),
    favSection: $('str-fav-section'),
    recentRow: $('str-recent-row'),
    recentSection: $('str-recent-section'),
    grid: $('str-grid'),
    gridWrap: $('str-grid-wrap')
  };

  var activeDeity = 'all';
  var searchQuery = '';

  function esc(s) {
    return String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---- Favourites ------------------------------------------------------- */
  function loadFavs() {
    try { return JSON.parse(global.localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; }
  }
  function saveFavs(arr) {
    try { global.localStorage.setItem(FAV_KEY, JSON.stringify(arr)); } catch (e) {}
  }
  function isFav(id) { return loadFavs().indexOf(id) >= 0; }
  function toggleFav(id) {
    var favs = loadFavs();
    var idx = favs.indexOf(id);
    if (idx >= 0) favs.splice(idx, 1); else favs.unshift(id);
    saveFavs(favs);
    render();
  }

  /* ---- Recently read ---------------------------------------------------- */
  function loadRecent() {
    try { return JSON.parse(global.localStorage.getItem(RECENT_KEY)) || []; } catch (e) { return []; }
  }

  /* ---- Search ----------------------------------------------------------- */
  function matchesSearch(s, q) {
    if (!q) return true;
    var lq = q.toLowerCase();
    return (s.name && s.name.toLowerCase().indexOf(lq) >= 0) ||
      (s.nameDev && s.nameDev.indexOf(q) >= 0) ||
      (s.deityName && s.deityName.toLowerCase().indexOf(lq) >= 0) ||
      (s.deityDev && s.deityDev.indexOf(q) >= 0) ||
      (s.type && s.type.toLowerCase().indexOf(lq) >= 0);
  }

  /* ---- Card HTML -------------------------------------------------------- */
  function cardHTML(s, compact) {
    var f = isFav(s.id);
    return '<div class="stotra-card" data-id="' + esc(s.id) + '">' +
      '<div class="stotra-card__top">' +
      '<span class="stotra-card__type">' + esc(s.type) + '</span>' +
      '<button type="button" class="stotra-card__fav' + (f ? ' is-fav' : '') + '" data-fav="' + esc(s.id) + '" aria-label="' + (f ? 'Remove from' : 'Add to') + ' favourites">' + (f ? '★' : '☆') + '</button>' +
      '</div>' +
      '<span class="stotra-card__name-dev">' + esc(s.nameDev) + '</span>' +
      '<h3>' + esc(s.name) + '</h3>' +
      '<span class="stotra-card__deity">' + esc(s.deityName) + ' · ' + esc(s.deityDev) + '</span>' +
      '<span class="stotra-card__cta">Read &amp; recite →</span>' +
      '<span class="stotra-card__brand">By CA Anshul Karwa</span>' +
      '</div>';
  }

  /* ---- Bind card events ------------------------------------------------- */
  function bindCards(container) {
    container.querySelectorAll('[data-fav]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleFav(btn.getAttribute('data-fav'));
      });
    });
    container.querySelectorAll('[data-id]').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('[data-fav]')) return;
        global.location.href = '/stotra/' + encodeURIComponent(card.getAttribute('data-id')) + '/';
      });
    });
  }

  /* ---- Deity filters ---------------------------------------------------- */
  function renderDeities() {
    if (!el.deities) return;
    var cats = [{ id: 'all', name: 'All', dev: '' }].concat(DEITIES);
    el.deities.innerHTML = '';
    cats.forEach(function (d) {
      var b = doc.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (d.id === activeDeity ? ' is-selected' : '');
      b.setAttribute('aria-pressed', d.id === activeDeity ? 'true' : 'false');
      b.textContent = d.id === 'all' ? 'All' : d.name;
      b.addEventListener('click', function () { activeDeity = d.id; render(); });
      el.deities.appendChild(b);
    });
  }

  /* ---- Favourites row --------------------------------------------------- */
  function renderFavs() {
    var favIds = loadFavs();
    if (!favIds.length || !el.favRow) {
      if (el.favSection) el.favSection.style.display = 'none';
      return;
    }
    if (el.favSection) el.favSection.style.display = '';
    var items = [];
    for (var i = 0; i < favIds.length && i < 10; i++) {
      for (var j = 0; j < STOTRAS.length; j++) {
        if (STOTRAS[j].id === favIds[i]) { items.push(STOTRAS[j]); break; }
      }
    }
    el.favRow.innerHTML = items.map(function (s) { return cardHTML(s, true); }).join('');
    bindCards(el.favRow);
  }

  /* ---- Recently read row ------------------------------------------------ */
  function renderRecent() {
    var ids = loadRecent();
    if (!ids.length || !el.recentRow) {
      if (el.recentSection) el.recentSection.style.display = 'none';
      return;
    }
    if (el.recentSection) el.recentSection.style.display = '';
    var items = [];
    for (var i = 0; i < ids.length && i < 10; i++) {
      for (var j = 0; j < STOTRAS.length; j++) {
        if (STOTRAS[j].id === ids[i]) { items.push(STOTRAS[j]); break; }
      }
    }
    el.recentRow.innerHTML = items.map(function (s) { return cardHTML(s, true); }).join('');
    bindCards(el.recentRow);
  }

  /* ---- Main grid -------------------------------------------------------- */
  function renderGrid() {
    if (!el.grid) return;
    var list = STOTRAS.filter(function (s) {
      return (activeDeity === 'all' || s.deity === activeDeity) && matchesSearch(s, searchQuery);
    });
    if (!list.length) {
      el.grid.innerHTML = '<p class="muted" style="text-align:center;padding:var(--space-7)">No stotras found.</p>';
      return;
    }

    if (activeDeity !== 'all' || searchQuery) {
      el.grid.innerHTML = list.map(function (s) { return cardHTML(s); }).join('');
    } else {
      var grouped = {};
      var order = [];
      list.forEach(function (s) {
        if (!grouped[s.deity]) { grouped[s.deity] = []; order.push(s.deity); }
        grouped[s.deity].push(s);
      });
      var html = '';
      order.forEach(function (did) {
        var deity = null;
        for (var i = 0; i < DEITIES.length; i++) if (DEITIES[i].id === did) { deity = DEITIES[i]; break; }
        var dname = deity ? deity.name : did;
        var ddev = deity ? deity.dev : '';
        html += '<div class="stotra-section">' +
          '<div class="stotra-section__head">' +
          '<span class="stotra-section__icon">' + esc(ddev) + '</span>' +
          '<span class="stotra-section__title">' + esc(dname) + '</span>' +
          '<span class="stotra-section__subtitle">' + grouped[did].length + ' text' + (grouped[did].length > 1 ? 's' : '') + '</span>' +
          '</div>' +
          '<div class="stotra-grid">' + grouped[did].map(function (s) { return cardHTML(s); }).join('') + '</div>' +
          '</div>';
      });
      el.grid.innerHTML = html;
    }
    bindCards(el.grid);
  }

  /* ---- Full render ------------------------------------------------------- */
  function render() {
    renderDeities();
    renderFavs();
    renderRecent();
    renderGrid();
  }

  /* ---- Init -------------------------------------------------------------- */
  function init() {
    if (el.search) {
      el.search.addEventListener('input', function () {
        searchQuery = this.value.trim();
        renderGrid();
      });
    }
    render();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();

})(typeof window !== 'undefined' ? window : this);
