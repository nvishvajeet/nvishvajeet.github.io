# FabLab / Innovation Center — Design & Costing Proposal

**For:** A new university at Shahpur, India
**Prepared by:** Vishvajeet N (drawing on hands-on experience at eirLab, Talence)
**Reference models:** eirLab (ENSEIRB-MATMECA, Talence/Bordeaux) · CFI — Center For Innovation (IIT Madras) · MIT / Fab Foundation FabLab standard
**Date:** June 2026 · **Currency:** INR (USD reference where useful)

> One-line vision: *A student-run, open-access workshop where any student — regardless of branch or year — can walk in, learn to use a tool safely, and build a physical thing: a circuit, a robot, a 3D print, a laser-cut part, a product prototype.*

---

## 1. Guiding principles

These are the things that make CFI and eirLab work, distilled. Get these right and the equipment list matters less than you'd think.

1. **Open access, not a locked teaching lab.** Long opening hours (ideally near-24/7 with student staff), no requirement to be enrolled in a specific course. This is the single biggest differentiator from a normal department lab.
2. **Student-run, faculty-backed.** A small core student team runs day-to-day operations (inventory, inductions, machine maintenance). One or two faculty mentors + one full-time technical staff member provide continuity. CFI is almost entirely student-governed; that ownership is *why* it thrives.
3. **Safety as the gate, not bureaucracy as the gate.** Access to a machine = pass a short safety induction for that machine. Everything else stays low-friction.
4. **Tiered tooling.** Cheap, abundant, beginner-safe tools (FDM printers, soldering, hand tools) in the open. Expensive/dangerous tools (laser, CNC, table saw) behind induction + supervision.
5. **Start lean, design for growth.** Phase the build. A working 200 m² space that students love beats an empty 1000 m² showpiece.
6. **Project culture over inventory.** Budget for competitions (Robocon/ABU, Formula Student, e-Yantra, hackathons), club projects, and consumables — not just one-time capital machines.

---

## 2. Reference models — what to borrow from each

| Model | What it is | Borrow this |
|---|---|---|
| **eirLab (Talence)** | University FabLab at ENSEIRB-MATMECA, part of the global Fab Foundation network | Fab Foundation equipment standard, induction/badge system, open membership, digital fabrication focus |
| **CFI (IIT Madras)** | Large student-run innovation center with themed clubs (Aero, Robotics, 3D printing, Electronics, etc.) | Student governance, club structure, competition teams, 24/7 access culture |
| **MIT / Fab Foundation** | The original "Fab Lab" inventory spec | A globally recognised, vendor-neutral equipment checklist; ability to join the international network |

**Recommendation:** Adopt the **Fab Foundation equipment baseline** (so you can call it a real "FabLab" and join the network), but organise the *people* and *culture* the **CFI way** (student clubs + competition teams + open access).

---

## 3. Space & building

### 3.1 How big?

| Tier | Built-up area | Rough footprint | Concurrent users |
|---|---|---|---|
| **Starter** | ~200 m² (~2,150 ft²) | one large hall + 2 small rooms | 30–40 |
| **Standard FabLab** (recommended target) | ~500 m² (~5,400 ft²) | ground floor wing | 60–90 |
| **Flagship (CFI-scale)** | 1,000–1,500 m² | dedicated building | 150+ |

For a *new* university, I recommend **building/fitting out for Standard (500 m²) but commissioning in the Starter footprint first** (Phase 1, Section 7), so students have something within months, not years.

### 3.2 Zoning (why zones matter: noise, dust, fumes, and safety segregation)

