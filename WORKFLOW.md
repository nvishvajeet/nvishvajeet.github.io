# nvishvajeet.github.io — Agent Workflow

> **This laptop is an operating system for AI agents.** Kernel + user
> space + audit log. Rules are hierarchical, non-contradictory, and
> optimized for token economy.
>
> **Level 1 — Kernel (global, auto-loaded):** `~/.claude/CLAUDE.md`.
> Central-git topology, commit rhythm, SSH key, ai-log rules,
> permission posture, cross-project auto-tasks. Pre-loaded at
> session start. Do NOT re-read it when this file is present.
>
> **Level 2 — User space (this file):** rules specific to the
> personal Jekyll-based academic website published at
> `https://nvishvajeet.github.io`.
>
> **Conflict resolution:** Level 1 infrastructure invariants are
> absolute. Level 1 routine defaults may be narrowed by this file
> for this project only. Safety rules outrank both levels.

---

## 1. What this project is

Personal academic website and CV host. Jekyll-based (see
`_config.yml`, `_layouts/`), static HTML + CSS + JS, served from
the `main` branch of `github.com/nvishvajeet/nvishvajeet.github.io`
via GitHub Pages.

Entry points: `index.html` (home), `cv.html` (CV + linked PDF),
`paper.html` + `paper-render.js` (dynamic paper listings),
`i.html` (interests / side projects).

## 2. Topology — Class A carve-out (no LOCAL bare; `origin` IS GitHub)

**Class A carve-out** *(per `~/.claude/GIT_TOPOLOGY.md`)*. This is the
only repo on the laptop where `origin` points directly at GitHub.
There is NO LOCAL bare in `~/.claude/git-server/` — by design,
because a bare in the middle would just drift from the Pages-rendered
HEAD on GitHub.

| Thing | Path |
|---|---|
| Working copy | `~/Projects/nvishvajeet.github.io/` *(moved from `~/nvishvajeet.github.io/` on 2026-04-11; into `~/Projects/` 2026-06-04)* |
| Default branch | `main` |
| `origin` | `https://github.com/nvishvajeet/nvishvajeet.github.io.git` (Public; GitHub Pages serves `main`) |
| LOCAL bare | **none** *(intentional; carve-out)* |
| Mini | no role; mini does not serve this site |

### Push rules

1. **`git push origin main` IS the publish action.** Origin is
   GitHub. There is no "stage in LOCAL first" — every push reaches
   the public site (after the ~1-2 min Pages rebuild).
2. **The canonical helper handles this correctly:**
   ```bash
   ~/.claude/bin/git-sync-canonical
   ```
   It detects the carve-out class and pushes to `origin` only.
3. **GitHub Pages rebuild time is ~1-2 minutes.** Don't re-push to
   work around perceived lag; check Actions for the build status.
4. **Branch protection is enabled** on `main` (force-push and
   deletion blocked; see `~/.claude/GITHUB_REPO_SETTINGS_AUDIT_2026_06_04.md`).
5. **Pre-commit hook** is canonical (`~/.claude/bin/pre-commit-secret-scan.sh`).
   It blocks committing SSH keys, API tokens, and other secret
   patterns. The hook also dispatches to `.git-hooks/pre-commit-*`
   if any project-specific gates are added.

### Publish recipe

```bash
~/.claude/bin/git-sync-canonical     # canonical
# or, equivalent:
git push origin main                 # also fine since origin IS GitHub
```

## 3. Project-specific rules

### 3.1  Pre-commit gate

No Jekyll build on the laptop by default (the GitHub Pages runner
is the source of truth for the rendered output). Local gates:

```bash
# HTML validity spot-check for any .html file you edited
# (optional — Jekyll errors are caught by the Pages runner)
xmllint --html --noout index.html 2>&1 | grep -v '^$' || true
```

**For any edit to `_config.yml`, `_layouts/*.html`, or any file
referenced from a layout:** render mentally what happens on the
home page + CV page and make sure nothing obviously breaks. If you
are unsure, commit to LOCAL only (skip the GitHub push) and let the
user preview via `jekyll serve` before publishing.

**For edits to just one content file (e.g. `i.html` paragraph
change, typo fix in `index.html`):** a visual review of the diff is
the gate. Ship it.

### 3.2  Hard vs soft attributes

