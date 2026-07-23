(function () {
  "use strict";

  const members = Array.isArray(window.PHOTONICS_MEMBERS) ? window.PHOTONICS_MEMBERS : [];
  const site = window.PHOTONICS_SITE || { researchThemes: [] };
  const peopleTypes = [
    { id: "faculty", label: "Faculty", description: "Faculty leading and contributing to the group's research and teaching." },
    { id: "postdoctoral-researcher", label: "Postdoctoral Researchers", description: "Postdoctoral researchers and research fellows affiliated with the group." },
    { id: "doctoral-researcher", label: "PhD Scholars", description: "Doctoral researchers working on group projects and theses." },
    { id: "student", label: "Students", description: "Master's, undergraduate, and project students participating in the group." },
    { id: "technical-staff", label: "Technical Staff", description: "Laboratory, instrumentation, computing, and technical support staff." }
  ];

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

  function publicationItem(publication) {
    if (typeof publication === "string") {
      return `<li>${escapeHtml(publication)}</li>`;
    }
    const title = escapeHtml(publication?.title || "");
    const href = safeUrl(publication?.url || "");
    const citation = publication?.citation
      ? `<span class="publication-meta">${escapeHtml(publication.citation)}</span>`
      : "";
    return `<li>${href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${title}</a>` : title}${citation}</li>`;
  }

  function publicationList(items, className = "publication-list") {
    if (!Array.isArray(items) || items.length === 0) return "";
    return `<ol class="${className}">${items.map(publicationItem).join("")}</ol>`;
  }

  function memberCard(member) {
    const interests = (member.researchInterests || []).slice(0, 3);
    const type = peopleTypes.find((item) => item.id === member.memberType);
    return `
      <article class="person-card">
        <a class="portrait-link" href="member.html?id=${encodeURIComponent(member.id)}" aria-label="View ${escapeHtml(member.name)}'s profile">
          ${portrait(member)}
        </a>
        <div class="person-card-body">
          <span class="member-flair">${escapeHtml(type ? type.label.replace(/s$/, "") : member.role)}</span>
          <p class="person-role">${escapeHtml(member.role)}</p>
          <h3><a href="member.html?id=${encodeURIComponent(member.id)}">${escapeHtml(member.name)}</a></h3>
          <p class="person-designation">${escapeHtml(member.designation)}</p>
          <div class="tag-row">${interests.map((interest) => `<span>${escapeHtml(interest)}</span>`).join("")}</div>
          <a class="card-link" href="member.html?id=${encodeURIComponent(member.id)}">View profile <span aria-hidden="true">→</span></a>
        </div>
      </article>`;
  }

  function renderPeople(activeType = "all") {
    const target = document.getElementById("people-directory");
    if (!target) return;
    const visibleTypes = activeType === "all"
      ? peopleTypes.filter((type) => members.some((member) => member.memberType === type.id))
      : peopleTypes.filter((type) => type.id === activeType);
    target.innerHTML = visibleTypes.map((type) => {
      const people = members.filter((member) => member.memberType === type.id);
      const content = people.length
        ? `<div class="people-grid people-grid-full">${people.map(memberCard).join("")}</div>`
        : `<div class="pending-card"><strong>Profiles to be added</strong><p>${escapeHtml(type.description)}</p></div>`;
      return `<section class="directory-section" data-people-type="${escapeHtml(type.id)}">
        <div class="directory-heading"><p class="eyebrow">${String(people.length).padStart(2, "0")} ${people.length === 1 ? "person" : "people"}</p><h2>${escapeHtml(type.label)}</h2><p>${escapeHtml(type.description)}</p></div>
        ${content}
      </section>`;
    }).join("");
    const count = document.getElementById("people-count");
    const visibleCount = activeType === "all" ? members.length : members.filter((member) => member.memberType === activeType).length;
    if (count) count.textContent = `${visibleCount} ${visibleCount === 1 ? "profile" : "profiles"}`;
  }

  function renderPeopleFilters() {
    const target = document.getElementById("people-filters");
    if (!target) return;
    const filters = [{ id: "all", label: "All people" }, ...peopleTypes];
    target.innerHTML = filters.map((filter, index) => {
      const count = filter.id === "all" ? members.length : members.filter((member) => member.memberType === filter.id).length;
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
      renderPeople(button.dataset.filter);
    });
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
    profile: "MIT-WPU profile",
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
        <div class="shell profile-layout profile-layout-simple">
          <div class="profile-details">
            ${detailSection("Profile", member.bio ? `<p class="profile-bio">${escapeHtml(member.bio)}</p>` : "")}
            ${detailSection("Research interests", `<div class="tag-row tag-row-large">${(member.researchInterests || []).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>`)}
            ${detailSection("Education", list(member.education))}
            ${detailSection(member.publicationHeading || "Selected publications", publicationList(member.publications))}
          </div>
        </div>
      </section>`;
  }

  function renderPublications() {
    const target = document.getElementById("publications-list");
    if (!target) return;
    target.innerHTML = members.filter((member) => (member.publications || []).length).map((member) => `
      <section class="publication-group">
        <div class="publication-person">
          <p class="eyebrow">${escapeHtml(member.publicationHeading || "Selected publications")}</p>
          <h2><a href="member.html?id=${encodeURIComponent(member.id)}">${escapeHtml(member.name)}</a></h2>
          <div class="profile-link-row">${academicLinks(member)}</div>
        </div>
        ${publicationList(member.publications, "publication-list numbered")}
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
    renderPeopleFilters();
    renderPeople();
    renderMember();
    renderResearch();
    renderPublications();
    renderContacts();
  }

  document.addEventListener("DOMContentLoaded", initializePage);
})();
