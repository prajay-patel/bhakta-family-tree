/**
 * treedata.js — loads the family tree data for map.html.
 * Same format and decoding as viewer.html: data/family_tree.enc (rolling
 * XOR + base64, written by the private repo's encode_tree.py), falling back
 * to plain data/family_tree.json for local development.
 */
const TREE_DECODE_KEY = 137;   // must match encode_tree.py DEFAULT_KEY

function treeXorDecode(b64, key) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  const k = key & 0xFF;
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) ^ ((k * 31 + i * 17) & 0xFF);
  return new TextDecoder().decode(out);
}

async function loadTreeData() {
  const attempts = [
    { url: 'data/family_tree.enc', encoded: true },
    { url: 'data/family_tree.json', encoded: false },
  ];
  for (const { url, encoded } of attempts) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      let data;
      if (encoded) {
        const env = await res.json();
        if (env.v !== 1 || (env.k & 0xFF) !== (TREE_DECODE_KEY & 0xFF)) continue;
        const str = treeXorDecode(env.d, TREE_DECODE_KEY);
        if (new TextEncoder().encode(str).length !== env.n) continue;   // integrity check
        data = JSON.parse(str);
      } else {
        data = await res.json();
      }
      const nodes = data.nodes || data.people || [];
      nodes.forEach(n => { n.id = n.id || n.node_id; });
      return { nodes, edges: data.links || data.edges || [] };
    } catch (e) {
      console.warn(`Could not load ${url}:`, e.message);
    }
  }
  return { nodes: [], edges: [] };
}
