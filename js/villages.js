/**
 * villages.js
 * ─────────────────────────────────────────────────────────────
 * All 243 Leuva Patidar villages of South Gujarat, with known
 * transliteration variants and district assignments.
 *
 * Used by:
 *   - The form: autocomplete on the "Village / ancestral origin" field
 *   - collate.py: canonical alias lookup before fuzzy matching
 *
 * Districts covered: Surat, Navsari, Valsad, Tapi
 * (Originally all one Surat district — see PATIDAR_HISTORY.md)
 *
 * Source: Leuva Patidar Villages of South Gujarat
 */

const LEUVA_VILLAGES = [
  // ── A ──
  { name: 'Adada',           aliases: [],                           district: 'Navsari' },
  { name: 'Afva',            aliases: ['Isroli-Afva'],              district: 'Navsari' },
  { name: 'Amadhara',        aliases: [],                           district: 'Surat'   },
  { name: 'Amadpore',        aliases: ['Amadpor'],                  district: 'Surat'   },
  { name: 'Ambach',          aliases: [],                           district: 'Navsari' },
  { name: 'Ambheti',         aliases: [],                           district: 'Valsad'  },
  { name: 'Amdhar',          aliases: [],                           district: 'Surat'   },
  { name: 'Anklav',          aliases: ['Anklave'],                  district: 'Surat'   },
  { name: 'Asta',            aliases: [],                           district: 'Navsari' },
  { name: 'Astagam',         aliases: [],                           district: 'Navsari' },
  { name: 'Astan',           aliases: [],                           district: 'Navsari' },

  // ── B ──
  { name: 'Baben',           aliases: [],                           district: 'Surat'   },
  { name: 'Babla',           aliases: [],                           district: 'Navsari' },
  { name: 'Bagumara',        aliases: [],                           district: 'Valsad'  },
  { name: 'Bajipura',        aliases: [],                           district: 'Valsad'  },
  { name: 'Bamanvel',        aliases: ['Bamanvela'],                district: 'Navsari' },
  { name: 'Barasadi',        aliases: [],                           district: 'Surat'   },
  { name: 'Bardoli',         aliases: ['Badoli'],                   district: 'Surat'   },
  { name: 'Bhamadia',        aliases: [],                           district: 'Valsad'  },
  { name: 'Bhamaiya',        aliases: [],                           district: 'Navsari' },
  { name: 'Bharampore',      aliases: ['Bharampora'],               district: 'Valsad'  },
  { name: 'Bharmre-Manekpore', aliases: [],                         district: 'Surat'   },
  { name: 'Bhestan',         aliases: [],                           district: 'Surat'   },
  { name: 'Bhutsad',         aliases: [],                           district: 'Navsari' },
  { name: 'Bhuvasan',        aliases: [],                           district: 'Surat'   },
  { name: 'Bid-Ghej',        aliases: ['Bid Ghej','Ghej-Bid'],      district: 'Navsari' },
  { name: 'Bilimora',        aliases: ['Bilimoda','Bilimore'],       district: 'Navsari' },
  { name: 'Binwada',         aliases: [],                           district: 'Valsad'  },
  { name: 'Bodali',          aliases: [],                           district: 'Surat'   },
  { name: 'Bodlai',          aliases: [],                           district: 'Navsari' },
  { name: 'Butwada',         aliases: [],                           district: 'Valsad'  },

  // ── C ──
  { name: 'Chanvai',         aliases: [],                           district: 'Surat'   },
  { name: 'Chikhli',         aliases: ['Chikli','Chikhali','Chikali','Chichli'], district: 'Navsari' },
  { name: 'Chikhli-Derod',   aliases: [],                           district: 'Navsari' },
  { name: 'Chikhli-Dungar',  aliases: [],                           district: 'Navsari' },
  { name: 'Chokhad',         aliases: [],                           district: 'Surat'   },
  { name: 'Chovisi-Moti',    aliases: [],                           district: 'Navsari' },
  { name: 'Chovisi-Nani',    aliases: [],                           district: 'Navsari' },

  // ── D ──
  { name: 'Daman',           aliases: [],                           district: 'Daman'   },
  { name: 'Dandeshwar',      aliases: [],                           district: 'Navsari' },
  { name: 'Dandvalli',       aliases: ['Dandvali'],                 district: 'Valsad'  },
  { name: 'Dastan',          aliases: [],                           district: 'Navsari' },
  { name: 'Degaam',          aliases: [],                           district: 'Surat'   },
  { name: 'Degama',          aliases: [],                           district: 'Surat'   },
  { name: 'Delad',           aliases: [],                           district: 'Navsari' },
  { name: 'Derod',           aliases: [],                           district: 'Navsari' },
  { name: 'Devadh',          aliases: [],                           district: 'Navsari' },
  { name: 'Dhaman',          aliases: [],                           district: 'Surat'   },
  { name: 'Dhamdod',         aliases: [],                           district: 'Navsari' },
  { name: 'Dhanori',         aliases: [],                           district: 'Navsari' },
  { name: 'Dharampur',       aliases: [],                           district: 'Valsad'  },
  { name: 'Dharotha',        aliases: [],                           district: 'Surat'   },
  { name: 'Digas',           aliases: [],                           district: 'Navsari' },
  { name: 'Donja',           aliases: [],                           district: 'Valsad'  },
  { name: 'Drangadhra',      aliases: [],                           district: 'Surat'   },
  { name: 'Dumbhal',         aliases: [],                           district: 'Surat'   },
  { name: 'Dungar',          aliases: [],                           district: 'Navsari' },
  { name: 'Dungar-Chikhli',  aliases: [],                           district: 'Navsari' },
  { name: 'Dungari',         aliases: [],                           district: 'Navsari' },

  // ── E ──
  { name: 'Ena-Tundi',       aliases: ['Enatundi'],                 district: 'Navsari' },
  { name: 'Endhal',          aliases: [],                           district: 'Navsari' },

  // ── F ──
  { name: 'Fadvel',          aliases: [],                           district: 'Navsari' },
  { name: 'Falod-Moti',      aliases: [],                           district: 'Surat'   },
  { name: 'Fulpada',         aliases: [],                           district: 'Surat'   },

  // ── G ──
  { name: 'Gandeva',         aliases: ['Gandheva'],                 district: 'Navsari' },
  { name: 'Gandevi',         aliases: ['Gandhevi'],                 district: 'Navsari' },
  { name: 'Ganesh-Sisodra',  aliases: [],                           district: 'Navsari' },
  { name: 'Gekti',           aliases: [],                           district: 'Navsari' },
  { name: 'Ghej-Bid',        aliases: ['Bid-Ghej'],                 district: 'Navsari' },
  { name: 'Godadha',         aliases: [],                           district: 'Tapi'    },
  { name: 'Goji',            aliases: [],                           district: 'Surat'   },
  { name: 'Golwad',          aliases: [],                           district: 'Navsari' },
  { name: 'Gordha',          aliases: [],                           district: 'Surat'   },
  { name: 'Gorgam',          aliases: [],                           district: 'Surat'   },
  { name: 'Gunaswel',        aliases: ['Gunasvel'],                 district: 'Navsari' },
  { name: 'Gurukul-Supa',    aliases: [],                           district: 'Navsari' },

  // ── H ──
  { name: 'Haladhava',       aliases: [],                           district: 'Navsari' },
  { name: 'Hanuman Bhagda',  aliases: [],                           district: 'Surat'   },
  { name: 'Hathuka',         aliases: [],                           district: 'Navsari' },

  // ── I ──
  { name: 'Isroli-Afva',     aliases: ['Afva'],                     district: 'Navsari' },

  // ── J ──
  { name: 'Jalalpore',       aliases: ['Jalalpor'],                 district: 'Navsari' },
  { name: 'Jamania',         aliases: [],                           district: 'Surat'   },
  { name: 'Jatpor',          aliases: ['Jatpore'],                  district: 'Navsari' },
  { name: 'Jujva',           aliases: [],                           district: 'Navsari' },

  // ── K ──
  { name: 'Kachigam',        aliases: [],                           district: 'Valsad'  },
  { name: 'Kadod',           aliases: [],                           district: 'Surat'   },
  { name: 'Kadodara',        aliases: [],                           district: 'Surat'   },
  { name: 'Kalakachha',      aliases: [],                           district: 'Navsari' },
  { name: 'Kalakva',         aliases: ['Kalakwa'],                  district: 'Navsari' },
  { name: 'Kaliyari',        aliases: [],                           district: 'Navsari' },
  { name: 'Kalvada',         aliases: [],                           district: 'Valsad'  },
  { name: 'Kani',            aliases: [],                           district: 'Surat'   },
  { name: 'Kanjanhari',      aliases: ['kanjanhari'],               district: 'Navsari' },
  { name: 'Kantali',         aliases: [],                           district: 'Surat'   },
  { name: 'Karachka',        aliases: [],                           district: 'Navsari' },
  { name: 'Kareli',          aliases: [],                           district: 'Surat'   },
  { name: 'Kevada',          aliases: [],                           district: 'Navsari' },
  { name: 'Khad-Chhipa',     aliases: [],                           district: 'Surat'   },
  { name: 'Khad-Supa',       aliases: [],                           district: 'Navsari' },
  { name: 'Khajurdi',        aliases: [],                           district: 'Surat'   },
  { name: 'Khambhda',        aliases: [],                           district: 'Surat'   },
  { name: 'Khaparia',        aliases: [],                           district: 'Surat'   },
  { name: 'Kharad-Chhitra',  aliases: [],                           district: 'Navsari' },
  { name: 'Kharvasa',        aliases: [],                           district: 'Navsari' },
  { name: 'Khergam',         aliases: [],                           district: 'Navsari' },
  { name: 'Khoj-Pardi',      aliases: [],                           district: 'Valsad'  },
  { name: 'Kholwad',         aliases: [],                           district: 'Surat'   },
  { name: 'Kikwad',          aliases: [],                           district: 'Navsari' },
  { name: 'Kolasana',        aliases: [],                           district: 'Navsari' },
  { name: 'Kosmada',         aliases: [],                           district: 'Navsari' },
  { name: 'Kothamdi',        aliases: [],                           district: 'Navsari' },
  { name: 'Kuched',          aliases: [],                           district: 'Navsari' },
  { name: 'Kukeri',          aliases: [],                           district: 'Navsari' },
  { name: 'Kumbharia',       aliases: [],                           district: 'Navsari' },
  { name: 'Kurel',           aliases: ['Matvad-Kurel'],             district: 'Navsari' },

  // ── L ──
  { name: 'Lakhanpore',      aliases: ['Lakhanpor'],                district: 'Navsari' },
  { name: 'Laskana',         aliases: [],                           district: 'Surat'   },
  { name: 'Lilapore',        aliases: ['Lilapor'],                  district: 'Surat'   },

  // ── M ──
  { name: 'Machhad',         aliases: [],                           district: 'Navsari' },
  { name: 'Madhi',           aliases: [],                           district: 'Navsari' },
  { name: 'Mahuva',          aliases: [],                           district: 'Surat'   },
  { name: 'Malekpore',       aliases: ['Malekpor'],                 district: 'Surat'   },
  { name: 'Mandvi',          aliases: [],                           district: 'Surat',
    note: 'Mandvi (Surat district) — distinct from Mandvi in Kutch' },
  { name: 'Manekpore',       aliases: ['Manekpor'],                 district: 'Surat'   },
  { name: 'Mangrolia',       aliases: [],                           district: 'Surat'   },
  { name: 'Matvad-Kurel',    aliases: ['Kurel'],                    district: 'Navsari' },
  { name: 'Minkach',         aliases: [],                           district: 'Navsari' },
  { name: 'Minkachha',       aliases: [],                           district: 'Navsari' },
  { name: 'Mori',            aliases: [],                           district: 'Navsari' },
  { name: 'Mota',            aliases: [],                           district: 'Surat'   },
  { name: 'Munsad',          aliases: [],                           district: 'Navsari' },

  // ── N ──
  { name: 'Nagod',           aliases: [],                           district: 'Navsari' },
  { name: 'Nandida',         aliases: [],                           district: 'Navsari' },
  { name: 'Nansad',          aliases: [],                           district: 'Valsad'  },
  { name: 'Nasura',          aliases: [],                           district: 'Surat'   },
  { name: 'Navafalia',       aliases: ['Navafalia'],                district: 'Navsari' },
  { name: 'Navagam',         aliases: [],                           district: 'Navsari' },
  { name: 'Navsari',         aliases: ['Navasari','Naosari'],       district: 'Navsari',
    note: 'District headquarters' },
  { name: 'Nevri',           aliases: [],                           district: 'Valsad'  },
  { name: 'Ninat',           aliases: [],                           district: 'Navsari' },
  { name: 'Niyol',           aliases: [],                           district: 'Navsari' },
  { name: 'Nizar',           aliases: [],                           district: 'Surat'   },
  { name: 'Nogama',          aliases: [],                           district: 'Navsari' },

  // ── O ──
  { name: 'Orgam',           aliases: [],                           district: 'Valsad'  },
  { name: 'Orna',            aliases: [],                           district: 'Navsari' },

  // ── P ──
  { name: 'Padaria',         aliases: [],                           district: 'Surat'   },
  { name: 'Pahadfalia',      aliases: [],                           district: 'Valsad'  },
  { name: 'Palan',           aliases: [],                           district: 'Surat'   },
  { name: 'Panaj',           aliases: [],                           district: 'Navsari' },
  { name: 'Pardi-Arak',      aliases: [],                           district: 'Valsad'  },
  { name: 'Pardi-Khoj',      aliases: [],                           district: 'Valsad'  },
  { name: 'Pardi-Killa',     aliases: [],                           district: 'Valsad'  },
  { name: 'Pardi-Nogama',    aliases: [],                           district: 'Valsad'  },
  { name: 'Pardi-Pata',      aliases: [],                           district: 'Valsad'  },
  { name: 'Pardi-Valsad',    aliases: [],                           district: 'Valsad'  },
  { name: 'Pariya',          aliases: [],                           district: 'Navsari' },
  { name: 'Parsivad',        aliases: [],                           district: 'Navsari' },
  { name: 'Pathradia',       aliases: [],                           district: 'Surat'   },
  { name: 'Pathron',         aliases: [],                           district: 'Navsari' },
  { name: 'Pera',            aliases: [],                           district: 'Navsari' },
  { name: 'Pinsad',          aliases: [],                           district: 'Navsari' },
  { name: 'Pipalgabhan',     aliases: [],                           district: 'Valsad'  },
  { name: 'Pisad',           aliases: [],                           district: 'Navsari' },
  { name: 'Pitha',           aliases: [],                           district: 'Navsari' },
  { name: 'Puna',            aliases: [],                           district: 'Surat'   },

  // ── R ──
  { name: 'Rajpura',         aliases: [],                           district: 'Navsari' },
  { name: 'Ranirajpura',     aliases: [],                           district: 'Navsari' },
  { name: 'Ratania',         aliases: [],                           district: 'Navsari' },
  { name: 'Rola-Dungari',    aliases: [],                           district: 'Navsari' },
  { name: 'Rumla',           aliases: [],                           district: 'Navsari' },
  { name: 'Rundhvada',       aliases: ['Rundhwada'],                district: 'Tapi'    },
  { name: 'Rupwada (Vyara)', aliases: ['Rupwada'],                  district: 'Tapi'    },
  { name: 'Ruva',            aliases: [],                           district: 'Navsari' },

  // ── S ──
  { name: 'Sadadvel',        aliases: [],                           district: 'Surat'   },
  { name: 'Sadakpor',        aliases: ['Sadakpore'],                district: 'Navsari' },
  { name: 'Sadlav',          aliases: [],                           district: 'Navsari' },
  { name: 'Sadodra',         aliases: [],                           district: 'Navsari' },
  { name: 'Samthan',         aliases: [],                           district: 'Navsari' },
  { name: 'Sandalpore',      aliases: ['Sandalpor'],                district: 'Navsari' },
  { name: 'Sanjan',          aliases: [],                           district: 'Valsad'  },
  { name: 'Sarai',           aliases: [],                           district: 'Navsari' },
  { name: 'Saravni',         aliases: [],                           district: 'Surat'   },
  { name: 'Sarbhon',         aliases: [],                           district: 'Surat'   },
  { name: 'Saroli',          aliases: [],                           district: 'Surat'   },
  { name: 'Sarona',          aliases: [],                           district: 'Navsari' },
  { name: 'Satem',           aliases: [],                           district: 'Navsari' },
  { name: 'Sayadla',         aliases: [],                           district: 'Navsari' },
  { name: 'Segva',           aliases: [],                           district: 'Navsari' },
  { name: 'Sejvad',          aliases: [],                           district: 'Navsari' },
  { name: 'Sevani',          aliases: [],                           district: 'Navsari' },
  { name: 'Shahu',           aliases: [],                           district: 'Navsari' },
  { name: 'Shamalfalia',     aliases: [],                           district: 'Navsari' },
  { name: 'Shampura',        aliases: [],                           district: 'Navsari' },
  { name: 'Sindhai (Bansda)',aliases: ['Sindhai'],                  district: 'Navsari' },
  { name: 'Singod',          aliases: [],                           district: 'Navsari' },
  { name: 'Sisodra-Arak',    aliases: ['Sisodra'],                  district: 'Navsari' },
  { name: 'Siyada',          aliases: [],                           district: 'Navsari' },
  { name: 'Siyod',           aliases: [],                           district: 'Navsari' },
  { name: 'Sonwada',         aliases: [],                           district: 'Valsad'  },
  { name: 'Soyani',          aliases: [],                           district: 'Navsari' },
  { name: 'Supa',            aliases: ['Gurukul-Supa','Khad-Supa'], district: 'Navsari' },
  { name: 'Surat',           aliases: ['Surate'],                   district: 'Surat',
    note: 'District city — British-era spelling was Surate' },
  { name: 'Surkhai',         aliases: [],                           district: 'Navsari' },
  { name: 'Syadla',          aliases: [],                           district: 'Navsari' },

  // ── T ──
  { name: 'Tankal',          aliases: [],                           district: 'Navsari' },
  { name: 'Tarbhon',         aliases: [],                           district: 'Surat'   },
  { name: 'Tarsadi',         aliases: [],                           district: 'Surat'   },
  { name: 'Thakkarwada',     aliases: [],                           district: 'Navsari' },
  { name: 'Tighra',          aliases: [],                           district: 'Surat'   },
  { name: 'Timba',           aliases: [],                           district: 'Navsari' },
  { name: 'Timberva',        aliases: [],                           district: 'Navsari' },
  { name: 'Toli',            aliases: [],                           district: 'Navsari' },
  { name: 'Tundi',           aliases: [],                           district: 'Navsari' },

  // ── U ──
  { name: 'Uchharel',        aliases: [],                           district: 'Navsari' },
  { name: 'Udvada',          aliases: ['Udwada'],                   district: 'Valsad'  },
  { name: 'Umrakh',          aliases: [],                           district: 'Navsari' },
  { name: 'Unai',            aliases: [],                           district: 'Tapi'    },
  { name: 'Undach',          aliases: [],                           district: 'Navsari' },
  { name: 'Unn',             aliases: [],                           district: 'Navsari' },
  { name: 'Uva',             aliases: [],                           district: 'Navsari' },

  // ── V ──
  { name: 'Vachharvad',      aliases: [],                           district: 'Navsari' },
  { name: 'Vadhvania',       aliases: [],                           district: 'Surat'   },
  { name: 'Vadoli',          aliases: [],                           district: 'Navsari' },
  { name: 'Vaghchhhipa-Moti', aliases: [],                          district: 'Navsari' },
  { name: 'Vaghech',         aliases: [],                           district: 'Navsari' },
  { name: 'Vaghecha',        aliases: [],                           district: 'Navsari' },
  { name: 'Vaghrech',        aliases: [],                           district: 'Navsari' },
  { name: 'Valod',           aliases: [],                           district: 'Tapi'    },
  { name: 'Valsad',          aliases: ['Bulsar','Bulsad'],          district: 'Valsad',
    note: 'British-era name was Bulsar — will not fuzzy-match without alias' },
  { name: 'Vandervella',     aliases: [],                           district: 'Valsad'  },
  { name: 'Vanesa',          aliases: [],                           district: 'Navsari' },
  { name: 'Vankal',          aliases: [],                           district: 'Valsad'  },
  { name: 'Vankaner',        aliases: [],                           district: 'Navsari' },
  { name: 'Vansda',          aliases: [],                           district: 'Navsari' },
  { name: 'Vanz',            aliases: [],                           district: 'Navsari' },
  { name: 'Vanzana',         aliases: [],                           district: 'Navsari' },
  { name: 'Vapi',            aliases: [],                           district: 'Valsad'  },
  { name: 'Varad',           aliases: [],                           district: 'Navsari' },
  { name: 'Velanpur',        aliases: [],                           district: 'Navsari' },
  { name: 'Vihan',           aliases: [],                           district: 'Navsari' },
  { name: 'Viraval',         aliases: [],                           district: 'Navsari' },
  { name: 'Vyara',           aliases: ['Biara','Rupwada (Vyara)'],  district: 'Tapi'    },

  // ── Z ──
  { name: 'Zervavra',        aliases: [],                           district: 'Navsari' },
];

