# Family Tree — Submission Form

A crowd-sourced family tree for our extended family. Fill in what you know about your relatives and we'll weave it all together.

## How to add a family member

**Open the form:** [https://prajay-patel.github.io/family-tree-form](https://prajay-patel.github.io/family-tree-form)

The form works on any phone, tablet, or computer — no account or app needed. Just open the link in a browser.

### What to expect

1. **Tell us who you are** — your name anchors the relationship terms (Masi, Kaka, etc.)
2. **Add as many relatives as you like** in one session — you don't have to submit one at a time
3. **Fill in only what you know** — every field is optional except your own name. A name and a rough birth year is enough to get someone into the tree.
4. **Switch the reference point** mid-session if you want to enter relatives of a relative (e.g. your Dadi's siblings)

### Tips

- If you know someone exists but not their name, use the "stub" quick-add — it reserves a spot in the tree for other relatives to fill in later
- The village of origin field has autocomplete for all 243 Leuva Patidar villages of South Gujarat — start typing and it will suggest matches
- The Gujarati language toggle (top right) switches all labels to Gujarati script
- Your draft is saved automatically — if you close the tab and come back, you can resume where you left off
- You'll receive a confirmation email with a summary of what you submitted

### What happens to your submission

Your entry goes directly to a private Google Sheet that only the tree curator can access. It never touches this GitHub repository. The curator periodically runs a pipeline that deduplicates entries, resolves relationships, and updates the tree.

---

## View the tree

Once the curator has processed submissions, the interactive tree is available at:

[https://prajay-patel.github.io/family-tree-form/viewer.html](https://prajay-patel.github.io/family-tree-form/viewer.html)

In the viewer you can:
- Search by name
- Filter by branch (maternal / paternal / in-law)
- Adjust how many generations to show
- Click any person to see their details
- Download a PNG or GEDCOM file

Dashed nodes are people who have been mentioned but haven't submitted their own entry yet — if you know them, consider filling in their details.

---

## Questions or corrections

If you notice an error, a missing person, or a misplaced relationship, contact the curator at **[bhakta.family.tree@example.com]** or use the "Add / update info" button on any person's detail panel in the viewer.

---

---

## Legal & privacy

The code in this repository is released under the [MIT License](LICENSE).

Family data submitted through this form is stored privately in the curator's
Google Sheet and is not included in this repository at any point.

See the [Privacy Notice](PRIVACY.md) for full details on what is collected,
how it is stored, and your rights regarding your information — including how
to request access, correction, or deletion of anything you have submitted.

*This project uses a GitHub Pages form connected to a private Google Sheet. No family data is stored in this public repository.*
