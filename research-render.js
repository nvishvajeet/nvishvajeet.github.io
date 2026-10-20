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

function typesetMath(root) {
  if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
    window.MathJax.typesetPromise([root]).catch(() => {});
  }
}

function renderResearchList() {
  const list = document.getElementById("papers-list");
  if (!list || !window.PAPERS) return;
  list.classList.add("papers-list-fade");

  const html = window.PAPERS.map((paper) => {
    const conference = paper.conference;
    return `
      <div class="paper">
        <div class="paper-title">
          <a href="paper.html?slug=${encodeURIComponent(paper.slug)}">${paper.title}</a>
        </div>
        <div class="paper-authors">
          ${paper.authors.map(formatAuthor).join(", ")}
        </div>
        <div class="paper-conf">
          ${conference.full}
          ${formatBadge(conference)}
        </div>
        ${conference.location ? `<div>${conference.location}</div>` : ""}
      </div>
    `;
  }).join("");

  list.innerHTML = html;
  typesetMath(list);
  requestAnimationFrame(() => {
    list.classList.add("is-visible");
  });
}

document.addEventListener("DOMContentLoaded", renderResearchList);