/**
 * Flat list of all searchable strings (canonical + aliases).
 * Used to populate the autocomplete datalist.
 */
const VILLAGE_SEARCH_TERMS = (() => {
  const terms = new Set();
  LEUVA_VILLAGES.forEach(v => {
    terms.add(v.name);
    v.aliases.forEach(a => terms.add(a));
  });
  return Array.from(terms).sort();
})();

/**
 * Alias map: any variant → canonical village name.
 * Used by collate.py (via the raw_json column) to normalise
 * before fuzzy matching.
 */
const VILLAGE_ALIAS_MAP = (() => {
  const map = {};
  LEUVA_VILLAGES.forEach(v => {
    map[v.name.toLowerCase()] = v.name;
    v.aliases.forEach(a => { map[a.toLowerCase()] = v.name; });
  });
  return map;
})();

/**
 * Look up a village name (or alias) → canonical entry.
 * Returns null if not found (may be outside South Gujarat).
 */
function findVillage(input) {
  if (!input) return null;
  const key = input.trim().toLowerCase();
  const canonical = VILLAGE_ALIAS_MAP[key];
  if (!canonical) return null;
  return LEUVA_VILLAGES.find(v => v.name === canonical) || null;
}

/**
 * Wire autocomplete onto an input element.
 * Creates a <datalist> and attaches it.
 * Also attaches an onblur handler that canonicalises the typed value.
 */
function attachVillageAutocomplete(inputEl) {
  const listId = 'village-list-' + Math.random().toString(36).slice(2);
  const dl = document.createElement('datalist');
  dl.id = listId;
  VILLAGE_SEARCH_TERMS.forEach(term => {
    const opt = document.createElement('option');
    opt.value = term;
    dl.appendChild(opt);
  });
  document.body.appendChild(dl);
  inputEl.setAttribute('list', listId);
  inputEl.setAttribute('autocomplete', 'off');

  // On blur, show district hint if recognised
  inputEl.addEventListener('blur', function () {
    const match = findVillage(this.value);
    const hintEl = document.getElementById(inputEl.id + '-hint');
    if (hintEl) {
      if (match) {
        hintEl.textContent = `${match.district} district${match.note ? ' · ' + match.note : ''}`;
        hintEl.style.display = 'block';
      } else if (this.value.trim()) {
        hintEl.textContent = 'Village not in South Gujarat list — that\'s fine, type whatever you know';
        hintEl.style.display = 'block';
      } else {
        hintEl.style.display = 'none';
      }
    }
  });
}

// Auto-attach to villageOrigin field when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('villageOrigin');
  if (el) attachVillageAutocomplete(el);
});
