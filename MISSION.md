# Mission: SerDes RX Front-End Layout

## Why
I already do layout on a FinFET process (Synopsys Custom Compiler) and want to grow into SerDes work, starting with the receiver front end: pad, ESD, termination, T-coil, CTLE and the path into the sampler. When I can do this, I can own an RX front-end layout and have an informed conversation with the circuit designer about parasitics, matching and bandwidth, instead of just following their floorplan.

## Success looks like
- Explain, for each piece of the RX front end, which layout parasitics matter and why (bandwidth, return loss, offset, EM/ESD robustness).
- Estimate the input-node capacitance budget and its bandwidth cost before drawing anything.
- Lay out a differential RX input path (pad → ESD → termination → CTLE input pair) with good symmetry, and defend every choice in a design review.
- Read StarRC/extraction results and point to the layout geometry behind the worst parasitics.
- Understand the layout constraints on T-coils and inductors (symmetry, keep-outs, coupling, ESD current path).

## Constraints
- Self-paced, no deadline. Learns whenever there's time.
- The work PDK is under NDA. Lessons stay process-generic, and work numbers never come into this workspace.
- Hands-on options: work PDK in Custom Compiler (if the lead approves), FreePDK3 (NCSU + Synopsys, GAA, ships Custom Compiler/ICV/StarRC files), or KLayout + IHP SG13G2/Sky130 at home.

## Out of scope
- TX driver, PLL/VCO, CDR loop design (for now).
- Circuit design itself: transistor sizing and equalizer tuning. Learn just enough to talk with the designer.
- Package/PCB signal integrity beyond the bump.
