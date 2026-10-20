// Each paper's abstract is pasted into papers-data.js as the LaTeX from the
// paper. texToHtml turns the text-mode LaTeX (paragraphs, \emph, accents,
// dashes, quotes, lists, % comments, \newcommand macros) into HTML and leaves
// every formula for MathJax.

const TEX_ACCENTS = new Map(Object.entries({
  "'": "́", "`": "̀", "^": "̂", "\"": "̈", "~": "̃",
  "=": "̄", ".": "̇", H: "̋", c: "̧", v: "̌",
  u: "̆", k: "̨", r: "̊", d: "̣", b: "̱"
}));
const TEX_SYMBOLS = new Map(Object.entries({
  i: "ı", j: "ȷ", l: "ł", L: "Ł", o: "ø", O: "Ø", ss: "ß", aa: "å", AA: "Å",
  ae: "æ", AE: "Æ", oe: "œ", OE: "Œ", ldots: "…", dots: "…", textellipsis: "…",
  textendash: "–", textemdash: "—", S: "§", TeX: "TeX", LaTeX: "LaTeX",
  quad: " ", qquad: "  ", newline: "<br>"
}));
const TEX_ITALIC = ["<em>", "</em>"];
const TEX_BOLD = ["<strong>", "</strong>"];
const TEX_MONO = ["<code>", "</code>"];
const TEX_PLAIN = ["", ""];
const TEX_WRAPPERS = new Map(Object.entries({
  emph: TEX_ITALIC, textit: TEX_ITALIC, textsl: TEX_ITALIC, textbf: TEX_BOLD,
  texttt: TEX_MONO, textsc: ['<span style="font-variant: small-caps">', "</span>"],
  textrm: TEX_PLAIN, textsf: TEX_PLAIN, textup: TEX_PLAIN, textnormal: TEX_PLAIN,
  text: TEX_PLAIN, mbox: TEX_PLAIN, hbox: TEX_PLAIN
}));
// Old-style switches such as {\em ...} act until the end of their group.
const TEX_SWITCHES = new Map(Object.entries({
  em: TEX_ITALIC, it: TEX_ITALIC, itshape: TEX_ITALIC, sl: TEX_ITALIC,
  bf: TEX_BOLD, bfseries: TEX_BOLD, tt: TEX_MONO, ttfamily: TEX_MONO
}));
// Spacing and line-breaking for the PDF; a web page reflows on its own.
const TEX_IGNORED = new Set([
  "nobreak", "linebreak", "pagebreak", "allowbreak", "newpage", "clearpage",
  "noindent", "indent", "smallskip", "medskip", "bigskip", "hfill", "vfill",
  "centering", "maketitle", "relax", "protect", "xspace", "sloppy", "fussy",
  "normalsize", "small", "footnotesize", "large"
]);
const TEX_IGNORED_WITH_ARG = new Set(["label", "vspace", "hspace", "begin", "end"]);
const TEX_MATH_ENV = /\\begin\{(equation|align|alignat|gather|multline|flalign|eqnarray)(\*?)\}/y;

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Drop % comments with their line end, as TeX does; \% stays.
function texStripComments(s) {
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "\\") {
      out += s.slice(i, i + 2);
      i++;
    } else if (s[i] === "%") {
      while (i < s.length && s[i] !== "\n") i++;
      while (s[i + 1] === " " || s[i + 1] === "\t") i++;
    } else {
      out += s[i];
    }
  }
  return out;
}

// Index of the "}" closing the group that opens at s[i] (s.length if unclosed).
function texGroupEnd(s, i) {
  for (let depth = 0; i < s.length; i++) {
    if (s[i] === "\\") i++;
    else if (s[i] === "{") depth++;
    else if (s[i] === "}" && --depth === 0) return i;
  }
  return s.length;
}

// The argument at s[i]: a {group}, a control sequence or one character.
function texArg(s, i) {
  while (/\s/.test(s[i] || "")) i++;
  if (s[i] === "{") {
    const end = texGroupEnd(s, i);
    return [s.slice(i + 1, end), end + 1];
  }
  const command = /\\([a-zA-Z]+|[\s\S])/y;
  command.lastIndex = i;
  const match = command.exec(s);
  if (match) return [match[0], command.lastIndex];
  return [s[i] || "", i + 1];
}

// The optional [argument] at s[i], or null.
function texOptional(s, i) {
  let j = i;
  while (s[j] === " " || s[j] === "\n") j++;
  if (s[j] !== "[") return [null, i];
  for (let k = j + 1, depth = 0; k < s.length; k++) {
    if (s[k] === "\\") k++;
    else if (s[k] === "{") depth++;
    else if (s[k] === "}") depth--;
    else if (s[k] === "]" && depth === 0) return [s.slice(j + 1, k), k + 1];
  }
  return [null, i];
}

