# Photonics Research Group demo

This folder is a standalone static prototype for the MIT-WPU Photonics
Research Group. It does not change the design or navigation of the personal
site that hosts it.

The first version intentionally presents only the three submitted faculty,
three shared research themes, concise profiles, selected publications, and
contact links. More sections can be added later without redesigning the site.

## What humans edit

- `members-data.js` contains member profiles. Each member is one clearly
  labelled record. Copy an existing record to add a person.
- `site-data.js` contains the shared research themes.
- The HTML files define the pages. They normally do not need to change when
  a member, publication, award, or research interest changes.

Blank optional values such as `photo`, `orcid`, `linkedin`, or `cv` are hidden
automatically. Until a photo is supplied, the site shows an initials-based
placeholder.

## Safe update workflow

1. A member submits or updates the profile spreadsheet/form.
2. A group editor checks the content and marks it approved.
3. The editor changes the matching record in `members-data.js` using GitHub's
   web editor and opens a pull request.
4. The PI or site administrator reviews and merges the pull request.
5. GitHub Pages publishes the change automatically.

For many groups, steps 2–5 should be automated: an approved row in a central
form/sheet becomes a validated data record, automation opens a pull request,
and the designated group administrator approves it.

## Prototype safeguards

- Every page is marked `noindex` while it is a prototype.
- A visible prototype banner is shown on every page.
- There are no external frameworks, trackers, databases, or CMS plugins.
- Submitted content is escaped before rendering.
