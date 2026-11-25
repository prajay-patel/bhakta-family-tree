/* Bhakta Family Tree — colour themes
 *
 * Load this in <head> (before the page renders) on every page. It applies the
 * saved palette straight away to avoid a flash of the default colours, then
 * adds a palette button to the element marked [data-theme-slot] (or a
 * floating button if the page has none).
 *
 * A palette has five base colours. Every other shade the pages use (borders,
 * muted text, card surfaces, text on buttons) is worked out from them, so a
 * custom combination stays readable without anyone picking twenty colours.
 */
(function () {
  'use strict';

  var STORE_KEY = 'bft-theme-v1';

  var ROLES = [
    { key: 'bg',        label: 'Background',          hint: 'Page background' },
    { key: 'fg',        label: 'Text',                hint: 'Main text colour' },
    { key: 'primary',   label: 'Header & buttons',    hint: 'Top bar, main buttons, links' },
    { key: 'accent',    label: 'Highlight',           hint: 'Badges, focus rings, spouse lines' },
    { key: 'secondary', label: 'Second accent',       hint: 'Add-person button, deceased tags' }
  ];

  // Quick-pick swatches shown under each colour.
  var SWATCHES = {
    bg:        ['#F5EFE0', '#FFFFFF', '#FFF6EC', '#F1F4F9', '#EEF6F5', '#FBF3F4', '#15181A', '#0F1424'],
    fg:        ['#1C1A14', '#000000', '#2A1A0E', '#141B2D', '#0F2326', '#3A3A3A', '#E9E4D8', '#F2F2F2'],
    primary:   ['#2D4A3E', '#26386B', '#9A3412', '#0F5E63', '#7A2E4A', '#4B3F72', '#1F1F1F', '#5B6B2F'],
    accent:    ['#C8973A', '#E0A526', '#D97706', '#C9A227', '#D79A4A', '#3B82C4', '#B5651D', '#8A4B00'],
    secondary: ['#8B3A2A', '#A23B5B', '#1E5A6B', '#3E6B5E', '#8E3B46', '#B45309', '#6D28D9', '#A00000']
  };

  // Ready-made combinations. "Heritage" carries the site's original shades
  // exactly so the default look does not change at all.
  var PRESETS = [
    { id: 'heritage', name: 'Heritage', base: { bg: '#F5EFE0', fg: '#1C1A14', primary: '#2D4A3E', accent: '#C8973A', secondary: '#8B3A2A' },
      exact: { 'parchment-d': '#E8DFC8', 'ink-soft': '#4A4438', 'forest-l': '#3D6254', mist: '#A8B8A0',
               surface: '#FFFFFF', 'on-primary': '#F5EFE0', 'on-primary-soft': '#A8B8A0', 'on-accent': '#FFFFFF', 'on-secondary': '#FFFFFF' } },
    { id: 'saffron',  name: 'Saffron',  base: { bg: '#FFF6EC', fg: '#2A1A0E', primary: '#9A3412', accent: '#E0A526', secondary: '#1E5A6B' } },
    { id: 'monsoon',  name: 'Monsoon',  base: { bg: '#F1F4F9', fg: '#141B2D', primary: '#26386B', accent: '#D9A441', secondary: '#A23B5B' } },
    { id: 'peacock',  name: 'Peacock',  base: { bg: '#EEF6F5', fg: '#0F2326', primary: '#0F5E63', accent: '#C9A227', secondary: '#8E3B46' } },
    { id: 'lotus',    name: 'Lotus',    base: { bg: '#FBF3F4', fg: '#2B1A1F', primary: '#7A2E4A', accent: '#D79A4A', secondary: '#3E6B5E' } },
    { id: 'night',    name: 'Night',    base: { bg: '#15181A', fg: '#E9E4D8', primary: '#24443A', accent: '#D9AE5E', secondary: '#D07A63' } },
    { id: 'midnight', name: 'Midnight', base: { bg: '#0F1424', fg: '#E3E7F2', primary: '#2A3A75', accent: '#E2B356', secondary: '#E07A8F' } },
    { id: 'contrast', name: 'High contrast', base: { bg: '#FFFFFF', fg: '#000000', primary: '#000000', accent: '#8A4B00', secondary: '#A00000' } }
  ];

  /* ---------- colour maths ---------- */

  function normHex(v) {
    if (typeof v !== 'string') return null;
    var s = v.trim().replace(/^#/, '');
    if (/^[0-9a-f]{3}$/i.test(s)) s = s.split('').map(function (c) { return c + c; }).join('');
    return /^[0-9a-f]{6}$/i.test(s) ? '#' + s.toUpperCase() : null;
  }
  function toRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function toHex(rgb) {
    return '#' + rgb.map(function (c) {
      return Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0');
    }).join('').toUpperCase();
  }
  // mix(a, b, t): t = 0 gives a, t = 1 gives b
  function mix(a, b, t) {
    var x = toRgb(a), y = toRgb(b);
    return toHex([0, 1, 2].map(function (i) { return x[i] + (y[i] - x[i]) * t; }));
  }
  function lum(hex) {
    return toRgb(hex).reduce(function (acc, c, i) {
      c /= 255;
      c = c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      return acc + c * [0.2126, 0.7152, 0.0722][i];
    }, 0);
  }
  function contrast(a, b) {
    var la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }
  // Text colour for a filled button: white unless the fill is too pale for it.
  function onColour(fill, dark) {
    return contrast('#FFFFFF', fill) >= 2.4 ? '#FFFFFF' : dark;
  }

  // Nudge a colour toward the text colour until it reads on the background,
  // so a dark header colour can still be used for links and labels.
  function readable(c, bg, fg, min) {
    for (var t = 0; t <= 1.001 && contrast(c, bg) < min; t += 0.1) c = mix(c, fg, 0.1);
    return c;
  }

  function derive(base) {
    var dark = lum(base.bg) < 0.2;
    var darkest = lum(base.bg) < lum(base.fg) ? base.bg : base.fg;
    var onPrimary = contrast(base.bg, base.primary) >= contrast(base.fg, base.primary) ? base.bg : base.fg;
    return {
      parchment: base.bg,
      ink: base.fg,
      forest: readable(base.primary, base.bg, base.fg, 4.5),
      'forest-bg': base.primary,
      gold: readable(base.accent, base.bg, base.fg, 2),
      rust: readable(base.secondary, base.bg, base.fg, 3),
      'parchment-d': mix(base.bg, base.fg, dark ? 0.16 : 0.09),
      'ink-soft': mix(base.fg, base.bg, 0.28),
      mist: mix(base.fg, base.bg, 0.5),
      'forest-l': mix(base.primary, onPrimary, 0.12),
      surface: dark ? mix(base.bg, '#FFFFFF', 0.06) : mix(base.bg, '#FFFFFF', 0.75),
      'on-primary': onPrimary,
      'on-primary-soft': mix(onPrimary, base.primary, 0.32),
      'on-accent': onColour(base.accent, darkest),
      'on-secondary': onColour(base.secondary, darkest),
      scheme: dark ? 'dark' : 'light'
    };
  }

  /* ---------- state ---------- */

  function presetById(id) {
    for (var i = 0; i < PRESETS.length; i++) if (PRESETS[i].id === id) return PRESETS[i];
    return null;
  }
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      if (s && s.base) {
        var ok = ROLES.every(function (r) { return normHex(s.base[r.key]); });
        if (ok) return s;
      }
    } catch (e) { /* storage blocked or corrupt — fall back to default */ }
    return { preset: 'heritage', base: Object.assign({}, PRESETS[0].base) };
  }
  function save(s) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
  }

  var state = load();

  function apply(s) {
    var vars = derive(s.base);
    var p = presetById(s.preset);
    if (p && p.exact) Object.assign(vars, p.exact);
    var root = document.documentElement;
    Object.keys(vars).forEach(function (k) {
      if (k !== 'scheme') root.style.setProperty('--' + k, vars[k]);
    });
    root.style.colorScheme = vars.scheme;
    root.setAttribute('data-palette', s.preset || 'custom');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      (document.head || root).appendChild(meta);
    }
    meta.content = s.base.primary;
    document.dispatchEvent(new CustomEvent('bft-theme-change', { detail: vars }));
  }

  apply(state);

  /* ---------- picker UI ---------- */

  var CSS = [
    '.thm-btn{display:inline-flex;align-items:center;gap:.35rem;background:color-mix(in srgb,var(--on-primary) 12%,transparent);border:1px solid color-mix(in srgb,var(--on-primary) 25%,transparent);color:var(--on-primary);border-radius:6px;padding:.3rem .65rem;font:500 .78rem Inter,sans-serif;cursor:pointer;white-space:nowrap;transition:background .15s}',
    '.thm-btn:hover{background:color-mix(in srgb,var(--on-primary) 22%,transparent)}',
    '.thm-btn .thm-dots{display:inline-flex}',
    '.header-inner .thm-btn .thm-lbl,.topbar .thm-btn .thm-lbl{display:none}',
    '.topbar .thm-btn{flex-shrink:0;padding:.36rem .55rem}',
    '.header-inner .thm-btn{padding:.42rem .6rem}',
    '.thm-btn .thm-dots i{width:9px;height:9px;border-radius:50%;border:1px solid color-mix(in srgb,var(--on-primary) 50%,transparent);margin-left:-3px}',
    '.thm-btn .thm-dots i:first-child{margin-left:0}',
    '.thm-btn.floating{position:fixed;right:16px;bottom:16px;z-index:999;background:var(--forest-bg);box-shadow:0 2px 10px rgba(0,0,0,.2)}',
    '.thm-panel{position:fixed;top:64px;right:16px;width:360px;max-height:calc(100vh - 80px);overflow-y:auto;z-index:1000;background:var(--surface);color:var(--ink);border:1px solid var(--parchment-d);border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.25);padding:16px 18px 18px;font:400 13px/1.45 Inter,sans-serif;text-align:left}',
    '.thm-panel[hidden]{display:none}',
    '.thm-panel h2{font:600 1.05rem "Playfair Display",serif;color:var(--ink);margin:0}',
    '.thm-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}',
    '.thm-x{background:none;border:none;font-size:18px;line-height:1;color:var(--ink-soft);cursor:pointer;padding:2px 4px}',
    '.thm-sec{font:600 .68rem Inter,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);margin:14px 0 8px}',
    '.thm-presets{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}',
    '.thm-card{border:2px solid var(--parchment-d);border-radius:8px;padding:0;overflow:hidden;cursor:pointer;background:none;text-align:center;font:500 .7rem Inter,sans-serif;color:var(--ink)}',
    '.thm-card:hover{border-color:var(--mist)}',
    '.thm-card[aria-pressed="true"]{border-color:var(--gold);box-shadow:0 0 0 2px color-mix(in srgb,var(--gold) 35%,transparent)}',
    '.thm-prev{display:block;height:40px;position:relative}',
    '.thm-prev b{position:absolute;left:0;right:0;top:0;height:11px}',
    '.thm-prev s{position:absolute;left:7px;top:18px;width:24px;height:3px;border-radius:2px}',
    '.thm-prev u{position:absolute;left:7px;top:26px;width:15px;height:3px;border-radius:2px;opacity:.6}',
    '.thm-prev em{position:absolute;right:7px;bottom:7px;width:10px;height:10px;border-radius:50%}',
    '.thm-prev q{position:absolute;right:20px;bottom:7px;width:10px;height:10px;border-radius:50%}',
    '.thm-card span.thm-name{display:block;padding:4px 2px 5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.thm-role{padding:9px 0;border-top:1px solid var(--parchment-d)}',
    '.thm-role-top{display:flex;align-items:center;gap:8px}',
    '.thm-role-name{flex:1;min-width:0}',
    '.thm-role-name strong{display:block;font-weight:500;font-size:.82rem}',
    '.thm-role-name small{display:block;color:var(--ink-soft);font-size:.7rem}',
    '.thm-pick{position:relative;width:30px;height:30px;border-radius:6px;border:1px solid var(--parchment-d);overflow:hidden;flex-shrink:0}',
    '.thm-panel .thm-pick input{position:absolute;inset:-6px;width:calc(100% + 12px);height:calc(100% + 12px);border:none;padding:0;cursor:pointer;background:none}',
    '.thm-panel .thm-hex{width:88px;flex:0 0 88px;padding:5px 7px;border:1px solid var(--parchment-d);border-radius:6px;font:500 .8rem ui-monospace,Menlo,monospace;color:var(--ink);background:var(--parchment);text-transform:uppercase}',
    '.thm-panel .thm-hex:focus{outline:none;border-color:var(--forest)}',
    '.thm-panel .thm-hex.bad{border-color:#C0392B}',
    '.thm-sw{display:flex;gap:5px;margin-top:7px;flex-wrap:wrap}',
    '.thm-sw button{width:22px;height:22px;border-radius:50%;border:1px solid color-mix(in srgb,var(--ink) 20%,transparent);cursor:pointer;padding:0}',
    '.thm-sw button[aria-pressed="true"]{outline:2px solid var(--gold);outline-offset:2px}',
    '.thm-check{margin-top:12px;padding:8px 10px;border-radius:6px;background:var(--parchment);font-size:.75rem;color:var(--ink-soft)}',
    '.thm-check b{font-weight:600}',
    '.thm-check .warn{color:#C0392B}',
    '.thm-foot{display:flex;gap:8px;margin-top:12px}',
    '.thm-foot button{flex:1;padding:7px 10px;border-radius:6px;font:500 .8rem Inter,sans-serif;cursor:pointer}',
    '.thm-reset{background:none;border:1px solid var(--parchment-d);color:var(--ink-soft)}',
    '.thm-reset:hover{border-color:var(--forest);color:var(--forest)}',
    '.thm-done{background:var(--forest-bg);border:1px solid var(--forest-bg);color:var(--on-primary)}',
    '@media(max-width:600px){.thm-panel{left:12px;right:12px;width:auto;top:56px;max-height:calc(100vh - 68px)}.thm-btn .thm-lbl{display:none}}'
  ].join('\n');

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'style') n.style.cssText = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function presetCard(p) {
    var b = p.base;
    var prev = el('span', { 'class': 'thm-prev', style: 'background:' + b.bg }, [
      el('b', { style: 'background:' + b.primary }),
      el('s', { style: 'background:' + b.fg }),
      el('u', { style: 'background:' + b.fg }),
      el('q', { style: 'background:' + b.secondary }),
      el('em', { style: 'background:' + b.accent })
    ]);
    var card = el('button', { type: 'button', 'class': 'thm-card', 'data-preset': p.id, 'aria-pressed': 'false', title: p.name }, [
      prev, el('span', { 'class': 'thm-name', text: p.name })
    ]);
    card.addEventListener('click', function () {
      state = { preset: p.id, base: Object.assign({}, p.base) };
      commit();
    });
    return card;
  }

  function roleRow(role) {
    var picker = el('input', { type: 'color', 'aria-label': role.label + ' colour picker' });
    var hex = el('input', { type: 'text', 'class': 'thm-hex', maxlength: '7', spellcheck: 'false', 'aria-label': role.label + ' hex code' });
    var sw = el('div', { 'class': 'thm-sw' });
    SWATCHES[role.key].forEach(function (c) {
      var b = el('button', { type: 'button', 'data-c': c, title: c, 'aria-label': role.label + ' ' + c, style: 'background:' + c });
      b.addEventListener('click', function () { setRole(role.key, c); });
      sw.appendChild(b);
    });
    picker.addEventListener('input', function () { setRole(role.key, picker.value); });
    hex.addEventListener('input', function () {
      var v = normHex(hex.value);
      hex.classList.toggle('bad', !v && hex.value.trim() !== '');
      if (v && (hex.value.replace('#', '').length === 6)) setRole(role.key, v, true);
    });
    hex.addEventListener('blur', function () { hex.classList.remove('bad'); hex.value = state.base[role.key]; });
    hex.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var v = normHex(hex.value); if (v) setRole(role.key, v); hex.blur(); }
    });
    return el('div', { 'class': 'thm-role', 'data-role': role.key }, [
      el('div', { 'class': 'thm-role-top' }, [
        el('div', { 'class': 'thm-role-name' }, [
          el('strong', { text: role.label }), el('small', { text: role.hint })
        ]),
        el('div', { 'class': 'thm-pick' }, [picker]),
        hex
      ]),
      sw
    ]);
  }

  var panel, button;

  function setRole(key, value, fromHexField) {
    value = normHex(value);
    if (!value) return;
    state = { preset: null, base: Object.assign({}, state.base) };
    state.base[key] = value;
    // If the edit happens to land back on a preset, show it as selected.
    PRESETS.forEach(function (p) {
      if (ROLES.every(function (r) { return p.base[r.key] === state.base[r.key]; })) state.preset = p.id;
    });
    commit(fromHexField ? key : null);
  }

  function commit(skipHexKey) {
    apply(state);
    save(state);
    sync(skipHexKey);
  }

  function sync(skipHexKey) {
    if (!panel) return;
    panel.querySelectorAll('.thm-card').forEach(function (c) {
      c.setAttribute('aria-pressed', String(c.getAttribute('data-preset') === state.preset));
    });
    ROLES.forEach(function (r) {
      var row = panel.querySelector('[data-role="' + r.key + '"]');
      var v = state.base[r.key];
      row.querySelector('input[type=color]').value = v.toLowerCase();
      if (r.key !== skipHexKey) { var h = row.querySelector('.thm-hex'); h.value = v; h.classList.remove('bad'); }
      row.querySelectorAll('.thm-sw button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-c') === v));
      });
    });
    var label = panel.querySelector('.thm-current');
    var p = presetById(state.preset);
    label.textContent = p ? p.name : 'Custom';
    var d = derive(state.base);
    var cText = contrast(state.base.fg, state.base.bg);
    var cHead = contrast(d['on-primary'], state.base.primary);
    var chk = panel.querySelector('.thm-check');
    chk.innerHTML = '';
    function line(name, ratio) {
      var good = ratio >= 4.5;
      chk.appendChild(el('div', null, [
        document.createTextNode(name + ': '),
        el('b', { 'class': good ? '' : 'warn', text: ratio.toFixed(1) + ':1' }),
        document.createTextNode(good ? ' — easy to read' : ' — may be hard to read')
      ]));
    }
    line('Text on background', cText);
    line('Header text', cHead);
    if (button) {
      var dots = button.querySelectorAll('.thm-dots i');
      ['bg', 'primary', 'accent'].forEach(function (k, i) { dots[i].style.background = state.base[k]; });
    }
  }

  function buildPanel() {
    var presets = el('div', { 'class': 'thm-presets' });
    PRESETS.forEach(function (p) { presets.appendChild(presetCard(p)); });
    var roles = el('div');
    ROLES.forEach(function (r) { roles.appendChild(roleRow(r)); });

    var close = el('button', { type: 'button', 'class': 'thm-x', 'aria-label': 'Close colour settings', text: '×' });
    var reset = el('button', { type: 'button', 'class': 'thm-reset', text: 'Reset to Heritage' });
    var done = el('button', { type: 'button', 'class': 'thm-done', text: 'Done' });

    panel = el('div', { 'class': 'thm-panel', id: 'thmPanel', role: 'dialog', 'aria-label': 'Colour scheme', hidden: '' }, [
      el('div', { 'class': 'thm-head' }, [
        el('div', null, [el('h2', { text: 'Colour scheme' }),
          el('small', { style: 'color:var(--ink-soft)' }, [document.createTextNode('Current: '), el('span', { 'class': 'thm-current' })])]),
        close
      ]),
      el('div', { 'class': 'thm-sec', text: 'Preset combinations' }),
      presets,
      el('div', { 'class': 'thm-sec', text: 'Pick individual colours' }),
      roles,
      el('div', { 'class': 'thm-check', 'aria-live': 'polite' }),
      el('div', { 'class': 'thm-foot' }, [reset, done])
    ]);

    close.addEventListener('click', hide);
    done.addEventListener('click', hide);
    reset.addEventListener('click', function () {
      state = { preset: 'heritage', base: Object.assign({}, PRESETS[0].base) };
      commit();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) hide(); });
    document.addEventListener('mousedown', function (e) {
      if (!panel.hidden && !panel.contains(e.target) && !button.contains(e.target)) hide();
    });
    document.body.appendChild(panel);
  }

  function show() { panel.hidden = false; button.setAttribute('aria-expanded', 'true'); sync(); }
  function hide() { panel.hidden = true; button.setAttribute('aria-expanded', 'false'); }

  function mount() {
    document.head.appendChild(el('style', { id: 'thm-style', text: CSS }));
    var slot = document.querySelector('[data-theme-slot]');
    button = el('button', { type: 'button', 'class': 'thm-btn' + (slot ? '' : ' floating'), 'aria-haspopup': 'dialog',
      'aria-expanded': 'false', 'aria-controls': 'thmPanel', title: 'Change colour scheme' }, [
      el('span', { 'class': 'thm-dots', 'aria-hidden': 'true' }, [el('i'), el('i'), el('i')]),
      el('span', { 'class': 'thm-lbl', text: 'Colours' })
    ]);
    button.addEventListener('click', function () { panel.hidden ? show() : hide(); });
    if (slot) slot.appendChild(button); else document.body.appendChild(button);
    buildPanel();
    sync();
  }

  // Keep other open tabs of the site in step.
  window.addEventListener('storage', function (e) {
    if (e.key === STORE_KEY) { state = load(); apply(state); sync(); }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();

  window.BFTTheme = { presets: PRESETS, get: function () { return derive(state.base); } };
})();
