(function () {
  'use strict';

  const css = `
    :root {
      --ic-primary:      #FFC107;
      --ic-on-primary:   #1C1400;
      --ic-primary-cont: #2C2000;
      --ic-on-pri-cont:  #FFDEA0;
      --ic-bg:           #0D0D0D;
      --ic-surface:      #141414;
      --ic-surface-var:  #1C1B18;
      --ic-surface-high: #222220;
      --ic-on-surface:   #E8E1D5;
      --ic-on-var:       #CAC4B0;
      --ic-outline:      #403D30;
      --ic-outline-var:  #27251C;
      --ic-error:        #FFB4AB;
      --ic-font:         'Outfit', sans-serif;
    }
    
    .ic-toggle-wrap, .ic-toggle-wrap * {
  outline: none !important;
  -webkit-tap-highlight-color: transparent !important;
  user-select: none;
}

    /* Trigger */
    .ic-trigger-btn {
      font-family: var(--ic-font);
      background: var(--ic-primary); color: var(--ic-on-primary);
      border: none; border-radius: 9999px;
      padding: 12px 28px; font-size: .9375rem; font-weight: 600;
      cursor: pointer; letter-spacing: .01em;
      box-shadow: 0 2px 12px rgba(255,193,7,.3);
      transition: all .2s ease;
    }
    .ic-trigger-btn:hover {
      background: #FFD04D;
      box-shadow: 0 6px 24px rgba(255,193,7,.45);
      transform: translateY(-1px);
    }

    /* Overlay */
    #ic-overlay {
      display: none; position: fixed; inset: 0; z-index: 99999;
      background: rgba(0,0,0,.78);
      backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      align-items: center; justify-content: center;
      padding: 16px; animation: ic-fade .2s ease;
    }
    #ic-overlay.open { display: flex; }
    @keyframes ic-fade { from { opacity:0 } to { opacity:1 } }

    /* Modal */
    #ic-modal {
      background: var(--ic-bg);
      border: 1px solid var(--ic-outline-var); border-radius: 24px;
      width: 100%; max-width: 920px; max-height: 90vh;
      overflow: hidden; display: flex; flex-direction: column;
      box-shadow: 0 24px 80px rgba(0,0,0,.85);
      animation: ic-up .25s cubic-bezier(.2,0,0,1);
    }
    @keyframes ic-up { from { transform:translateY(24px); opacity:0 } to { transform:translateY(0); opacity:1 } }

    /* Header */
    .ic-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px; border-bottom: 1px solid var(--ic-outline-var);
      background: var(--ic-surface); flex-shrink: 0;
    }
    .ic-logo { display: flex; align-items: center; gap: 10px; }
    .ic-logo-icon {
      width: 32px; height: 32px; background: var(--ic-primary);
      border-radius: 10px; display: flex; align-items: center; justify-content: center;
      font-size: 16px; box-shadow: 0 0 14px rgba(255,193,7,.4);
      animation: ic-pulse 3s ease-in-out infinite;
    }
    @keyframes ic-pulse {
      0%,100% { box-shadow: 0 0 14px rgba(255,193,7,.35) }
      50%      { box-shadow: 0 0 26px rgba(255,193,7,.6)  }
    }
    .ic-logo-text {
      font-family: var(--ic-font); font-size: 1.1rem; font-weight: 700;
      color: var(--ic-on-surface); letter-spacing: -.02em;
    }
    .ic-logo-text span { color: var(--ic-primary); }
    .ic-close-btn {
      background: transparent; border: none; color: var(--ic-on-var);
      font-size: 1rem; width: 36px; height: 36px; border-radius: 50%;
      cursor: pointer; font-family: var(--ic-font);
      display: flex; align-items: center; justify-content: center; transition: all .15s;
    }
    .ic-close-btn:hover { background: var(--ic-surface-var); color: var(--ic-on-surface); }

    /* Body */
    .ic-body { overflow-y: auto; flex: 1; padding: 20px; }

    /* Drop Zone */
    #ic-dropzone {
      border: 2px dashed var(--ic-outline); border-radius: 20px;
      background: var(--ic-surface); padding: 48px 24px;
      text-align: center; cursor: pointer; transition: all .25s ease;
    }
    #ic-dropzone:hover, #ic-dropzone.drag-over {
      border-color: var(--ic-primary); background: var(--ic-primary-cont);
      transform: translateY(-2px); box-shadow: 0 0 0 4px rgba(255,193,7,.08);
    }
    .ic-alien {
      display: block; font-size: 48px; line-height: 1; margin-bottom: 12px;
      animation: ic-float 4s ease-in-out infinite;
    }
    @keyframes ic-float {
      0%,100% { transform: translateY(0) }
      50%      { transform: translateY(-8px) }
    }
    .ic-drop-title {
      font-family: var(--ic-font); font-size: 1.25rem; font-weight: 700;
      color: var(--ic-on-surface); margin-bottom: 6px;
    }
    .ic-drop-sub {
      font-family: var(--ic-font); font-size: .875rem;
      color: var(--ic-on-var); margin-bottom: 20px;
    }
    .ic-chips { display: flex; gap: 6px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
    .ic-chip {
      font-family: var(--ic-font); font-size: .7rem; font-weight: 600;
      background: var(--ic-surface-var); color: var(--ic-on-var);
      border: 1px solid var(--ic-outline); padding: 3px 10px; border-radius: 9999px;
    }
    .ic-browse-btn {
      font-family: var(--ic-font);
      background: var(--ic-primary); color: var(--ic-on-primary);
      border: none; border-radius: 9999px; padding: 11px 28px;
      font-size: .9rem; font-weight: 600; cursor: pointer;
      box-shadow: 0 2px 12px rgba(255,193,7,.3); transition: all .2s;
    }
    .ic-browse-btn:hover { background: #FFD04D; transform: translateY(-1px); }

    /* Workspace */
    #ic-workspace { display: none; }
    .ic-grid {
      display: grid; grid-template-columns: 260px 1fr;
      gap: 16px; align-items: start;
    }
    @media (max-width: 620px) { .ic-grid { grid-template-columns: 1fr; } }

    /* Settings */
    .ic-settings {
  background: var(--ic-surface); border: 1px solid var(--ic-outline-var);
  border-radius: 16px; padding: 18px;
  overflow: hidden;
}
    }
    .ic-panel-title {
      font-family: var(--ic-font); font-size: .7rem; font-weight: 700;
      color: var(--ic-primary); letter-spacing: .1em;
      text-transform: uppercase; margin-bottom: 16px;
    }
    .ic-group { margin-bottom: 18px; }
    .ic-lbl {
      display: flex; justify-content: space-between; align-items: center;
      font-family: var(--ic-font); font-size: .8rem; font-weight: 500;
      color: var(--ic-on-var); margin-bottom: 8px;
    }
    .ic-lbl-val { font-weight: 700; color: var(--ic-primary); }

    /* Format grid */
    .ic-fmt-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 5px; }
    .ic-fmt-btn {
      background: var(--ic-surface-var); border: 1px solid var(--ic-outline);
      border-radius: 10px; padding: 7px 4px; font-family: var(--ic-font);
      font-size: .75rem; font-weight: 600; color: var(--ic-on-var);
      cursor: pointer; text-align: center; transition: all .15s;
    }
    .ic-fmt-btn:hover { border-color: var(--ic-primary); color: var(--ic-primary); }
    .ic-fmt-btn.active {
      background: var(--ic-primary-cont); border-color: var(--ic-primary); color: var(--ic-primary);
    }

    /* Slider */
    .ic-slider {
      -webkit-appearance: none; appearance: none;
      width: 100%; height: 4px; background: var(--ic-outline);
      border-radius: 9999px; outline: none; cursor: pointer;
    }
    .ic-slider::-webkit-slider-thumb {
      -webkit-appearance: none; width: 20px; height: 20px;
      border-radius: 50%; background: var(--ic-primary);
      box-shadow: 0 0 0 3px rgba(255,193,7,.25); cursor: pointer; transition: box-shadow .15s;
    }
    .ic-slider::-webkit-slider-thumb:hover { box-shadow: 0 0 0 7px rgba(255,193,7,.2); }

    /* Toggle */
    .ic-toggle-row { display: flex; align-items: center; justify-content: space-between; }
    .ic-toggle-wrap { position: relative; width: 44px; height: 26px;}
    .ic-toggle-wrap input { opacity: 0; width: 0; height: 0; }
    .ic-track {
      position: absolute; inset: 0; background: var(--ic-outline);
      border-radius: 9999px; cursor: pointer; transition: background .2s;
    }
    .ic-track::after {
      content: ''; position: absolute; top: 3px; left: 3px;
      width: 20px; height: 20px; background: white; border-radius: 50%; transition: transform .2s;
    }
    .ic-toggle-wrap input:checked + .ic-track { background: var(--ic-primary); }
    .ic-toggle-wrap input:checked + .ic-track::after { transform: translateX(18px); }

    /* Resize inputs */
    #ic-resize-row {
      display: none; gap: 8px; margin-top: 10px; align-items: center;
    }
    #ic-resize-row.show { display: flex; }
    .ic-dim-input {
      flex: 1; min-width: 0; background: var(--ic-surface-high); border: 1px solid var(--ic-outline);
      border-radius: 10px; padding: 7px 10px; font-family: var(--ic-font);
      font-size: .8rem; color: var(--ic-on-surface); outline: none; transition: border-color .2s;
    }
    .ic-dim-input:focus { border-color: var(--ic-primary); }
    .ic-dim-sep { color: var(--ic-on-var); font-size: 1rem; }

    /* Stats */
    .ic-stats {
      background: var(--ic-primary-cont); border: 1px solid rgba(255,193,7,.2);
      border-radius: 12px; padding: 14px; margin-bottom: 14px;
    }
    .ic-stat-row {
      display: flex; justify-content: space-between; align-items: center;
      font-family: var(--ic-font); font-size: .8rem;
      color: var(--ic-on-pri-cont); padding: 4px 0;
    }
    .ic-stat-row span { opacity: .7; }
    .ic-stat-hr { border: none; border-top: 1px solid rgba(255,193,7,.15); margin: 6px 0; }
    .ic-stat-saving { color: var(--ic-primary); font-size: .9rem; }

    /* Buttons */
    .ic-btn-primary {
      width: 100%; font-family: var(--ic-font);
      background: var(--ic-primary); color: var(--ic-on-primary);
      border: none; border-radius: 9999px; padding: 12px;
      font-size: .9rem; font-weight: 700; cursor: pointer; margin-bottom: 8px;
      box-shadow: 0 2px 12px rgba(255,193,7,.3); transition: all .2s;
      display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .ic-btn-primary:hover { background: #FFD04D; transform: translateY(-1px); }
    .ic-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }
    .ic-btn-secondary {
      width: 100%; font-family: var(--ic-font);
      background: var(--ic-surface-high); color: var(--ic-on-surface);
      border: 1px solid var(--ic-outline); border-radius: 9999px; padding: 11px;
      font-size: .85rem; font-weight: 600; cursor: pointer; margin-bottom: 8px;
      transition: all .2s; display: none;
      align-items: center; justify-content: center; gap: 6px;
    }
    .ic-btn-secondary:hover { border-color: var(--ic-primary); color: var(--ic-primary); background: var(--ic-primary-cont); }
    .ic-btn-secondary.show { display: flex; }
    .ic-btn-ghost {
      width: 100%; font-family: var(--ic-font);
      background: transparent; color: var(--ic-on-var);
      border: 1px solid var(--ic-outline-var); border-radius: 9999px;
      padding: 9px; font-size: .8rem; font-weight: 500; cursor: pointer; transition: all .15s;
    }
    .ic-btn-ghost:hover { color: var(--ic-on-surface); border-color: var(--ic-outline); }

    /* Preview */
    .ic-preview {
      background: var(--ic-surface); border: 1px solid var(--ic-outline-var);
      border-radius: 16px; overflow: hidden;
    }
    .ic-tabs { display: flex; background: var(--ic-surface-var); border-bottom: 1px solid var(--ic-outline-var); }
    .ic-tab {
      flex: 1; padding: 12px; background: transparent;
      border: none; border-bottom: 2px solid transparent;
      font-family: var(--ic-font); font-size: .8rem; font-weight: 600;
      color: var(--ic-on-var); cursor: pointer; transition: all .15s;
    }
    .ic-tab.active { color: var(--ic-primary); border-bottom-color: var(--ic-primary); background: rgba(255,193,7,.05); }
    .ic-tab:hover:not(.active) { color: var(--ic-on-surface); }

    .ic-preview-area {
      position: relative; min-height: 320px;
      display: flex; align-items: center; justify-content: center;
      background: repeating-conic-gradient(var(--ic-surface-var) 0% 25%, var(--ic-surface) 0% 50%) 0 0 / 16px 16px;
    }
    .ic-view {
      display: none; width: 100%; padding: 16px;
      flex-direction: column; align-items: center; justify-content: center;
    }
    .ic-view.active { display: flex; }
    .ic-view img { max-width: 100%; max-height: 340px; object-fit: contain; border-radius: 8px; }

    /* Compare */
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
      background: var(--ic-primary); z-index: 10; box-shadow: 0 0 10px rgba(255,193,7,.6);
    }
    .ic-cmp-handle {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
      width: 36px; height: 36px; background: var(--ic-primary); border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      z-index: 11; font-size: 12px; font-weight: 900; color: var(--ic-on-primary);
      box-shadow: 0 0 18px rgba(255,193,7,.5);
    }
    .ic-cmp-lbl {
      position: absolute; top: 10px; z-index: 12;
      font-family: var(--ic-font); font-size: .7rem; font-weight: 700;
      letter-spacing: .06em; text-transform: uppercase;
      background: rgba(0,0,0,.7); color: var(--ic-on-var);
      padding: 3px 8px; border-radius: 9999px;
    }

    /* Loading */
    #ic-loading {
      display: none; position: absolute; inset: 0;
      background: rgba(13,13,13,.85); flex-direction: column;
      align-items: center; justify-content: center; gap: 12px; z-index: 10;
    }
    #ic-loading.show { display: flex; }
    .ic-spinner {
      width: 36px; height: 36px; border: 3px solid var(--ic-outline);
      border-top-color: var(--ic-primary); border-radius: 50%;
      animation: ic-spin .8s linear infinite;
    }
    @keyframes ic-spin { to { transform: rotate(360deg) } }
    .ic-spin-txt { font-family: var(--ic-font); font-size: .85rem; color: var(--ic-on-var); }

    /* ── Focus / WebKit tap highlight fix ── */
    .ic-trigger-btn, .ic-close-btn, .ic-browse-btn,
    .ic-fmt-btn, .ic-slider, .ic-btn-primary,
    .ic-btn-secondary, .ic-btn-ghost, .ic-tab,
    .ic-dim-input, .ic-toggle-wrap input,
    #ic-dropzone, #ic-resize-chk {
      -webkit-tap-highlight-color: transparent;
    }
    .ic-trigger-btn:focus, .ic-close-btn:focus,
    .ic-browse-btn:focus, .ic-fmt-btn:focus,
    .ic-btn-primary:focus, .ic-btn-secondary:focus,
    .ic-btn-ghost:focus, .ic-tab:focus,
    .ic-dim-input:focus, #ic-dropzone:focus,
    #ic-resize-chk:focus,
    .ic-toggle-wrap:focus-within .ic-track {
      outline: none;
      box-shadow: none;
    }

    /* Footer */
    .ic-footer {
      padding: 10px 20px; text-align: center;
      font-family: var(--ic-font); font-size: .72rem; color: var(--ic-on-var);
      border-top: 1px solid var(--ic-outline-var); background: var(--ic-surface); flex-shrink: 0;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const html = `
  <div id="ic-overlay">
    <div id="ic-modal">

      <div class="ic-header">
        <div class="ic-logo">
          <div class="ic-logo-text">Magical Image<br><span>Developed By Rohit Pal</span></div>
        </div>
        <button class="ic-close-btn" id="ic-close-btn" title="Close (Esc)">✕</button>
      </div>

      <div class="ic-body">

        <div id="ic-dropzone">
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
              <div class="ic-panel-title">Settings</div>

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
                <div id="ic-loading"><div class="ic-spinner"></div><span class="ic-spin-txt">Doing Magic...</span></div>
                <div id="ic-view-original" class="ic-view active"><img id="ic-orig-img" src="" alt="Original" /></div>
                <div id="ic-view-compressed" class="ic-view"><img id="ic-comp-img" src="" alt="Compressed" /></div>
                <div id="ic-view-compare" class="ic-view ic-compare">
                  <div class="ic-cmp-before"><img id="ic-cmp-o" src="" alt="Before" /></div>
                  <div class="ic-cmp-after" id="ic-cmp-after"><img id="ic-cmp-c" src="" alt="After" /></div>
                  <div class="ic-cmp-line" id="ic-cmp-line"></div>
                  <div class="ic-cmp-handle" id="ic-cmp-handle">⟺</div>
                  <span class="ic-cmp-lbl" style="left:10px">Before</span>
                  <span class="ic-cmp-lbl" style="right:10px;color:var(--ic-primary)">After</span>
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

  /* ── Quality ── */
  const slider = $('ic-quality');
  const updateSlider = () => {
    $('ic-quality-val').textContent = slider.value + '%';
    slider.style.background = `linear-gradient(to right, var(--ic-primary) ${slider.value}%, var(--ic-outline) ${slider.value}%)`;
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
            saveEl.style.color = 'var(--ic-primary)';
          } else {
            saveEl.textContent = `↑ +${fmtBytes(Math.abs(saved))} (larger)`;
            saveEl.style.color = 'var(--ic-error)';
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
    a.download = `${name}_crushed.${ext}`;
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
