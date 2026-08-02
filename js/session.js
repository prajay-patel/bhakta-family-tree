/**
 * session.js v4
 * All form logic: anchor, multi-person session, draft autosave,
 * language toggle (EN/GU), stub quick-add, validation, submission.
 */

// ── Language ─────────────────────────────────────────────────
let currentLang = 'en';
function toggleLang() {
  currentLang = currentLang === 'en' ? 'gu' : 'en';
  document.querySelectorAll('[data-en]').forEach(el => {
    const txt = el.getAttribute('data-' + currentLang);
    if (txt) el.textContent = txt;
  });
  document.getElementById('langToggle').textContent =
    currentLang === 'en' ? 'ગુ / EN' : 'EN / ગુ';
}

// ── Session state ─────────────────────────────────────────────
const session = {
  submitterName: '', submitterEmail: '',
  mode: 'self',
  anchor: { firstName: '', lastName: '', nodeHint: null },
  people: [],
  currentPerson: null,
};
let selectedRelKey = null;
let spouseCount = 0, childCount = 0;
let shiftSelectedIdx = null;
let relGridVisible = false;

const DRAFT_KEY = 'family_tree_draft_v4';
const AUTOSAVE_INTERVAL = 30000; // 30s

// ── Draft autosave ────────────────────────────────────────────
function saveDraft() {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({
      session: { ...session, currentPerson: null },
      ts: Date.now(),
    }));
  } catch(e) { /* storage full or blocked */ }
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    if (Date.now() - d.ts > 7 * 24 * 60 * 60 * 1000) { clearDraft(); return null; }
    return d;
  } catch(e) { return null; }
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch(e) {}
}

function restoreDraft() {
  const d = loadDraft();
  if (!d) return;
  Object.assign(session, d.session);
  document.getElementById('draftBanner').hidden = true;
  refreshSessionUI();
  showPhase('phase-session');
}

function discardDraft() {
  clearDraft();
  document.getElementById('draftBanner').hidden = true;
}

// Check on load
window.addEventListener('DOMContentLoaded', () => {
  const d = loadDraft();
  if (d && d.session.people.length > 0) {
    const banner = document.getElementById('draftBanner');
    const name = d.session.anchor.firstName;
    document.getElementById('draftMsg').textContent =
      `You have a saved session for ${name || 'unknown'} with ${d.session.people.length} ${d.session.people.length === 1 ? 'person' : 'people'} added.`;
    banner.hidden = false;
  }
  buildRelPickers();
  populateStubRelSelect();
  setInterval(saveDraft, AUTOSAVE_INTERVAL);
});

