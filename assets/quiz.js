/* quiz.js: reusable retrieval-practice widgets.

   Multiple choice:
     <div class="widget quiz" data-answer="b">
       <p class="q">Question?</p>
       <div class="opts">
         <button class="opt" data-key="a">…</button>
         <button class="opt" data-key="b">…</button>
       </div>
       <template class="explain">Shown after any answer.</template>
     </div>

   Numeric (relative tolerance, default 5%):
     <div class="widget quiz quiz-num" data-answer="15.9" data-tol="0.05" data-unit="GHz">
       <p class="q">Question?</p>
       <template class="explain">Worked solution.</template>
     </div>

   Option order is shuffled at load time unless data-noshuffle is set.
   A running score shows in any element with class "score". */
(function () {
  const state = { answered: 0, correct: 0 };
  const scoreEls = () => document.querySelectorAll('.score');
  function bump(ok) {
    state.answered++; if (ok) state.correct++;
    scoreEls().forEach(el => el.textContent = `First-try score: ${state.correct} / ${state.answered}`);
  }
  function explainHTML(q) {
    const t = q.querySelector('template.explain');
    return t ? t.innerHTML : '';
  }
  function setFeedback(q, ok, extra) {
    let fb = q.querySelector('.feedback');
    if (!fb) { fb = document.createElement('div'); fb.className = 'feedback'; q.appendChild(fb); }
    fb.innerHTML = `<span class="${ok ? 'verdict-ok' : 'verdict-bad'}">${ok ? 'Correct.' : 'Not quite.'}</span> ${extra || ''} ${explainHTML(q)}`;
  }

  function initMC(q) {
    const opts = q.querySelector('.opts');
    if (!q.hasAttribute('data-noshuffle')) {
      const kids = Array.from(opts.children);
      for (let i = kids.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [kids[i], kids[j]] = [kids[j], kids[i]]; }
      kids.forEach(k => opts.appendChild(k));
    }
    let first = true;
    opts.addEventListener('click', e => {
      const b = e.target.closest('button.opt'); if (!b || b.disabled) return;
      const ok = b.dataset.key === q.dataset.answer;
      if (first) { bump(ok); first = false; }
      if (ok) {
        b.classList.add('correct');
        opts.querySelectorAll('button.opt').forEach(x => x.disabled = true);
        setFeedback(q, true);
      } else {
        b.classList.add('wrong'); b.disabled = true;
        setFeedback(q, false, 'Try again.');
      }
    });
  }

  function initNum(q) {
    const row = document.createElement('div');
    const unit = q.dataset.unit || '';
    row.innerHTML = `<input type="text" inputmode="decimal" aria-label="answer"><span class="unit">${unit}</span><button type="button">Check</button>`;
    q.insertBefore(row, q.querySelector('template.explain'));
    const input = row.querySelector('input'), btn = row.querySelector('button');
    const ans = parseFloat(q.dataset.answer), tol = parseFloat(q.dataset.tol || '0.05');
    let first = true;
    const check = () => {
      const v = parseFloat(input.value.replace(',', '.'));
      if (Number.isNaN(v)) return;
      const ok = Math.abs(v - ans) <= Math.abs(ans) * tol;
      if (first) { bump(ok); first = false; }
      setFeedback(q, ok, ok ? '' : (v > ans ? 'Too high.' : 'Too low.') + ' Try again or read the worked answer:');
    };
    btn.addEventListener('click', check);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
  }

  function init() {
    document.querySelectorAll('.quiz').forEach(q => q.classList.contains('quiz-num') ? initNum(q) : initMC(q));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
