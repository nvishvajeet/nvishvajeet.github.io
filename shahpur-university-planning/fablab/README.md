# FabLab / Innovation Center — Design, Equipment & Network-Membership Proposal

**For:** A new university at Shahpur, India
**Prepared by:** Vishvajeet N (drawing on hands-on experience at eirLab, Talence)
**Reference models:** eirLab (ENSEIRB-MATMECA, Talence/Bordeaux) · CFI — Center For Innovation (IIT Madras) · MIT / Fab Foundation FabLab standard
**Date:** June 2026 · **Currency:** INR (USD reference where useful)
**Scope of costing:** equipment + operating costs only. **Building / civil / fit-out costs are deliberately excluded** (assumed provided by the university as space + utilities).

> One-line vision: *A student-run, open-access workshop where any student — regardless of branch or year — can walk in, learn to use a tool safely, and build a physical thing: a circuit, a robot, a 3D print, a laser-cut part, a product prototype.*

---

## 1. Guiding principles

These are the things that make CFI and eirLab work, distilled.

1. **Open access, not a locked teaching lab.** Long opening hours (ideally near-24/7 with student staff), no requirement to be enrolled in a specific course. This is the single biggest differentiator from a normal department lab — and, as Section 8 shows, it's also a hard requirement for joining the Fab Lab network.
2. **Student-run, faculty-backed.** A small core student team runs day-to-day operations (inventory, inductions, machine maintenance). One or two faculty mentors + one full-time technical staff member provide continuity. CFI is almost entirely student-governed; that ownership is *why* it thrives.
3. **Safety as the gate, not bureaucracy as the gate.** Access to a machine = pass a short safety induction for that machine. Everything else stays low-friction.
4. **Tiered tooling.** Cheap, abundant, beginner-safe tools (FDM printers, soldering, hand tools) in the open. Expensive/dangerous tools (laser, CNC, table saw) behind induction + supervision.
5. **Start lean, design for growth.** Phase the equipment buy. A working lab students love beats an empty showpiece.
6. **Project culture over inventory.** Budget for competitions (Robocon/ABU, Formula Student, e-Yantra, hackathons), club projects, and consumables — not just one-time machines.

---

## 2. Reference models — what to borrow from each

| Model | What it is | Borrow this |
|---|---|---|
| **eirLab (Talence)** | University FabLab at ENSEIRB-MATMECA, part of the global Fab Foundation network | Fab Foundation equipment standard, induction/badge system, open membership, digital fabrication focus |
| **CFI (IIT Madras)** | Large student-run innovation center with themed clubs (Aero, Robotics, 3D printing, Electronics, etc.) | Student governance, club structure, competition teams, 24/7 access culture |
| **MIT / Fab Foundation** | The original "Fab Lab" inventory spec + global network | A globally recognised, vendor-neutral equipment checklist; membership in the international network (Section 8) |

**Recommendation:** Adopt the **Fab Foundation equipment baseline** (so you can call it a real "FabLab" and join the network), but organise the *people* and *culture* the **CFI way** (student clubs + competition teams + open access).

---

## 3. Space requirements (university to provide)

Space and civil works are assumed to be provided by the university; no building cost is included here. What the lab *needs* from the space:

### 3.1 Size

| Tier | Usable area | Concurrent users |
|---|---|---|
| **Starter** | ~200 m² (~2,150 ft²) | 30–40 |
| **Standard FabLab** (recommended target) | ~500 m² (~5,400 ft²) | 60–90 |
| **Flagship (CFI-scale)** | 1,000–1,500 m² | 150+ |

A single large hall plus 2–3 partitionable rooms is enough to start. Ground-floor access (for moving heavy machines/stock) is strongly preferred.

### 3.2 Zoning (noise, dust, fumes, and safety segregation)

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

### 3.3 Utilities the space must supply (no cost charged to lab budget here)