// ── Phase helpers ─────────────────────────────────────────────
function showPhase(id) {
  document.querySelectorAll('.phase').forEach(p => {
    p.style.display = 'none'; p.classList.remove('active');
  });
  const el = document.getElementById(id);
  el.style.display = 'block'; el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Phase 0 ───────────────────────────────────────────────────
function setMode(mode) {
  session.mode = mode;
  document.getElementById('pill-self').classList.toggle('active', mode === 'self');
  document.getElementById('pill-proxy').classList.toggle('active', mode === 'proxy');
  document.getElementById('proxy-panel').hidden = mode !== 'proxy';
}

function startSession() {
  const first = v('anchorFirst'), last = v('anchorLast');
  let ok = true;
  if (!first) { err('anchorFirstErr','Required'); document.getElementById('anchorFirst').classList.add('invalid'); ok=false; }
  if (!last)  { err('anchorLastErr','Required');  document.getElementById('anchorLast').classList.add('invalid');  ok=false; }
  if (!ok) return;
  clearErr('anchorFirstErr'); clearErr('anchorLastErr');
  session.submitterName  = `${first} ${last}`.trim();
  session.submitterEmail = v('anchorEmail');
  if (session.mode === 'proxy') {
    session.anchor.firstName = v('proxyFirst') || first;
    session.anchor.lastName  = v('proxyLast')  || last;
  } else {
    session.anchor.firstName = first;
    session.anchor.lastName  = last;
  }
  refreshSessionUI();
  showPhase('phase-session');
  saveDraft();
}

// ── Phase 1 ───────────────────────────────────────────────────
function refreshSessionUI() {
  const anchorFull = `${session.anchor.firstName} ${session.anchor.lastName}`.trim();
  document.getElementById('sessionTitle').textContent =
    `Adding relatives of ${anchorFull}`;
  document.getElementById('addPromptText').textContent =
    session.people.length === 0
      ? `Who is a relative of ${session.anchor.firstName}?`
      : `Add another relative of ${session.anchor.firstName}`;

  const list = document.getElementById('addedList');
  list.innerHTML = '';
  if (session.people.length > 0) {
    document.getElementById('addedTray').hidden = false;
    session.people.forEach((p, i) => {
      const chip = document.createElement('div');
      chip.className = 'person-chip' + (p.isStub ? ' is-stub' : '');
      const nameEl = document.createElement('span');
      nameEl.className = 'chip-name';
      nameEl.textContent = displayName(p) || (p.isStub ? '[Stub]' : '(unnamed)');
      const relEl = document.createElement('span');
      relEl.className = 'chip-rel';
      relEl.textContent = chipRelLabel(p);
      const editBtn = document.createElement('button');
      editBtn.className = 'chip-edit'; editBtn.title = 'Edit';
      editBtn.innerHTML = '✎'; editBtn.onclick = () => editPerson(i);
      chip.appendChild(nameEl);
      chip.appendChild(relEl);
      chip.appendChild(editBtn);
      list.appendChild(chip);
    });
  } else {
    document.getElementById('addedTray').hidden = true;
  }

  const finBtn = document.getElementById('finishBtn');
  const n = session.people.length;
  finBtn.disabled = n === 0;
  document.getElementById('submitCount').textContent = n > 0 ? `(${n})` : '';
}

function chipRelLabel(p) {
  if (p.isStub) return 'stub';
  if (p.relationKey && RELATION_MAP[p.relationKey]) return RELATION_MAP[p.relationKey].terms[0];
  return p.customRelation || '—';
}
function displayName(p) {
  return [p.firstName, p.lastName].filter(Boolean).join(' ');
}

// Stub quick-add
function populateStubRelSelect() {
  const sel = document.getElementById('stubRelKey');
  RELATION_GROUPS.forEach(g => {
    const og = document.createElement('optgroup');
    og.label = g.group;
    g.relations.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r.key;
      opt.textContent = `${r.terms[0]} — ${r.label}`;
      og.appendChild(opt);
    });
    sel.appendChild(og);
  });
}

function addStubPerson() {
  const name    = v('stubName');
  const relKey  = document.getElementById('stubRelKey').value;
  const rel     = RELATION_MAP[relKey];
  session.people.push({
    firstName: name || null, lastName: null, middleName: null,
    alias: null, maidenName: null, gotra: null, gender: rel?.gender || null,
    relationKey: relKey || null, customRelation: null,
    relationBranch: rel?.branch || null, relationGeneration: rel?.generation ?? null,
    anchorFirstName: session.anchor.firstName, anchorLastName: session.anchor.lastName,
    dob: null, dobUnknown: false, approxAge: null, birthPlace: null,
    villageOrigin: null, countryEmigrated: null,
    dod: null, dodUnknown: false,
    spouses: [], children: [], parent1: {}, parent2: {},
    notes: null, submitterName: session.submitterName,
    submitterEmail: session.submitterEmail,
    submittedAt: new Date().toISOString(), isStub: true,
  });
  document.getElementById('stubName').value = '';
  document.getElementById('stubRelKey').value = '';
  refreshSessionUI();
  saveDraft();
}

