# FabLab / Innovation Center — Design, Equipment & Network-Membership Proposal

**For:** A new university at Sahajpur, India
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

## 4. Equipment list — best-in-class spec (India 2026 estimates)

**Procurement philosophy (the "HPC mentality"):** buy *professional-grade, serviceable, safety-first* machines, not the cheapest unit that technically works. Where a marginal ("epsilon") spend buys real gains in **uptime, output quality, repairability, local service/warranty, or operator safety**, we take the upgrade — because in an open, high-throughput student lab the lifetime cost of a flaky machine (downtime, scrapped work, frustrated users, safety incidents) dwarfs the purchase price. Named models below are concrete *anchors* for quality/price; equivalent-tier alternatives are listed so procurement can competitively quote. This list also satisfies the Fab Foundation common-inventory requirement (§8) — several picks (ShopBot, Roland mill/vinyl) *are* the Fab standard machines.

### 4.1 Digital fabrication (the FabLab core)

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Best-in-class anchor & why |
|---|---|---:|---:|---|
| FDM 3D printer — enclosed CoreXY + multi-material | 4 | 1,30,000 | 5,20,000 | **Bambu Lab X1-Carbon + AMS** — fastest reliable prosumer, multi-colour/material, hardened nozzle for CF. The student workhorse. |
| FDM 3D printer — open, ultra-serviceable | 2 | 1,00,000 | 2,00,000 | **Prusa MK4S** — open-source, every part replaceable in-house, runs for years. Insurance against vendor lock-in. |
| Engineering FDM — dual-extrusion, soluble support | 1 | 7,50,000 | 7,50,000 | **UltiMaker S7 Pro bundle** — heated chamber, PVA support, true engineering polymers (PC, PA, PETG-CF). |
| Composite FDM — continuous carbon/glass fibre | 1 | 12,00,000 | 12,00,000 | **Markforged Mark Two / Onyx Pro** — prints metal-strength functional parts (jigs, drone frames, robotics arms). Nothing else does this in-house. *(Flagship item — high value-per-rupee for serious teams.)* |
| Resin SLA — precision + closed ecosystem | 1 | 5,00,000 | 5,00,000 | **Formlabs Form 4 + Form Wash + Form Cure** — best surface finish & repeatability, engineering/dental/castable resins. |
| Large MSLA resin + wash/cure | 1 | 70,000 | 70,000 | **Elegoo Saturn 4 Ultra** (+station) — high-volume detailed prints at low cost. |
| CO₂ laser cutter 100 W + chiller + premium extraction | 1 | 12,00,000 | 12,00,000 | **Thunder Laser Nova 51 (RECI tube)** — metal frame, autofocus, rock-solid; pairs with BOFA extraction (§4.5). *(Trotec Speedy is the ~₹30 L step-up.)* |
| Fibre laser marker/cutter (metal) | 1 | 4,50,000 | 4,50,000 | **Raycus/JPT 30–50 W fibre** — engrave & mark metal, cut thin sheet; opens metalwork the CO₂ can't. |
| CNC router — full-sheet (the Fab standard) | 1 | 18,00,000 | 18,00,000 | **ShopBot PRSalpha 96×48** — the canonical Fab Lab CNC; furniture, large enclosures, mould-making. |
| Desktop precision mill — PCBs + small metal | 1 | 4,50,000 | 4,50,000 | **Roland SRM-20** (Fab standard) — clean single-/double-sided PCBs, wax/aluminium machining. |
| Desktop PCB prototyping mill (fast turn) | 1 | 5,50,000 | 5,50,000 | **Bantam Tools Desktop PCB Mill** — same-hour PCB iteration; huge for electronics/robotics teams. |
| Vinyl cutter (the Fab standard) | 1 | 1,80,000 | 1,80,000 | **Roland CAMM-1 GS-24** — stickers, stencils, flexible copper, vinyl masks for etching. |
| **Subtotal** | | | **78,70,000** | |

