# Teaching Notes

## User profile
- Layout engineer with some experience, working on a **FinFET** process in **Synopsys Custom Compiler** (so ICV / StarRC are likely the verification and extraction tools; confirm later).
- Goal is to grow in their current role toward SerDes, with the **RX front end** first.
- No deadline. Learns in short sessions whenever they can. Keep lessons small and resumable.

## Rules for me
- **Never ask for or use work PDK numbers or rules (NDA).** All numbers in lessons are *illustrative*; say so, and invite the user to compare against their own PDK privately.
- Lessons should translate into "what you'd do differently in Custom Compiler tomorrow."
- The user already knows layout basics. Don't re-teach DRC/LVS, layers or basic matching from scratch unless a gap shows up; connect new ideas to them instead.

## Practice environments (researched 2026-10-13)
- FreePDK3 (NCSU + Synopsys, predictive 3nm GAA): syncust/ for Custom Compiler, icv/, starrc/, hspice/. https://github.com/ncsu-eda/FreePDK3
- ASAP7 (7nm FinFET, predictive): Virtuoso/Calibre-oriented, no Custom Compiler port found.
- No open-source PDK you can fabricate is FinFET. Sky130 / GF180 / IHP SG13G2 are planar.

## Candidate lesson arc (revise as records accumulate)
1. RX pad-node capacitance budget and the input pole  ← lesson 0001
2. ESD at the RX input: diode sizing vs C, current path, why routing width matters
3. Termination resistor layout: matching, EM, parasitic C to substrate, common-mode node
4. Bridged T-coil: what it does, layout symmetry, keep-outs, coupling factor k
5. CTLE input pair layout: offset (Pelgrom), common-centroid in FinFET, degeneration R/C
6. Differential routing on-chip: symmetry, shielding, coupling, StarRC review

## Publishing
- Published via GitHub Pages from `main` (root): https://amoodaa.github.io/learning-analog-layout/ (repo Amoodaa/learning-analog-layout, public).
- **When adding a lesson, add a row to `index.html`** (and remove/renumber its row in "Possible next lessons"), then link the previous lesson's "Next" to it.
- The repo is public, so keep anything NDA-adjacent out of every file, including these notes.
