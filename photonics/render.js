(function () {
  "use strict";

  const members = Array.isArray(window.PHOTONICS_MEMBERS) ? window.PHOTONICS_MEMBERS : [];
  const site = window.PHOTONICS_SITE || { researchThemes: [] };

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
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
    } catch (_error) {
      return "";
    }
  }

  function initials(name) {
    const ignored = new Set(["dr", "prof", "mr", "ms", "mrs"]);
    return String(name)
      .replace(/[.]/g, "")
      .split(/\s+/)
      .filter((part) => part && !ignored.has(part.toLowerCase()))
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  }

  function portrait(member, modifier = "") {
    const photo = safeUrl(member.photo);
    if (photo) {
      return `<img class="member-portrait ${modifier}" src="${escapeHtml(photo)}" alt="${escapeHtml(member.name)}" loading="lazy">`;
    }
    return `<div class="member-portrait portrait-placeholder ${modifier}" aria-hidden="true"><span>${escapeHtml(initials(member.name))}</span></div>`;
  }

  function list(items, className = "detail-list") {
    if (!Array.isArray(items) || items.length === 0) return "";
    return `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function memberCard(member) {
    const interests = (member.researchInterests || []).slice(0, 3);
    return `
      <article class="person-card">
        <a class="portrait-link" href="member.html?id=${encodeURIComponent(member.id)}" aria-label="View ${escapeHtml(member.name)}'s profile">
          ${portrait(member)}
        </a>
        <div class="person-card-body">
          <p class="person-role">${escapeHtml(member.role)}</p>
          <h3><a href="member.html?id=${encodeURIComponent(member.id)}">${escapeHtml(member.name)}</a></h3>
          <p class="person-designation">${escapeHtml(member.designation)}</p>
          <div class="tag-row">${interests.map((interest) => `<span>${escapeHtml(interest)}</span>`).join("")}</div>
          <a class="card-link" href="member.html?id=${encodeURIComponent(member.id)}">View profile <span aria-hidden="true">→</span></a>
        </div>
      </article>`;
  }

  function renderPeople() {
    const target = document.getElementById("people-list");
    if (!target) return;
    target.innerHTML = members.map(memberCard).join("");
    const count = document.getElementById("people-count");
    if (count) count.textContent = `${members.length} ${members.length === 1 ? "member" : "members"}`;
  }

  function renderFeaturedMembers() {
    const target = document.getElementById("featured-members");
    if (!target) return;
    target.innerHTML = members.slice(0, 3).map(memberCard).join("");
  }

  function researchThemeCard(theme) {
    return `
      <article class="theme-card">
        <span class="theme-number">${escapeHtml(theme.number)}</span>
        <h3>${escapeHtml(theme.title)}</h3>
        <p>${escapeHtml(theme.summary)}</p>
        ${list(theme.topics, "topic-list")}
      </article>`;
  }

  function renderHomeResearch() {
    const target = document.getElementById("home-research");
    if (!target) return;
    target.innerHTML = (site.researchThemes || []).map(researchThemeCard).join("");
  }

  function renderResearch() {
    const target = document.getElementById("research-list");
    if (!target) return;
    target.innerHTML = (site.researchThemes || []).map((theme) => `
      <article class="research-block">
        <div class="research-index">${escapeHtml(theme.number)}</div>
        <div class="research-copy">
          <h2>${escapeHtml(theme.title)}</h2>
          <p>${escapeHtml(theme.summary)}</p>
          ${list(theme.topics, "topic-list topic-list-wide")}
        </div>
      </article>`).join("");
  }

  const profileLabels = {
    scholar: "Google Scholar",
    scopus: "Scopus",
    orcid: "ORCID",
    linkedin: "LinkedIn",
    cv: "CV"
  };

  function academicLinks(member) {
    return Object.entries(member.links || {})
      .map(([key, value]) => {
        const href = safeUrl(value);
        if (!href || !profileLabels[key]) return "";
        return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(profileLabels[key])}<span aria-hidden="true">↗</span></a>`;
      })
      .join("");
  }

  function detailSection(title, content) {
    if (!content) return "";
    return `<section class="profile-section"><h2>${escapeHtml(title)}</h2>${content}</section>`;
  }

  function renderMember() {
    const target = document.getElementById("member-profile");
    if (!target) return;
    const id = new URLSearchParams(window.location.search).get("id");
    const member = members.find((item) => item.id === id);

    if (!member) {
      target.innerHTML = `<section class="section"><div class="shell empty-state"><p class="eyebrow">Profile not found</p><h1>We could not find that group member.</h1><a class="button button-primary" href="people.html">Return to people</a></div></section>`;
      return;
    }

    document.title = `${member.name} · Photonics Research Group · MIT-WPU`;
    const links = academicLinks(member);
    target.innerHTML = `
      <section class="profile-hero">
        <div class="shell profile-hero-grid">
          <div>${portrait(member, "member-portrait-large")}</div>
          <div class="profile-intro">
            <p class="eyebrow">${escapeHtml(member.role)}</p>
            <h1>${escapeHtml(member.name)}</h1>
            <p class="profile-designation">${escapeHtml(member.designation)}<br>${escapeHtml(member.institution)}</p>
            <a class="email-link" href="mailto:${escapeHtml(member.email)}">${escapeHtml(member.email)}</a>
            ${links ? `<div class="profile-link-row">${links}</div>` : ""}
          </div>
        </div>
      </section>
      <section class="section profile-content-section">
        <div class="shell profile-layout">
          <aside class="profile-quote"><blockquote>“${escapeHtml(member.quote)}”</blockquote></aside>
          <div class="profile-details">
            ${detailSection("Research interests", `<div class="tag-row tag-row-large">${(member.researchInterests || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`)}
            ${detailSection("Education", list(member.education))}
            ${detailSection(member.publicationHeading || "Selected publications", list(member.publications, "publication-list"))}
          </div>
        </div>
      </section>`;
  }

  function renderPublications() {
    const target = document.getElementById("publications-list");
    if (!target) return;
    target.innerHTML = members.map((member) => `
      <section class="publication-group">
        <div class="publication-person">
          <p class="eyebrow">${escapeHtml(member.publicationHeading || "Selected publications")}</p>
          <h2><a href="member.html?id=${encodeURIComponent(member.id)}">${escapeHtml(member.name)}</a></h2>
          <div class="profile-link-row">${academicLinks(member)}</div>
        </div>
        <ol class="publication-list numbered">${(member.publications || []).map((publication) => `<li>${escapeHtml(publication)}</li>`).join("")}</ol>
      </section>`).join("");
  }

  function renderContacts() {
    const target = document.getElementById("contact-list");
    if (!target) return;
    target.innerHTML = members.map((member) => `
      <article class="contact-person">
        <div class="contact-avatar" aria-hidden="true">${escapeHtml(initials(member.name))}</div>
        <div>
          <h3><a href="member.html?id=${encodeURIComponent(member.id)}">${escapeHtml(member.name)}</a></h3>
          <p>${escapeHtml(member.designation)}</p>
          <a href="mailto:${escapeHtml(member.email)}">${escapeHtml(member.email)}</a>
        </div>
      </article>`).join("");
  }

  function initializePage() {
    const activePage = document.body.dataset.page;
    const activeLink = document.querySelector(`[data-nav="${activePage}"]`);
    if (activeLink) activeLink.setAttribute("aria-current", "page");
    document.querySelectorAll("[data-current-year]").forEach((node) => {
      node.textContent = new Date().getFullYear();
    });

    renderHomeResearch();
    renderFeaturedMembers();
    renderPeople();
    renderMember();
    renderResearch();
    renderPublications();
    renderContacts();
  }

  document.addEventListener("DOMContentLoaded", initializePage);
})();
