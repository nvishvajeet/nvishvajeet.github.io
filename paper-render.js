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

function typesetMath(root) {
  if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
    window.MathJax.typesetPromise([root]).catch(() => {});
  }
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

  const abstractHtml = Array.isArray(paper.abstractParagraphs)
    ? paper.abstractParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")
    : `<p>${paper.abstract || ""}</p>`;

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

  container.innerHTML = `
    <div class="page-header with-back-link">
      <p class="back-link"><a href="research.html">Back to Research</a></p>
      <h2 class="page-title">${paper.title}</h2>
    </div>

    <div class="paper-meta">
      <p><b>Authors:</b> ${paper.authors.map(formatAuthor).join(", ")}</p>
      <p>
        <b>Conference:</b>
        ${paper.conference.full}
        <a class="conf-badge" href="${paper.conference.url}">${paper.conference.short} ${paper.conference.year}</a>
      </p>
      <p><b>Location:</b> ${paper.conference.location}</p>
      ${linksHtml ? `<p><b>Resources:</b> <span class="resource-links">${linksHtml}</span></p>` : ""}
    </div>

    <h3>Abstract</h3>
    ${abstractHtml}
  `;
  typesetMath(container);
}

document.addEventListener("DOMContentLoaded", renderPaperPage);