// ── Phase 2: Person form ──────────────────────────────────────
function openPersonForm(editIndex = null) {
  selectedRelKey = null; spouseCount = 0; childCount = 0;
  clearPersonForm();
  session.currentPerson = editIndex !== null
    ? { ...session.people[editIndex], _editIndex: editIndex }
    : { _editIndex: null };
  if (editIndex !== null) prefillPersonForm(session.currentPerson);
  const anchorFull = `${session.anchor.firstName} ${session.anchor.lastName}`.trim();
  document.getElementById('relAnchorName').textContent = anchorFull;
  document.getElementById('personEyebrow').textContent =
    editIndex !== null ? `Editing — ${displayName(session.currentPerson) || 'person'}` : 'New family member';
  buildRelPickers();
  showSubSection(1);
  showPhase('phase-person');
}

function editPerson(i) { openPersonForm(i); }
function cancelPersonForm() { session.currentPerson = null; refreshSessionUI(); showPhase('phase-session'); }

function clearPersonForm() {
  ['pFirst','pAlias','pMiddle','pLast','pMaiden','pGotra','pGender',
   'fatherFirst','fatherLast','fatherDOB','fatherVillage',
   'motherFirst','motherLast','motherMaiden','motherDOB',
   'dobDay','dobMonth','dobYear','approxAge','birthPlace','villageOrigin',
   'countryEmigrated','dodDay','dodMonth','dodYear','pNotes','customRelation',
   'parent1Name','parent1DOB','parent2Name','parent2DOB'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['dobUnknown','dodUnknown'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = false;
  });
  ['dobFields','dodFields'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = false;
  });
  document.getElementById('pFirstErr').textContent = '';
  document.getElementById('inferredBox').hidden = true;
  document.querySelectorAll('.rel-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('spouseList').innerHTML = '';
  document.getElementById('childList').innerHTML = '';
  document.getElementById('villageOrigin-hint').hidden = true;
}

// Sub-section navigation
const SUB_TOTAL = 5;
function showSubSection(n) {
  document.querySelectorAll('.sub').forEach(s => s.classList.remove('active'));
  document.getElementById(`sub-${n}`).classList.add('active');
  document.getElementById('progressFill').style.width = `${(n/SUB_TOTAL)*100}%`;
  if (n === SUB_TOTAL) buildPersonSummary();
}
function nextSub(n) {
  if (n === 2 && !validateIdentity()) return;
  showSubSection(n + 1);
}
function prevSub(n) { showSubSection(n - 1); }

function validateIdentity() {
  const el = document.getElementById('pFirst');
  if (!el.value.trim()) {
    el.classList.add('invalid');
    document.getElementById('pFirstErr').textContent = 'First name is required';
    return false;
  }
  el.classList.remove('invalid');
  document.getElementById('pFirstErr').textContent = '';
  return true;
}

// Unknown toggles
function toggleDOBUnknown(cb) {
  document.getElementById('dobFields').hidden = cb.checked;
}
function toggleDODUnknown(cb) {
  document.getElementById('dodFields').hidden = cb.checked;
}

// ── Relation picker ───────────────────────────────────────────
const FAST_PATH_KEYS = ['dada','dadi','mama','masi','bhai','bhen'];

function buildRelPickers() {
  buildFastPath();
  buildFullGrid();
}

function buildFastPath() {
  const fp = document.getElementById('relFastPath');
  fp.innerHTML = '';
  FAST_PATH_KEYS.forEach(key => {
    const rel = RELATION_MAP[key];
    if (!rel) return;
    fp.appendChild(makeRelCard(rel));
  });
}

function buildFullGrid() {
  const grid = document.getElementById('relGridFull');
  grid.innerHTML = '';
  const DOT = { maternal:'dot-m', paternal:'dot-p', inlaw:'dot-i', direct:'dot-d' };
  RELATION_GROUPS.forEach(group => {
    const wrap = document.createElement('div');
    const head = document.createElement('div');
    head.className = 'rel-group-head';
    head.innerHTML = group.group +
      (group.subtitle ? `<span class="rel-group-sub">${group.subtitle}</span>` : '');
    wrap.appendChild(head);
    const cards = document.createElement('div');
    cards.className = 'rel-group-cards';
    group.relations.forEach(rel => cards.appendChild(makeRelCard(rel)));
    wrap.appendChild(cards);
    grid.appendChild(wrap);
  });
}