### 4.2 Electronics & robotics

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Best-in-class anchor & why |
|---|---|---:|---:|---|
| Soldering station — reference grade | 4 | 55,000 | 2,20,000 | **JBC CD-2BHE** — fastest tip recovery, best joints, near-indestructible. The bench everyone fights over. |
| Soldering station — quality workhorse | 4 | 25,000 | 1,00,000 | **Hakko FX-951** — reliable, cheap tips, perfect for the rest of the benches. |
| Hot-air rework stations | 2 | 60,000 | 1,20,000 | **Hakko FR-810B** — SMD/BGA rework done properly. |
| Oscilloscope — reference (350 MHz, 4-ch MSO) | 1 | 5,50,000 | 5,50,000 | **Keysight InfiniiVision DSOX3034T** — the gold-standard teaching/debug scope. |
| Oscilloscope — high-value 4-ch MSO | 3 | 1,80,000 | 5,40,000 | **Rigol MSO5074** — pro features at a fraction of the price; great for the general benches. |
| Triple-output bench PSU | 4 | 80,000 | 3,20,000 | **Keysight E36312A** — clean, programmable, protected. |
| Arbitrary function generator | 2 | 1,80,000 | 3,60,000 | **Keysight 33500B** — precise signals for real characterisation. |
| Bench DMM — 6½ digit | 2 | 1,80,000 | 3,60,000 | **Keysight 34465A** — lab-reference measurements. |
| Handheld DMM | 6 | 30,000 | 1,80,000 | **Fluke 87V** — the industry-standard rugged meter. |
| Logic analyser | 2 | 1,00,000 | 2,00,000 | **Saleae Logic Pro 16** — best protocol-decode UX, debugs any digital bus. |
| Spectrum analyser | 1 | 2,80,000 | 2,80,000 | **Siglent SSA3021X** — RF/EMC debugging for wireless & power projects. |
| SMD assembly line — P&P + reflow + stencil printer | 1 set | 9,50,000 | 9,50,000 | **Neoden 4** pick-and-place + reflow oven + stencil printer — in-house small-batch PCB assembly. |
| MCU / SBC / FPGA pool | pool | — | 5,00,000 | NVIDIA **Jetson AGX Orin** + several Orin Nano, RPi 5, ESP32, STM32, Teensy 4, **Digilent** FPGA boards — real edge-AI & embedded work. |
| Robotics platform pool | pool | — | 9,00,000 | Desktop robot arm (**UFACTORY xArm 6** / Dobot CR), **Dynamixel** smart servos, **Intel RealSense** + **Luxonis OAK-D** vision, **Livox/RPLidar**, drone dev kits, LiPo packs + smart chargers. Feeds Robocon/FS/e-Yantra teams. |
| Component inventory (genuine parts, SMD reels) + ESD storage | — | — | 3,00,000 | Quality, traceable parts; treat partly as consumable (§6). |
| **Subtotal** | | | **59,00,000** | |

### 4.3 Workshop / dirty zone

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Best-in-class anchor & why |
|---|---|---:|---:|---|
| Table saw — flesh-detection safety | 1 | 4,50,000 | 4,50,000 | **SawStop** — stops the blade in <5 ms on skin contact. In a student lab this single upgrade prevents life-changing injuries; non-negotiable. |
| Track saw + integrated dust extraction | 1 set | 1,60,000 | 1,60,000 | **Festool TS 55 + CT extractor** — precise sheet breakdown, near-zero dust. |
| Bandsaw, drill press, mitre saw (quality) | set | — | 3,20,000 | **Record Power / Bosch Professional** class — accurate, durable, induction-gated. |
| Hand & power tools | set | — | 3,00,000 | **Festool / Bosch Professional / Makita** — tools that survive shared abuse and stay accurate. |
| Bench grinder, belt/disc sander | set | — | 1,00,000 | Quality, well-guarded units. |
| Multiprocess welder (MIG/TIG/stick) + auto-darkening helmets + welding fume extractor | 1 set | 3,80,000 | 3,80,000 | **Miller/Lincoln/ESAB** multiprocess — proper welds for robotics/auto teams; dedicated fume capture. |
| Heavy workbenches + quality vises | 4 | 40,000 | 1,60,000 | Steel benches that take a beating. |
| Industrial sewing + embroidery + heat press | set | — | 1,50,000 | Soft fabrication, wearables, drone covers, composite layup. |
| **Subtotal** | | | **20,20,000** | |

### 4.4 Computing, design & metrology

