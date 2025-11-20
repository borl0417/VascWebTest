// Simple client-side calculators for demo purposes.
// NOTE: Replace formulas with validated clinical models if you want production/clinical use.

document.addEventListener('DOMContentLoaded', () => {
  // --- Simple Vascular Risk example ---
  const riskForm = document.getElementById('riskForm');
  const riskResult = document.getElementById('riskResult');
  document.getElementById('resetRisk').addEventListener('click', () => {
    riskForm.reset();
    riskResult.textContent = 'Enter inputs and click Calculate.';
  });

  riskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const age = Number(document.getElementById('age').value);
    const cr = Number(document.getElementById('creatinine').value);
    const smoke = Number(document.getElementById('smoking').value);
    const dm = Number(document.getElementById('diabetes').value);

    // Example toy formula (logistic-ish) for demonstration only:
    // risk_score = 1 / (1 + exp(-linear))
    const linear = -6.5 + 0.05 * age + 0.9 * dm + 0.7 * Math.log(cr + 0.01) + 0.01 * smoke;
    const prob = 1 / (1 + Math.exp(-linear));
    const pct = (prob * 100).toFixed(1);

    riskResult.innerHTML = `<strong>Estimated risk:</strong> ${pct}% (toy model)`;
  });


  // --- ABI helper ---
  const abiForm = document.getElementById('abiForm');
  const abiResult = document.getElementById('abiResult');
  document.getElementById('resetAbi').addEventListener('click', () => {
    abiForm.reset();
    abiResult.textContent = 'ABI results here.';
  });

  abiForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ankleR = Number(document.getElementById('ankleR').value);
    const ankleL = Number(document.getElementById('ankleL').value);
    const brachial = Number(document.getElementById('brachial').value);

    const abiR = (ankleR / brachial).toFixed(2);
    const abiL = (ankleL / brachial).toFixed(2);

    function classify(abi) {
      const a = Number(abi);
      if (a < 0.4) return 'Severe PAD';
      if (a < 0.9) return 'Abnormal (PAD)';
      if (a <= 1.3) return 'Normal';
      return 'Possibly non-compressible (calcified vessels)';
    }

    abiResult.innerHTML = `
      <div>Right ABI: <strong>${abiR}</strong> — ${classify(abiR)}</div>
      <div>Left ABI: <strong>${abiL}</strong> — ${classify(abiL)}</div>
    `;
  });
});
