(function () {
  "use strict";

  const group = window.QUANTUM_GROUP || { people: [], researchAreas: [] };
  const peopleTypes = {
    faculty: "Faculty",
    "postdoctoral-researcher": "Postdoctoral Researcher",
    "doctoral-researcher": "PhD Scholar",
    student: "Student",
    "technical-staff": "Technical Staff"
  };

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;"
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
    if (photo) return `<img class="member-portrait ${modifier}" src="${escapeHtml(photo)}" alt="${escapeHtml(person.name)}" loading="lazy">`;
    return `<div class="member-portrait portrait-placeholder ${modifier}" aria-hidden="true"><span>${escapeHtml(initials(person.name))}</span></div>`;
  }

  function personCard(person) {
    return `<article class="person-card">
      <a class="portrait-link" href="member.html?id=${encodeURIComponent(person.id)}" aria-label="View ${escapeHtml(person.name)}'s profile">${portrait(person)}</a>
      <div class="person-card-body">
        <span class="member-flair">${escapeHtml(peopleTypes[person.memberType] || "Group Member")}</span>
        <p class="person-role">${escapeHtml(person.groupRole)}</p>
        <h3><a href="member.html?id=${encodeURIComponent(person.id)}">${escapeHtml(person.name)}</a></h3>
        <p class="person-designation">${escapeHtml(person.designation)}</p>
        <div class="tag-row">${(person.interests || []).slice(0, 3).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        <a class="card-link" href="member.html?id=${encodeURIComponent(person.id)}">View profile <span aria-hidden="true">→</span></a>
      </div>
    </article>`;
  }

  function renderResearch() {
    const target = document.getElementById("research-areas");
    if (!target) return;
    target.innerHTML = group.researchAreas.map((area) => `<article class="theme-card">
      <span class="theme-number">${escapeHtml(area.number)}</span>
      <h3>${escapeHtml(area.title)}</h3><p>${escapeHtml(area.summary)}</p>
      <ul class="topic-list">${area.topics.map((topic) => `<li>${escapeHtml(topic)}</li>`).join("")}</ul>
    </article>`).join("");
  }

  function renderFeaturedMembers() {
    const target = document.getElementById("featured-members");
    if (!target) return;
    target.innerHTML = group.people.slice(0, 3).map(personCard).join("");
  }

  function renderPeople() {
    const target = document.getElementById("people-list");
    if (!target) return;
    target.innerHTML = group.people.map(personCard).join("");
    const count = document.getElementById("people-count");
    if (count) count.textContent = `${group.people.length} ${group.people.length === 1 ? "member" : "members"}`;
  }

  const linkLabels = {
    website: "Website", profile: "Official profile", research: "Research profile",
    scholar: "Google Scholar", scopus: "Scopus", orcid: "ORCID", dblp: "DBLP",
    publication: "Selected publication"
  };

  function profileLinks(person) {
    return Object.entries(person.links || {}).map(([key, value]) => {
      const href = safeUrl(value);
      if (!href || !linkLabels[key]) return "";
      return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(linkLabels[key])}<span aria-hidden="true">↗</span></a>`;
    }).join("");
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
          <section class="profile-section"><h2>Profile</h2><p class="profile-bio">${escapeHtml(person.bio)}</p></section>
          <section class="profile-section"><h2>Research interests</h2><div class="tag-row tag-row-large">${person.interests.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div></section>
          <section class="profile-section"><h2>Selected background</h2><ul class="detail-list">${person.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
        </div>
      </div></section>`;
  }

  function initialize() {
    const active = document.body.dataset.page;
    const activeLink = document.querySelector(`[data-nav="${active}"]`);
    if (activeLink) activeLink.setAttribute("aria-current", "page");
    document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });
    renderResearch();
    renderFeaturedMembers();
    renderPeople();
    renderMember();
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
