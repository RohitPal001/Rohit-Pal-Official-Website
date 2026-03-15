(function () {
    if (window.ChartMaker) return;

    /* ══════════════════════════════════════
       PALETTE  (chart colors)
    ══════════════════════════════════════ */
    const PALETTE = [
        '#FFC107','#FF6B35','#4CAF50','#2196F3',
        '#9C27B0','#E91E63','#00BCD4','#FF9800',
        '#607D8B','#8BC34A','#F44336','#3F51B5',
    ];

    /* ══════════════════════════════════════
       STATE
    ══════════════════════════════════════ */
    let chartType  = 'bar';
    let dataRows   = [{ label: '', value: '' }];
    let chartTitle = '';

    /* ══════════════════════════════════════
       CSS
    ══════════════════════════════════════ */
    const CSS = `
/* ── Focus reset ── */
.cg-overlay *, .cg-overlay *:focus, .cg-overlay *:focus-visible {
    outline: none !important;
    -webkit-tap-highlight-color: transparent !important;
}
.cg-overlay input:focus, .cg-overlay button:focus,
.cg-overlay select:focus, .cg-overlay textarea:focus {
    outline: none !important; box-shadow: none !important;
}

/* ── Overlay ── */
.cg-overlay {
    position: fixed; inset: 0; z-index: 9996;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease;
}
.cg-overlay.cg-open { opacity: 1; pointer-events: all; }

/* ── Modal ── */
.cg-modal {
    width: 100%; max-width: 880px;
    max-height: calc(100vh - 32px);
    background: var(--md-sys-color-surface, #FFFBF2);
    border-radius: 32px;
    display: flex; flex-direction: row;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.35);
    transform: scale(0.92) translateY(20px); opacity: 0;
    transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease;
}
.cg-overlay.cg-open .cg-modal {
    transform: scale(1) translateY(0); opacity: 1;
}

/* ══ LEFT: Input Panel ══ */
.cg-left {
    width: 340px; min-width: 340px;
    display: flex; flex-direction: column;
    padding: 24px 20px;
    border-right: 1px solid var(--md-sys-color-surface-variant, #EBE2CF);
    overflow-y: auto; gap: 16px;
    scrollbar-width: thin;
    scrollbar-color: var(--md-sys-color-primary,#FFC107) transparent;
}
.cg-left::-webkit-scrollbar { width: 3px; }
.cg-left::-webkit-scrollbar-thumb { background: var(--md-sys-color-primary,#FFC107); border-radius: 9999px; }

/* Header */
.cg-header {
    display: flex; align-items: center;
    justify-content: space-between; flex-shrink: 0;
}
.cg-title {
    font-family: 'Outfit',sans-serif; font-size: 1.15rem; font-weight: 800;
    color: var(--md-sys-color-on-surface,#1E1B16);
    display: flex; align-items: center; gap: 7px;
}
.cg-title-icon {
    font-family: 'Material Symbols Rounded'; font-size: 24px;
    color: var(--md-sys-color-primary,#FFC107);
    animation: cg-spin 3s linear infinite;
}
@keyframes cg-spin { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }
.cg-close {
    width: 38px; height: 38px; border-radius: 50%; border: none;
    background: var(--md-sys-color-surface-variant,#EBE2CF);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-family: 'Material Symbols Rounded'; font-size: 18px;
    color: var(--md-sys-color-on-surface,#1E1B16);
    -webkit-tap-highlight-color: transparent;
    transition: all 0.2s; flex-shrink: 0;
}
.cg-close:active { transform: scale(0.88); }

/* Section label */
.cg-label {
    font-family: 'Outfit',sans-serif; font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--md-sys-color-on-surface-variant,#4D4639);
    margin-bottom: -8px;
}

/* Text input */
.cg-input {
    width: 100%; padding: 13px 18px; border-radius: 9999px;
    border: 2px solid var(--md-sys-color-primary-container,#FFE082);
    background: var(--md-sys-color-surface-variant,#EBE2CF);
    color: var(--md-sys-color-on-surface,#1E1B16);
    font-family: 'Outfit',sans-serif; font-size: 0.95rem; font-weight: 600;
    transition: all 0.25s ease; box-sizing: border-box;
}
.cg-input:focus {
    border-color: var(--md-sys-color-primary,#FFC107);
    background: var(--md-sys-color-surface,#FFFBF2);
}

/* Chart type selector */
.cg-type-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 8px;
}
.cg-type-btn {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 5px;
    padding: 12px 8px; border-radius: 16px; border: 2px solid transparent;
    background: var(--md-sys-color-surface-variant,#EBE2CF);
    cursor: pointer;
    font-family: 'Outfit',sans-serif; font-size: 0.8rem; font-weight: 700;
    color: var(--md-sys-color-on-surface,#1E1B16);
    -webkit-tap-highlight-color: transparent;
    transition: all 0.25s cubic-bezier(0.2,0.8,0.2,1);
}
.cg-type-btn .material-symbols-rounded {
    font-size: 24px; color: var(--md-sys-color-on-surface-variant,#4D4639);
    transition: color 0.2s;
}
.cg-type-btn:hover {
    background: var(--md-sys-color-primary-container,#FFE082);
    transform: translateY(-2px);
}
.cg-type-btn:active { border-radius: 12px; transform: scale(0.95); }
.cg-type-btn.cg-active {
    background: var(--md-sys-color-primary,#FFC107);
    border-color: var(--md-sys-color-on-primary,#402D00);
    color: var(--md-sys-color-on-primary,#402D00);
}
.cg-type-btn.cg-active .material-symbols-rounded { color: var(--md-sys-color-on-primary,#402D00); }

/* Data rows */
.cg-data-rows {
    display: flex; flex-direction: column; gap: 8px;
}
.cg-data-row {
    display: flex; gap: 8px; align-items: center;
}
.cg-data-row .cg-input {
    flex: 1; padding: 10px 14px; font-size: 0.87rem;
    border-radius: 12px;
}
.cg-row-color {
    width: 28px; height: 28px; border-radius: 8px;
    border: none; cursor: pointer; flex-shrink: 0;
    padding: 0; overflow: hidden;
}
.cg-row-del {
    width: 32px; height: 32px; border-radius: 9999px; border: none;
    background: transparent; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Material Symbols Rounded'; font-size: 18px;
    color: var(--md-sys-color-on-surface-variant,#4D4639);
    -webkit-tap-highlight-color: transparent;
    transition: all 0.2s; flex-shrink: 0;
}
.cg-row-del:hover { background: rgba(244,67,54,0.1); color: #f44336; }
.cg-row-del:active { transform: scale(0.88); }
.cg-data-row-header {
    display: grid; grid-template-columns: 1fr 1fr 28px 32px;
    gap: 8px; padding: 0 2px;
}
.cg-data-row-header span {
    font-family: 'Outfit',sans-serif; font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--md-sys-color-on-surface-variant,#4D4639);
}

/* Add row button */
.cg-add-row {
    display: flex; align-items: center; justify-content: center; gap: 7px;
    padding: 11px 20px; border-radius: 9999px; border: 2px dashed var(--md-sys-color-primary,#FFC107);
    background: transparent; cursor: pointer;
    font-family: 'Outfit',sans-serif; font-weight: 700; font-size: 0.88rem;
    color: var(--md-sys-color-primary,#FFC107);
    -webkit-tap-highlight-color: transparent;
    transition: all 0.25s ease;
}
.cg-add-row:hover { background: var(--md-sys-color-primary-container,#FFE082); border-style: solid; transform: translateY(-1px); }
.cg-add-row:active { transform: scale(0.97); }
.cg-add-row .material-symbols-rounded { font-size: 18px; }

/* Generate button */
.cg-gen-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 14px 24px; border-radius: 9999px; border: none;
    background: var(--md-sys-color-primary,#FFC107);
    color: var(--md-sys-color-on-primary,#402D00);
    font-family: 'Outfit',sans-serif; font-weight: 800; font-size: 1rem;
    cursor: pointer; width: 100%;
    -webkit-tap-highlight-color: transparent;
    transition: all 0.35s cubic-bezier(0.2,0.8,0.2,1);
    box-shadow: 0 4px 16px rgba(255,193,7,0.4); margin-top: 4px;
}
.cg-gen-btn:hover { background: #FFCA28; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,193,7,0.5); }
.cg-gen-btn:active { border-radius: 14px; transform: scale(0.96); background: #FFB300; }
.cg-gen-btn .material-symbols-rounded { font-size: 20px; }

/* ══ RIGHT: Preview Panel ══ */
.cg-right {
    flex: 1; display: flex; flex-direction: column;
    padding: 24px 20px; min-width: 0; gap: 14px;
}
.cg-preview-header {
    display: flex; align-items: center;
    justify-content: space-between; flex-shrink: 0;
}
.cg-preview-label {
    font-family: 'Outfit',sans-serif; font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--md-sys-color-on-surface-variant,#4D4639);
    display: flex; align-items: center; gap: 6px;
}
.cg-preview-label .material-symbols-rounded { font-size: 16px; color: var(--md-sys-color-primary,#FFC107); }

/* Download button */
.cg-dl-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 9px 18px; border-radius: 9999px; border: none;
    background: var(--md-sys-color-primary-container,#FFE082);
    color: var(--md-sys-color-on-primary-container,#261900);
    font-family: 'Outfit',sans-serif; font-weight: 700; font-size: 0.85rem;
    cursor: pointer; -webkit-tap-highlight-color: transparent;
    transition: all 0.3s cubic-bezier(0.2,0.8,0.2,1);
}
.cg-dl-btn:hover { background: var(--md-sys-color-primary,#FFC107); color: var(--md-sys-color-on-primary,#402D00); transform: translateY(-2px); }
.cg-dl-btn:active { border-radius: 12px; transform: scale(0.95); }
.cg-dl-btn .material-symbols-rounded { font-size: 18px; }

/* Canvas wrap */
.cg-canvas-wrap {
    flex: 1; border-radius: 20px;
    background: var(--md-sys-color-surface-variant,#EBE2CF);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; min-height: 280px; position: relative;
}
.cg-canvas-wrap canvas { max-width: 100%; max-height: 100%; border-radius: 16px; }
.cg-empty-state {
    display: flex; flex-direction: column; align-items: center;
    gap: 10px; color: var(--md-sys-color-on-surface-variant,#4D4639);
    font-family: 'Outfit',sans-serif; font-weight: 600; font-size: 0.9rem;
    text-align: center; padding: 24px;
}
.cg-empty-state .material-symbols-rounded { font-size: 52px; color: var(--md-sys-color-primary,#FFC107); opacity: 0.5; }

/* ══ DARK THEME ══ */
body.dark-theme .cg-modal { background: var(--md-sys-color-surface,#1E1B16); }
body.dark-theme .cg-left { border-right-color: var(--md-sys-color-surface-variant,#2C2814); }
body.dark-theme .cg-input { background: var(--md-sys-color-surface-variant,#2C2814); color: var(--md-sys-color-on-surface,#EAE1D4); border-color: rgba(255,193,7,0.2); }
body.dark-theme .cg-input:focus { background: var(--md-sys-color-surface,#1E1B16); }
body.dark-theme .cg-type-btn { background: var(--md-sys-color-surface-variant,#2C2814); color: var(--md-sys-color-on-surface,#EAE1D4); }
body.dark-theme .cg-type-btn.cg-active { background: var(--md-sys-color-primary,#FFC107); color: var(--md-sys-color-on-primary,#402D00); }
body.dark-theme .cg-close { background: var(--md-sys-color-surface-variant,#2C2814); color: var(--md-sys-color-on-surface,#EAE1D4); }
body.dark-theme .cg-canvas-wrap { background: var(--md-sys-color-surface-variant,#2C2814); }
body.dark-theme .cg-title { color: var(--md-sys-color-on-surface,#EAE1D4); }

/* ══ MOBILE ══ */
@media (max-width: 620px) {
    .cg-overlay { padding: 0; align-items: flex-end; }
    .cg-modal { flex-direction: column; border-radius: 28px 28px 0 0; max-height: 95vh; transform: translateY(60px); }
    .cg-overlay.cg-open .cg-modal { transform: translateY(0); }
    .cg-left { width: 100%; min-width: unset; border-right: none; border-bottom: 1px solid var(--md-sys-color-surface-variant,#EBE2CF); max-height: 55vh; }
    .cg-right { max-height: 40vh; }
    .cg-canvas-wrap { min-height: 180px; }
}
@media (min-width: 621px) and (max-width: 760px) {
    .cg-left { width: 280px; min-width: 280px; }
}
.ic-logo-text {
  font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 800;
  color: var(--md-sys-color-on-surface, #1E1B16); letter-spacing: -.02em;
  line-height: 1.2;
}
`;

    /* ══════════════════════════════════════
       HTML BUILDER
    ══════════════════════════════════════ */
    function buildHTML() {
        return `
<div class="cg-overlay" id="cg-overlay">
  <div class="cg-modal">

    <!-- LEFT: Inputs -->
    <div class="cg-left" id="cg-left">

      <!-- Header -->
      <div class="cg-header">
        <div class="cg-title">
          <span class="cg-title-icon material-symbols-rounded">donut_large</span>
          <div class="ic-logo-text">Magical Chart<br><span>Developed By Rohit Pal</span></div>
        </div>
        <button class="cg-close" id="cg-close">close</button>
      </div>

      <!-- Chart Type -->
      <div class="cg-label">Chart Type</div>
      <div class="cg-type-grid" id="cg-type-grid">
        <button class="cg-type-btn cg-active" data-type="bar">
          <span class="material-symbols-rounded">bar_chart</span>Bar
        </button>
        <button class="cg-type-btn" data-type="line">
          <span class="material-symbols-rounded">show_chart</span>Line
        </button>
        <button class="cg-type-btn" data-type="pie">
          <span class="material-symbols-rounded">pie_chart</span>Pie
        </button>
        <button class="cg-type-btn" data-type="donut">
          <span class="material-symbols-rounded">donut_large</span>Donut
        </button>
      </div>

      <!-- Chart Name -->
      <div class="cg-label">Chart Name</div>
      <input class="cg-input" id="cg-chart-name" type="text"
             placeholder="e.g. Sales Report 2025" maxlength="60">

      <!-- Data -->
      <div class="cg-label">Data</div>
      <div class="cg-data-row-header">
        <span>Label</span><span>Value</span><span></span><span></span>
      </div>
      <div class="cg-data-rows" id="cg-data-rows"></div>

      <button class="cg-add-row" id="cg-add-row">
        <span class="material-symbols-rounded">add</span> Add Row
      </button>

      <!-- Generate -->
      <button class="cg-gen-btn" id="cg-gen-btn">
        <span class="material-symbols-rounded">auto_graph</span>
        Generate Chart
      </button>

    </div>

    <!-- RIGHT: Preview -->
    <div class="cg-right">
      <div class="cg-preview-header">
        <div class="cg-preview-label">
          <span class="material-symbols-rounded">visibility</span>
          Preview
        </div>
        <button class="cg-dl-btn" id="cg-dl-btn">
          <span class="material-symbols-rounded">download</span>
          Download PNG
        </button>
      </div>

      <div class="cg-canvas-wrap" id="cg-canvas-wrap">
        <div class="cg-empty-state" id="cg-empty-state">
          <span class="material-symbols-rounded">auto_graph</span>
          Fill in the data and tap<br><strong>Generate Chart</strong>
        </div>
        <canvas id="cg-canvas" style="display:none;"></canvas>
      </div>
    </div>

  </div>
</div>`;
    }

    /* ══════════════════════════════════════
       RENDER DATA ROWS
    ══════════════════════════════════════ */
    function renderRows() {
        const container = document.getElementById('cg-data-rows');
        container.innerHTML = '';
        dataRows.forEach((row, i) => {
            const div = document.createElement('div');
            div.className = 'cg-data-row';
            div.innerHTML = `
                <input class="cg-input cg-row-label" type="text"
                       placeholder="Label" value="${escHtml(row.label)}" maxlength="30">
                <input class="cg-input cg-row-value" type="number"
                       placeholder="Value" value="${row.value}" min="0">
                <input type="color" class="cg-row-color" value="${PALETTE[i % PALETTE.length]}">
                <button class="cg-row-del" data-i="${i}" title="Remove">
                  <span class="material-symbols-rounded">close</span>
                </button>
            `;
            container.appendChild(div);

            // sync back to state
            div.querySelector('.cg-row-label').addEventListener('input', e => { dataRows[i].label = e.target.value; });
            div.querySelector('.cg-row-value').addEventListener('input', e => { dataRows[i].value = e.target.value; });
            div.querySelector('.cg-row-color').addEventListener('input', e => { dataRows[i].color = e.target.value; });
            div.querySelector('.cg-row-del').addEventListener('click', () => {
                if (dataRows.length === 1) return;
                dataRows.splice(i, 1);
                renderRows();
            });

            // init color in state
            if (!dataRows[i].color) dataRows[i].color = PALETTE[i % PALETTE.length];
        });
    }

    /* ══════════════════════════════════════
       CANVAS CHART DRAWING
    ══════════════════════════════════════ */
    function getValidData() {
        return dataRows.filter(r => r.label.trim() && r.value !== '' && !isNaN(parseFloat(r.value)));
    }

    function isDark() {
        return document.body.classList.contains('dark-theme');
    }

    function drawChart() {
        const data = getValidData();
        if (data.length === 0) return false;

        const title  = document.getElementById('cg-chart-name').value.trim();
        const canvas = document.getElementById('cg-canvas');
        const wrap   = document.getElementById('cg-canvas-wrap');

        // ── CRISP CANVAS: account for devicePixelRatio ──
        const dpr = window.devicePixelRatio || 1;
        const W   = Math.min(wrap.offsetWidth  - 16, 640);
        const H   = Math.min(wrap.offsetHeight - 16, 420);

        // Physical pixels = logical * dpr  →  no blur on Retina/HD screens
        canvas.width  = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width  = W + 'px';
        canvas.style.height = H + 'px';

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);   // all drawing stays in logical px

        // Font smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const dark = isDark();
        const bg   = dark ? '#1E1B16' : '#FFFBF2';
        const fg   = dark ? '#EAE1D4' : '#1E1B16';
        const grid = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
        const sub  = dark ? 'rgba(234,225,212,0.5)'  : 'rgba(30,27,22,0.45)';

        // Background
        ctx.fillStyle = bg;
        roundRect(ctx, 0, 0, W, H, 16);
        ctx.fill();

        // Title
        let topY = 20;
        if (title) {
            const fs = Math.min(17, W / 26);
            ctx.fillStyle = fg;
            ctx.font = `800 ${fs}px 'Outfit', sans-serif`;
            ctx.textAlign  = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(title, W / 2, topY);
            topY += fs + 16;
        }

        ctx.textBaseline = 'alphabetic'; // reset

        const values = data.map(d => parseFloat(d.value));
        const labels = data.map(d => d.label);
        const colors = data.map((d,i) => d.color || PALETTE[i % PALETTE.length]);
        const maxVal = Math.max(...values);

        if      (chartType === 'bar')   drawBar  (ctx, values, labels, colors, maxVal, W, H, topY, fg, grid, sub, dark);
        else if (chartType === 'line')  drawLine (ctx, values, labels, colors, maxVal, W, H, topY, fg, grid, sub);
        else if (chartType === 'pie')   drawPie  (ctx, values, labels, colors, W, H, topY, fg, false, dark);
        else if (chartType === 'donut') drawPie  (ctx, values, labels, colors, W, H, topY, fg, true,  dark);

        return true;
    }

    /* ── Bar Chart ── */
    function drawBar(ctx, values, labels, colors, maxVal, W, H, topY, fg, grid, sub, dark) {
        const padL = 52, padR = 20, padB = 44, padT = topY + 8;
        const cW   = W - padL - padR;
        const cH   = H - padT - padB;
        const n    = values.length;
        const gap  = cW / n;
        const barW = Math.min(48, gap * 0.58);

        // Y-axis grid lines + labels
        const steps = 5;
        ctx.lineWidth = 1;
        for (let i = 0; i <= steps; i++) {
            const y   = padT + cH * (i / steps);
            const val = maxVal * (1 - i / steps);

            ctx.strokeStyle = grid;
            ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();

            ctx.fillStyle    = sub;
            ctx.font         = `600 10px 'Outfit', sans-serif`;
            ctx.textAlign    = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(fmtVal(val), padL - 8, y);
        }

        // X-axis baseline
        ctx.strokeStyle = grid;
        ctx.lineWidth   = 1.5;
        ctx.beginPath(); ctx.moveTo(padL, padT + cH); ctx.lineTo(W - padR, padT + cH); ctx.stroke();

        // Bars
        values.forEach((v, i) => {
            const bH = Math.max(2, (v / maxVal) * cH);
            const x  = padL + gap * i + gap / 2 - barW / 2;
            const y  = padT + cH - bH;

            // Gradient bar
            const grad = ctx.createLinearGradient(x, y, x, y + bH);
            grad.addColorStop(0, colors[i]);
            grad.addColorStop(1, hexAlpha(colors[i], 0.55));
            ctx.fillStyle = grad;
            roundRectBar(ctx, x, y, barW, bH, Math.min(7, barW / 3));
            ctx.fill();

            // Value on top of bar
            ctx.fillStyle    = fg;
            ctx.font         = `700 10px 'Outfit', sans-serif`;
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(fmtVal(v), x + barW / 2, y - 3);

            // X-axis label
            ctx.fillStyle    = sub;
            ctx.font         = `600 10px 'Outfit', sans-serif`;
            ctx.textBaseline = 'top';
            const lbl = labels[i].length > 9 ? labels[i].slice(0, 8) + '…' : labels[i];
            ctx.fillText(lbl, x + barW / 2, padT + cH + 8);
        });
    }

    /* ── Line Chart ── */
    function drawLine(ctx, values, labels, colors, maxVal, W, H, topY, fg, grid, sub) {
        const padL = 52, padR = 20, padB = 44, padT = topY + 8;
        const cW   = W - padL - padR;
        const cH   = H - padT - padB;
        const n    = values.length;

        // Grid
        const steps = 5;
        ctx.lineWidth = 1;
        for (let i = 0; i <= steps; i++) {
            const y   = padT + cH * (i / steps);
            const val = maxVal * (1 - i / steps);

            ctx.strokeStyle  = grid;
            ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();

            ctx.fillStyle    = sub;
            ctx.font         = `600 10px 'Outfit', sans-serif`;
            ctx.textAlign    = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(fmtVal(val), padL - 8, y);
        }

        const pts = values.map((v, i) => ({
            x: padL + (n === 1 ? cW / 2 : (i / (n - 1)) * cW),
            y: padT + cH - Math.max(0, (v / maxVal) * cH)
        }));

        // Area fill
        const grad = ctx.createLinearGradient(0, padT, 0, padT + cH);
        grad.addColorStop(0, hexAlpha(colors[0], 0.28));
        grad.addColorStop(1, hexAlpha(colors[0], 0.0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, padT + cH);
        pts.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(pts[pts.length - 1].x, padT + cH);
        ctx.closePath(); ctx.fill();

        // Line stroke
        ctx.strokeStyle = colors[0]; ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        ctx.beginPath();
        pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();

        // Dots, value labels, x-labels
        pts.forEach((p, i) => {
            // Dot outer
            ctx.fillStyle = colors[i % colors.length] || colors[0];
            ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fill();
            // Dot inner white
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fill();

            // Value label
            ctx.fillStyle    = fg;
            ctx.font         = `700 10px 'Outfit', sans-serif`;
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(fmtVal(values[i]), p.x, p.y - 8);

            // X label
            ctx.fillStyle    = sub;
            ctx.font         = `600 10px 'Outfit', sans-serif`;
            ctx.textBaseline = 'top';
            const lbl = labels[i].length > 9 ? labels[i].slice(0, 8) + '…' : labels[i];
            ctx.fillText(lbl, p.x, padT + cH + 8);
        });
    }

    /* ── Pie / Donut Chart ── */
    function drawPie(ctx, values, labels, colors, W, H, topY, fg, isDonut, dark) {
        const total  = values.reduce((a, b) => a + b, 0);
        const legRows = Math.ceil(Math.min(values.length, 8) / 4);
        const legH   = legRows * 22 + 8;

        const availH = H - topY - legH - 12;
        const cx     = W / 2;
        const cy     = topY + availH / 2 + 8;
        const r      = Math.min(cx - 24, availH / 2 - 8, 140);

        // Slices
        let angle = -Math.PI / 2;
        values.forEach((v, i) => {
            const slice = (v / total) * Math.PI * 2;

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, angle, angle + slice);
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();

            // Slice border
            ctx.strokeStyle = dark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)';
            ctx.lineWidth   = 1.5;
            ctx.stroke();

            // % label inside slice
            if (slice > 0.22) {
                const mid = angle + slice / 2;
                const lx  = cx + Math.cos(mid) * r * 0.66;
                const ly  = cy + Math.sin(mid) * r * 0.66;
                ctx.fillStyle    = '#fff';
                ctx.font         = `700 11px 'Outfit', sans-serif`;
                ctx.textAlign    = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(((v / total) * 100).toFixed(0) + '%', lx, ly);
            }
            angle += slice;
        });

        // Donut hole
        if (isDonut) {
            ctx.beginPath();
            ctx.arc(cx, cy, r * 0.50, 0, Math.PI * 2);
            ctx.fillStyle = dark ? '#1E1B16' : '#FFFBF2';
            ctx.fill();

            // Center total label
            ctx.fillStyle    = fg;
            ctx.font         = `800 13px 'Outfit', sans-serif`;
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(fmtVal(total), cx, cy);
        }

        // Legend rows at the bottom, horizontally centered
        const maxPerRow = 4;
        const visCount  = Math.min(values.length, 8);
        const legY0     = H - legH + 8;

        for (let i = 0; i < visCount; i++) {
            const row    = Math.floor(i / maxPerRow);
            const col    = i % maxPerRow;
            const rowN   = Math.min(maxPerRow, visCount - row * maxPerRow);
            const itemW  = Math.min(130, (W - 24) / rowN);
            const startX = (W - rowN * itemW) / 2;
            const lx     = startX + col * itemW;
            const ly     = legY0 + row * 22;

            // Color swatch
            ctx.fillStyle = colors[i];
            roundRect(ctx, lx, ly, 12, 12, 3);
            ctx.fill();

            // Label text
            ctx.fillStyle    = fg;
            ctx.font         = `600 10px 'Outfit', sans-serif`;
            ctx.textAlign    = 'left';
            ctx.textBaseline = 'top';
            const lbl = labels[i].length > 11 ? labels[i].slice(0, 10) + '…' : labels[i];
            ctx.fillText(lbl, lx + 16, ly + 1);
        }
    }

    /* ══════════════════════════════════════
       CANVAS HELPERS
    ══════════════════════════════════════ */
    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.lineTo(x+w-r, y); ctx.arcTo(x+w,y,x+w,y+r,r);
        ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
        ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
        ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
        ctx.closePath();
    }
    function roundRectBar(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.lineTo(x+w-r, y); ctx.arcTo(x+w,y,x+w,y+r,r);
        ctx.lineTo(x+w,y+h); ctx.lineTo(x,y+h); ctx.lineTo(x,y+r);
        ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
    }
    function hexAlpha(hex, alpha) {
        const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
        return `rgba(${r},${g},${b},${alpha})`;
    }
    function fmtVal(n) {
        if (n >= 1e9) return (n/1e9).toFixed(1)+'B';
        if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
        if (n >= 1e3) return (n/1e3).toFixed(1)+'K';
        return (+n.toFixed(2)).toString();
    }
    function escHtml(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    /* ══════════════════════════════════════
       GENERATE & DOWNLOAD
    ══════════════════════════════════════ */
    function generate() {
        // Sync inputs to state
        document.querySelectorAll('#cg-data-rows .cg-data-row').forEach((row, i) => {
            if (!dataRows[i]) return;
            dataRows[i].label = row.querySelector('.cg-row-label').value;
            dataRows[i].value = row.querySelector('.cg-row-value').value;
            dataRows[i].color = row.querySelector('.cg-row-color').value;
        });

        const ok = drawChart();
        const canvas = document.getElementById('cg-canvas');
        const empty  = document.getElementById('cg-empty-state');
        if (ok) {
            canvas.style.display = 'block';
            empty.style.display  = 'none';
        } else {
            canvas.style.display = 'none';
            empty.style.display  = 'flex';
        }
    }

    function download() {
        // Re-generate at 3× resolution for a crisp PNG export
        const data = getValidData();
        if (!data.length) { generate(); return; }

        const title   = document.getElementById('cg-chart-name').value.trim();
        const EXPORT_SCALE = 3;
        const W = 800, H = 500;

        const offscreen = document.createElement('canvas');
        offscreen.width  = W * EXPORT_SCALE;
        offscreen.height = H * EXPORT_SCALE;

        const ctx = offscreen.getContext('2d');
        ctx.scale(EXPORT_SCALE, EXPORT_SCALE);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const dark = isDark();
        const bg   = dark ? '#1E1B16' : '#FFFBF2';
        const fg   = dark ? '#EAE1D4' : '#1E1B16';
        const grid = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
        const sub  = dark ? 'rgba(234,225,212,0.5)'  : 'rgba(30,27,22,0.45)';

        ctx.fillStyle = bg;
        roundRect(ctx, 0, 0, W, H, 16); ctx.fill();

        let topY = 24;
        if (title) {
            ctx.fillStyle = fg;
            ctx.font = `800 20px 'Outfit', sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.fillText(title, W / 2, topY);
            topY += 40;
        }
        ctx.textBaseline = 'alphabetic';

        const values = data.map(d => parseFloat(d.value));
        const labels = data.map(d => d.label);
        const colors = data.map((d,i) => d.color || PALETTE[i % PALETTE.length]);
        const maxVal = Math.max(...values);

        if      (chartType === 'bar')   drawBar  (ctx, values, labels, colors, maxVal, W, H, topY, fg, grid, sub, dark);
        else if (chartType === 'line')  drawLine (ctx, values, labels, colors, maxVal, W, H, topY, fg, grid, sub);
        else if (chartType === 'pie')   drawPie  (ctx, values, labels, colors, W, H, topY, fg, false, dark);
        else if (chartType === 'donut') drawPie  (ctx, values, labels, colors, W, H, topY, fg, true,  dark);

        const link = document.createElement('a');
        const name = (title || 'chart').replace(/\s+/g, '_');
        link.download = `${name}.png`;
        link.href = offscreen.toDataURL('image/png');
        link.click();
    }

    /* ══════════════════════════════════════
       OPEN / CLOSE
    ══════════════════════════════════════ */
    function open() {
        document.getElementById('cg-overlay').classList.add('cg-open');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        document.getElementById('cg-overlay').classList.remove('cg-open');
        document.body.style.overflow = '';
    }

    /* ══════════════════════════════════════
       INIT
    ══════════════════════════════════════ */
    function init() {
        // CSS
        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        // HTML
        document.body.insertAdjacentHTML('beforeend', buildHTML());

        // Initial rows (3 sample rows)
        dataRows = [
            { label:'Mobile',  value:'14000', color: PALETTE[0] },
            { label:'Laptop',  value:'9500',  color: PALETTE[1] },
            { label:'Tablet',  value:'5200',  color: PALETTE[2] },
        ];
        renderRows();

        // Chart type buttons
        document.getElementById('cg-type-grid').addEventListener('click', e => {
            const btn = e.target.closest('.cg-type-btn');
            if (!btn) return;
            chartType = btn.dataset.type;
            document.querySelectorAll('.cg-type-btn').forEach(b => b.classList.remove('cg-active'));
            btn.classList.add('cg-active');
        });

        // Add row
        document.getElementById('cg-add-row').addEventListener('click', () => {
            if (dataRows.length >= 12) return;
            dataRows.push({ label:'', value:'', color: PALETTE[dataRows.length % PALETTE.length] });
            renderRows();
        });

        // Generate
        document.getElementById('cg-gen-btn').addEventListener('click', generate);

        // Download
        document.getElementById('cg-dl-btn').addEventListener('click', download);

        // Close
        document.getElementById('cg-close').addEventListener('click', close);
        document.getElementById('cg-overlay').addEventListener('click', e => {
            if (e.target.id === 'cg-overlay') close();
        });

        // Auto-generate on open for sample data
        setTimeout(generate, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else { init(); }

    window.ChartMaker = { open, close };
})();