// Move \newcommand, \renewcommand, \def and \DeclareMathOperator out of s into macros.
function texTakeDefinitions(s, macros) {
  const definition = /\\(newcommand|renewcommand|providecommand|DeclareMathOperator|def)(?![a-zA-Z])(\*?)/g;
  let out = "";
  let from = 0;
  let match;
  while ((match = definition.exec(s))) {
    let [name, i] = texArg(s, definition.lastIndex);
    let nargs = 0;
    let optional = null;
    let body;
    if (match[1] === "def") {
      const open = s.indexOf("{", i);
      if (open < 0) break;
      nargs = (s.slice(i, open).match(/#\d/g) || []).length;
      [body, i] = texArg(s, open);
    } else if (match[1] === "DeclareMathOperator") {
      let operator;
      [operator, i] = texArg(s, i);
      body = `\\operatorname${match[2]}{${operator}}`;
    } else {
      let count;
      [count, i] = texOptional(s, i);
      [optional, i] = texOptional(s, i);
      [body, i] = texArg(s, i);
      nargs = Number(count) || 0;
    }
    name = name.trim().replace(/^\\/, "");
    if (/^[a-zA-Z]+$/.test(name)) macros.set(name, { nargs, optional, body });
    out += s.slice(from, match.index);
    from = definition.lastIndex = i;
  }
  return out + s.slice(from);
}

// Join two pieces of TeX without fusing a control word with the letters after it.
function texJoin(left, right) {
  return /\\[a-zA-Z]+$/.test(left) && /^[a-zA-Z]/.test(right) ? `${left} ${right}` : left + right;
}

function texSubstitute(body, args) {
  const parts = body.split(/#(\d)/);
  let out = parts[0];
  for (let k = 1; k < parts.length; k += 2) {
    out = texJoin(texJoin(out, args[parts[k] - 1] || ""), parts[k + 1]);
  }
  return out;
}

// Expand the macros, repeatedly, since one macro may use another.
function texExpand(s, macros) {
  if (macros.size === 0) return s;
  const use = new RegExp(`\\\\(${[...macros.keys()].join("|")})(?![a-zA-Z])`, "g");
  for (let round = 0; round < 20 && use.test(s); round++) {
    use.lastIndex = 0;
    let out = "";
    let from = 0;
    let match;
    while ((match = use.exec(s))) {
      const macro = macros.get(match[1]);
      let i = use.lastIndex;
      const args = [];
      if (macro.optional !== null) {
        const [value, next] = texOptional(s, i);
        args.push(value === null ? macro.optional : value);
        i = next;
      }
      while (args.length < macro.nargs) {
        const [value, next] = texArg(s, i);
        args.push(value);
        i = next;
      }
      out = texJoin(texJoin(out, s.slice(from, match.index)), texSubstitute(macro.body, args));
      from = use.lastIndex = i;
    }
    s = texJoin(out, s.slice(from));
    use.lastIndex = 0;
  }
  return s;
}

// Index just past the formula that starts at s[i], or -1 if none starts there.
function texMathEnd(s, i) {
  let close;
  if (s.startsWith("$$", i)) close = "$$";
  else if (s[i] === "$") close = "$";
  else if (s.startsWith("\\(", i)) close = "\\)";
  else if (s.startsWith("\\[", i)) close = "\\]";
  else {
    TEX_MATH_ENV.lastIndex = i;
    const env = TEX_MATH_ENV.exec(s);
    if (!env) return -1;
    const end = `\\end{${env[1]}${env[2]}}`;
    const at = s.indexOf(end, i);
    return at < 0 ? -1 : at + end.length;
  }
  for (let j = i + close.length; j < s.length; j++) {
    if (s.startsWith(close, j)) return j + close.length;
    if (s[j] === "\\") j++;
  }
  return -1;
}

// Text-mode LaTeX to inline HTML; formulas are kept as they are for MathJax.
function texInline(s) {
  let html = "";
  let i = 0;
  while (i < s.length) {
    const mathEnd = texMathEnd(s, i);
    if (mathEnd > 0) {
      html += escapeHtml(s.slice(i, mathEnd));
      i = mathEnd;
      continue;
    }
    const ch = s[i];
    if (ch === "\\") {
      const command = /\\([a-zA-Z]+|[\s\S]?)/y;
      command.lastIndex = i;
      const name = command.exec(s)[1];
      let j = command.lastIndex;
      let afterSpaces = j;
      if (/^[a-zA-Z]/.test(name)) while (/\s/.test(s[afterSpaces] || "")) afterSpaces++;

      if (TEX_ACCENTS.has(name)) {
        const [arg, next] = texArg(s, j);
        const base = texInline(arg).replace(/^ı/, "i").replace(/^ȷ/, "j");
        html += (base.charAt(0) + TEX_ACCENTS.get(name) + base.slice(1)).normalize("NFC");
        i = next;
      } else if (TEX_SYMBOLS.has(name)) {
        html += TEX_SYMBOLS.get(name);
        i = afterSpaces;
      } else if (TEX_WRAPPERS.has(name)) {
        const [arg, next] = texArg(s, j);
        const [open, close] = TEX_WRAPPERS.get(name);
        html += open + texInline(arg) + close;
        i = next;
      } else if (TEX_SWITCHES.has(name)) {
        const [open, close] = TEX_SWITCHES.get(name);
        return html + open + texInline(s.slice(afterSpaces)) + close;
      } else if (TEX_IGNORED.has(name)) {
        i = texOptional(s, afterSpaces)[1];
      } else if (TEX_IGNORED_WITH_ARG.has(name)) {
        if (s[j] === "*") j++;
        i = texArg(s, texOptional(s, j)[1])[1];
      } else if (name === "url" || name === "href") {
        const [url, next] = texArg(s, j);
        const [text, end] = name === "href" ? texArg(s, next) : [null, next];
        html += `<a href="${escapeHtml(url)}">${text === null ? escapeHtml(url) : texInline(text)}</a>`;
        i = end;
      } else if (name === "cite") {
        const [keys, next] = texArg(s, texOptional(s, j)[1]);
        html += `[${escapeHtml(keys)}]`;
        i = next;
      } else if (name === "\\") {
        if (s[j] === "*") j++;
        html += "<br>";
        i = texOptional(s, j)[1];
      } else if (/^[a-zA-Z]/.test(name)) {
        // Unknown: leave it visible, with its argument, so it is easy to spot.
        console.warn(`Abstract: unknown TeX command \\${name}; define it with \\newcommand at the top of the abstract.`);
        const end = s[j] === "{" ? texGroupEnd(s, j) + 1 : j;
        html += escapeHtml(s.slice(i, end));
        i = end;
      } else {
        if (name === "$") html += "\\$";
        else if (name === ",") html += " ";
        else if (name !== "" && " \n\t;:".includes(name)) html += " ";
        else if (name !== "" && !"!@/-".includes(name)) html += escapeHtml(name);
        i = j;
      }
    } else if (ch === "{") {
      const end = texGroupEnd(s, i);
      html += texInline(s.slice(i + 1, end));
      i = end + 1;
    } else {
      const text = [["---", "—"], ["--", "–"], ["``", "“"], ["''", "”"], ["`", "‘"], ["'", "’"], ["~", "&nbsp;"], ["}", ""]]
        .find(([tex]) => s.startsWith(tex, i));
      if (text) {
        html += text[1];
        i += text[0].length;
      } else {
        html += /\s/.test(ch) ? " " : escapeHtml(ch);
        i++;
      }
    }
  }
  return html;
}

function texParagraphs(s) {
  return s.split(/\n[ \t]*\n/)
    .map((paragraph) => texInline(paragraph).trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function texList(type, body) {
  const item = /\\(begin|end)\{(?:itemize|enumerate|description)\}|\\item(?![a-zA-Z])/g;
  const items = [];
  let depth = 0;
  let from = -1;
  let match;
  while ((match = item.exec(body))) {
    if (match[1] === "begin") depth++;
    else if (match[1] === "end") depth--;
    else if (depth === 0) {
      if (from >= 0) items.push(body.slice(from, match.index));
      from = item.lastIndex;
    }
  }
  if (from >= 0) items.push(body.slice(from));
  const tag = type === "enumerate" ? "ol" : "ul";
  const html = items.map((text) => {
    const [label, at] = texOptional(text, 0);
    const rest = text.slice(at);
    const content = /\n[ \t]*\n|\\begin\{(itemize|enumerate|description)\}/.test(rest)
      ? texBlocks(rest)
      : texInline(rest).trim();
    return `<li>${label === null ? "" : `<strong>${texInline(label)}</strong> `}${content}</li>`;
  }).join("");
  return `<${tag}>${html}</${tag}>`;
}

// Paragraphs and (possibly nested) itemize, enumerate and description lists.
function texBlocks(s) {
  let html = "";
  let depth = 0;
  let from = 0;
  let start = 0;
  let type = "";
  let match;
  const list = /\\(begin|end)\{(itemize|enumerate|description)\}/g;
  while ((match = list.exec(s))) {
    if (match[1] === "begin") {
      if (depth++ === 0) {
        html += texParagraphs(s.slice(from, match.index));
        start = list.lastIndex;
        type = match[2];
      }
    } else if (depth > 0 && --depth === 0) {
      html += texList(type, s.slice(start, match.index));
      from = list.lastIndex;
    }
  }
  return html + texParagraphs(s.slice(from));
}

function texToHtml(tex) {
  let s = texStripComments(tex.replace(/\r\n?/g, "\n"));
  s = s.replace(/\\begin\{comment\}[\s\S]*?\\end\{comment\}/g, "");
  const macros = new Map();
  s = texTakeDefinitions(s, macros);
  const abstract = /\\begin\{abstract\}([\s\S]*?)\\end\{abstract\}/.exec(s);
  if (abstract) s = abstract[1];
  s = texExpand(s, macros).replace(/\\par(?![a-zA-Z])/g, "\n\n");
  return texBlocks(s);
}

function getPaperBySlug() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  if (!slug || !window.PAPERS) return null;
  return window.PAPERS.find((paper) => paper.slug === slug) || null;
}

function formatAuthor(author) {
  if (author.url) {
    return `<a href="${author.url}">${author.name}</a>`;
  }
  return author.name;
}

function formatBadge(conference) {
  const text = [conference.short, conference.year].filter(Boolean).join(" ");
  if (!text) return "";
  if (!conference.url) return `<span class="conf-badge">${text}</span>`;
  return `<a class="conf-badge" href="${conference.url}">${text}</a>`;
}

// Queue typesetting behind MathJax's startup and any earlier typesetting.
function typesetMath(root) {
  const mathJax = window.MathJax;
  if (!mathJax || !mathJax.startup || !mathJax.startup.promise) return;
  mathJax.startup.promise = mathJax.startup.promise
    .then(() => mathJax.typesetPromise([root]))
    .catch(() => {});
}

// The abstract sits in a /* ... */ block inside a function in papers-data.js.
// Unlike a string, a comment keeps the TeX exactly as pasted (backslashes,
// backticks, line breaks); only */ can end it. Read it back from the source.
function abstractTex(paper) {
  const source = String(paper.abstract || "");
  const start = source.indexOf("/*");
  const end = source.lastIndexOf("*/");
  return start >= 0 && end > start ? source.slice(start + 2, end) : source;
}

function renderPaperPage() {
  const container = document.getElementById("paper-content");
  const paper = getPaperBySlug();

  if (!container) return;

  if (!paper) {
    document.title = "Paper Not Found — Vishvajeet N";
    container.innerHTML = `
      <div class="page-header">
        <h2 class="page-title">Paper not found</h2>
      </div>
      <p><a href="research.html">Back to Research</a></p>
    `;
    return;
  }

  document.title = `${paper.title} — Vishvajeet N`;

  const conference = paper.conference || {};
  const resources = paper.resources || {};
  const linkSpecs = [
    { key: "conferenceVersionPdf", label: "Conference version PDF" },
    { key: "fullVersionPdf", label: "Full version PDF" },
    { key: "talkSlidesPdf", label: "Talk slides PDF" },
    { key: "talkVideo", label: "Talk Video" }
  ];
  const linksHtml = linkSpecs
    .filter((item) => resources[item.key])
    .map((item) => `<a class="resource-link" href="${resources[item.key]}">${item.label}</a>`)
    .join(" <span class=\"resource-sep\" aria-hidden=\"true\">|</span> ");
  const abstractHtml = texToHtml(abstractTex(paper));

  container.innerHTML = `
    <div class="page-header with-back-link">
      <p class="back-link"><a href="research.html">Back to Research</a></p>
      <h2 class="page-title">${paper.title}</h2>
    </div>

    <div class="paper-meta">
      <p><b>Authors:</b> ${paper.authors.map(formatAuthor).join(", ")}</p>
      <p>
        <b>Conference:</b>
        ${conference.full || ""}
        ${formatBadge(conference)}
      </p>
      ${conference.location ? `<p><b>Location:</b> ${conference.location}</p>` : ""}
      ${linksHtml ? `<p><b>Resources:</b> <span class="resource-links">${linksHtml}</span></p>` : ""}
    </div>

    ${abstractHtml ? `<h3>Abstract</h3>${abstractHtml}` : ""}
  `;
  typesetMath(container);
}

document.addEventListener("DOMContentLoaded", renderPaperPage);