function makeRelCard(rel) {
  const DOT = { maternal:'dot-m', paternal:'dot-p', inlaw:'dot-i', direct:'dot-d' };
  const card = document.createElement('div');
  card.className = 'rel-card' + (rel.key === selectedRelKey ? ' selected' : '');
  card.dataset.key = rel.key;
  card.innerHTML = `
    <div class="rc-term"><span class="branch-dot ${DOT[rel.branch]||'dot-d'}"></span>${rel.terms[0]}</div>
    ${rel.gujaratiTerm ? `<div class="rc-gu">${rel.gujaratiTerm}</div>` : ''}
    <div class="rc-gloss">${rel.label}</div>`;
  card.addEventListener('click', () => selectRelation(rel.key));
  return card;
}

function selectRelation(key) {
  if (selectedRelKey === key) {
    selectedRelKey = null;
    document.querySelectorAll('.rel-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('inferredBox').hidden = true;
    return;
  }
  selectedRelKey = key;
  document.querySelectorAll('.rel-card').forEach(c =>
    c.classList.toggle('selected', c.dataset.key === key));
  const rel = RELATION_MAP[key];
  if (rel) {
    const g = rel.gender === 'f' ? 'Female' : rel.gender === 'm' ? 'Male' : 'Unknown gender';
    const b = { maternal:'maternal side', paternal:'paternal side', inlaw:'in-law side', direct:'direct family' }[rel.branch] || '';
    const gen = {'-2':'grandparent generation','-1':'parent generation','0':'same generation','1':'child generation','2':'grandchild generation'}[String(rel.generation)] || '';
    document.getElementById('inferredText').textContent = `Inferred: ${g} · ${b} · ${gen}`;
    document.getElementById('inferredBox').hidden = false;
    const gEl = document.getElementById('pGender');
    if (!gEl.value && rel.gender) gEl.value = rel.gender === 'f' ? 'female' : 'male';
  }
  document.getElementById('customRelation').value = '';
}

function toggleRelGrid() {
  relGridVisible = !relGridVisible;
  document.getElementById('relGridFull').hidden = !relGridVisible;
  document.getElementById('showMoreLabel').textContent =
    relGridVisible ? 'Show fewer ▴' : 'Show all relationships ▾';
}

// Clear card selection when custom text typed
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('customRelation')?.addEventListener('input', function() {
    if (this.value.trim()) {
      selectedRelKey = null;
      document.querySelectorAll('.rel-card').forEach(c => c.classList.remove('selected'));
      document.getElementById('inferredBox').hidden = true;
    }
  });
  // Village hint
  document.getElementById('villageOrigin')?.addEventListener('blur', function() {
    const match = typeof findVillage === 'function' ? findVillage(this.value) : null;
    const hint = document.getElementById('villageOrigin-hint');
    if (match) {
      hint.textContent = `${match.district} district${match.note ? ' · ' + match.note : ''}`;
      hint.hidden = false;
    } else if (this.value.trim()) {
      hint.textContent = 'Not in South Gujarat list — that\'s fine';
      hint.hidden = false;
    } else {
      hint.hidden = true;
    }
  });
});

// ── Dynamic rows ──────────────────────────────────────────────
function addSpouse() {
  spouseCount++;
  appendDynRow('spouseList', `sp-${spouseCount}`, 'Spouse name', 'spouseName', 'spouseDOB');
}
function addChild() {
  childCount++;
  appendDynRow('childList', `ch-${childCount}`, "Child's name", 'childName', 'childDOB');
}
function appendDynRow(listId, rowId, placeholder, nameField, dobField) {
  const row = document.createElement('div');
  row.className = 'dyn-row'; row.id = rowId;
  row.innerHTML = `
    <div class="field-group"><label>Full name</label>
      <input type="text" name="${nameField}[]" placeholder="${placeholder}"/></div>
    <div class="field-group"><label>Birth year</label>
      <input type="number" name="${dobField}[]" min="1800" max="2025" placeholder="YYYY"/></div>
    <button type="button" class="btn-remove-rel" onclick="document.getElementById('${rowId}').remove()" aria-label="Remove">✕</button>`;
  document.getElementById(listId).appendChild(row);
}