| Equipment | Qty | Unit (₹) | Subtotal (₹) | Best-in-class anchor & why |
|---|---|---:|---:|---|
| CAD/CAM/sim workstations | 6 | 3,00,000 | 18,00,000 | **Dell Precision / HP Z** class, RTX 4080/A-series, 64–128 GB — heavy CAD, CAM, FEA/CFD, slicing without waiting. |
| GPU node for AI/sim training | 1 | 4,50,000 | 4,50,000 | RTX 4090 / dual-GPU — robotics vision, ML, large simulations. |
| Teaching display + 4K monitors | set | — | 2,00,000 | Large interactive display/projector + 4K screens for the teaching nook. |
| 3D scanner — pro | 1 | 6,50,000 | 6,50,000 | **EinScan HX** (or **Artec Leo** at the ~₹18 L step-up) — accurate reverse-engineering & metrology-grade capture. |
| Metrology set | set | — | 2,80,000 | **Mitutoyo** calipers/micrometers/height gauge + measuring microscope — the trusted standard. |
| **Subtotal (capital)** | | | **33,80,000** | Software is OpEx (§6); lean on FOSS (FreeCAD, KiCad, Inkscape) + a few pro seats (Fusion 360, SolidWorks education). |

### 4.5 Safety & shared equipment

| Item | Subtotal (₹) | Best-in-class anchor & why |
|---|---:|---|
| Fume extraction — laser + multi-arm solder | 6,50,000 | **BOFA** filtration — the industry premium; protects lungs and keeps the lab open during inspections. |
| Dust extraction (cyclone + ducting + drops) | 2,80,000 | Proper HEPA cyclone system for CNC/woodworking. |
| PPE (quality, sized, replenished) | 1,20,000 | Goggles, gloves, aprons, ear/lung protection, face shields, welding gear. |
| Fire suppression, smoke/heat detectors, eyewash, first aid | 1,80,000 | Including a CO₂/clean-agent extinguisher near electronics & resin. |
| Signage, induction materials, machine SOP cards, labelling | 60,000 | |
| RFID access-control system | 2,20,000 | The eirLab-style "earn the badge" per-machine access model. |
| **Subtotal** | **15,10,000** | |

---

## 5. Equipment cost summary (best-in-class build — equipment only)

| Block | Cost (₹) |
|---|---:|
| 4.1 Digital fabrication | 78,70,000 |
| 4.2 Electronics & robotics | 59,00,000 |
| 4.3 Workshop / dirty zone | 20,20,000 |
| 4.4 Computing & metrology | 33,80,000 |
| 4.5 Safety & shared equipment | 15,10,000 |
| **Equipment subtotal** | **2,06,80,000** |
| Contingency (~10%) | ~20,70,000 |
| **TOTAL equipment capital** | **≈ ₹2.27 crore** (~US$267k) |

**Three build levels (equipment only) — so the budget can be staged or trimmed:**

| Build | What you get | Equipment capital (₹) | USD approx |
|---|---|---:|---:|
| Lean / by-the-book Fab Lab | Fab Foundation core inventory, value-grade brands | 35–55 lakh | $41–65k |
| **Best-in-class (recommended)** | **the spec above — pro-grade, safety-first, edge-AI & composite capable** | **₹2.0–2.3 cr** | **$235–270k** |
| — of which "flagship stretch" items | Markforged composite, fibre laser, ShopBot, Neoden P&P, Artec scanner | ~50–60 lakh | $59–71k |

*The five "flagship stretch" items deliver capabilities nothing cheaper can match; if cash-flow demands, defer them to Phase 2 and the build still lands at a strong **≈ ₹1.6–1.7 cr** while keeping every core machine at top quality. Building, civil, electrical, HVAC and furniture remain excluded (university-provided).*

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

**How this proposal maps onto the benchmark:** the Fab Foundation range describes a *baseline* lab built with
value-grade machines. This proposal deliberately spends **~3–4× that baseline (≈ ₹2.0–2.3 cr)** because we chose
**professional-grade, serviceable, safety-first equipment** and added capabilities the bare inventory omits —
continuous-fibre composite printing, a metal-capable fibre laser, in-house PCB assembly (pick-and-place),
flesh-detection saw safety, edge-AI/robotics platforms, and metrology-grade scanning. The result is still a
fully **Fab-Foundation-compliant** lab (it contains every standard machine — ShopBot, Roland mill/vinyl, etc.),
just specced at the quality tier of a top university makerspace rather than the entry minimum. A lean,
by-the-book version remains available at **₹35–55 lakh** (table in §5) if budget is constrained.

---

## 6. Operating cost (annual, best-in-class build)

Premium machines cost a little more to run (genuine consumables, AMC/service contracts) but break far less often — the trade is fewer catastrophic failures and far higher uptime.