```
┌─────────────────────────────────────────────────────────────┐
│  ENTRANCE / RECEPTION + SAFETY INDUCTION DESK + LOCKERS      │
├───────────────┬───────────────────────┬─────────────────────┤
│ DRY ZONE      │  CLEAN DIGITAL FAB     │  ELECTRONICS &      │
│ (quiet)       │  (3D print farm,       │  ROBOTICS LAB       │
│ CAD machines, │   laser cutter w/      │  benches, soldering │
│ meeting/      │   extraction,          │  scopes, PSUs,      │
│ teaching nook │   vinyl cutter)        │  component store    │
├───────────────┴───────────────────────┴─────────────────────┤
│  WET / DIRTY ZONE  (separate ventilation, dust extraction)   │
│  CNC router · woodworking · metal/bench tools · welding bay  │
│  · spray/paint corner · grinder                              │
├───────────────────────────────────────────────────────────┤
│  STORAGE: filament/material store · tool crib · finished     │
│  project shelving · hazmat cabinet                           │
└─────────────────────────────────────────────────────────────┘
```

**Key building services (don't skip these — retrofitting them later is painful):**
- **3-phase power** + plenty of distributed sockets, RCD/ELCB protection, separate circuits for high-draw machines (laser, CNC, welder).
- **Fume & dust extraction:** laser exhaust to outdoors, downdraft/extraction at soldering benches, dust collection for woodworking/CNC. This is a recurring weak point in Indian college labs — budget for it properly.
- **Ventilation & AC** for the dry/electronics/digital zones (electronics and resin printing dislike heat/humidity); the wet zone can be naturally ventilated + extraction.
- **Compressed air** line for the dirty zone.
- **Fire safety:** ABC + CO₂ extinguishers, smoke detectors, clearly marked exits, first-aid + eyewash.
- **Flooring:** ESD-safe/anti-static in electronics zone; epoxy/concrete in the dirty zone.
- **Wide doors / roll-up shutter** to the dirty zone for moving large stock and machines.

### 3.3 Construction / fit-out cost

| Item | Assumption | Cost (INR) |
|---|---|---|
| New construction (institutional) | ₹2,000–2,800 /ft² × 5,400 ft² | ₹1.1–1.5 cr |
| **OR** retrofit existing space | ₹600–1,000 /ft² | ₹35–55 lakh |
| Electrical (3-phase, distribution, ESD floor) | — | ₹15–25 lakh |
| HVAC + extraction + compressed air | — | ₹15–30 lakh |
| Furniture (workbenches, ESD benches, stools, shelving, lockers) | — | ₹12–20 lakh |

> **Strong recommendation:** For a brand-new university, **retrofit an existing shell/hall** for Phase 1 rather than waiting on a new building. It saves a year and ~₹70 lakh, and lets the culture form while permanent construction (if any) proceeds in parallel.

---

## 4. Equipment — by zone (with India 2026 price estimates)

Prices are realistic street estimates for India in 2026 and will vary with brand, GST, and education discounts. "Qty" reflects the **Standard (500 m²)** tier.

### 4.1 Digital fabrication (the FabLab core)

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Notes |
|---|---|---:|---:|---|
| FDM 3D printers (Bambu/Creality class) | 6 | 40,000 | 2,40,000 | The workhorse "print farm". Quantity > fanciness. |
| Resin (SLA/MSLA) printer + wash/cure | 1 | 60,000 | 60,000 | Fine detail; needs ventilation + PPE. |
| Large-format / engineering FDM | 1 | 4,00,000 | 4,00,000 | Bigger build volume, engineering filaments. |
| CO₂ laser cutter/engraver, 60–100 W + chiller + exhaust | 1 | 5,00,000 | 5,00,000 | Acrylic/wood/MDF. Bed ~600×900 mm+. The most-loved machine in any fablab. |
| CNC router (desktop→benchtop) | 1 | 2,50,000 | 2,50,000 | Wood/plastic/soft metal. |
| Vinyl cutter / plotter | 1 | 50,000 | 50,000 | Stickers, stencils, flexible-circuit/copper. |
| Subtotal | | | **15,00,000** | |

### 4.2 Electronics & robotics

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Notes |
|---|---|---:|---:|---|
| ESD soldering/rework stations | 8 | 12,000 | 96,000 | Hot-air rework on a couple. |
| Digital oscilloscopes (100 MHz) | 3 | 55,000 | 1,65,000 | |
| Bench power supplies (triple-output) | 6 | 12,000 | 72,000 | |
| Function generators + bench DMMs | set | — | 1,20,000 | |
| Logic analysers / LCR / spectrum (entry) | set | — | 80,000 | |
| Reflow oven + stencil setup | 1 | 35,000 | 35,000 | SMD assembly. |
| Desktop PCB mill *(optional)* | 1 | 3,00,000 | 3,00,000 | Or outsource PCBs and skip this in Phase 1. |
| Microcontroller/SBC pool (Arduino, ESP32, RPi, **Jetson Nano/Orin**, STM32) | pool | — | 2,00,000 | Loaner kits + a few AI/vision boards. |
| Robotics kits, motors, drivers, sensors, LiDAR, IMUs, batteries/chargers | pool | — | 3,00,000 | Feeds Robocon/competition teams. |
| Component inventory (R/L/C, ICs, connectors, wire) + storage | — | — | 1,50,000 | Treat as partly consumable (Section 6). |
| Subtotal | | | **15,18,000** | |

### 4.3 Workshop / dirty zone

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Notes |
|---|---|---:|---:|---|
| Workbenches + vises (heavy) | 4 | 25,000 | 1,00,000 | |
| Drill press, band saw, table saw, mitre saw | set | — | 2,50,000 | Induction-gated. |
| Hand & power tools (drills, drivers, Dremel, etc.) | set | — | 1,50,000 | |
| Bench grinder, belt/disc sander | set | — | 60,000 | |
| MIG/TIG or arc welder + safety gear | 1 | 1,20,000 | 1,20,000 | Phase 2 optional; serious ventilation needed. |
| Sewing/textile machine + heat press (Fab standard) | 1 | 45,000 | 45,000 | Soft fabrication, wearables, drone covers. |
| Subtotal | | | **7,25,000** | |

### 4.4 Computing, design & metrology

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Notes |
|---|---|---:|---:|---|
| CAD/CAM workstations (GPU, for CAD + slicing + sim) | 6 | 1,20,000 | 7,20,000 | |
| Large monitor + projector for teaching nook | — | — | 80,000 | |
| Calipers, micrometers, multimeters (qty), bench tools | — | — | 60,000 | |
| Software (CAD/EDA: education licences; lean on FOSS — FreeCAD, KiCad, Inkscape) | — | — | 1,00,000/yr | Mostly OpEx; minimise via FOSS. |
| 3D scanner *(optional)* | 1 | 1,50,000 | 1,50,000 | Reverse engineering. |
| Subtotal (capital) | | | **10,10,000** | |

### 4.5 Safety & shared infrastructure

| Item | Subtotal (₹) | Notes |
|---|---:|---|
| Fume extraction arms, dust collector, laser exhaust blower | 4,00,000 | Often under-budgeted — don't. |
| PPE: goggles, gloves, aprons, ear/lung protection, face shields | 60,000 | |
| Fire extinguishers, smoke/heat detectors, eyewash, first aid | 1,00,000 | |
| Signage, induction materials, machine SOP cards, labelling | 40,000 | |
| Access control / RFID badge system (ties to induction) | 1,50,000 | The eirLab-style "earn the badge" model. |
| Subtotal | **7,50,000** | |

---

## 5. Capital cost summary (Standard tier, retrofit route)

| Block | Cost (₹) |
|---|---:|
| Building retrofit + electrical + HVAC/extraction + furniture | ~80,00,000 |
| 4.1 Digital fabrication | 15,00,000 |
| 4.2 Electronics & robotics | 15,18,000 |
| 4.3 Workshop / dirty zone | 7,25,000 |
| 4.4 Computing & metrology | 10,10,000 |
| 4.5 Safety & infrastructure | 7,50,000 |
| Contingency (~12%) | ~13,80,000 |
| **TOTAL one-time capital** | **≈ ₹1.48 crore** (~US$178k) |

**Tier comparison (all-in capital, indicative):**

| Tier | Capital (₹) | USD approx |
|---|---:|---:|
| Starter (200 m²) | 45–65 lakh | $55–78k |
| **Standard (500 m²)** | **1.4–1.7 cr** | **$170–205k** |
| Flagship / CFI-scale (1000–1500 m²) | 4–7 cr | $480k–840k |

---

## 5a. Benchmarked against the official Fab Foundation cost standard

The Fab Foundation publishes the canonical "what does a Fab Lab cost" figures
(source: [Getting Started with Fab Labs](https://fabfoundation.org/getting-started/),
referenced from the [Growing the Fab Lab Network](https://fabfoundation.org/blog/growing-fab-lab-network) post).
Their numbers cover **machines + consumables only** — they explicitly do *not* include the building,
fit-out, furniture, or staff. At ~₹85/US$ (2026):

| Fab Foundation official figure | USD | INR (≈ ₹85/$) |
|---|---:|---:|
| Capital equipment (MIT inventory list) | $25,000 – $65,000 | ₹21 – 55 lakh |
| Initial consumables | $15,000 – $40,000 | ₹13 – 34 lakh |
| **Subtotal to stand up a "regular" Fab Lab** | **$40,000 – $105,000** | **₹34 – 89 lakh** |
| Mobile Fab Lab (reference only) | $298,000 | ≈ ₹2.5 crore |

*(UK chapter quotes the equivalent £30–80k capital + £10–25k consumables.)*

**How the Shahpur proposal maps onto this benchmark:**

| | Fab Foundation "regular lab" | This proposal (Standard tier) |
|---|---|---|
| **Machines/equipment** (Sections 4.1–4.5) | $25k–65k = ₹21–55 L | **≈ ₹55 L** — sits right at the top of the FF range |
| Why at the top, not the middle | — | adds robotics/AI boards, a 6-printer farm, dirty-zone power tools & welding, and India-grade fume/dust extraction that the bare FF inventory omits |
| **Consumables** (Year 1, Section 6) | $15k–40k = ₹13–34 L | ₹6–10 L/yr running rate (lower; FF figure front-loads bulk initial stock) |
| **Building + fit-out + furniture** | *not counted by FF* | + ~₹80 L (the retrofit, power, HVAC, extraction, benches) |
| **Staff** | *not counted by FF* | OpEx, ₹8–14 L/yr |

**Takeaway:** the *equipment* line of this proposal (~₹55 lakh) is fully consistent with — and at the
upper bound of — the official Fab Foundation capital standard. The reason the headline total reaches
**₹1.5 crore** is the building/fit-out (~₹80 L) and a robotics/dirty-zone scope that the bare Fab Lab
inventory doesn't include. A pure, by-the-book Fab Foundation lab in Shahpur (machines + first-year
consumables, fitted into an existing room) would land at **≈ ₹35–90 lakh** — i.e. the **Starter tier**.

---

## 6. Operating cost (annual, Standard tier)

| Item | Annual (₹) |
|---|---:|
| Full-time technical staff (1–2: lab engineer + technician) | 8–14 lakh |
| Consumables (filament, sheets, resin, electronic components, blades, bits, PPE refills) | 6–10 lakh |
| Maintenance & spares (laser tube, nozzles, belts, AMC) | 3–5 lakh |
| Software licences (minimise via FOSS) | 1–2 lakh |
| Power (high-draw machines + HVAC) | 3–6 lakh |
| Competitions, project grants, hackathons, travel | 5–15 lakh |
| **Total OpEx** | **≈ ₹26–52 lakh / year** |

**Sustainability levers:** small per-print/material charge-back at cost; sponsored club teams; industry-sponsored machines (named bays); paid weekend workshops for the public/schools; consultancy/prototyping for local startups (eirLab and many FabLabs do this).

---

## 7. Phasing plan

**Phase 0 — Pre-launch (Months 0–3)**
Identify retrofit space; recruit 1 faculty mentor + 1 technical staff + a 6–8 student core team; draft safety SOPs and the induction/badge system; finalise Phase-1 procurement.

**Phase 1 — "Get students building" (Months 3–8) · ~₹45–65 lakh**
Retrofit one hall. Commission: FDM print farm (6), 1 laser cutter (+extraction), electronics benches (8), CAD machines (4–6), hand tools, microcontroller/robotics pool, full safety kit. **Open the doors.** This alone is a complete, lovable makerspace.

**Phase 2 — "Full FabLab" (Months 8–18) · +₹70 lakh–1 cr**
Add CNC router, large-format + resin printing, dirty-zone power tools, metrology, PCB mill/reflow, vinyl cutter, sewing/textile. Apply to join the **Fab Foundation network**. Launch competition teams (Robocon, e-Yantra, Formula Student feeder).

**Phase 3 — "Scale & specialise (CFI-style)" (Year 2+)**
Welding/metal bay, dedicated club rooms, possible new building, industry-sponsored bays, public/school outreach, startup incubation tie-in.

---

## 8. People & governance

- **Faculty mentor(s):** 1–2, light-touch, unblock funding/space, sign off on safety policy.
- **Lab engineer / manager (full-time):** keeps machines alive, owns safety, trains the student core.
- **Student core team (8–15):** elected/selected; portfolios = Operations, Inventory, Safety/Inductions, each major machine, Outreach, Finance. *This is the CFI secret sauce.*
- **Member students:** anyone who passes the general safety induction; per-machine badges unlock the gated tools.
- **Clubs/teams under the umbrella:** Robotics, Aero/Drones, 3D-printing, Electronics/IoT, Auto, Software/AI — each owning projects and competition entries.

**Access model (eirLab-style):**
`General induction → member badge` → `per-machine induction → machine badge` → `RFID access during open hours`. Dangerous machines additionally require a trained student/staff "buddy" present.

---

## 9. Risks & how to avoid the common failure modes

| Risk | Mitigation |
|---|---|
| Becomes a locked "showpiece" lab nobody uses | Open access + student governance from day one; measure footfall, not inventory |
| Extraction/ventilation skipped → laser/solder fumes, dust | Budget it as core infra in Phase 1, not an afterthought |
| Machines break and sit idle | AMC + spares budget + trained student maintainers; buy *fewer, repairable, well-supported* brands |
| No consumables budget → machines unusable | Ring-fence annual OpEx; introduce at-cost material charge-back |
| Faculty over-control kills student ownership | Mentor, don't manage; let the student core run operations |
| Safety incident shuts it all down | Induction gating, PPE, SOP cards, supervision on dangerous tools, insurance |

---

## 10. One-paragraph executive summary (for the proposal cover)

> We propose an **open-access, student-run FabLab & Innovation Center** at the new Shahpur campus, modelled on eirLab (Talence) for its digital-fabrication discipline and IIT Madras's CFI for its student-governed, competition-driven culture. Target a **~500 m² space** delivering 3D printing, laser/CNC cutting, electronics, robotics and a workshop, accessible to **every student** regardless of branch via a simple safety-induction badge system. **One-time capital ≈ ₹1.5 crore** (phased; a fully usable Phase-1 makerspace opens for ~₹50 lakh within months), with **annual operating cost ≈ ₹26–52 lakh**. The center becomes the campus's hands-on engine for tinkering, prototyping, competitions, and student startups.

---

*Notes: All costs are 2026 indicative estimates for India (INR), exclusive/inclusive of GST as marked by vendors, and should be validated with 2–3 quotations per major machine before budgeting. USD conversions at ~₹83/$.*