// ── Person summary ────────────────────────────────────────────
function buildPersonSummary() {
  const lines = [];
  const fn = v('pFirst'), ln = v('pLast'), alias = v('pAlias'), gotra = v('pGotra');
  const fullName = [fn, ln].filter(Boolean).join(' ');
  if (fullName) lines.push(`<strong>Name:</strong> ${fullName}`);
  if (alias)    lines.push(`<strong>Also known as:</strong> ${alias}`);
  if (gotra)    lines.push(`<strong>Gotra:</strong> ${gotra}`);
  const rel = selectedRelKey
    ? (RELATION_MAP[selectedRelKey]?.terms[0] || selectedRelKey)
    : v('customRelation');
  if (rel) lines.push(`<strong>Relationship:</strong> ${rel}`);
  const dob = buildDate(v('dobDay'),v('dobMonth'),v('dobYear'));
  const age = v('approxAge');
  const dobUnknown = document.getElementById('dobUnknown')?.checked;
  if (dobUnknown)   lines.push(`<strong>Born:</strong> unknown`);
  else if (dob)     lines.push(`<strong>Born:</strong> ${dob}`);
  else if (age)     lines.push(`<strong>Approx age:</strong> ${age}`);
  const village = v('villageOrigin'), country = v('countryEmigrated');
  if (village) lines.push(`<strong>Village:</strong> ${village}`);
  if (country) lines.push(`<strong>Emigrated to:</strong> ${country}`);
  const dodUnknown = document.getElementById('dodUnknown')?.checked;
  if (dodUnknown) lines.push(`<strong>Deceased:</strong> date unknown`);
  const fatherName = [v('fatherFirst'), v('fatherLast')].filter(Boolean).join(' ');
  const motherName = [v('motherFirst'), v('motherLast')].filter(Boolean).join(' ');
  if (fatherName) lines.push(`<strong>Father:</strong> ${fatherName}${v('fatherDOB') ? ' (b. '+v('fatherDOB')+')' : ''}`);
  if (motherName) {
    const maiden = v('motherMaiden') ? ` née ${v('motherMaiden')}` : '';
    lines.push(`<strong>Mother:</strong> ${motherName}${maiden}${v('motherDOB') ? ' (b. '+v('motherDOB')+')' : ''}`);
  }
  const spouseNames = Array.from(document.querySelectorAll('[name="spouseName[]"]'))
    .map(el => el.value.trim()).filter(Boolean);
  if (spouseNames.length) lines.push(`<strong>Spouse(s):</strong> ${spouseNames.join(', ')}`);
  const childNames = Array.from(document.querySelectorAll('[name="childName[]"]'))
    .map(el => el.value.trim()).filter(Boolean);
  if (childNames.length) lines.push(`<strong>Children:</strong> ${childNames.join(', ')}`);
  document.getElementById('personSummary').innerHTML = lines.join('<br>');
}

function buildDate(day, month, year) {
  if (!year) return '';
  if (month && day) return `${String(day).padStart(2,'0')}/${month}/${year}`;
  if (month) return `${month}/${year}`;
  return year;
}

