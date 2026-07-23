# Quantum Science & Technology Group demo

A concise static prototype using the same HTML structure and stylesheet as the
Photonics Research Group demo.

## Editing

- `data.js` contains the ordered team list and research areas. Edit the quoted
  values; no HTML is needed for routine profile changes.
- The order of records in `people` is the order shown on the People page.
- `index.html` contains the short homepage and course wording.
- `people.html` and `member.html` use the shared Photonics templates.
- `render.js` turns the data into cards and profiles and hides missing fields.

No database, CMS, tracker, external framework, separate hierarchy, or
quantum-specific stylesheet is used.

For a form-based editor, the recommended next step is to move the same records
to JSON and configure Pages CMS. Editors would then update names, roles, photos,
biographies, and links in a browser form while Git keeps the history. See
`../docs/GROUP_SITE_OPERATIONS.md`.