| Item | Annual (₹) |
|---|---:|
| Full-time technical staff (1–2: lab engineer + technician) | 8–14 lakh |
| Consumables (filament, resin, sheet stock, genuine SMD parts, blades, bits, PPE refills) | 8–14 lakh |
| Maintenance, AMC & spares (laser tube, Formlabs/UltiMaker service, ShopBot bits, calibration) | 5–10 lakh |
| Software (mostly FOSS; a few pro seats — Fusion 360, SolidWorks education) | 1–3 lakh |
| Power (high-draw machines + GPU node) | 4–7 lakh |
| Competitions, project grants, hackathons, travel | 5–15 lakh |
| Fab network participation (membership free; Fab Academy tuition optional — see §8) | 0–8 lakh |
| **Total OpEx** | **≈ ₹31–71 lakh / year** |

**Sustainability levers:** small per-print/material charge-back at cost; sponsored club teams; industry-sponsored machines (named bays); paid weekend workshops for the public/schools (also satisfies the public-access requirement, §8); consultancy/prototyping for local startups (eirLab and many FabLabs do this).

---

## 7. Phasing plan (equipment)

**Phase 0 — Pre-launch (Months 0–3)**
University allocates space + utilities; recruit 1 faculty mentor + 1 technical staff + a 6–8 student core team; draft safety SOPs and the induction/badge system; finalise Phase-1 procurement; **publicly endorse the Fab Charter** (§8).

**Phase 1 — "Get students building" (Months 3–8) · equipment ≈ ₹70–90 lakh**
Commission the everyday core at full quality: FDM print farm (Bambu ×4 + Prusa ×2), Formlabs resin, the CO₂ laser (+BOFA extraction), premium electronics benches (JBC/Keysight/Rigol), workstations, SawStop + core power tools, the MCU/robotics pool, and the full safety kit. **Open the doors** with public-access hours. This alone is a complete, lovable, top-tier makerspace and already meets the Fab common-tools criterion.

**Phase 2 — "Full FabLab + flagship capabilities" (Months 8–18) · +equipment ≈ ₹1.2–1.4 cr**
Add the ShopBot CNC, Markforged composite printer, fibre laser, UltiMaker engineering FDM, Neoden pick-and-place line, Roland/Bantam mills + vinyl, EinScan scanner, welding bay, and GPU node. **Register on fablabs.io and join the Fab Foundation network** (§8). Launch competition teams (Robocon, e-Yantra, Formula Student feeder).

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

> We propose an **open-access, student-run FabLab & Innovation Center** at the new Sahajpur campus, modelled on eirLab (Talence) for its digital-fabrication discipline and IIT Madras's CFI for its student-governed, competition-driven culture, and built to the **MIT/Fab Foundation common-inventory standard** so it can **join the global Fab Lab network**. Equipment is specced **best-in-class** — professional-grade, serviceable, safety-first — including continuous-fibre composite 3D printing, a full-sheet ShopBot CNC, CO₂ + fibre lasers, in-house PCB pick-and-place, flesh-detection saw safety, and edge-AI/robotics platforms. Using university-provided space, the **equipment outlay is ≈ ₹2.0–2.3 crore** (~US$235–270k; phased, with a complete top-tier Phase-1 makerspace for ≈ ₹70–90 lakh; a lean by-the-book alternative is ₹35–55 lakh), delivering 3D printing, laser/CNC cutting, electronics, robotics and a workshop accessible to **every student** via a simple safety-induction badge system. **Annual operating cost ≈ ₹31–71 lakh.** Network registration on fablabs.io is **free** once the four Fab Charter criteria are met. The center becomes the campus's hands-on engine for tinkering, prototyping, competitions, and student startups — and a recognised node on the worldwide Fab Lab map.

---

*Notes: All costs are 2026 indicative estimates for India (INR), exclusive/inclusive of GST as marked by vendors, and should be validated with 2–3 quotations per major machine before budgeting. USD conversions at ~₹85/$. Building, civil, electrical, HVAC and furniture costs are intentionally excluded.*

**Sources:** [Fab Foundation — Getting Started](https://fabfoundation.org/getting-started/) · [The Fab Charter (MIT CBA)](https://fab.cba.mit.edu/about/charter/) · [fablabs.io registry](https://www.fablabs.io/) · [Fab Foundation — global community](https://fabfoundation.org/global-community/) · [Fab Foundation UK — how to set up a FabLab](https://www.fabfoundationuk.org/how-to-set-up-a-fablab/)
