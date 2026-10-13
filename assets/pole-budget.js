/* pole-budget.js: interactive RX input-node capacitance budget.

   Models the RX pad node as one pole: the source impedance (Z0, looking back
   into the line) in parallel with the on-die termination R_T, loading the sum
   of all capacitances on the node.
       R_eff = Z0 ∥ R_T          f_p = 1 / (2π · R_eff · C_total)
   Loss at Nyquist for a single pole: 20·log10( 1 / sqrt(1 + (fNyq/f_p)²) ).

   Usage:
     <div class="widget pole-budget" data-config='{
        "items":[{"name":"Pad + bump","c":100,"max":300}, …],
        "z0":50, "rt":50, "rate":56, "mod":"NRZ", "showR":false }'></div>
*/
(function () {
  const COLORS = ['#c0573a', '#d9a441', '#5a8f5e', '#3f7cac', '#8a5fa8', '#7a7a72', '#b05f86'];
  const fmt = (x, d = 1) => (Math.abs(x) >= 100 ? x.toFixed(0) : x.toFixed(d));

  function build(root) {
    const cfg = JSON.parse(root.dataset.config);
    const st = { items: cfg.items.map(i => ({ ...i })), z0: cfg.z0 ?? 50, rt: cfg.rt ?? 50, rate: cfg.rate ?? 56, mod: cfg.mod ?? 'NRZ' };

    root.innerHTML = `
      <div class="w-title">${cfg.title || 'RX pad-node capacitance budget'}</div>
      <div class="pb-controls">
        <label>Data rate
          <select data-k="rate">${[10, 28, 56, 112, 224].map(r => `<option value="${r}" ${r == st.rate ? 'selected' : ''}>${r} Gb/s</option>`).join('')}</select></label>
        <label>Modulation
          <select data-k="mod">${['NRZ', 'PAM4'].map(m => `<option ${m == st.mod ? 'selected' : ''}>${m}</option>`).join('')}</select></label>
      </div>
      <div class="pb-items"></div>
      ${cfg.showR ? '<div class="pb-r"></div>' : ''}
      <div class="pb-stack"></div>
      <div class="pb-legend"></div>
      <div class="pb-readout"></div>
      <div class="pb-verdict"></div>`;

    const itemsEl = root.querySelector('.pb-items');
    st.items.forEach((it, i) => {
      const row = document.createElement('div'); row.className = 'pb-row';
      row.innerHTML = `<label for="pb-${i}-${Math.random().toString(36).slice(2, 6)}">${it.name}</label>
        <input type="range" min="${it.min ?? 0}" max="${it.max ?? 300}" step="${it.step ?? 5}" value="${it.c}">
        <output>${it.c} fF</output>`;
      const lab = row.querySelector('label'), inp = row.querySelector('input');
      inp.id = lab.htmlFor;
      inp.addEventListener('input', () => { it.c = +inp.value; row.querySelector('output').textContent = `${it.c} fF`; render(); });
      itemsEl.appendChild(row);
    });
    if (cfg.showR) {
      const r = root.querySelector('.pb-r');
      r.innerHTML = `<div class="pb-row"><label>Termination R<sub>T</sub></label><input type="range" min="25" max="100" step="5" value="${st.rt}"><output>${st.rt} Ω</output></div>`;
      const inp = r.querySelector('input');
      inp.addEventListener('input', () => { st.rt = +inp.value; r.querySelector('output').textContent = `${st.rt} Ω`; render(); });
    }
    root.querySelectorAll('select').forEach(s => s.addEventListener('change', () => { st[s.dataset.k] = s.dataset.k === 'rate' ? +s.value : s.value; render(); }));

    function render() {
      const C = st.items.reduce((a, b) => a + b.c, 0);                 // fF
      const R = (st.z0 * st.rt) / (st.z0 + st.rt);                       // Ω
      const fp = 1 / (2 * Math.PI * R * C * 1e-15) / 1e9;                // GHz
      const baud = st.mod === 'PAM4' ? st.rate / 2 : st.rate;            // GBd
      const fn = baud / 2;                                               // GHz
      const loss = 20 * Math.log10(1 / Math.sqrt(1 + (fn / fp) ** 2));   // dB
      const fp10 = 1 / (2 * Math.PI * R * (C + 10) * 1e-15) / 1e9;

      const stack = root.querySelector('.pb-stack'), leg = root.querySelector('.pb-legend');
      stack.innerHTML = st.items.map((it, i) => `<span style="width:${C ? 100 * it.c / C : 0}%;background:${COLORS[i % COLORS.length]}" title="${it.name}: ${it.c} fF"></span>`).join('');
      leg.innerHTML = st.items.map((it, i) => `<span><i style="background:${COLORS[i % COLORS.length]}"></i>${it.name} ${C ? Math.round(100 * it.c / C) : 0}%</span>`).join('');

      const ok = fp >= fn;
      root.querySelector('.pb-readout').innerHTML = `
        <div><div class="k">C total</div><div class="v">${C} fF</div></div>
        <div><div class="k">R<sub>eff</sub> = Z0∥R<sub>T</sub></div><div class="v">${fmt(R)} Ω</div></div>
        <div><div class="k">Input pole f<sub>p</sub></div><div class="v ${ok ? 'ok' : 'bad'}">${fmt(fp)} GHz</div></div>
        <div><div class="k">Nyquist f<sub>N</sub></div><div class="v">${fmt(fn)} GHz</div></div>
        <div><div class="k">Pole loss @ f<sub>N</sub></div><div class="v ${loss < -3 ? 'bad' : 'ok'}">${loss.toFixed(1)} dB</div></div>
        <div><div class="k">Cost of +10 fF</div><div class="v">−${(fp - fp10).toFixed(2)} GHz</div></div>`;
      root.querySelector('.pb-verdict').innerHTML = ok
        ? `The pole sits above Nyquist (${fmt(fp)} vs ${fmt(fn)} GHz), so the front end costs only ${(-loss).toFixed(1)} dB at f<sub>N</sub>.`
        : `The pole sits <strong>below</strong> Nyquist. The pad node alone eats ${(-loss).toFixed(1)} dB at f<sub>N</sub>, which the CTLE then has to make up, along with the channel loss. Largest contributor: <strong>${st.items.reduce((a, b) => b.c > a.c ? b : a).name}</strong>.`;
    }
    render();
  }
  function init() { document.querySelectorAll('.pole-budget').forEach(build); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
