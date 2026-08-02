const SHEET_ENDPOINT = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
function flattenForSheet(data) {
  return {
    submitted_at: data.submittedAt||'', first_name: data.firstName||'',
    alias: data.alias||'', middle_name: data.middleName||'',
    last_name: data.lastName||'', maiden_name: data.maidenName||'',
    gotra: data.gotra||'', gender: data.gender||'',
    relation_key: data.relationKey||'', custom_relation: data.customRelation||'',
    relation_branch: data.relationBranch||'',
    relation_generation: data.relationGeneration??'',
    anchor_first: data.anchorFirstName||'', anchor_last: data.anchorLastName||'',
    dob: data.dob||'', dob_unknown: data.dobUnknown?'1':'',
    approx_age: data.approxAge||'', birth_place: data.birthPlace||'',
    village_origin: data.villageOrigin||'', country_emigrated: data.countryEmigrated||'',
    dod: data.dod||'', dod_unknown: data.dodUnknown?'1':'',
    parent1_name: data.parent1?.name||'', parent1_dob: data.parent1?.dob||'',
    parent2_name: data.parent2?.name||'', parent2_dob: data.parent2?.dob||'',
    spouses_json: JSON.stringify(data.spouses||[]),
    children_json: JSON.stringify(data.children||[]),
    notes: data.notes||'', is_stub: data.isStub?'1':'',
    submitter_name: data.submitterName||'', submitter_email: data.submitterEmail||'',
    raw_json: JSON.stringify(data),
  };
}
async function submitToSheets(data) {
  if (!SHEET_ENDPOINT || SHEET_ENDPOINT.includes('YOUR_APPS_SCRIPT')) {
    console.log('[DEV] Submission:', data);
    await new Promise(r => setTimeout(r, 200));
    return;
  }
  const body = new URLSearchParams();
  Object.entries(flattenForSheet(data)).forEach(([k,v]) => body.append(k,v));
  await fetch(SHEET_ENDPOINT, { method:'POST', body, headers:{'Content-Type':'application/x-www-form-urlencoded'}, mode:'no-cors' });
}
