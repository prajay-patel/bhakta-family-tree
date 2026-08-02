const RELATION_GROUPS = [
  { group:'Maternal side', subtitle:'Maa ki taraf', branch:'maternal', relations:[
    { key:'nana',        terms:['Nana','Nana-ji'],          gujaratiTerm:'નાના', label:"Mother's father",           gender:'m', branch:'maternal', generation:-2 },
    { key:'nani',        terms:['Nani','Nani-ji'],          gujaratiTerm:'નાની', label:"Mother's mother",           gender:'f', branch:'maternal', generation:-2 },
    { key:'mama',        terms:['Mama','Mamo','Mama-ji'],   gujaratiTerm:'મામા', label:"Mother's brother",          gender:'m', branch:'maternal', generation:-1 },
    { key:'mami',        terms:['Mami','Mami-ji'],          gujaratiTerm:'મામી', label:"Mother's brother's wife",   gender:'f', branch:'maternal', generation:-1 },
    { key:'masi',        terms:['Masi','Maasi','Masiba'],   gujaratiTerm:'માસી', label:"Mother's sister",           gender:'f', branch:'maternal', generation:-1 },
    { key:'masiyai',     terms:['Masiyai','Masad'],         gujaratiTerm:'માસા', label:"Mother's sister's husband", gender:'m', branch:'maternal', generation:-1 },
    { key:'masera_bhai', terms:['Masera bhai','Masera'],    gujaratiTerm:'માસેરા', label:"Masi's son (cousin)",    gender:'m', branch:'maternal', generation:0  },
    { key:'maseri_bhen', terms:['Maseri bhen','Maseri'],    gujaratiTerm:'માસેરી', label:"Masi's daughter",        gender:'f', branch:'maternal', generation:0  },
  ]},
  { group:'Paternal side', subtitle:'Baap ki taraf', branch:'paternal', relations:[
    { key:'dada',          terms:['Dada','Dada-ji'],          gujaratiTerm:'દાદા', label:"Father's father",          gender:'m', branch:'paternal', generation:-2 },
    { key:'dadi',          terms:['Dadi','Dadi-ji','Dadima'], gujaratiTerm:'દાદી', label:"Father's mother",          gender:'f', branch:'paternal', generation:-2 },
    { key:'kaka',          terms:['Kaka','Chacha'],           gujaratiTerm:'કાકા', label:"Father's brother",         gender:'m', branch:'paternal', generation:-1 },
    { key:'kaki',          terms:['Kaki','Chachi'],           gujaratiTerm:'કાકી', label:"Father's brother's wife",  gender:'f', branch:'paternal', generation:-1 },
    { key:'foi',           terms:['Foi','Foiba','Bua'],       gujaratiTerm:'ફોઈ', label:"Father's sister",          gender:'f', branch:'paternal', generation:-1 },
    { key:'fuva',          terms:['Fuva','Fuvaji','Phupha'],  gujaratiTerm:'ફુવા', label:"Father's sister's husband",gender:'m', branch:'paternal', generation:-1 },
    { key:'foiferal_bhai', terms:['Foiferal bhai'],           gujaratiTerm:'ફોઈ-ફેરલ', label:"Foi's son",          gender:'m', branch:'paternal', generation:0  },
    { key:'foiferal_bhen', terms:['Foiferal bhen'],           gujaratiTerm:'ફોઈ-ફેરલ', label:"Foi's daughter",     gender:'f', branch:'paternal', generation:0  },
  ]},
  { group:"Spouse's family", subtitle:'Sasurak paksh', branch:'inlaw', relations:[
    { key:'sasur',   terms:['Sasur','Sasurji'],   gujaratiTerm:'સસરા', label:"Spouse's father",           gender:'m', branch:'inlaw', generation:-1 },
    { key:'saas',    terms:['Saas','Sasu'],        gujaratiTerm:'સાસુ', label:"Spouse's mother",           gender:'f', branch:'inlaw', generation:-1 },
    { key:'jeth',    terms:['Jeth','Jethji'],      gujaratiTerm:'જેઠ',  label:"Husband's elder brother",   gender:'m', branch:'inlaw', generation:0  },
    { key:'jethani', terms:['Jethani'],             gujaratiTerm:'જેઠાણી',label:"Jeth's wife",             gender:'f', branch:'inlaw', generation:0  },
    { key:'devar',   terms:['Devar','Devru'],       gujaratiTerm:'દેવર', label:"Husband's younger brother", gender:'m', branch:'inlaw', generation:0  },
    { key:'devrani', terms:['Devrani'],              gujaratiTerm:'દેરાણી',label:"Devar's wife",            gender:'f', branch:'inlaw', generation:0  },
    { key:'nanad',   terms:['Nanad'],               gujaratiTerm:'નણંદ', label:"Husband's sister",          gender:'f', branch:'inlaw', generation:0  },
    { key:'jija',    terms:['Jija','Jijaji'],       gujaratiTerm:'જીજા', label:"Sister's husband",          gender:'m', branch:'inlaw', generation:0  },
  ]},
  { group:'Direct family', subtitle:null, branch:'direct', relations:[
    { key:'bhai', terms:['Bhai','Bhaiya','Dada(elder)'], gujaratiTerm:'ભાઈ',  label:'Brother',     gender:'m', branch:'direct', generation:0 },
    { key:'bhen', terms:['Bhen','Didi'],                  gujaratiTerm:'બહેન', label:'Sister',      gender:'f', branch:'direct', generation:0 },
    { key:'beta', terms:['Beta','Dikro'],                 gujaratiTerm:'બેટા', label:'Son',         gender:'m', branch:'direct', generation:1 },
    { key:'beti', terms:['Beti','Dikri'],                 gujaratiTerm:'બેટી', label:'Daughter',    gender:'f', branch:'direct', generation:1 },
    { key:'pota', terms:['Pota','Potro'],                 gujaratiTerm:'પૌત્ર', label:'Grandson',  gender:'m', branch:'direct', generation:2 },
    { key:'poti', terms:['Poti','Potri'],                 gujaratiTerm:'પૌત્રી', label:'Granddaughter', gender:'f', branch:'direct', generation:2 },
  ]},
];
const RELATION_MAP = {};
RELATION_GROUPS.forEach(g => g.relations.forEach(r => { RELATION_MAP[r.key] = r; }));