// ── Collect & save ────────────────────────────────────────────
function collectPerson() {
  const spouses = Array.from(document.querySelectorAll('[name="spouseName[]"]'))
    .map((el,i) => ({ name: el.value.trim()||null, dob: document.querySelectorAll('[name="spouseDOB[]"]')[i]?.value.trim()||null }))
    .filter(s => s.name || s.dob);
  const children = Array.from(document.querySelectorAll('[name="childName[]"]'))
    .map((el,i) => ({ name: el.value.trim()||null, dob: document.querySelectorAll('[name="childDOB[]"]')[i]?.value.trim()||null }))
    .filter(c => c.name || c.dob);
  const rel = RELATION_MAP[selectedRelKey];
  return {
    firstName: v('pFirst')||null, alias: v('pAlias')||null,
    middleName: v('pMiddle')||null, lastName: v('pLast')||null,
    maidenName: v('pMaiden')||null, gotra: v('pGotra')||null,
    gender: v('pGender')||null,
    relationKey: selectedRelKey||null, customRelation: v('customRelation')||null,
    relationBranch: rel?.branch||null, relationGeneration: rel?.generation??null,
    anchorFirstName: session.anchor.firstName, anchorLastName: session.anchor.lastName,
    anchorNodeHint: session.anchor.nodeHint||null,
    dob: document.getElementById('dobUnknown')?.checked ? null : buildDate(v('dobDay'),v('dobMonth'),v('dobYear'))||null,
    dobUnknown: document.getElementById('dobUnknown')?.checked||false,
    approxAge: v('approxAge')||null, birthPlace: v('birthPlace')||null,
    villageOrigin: v('villageOrigin')||null, countryEmigrated: v('countryEmigrated')||null,
    dod: document.getElementById('dodUnknown')?.checked ? null : buildDate(v('dodDay'),v('dodMonth'),v('dodYear'))||null,
    dodUnknown: document.getElementById('dodUnknown')?.checked||false,
    father: {
      firstName: v('fatherFirst')||null, lastName: v('fatherLast')||null,
      dob: v('fatherDOB')||null, village: v('fatherVillage')||null,
    },
    mother: {
      firstName: v('motherFirst')||null, lastName: v('motherLast')||null,
      maidenName: v('motherMaiden')||null, dob: v('motherDOB')||null,
    },
    parent1: { name: v('parent1Name')||null, dob: v('parent1DOB')||null },
    parent2: { name: v('parent2Name')||null, dob: v('parent2DOB')||null },
    spouses, children, notes: v('pNotes')||null,
    submitterName: session.submitterName, submitterEmail: session.submitterEmail,
    submittedAt: new Date().toISOString(), isStub: false,
  };
}

function prefillPersonForm(p) {
  const set = (id,val) => { const el=document.getElementById(id); if(el&&val!=null) el.value=val; };
  set('pFirst',p.firstName); set('pAlias',p.alias); set('pMiddle',p.middleName);
  set('pLast',p.lastName); set('pMaiden',p.maidenName); set('pGotra',p.gotra);
  set('pGender',p.gender); set('approxAge',p.approxAge);
  set('birthPlace',p.birthPlace); set('villageOrigin',p.villageOrigin);
  set('countryEmigrated',p.countryEmigrated); set('pNotes',p.notes);
  set('customRelation',p.customRelation);
  set('fatherFirst',  p.father?.firstName);  set('fatherLast', p.father?.lastName);
  set('fatherDOB',    p.father?.dob);        set('fatherVillage', p.father?.village);
  set('motherFirst',  p.mother?.firstName);  set('motherLast', p.mother?.lastName);
  set('motherMaiden', p.mother?.maidenName); set('motherDOB',  p.mother?.dob);
  set('parent1Name',  p.parent1?.name);      set('parent1DOB', p.parent1?.dob);
  set('parent2Name',  p.parent2?.name);      set('parent2DOB', p.parent2?.dob);
  if (p.dobUnknown) { document.getElementById('dobUnknown').checked=true; document.getElementById('dobFields').hidden=true; }
  else if (p.dob) {
    const pts = p.dob.split('/');
    if (pts.length===3){set('dobDay',pts[0]);set('dobMonth',pts[1]);set('dobYear',pts[2]);}
    else if (pts.length===2){set('dobMonth',pts[0]);set('dobYear',pts[1]);}
    else set('dobYear',pts[0]);
  }
  if (p.dodUnknown) { document.getElementById('dodUnknown').checked=true; document.getElementById('dodFields').hidden=true; }
  if (p.relationKey) { selectedRelKey=p.relationKey; }
  p.spouses?.forEach(s => { spouseCount++; const id=`sp-${spouseCount}`; appendDynRow('spouseList',id,'Spouse name','spouseName','spouseDOB'); const r=document.getElementById(id); if(r){r.querySelector('[name="spouseName[]"]').value=s.name||'';r.querySelector('[name="spouseDOB[]"]').value=s.dob||'';} });
  p.children?.forEach(c => { childCount++; const id=`ch-${childCount}`; appendDynRow('childList',id,"Child's name",'childName','childDOB'); const r=document.getElementById(id); if(r){r.querySelector('[name="childName[]"]').value=c.name||'';r.querySelector('[name="childDOB[]"]').value=c.dob||'';} });
}