**Hard — do not touch without explicit user approval:**

- `_config.yml` — site title, author, base URL, the Jekyll config
- `_layouts/` — the page templates. Every content page depends on
  them; layout edits need "does this break every page" thinking.
- CV PDF filename pattern `0-VishvajeetN-CV-<month>-<year>.pdf` —
  do not rename; the CV button in `cv.html` hard-links to it
- Paper PDFs in the root (`1-stoc2021-poster-paper408.pdf`, etc.)
  — these are referenced by `paper.html` / `paper-render.js`
- The custom dark-mode JS in `darkmode.js` — it fixes a FOUC
  (flash of unstyled content) and is fragile

**Soft — fair game:**

- Prose content in `index.html`, `cv.html`, `i.html`, `paper.html`
- Styling tweaks in the existing CSS
- Adding a new blog post / page (additive only)
- `README.md` (if you add one — currently there isn't one and
  that's fine; a personal site README is not load-bearing)

### 3.3  Publishing / deploying

See §2 push rules. The GitHub remote IS the deploy target because
GitHub Pages renders and serves from it. The LOCAL bare is the
canonical source of truth (hook mirrors to the mini as warm
backup).

**Never force-push `github`/`main`.** GitHub Pages may rebuild from
a force-push but the result is unpredictable and the commit history
on github.com is public.

### 3.4  Domain-specific invariants

- **Never replace `0-profileimg.JPG` without backing up the
  previous version.** It is referenced from multiple pages.
- **CV PDF is replaced as a unit, not edited.** When the CV needs
  updating: drop the new PDF in alongside the old one with the new
  date-suffixed name, update the link in `cv.html`, commit both in
  one commit, push to LOCAL, and only then push to `github`.
- **No analytics / tracking scripts.** The site explicitly dropped
  dead UA analytics in commit `1065159` — do not add new ones
  without explicit user approval.
- **Never touch `_posts/` unless explicitly told to.** Posts are
  dated content the user authors.

### 3.5  Files and folders to leave alone

| Path | Why |
|---|---|
| `_config.yml` | Site-wide Jekyll config (hard) |
| `_layouts/` | Page templates (hard) |
| `_posts/` | User-authored dated content |
| `0-VishvajeetN-CV-*.pdf` | CV PDF, replaced as a unit |
| `1-*.pdf`, `2-*.pdf`, `3-*.pdf` | Paper / talk PDFs, referenced from `paper.html` |
| `darkmode.js` | FOUC fix, fragile |

### 3.6  Edit + publish recipe

```bash
cd ~/Projects/nvishvajeet.github.io
git pull origin                        # LOCAL first
git pull github main                   # and the GitHub side, to catch
                                       # any tweaks made via web UI

# ... edit content ...

git add -p
git commit -m "<imperative subject ≤ 70 chars>"
git push origin main                   # always

# Only if explicitly publishing:
git push github main                   # triggers GitHub Pages rebuild (~1-2 min)
```

## 4. Docs-in-this-repo manifest

No README.md yet. This WORKFLOW.md is the only doc. If a README
gets added later, it should be a one-screen summary of the site's
purpose and a pointer to this file for rules.

| File | Role | Read when... |
|---|---|---|
| `_config.yml` | Jekyll site config | Before touching layouts, base URL, or plugins |
| `_layouts/default.html` (+ any siblings) | The page template every page inherits | Before editing anything structural |
| `cv.html` | CV page with PDF link | Before replacing the CV PDF |
| `paper.html` + `paper-render.js` | Dynamic paper listings | When adding a paper or talk |

## 5. Change log (of this workflow file)

- **2026-04-11** — Initial WORKFLOW.md created as part of the
  two-level agent operating system rollout. Project onboarded onto
  the LOCAL central git on the same day: moved from
  `~/nvishvajeet.github.io/` to `~/Projects/nvishvajeet.github.io/`,
  renamed existing `origin` (GitHub HTTPS) to `github`, added LOCAL
  bare at `~/.claude/git-server/nvishvajeet.github.io.git` as the
  new `origin`, mirror bare at
  `prism-mini:~/git/nvishvajeet.github.io.git`. Two-tier topology
  is now live: `origin` = LOCAL canonical, `github` = GLOBAL
  publish target.
