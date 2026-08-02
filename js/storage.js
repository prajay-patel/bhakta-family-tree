const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwoGZRuIQafbjYNhMdnHiANgGVhVwwfzFDJCGwT5lhk82KH3DHpiLHOh6rjhzV80Xru3g/exec';
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
    father_first: data.father?.firstName||'', father_last: data.father?.lastName||'',
    father_dob:   data.father?.dob||'',       father_village: data.father?.village||'',
    mother_first: data.mother?.firstName||'', mother_last: data.mother?.lastName||'',
    mother_maiden: data.mother?.maidenName||'', mother_dob: data.mother?.dob||'',
    parent1_name: data.parent1?.name||'', parent1_dob: data.parent1?.dob||'',
    parent2_name: data.parent2?.name||'', parent2_dob: data.parent2?.dob||'',
    spouses_json: JSON.stringify(data.spouses||[]),
    children_json: JSON.stringify(data.children||[]),
    notes: data.notes||'', is_stub: data.isStub?'1':'',
    submitter_name: data.submitterName||'', submitter_email: data.submitterEmail||'',
    merge_target_node_id: data.merge_target_node_id||'',
    is_node_update: data.is_node_update?'1':'',
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
