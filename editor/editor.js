(function () {
  "use strict";

  const storageKey = "mitwpu-research-editor-draft-v1";
  const statuses = { draft: "Draft", review: "In review", published: "Published" };
  const groupMeta = {
    quantum: {
      name: "Quantum Science & Technology Group",
      shortName: "Quantum",
      url: "../quantum/",
      peopleGlobal: "QUANTUM_GROUP",
      peopleFile: "data.js"
    },
    photonics: {
      name: "Photonics Research Group",
      shortName: "Photonics",
      url: "../photonics/",
      peopleGlobal: "PHOTONICS_MEMBERS",
      peopleFile: "members-data.js",
      researchFile: "site-data.js"
    }
  };

  const peopleTypes = [
    ["faculty", "Faculty"],
    ["postdoctoral-researcher", "Postdoctoral researcher"],
    ["doctoral-researcher", "PhD scholar"],
    ["student", "Student"],
    ["technical-staff", "Technical staff"]
  ];

  const originalData = {
    quantum: {
      people: clone((window.QUANTUM_GROUP || {}).people || []),
      research: clone((window.QUANTUM_GROUP || {}).researchAreas || [])
    },
    photonics: {
      people: clone(window.PHOTONICS_MEMBERS || []),
      research: clone((window.PHOTONICS_SITE || {}).researchThemes || [])
    }
  };

  const savedState = readDraft();
  const state = {
    group: savedState.group || "quantum",
    view: savedState.view || "people",
    selectedId: savedState.selectedId || "",
    data: savedState.data || originalData,
    workflow: savedState.workflow || { quantum: "draft", photonics: "draft" },
    role: "group-editor",
    dirty: false
  };
  normalizeData(state.data);

  const elements = {
    form: document.getElementById("content-form"),
    recordList: document.getElementById("record-list"),
    recordLabel: document.getElementById("record-label"),
    addRecord: document.getElementById("add-record"),
    formTitle: document.getElementById("form-title"),
    breadcrumb: document.getElementById("breadcrumb"),
    peopleTotal: document.getElementById("people-total"),
    researchTotal: document.getElementById("research-total"),
    preview: document.getElementById("site-preview"),
    previewGroup: document.getElementById("preview-group-name"),
    openSite: document.getElementById("open-site"),
    status: document.getElementById("status-badge"),
    saveStatus: document.getElementById("save-status"),
    saveDraft: document.getElementById("save-draft"),
    submitReview: document.getElementById("submit-review"),
    downloadData: document.getElementById("download-data"),
    role: document.getElementById("editor-role"),
    toast: document.getElementById("toast")
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeData(data) {
    ["quantum", "photonics"].forEach((group) => {
      ["people", "research"].forEach((view) => {
        const seen = new Set();
        (data[group]?.[view] || []).forEach((record, index) => {
          let id = record.id || `${view}-${slugify(record.name || record.title || index + 1)}`;
          while (seen.has(id)) id = `${id}-${index + 1}`;
          record.id = id;
          seen.add(id);
        });
      });
    });
  }

  function readDraft() {
    try {
      const value = JSON.parse(window.localStorage.getItem(storageKey) || "{}");
      if (!value.data || !value.data.quantum || !value.data.photonics) return {};
      return value;
    } catch (_error) {
      return {};
    }
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      "\"": "&quot;"
    })[character]);
  }

  function slugify(value) {
    return String(value || "new-profile")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 56) || "new-profile";
  }

  function lines(value) {
    return String(value || "").split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
  }

  function commaList(value) {
    return String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
  }

  function publicationLines(items) {
    return (items || []).map((item) => {
      if (typeof item === "string") return item;
      return [item.title, item.citation, item.url].filter(Boolean).join(" | ");
    }).join("\n");
  }

  function parsePublications(value) {
    return lines(value).map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length === 1) return parts[0];
      return {
        title: parts[0] || "",
        citation: parts[1] || "",
        url: parts[2] || ""
      };
    });
  }

  function currentRecords() {
    return state.data[state.group][state.view];
  }

  function currentRecord() {
    const records = currentRecords();
    if (!records.length) return null;
    let record = records.find((item) => item.id === state.selectedId);
    if (!record) {
      record = records[0];
      state.selectedId = record.id;
    }
    return record;
  }

  function field(name, label, value, options = {}) {
    const type = options.type || "text";
    const full = options.full ? " field-full" : "";
    const hint = options.hint ? `<span class="hint">${escapeHtml(options.hint)}</span>` : "";
    const readonly = options.readonly ? " readonly" : "";
    if (type === "textarea") {
      return `<div class="field${full}"><label for="field-${escapeHtml(name)}">${escapeHtml(label)} ${hint}</label><textarea id="field-${escapeHtml(name)}" name="${escapeHtml(name)}" rows="${options.rows || 4}">${escapeHtml(value)}</textarea></div>`;
    }
    if (type === "select") {
      return `<div class="field${full}"><label for="field-${escapeHtml(name)}">${escapeHtml(label)} ${hint}</label><select id="field-${escapeHtml(name)}" name="${escapeHtml(name)}">${options.items.map(([itemValue, itemLabel]) => `<option value="${escapeHtml(itemValue)}"${itemValue === value ? " selected" : ""}>${escapeHtml(itemLabel)}</option>`).join("")}</select></div>`;
    }
    return `<div class="field${full}"><label for="field-${escapeHtml(name)}">${escapeHtml(label)} ${hint}</label><input id="field-${escapeHtml(name)}" name="${escapeHtml(name)}" type="${escapeHtml(type)}" value="${escapeHtml(value)}"${readonly}></div>`;
  }

  function renderPeopleForm(person) {
    const quantum = state.group === "quantum";
    const interests = quantum ? person.interests : person.researchInterests;
    const affiliation = quantum ? person.affiliation : person.institution;
    const groupRole = quantum ? person.groupRole : person.role;
    const background = quantum ? person.highlights : person.education;
    const links = person.links || {};
    elements.formTitle.textContent = person.name || "New profile";
    elements.form.innerHTML = `
      <section class="form-section">
        <h2 class="section-title">Basic profile</h2>
        <div class="field-grid">
          ${field("name", "Full name", person.name || "", { full: true })}
          ${field("id", "Profile address", person.id || "", { readonly: true, hint: "generated from the name" })}
          ${field("memberType", "People category", person.memberType || "faculty", { type: "select", items: peopleTypes })}
          ${field("groupRole", "Role in this group", groupRole || "", { full: true, hint: "for example: Principal Investigator or Member Faculty" })}
          ${field("designation", "University designation", person.designation || "", { full: true })}
          ${field("affiliation", quantum ? "Affiliation" : "Institution", affiliation || "", { full: true })}
          ${field("email", "Email", person.email || "", { type: "email" })}
          ${field("photo", "Photo path", person.photo || "", { hint: "uploaded image or approved URL" })}
        </div>
      </section>
      <section class="form-section">
        <h2 class="section-title">Research profile</h2>
        <div class="field-grid">
          ${quantum ? field("bio", "Short biography", person.bio || "", { type: "textarea", full: true, rows: 5 }) : ""}
          ${field("interests", "Research interests", (interests || []).join(", "), { type: "textarea", full: true, hint: "separate with commas", rows: 3 })}
          ${field("background", quantum ? "Selected background" : "Education", (background || []).join("\n"), { type: "textarea", full: true, hint: "one item per line", rows: 4 })}
          ${field("publicationHeading", "Publication section title", person.publicationHeading || "Selected publications", { full: true })}
          ${field("publications", "Selected publications", publicationLines(person.publications), { type: "textarea", full: true, hint: "one paper per line: title | citation | URL", rows: 7 })}
        </div>
      </section>
      <section class="form-section">
        <h2 class="section-title">Academic links</h2>
        <div class="field-grid">
          ${field("link-scholar", "Google Scholar", links.scholar || "")}
          ${field("link-orcid", "ORCID", links.orcid || "")}
          ${field("link-scopus", "Scopus", links.scopus || "")}
          ${field("link-profile", "Official profile", links.profile || "")}
          ${field("link-website", "Personal website", links.website || "")}
          ${field("link-linkedin", "LinkedIn", links.linkedin || "")}
        </div>
      </section>
      <section class="form-section">
        <div class="danger-row">
          <div><strong>Remove this profile</strong><p>Removes it from this browser draft. The published site is not affected.</p></div>
          <button class="button button-danger" id="delete-record" type="button">Remove</button>
        </div>
      </section>`;
  }

  function renderResearchForm(area) {
    elements.formTitle.textContent = area.title || "New research area";
    elements.form.innerHTML = `
      <section class="form-section">
        <h2 class="section-title">Research area</h2>
        <div class="field-grid">
          ${field("number", "Display number", area.number || "", { hint: "for example: 01" })}
          ${field("title", "Title", area.title || "")}
          ${field("summary", "Short summary", area.summary || "", { type: "textarea", full: true, rows: 5 })}
          ${field("topics", "Topics", (area.topics || []).join(", "), { type: "textarea", full: true, hint: "separate with commas", rows: 4 })}
        </div>
      </section>
      <section class="form-section">
        <div class="danger-row">
          <div><strong>Remove this research area</strong><p>Removes it from this browser draft. The published site is not affected.</p></div>
          <button class="button button-danger" id="delete-record" type="button">Remove</button>
        </div>
      </section>`;
  }

  function updateRecord(event) {
    const target = event.target;
    if (!target.name) return;
    const record = currentRecord();
    if (!record) return;
    if (state.view === "research") {
      if (target.name === "topics") record.topics = commaList(target.value);
      else record[target.name] = target.value;
    } else {
      const quantum = state.group === "quantum";
      if (target.name === "name") {
        record.name = target.value;
        if (!record.id || record.id.startsWith("new-profile-")) {
          record.id = slugify(target.value);
          state.selectedId = record.id;
          const idInput = elements.form.elements.id;
          if (idInput) idInput.value = record.id;
        }
      } else if (target.name === "groupRole") {
        record[quantum ? "groupRole" : "role"] = target.value;
      } else if (target.name === "affiliation") {
        record[quantum ? "affiliation" : "institution"] = target.value;
      } else if (target.name === "interests") {
        record[quantum ? "interests" : "researchInterests"] = commaList(target.value);
      } else if (target.name === "background") {
        record[quantum ? "highlights" : "education"] = lines(target.value);
      } else if (target.name === "publications") {
        record.publications = parsePublications(target.value);
      } else if (target.name.startsWith("link-")) {
        record.links = record.links || {};
        record.links[target.name.slice(5)] = target.value;
      } else {
        record[target.name] = target.value;
      }
    }
    state.dirty = true;
    state.workflow[state.group] = "draft";
    updateWorkflow();
    renderPreview();
    if (["name", "title", "groupRole", "memberType"].includes(target.name)) renderRecordList();
  }

  function initials(name) {
    return String(name || "New profile").replace(/[.]/g, "").split(/\s+/)
      .filter((part) => part && !["dr", "prof", "mr", "mrs", "ms"].includes(part.toLowerCase()))
      .slice(0, 2).map((part) => part[0].toUpperCase()).join("");
  }

  function renderPreview() {
    const record = currentRecord();
    const meta = groupMeta[state.group];
    elements.previewGroup.textContent = meta.name;
    elements.openSite.href = meta.url;
    elements.preview.className = `site-preview is-${state.group}`;
    if (!record) {
      elements.preview.innerHTML = `<div class="mock-content"><p>No records yet. Add one to begin.</p></div>`;
      return;
    }
    const previewHeader = `<div class="mock-header"><span class="mock-brand">${escapeHtml(meta.name)}</span><span class="mock-nav">Research People Contact</span></div>`;
    const previewHero = `<div class="mock-hero"><small>MIT World Peace University · Pune</small><h2>${state.view === "people" ? "People advancing research across disciplines." : "Research connecting ideas, experiments, and applications."}</h2></div>`;
    if (state.view === "people") {
      const interests = state.group === "quantum" ? record.interests : record.researchInterests;
      const role = state.group === "quantum" ? record.groupRole : record.role;
      elements.preview.innerHTML = `${previewHeader}${previewHero}<div class="mock-content"><p class="mock-eyebrow">People</p><div class="mock-card"><div class="mock-avatar">${escapeHtml(initials(record.name))}</div><div><p class="mock-eyebrow">${escapeHtml(role || "Group member")}</p><h3>${escapeHtml(record.name || "New profile")}</h3><p>${escapeHtml(record.designation || "University designation")}</p><div class="mock-tags">${(interests || []).slice(0, 4).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div></div></div></div>`;
    } else {
      elements.preview.innerHTML = `${previewHeader}${previewHero}<div class="mock-content"><p class="mock-eyebrow">Research</p><div class="mock-theme"><span>${escapeHtml(record.number || "01")}</span><h3>${escapeHtml(record.title || "New research area")}</h3><p>${escapeHtml(record.summary || "Add a concise summary of the research direction.")}</p><div class="mock-tags">${(record.topics || []).slice(0, 4).map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div></div></div>`;
    }
  }

  function renderRecordList() {
    const records = currentRecords();
    elements.recordList.innerHTML = records.map((record, index) => {
      const label = state.view === "people"
        ? (state.group === "quantum" ? record.groupRole : record.role)
        : record.number;
      return `<div class="record-row${record.id === state.selectedId ? " is-active" : ""}">
        <button class="record-button" type="button" data-record="${escapeHtml(record.id)}">
          <strong>${escapeHtml(state.view === "people" ? record.name : record.title)}</strong>
          <small>${escapeHtml(label || (state.view === "people" ? "Group member" : "Research area"))}</small>
        </button>
        <span class="order-buttons">
          <button type="button" data-move="-1" data-index="${index}" aria-label="Move up"${index === 0 ? " disabled" : ""}>↑</button>
          <button type="button" data-move="1" data-index="${index}" aria-label="Move down"${index === records.length - 1 ? " disabled" : ""}>↓</button>
        </span>
      </div>`;
    }).join("");
  }

  function renderShell() {
    const records = currentRecords();
    if (!state.selectedId || !records.some((item) => item.id === state.selectedId)) {
      state.selectedId = records[0] ? records[0].id : "";
    }
    const meta = groupMeta[state.group];
    const personCount = state.data[state.group].people.length;
    const researchCount = state.data[state.group].research.length;
    elements.peopleTotal.textContent = personCount;
    elements.researchTotal.textContent = researchCount;
    elements.recordLabel.textContent = state.view === "people" ? "People" : "Research areas";
    elements.addRecord.setAttribute("aria-label", state.view === "people" ? "Add person" : "Add research area");
    elements.addRecord.title = state.view === "people" ? "Add person" : "Add research area";
    elements.breadcrumb.textContent = `${meta.shortName} / ${state.view === "people" ? "People" : "Research areas"}`;

    document.querySelectorAll("[data-group]").forEach((button) => {
      const active = button.dataset.group === state.group;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll("[data-view]").forEach((button) => {
      const active = button.dataset.view === state.view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    renderRecordList();
    const record = currentRecord();
    if (record) {
      if (state.view === "people") renderPeopleForm(record);
      else renderResearchForm(record);
    } else {
      elements.formTitle.textContent = state.view === "people" ? "No profiles" : "No research areas";
      elements.form.innerHTML = `<section class="form-section"><p>Use the plus button to add the first record.</p></section>`;
    }
    updateWorkflow();
    renderPreview();
  }

  function updateWorkflow() {
    const status = state.workflow[state.group] || "draft";
    elements.status.className = `status-badge${status === "review" ? " is-review" : status === "published" ? " is-published" : ""}`;
    elements.status.innerHTML = `<span></span> ${statuses[status]}`;
    elements.submitReview.textContent = state.role === "reviewer" ? "Approve for publishing" : "Submit for review";
    elements.saveStatus.textContent = state.dirty
      ? "Unsaved changes in this browser."
      : status === "review"
        ? "Submitted to the research office for review."
        : status === "published"
          ? "Approved. A deployment would publish this version."
          : "Changes are saved only in this browser until submitted.";
  }

  function addRecord() {
    const records = currentRecords();
    if (state.view === "people") {
      const timestamp = Date.now();
      const person = state.group === "quantum"
        ? {
            id: `new-profile-${timestamp}`,
            memberType: "faculty",
            name: "New group member",
            groupRole: "Member Faculty",
            designation: "",
            affiliation: "MIT World Peace University, Pune",
            email: "",
            photo: "",
            bio: "",
            interests: [],
            highlights: [],
            publicationHeading: "Selected publications",
            publications: [],
            links: {}
          }
        : {
            id: `new-profile-${timestamp}`,
            memberType: "faculty",
            role: "Faculty",
            name: "New group member",
            designation: "",
            institution: "MIT World Peace University, Pune",
            email: "",
            photo: "",
            education: [],
            researchInterests: [],
            publicationHeading: "Selected publications",
            publications: [],
            links: {}
          };
      records.push(person);
      state.selectedId = person.id;
    } else {
      const area = {
        id: `area-${Date.now()}`,
        number: String(records.length + 1).padStart(2, "0"),
        title: "New research area",
        summary: "",
        topics: []
      };
      records.push(area);
      state.selectedId = area.id;
    }
    state.dirty = true;
    state.workflow[state.group] = "draft";
    renderShell();
  }

  function deleteRecord() {
    const records = currentRecords();
    const record = currentRecord();
    if (!record) return;
    const name = state.view === "people" ? record.name : record.title;
    if (!window.confirm(`Remove "${name}" from this browser draft?`)) return;
    const index = records.findIndex((item) => item.id === record.id);
    records.splice(index, 1);
    state.selectedId = records[index]?.id || records[index - 1]?.id || "";
    state.dirty = true;
    state.workflow[state.group] = "draft";
    renderShell();
    showToast("Removed from the browser draft. The public site was not changed.");
  }

  function moveRecord(index, direction) {
    const records = currentRecords();
    const destination = index + direction;
    if (destination < 0 || destination >= records.length) return;
    [records[index], records[destination]] = [records[destination], records[index]];
    state.dirty = true;
    state.workflow[state.group] = "draft";
    renderRecordList();
    updateWorkflow();
  }

  function saveDraft() {
    const payload = {
      group: state.group,
      view: state.view,
      selectedId: state.selectedId,
      data: state.data,
      workflow: state.workflow,
      savedAt: new Date().toISOString()
    };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
    state.dirty = false;
    updateWorkflow();
    showToast("Draft saved in this browser.");
  }

  function submitReview() {
    state.workflow[state.group] = state.role === "reviewer" ? "published" : "review";
    saveDraft();
    showToast(state.role === "reviewer"
      ? "Approved. Production would now build and deploy the static site."
      : "Submitted to the research office for review.");
  }

  function downloadData() {
    let filename;
    let source;
    if (state.group === "quantum") {
      filename = "data.js";
      source = `// Exported from the MIT-WPU Research Group Content Editor demo.\nwindow.QUANTUM_GROUP = ${JSON.stringify({
        researchAreas: state.data.quantum.research,
        people: state.data.quantum.people
      }, null, 2)};\n`;
    } else if (state.view === "people") {
      filename = "members-data.js";
      source = `// Exported from the MIT-WPU Research Group Content Editor demo.\nwindow.PHOTONICS_MEMBERS = ${JSON.stringify(state.data.photonics.people, null, 2)};\n`;
    } else {
      filename = "site-data.js";
      source = `// Exported from the MIT-WPU Research Group Content Editor demo.\nwindow.PHOTONICS_SITE = ${JSON.stringify({ researchThemes: state.data.photonics.research }, null, 2)};\n`;
    }
    const url = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(`${filename} downloaded. In production, this step becomes an automatic reviewed commit.`);
  }

  let toastTimer;
  function showToast(message) {
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 3200);
  }

  document.addEventListener("click", (event) => {
    const groupButton = event.target.closest("[data-group]");
    if (groupButton) {
      state.group = groupButton.dataset.group;
      state.selectedId = "";
      renderShell();
      return;
    }
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      state.view = viewButton.dataset.view;
      state.selectedId = "";
      renderShell();
      return;
    }
    const recordButton = event.target.closest("[data-record]");
    if (recordButton) {
      state.selectedId = recordButton.dataset.record;
      renderShell();
      return;
    }
    const moveButton = event.target.closest("[data-move]");
    if (moveButton) {
      moveRecord(Number(moveButton.dataset.index), Number(moveButton.dataset.move));
      return;
    }
    if (event.target.closest("#delete-record")) deleteRecord();
  });

  elements.form.addEventListener("input", updateRecord);
  elements.form.addEventListener("change", updateRecord);
  elements.addRecord.addEventListener("click", addRecord);
  elements.saveDraft.addEventListener("click", saveDraft);
  elements.submitReview.addEventListener("click", submitReview);
  elements.downloadData.addEventListener("click", downloadData);
  elements.role.addEventListener("change", () => {
    state.role = elements.role.value;
    document.querySelector(".user-avatar").textContent = state.role === "reviewer" ? "RO" : "PI";
    updateWorkflow();
  });

  renderShell();
})();
