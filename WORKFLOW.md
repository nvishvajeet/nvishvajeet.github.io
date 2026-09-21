# nvishvajeet.github.io — Level-2 workflow

Personal academic site, served by GitHub Pages at `vishvajeetn.org`.

- **A push to `main` is public within two minutes**, and the repository is
  public too. Nothing private or internal goes in it. A file without front
  matter is copied to the site as it is; list internal files under `exclude:`
  in `_config.yml`.
- **Ask before editing** `_config.yml`, `_layouts/default.html` (six pages
  render through it) or `darkmode.js` (loaded by the layout; fragile).
- **Never rename the PDFs or `0-profileimg.JPG`.** They are linked by name
  from `cv.html`, `papers-data.js`, `index.html` and `sitemap.xml`. A new CV
  is a new file, with `cv.html` and `sitemap.xml` updated in the same commit.
- **No analytics or tracking scripts.**
