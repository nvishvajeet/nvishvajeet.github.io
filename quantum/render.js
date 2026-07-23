(function () {
  "use strict";

  const group = window.QUANTUM_GROUP || { people: [], researchAreas: [] };
  const peopleLabels = {
    faculty: "Faculty",
    "postdoctoral-researcher": "Postdoctoral researcher",
    "doctoral-researcher": "PhD scholar",
    student: "Student",
    "technical-staff": "Technical staff"
  };

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      "\"": "&quot;"
    })[character]);
  }

  function safeUrl(value) {
    if (typeof value !== "string" || value.trim() === "") return "";
    try {
      const url = new URL(value.trim(), window.location.href);
      return ["https:", "http:"].includes(url.protocol) ? url.href : "";
    } catch (_error) {
      return "";
    }
  }

  function initials(name) {
    const ignored = new Set(["dr", "prof", "mr", "mrs", "ms"]);
    return String(name).replace(/[.]/g, "").split(/\s+/)
      .filter((part) => part && !ignored.has(part.toLowerCase()))
      .slice(0, 2).map((part) => part[0].toUpperCase()).join("");
  }

  function portrait(person, modifier = "") {
    const photo = safeUrl(person.photo);
    if (photo) {
      return `<img class="member-portrait ${modifier}" src="${escapeHtml(photo)}" alt="${escapeHtml(person.name)}" loading="lazy">`;
    }
    return `<div class="member-portrait portrait-placeholder ${modifier}" aria-hidden="true"><span>${escapeHtml(initials(person.name))}</span></div>`;
  }

  function personCard(person) {
    const interests = (person.interests || []).slice(0, 3);
    return `<article class="person-card">
      <a class="portrait-link" href="member.html?id=${encodeURIComponent(person.id)}" aria-label="View ${escapeHtml(person.name)}'s profile">${portrait(person)}</a>
      <div class="person-card-body">
        <span class="member-flair">${escapeHtml(peopleLabels[person.memberType] || "Group member")}</span>
        <p class="person-role">${escapeHtml(person.groupRole)}</p>
        <h3><a href="member.html?id=${encodeURIComponent(person.id)}">${escapeHtml(person.name)}</a></h3>
        <p class="person-designation">${escapeHtml(person.designation)} · ${escapeHtml(person.affiliation)}</p>
        <div class="tag-row">${interests.map((interest) => `<span>${escapeHtml(interest)}</span>`).join("")}</div>
        <a class="card-link" href="member.html?id=${encodeURIComponent(person.id)}">View profile →</a>
      </div>
    </article>`;
  }

  function researchCard(area) {
    return `<article class="theme-card">
      <span class="theme-number">${escapeHtml(area.number)}</span>
      <h3>${escapeHtml(area.title)}</h3>
      <p>${escapeHtml(area.summary)}</p>
    </article>`;
  }

  function renderResearch() {
    const summaryTarget = document.getElementById("research-areas");
    if (summaryTarget) {
      summaryTarget.innerHTML = group.researchAreas.map(researchCard).join("");
    }
    const listTarget = document.getElementById("research-list");
    if (listTarget) {
      listTarget.innerHTML = group.researchAreas.map((area) => `
        <article class="research-block">
          <div class="research-index">${escapeHtml(area.number)}</div>
          <div class="research-copy">
            <h2>${escapeHtml(area.title)}</h2>
            <p>${escapeHtml(area.summary)}</p>
            <ul class="topic-list topic-list-wide">${(area.topics || []).map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}</ul>
          </div>
        </article>`).join("");
    }
  }

  function renderFeaturedMembers() {
    const target = document.getElementById("featured-members");
    if (target) target.innerHTML = group.people.slice(0, 3).map(personCard).join("");
  }

  function renderPeople() {
    const target = document.getElementById("people-list");
    if (!target) return;
    target.innerHTML = group.people.map(personCard).join("");
    const count = document.getElementById("people-count");
    if (count) count.textContent = `${group.people.length} ${group.people.length === 1 ? "member" : "members"}`;
  }

  const linkLabels = {
    website: "Website",
    profile: "Official profile",
    research: "Research profile",
    scholar: "Google Scholar",
    scopus: "Scopus",
    orcid: "ORCID",
    dblp: "DBLP",
    publication: "Selected publication"
  };

  const linkIcons = {
    website: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.7 5.7 3.7 9S14.5 18.3 12 21c-2.5-2.7-3.7-5.7-3.7-9S9.5 5.7 12 3Z"/></svg>`,
    profile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21c.7-4.2 3.2-6.3 7.5-6.3s6.8 2.1 7.5 6.3"/></svg>`,
    research: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 3h6M10 3v6l-5.2 9A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-3L14 9V3"/><path d="M7.2 16h9.6"/></svg>`,
    scholar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12.2V17c2.8 2.2 7.2 2.2 10 0v-4.8M21 9v6"/></svg>`,
    scopus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>`,
    orcid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="8" r=".8" fill="currentColor" stroke="none"/><path d="M9 11v6M12 17v-6h1.5c2 0 3.5 1.1 3.5 3s-1.5 3-3.5 3H12Z"/></svg>`,
    dblp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 5h6v14H5zM13 8h6v11h-6z"/></svg>`,
    publication: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/></svg>`
  };

  function profileLinks(person) {
    return Object.entries(person.links || {}).map(([key, value]) => {
      const href = safeUrl(value);
      if (!href || !linkLabels[key]) return "";
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${linkIcons[key] || linkIcons.website}<span>${escapeHtml(linkLabels[key])}</span></a>`;
    }).join("");
  }

  function publicationItem(publication) {
    if (typeof publication === "string") return `<li>${escapeHtml(publication)}</li>`;
    const href = safeUrl(publication?.url || "");
    const title = escapeHtml(publication?.title || "");
    const citation = publication?.citation
      ? `<span class="publication-meta">${escapeHtml(publication.citation)}</span>`
      : "";
    return `<li>${href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${title}</a>` : title}${citation}</li>`;
  }

  function publicationList(items, className = "publication-list") {
    if (!Array.isArray(items) || items.length === 0) return "";
    return `<ol class="${className}">${items.map(publicationItem).join("")}</ol>`;
  }

  function section(title, content) {
    if (!content) return "";
    return `<section class="profile-section"><h2>${escapeHtml(title)}</h2>${content}</section>`;
  }

  function renderMember() {
    const target = document.getElementById("member-profile");
    if (!target) return;
    const id = new URLSearchParams(window.location.search).get("id");
    const person = group.people.find((item) => item.id === id);
    if (!person) {
      target.innerHTML = `<section class="section"><div class="shell empty-state"><p class="eyebrow">Profile not found</p><h1>We could not find that group member.</h1><a class="button button-primary" href="people.html">Return to people</a></div></section>`;
      return;
    }

    document.title = `${person.name} · Quantum Science & Technology Group · MIT-WPU`;
    const links = profileLinks(person);
    target.innerHTML = `<section class="profile-hero"><div class="shell profile-hero-grid">
      <div>${portrait(person, "member-portrait-large")}</div>
      <div class="profile-intro"><p class="eyebrow">${escapeHtml(person.groupRole)}</p><h1>${escapeHtml(person.name)}</h1>
        <p class="profile-designation">${escapeHtml(person.designation)}<br>${escapeHtml(person.affiliation)}</p>
        ${person.email ? `<a class="email-link" href="mailto:${escapeHtml(person.email)}">${escapeHtml(person.email)}</a>` : ""}
        ${links ? `<div class="profile-link-row">${links}</div>` : ""}
      </div></div></section>
      <section class="section profile-content-section"><div class="shell profile-layout profile-layout-simple">
        <div class="profile-details">
          ${section("Profile", person.bio ? `<p class="profile-bio">${escapeHtml(person.bio)}</p>` : "")}
          ${section("Research interests", `<div class="tag-row tag-row-large">${(person.interests || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`)}
          ${section("Selected background", `<ul class="detail-list">${(person.highlights || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`)}
          ${section(person.publicationHeading || "Selected publications", publicationList(person.publications))}
        </div>
      </div></section>`;
  }

  function renderPublications() {
    const target = document.getElementById("publications-list");
    if (!target) return;
    target.innerHTML = group.people
      .filter((person) => (person.publications || []).length)
      .map((person) => `<section class="publication-group">
        <div class="publication-person">
          <p class="eyebrow">${escapeHtml(person.publicationHeading || "Selected publications")}</p>
          <h2><a href="member.html?id=${encodeURIComponent(person.id)}">${escapeHtml(person.name)}</a></h2>
          <div class="profile-link-row">${profileLinks(person)}</div>
        </div>
        ${publicationList(person.publications, "publication-list numbered")}
      </section>`).join("");
  }

  function renderContacts() {
    const target = document.getElementById("contact-list");
    if (!target) return;
    const contacts = group.people.filter((person) => person.email);
    target.innerHTML = contacts.map((person) => `<article class="contact-person">
      <div class="contact-avatar" aria-hidden="true">${escapeHtml(initials(person.name))}</div>
      <div>
        <h3><a href="member.html?id=${encodeURIComponent(person.id)}">${escapeHtml(person.name)}</a></h3>
        <p>${escapeHtml(person.groupRole)} · ${escapeHtml(person.designation)}</p>
        <a href="mailto:${escapeHtml(person.email)}">${escapeHtml(person.email)}</a>
      </div>
    </article>`).join("");
  }

  function initialize() {
    const active = document.body.dataset.page;
    const activeLink = document.querySelector(`[data-nav="${active}"]`);
    if (activeLink) activeLink.setAttribute("aria-current", "page");
    document.querySelectorAll("[data-current-year]").forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
    renderResearch();
    renderFeaturedMembers();
    renderPeople();
    renderMember();
    renderPublications();
    renderContacts();
    if (window.location.hash) {
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (target) {
        window.requestAnimationFrame(() => {
          target.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start"
          });
        });
      }
    }
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
