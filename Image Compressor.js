(function () {
  'use strict';

  /* ══════════════════════════════════════
     CSS  —  M3 Expressive
  ══════════════════════════════════════ */
  const css = `
/* ── Focus / tap reset ── */
#ic-overlay *, #ic-overlay *:focus, #ic-overlay *:focus-visible {
  outline: none !important;
  -webkit-tap-highlight-color: transparent !important;
}
#ic-overlay input:focus, #ic-overlay button:focus,
#ic-overlay select:focus, #ic-overlay textarea:focus {
  outline: none !important; box-shadow: none !important;
}

/* ── Overlay ── */
#ic-overlay {
  display: none; position: fixed; inset: 0; z-index: 99999;
  background: rgba(0,0,0,0.65);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  align-items: center; justify-content: center;
  padding: 16px;
}
#ic-overlay.open { display: flex; }

/* ── Modal ── */
#ic-modal {
  background: var(--md-sys-color-surface, #FFFBF2);
  border-radius: 32px;
  width: 100%; max-width: 920px; max-height: 90vh;
  overflow: hidden; display: flex; flex-direction: column;
  box-shadow: 0 32px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2);
  animation: ic-up .45s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes ic-up {
  from { transform: scale(0.92) translateY(20px); opacity: 0; }
  to   { transform: scale(1)    translateY(0);    opacity: 1; }
}

/* ── Header ── */
.ic-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--md-sys-color-surface-variant, #EBE2CF);
  background: var(--md-sys-color-surface, #FFFBF2); flex-shrink: 0;
}
.ic-logo { display: flex; align-items: center; gap: 10px; }
.ic-logo-icon {
  width: 38px; height: 38px;
  background: transparent;        /* ← yellow box gone */
  border-radius: 0;               /* ← no box shape */
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: visible; flex-shrink: 0;
}
.ic-logo-icon::before {
  content: '';
  position: absolute; inset: -3px;
  border-radius: 15px;
  background: conic-gradient(from 0deg,
    transparent 0%, transparent 50%,
    rgba(255,230,80,0.95) 72%, white 85%,
    transparent 100%);
  animation: ic-magic-ring 1.6s linear infinite;
  z-index: -1;
}
@keyframes ic-magic-ring { to { transform: rotate(360deg); } }
.ic-logo-icon .material-symbols-rounded {
  font-size: 22px; line-height: 1;
  color: var(--md-sys-color-primary, #FFC107);
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
  animation: ic-wand-twinkle 2.4s ease-in-out infinite;
}
@keyframes ic-wand-twinkle {
  0%,100% { transform: rotate(-8deg) scale(1);    filter: brightness(0.85); }
  50%     { transform: rotate(8deg)  scale(1.18); filter: brightness(1.25) drop-shadow(0 0 6px rgba(255,220,40,1)); }
}
.ic-logo-text {
  font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 800;
  color: var(--md-sys-color-on-surface, #1E1B16); letter-spacing: -.02em;
  line-height: 1.2;
}
.ic-logo-text span {
  font-size: 0.72rem; font-weight: 600;
  color: var(--md-sys-color-primary, #FFC107);
  display: block;
}
.ic-close-btn {
  background: var(--md-sys-color-surface-variant, #EBE2CF); border: none;
  color: var(--md-sys-color-on-surface, #1E1B16);
  width: 38px; height: 38px; border-radius: 50%;
  cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 1rem;
  display: flex; align-items: center; justify-content: center;
  transition: all .2s; flex-shrink: 0;
}
.ic-close-btn:hover  { background: var(--md-sys-color-primary-container, #FFE082); }
.ic-close-btn:active { transform: scale(0.88); }

/* ── Body ── */
.ic-body { overflow-y: auto; flex: 1; padding: 20px; }

/* ── Drop Zone ── */
#ic-dropzone {
  border: 2px dashed var(--md-sys-color-primary, #FFC107);
  border-radius: 24px;
  background: var(--md-sys-color-surface-variant, #EBE2CF);
  padding: 52px 24px; text-align: center; cursor: pointer;
  transition: all .25s ease;
}
#ic-dropzone:hover, #ic-dropzone.drag-over {
  background: var(--md-sys-color-primary-container, #FFE082);
  border-style: solid;
  transform: translateY(-2px);
  box-shadow: 0 0 0 4px rgba(255,193,7,.12);
}
.ic-alien {
  display: block; font-size: 52px; line-height: 1; margin-bottom: 14px;
  animation: ic-float 4s ease-in-out infinite;
}
@keyframes ic-float {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
.ic-drop-title {
  font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 800;
  color: var(--md-sys-color-on-surface, #1E1B16); margin-bottom: 6px;
}
.ic-drop-sub {
  font-family: 'Outfit', sans-serif; font-size: .875rem;
  color: var(--md-sys-color-on-surface-variant, #4D4639); margin-bottom: 20px;
}
.ic-chips { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
.ic-chip {
  font-family: 'Outfit', sans-serif; font-size: .7rem; font-weight: 700;
  background: var(--md-sys-color-surface, #FFFBF2);
  color: var(--md-sys-color-on-surface-variant, #4D4639);
  border: 1px solid var(--md-sys-color-surface-variant, #EBE2CF);
  padding: 4px 12px; border-radius: 9999px;
}
.ic-browse-btn {
  font-family: 'Outfit', sans-serif;
  background: var(--md-sys-color-primary, #FFC107);
  color: var(--md-sys-color-on-primary, #402D00);
  border: none; border-radius: 9999px; padding: 12px 32px;
  font-size: .9rem; font-weight: 700; cursor: pointer;
  box-shadow: 0 2px 12px rgba(255,193,7,.35);
  transition: all .35s cubic-bezier(0.2,0.8,0.2,1);
}
.ic-browse-btn:hover  { background: #FFCA28; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,193,7,.45); }
.ic-browse-btn:active { border-radius: 12px; transform: scale(.96); background: #FFB300; }

/* ── Workspace ── */
#ic-workspace { display: none; }
.ic-grid {
  display: grid; grid-template-columns: 268px 1fr;
  gap: 16px; align-items: start;
}
@media (max-width: 620px) { .ic-grid { grid-template-columns: 1fr; } }

/* ── Settings Panel ── */
.ic-settings {
  background: var(--md-sys-color-surface, #FFFBF2);
  border: 1px solid var(--md-sys-color-surface-variant, #EBE2CF);
  border-radius: 20px; padding: 20px;
  display: flex; flex-direction: column; gap: 16px;
  overflow: hidden; min-width: 0;
}
.ic-panel-title {
  font-family: 'Outfit', sans-serif; font-size: .68rem; font-weight: 700;
  color: var(--md-sys-color-on-surface-variant, #4D4639);
  letter-spacing: .1em; text-transform: uppercase;
}
.ic-group { display: flex; flex-direction: column; gap: 8px; }
.ic-lbl {
  display: flex; justify-content: space-between; align-items: center;
  font-family: 'Outfit', sans-serif; font-size: .8rem; font-weight: 600;
  color: var(--md-sys-color-on-surface-variant, #4D4639);
}
.ic-lbl-val { font-weight: 800; color: var(--md-sys-color-primary, #FFC107); }

/* Format grid */
.ic-fmt-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; }
.ic-fmt-btn {
  background: var(--md-sys-color-surface-variant, #EBE2CF);
  border: 2px solid transparent;
  border-radius: 12px; padding: 8px 4px;
  font-family: 'Outfit', sans-serif; font-size: .78rem; font-weight: 700;
  color: var(--md-sys-color-on-surface-variant, #4D4639);
  cursor: pointer; text-align: center;
  transition: all .2s cubic-bezier(0.2,0.8,0.2,1);
}
.ic-fmt-btn:hover {
  background: var(--md-sys-color-primary-container, #FFE082);
  color: var(--md-sys-color-on-primary-container, #261900);
  transform: translateY(-1px);
}
.ic-fmt-btn:active { border-radius: 8px; transform: scale(.95); }
.ic-fmt-btn.active {
  background: var(--md-sys-color-primary, #FFC107);
  border-color: var(--md-sys-color-on-primary, #402D00);
  color: var(--md-sys-color-on-primary, #402D00);
}

/* Slider */
.ic-slider {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 4px;
  background: var(--md-sys-color-surface-variant, #EBE2CF);
  border-radius: 9999px; outline: none; cursor: pointer;
}
.ic-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 20px; height: 20px;
  border-radius: 50%; background: var(--md-sys-color-primary, #FFC107);
  box-shadow: 0 0 0 3px rgba(255,193,7,.25); cursor: pointer; transition: box-shadow .15s;
}
.ic-slider::-webkit-slider-thumb:hover { box-shadow: 0 0 0 7px rgba(255,193,7,.2); }

/* Toggle */
.ic-toggle-row { display: flex; align-items: center; justify-content: space-between; }
.ic-toggle-wrap { position: relative; width: 44px; height: 26px; outline: none !important; user-select: none; }
.ic-toggle-wrap input { opacity: 0; width: 0; height: 0; }
.ic-track {
  position: absolute; inset: 0;
  background: var(--md-sys-color-surface-variant, #EBE2CF);
  border-radius: 9999px; cursor: pointer; transition: background .2s;
}
.ic-track::after {
  content: ''; position: absolute; top: 3px; left: 3px;
  width: 20px; height: 20px; background: white; border-radius: 50%; transition: transform .2s;
}
.ic-toggle-wrap input:checked + .ic-track { background: var(--md-sys-color-primary, #FFC107); }
.ic-toggle-wrap input:checked + .ic-track::after { transform: translateX(18px); }

/* Resize inputs */
#ic-resize-row {
  display: none; gap: 8px; margin-top: 4px; align-items: center;
  width: 100%; box-sizing: border-box; overflow: hidden;
}
#ic-resize-row.show { display: flex; }
.ic-dim-input {
  flex: 1; min-width: 0; width: 0;
  background: var(--md-sys-color-surface-variant, #EBE2CF);
  border: 2px solid var(--md-sys-color-primary-container, #FFE082);
  border-radius: 12px; padding: 8px 10px;
  font-family: 'Outfit', sans-serif; font-size: .82rem; font-weight: 600;
  color: var(--md-sys-color-on-surface, #1E1B16);
  outline: none; transition: border-color .2s;
}
.ic-dim-input:focus { border-color: var(--md-sys-color-primary, #FFC107); }
.ic-dim-sep { color: var(--md-sys-color-on-surface-variant, #4D4639); font-size: 1rem; }

/* Stats card */
.ic-stats {
  background: var(--md-sys-color-primary-container, #FFE082);
  border-radius: 14px; padding: 14px;
}
.ic-stat-row {
  display: flex; justify-content: space-between; align-items: center;
  font-family: 'Outfit', sans-serif; font-size: .8rem;
  color: var(--md-sys-color-on-primary-container, #261900);
  padding: 3px 0;
}
.ic-stat-row span { opacity: .7; }
.ic-stat-hr {
  border: none;
  border-top: 1px solid rgba(64,45,0,.15);
  margin: 6px 0;
}
.ic-stat-saving { font-weight: 800; }

/* Action buttons — M3 pill morph */
.ic-btn-primary {
  width: 100%; font-family: 'Outfit', sans-serif;
  background: var(--md-sys-color-primary, #FFC107);
  color: var(--md-sys-color-on-primary, #402D00);
  border: none; border-radius: 9999px; padding: 13px;
  font-size: .92rem; font-weight: 800; cursor: pointer;
  box-shadow: 0 2px 12px rgba(255,193,7,.35);
  transition: all .35s cubic-bezier(0.2,0.8,0.2,1);
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.ic-btn-primary:hover  { background: #FFCA28; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,193,7,.45); }
.ic-btn-primary:active { border-radius: 14px; transform: scale(.96); background: #FFB300; }
.ic-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; box-shadow: none; }

.ic-btn-secondary {
  width: 100%; font-family: 'Outfit', sans-serif;
  background: var(--md-sys-color-surface-variant, #EBE2CF);
  color: var(--md-sys-color-on-surface, #1E1B16);
  border: 2px solid var(--md-sys-color-primary-container, #FFE082);
  border-radius: 9999px; padding: 12px;
  font-size: .88rem; font-weight: 700; cursor: pointer;
  transition: all .35s cubic-bezier(0.2,0.8,0.2,1);
  display: none; align-items: center; justify-content: center; gap: 6px;
}
.ic-btn-secondary:hover  { background: var(--md-sys-color-primary-container, #FFE082); border-color: var(--md-sys-color-primary, #FFC107); transform: translateY(-2px); }
.ic-btn-secondary:active { border-radius: 14px; transform: scale(.96); }
.ic-btn-secondary.show   { display: flex; }

.ic-btn-ghost {
  width: 100%; font-family: 'Outfit', sans-serif;
  background: transparent; color: var(--md-sys-color-on-surface-variant, #4D4639);
  border: 1px solid var(--md-sys-color-surface-variant, #EBE2CF);
  border-radius: 9999px; padding: 10px;
  font-size: .82rem; font-weight: 600; cursor: pointer;
  transition: all .2s ease;
}
.ic-btn-ghost:hover  { color: var(--md-sys-color-on-surface, #1E1B16); border-color: var(--md-sys-color-on-surface-variant, #4D4639); }
.ic-btn-ghost:active { transform: scale(.97); }

/* ── Preview Panel ── */
.ic-preview {
  background: var(--md-sys-color-surface, #FFFBF2);
  border: 1px solid var(--md-sys-color-surface-variant, #EBE2CF);
  border-radius: 20px; overflow: hidden;
}
.ic-tabs {
  display: flex;
  background: var(--md-sys-color-surface-variant, #EBE2CF);
  border-bottom: 1px solid var(--md-sys-color-surface-variant, #EBE2CF);
}
.ic-tab {
  flex: 1; padding: 12px;
  background: transparent; border: none;
  border-bottom: 2px solid transparent;
  font-family: 'Outfit', sans-serif; font-size: .82rem; font-weight: 700;
  color: var(--md-sys-color-on-surface-variant, #4D4639);
  cursor: pointer; transition: all .2s;
}
.ic-tab.active {
  color: var(--md-sys-color-primary, #FFC107);
  border-bottom-color: var(--md-sys-color-primary, #FFC107);
  background: var(--md-sys-color-primary-container, #FFE082);
}
.ic-tab:hover:not(.active) { color: var(--md-sys-color-on-surface, #1E1B16); }

.ic-preview-area {
  position: relative; min-height: 320px;
  display: flex; align-items: center; justify-content: center;
  background: repeating-conic-gradient(
    var(--md-sys-color-surface-variant,#EBE2CF) 0% 25%,
    var(--md-sys-color-surface,#FFFBF2) 0% 50%
  ) 0 0 / 16px 16px;
}
.ic-view {
  display: none; width: 100%; padding: 16px;
  flex-direction: column; align-items: center; justify-content: center;
}
.ic-view.active { display: flex; }
.ic-view img { max-width: 100%; max-height: 340px; object-fit: contain; border-radius: 10px; }

/* Compare slider */
.ic-compare { position: relative; min-height: 320px; cursor: col-resize; overflow: hidden; padding: 0 !important; }
.ic-cmp-before, .ic-cmp-after {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.ic-cmp-after { clip-path: inset(0 50% 0 0); z-index: 2; }
.ic-cmp-before img, .ic-cmp-after img {
  max-width: 100%; max-height: 320px; object-fit: contain;
  user-select: none; pointer-events: none;
}
.ic-cmp-line {
  position: absolute; top: 0; bottom: 0; left: 50%; width: 2px;
  background: var(--md-sys-color-primary, #FFC107); z-index: 10;
  box-shadow: 0 0 10px rgba(255,193,7,.6);
}
.ic-cmp-handle {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 36px; height: 36px;
  background: var(--md-sys-color-primary, #FFC107); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  z-index: 11; font-size: 12px; font-weight: 900;
  color: var(--md-sys-color-on-primary, #402D00);
  box-shadow: 0 0 18px rgba(255,193,7,.5);
}
.ic-cmp-lbl {
  position: absolute; top: 10px; z-index: 12;
  font-family: 'Outfit', sans-serif; font-size: .7rem; font-weight: 700;
  letter-spacing: .06em; text-transform: uppercase;
  background: rgba(0,0,0,.55); color: #fff;
  padding: 3px 10px; border-radius: 9999px;
}

/* Loading overlay */
#ic-loading {
  display: none; position: absolute; inset: 0;
  background: rgba(255,251,242,.85);
  flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; z-index: 10;
}
#ic-loading.show { display: flex; }
.ic-spinner {
  width: 36px; height: 36px;
  border: 3px solid var(--md-sys-color-surface-variant, #EBE2CF);
  border-top-color: var(--md-sys-color-primary, #FFC107);
  border-radius: 50%; animation: ic-spin .8s linear infinite;
}
@keyframes ic-spin { to { transform: rotate(360deg); } }
.ic-spin-txt {
  font-family: 'Outfit', sans-serif; font-size: .85rem; font-weight: 600;
  color: var(--md-sys-color-on-surface-variant, #4D4639);
}

/* Footer */
.ic-footer {
  padding: 10px 20px; text-align: center;
  font-family: 'Outfit', sans-serif; font-size: .72rem;
  color: var(--md-sys-color-on-surface-variant, #4D4639);
  border-top: 1px solid var(--md-sys-color-surface-variant, #EBE2CF);
  background: var(--md-sys-color-surface, #FFFBF2); flex-shrink: 0;
}

/* ── Dark theme overrides ── */
body.dark-theme #ic-modal {
  background: var(--md-sys-color-surface, #1E1B16);
}
body.dark-theme .ic-header,
body.dark-theme .ic-footer {
  background: var(--md-sys-color-surface, #1E1B16);
  border-color: var(--md-sys-color-surface-variant, #2C2814);
}
body.dark-theme #ic-dropzone {
  background: var(--md-sys-color-surface-variant, #2C2814);
  border-color: var(--md-sys-color-primary, #FFC107);
}
body.dark-theme #ic-dropzone:hover,
body.dark-theme #ic-dropzone.drag-over {
  background: var(--md-sys-color-primary-container, #3a2c00);
}
body.dark-theme .ic-settings {
  background: var(--md-sys-color-surface, #1E1B16);
  border-color: var(--md-sys-color-surface-variant, #2C2814);
}
body.dark-theme .ic-fmt-btn {
  background: var(--md-sys-color-surface-variant, #2C2814);
  border-color: transparent;
  color: var(--md-sys-color-on-surface-variant, #CDC5B4);
}
body.dark-theme .ic-fmt-btn.active {
  background: var(--md-sys-color-primary, #FFC107);
  color: var(--md-sys-color-on-primary, #402D00);
}
body.dark-theme .ic-stats {
  background: var(--md-sys-color-primary-container, #3a2c00);
}
body.dark-theme .ic-stats .ic-stat-row {
  color: var(--md-sys-color-on-primary-container, #FFE082);
}
body.dark-theme .ic-btn-secondary {
  background: var(--md-sys-color-surface-variant, #2C2814);
  color: var(--md-sys-color-on-surface, #EAE1D4);
  border-color: rgba(255,193,7,0.25);
}
body.dark-theme .ic-btn-ghost {
  border-color: var(--md-sys-color-surface-variant, #2C2814);
  color: var(--md-sys-color-on-surface-variant, #CDC5B4);
}
body.dark-theme .ic-preview {
  background: var(--md-sys-color-surface, #1E1B16);
  border-color: var(--md-sys-color-surface-variant, #2C2814);
}
body.dark-theme .ic-tabs {
  background: var(--md-sys-color-surface-variant, #2C2814);
}
body.dark-theme .ic-tab.active {
  background: var(--md-sys-color-primary-container, #3a2c00);
}
body.dark-theme .ic-dim-input {
  background: var(--md-sys-color-surface-variant, #2C2814);
  color: var(--md-sys-color-on-surface, #EAE1D4);
  border-color: rgba(255,193,7,0.2);
}
body.dark-theme .ic-close-btn {
  background: var(--md-sys-color-surface-variant, #2C2814);
  color: var(--md-sys-color-on-surface, #EAE1D4);
}
body.dark-theme #ic-loading {
  background: rgba(30,27,22,.88);
}
body.dark-theme .ic-chip {
  background: var(--md-sys-color-surface-variant, #2C2814);
  border-color: var(--md-sys-color-surface-variant, #2C2814);
}
`;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ══════════════════════════════════════
     HTML  —  same structure, updated icons
  ══════════════════════════════════════ */
  const html = `
  <div id="ic-overlay">
    <div id="ic-modal">

      <div class="ic-header">
        <div class="ic-logo">
          <div class="ic-logo-icon"><span class="material-symbols-rounded">wand_stars</span></div>
          <div class="ic-logo-text">Magical Image<br><span>Developed By Rohit Pal</span></div>
        </div>
        <button class="ic-close-btn" id="ic-close-btn" title="Close (Esc)">✕</button>
      </div>

      <div class="ic-body">

        <div id="ic-dropzone">
          <span class="ic-alien">🖼️</span>
          <div class="ic-drop-title">Drop your image here</div>
          <div class="ic-drop-sub">or click to browse — stays 100% on your device</div>
          <div class="ic-chips">
            <span class="ic-chip">JPG</span><span class="ic-chip">PNG</span>
            <span class="ic-chip">WebP</span><span class="ic-chip">GIF</span>
            <span class="ic-chip">BMP</span>
          </div>
          <button class="ic-browse-btn" id="ic-browse-btn">Browse Files</button>
          <input type="file" id="ic-file-input" accept="image/*" style="display:none" />
        </div>

        <div id="ic-workspace">
          <div class="ic-grid">

            <div class="ic-settings">
              <div class="ic-panel-title">⚙ Settings</div>

              <div class="ic-group">
                <div class="ic-lbl">Output Format</div>
                <div class="ic-fmt-grid">
                  <button class="ic-fmt-btn active" data-fmt="image/jpeg">JPG</button>
                  <button class="ic-fmt-btn" data-fmt="image/webp">WebP</button>
                  <button class="ic-fmt-btn" data-fmt="image/png">PNG</button>
                </div>
              </div>

              <div class="ic-group" id="ic-quality-grp">
                <div class="ic-lbl">Quality <span class="ic-lbl-val" id="ic-quality-val">82%</span></div>
                <input type="range" class="ic-slider" id="ic-quality" min="1" max="100" value="82" />
              </div>

              <div class="ic-group">
                <div class="ic-toggle-row">
                  <span class="ic-lbl" style="margin-bottom:0">Resize</span>
                  <label class="ic-toggle-wrap">
                    <input type="checkbox" id="ic-resize-chk" />
                    <span class="ic-track"></span>
                  </label>
                </div>
                <div id="ic-resize-row">
                  <input type="number" class="ic-dim-input" id="ic-rw" placeholder="Width" />
                  <span class="ic-dim-sep">×</span>
                  <input type="number" class="ic-dim-input" id="ic-rh" placeholder="Height" />
                </div>
              </div>

              <div class="ic-stats">
                <div class="ic-stat-row"><span>Original</span><strong id="ic-s-orig">—</strong></div>
                <div class="ic-stat-row"><span>Dimensions</span><strong id="ic-s-dims">—</strong></div>
                <hr class="ic-stat-hr" />
                <div class="ic-stat-row"><span>Compressed</span><strong id="ic-s-comp">—</strong></div>
                <div class="ic-stat-row"><span>Saved</span><strong id="ic-s-save" class="ic-stat-saving">—</strong></div>
              </div>

              <button class="ic-btn-primary" id="ic-crush-btn">Magic!</button>
              <button class="ic-btn-secondary" id="ic-dl-btn">Download</button>
              <button class="ic-btn-ghost" id="ic-new-btn">+ New Image</button>
            </div>

            <div class="ic-preview">
              <div class="ic-tabs">
                <button class="ic-tab active" data-tab="original">Original</button>
                <button class="ic-tab" data-tab="compressed">Compressed</button>
                <button class="ic-tab" data-tab="compare">Compare</button>
              </div>
              <div class="ic-preview-area">
                <div id="ic-loading">
                  <div class="ic-spinner"></div>
                  <span class="ic-spin-txt">Doing Magic...</span>
                </div>
                <div id="ic-view-original"   class="ic-view active"><img id="ic-orig-img" src="" alt="Original" /></div>
                <div id="ic-view-compressed" class="ic-view"><img id="ic-comp-img" src="" alt="Compressed" /></div>
                <div id="ic-view-compare"    class="ic-view ic-compare">
                  <div class="ic-cmp-before"><img id="ic-cmp-o" src="" alt="Before" /></div>
                  <div class="ic-cmp-after" id="ic-cmp-after"><img id="ic-cmp-c" src="" alt="After" /></div>
                  <div class="ic-cmp-line"   id="ic-cmp-line"></div>
                  <div class="ic-cmp-handle" id="ic-cmp-handle">⟺</div>
                  <span class="ic-cmp-lbl" style="left:10px">Before</span>
                  <span class="ic-cmp-lbl" style="right:10px;color:var(--md-sys-color-primary,#FFC107)">After</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="ic-footer">On-Device Image Processing</div>
    </div>
  </div>
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  /* ══════════════════════════════════════
     JS  —  Core Architecture
  ══════════════════════════════════════ */
  const $ = id => document.getElementById(id);
  const fmtBytes = b => b < 1024 ? b + ' B' : b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(2) + ' MB';

  let ic_file = null, ic_origURL = null, ic_compBlob = null;
  let ic_fmt = 'image/jpeg', ic_tab = 'original';

  /* ── Open / Close ── */
  const open  = () => { $('ic-overlay').classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = () => { $('ic-overlay').classList.remove('open'); document.body.style.overflow = ''; };

  $('ic-close-btn').addEventListener('click', close);
  $('ic-overlay').addEventListener('click', e => { if (e.target === $('ic-overlay')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  /* ── Drag & Drop ── */
  const dz = $('ic-dropzone');
  dz.addEventListener('dragover',  e => { e.preventDefault(); dz.classList.add('drag-over'); });
  dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
  dz.addEventListener('drop', e => {
    e.preventDefault(); dz.classList.remove('drag-over');
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) loadImg(f);
  });
  $('ic-browse-btn').addEventListener('click', () => $('ic-file-input').click());
  $('ic-file-input').addEventListener('change', e => { if (e.target.files[0]) loadImg(e.target.files[0]); });

  /* ── Load ── */
  function loadImg(file) {
    ic_file = file; ic_compBlob = null;
    const reader = new FileReader();
    reader.onload = e => {
      ic_origURL = e.target.result;
      const img = new Image();
      img.onload = () => {
        $('ic-rw').value = img.naturalWidth;
        $('ic-rh').value = img.naturalHeight;
        $('ic-s-orig').textContent = fmtBytes(file.size);
        $('ic-s-dims').textContent = `${img.naturalWidth} × ${img.naturalHeight}`;
        $('ic-s-comp').textContent = '—';
        $('ic-s-save').textContent = '—';
        $('ic-dropzone').style.display  = 'none';
        $('ic-workspace').style.display = 'block';
        $('ic-orig-img').src = ic_origURL;
        $('ic-cmp-o').src    = ic_origURL;
        $('ic-dl-btn').classList.remove('show');
        switchTab('original');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  /* ── Format ── */
  document.querySelectorAll('.ic-fmt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ic-fmt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ic_fmt = btn.dataset.fmt;
      $('ic-quality-grp').style.display = ic_fmt === 'image/png' ? 'none' : 'block';
    });
  });

  /* ── Quality slider ── */
  const slider = $('ic-quality');
  const updateSlider = () => {
    $('ic-quality-val').textContent = slider.value + '%';
    slider.style.background = `linear-gradient(to right, var(--md-sys-color-primary,#FFC107) ${slider.value}%, var(--md-sys-color-surface-variant,#EBE2CF) ${slider.value}%)`;
  };
  slider.addEventListener('input', updateSlider);
  updateSlider();

  /* ── Resize ── */
  $('ic-resize-chk').addEventListener('change', function () {
    $('ic-resize-row').classList.toggle('show', this.checked);
  });
  $('ic-rw').addEventListener('input', () => {
    const img = $('ic-orig-img');
    if (img.naturalWidth) $('ic-rh').value = Math.round(parseInt($('ic-rw').value) * img.naturalHeight / img.naturalWidth) || '';
  });
  $('ic-rh').addEventListener('input', () => {
    const img = $('ic-orig-img');
    if (img.naturalHeight) $('ic-rw').value = Math.round(parseInt($('ic-rh').value) * img.naturalWidth / img.naturalHeight) || '';
  });

  /* ── Compress ── */
  $('ic-crush-btn').addEventListener('click', async () => {
    if (!ic_origURL) return;
    $('ic-loading').classList.add('show');
    $('ic-crush-btn').disabled = true;
    await new Promise(r => setTimeout(r, 50));

    try {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = ic_origURL; });

      let w = img.naturalWidth, h = img.naturalHeight;
      if ($('ic-resize-chk').checked) {
        w = parseInt($('ic-rw').value) || w;
        h = parseInt($('ic-rh').value) || h;
      }

      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const quality = ic_fmt === 'image/png' ? 1 : slider.value / 100;

      await new Promise(resolve => {
        canvas.toBlob(blob => {
          ic_compBlob = blob;
          const url = URL.createObjectURL(blob);
          $('ic-comp-img').src = url;
          $('ic-cmp-c').src    = url;

          const saved = ic_file.size - blob.size;
          const pct   = ((saved / ic_file.size) * 100).toFixed(1);
          $('ic-s-comp').textContent = fmtBytes(blob.size);
          const saveEl = $('ic-s-save');
          if (saved > 0) {
            saveEl.textContent = `↓ ${fmtBytes(saved)} (${pct}%)`;
            saveEl.style.color = 'var(--md-sys-color-primary, #FFC107)';
          } else {
            saveEl.textContent = `↑ +${fmtBytes(Math.abs(saved))} (larger)`;
            saveEl.style.color = '#F44336';
          }
          switchTab('compressed');
          $('ic-dl-btn').classList.add('show');
          resolve();
        }, ic_fmt, quality);
      });
    } catch (err) { console.error('[ImgCrusher]', err); }
    finally { $('ic-loading').classList.remove('show'); $('ic-crush-btn').disabled = false; }
  });

  /* ── Download ── */
  $('ic-dl-btn').addEventListener('click', () => {
    if (!ic_compBlob) return;
    const ext  = { 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/png': 'png' }[ic_fmt] || 'jpg';
    const name = (ic_file.name || 'image').replace(/\.[^.]+$/, '');
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(ic_compBlob);
    a.download = `${name}_magical_image.${ext}`;
    a.click();
  });

  /* ── New Image ── */
  $('ic-new-btn').addEventListener('click', () => {
    ic_file = null; ic_origURL = null; ic_compBlob = null;
    $('ic-file-input').value = '';
    $('ic-workspace').style.display = 'none';
    $('ic-dropzone').style.display  = 'block';
    $('ic-dl-btn').classList.remove('show');
  });

  /* ── Tabs ── */
  document.querySelectorAll('.ic-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  function switchTab(tab) {
    ic_tab = tab;
    document.querySelectorAll('.ic-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.ic-view').forEach(v => v.classList.remove('active'));
    document.getElementById(`ic-view-${tab}`).classList.add('active');
  }

  /* ── Compare drag ── */
  let dragging = false;
  const cmpView = $('ic-view-compare');
  cmpView.addEventListener('mousedown',  e => { dragging = true; onDrag(e); });
  cmpView.addEventListener('touchstart', e => { dragging = true; onDrag(e); }, { passive: true });
  window.addEventListener('mousemove',  onDrag);
  window.addEventListener('touchmove',  onDrag, { passive: true });
  window.addEventListener('mouseup',   () => dragging = false);
  window.addEventListener('touchend',  () => dragging = false);
  function onDrag(e) {
    if (!dragging || ic_tab !== 'compare') return;
    const rect = cmpView.getBoundingClientRect();
    const x    = e.touches ? e.touches[0].clientX : e.clientX;
    const pct  = Math.max(2, Math.min(98, ((x - rect.left) / rect.width) * 100));
    $('ic-cmp-after').style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    $('ic-cmp-line').style.left      = pct + '%';
    $('ic-cmp-handle').style.left    = pct + '%';
  }

  window.ImgCrusher = { open, close };

})();