- **3-phase power** + distributed sockets, RCD/ELCB protection, separate circuits for high-draw machines (laser, CNC, welder).
- **Fume & dust extraction routing** (the extraction *equipment* is in the lab budget, Section 4.5; the ducting/openings to outdoors are a building item).
- **Ventilation & AC** for the dry/electronics/digital zones; the wet zone can be naturally ventilated.
- **Compressed air** point for the dirty zone.
- **Fire-safety provisioning**, marked exits, water point for eyewash.
- **ESD-safe flooring** in the electronics zone; epoxy/concrete in the dirty zone.
- **Wide door / roll-up shutter** to the dirty zone.

---

## 4. Equipment list — by zone (India 2026 price estimates)

Prices are realistic street estimates for India in 2026 and will vary with brand, GST, and education discounts. "Qty" reflects the **Standard tier**. This list is built to **satisfy the Fab Foundation common-inventory requirement** (Section 8).

### 4.1 Digital fabrication (the FabLab core)

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Notes |
|---|---|---:|---:|---|
| FDM 3D printers (Bambu/Creality class) | 6 | 40,000 | 2,40,000 | The workhorse "print farm". Quantity > fanciness. |
| Resin (SLA/MSLA) printer + wash/cure | 1 | 60,000 | 60,000 | Fine detail; needs ventilation + PPE. |
| Large-format / engineering FDM | 1 | 4,00,000 | 4,00,000 | Bigger build volume, engineering filaments. |
| CO₂ laser cutter/engraver, 60–100 W + chiller + exhaust | 1 | 5,00,000 | 5,00,000 | Acrylic/wood/MDF. Bed ~600×900 mm+. The most-loved machine in any fablab. |
| CNC router (desktop→benchtop) | 1 | 2,50,000 | 2,50,000 | Wood/plastic/soft metal. |
| Vinyl cutter / plotter | 1 | 50,000 | 50,000 | Stickers, stencils, flexible-circuit/copper. |
| **Subtotal** | | | **15,00,000** | |

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
| **Subtotal** | | | **15,18,000** | |

### 4.3 Workshop / dirty zone

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Notes |
|---|---|---:|---:|---|
| Workbenches + vises (heavy) | 4 | 25,000 | 1,00,000 | |
| Drill press, band saw, table saw, mitre saw | set | — | 2,50,000 | Induction-gated. |
| Hand & power tools (drills, drivers, Dremel, etc.) | set | — | 1,50,000 | |
| Bench grinder, belt/disc sander | set | — | 60,000 | |
| MIG/TIG or arc welder + safety gear | 1 | 1,20,000 | 1,20,000 | Phase 2 optional; serious ventilation needed. |
| Sewing/textile machine + heat press (Fab standard) | 1 | 45,000 | 45,000 | Soft fabrication, wearables, drone covers. |
| **Subtotal** | | | **7,25,000** | |

### 4.4 Computing, design & metrology

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Notes |
|---|---|---:|---:|---|
| CAD/CAM workstations (GPU, for CAD + slicing + sim) | 6 | 1,20,000 | 7,20,000 | |
| Large monitor + projector for teaching nook | — | — | 80,000 | |
| Calipers, micrometers, multimeters (qty), bench tools | — | — | 60,000 | |
| 3D scanner *(optional)* | 1 | 1,50,000 | 1,50,000 | Reverse engineering. |
| **Subtotal (capital)** | | | **10,10,000** | Software is OpEx (Section 6); lean on FOSS — FreeCAD, KiCad, Inkscape. |

### 4.5 Safety & shared equipment

| Item | Subtotal (₹) | Notes |
|---|---:|---|
| Fume extraction arms, dust collector, laser exhaust blower | 4,00,000 | Often under-budgeted — don't. |
| PPE: goggles, gloves, aprons, ear/lung protection, face shields | 60,000 | |
| Fire extinguishers, smoke/heat detectors, eyewash, first aid | 1,00,000 | |
| Signage, induction materials, machine SOP cards, labelling | 40,000 | |
| Access control / RFID badge system (ties to induction) | 1,50,000 | The eirLab-style "earn the badge" model. |
| **Subtotal** | **7,50,000** | |

