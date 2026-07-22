(function () {
  "use strict";

  const group = window.QUANTUM_GROUP || { people: [], sections: [], researchAreas: [] };
  const peopleTypes = [
    { id: "faculty", label: "Faculty" },
    { id: "postdoctoral-researcher", label: "Postdoctoral Researchers" },
    { id: "doctoral-researcher", label: "PhD Scholars" },
    { id: "student", label: "Students" },
    { id: "technical-staff", label: "Technical Staff" }
  ];

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
    const type = peopleTypes.find((item) => item.id === person.memberType);
    return `<article class="person-card quantum-person-card">
      <a class="portrait-link" href="member.html?id=${encodeURIComponent(person.id)}" aria-label="View ${escapeHtml(person.name)}'s profile">${portrait(person)}</a>
      <div class="person-card-body">
        <span class="member-flair">${escapeHtml(type ? type.label.replace(/s$/, "") : "Group Member")}</span>
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

  function renderLeadershipPreview() {
    const target = document.getElementById("leadership-preview");
    if (!target) return;
    target.innerHTML = group.people.filter((person) => person.section === "leadership").map(personCard).join("");
  }

  function renderDirectory(activeType = "all") {
    const target = document.getElementById("people-directory");
    if (!target) return;
    const relevantSections = activeType === "all"
      ? group.sections
      : group.sections.filter((section) => group.people.some((person) => person.section === section.id && person.memberType === activeType));
    const fallbackType = peopleTypes.find((type) => type.id === activeType);
    target.innerHTML = relevantSections.map((section) => {
      const people = group.people.filter((person) => person.section === section.id && (activeType === "all" || person.memberType === activeType));
      const content = people.length
        ? `<div class="people-grid directory-grid">${people.map(personCard).join("")}</div>`
        : `<div class="pending-card"><strong>Profiles to be confirmed</strong><p>${escapeHtml(section.description)}</p></div>`;
      return `<section class="directory-section" id="${escapeHtml(section.id)}">
        <div class="directory-heading"><p class="eyebrow">${String(people.length).padStart(2, "0")} ${people.length === 1 ? "person" : "people"}</p><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.description)}</p></div>
        ${content}
      </section>`;
    }).join("") || `<section class="directory-section"><div class="pending-card"><strong>${escapeHtml(fallbackType ? fallbackType.label : "Profiles")} to be added</strong><p>This role category has been created and is ready for confirmed profiles.</p></div></section>`;
    const count = document.getElementById("people-count");
    const visibleCount = activeType === "all" ? group.people.length : group.people.filter((person) => person.memberType === activeType).length;
    if (count) count.textContent = `${visibleCount} ${visibleCount === 1 ? "profile" : "profiles"}`;
  }

  function renderPeopleFilters() {
    const target = document.getElementById("people-filters");
    if (!target) return;
    const filters = [{ id: "all", label: "All people" }, ...peopleTypes];
    target.innerHTML = filters.map((filter, index) => {
      const count = filter.id === "all" ? group.people.length : group.people.filter((person) => person.memberType === filter.id).length;
      return `<button class="people-filter${index === 0 ? " is-active" : ""}" type="button" data-filter="${escapeHtml(filter.id)}" aria-pressed="${index === 0 ? "true" : "false"}">${escapeHtml(filter.label)} <span>${count}</span></button>`;
    }).join("");
    target.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-filter]");
      if (!button) return;
      target.querySelectorAll("button[data-filter]").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderDirectory(button.dataset.filter);
    });
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
    target.innerHTML = `<section class="profile-hero quantum-profile-hero"><div class="shell profile-hero-grid">
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
    renderResearch(); renderLeadershipPreview(); renderPeopleFilters(); renderDirectory(); renderMember();
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();
