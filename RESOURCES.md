# SerDes RX Front-End Layout Resources

## Knowledge

- [Lecture slides: Sam Palermo, ECEN 720 High-Speed Links, Lecture 6 "RX Circuits" (Texas A&M, 2025)](https://people.engr.tamu.edu/spalermo/ecen689/lecture6_ee720_rx_circuits.pdf)
  The best free, current overview of the RX chain: T-coil input networks from ISSCC 2019 papers, the AFE (CTLE/VGA), comparators and offset correction. Use for: block order, what each block needs, the offset vs. area scaling (2× less offset needs 4× area).
- [Lecture slides: Palermo, ECEN 720 Lecture 8 "RX Equalization" (CTLE/FIR/DFE)](https://people.engr.tamu.edu/spalermo/ecen689/lecture8_ee720_rx_adaptive_eq.pdf)
  Use for: CTLE topology (R/C source degeneration), peaking, and what the designer is tuning.
- [Lecture slides: Palermo, ECEN 620 "High-Speed I/O Overview"](https://people.engr.tamu.edu/spalermo/ecen620/lecture16_ee620_high_speed_io_overview.pdf)
  Use for: the big picture, why 50 Ω matched impedances matter, and TX vs. RX termination styles.
- [Article: Behzad Razavi, "The Design of an Equalizer, Part One," IEEE Solid-State Circuits Magazine, Fall 2021](https://www.seas.ucla.edu/brweb/papers/Journals/BR_SSCM_4_2021.pdf)
  A worked 56 Gb/s CTLE design in 28 nm. Defines the Nyquist frequency (half the data rate) and shows real component values. Use for: CTLE intuition and realistic numbers.
- [Paper: S. Galal & B. Razavi, "Broadband ESD Protection Circuits in CMOS Technology," JSSC, Dec 2003](https://www.seas.ucla.edu/brweb/papers/Journals/G&RDec03_1.pdf)
  The classic T-coil + ESD paper (0.18 µm, 10 Gb/s, 20 dB return loss at 10 GHz). Use for: why ESD capacitance is the main problem at the RX pad and how T-coils hide it.
- [Repo: NCSU / Synopsys FreePDK3](https://github.com/ncsu-eda/FreePDK3)
  A predictive 3nm GAA PDK with Custom Compiler, ICV, StarRC and HSPICE files. Use for: non-NDA hands-on practice in the user's own tool flow.
- [Tutorials: NCSU EDA, Synopsys full-custom flow tutorials](https://eda.ncsu.edu/?p=479)
  Use for: setting up Custom Compiler + ICV on FreePDK.
- Book: Alan Hastings, _The Art of Analog Layout_, 2nd ed. (Pearson, 2005)
  The standard analog layout text. Use for: matching, common-centroid, guard rings, ESD structures, resistor layout. It predates FinFET.
- Book: Behzad Razavi, _Design of Integrated Circuits for Optical Communications_, 2nd ed. (Wiley, 2012)
  Use for: broadband amplifier and input-network theory (bandwidth extension, inductive peaking).

## Wisdom (Communities)

- Your own SerDes circuit designers and senior layout engineers at work
  The highest-value community available: ask them to walk you through a taped-out RX front-end layout and its extraction review.
- [r/chipdesign](https://www.reddit.com/r/chipdesign/)
  An active IC design subreddit with working engineers. Use for: career-shaped questions and "how do you usually do X" sanity checks (never post NDA content).
- [EDAboard: Analog IC Design and Layout forum](https://www.edaboard.com/)
  A long-running forum with lots of layout Q&A in its archive. Use for: specific technique questions.
- [IEEE Solid-State Circuits Society](https://sscs.ieee.org/)
  Local chapter talks, plus ISSCC/VLSI tutorials on wireline RX. Use for: hearing practitioners present real designs.

## Gaps

- **FinFET-specific analog layout guidance** (fin quantization, LDEs, MOL resistance on high-speed nets) is mostly in foundry docs under NDA. I still need a good public source (look for ISSCC/CICC short courses or IEEE papers on FinFET analog layout).
- **T-coil layout practice** (EM simulation, keep-out rules, ESD current-path width): I need a public tutorial-level source beyond patents.
- A source for the termination-pole formula f_p = 1/(2π (Z0∥R_T) C) stated explicitly in a lecture. It's standard circuit theory, but I'd like a citable slide.