---

## 5. Equipment cost summary (Standard tier — equipment only)

| Block | Cost (₹) |
|---|---:|
| 4.1 Digital fabrication | 15,00,000 |
| 4.2 Electronics & robotics | 15,18,000 |
| 4.3 Workshop / dirty zone | 7,25,000 |
| 4.4 Computing & metrology | 10,10,000 |
| 4.5 Safety & shared equipment | 7,50,000 |
| **Equipment subtotal** | **55,03,000** |
| Contingency (~10%) | ~5,50,000 |
| **TOTAL equipment capital** | **≈ ₹60.5 lakh** (~US$71k) |

**Tier comparison (equipment only):**

| Tier | Equipment capital (₹) | USD approx |
|---|---:|---:|
| Starter | 25–35 lakh | $30–41k |
| **Standard (recommended)** | **55–65 lakh** | **$65–76k** |
| Flagship / CFI-scale | 1.5–3 cr | $176–353k |

*(Building, civil, electrical, HVAC and furniture are excluded by request and are to be provided by the university.)*

---

## 5a. Benchmarked against the official Fab Foundation equipment standard

The Fab Foundation publishes canonical "what does a Fab Lab cost" figures for **machines + consumables only**
(source: [Getting Started with Fab Labs](https://fabfoundation.org/getting-started/), referenced from
[Growing the Fab Lab Network](https://fabfoundation.org/blog/growing-fab-lab-network)). At ~₹85/US$ (2026):

| Fab Foundation official figure | USD | INR (≈ ₹85/$) |
|---|---:|---:|
| Capital equipment (MIT inventory list) | $25,000 – $65,000 | ₹21 – 55 lakh |
| Initial consumables | $15,000 – $40,000 | ₹13 – 34 lakh |
| **Subtotal to stand up a "regular" Fab Lab** | **$40,000 – $105,000** | **₹34 – 89 lakh** |
| Mobile Fab Lab (reference only) | $298,000 | ≈ ₹2.5 crore |

*(UK chapter quotes the equivalent £30–80k capital + £10–25k consumables.)*

**How this proposal maps onto the benchmark:** the Standard equipment line above (**≈ ₹55–60 lakh**) sits right
at the **top of the official Fab Foundation capital range** (₹21–55 lakh). It runs to the upper bound because it
adds robotics/AI boards, a 6-printer farm, and dirty-zone power tools that the bare inventory omits. Because
building/fit-out is excluded here, **this proposal's headline number is now essentially the same as the official
Fab Foundation equipment figure** — i.e. we are budgeting a genuine, by-the-book Fab Lab.

---

## 6. Operating cost (annual, Standard tier)

| Item | Annual (₹) |
|---|---:|
| Full-time technical staff (1–2: lab engineer + technician) | 8–14 lakh |
| Consumables (filament, sheets, resin, electronic components, blades, bits, PPE refills) | 6–10 lakh |
| Maintenance & spares (laser tube, nozzles, belts, AMC) | 3–5 lakh |
| Software licences (minimise via FOSS) | 1–2 lakh |
| Power (high-draw machines) | 3–6 lakh |
| Competitions, project grants, hackathons, travel | 5–15 lakh |
| Fab network participation (membership is free; Fab Academy tuition optional — see §8) | 0–8 lakh |
| **Total OpEx** | **≈ ₹26–60 lakh / year** |

**Sustainability levers:** small per-print/material charge-back at cost; sponsored club teams; industry-sponsored machines (named bays); paid weekend workshops for the public/schools (also satisfies the public-access requirement, §8); consultancy/prototyping for local startups (eirLab and many FabLabs do this).

---

## 7. Phasing plan (equipment)

**Phase 0 — Pre-launch (Months 0–3)**
University allocates space + utilities; recruit 1 faculty mentor + 1 technical staff + a 6–8 student core team; draft safety SOPs and the induction/badge system; finalise Phase-1 procurement; **publicly endorse the Fab Charter** (§8).

**Phase 1 — "Get students building" (Months 3–8) · equipment ≈ ₹28–35 lakh**
Commission: FDM print farm (6), 1 laser cutter (+extraction), electronics benches (8), CAD machines (4–6), hand tools, microcontroller/robotics pool, full safety kit. **Open the doors** with public-access hours. This alone is a complete, lovable makerspace and already meets the common-tools criterion.

**Phase 2 — "Full FabLab" (Months 8–18) · +equipment ≈ ₹20–28 lakh**
Add CNC router, large-format + resin printing, dirty-zone power tools, metrology, PCB mill/reflow, vinyl cutter, sewing/textile. **Register on fablabs.io and join the Fab Foundation network** (§8). Launch competition teams (Robocon, e-Yantra, Formula Student feeder).

**Phase 3 — "Scale & specialise (CFI-style)" (Year 2+)**
Welding/metal bay, dedicated club rooms, industry-sponsored bays, public/school outreach, startup incubation tie-in, optional Fab Academy node.

---

## 8. Joining the global Fab Lab network (Fab Foundation) — requirements & application procedure

Becoming a recognised Fab Lab is **free to register** — the "cost" is meeting the criteria below (the equipment in §4 and open-access hours in §1 already do most of the work). Membership gives you the right to use the **FabLab name and logo** (useful for fundraising), a pin on the **world map**, access to the **Fab Academy** programme, and participation in the global community.

### 8.1 The four requirements (from the Fab Charter)

A space qualifies as a Fab Lab when it meets **all four**:

1. **Public access.** The lab must be open to the public — free or on an in-kind/barter basis — **at least part of the time each week**. (Our open-access model in §1 satisfies this; formalise specific public hours.)
2. **Subscribe to the Fab Charter.** Operate by, and publicly endorse, the [Fab Charter](https://fab.cba.mit.edu/about/charter/) — its statements on mission, access, responsibilities, secrecy (designs/processes are shared), and business.
3. **Share the common tool set & processes.** Use broadly the same core machines and software as other Fab Labs (the MIT inventory) so that a project made in one lab can be reproduced in another. Our §4 list is built to this standard.
4. **Participate in the Fab Lab network.** Engage with the wider community — global video conferences, the annual **Fab** conference, knowledge-sharing, and (optionally) hosting/sending students to **Fab Academy**.

### 8.2 Step-by-step application procedure

1. **Build to the four criteria.** Confirm the §4 inventory covers the common tool set, and commit to weekly public-access hours.
2. **Endorse the Fab Charter** publicly (web page / signage in the lab).
3. **Create a personal account** on the network registry at **[fablabs.io](https://www.fablabs.io/signup)**.
4. **Register the lab** at **[fablabs.io/labs/new](https://www.fablabs.io/labs/new)** — add location, photos, equipment, contact, and opening hours. The lab appears on the [world map](https://www.fablabs.io/labs/map).
5. **Set status `planned` → `active`** once the lab is operational and meeting public-access hours. Submissions pass through a community/regional **approval** step.
6. **Connect with the regional network.** For India/South Asia, engage with the existing Indian Fab Lab community (e.g. **Vigyan Ashram, Pabal** — Asia's first Fab Lab) and the regional Fab coordination for endorsement and mentoring.
7. **Plug into Fab Academy (optional but recommended).** Enrol your technical staff / lead students in **Fab Academy** ("How To Make (Almost) Anything"), or apply to become a **local node** that hosts students. This is the strongest signal of network participation and trains your team on the standard toolchain. *(Budget note: Fab Academy tuition has historically been on the order of US$5k/student/year; hosting as a node spreads this — reflected as the optional ₹0–8 lakh line in §6.)*
8. **Use the logo** in fundraising and signage once you meet all criteria and are "in synchrony with the Fab Lab form and spirit," as the Fab Foundation phrases it.

### 8.3 What it costs (network side)

| Item | Cost |
|---|---|
| Registering on fablabs.io / world-map listing | **Free** |
| Using the FabLab name & logo (once compliant) | Free |
| Meeting the common-inventory requirement | Already in §4 equipment budget |
| Committing to public-access hours | Operational policy, no capital cost |
| Fab Academy (optional, per student or as a node) | ~US$5k/student/yr historically — optional |

---

## 9. People & governance

- **Faculty mentor(s):** 1–2, light-touch, unblock funding/space, sign off on safety policy.
- **Lab engineer / manager (full-time):** keeps machines alive, owns safety, trains the student core.
- **Student core team (8–15):** elected/selected; portfolios = Operations, Inventory, Safety/Inductions, each major machine, Outreach, Finance. *This is the CFI secret sauce.*
- **Member students:** anyone who passes the general safety induction; per-machine badges unlock the gated tools.
- **Clubs/teams under the umbrella:** Robotics, Aero/Drones, 3D-printing, Electronics/IoT, Auto, Software/AI — each owning projects and competition entries.

**Access model (eirLab-style):**
`General induction → member badge` → `per-machine induction → machine badge` → `RFID access during open hours`. Dangerous machines additionally require a trained student/staff "buddy" present.

---

## 10. Risks & how to avoid the common failure modes

| Risk | Mitigation |
|---|---|
| Becomes a locked "showpiece" lab nobody uses | Open access + student governance from day one; measure footfall, not inventory (also a §8 requirement) |
| Extraction/ventilation skipped → laser/solder fumes, dust | Keep extraction equipment in the lab budget (§4.5); ensure the space provides ducting |
| Machines break and sit idle | AMC + spares budget + trained student maintainers; buy *fewer, repairable, well-supported* brands |
| No consumables budget → machines unusable | Ring-fence annual OpEx; introduce at-cost material charge-back |
| Faculty over-control kills student ownership | Mentor, don't manage; let the student core run operations |
| Safety incident shuts it all down | Induction gating, PPE, SOP cards, supervision on dangerous tools, insurance |

---

## 11. One-paragraph executive summary (for the proposal cover)

> We propose an **open-access, student-run FabLab & Innovation Center** at the new Shahpur campus, modelled on eirLab (Talence) for its digital-fabrication discipline and IIT Madras's CFI for its student-governed, competition-driven culture, and built to the **MIT/Fab Foundation common-inventory standard** so it can **join the global Fab Lab network**. Using university-provided space, the **equipment outlay is ≈ ₹55–65 lakh** (~US$65–76k; phased, with a complete Phase-1 makerspace for ≈ ₹30 lakh), delivering 3D printing, laser/CNC cutting, electronics, robotics and a workshop accessible to **every student** via a simple safety-induction badge system. **Annual operating cost ≈ ₹26–60 lakh.** Network registration on fablabs.io is **free** once the four Fab Charter criteria are met. The center becomes the campus's hands-on engine for tinkering, prototyping, competitions, and student startups — and a recognised node on the worldwide Fab Lab map.

---

*Notes: All costs are 2026 indicative estimates for India (INR), exclusive/inclusive of GST as marked by vendors, and should be validated with 2–3 quotations per major machine before budgeting. USD conversions at ~₹85/$. Building, civil, electrical, HVAC and furniture costs are intentionally excluded.*

**Sources:** [Fab Foundation — Getting Started](https://fabfoundation.org/getting-started/) · [The Fab Charter (MIT CBA)](https://fab.cba.mit.edu/about/charter/) · [fablabs.io registry](https://www.fablabs.io/) · [Fab Foundation — global community](https://fabfoundation.org/global-community/) · [Fab Foundation UK — how to set up a FabLab](https://www.fabfoundationuk.org/how-to-set-up-a-fablab/)
