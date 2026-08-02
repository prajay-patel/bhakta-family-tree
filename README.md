# Bhakta Family Tree

A crowd-sourced family tree for the Bhakta family — Leuva Patidar from
South Gujarat, with branches across East Africa, the UK, USA, Canada, and beyond.
Fill in what you know about your relatives and we'll weave it all together.

## Add a family member

**Open the form:** [https://prajay-patel.github.io/bhakta-family-tree](https://prajay-patel.github.io/bhakta-family-tree)

The form works on any phone, tablet, or computer — no account or app needed.

### What to expect

1. **Start with yourself** — fill in your own details first (DOB, village, parents, spouse, children)
2. **Add relatives** — use the relationship picker to add Dada, Dadi, Masi, Kaka, Bhai, Bhen and more
3. **Fill in only what you know** — every field is optional except your name. A name and a rough birth year is enough.
4. **Switch the reference point** mid-session to add relatives of a relative (e.g. your Dadi's siblings)

### Tips

- **Village autocomplete** — start typing and it will suggest from all 243 Leuva Patidar villages of South Gujarat, with district shown on selection
- **Country of emigration** — a dropdown with all known Bhakta family destinations (Kenya, Uganda, Zambia, UK, USA, Canada…)
- **Gujarati toggle** — the ગુ / EN button in the top right switches all labels to Gujarati script
- **Stub quick-add** — if you know someone exists but not their details, add a placeholder so other relatives can fill it in later
- **Confirmation email** — you'll receive a summary of what you submitted

### What happens to your submission

Your entry goes directly to a private Google Sheet that only the tree curator
can access. It never touches this GitHub repository. The curator periodically
runs a pipeline that deduplicates entries, builds the relationship graph, and
updates the tree viewer.

---

## View the tree

The interactive tree is at:

[https://prajay-patel.github.io/bhakta-family-tree/viewer.html](https://prajay-patel.github.io/bhakta-family-tree/viewer.html)

In the viewer you can:
- Search by name
- Filter by branch (maternal / paternal / in-law)
- Adjust how many generations to show with the slider
- Click any person to see their details and add more information
- Lock or unlock panning and zooming (locked by default)
- Download the tree as SVG or PNG

**Dashed nodes** are people who have been mentioned in someone else's submission
but haven't submitted their own entry yet. Click them and use the
"Fill in details" button to add what you know.

---

## Family history

Learn about the Leuva Patidar migration from Gujarat to East Africa and beyond:

[https://prajay-patel.github.io/bhakta-family-tree/history.html](https://prajay-patel.github.io/bhakta-family-tree/history.html)

---

## Questions or corrections

Contact the tree curator at **bhakta.family.tree@gmail.com** or use the
"Add / update info" button on any person's detail panel in the viewer.

---

## Legal & privacy

The code in this repository is released under the [MIT License](LICENSE).

Family data submitted through this form is stored privately in the curator's
Google Sheet and is not included in this repository at any point. The tree
data visible in the viewer is encoded before being committed here.

See the [Privacy Notice](PRIVACY.md) for full details on what is collected,
how it is stored, and your rights — including how to request access,
correction, or deletion of anything you have submitted.

*This project uses GitHub Pages, a private Google Sheet, and a local Python
pipeline. No raw family data is stored in this public repository.*