function savePerson() {
  const p = collectPerson();
  const idx = session.currentPerson?._editIndex;
  if (idx !== null && idx !== undefined) session.people[idx] = p;
  else session.people.push(p);
}
function saveAndReturn() {
  if (!validateIdentity()) { showSubSection(2); return; }
  savePerson(); refreshSessionUI(); saveDraft(); showPhase('phase-session');
}
function saveAndAnother() {
  if (!validateIdentity()) { showSubSection(2); return; }
  savePerson(); refreshSessionUI(); saveDraft(); openPersonForm();
}

// ── Shift anchor ──────────────────────────────────────────────
function shiftAnchor() {
  shiftSelectedIdx = null;
  const list = document.getElementById('shiftList');
  list.innerHTML = '';
  session.people.forEach((p, i) => {
    const name = displayName(p); if (!name) return;
    const card = document.createElement('div');
    card.className = 'shift-card';
    card.innerHTML = `<span class="shift-card-name">${name}</span><span class="shift-card-meta">${chipRelLabel(p)}</span>`;
    card.addEventListener('click', () => {
      document.querySelectorAll('.shift-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected'); shiftSelectedIdx = i;
      document.getElementById('shiftFirst').value = p.firstName||'';
      document.getElementById('shiftLast').value  = p.lastName||'';
    });
    list.appendChild(card);
  });
  showPhase('phase-shift');
}

function confirmShift() {
  const first = v('shiftFirst'), last = v('shiftLast');
  if (!first) return;
  session.anchor.firstName = first; session.anchor.lastName = last;
  session.anchor.nodeHint = shiftSelectedIdx !== null ? shiftSelectedIdx : null;
  refreshSessionUI(); showPhase('phase-session');
}

// ── Submit session ────────────────────────────────────────────
async function finishSession() {
  if (!session.people.length) return;
  document.getElementById('submittingMsg').textContent =
    `Sending ${session.people.length} ${session.people.length===1?'person':'people'}…`;
  showPhase('phase-submitting');
  try {
    for (const person of session.people) await submitToSheets(person);
    clearDraft();
    document.getElementById('successMsg').textContent =
      `${session.people.length} ${session.people.length===1?'entry':'entries'} recorded. Thank you!`;
    showPhase('phase-success');
  } catch(e) {
    alert('Something went wrong. Please try again.\n\n' + e.message);
    showPhase('phase-session');
  }
}

function startOver() {
  session.people=[]; session.currentPerson=null;
  session.submitterName=''; session.submitterEmail='';
  session.anchor={firstName:'',lastName:'',nodeHint:null};
  clearDraft(); showPhase('phase-anchor');
}

// ── Helpers ───────────────────────────────────────────────────
function v(id) { return (document.getElementById(id)?.value||'').trim(); }
function err(id,msg) { const el=document.getElementById(id); if(el) el.textContent=msg; }
function clearErr(id) { err(id,''); }
