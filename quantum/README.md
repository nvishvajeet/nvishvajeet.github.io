# Quantum Science & Technology Group site

A concise static academic site using the same page structure and visual system
as the Photonics Research Group.

## Editing

- `data.js` contains the ordered team list and research areas. Edit the quoted
  values; no HTML is needed for routine profile changes.
- The order of records in `people` is the order shown on the People page.
- `index.html` contains the homepage summary.
- `research.html`, `people.html`, `publications.html`, `course.html`, and
  `contact.html` form the main academic page set.
- `render.js` turns the data into directories, profiles, and publication lists
  and hides missing fields.
- `style.css` imports the shared academic visual system.

No database, CMS, tracker, external framework, separate hierarchy, or
quantum-specific stylesheet is used.

For a form-based editor, the recommended next step is to move the same records
to JSON and configure Pages CMS. Editors would then update names, roles, photos,
biographies, and links in a browser form while Git keeps the history. See
`../docs/GROUP_SITE_OPERATIONS.md`.
