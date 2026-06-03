# FabLab — Building Architecture Concept

**Project:** FabLab / Innovation Center, new university at Shahpur
**Companion to:** [the design/equipment/cost proposal](README.md)
**Design driver:** *modular hexagonal honeycomb + automation-first (robot-cleanable, AMR-ready) interior.*
**Date:** June 2026

> Same philosophy as the hexagonal HPC building: a **honeycomb of hexagonal cells** around a central hub. Hexagons tile with no gaps, expand organically (add cells as the lab grows), and replace tight 90° corners with open 120° angles — which is exactly what robotic floor-cleaners and material-handling robots want: no dead corners, smooth continuous loops, predictable paths.

---

## 1. Why a hexagonal honeycomb (carrying over the HPC logic)

| Property of the hex grid | What it buys the FabLab |
|---|---|
| **Tiles infinitely, no gaps** | Phased growth — start with hub + 3 cells, snap on more cells later without redesign (matches the proposal's Phase 1→3 plan). |
| **120° internal angles, no acute corners** | No dust-trap corners; cleaning robots reach every edge; airflow/extraction sweeps cleanly. |
| **Short, equal cell-to-hub distances** | Central hub = circulation + induction gate + material logistics; every workshop cell is one short, straight spoke away. |
| **Each cell is an isolatable "pod"** | Fume/noise/dust segregation by cell (dirty CNC vs. clean digital vs. ESD electronics) with independent ventilation — without breaking the open-access feel. |
| **Naturally radial servicing** | Power, data, compressed air, dust-extraction all run from the hub outward through the ceiling — floors stay clear. |

---

## 2. Automation-first interior — the "robot-cleanable" rulebook

This is the part that makes the difference. A makerspace generates dust, swarf, offcuts and spills; we design so an **autonomous scrubber-dryer fleet** (e.g. Avidbots Neo / SoftBank Whiz class) cleans the whole floor nightly, and **AMRs** (autonomous mobile robots) ferry stock between the store and the cells.

**Floor & edges**
1. **One continuous floor plane, one material per zone, level thresholds (≤6 mm, ideally flush).** Robots stall on lips and transitions — so the whole building is single-level with flush junctions between cells.
2. **Poured/polished surfaces:** sealed polished concrete or industrial epoxy (ESD-dissipative epoxy in the electronics cell; chemical-resistant in the dirty cell). Non-porous, wipeable, no grout lines.
3. **Coved skirting (≈50 mm radius) at every floor-to-wall junction** — eliminates the 90° crevice where dust packs; scrubbers clean right to the wall.
4. **Matte, non-reflective floor finish** so robot LiDAR/cliff sensors aren't fooled (glossy floors read as voids/obstacles).

**Keep the floor clear (services overhead)**
5. **No floor cabling, ever.** Power, data, and compressed air drop from an **overhead busbar + retractable reel grid**; machines are fed from above. This is the single biggest enabler of robot cleaning and of reconfiguration.
6. **Furniture on lockable heavy-duty casters or wall-hung**, with ≥120 mm toe clearance under any fixed cabinetry, so robots clean underneath. Benches relocate without an electrician.
7. **Wide, straight primary aisles (1.8 m)** on a clear orthogonal-within-hex grid + a **1.2 m perimeter loop** in each cell → trivial robot path-planning and easy human egress.

**Containment so robots handle only fines**
8. **At-source dust/fume extraction on every dirty machine** (BOFA/cyclone, per the equipment list) and **negative pressure in the dirty cell** — the cleaning robot mops up residual fines, not piles of swarf.
9. **Trench/floor drains + wash-down gradient (1:100) in the dirty and dirty-wet cells** so wet scrubbers can dump and the floor can be hosed.

**Docks & charging**
10. **A cleaning-robot dock (charge + auto water fill/empty) per cell**, tucked into a hex corner off the aisle; **AMR charging + a pickup/dropoff "kanban" bay** at the hub edge of each cell.
11. **Auto doors / robot-height openings between cells** (or always-open 1.8 m portals with air curtains for the clean/dirty boundary) so robots cross cells without human help.

---

## 3. Plan geometry & sizing (Standard tier ≈ 600–650 m²)

A **flower of 7 hexagons**: 1 central hub + 6 function cells.

- **Regular hex cell:** edge *s* ≈ 5.9 m → **≈ 10.2 m across the flats**, **≈ 90 m² each**.
- **6 cells + hub** ≈ 7 × 90 = **630 m²** usable (matches the ~500–650 m² Standard target).
- **Growth:** Phase 1 builds the hub + 3 cells (~360 m²); Phases 2–3 snap the remaining cells, then an **outer honeycomb ring** for the Flagship tier (1,000–1,500 m²) — no demolition, the grid just extends.

```
                        ________
                       /        \
                      /  CELL 1  \
                     /  CLEAN     \
                     \  DIGITAL   /
            ________  \  FAB     /  ________
           /        \  \________/  /        \
          /  CELL 6  \  /      \  /  CELL 2  \
         /  STORE +   \/        \/  ELECTRONICS\
         \  AMR HUB   /\  HUB   /\  & ROBOTICS /
          \          /  \ recep/  \          /
           \________/   \ tion/    \________/
           /        \    \ gate/   /        \
          /  CELL 5  \    \____/   /  CELL 3  \
         /   DESIGN    \  /     \  /   HEAVY    \
         \   STUDIO +  / /       \ \  WORKSHOP  /
          \  COMPUTE  / /  CELL 4 \ \  (high   /
           \________/  \  FLEX /   /  bay)   /
                        \ PROJECT \ /________/
                         \  BAYS  /
                          \______/
```

*(Schematic — hub in the center, six cells around it; clean/quiet cells on one side, dirty/loud on the opposite side, logistics adjacent to the dirty cell's roller shutter.)*

### Section / heights
- **Heavy Workshop cell:** **6 m clear** high-bay (ShopBot gantry clearance, big stock, overhead extraction; option for a small jib/gantry hoist), roller-shutter to outside for deliveries.
- **All other cells:** **4 m clear** + a **1.0–1.5 m overhead service plenum** carrying the busbars, extraction trunking, lighting and sprinklers.
- **Hub:** double-height/skylit if budget allows — daylight, project-exhibition wall, the "wow" social heart (CFI-style).

---

## 4. Cell-by-cell brief

| Cell | Function | Floor | Environment | Robot/clean notes |
|---|---|---|---|---|
| **1 — Clean Digital Fab** | 3D-print farm, Formlabs resin, CO₂ + fibre lasers | Sealed epoxy | AC + filtration; laser exhaust to roof | Resin/laser fumes captured at source; scrubber-friendly open bays between print racks |
| **2 — Electronics & Robotics** | ESD benches, instrument benches, robot test arena | **ESD-dissipative epoxy** | AC, controlled humidity | Cast-resin floor continuous under benches (on casters); flat robot-arena pad |
| **3 — Heavy Workshop (dirty)** | ShopBot CNC, welding bay, woodworking, metal | Chemical-resistant epoxy w/ **trench drain**, 1:100 fall | **Negative pressure**, heavy dust + welding-fume extraction | High-bay; roller shutter; wash-down; coved everything; robot mops fines only |
| **4 — Flex / Project / Club bays** | Reconfigurable team rooms, competition builds, startup incubation | Epoxy | Neutral | Everything on casters + overhead power → fully robot-cleanable when cleared |
| **5 — Design Studio + Compute** | CAD/CAM/sim workstations, teaching nook, 3D scanning | Sealed concrete / soft acoustic zones | Quiet, AC | Acoustic but hard-floored loops for robots; rugs avoided |
| **6 — Materials Store + AMR Hub** | Filament/sheet/resin store, tool crib, finished-project shelving, hazmat cabinet | Epoxy | Ventilated; fire-rated hazmat zone | **AMR home base**: stock picked here and delivered to cells; adjacent to dirty-cell shutter for deliveries |
| **HUB (center)** | Reception, RFID induction gate, social/exhibition, primary circulation | Polished concrete | Daylit, welcoming | All service spokes originate here; AMR/cleaning-robot main thoroughfare |

---

## 5. Materials & finishes schedule (chosen for cleanability)

| Element | Spec | Why |
|---|---|---|
| Floor (clean cells) | Polished concrete or PU/epoxy, matte, sealed | Non-porous, robot-LiDAR friendly, no grout |
| Floor (electronics) | ESD-dissipative epoxy, earthed | Static-safe + wipeable |
| Floor (dirty cell) | Chemical-resistant epoxy + trench drain, slip-rated | Wash-down, swarf/coolant tolerant |
| Skirting | 50 mm coved (integral with floor) | No dust-trap corner |
| Walls | Sealed/painted block or demountable panels, wipeable to 2 m | Reconfigurable, cleanable |
| Ceiling | Open service grid / accessible plenum | Services overhead, easy maintenance |
| Glazing | Vision panels between cells (not full-height mirror-glass) | Visibility + supervision; avoids robot-sensor confusion |
| Doors/portals | 1.8 m flush thresholds, auto/air-curtain at clean↔dirty | Robot crossing + fume separation |

---

## 6. Cleaning & logistics robot fleet (operational concept — Pudu Robotics)

Spec the fleet around **Pudu Robotics** — they cover both jobs (floor care + delivery) on one auto-docking platform with a shared cloud fleet-management/IoT layer, which keeps integration simple.

- **Floor care — Pudu CC1.** The CC1 is Pudu's all-in-one commercial cleaning robot: **sweep + vacuum + scrub + mop** in one unit, with auto water refill/drainage and self-docking. One CC1 comfortably covers the ~600 m² honeycomb in a single overnight pass; the **PUDU MT1** (modular cleaning) is the heavier-duty alternative for the dirty cell. A dock sits in a corner of each cell.
- **Material handling — Pudu T300 / HolaBot.** The **PUDU T300** is an industrial AMR built for factory/warehouse delivery (high, flexible payload) — ideal for ferrying filament/sheet/resin totes from the Store cell to the workshop cells along the wide hub spokes. For lighter front-of-house runs, **HolaBot** (heavy multi-tray delivery) or **BellaBot** works. A "campus Amazon" for stock and returned tools.
- **One fleet brain.** Both run on Pudu's fleet platform with elevator/door/IoT integration, so the cleaning and delivery robots share maps, schedules, and the auto-doors/portals between cells (§2 rule 11).
- **Why the architecture matters:** clear floors (overhead services), flush ≤6 mm thresholds, 50 mm coved edges, matte non-reflective finish, and 1.8 m straight loops are exactly the conditions a Pudu CC1/T300 needs to run unattended at high coverage. Designing for them now costs ~epsilon; retrofitting later is expensive.

---

## 7. How this ties back to the cost/equipment proposal

- The **6-cell zoning maps 1:1** onto the equipment zones in the proposal (digital fab, electronics/robotics, workshop, computing, storage, flex).
- **Phasing aligns:** Hub + Cells 1, 2, 5 = the Phase-1 ₹70–90 lakh top-tier makerspace; Cells 3, 4, 6 + outer ring = Phase 2–3.
- Building/civil cost stays **out of the equipment budget** (university-provided), per your instruction — this document specifies *what the building must be*, so the architects/PWD can cost it.

---

## 8. Quick spec sheet

| Item | Value |
|---|---|
| Geometry | Hex honeycomb: 1 hub + 6 cells (Standard); outer ring for Flagship |
| Usable area | ~630 m² (Standard); ~360 m² Phase-1; 1,000–1,500 m² Flagship |
| Hex cell | ~10.2 m across flats, ~90 m² each |
| Clear heights | 6 m (workshop high-bay), 4 m (other cells) + 1–1.5 m plenum |
| Floors | Matte sealed epoxy/concrete; ESD in electronics; drained+chem-resistant in dirty |
| Skirting | 50 mm coved throughout |
| Services | 100% overhead (busbar + reels); zero floor cabling |
| Aisles | 1.8 m primary spokes; 1.2 m cell perimeter loops |
| Cleaning | Pudu **CC1** (sweep/vac/scrub/mop) + **MT1** for dirty cell; dock per cell, nightly run |
| Logistics | Pudu **T300** industrial AMR (+ HolaBot/BellaBot); home base in Store cell, hub-spoke delivery |
| Expansion | Snap-on hex cells; no demolition |
