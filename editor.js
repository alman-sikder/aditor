// ── Aditor – Browser Video Editor ──

const uploadZone = document.getElementById('uploadZone');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const editorWorkspace = document.getElementById('editorWorkspace');
const videoPreview = document.getElementById('videoPreview');
const videoInfo = document.getElementById('videoInfo');

// ── File Loading ──
uploadBtn.addEventListener('click', () => fileInput.click());
uploadZone.addEventListener('click', e => { if (e.target !== uploadBtn) fileInput.click(); });

uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('video/')) loadVideo(file);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) loadVideo(fileInput.files[0]);
});

function loadVideo(file) {
  const url = URL.createObjectURL(file);
  videoPreview.src = url;
  videoPreview.load();
  videoPreview.onloadedmetadata = () => {
    uploadZone.style.display = 'none';
    editorWorkspace.style.display = 'grid';
    const dur = videoPreview.duration;
    videoInfo.textContent = `📁 ${file.name} · ⏱️ ${formatTime(dur)} · 📐 ${videoPreview.videoWidth}×${videoPreview.videoHeight} · 💾 ${(file.size / 1024 / 1024).toFixed(2)} MB`;
    document.getElementById('trimEnd').value = dur.toFixed(1);
    initTrimBar(dur);
    updatePlayhead();
  };
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(1);
  return `${m}:${sec.padStart(4, '0')}`;
}

// ── Filters & Adjustments ──
let activePresetFilter = 'none';
let brightness = 100, contrast = 100, saturation = 100, hue = 0, blur = 0, opacity = 100, sharpness = 0;

function buildFilter() {
  let f = '';
  if (activePresetFilter !== 'none') {
    f = activePresetFilter;
  } else {
    f = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg) blur(${blur}px)`;
    if (sharpness > 0) f += ` contrast(${100 + sharpness * 10}%)`;
  }
  videoPreview.style.filter = f;
  videoPreview.style.opacity = opacity / 100;
}

document.querySelectorAll('.filter-preset').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-preset').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activePresetFilter = btn.dataset.filter;
    buildFilter();
  });
});

function bindSlider(id, valId, setter) {
  const el = document.getElementById(id);
  const valEl = document.getElementById(valId);
  el.addEventListener('input', () => {
    setter(parseFloat(el.value));
    valEl.textContent = el.value;
    activePresetFilter = 'none';
    document.querySelectorAll('.filter-preset').forEach(b => b.classList.remove('active'));
    document.querySelector('.filter-preset[data-filter="none"]').classList.add('active');
    buildFilter();
  });
}

bindSlider('brightness', 'brightnessVal', v => brightness = v);
bindSlider('contrast', 'contrastVal', v => contrast = v);
bindSlider('saturation', 'saturationVal', v => saturation = v);
bindSlider('hue', 'hueVal', v => hue = v);
bindSlider('blur', 'blurVal', v => blur = v);
bindSlider('opacity', 'opacityVal', v => opacity = v);
bindSlider('sharpness', 'sharpnessVal', v => sharpness = v);

document.getElementById('resetFilters').addEventListener('click', () => {
  brightness = contrast = saturation = 100; hue = blur = sharpness = 0; opacity = 100;
  ['brightness','contrast','saturation'].forEach(id => document.getElementById(id).value = 100);
  ['hue','blur','sharpness'].forEach(id => document.getElementById(id).value = 0);
  document.getElementById('opacity').value = 100;
  ['brightnessVal','contrastVal','saturationVal'].forEach(id => document.getElementById(id).textContent = 100);
  ['hueVal','blurVal','sharpnessVal'].forEach(id => document.getElementById(id).textContent = 0);
  document.getElementById('opacityVal').textContent = 100;
  activePresetFilter = 'none';
  document.querySelectorAll('.filter-preset').forEach(b => b.classList.remove('active'));
  document.querySelector('.filter-preset[data-filter="none"]').classList.add('active');
  buildFilter();
});

// ── Transform ──
let flipHState = false, flipVState = false, rotateState = 0;

function applyTransform() {
  const scaleX = flipHState ? -1 : 1;
  const scaleY = flipVState ? -1 : 1;
  videoPreview.style.transform = `scale(${scaleX},${scaleY}) rotate(${rotateState}deg)`;
}

document.getElementById('flipH').addEventListener('click', () => {
  flipHState = !flipHState;
  document.getElementById('flipH').classList.toggle('active', flipHState);
  applyTransform();
});

document.getElementById('flipV').addEventListener('click', () => {
  flipVState = !flipVState;
  document.getElementById('flipV').classList.toggle('active', flipVState);
  applyTransform();
});

document.getElementById('rotate90').addEventListener('click', () => {
  rotateState = (rotateState + 90) % 360;
  applyTransform();
});

document.getElementById('rotate180').addEventListener('click', () => {
  rotateState = (rotateState + 180) % 360;
  applyTransform();
});

document.getElementById('resetTransform').addEventListener('click', () => {
  flipHState = flipVState = false;
  rotateState = 0;
  document.getElementById('flipH').classList.remove('active');
  document.getElementById('flipV').classList.remove('active');
  applyTransform();
  document.getElementById('aspectRatio').value = 'none';
  videoPreview.style.aspectRatio = '';
});

// Aspect Ratio
document.getElementById('aspectRatio').addEventListener('change', e => {
  const val = e.target.value;
  if (val === 'none') {
    videoPreview.style.aspectRatio = '';
    videoPreview.style.width = '100%';
    videoPreview.style.height = '';
  } else {
    videoPreview.style.aspectRatio = val;
    videoPreview.style.width = '100%';
    videoPreview.style.height = 'auto';
  }
});

// ── Speed ──
document.querySelectorAll('.speed-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    videoPreview.playbackRate = parseFloat(btn.dataset.speed);
  });
});

// ── Volume ──
document.getElementById('volume').addEventListener('input', e => {
  videoPreview.volume = e.target.value / 100;
  document.getElementById('volumeVal').textContent = e.target.value;
});

let muted = false;
document.getElementById('muteBtn').addEventListener('click', () => {
  muted = !muted;
  videoPreview.muted = muted;
  document.getElementById('muteBtn').textContent = muted ? '🔊 Unmute' : '🔇 Mute';
});

// ── Trim Bar ──
let trimStartSec = 0, trimEndSec = 0, videoDuration = 0;

function initTrimBar(dur) {
  videoDuration = dur;
  trimStartSec = 0;
  trimEndSec = dur;
  updateTrimBar();
  renderTimeLabels(dur);
}

function renderTimeLabels(dur) {
  const el = document.getElementById('trimTimeLabels');
  const steps = 5;
  let html = '';
  for (let i = 0; i <= steps; i++) {
    html += `<span>${formatTime((dur / steps) * i)}</span>`;
  }
  el.innerHTML = html;
}

function updateTrimBar() {
  const bar = document.getElementById('trimBar');
  const range = document.getElementById('trimRange');
  const leftHandle = document.getElementById('trimLeft');
  const rightHandle = document.getElementById('trimRight');
  const leftPct = (trimStartSec / videoDuration) * 100;
  const rightPct = (trimEndSec / videoDuration) * 100;
  leftHandle.style.left = leftPct + '%';
  rightHandle.style.left = rightPct + '%';
  range.style.left = leftPct + '%';
  range.style.width = (rightPct - leftPct) + '%';
  document.getElementById('trimStart').value = trimStartSec.toFixed(1);
  document.getElementById('trimEnd').value = trimEndSec.toFixed(1);
}

function updatePlayhead() {
  videoPreview.addEventListener('timeupdate', () => {
    if (!videoDuration) return;
    const pct = (videoPreview.currentTime / videoDuration) * 100;
    document.getElementById('trimPlayhead').style.left = pct + '%';
  });
}

let dragging = null;
const trimBar = document.getElementById('trimBar');

['trimLeft','trimRight'].forEach(id => {
  document.getElementById(id).addEventListener('mousedown', e => {
    dragging = id === 'trimLeft' ? 'left' : 'right';
    e.preventDefault();
  });
});

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const rect = trimBar.getBoundingClientRect();
  let pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const sec = pct * videoDuration;
  if (dragging === 'left') {
    trimStartSec = Math.min(sec, trimEndSec - 0.1);
  } else {
    trimEndSec = Math.max(sec, trimStartSec + 0.1);
  }
  updateTrimBar();
});

document.addEventListener('mouseup', () => { dragging = null; });

trimBar.addEventListener('click', e => {
  const rect = trimBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  videoPreview.currentTime = pct * videoDuration;
});

document.getElementById('trimStart').addEventListener('change', e => {
  trimStartSec = Math.max(0, Math.min(parseFloat(e.target.value), trimEndSec - 0.1));
  updateTrimBar();
});
document.getElementById('trimEnd').addEventListener('change', e => {
  trimEndSec = Math.min(videoDuration, Math.max(parseFloat(e.target.value), trimStartSec + 0.1));
  updateTrimBar();
});

document.getElementById('previewTrimBtn').addEventListener('click', () => {
  videoPreview.currentTime = trimStartSec;
  videoPreview.play();
  const stopAt = () => {
    if (videoPreview.currentTime >= trimEndSec) {
      videoPreview.pause();
      videoPreview.removeEventListener('timeupdate', stopAt);
    }
  };
  videoPreview.addEventListener('timeupdate', stopAt);
});

document.getElementById('resetTrimBtn').addEventListener('click', () => {
  trimStartSec = 0;
  trimEndSec = videoDuration;
  updateTrimBar();
});

// ── Text Overlay (live CSS overlay div) ──
let overlayDiv = null;

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

function getOverlaySettings() {
  return {
    text: document.getElementById('overlayText').value,
    fontSize: parseInt(document.getElementById('fontSize').value),
    color: document.getElementById('fontColor').value,
    position: document.getElementById('textPosition').value,
    bgColor: document.getElementById('textBg').value,
    bgOpacity: parseInt(document.getElementById('textBgOpacity').value) / 100,
    fontStyle: document.getElementById('fontStyle').value,
  };
}

function getWatermarkSettings() {
  return {
    text: document.getElementById('watermarkText').value,
    size: parseInt(document.getElementById('wmSize').value),
    color: document.getElementById('wmColor').value,
    position: document.getElementById('wmPosition').value,
    opacity: parseInt(document.getElementById('wmOpacity').value) / 100,
  };
}

function positionOverlayEl(el, position, container) {
  el.style.position = 'absolute';
  el.style.left = ''; el.style.right = ''; el.style.top = ''; el.style.bottom = '';
  el.style.transform = '';
  switch (position) {
    case 'top':
      el.style.top = '12px'; el.style.left = '50%'; el.style.transform = 'translateX(-50%)'; break;
    case 'center':
      el.style.top = '50%'; el.style.left = '50%'; el.style.transform = 'translate(-50%,-50%)'; break;
    case 'topleft':
      el.style.top = '12px'; el.style.left = '12px'; break;
    case 'bottomleft':
      el.style.bottom = '12px'; el.style.left = '12px'; break;
    case 'topright':
      el.style.top = '12px'; el.style.right = '12px'; break;
    case 'bottomright':
      el.style.bottom = '12px'; el.style.right = '12px'; break;
    default:
      el.style.bottom = '12px'; el.style.left = '50%'; el.style.transform = 'translateX(-50%)';
  }
}

function updateOverlayDiv() {
  const container = document.getElementById('videoContainer');
  container.style.position = 'relative';

  if (!overlayDiv) {
    overlayDiv = document.createElement('div');
    overlayDiv.id = 'liveOverlay';
    overlayDiv.style.cssText = 'pointer-events:none; z-index:10; padding:6px 14px; border-radius:6px; white-space:nowrap; max-width:90%;';
    container.appendChild(overlayDiv);
  }

  const s = getOverlaySettings();
  if (!s.text) { overlayDiv.style.display = 'none'; return; }
  overlayDiv.style.display = 'block';
  overlayDiv.style.fontSize = s.fontSize + 'px';
  overlayDiv.style.fontWeight = s.fontStyle.includes('bold') ? 'bold' : 'normal';
  overlayDiv.style.fontStyle = s.fontStyle.includes('italic') ? 'italic' : 'normal';
  overlayDiv.style.color = s.color;
  overlayDiv.style.background = `rgba(${hexToRgb(s.bgColor)},${s.bgOpacity})`;
  overlayDiv.textContent = s.text;
  positionOverlayEl(overlayDiv, s.position, container);
}

// Watermark overlay
let wmDiv = null;

function updateWatermarkDiv() {
  const container = document.getElementById('videoContainer');
  container.style.position = 'relative';

  if (!wmDiv) {
    wmDiv = document.createElement('div');
    wmDiv.id = 'liveWatermark';
    wmDiv.style.cssText = 'pointer-events:none; z-index:11; padding:3px 8px; border-radius:4px; white-space:nowrap;';
    container.appendChild(wmDiv);
  }

  const w = getWatermarkSettings();
  if (!w.text) { wmDiv.style.display = 'none'; return; }
  wmDiv.style.display = 'block';
  wmDiv.style.fontSize = w.size + 'px';
  wmDiv.style.color = w.color;
  wmDiv.style.opacity = w.opacity;
  wmDiv.style.fontFamily = "'Segoe UI', sans-serif";
  wmDiv.textContent = w.text;
  positionOverlayEl(wmDiv, w.position, container);
}

['overlayText','fontSize','fontColor','textPosition','textBg','fontStyle'].forEach(id => {
  document.getElementById(id).addEventListener('input', updateOverlayDiv);
});
document.getElementById('textBgOpacity').addEventListener('input', e => {
  document.getElementById('textBgOpacityVal').textContent = e.target.value;
  updateOverlayDiv();
});

['watermarkText','wmSize','wmColor','wmPosition'].forEach(id => {
  document.getElementById(id).addEventListener('input', updateWatermarkDiv);
});
document.getElementById('wmOpacity').addEventListener('input', e => {
  document.getElementById('wmOpacityVal').textContent = e.target.value;
  updateWatermarkDiv();
});

// ── Export via Canvas + MediaRecorder ──
document.getElementById('exportBtn').addEventListener('click', exportVideo);

async function exportVideo() {
  if (!videoPreview.src) return;

  const format = document.getElementById('exportFormat').value;
  const bitrate = parseInt(document.getElementById('exportQuality').value);
  const progressEl = document.getElementById('exportProgress');
  const fillEl = document.getElementById('progressFill');
  const textEl = document.getElementById('progressText');
  const exportBtn = document.getElementById('exportBtn');

  progressEl.style.display = 'block';
  exportBtn.disabled = true;
  fillEl.style.width = '0%';
  textEl.textContent = 'Starting export…';

  try {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = videoPreview.videoWidth || 640;
    offCanvas.height = videoPreview.videoHeight || 360;
    const offCtx = offCanvas.getContext('2d');

    const stream = offCanvas.captureStream(30);
    let mediaStream = stream;
    try {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaElementSource(videoPreview);
      const dest = audioCtx.createMediaStreamDestination();
      source.connect(dest);
      source.connect(audioCtx.destination);
      const audioTrack = dest.stream.getAudioTracks()[0];
      if (audioTrack) mediaStream = new MediaStream([...stream.getTracks(), audioTrack]);
    } catch(e) { /* audio capture not available */ }

    const mimeType = MediaRecorder.isTypeSupported(format) ? format : 'video/webm';
    const recorder = new MediaRecorder(mediaStream, { mimeType, videoBitsPerSecond: bitrate });
    const chunks = [];

    recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.getElementById('downloadLink');
      const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
      a.href = url;
      a.download = `aditor-export.${ext}`;
      a.style.display = 'none';
      a.click();
      fillEl.style.width = '100%';
      textEl.textContent = '✅ Export complete! Download started.';
      exportBtn.disabled = false;
    };

    videoPreview.currentTime = trimStartSec;
    await new Promise(r => videoPreview.addEventListener('seeked', r, { once: true }));

    recorder.start(100);
    videoPreview.play();

    const duration = trimEndSec - trimStartSec;
    const startTime = performance.now();

    const s = getOverlaySettings();
    const w = getWatermarkSettings();

    function drawTextOnCanvas(ctx, text, fontSize, fontStyle, color, bgColor, bgOpacity, position, cw, ch) {
      if (!text) return;
      ctx.font = `${fontStyle} ${fontSize}px 'Segoe UI', sans-serif`;
      ctx.textAlign = 'center';
      const metrics = ctx.measureText(text);
      const textW = metrics.width + 24;
      const textH = fontSize + 16;
      let x = cw / 2, y;
      switch (position) {
        case 'top': y = fontSize + 20; break;
        case 'center': y = ch / 2; break;
        case 'topleft': x = textW / 2 + 10; y = fontSize + 20; break;
        case 'bottomleft': x = textW / 2 + 10; y = ch - 20; break;
        default: y = ch - 20;
      }
      ctx.fillStyle = `rgba(${hexToRgb(bgColor)},${bgOpacity})`;
      ctx.fillRect(x - textW / 2, y - fontSize - 4, textW, textH);
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    }

    function drawWatermarkOnCanvas(ctx, wm, cw, ch) {
      if (!wm.text) return;
      ctx.font = `${wm.size}px 'Segoe UI', sans-serif`;
      ctx.globalAlpha = wm.opacity;
      ctx.fillStyle = wm.color;
      const pad = 12;
      let x, y;
      const tw = ctx.measureText(wm.text).width;
      switch (wm.position) {
        case 'topright': x = cw - tw - pad; y = wm.size + pad; break;
        case 'topleft': x = pad; y = wm.size + pad; break;
        case 'bottomleft': x = pad; y = ch - pad; break;
        default: x = cw - tw - pad; y = ch - pad;
      }
      ctx.textAlign = 'left';
      ctx.fillText(wm.text, x, y);
      ctx.globalAlpha = 1;
    }

    // Apply CSS filter to canvas via filter property
    function applyCanvasFilter(ctx) {
      let f = '';
      if (activePresetFilter !== 'none') {
        f = activePresetFilter;
      } else {
        f = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg) blur(${blur}px)`;
      }
      ctx.filter = f;
    }

    function drawFrame() {
      const elapsed = (performance.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      fillEl.style.width = (progress * 100) + '%';
      textEl.textContent = `Exporting… ${Math.round(progress * 100)}%`;

      offCtx.save();
      applyCanvasFilter(offCtx);

      // Apply flip/rotate transforms
      offCtx.translate(offCanvas.width / 2, offCanvas.height / 2);
      offCtx.rotate((rotateState * Math.PI) / 180);
      offCtx.scale(flipHState ? -1 : 1, flipVState ? -1 : 1);
      offCtx.drawImage(videoPreview, -offCanvas.width / 2, -offCanvas.height / 2, offCanvas.width, offCanvas.height);
      offCtx.restore();

      // Draw text overlay
      drawTextOnCanvas(offCtx, s.text, s.fontSize, s.fontStyle, s.color, s.bgColor, s.bgOpacity, s.position, offCanvas.width, offCanvas.height);

      // Draw watermark
      drawWatermarkOnCanvas(offCtx, w, offCanvas.width, offCanvas.height);

      if (videoPreview.currentTime < trimEndSec && !videoPreview.paused) {
        requestAnimationFrame(drawFrame);
      } else {
        videoPreview.pause();
        recorder.stop();
      }
    }

    requestAnimationFrame(drawFrame);

  } catch (err) {
    textEl.textContent = `❌ Export failed: ${err.message}`;
    exportBtn.disabled = false;
    console.error(err);
  }
}

// ============================================
// NEW FEATURES (Speed, Crop, Reverse, Merge)
// ============================================

// ── Speed 0.99x ──
document.querySelector('.speed-btn[data-speed="0.99"]')?.addEventListener('click', function() {
  document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
  this.classList.add('active');
  videoPreview.playbackRate = 0.99;
});

// ── Reverse Playback ──
let isReversed = false;
document.getElementById('reverseBtn')?.addEventListener('click', function() {
  isReversed = !isReversed;
  this.classList.toggle('active', isReversed);
  this.textContent = isReversed ? '▶ Play Normal' : '⏪ Reverse Video';
  
  if (isReversed) {
    videoPreview.playbackRate = -1;
    videoPreview.play();
  } else {
    videoPreview.playbackRate = parseFloat(document.querySelector('.speed-btn.active')?.dataset.speed || 1);
  }
});

// ── Crop Panel ──
let cropSettings = { x: 0, y: 0, w: null, h: null };

function applyCrop() {
  const video = videoPreview;
  if (!video.videoWidth) return;
  
  const cw = cropSettings.w || video.videoWidth;
  const ch = cropSettings.h || video.videoHeight;
  const cx = cropSettings.x || 0;
  const cy = cropSettings.y || 0;
  
  // Crop is applied via CSS for preview
  video.style.objectPosition = `-${cx}px -${cy}px`;
  video.style.objectFit = 'none';
}

['cropX', 'cropY', 'cropW', 'cropH'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', (e) => {
    const key = id.replace('crop', '').toLowerCase();
    cropSettings[key === 'w' ? 'w' : key === 'h' ? 'h' : key] = e.target.value ? parseInt(e.target.value) : null;
    applyCrop();
  });
});

document.getElementById('resetCrop')?.addEventListener('click', () => {
  cropSettings = { x: 0, y: 0, w: null, h: null };
  ['cropX', 'cropY', 'cropW', 'cropH'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  videoPreview.style.objectPosition = '';
  videoPreview.style.objectFit = '';
});

// ── Merge Videos ──
let mergeFiles = [];
const mergeInput = document.getElementById('mergeInput');
const mergeZone = document.getElementById('mergeZone');
const mergeList = document.getElementById('mergeList');

document.getElementById('mergeBtn')?.addEventListener('click', () => mergeInput?.click());
mergeInput?.addEventListener('change', (e) => {
  Array.from(e.target.files).forEach(file => {
    if (file.type.startsWith('video/')) {
      mergeFiles.push(file);
      updateMergeList();
    }
  });
});

mergeZone?.addEventListener('dragover', (e) => { e.preventDefault(); mergeZone.classList.add('drag-over'); });
mergeZone?.addEventListener('dragleave', () => mergeZone.classList.remove('drag-over'));
mergeZone?.addEventListener('drop', (e) => {
  e.preventDefault();
  mergeZone.classList.remove('drag-over');
  Array.from(e.dataTransfer.files).forEach(file => {
    if (file.type.startsWith('video/')) {
      mergeFiles.push(file);
      updateMergeList();
    }
  });
});

function updateMergeList() {
  if (!mergeList) return;
  mergeList.innerHTML = mergeFiles.map((f, i) => `
    <div class="merge-item">
      <span>${f.name}</span>
      <button class="remove-btn" data-index="${i}">×</button>
    </div>
  `).join('');
  
  document.querySelectorAll('.merge-item .remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      mergeFiles.splice(parseInt(e.target.dataset.index), 1);
      updateMergeList();
    });
  });
  
  const applyBtn = document.getElementById('applyMerge');
  if (applyBtn) applyBtn.style.display = mergeFiles.length > 0 ? 'block' : 'none';
}

// ============================================
// NEW FEATURES (Audio, Subtitles, TTS, AI)
// ============================================

// ── Background Music ──
let bgMusicAudio = null;
let musicVolume = 0.5;
let origVolume = 1.0;

document.getElementById('audioUploadBtn')?.addEventListener('click', () => {
  document.getElementById('audioInput')?.click();
});

document.getElementById('audioInput')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith('audio/')) {
    if (bgMusicAudio) {
      bgMusicAudio.pause();
      bgMusicAudio = null;
    }
    bgMusicAudio = new Audio(URL.createObjectURL(file));
    bgMusicAudio.loop = true;
    bgMusicAudio.volume = musicVolume;
    
    const nameEl = document.getElementById('audioFileName');
    if (nameEl) nameEl.textContent = file.name;
    
    // Sync with video
    videoPreview.addEventListener('play', () => bgMusicAudio?.play(), { once: true });
    videoPreview.addEventListener('pause', () => bgMusicAudio?.pause(), { once: true });
  }
});

document.getElementById('musicVolume')?.addEventListener('input', (e) => {
  musicVolume = e.target.value / 100;
  if (bgMusicAudio) bgMusicAudio.volume = musicVolume;
  document.getElementById('musicVolVal').textContent = e.target.value;
});

document.getElementById('origVolume')?.addEventListener('input', (e) => {
  origVolume = e.target.value / 100;
  videoPreview.volume = origVolume;
  document.getElementById('origVolVal').textContent = e.target.value;
});

document.getElementById('removeAudio')?.addEventListener('click', () => {
  if (bgMusicAudio) {
    bgMusicAudio.pause();
    bgMusicAudio = null;
  }
  const nameEl = document.getElementById('audioFileName');
  if (nameEl) nameEl.textContent = '';
});

// ── Subtitles/Captions ──
let subtitleData = [];
let subtitleDiv = null;

function parseSubtitles(text) {
  const lines = text.trim().split('\n');
  subtitleData = [];
  lines.forEach(line => {
    const match = line.match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?):\s*(.+)/);
    if (match) {
      subtitleData.push({
        start: parseFloat(match[1]),
        end: parseFloat(match[2]),
        text: match[3]
      });
    }
  });
}

function updateSubtitleDisplay() {
  const container = document.getElementById('videoContainer');
  if (!subtitleDiv) {
    subtitleDiv = document.createElement('div');
    subtitleDiv.id = 'subtitleDisplay';
    subtitleDiv.style.cssText = 'position:absolute;bottom:60px;left:50%;transform:translateX(-50%);text-align:center;z-index:20;max-width:80%;pointer-events:none;';
    container.appendChild(subtitleDiv);
  }
  
  const ct = videoPreview.currentTime;
  const active = subtitleData.find(s => ct >= s.start && ct <= s.end);
  
  if (active) {
    const s = getSubtitleSettings();
    subtitleDiv.style.display = 'block';
    subtitleDiv.style.fontSize = s.fontSize + 'px';
    subtitleDiv.style.color = s.color;
    subtitleDiv.style.background = `rgba(${hexToRgb(s.bgColor)},${s.bgOpacity})`;
    subtitleDiv.style.padding = '4px 12px';
    subtitleDiv.style.borderRadius = '4px';
    subtitleDiv.textContent = active.text;
    subtitleDiv.style.top = s.position === 'top' ? '40px' : (s.position === 'center' ? '50%' : 'auto');
    subtitleDiv.style.bottom = s.position === 'bottom' ? '60px' : 'auto';
    subtitleDiv.style.transform = s.position === 'center' ? 'translate(-50%,-50%)' : 'translateX(-50%)';
  } else {
    subtitleDiv.style.display = 'none';
  }
}

function getSubtitleSettings() {
  return {
    fontSize: parseInt(document.getElementById('subFontSize')?.value || 24),
    color: document.getElementById('subColor')?.value || '#ffffff',
    position: document.getElementById('subPosition')?.value || 'bottom',
    bgColor: document.getElementById('subBgColor')?.value || '#000000',
    bgOpacity: (parseInt(document.getElementById('subBgOpacity')?.value || 80) / 100)
  };
}

document.getElementById('subtitleText')?.addEventListener('input', (e) => {
  parseSubtitles(e.target.value);
});

['subFontSize', 'subColor', 'subPosition', 'subBgColor'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', updateSubtitleDisplay);
});

document.getElementById('subBgOpacity')?.addEventListener('input', (e) => {
  document.getElementById('subBgOpacityVal').textContent = e.target.value;
  updateSubtitleDisplay();
});

videoPreview.addEventListener('timeupdate', updateSubtitleDisplay);

// Auto-generate subtitles (simulated)
document.getElementById('generateSubsBtn')?.addEventListener('click', () => {
  const textarea = document.getElementById('subtitleText');
  if (!textarea) return;
  
  // Simple demo: create sample subtitles based on video duration
  const dur = videoPreview.duration || 10;
  let subs = '';
  for (let i = 0; i < dur; i += 3) {
    subs += `${i.toFixed(1)}-${(i+3).toFixed(1)}: Sample subtitle text ${Math.floor(i/3)+1}\n`;
  }
  textarea.value = subs;
  parseSubtitles(subs);
});

// ── AI Title & Description Generator ──
const titleTemplates = [
  "🔥 {topic} - Everything You Need to Know",
  "Mind-Blowing {topic} Tutorial",
  "{topic} - The Ultimate Guide 2026",
  "How to Master {topic} in 5 Minutes",
  "{topic} - Secrets Revealed!",
  "The Truth About {topic}",
  "{topic} That Will Blow Your Mind",
  "Must-Watch: {topic} Compilation"
];

const descTemplates = [
  "In this video, we explore the fascinating world of {topic}. Learn the key concepts and techniques that will take your skills to the next level!",
  "Ready to dive deep into {topic}? This comprehensive guide covers everything from basics to advanced tips. Don't forget to like and subscribe!",
  "Discover the secrets of {topic} with this in-depth tutorial. Perfect for beginners and experts alike.",
  "{topic} - one of the most exciting topics in 2026. Join us as we uncover the truth behind this amazing subject."
];

document.getElementById('generateTitleBtn')?.addEventListener('click', () => {
  const template = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  const title = template.replace('{topic}', 'AI Video');
  document.getElementById('aiTitle').value = title;
});

document.getElementById('generateDescBtn')?.addEventListener('click', () => {
  const template = descTemplates[Math.floor(Math.random() * descTemplates.length)];
  const desc = template.replace('{topic}', 'AI video editing and generation');
  document.getElementById('aiDescription').value = desc;
});

// ── Voiceover (TTS) ──
function populateVoiceList() {
  const select = document.getElementById('ttsVoice');
  if (!select) return;
  
  select.innerHTML = '<option value="default">Default</option>';
  
  if ('speechSynthesis' in window) {
    const voices = speechSynthesis.getVoices();
    voices.forEach((voice, i) => {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `${voice.name} (${voice.lang})`;
      select.appendChild(option);
    });
  }
}

populateVoiceList();
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

document.getElementById('playTtsBtn')?.addEventListener('click', () => {
  const text = document.getElementById('ttsText')?.value;
  if (!text) return;
  
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voiceSelect = document.getElementById('ttsVoice');
    const speedSelect = document.getElementById('ttsSpeed');
    
    if (voiceSelect && voiceSelect.value !== 'default') {
      const voices = speechSynthesis.getVoices();
      utterance.voice = voices[voiceSelect.value];
    }
    if (speedSelect) utterance.rate = parseFloat(speedSelect.value);
    
    speechSynthesis.speak(utterance);
  }
});

document.getElementById('applyTtsBtn')?.addEventListener('click', () => {
  // For now, just show an alert - full TTS-to-audio requires Web Audio API processing
  alert('Voiceover will be mixed with video on export. Preview coming soon!');
});

document.getElementById('removeTts')?.addEventListener('click', () => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
  document.getElementById('ttsText').value = '';
});

// ============================================
// NEW FEATURES (Transitions, Effects, Memes)
// ============================================

// ── Transitions ──
let activeTransition = 'none';
let transitionDuration = 0.5;

document.querySelectorAll('.transition-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.transition-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTransition = btn.dataset.transition;
  });
});

document.getElementById('transitionDuration')?.addEventListener('input', (e) => {
  transitionDuration = parseFloat(e.target.value);
  document.getElementById('transitionDurVal').textContent = transitionDuration.toFixed(1);
});

// ── Effects (Zoom/Pan/Tilt/Shake) ──
let activeEffect = 'none';
let effectIntensity = 50;
let effectAnimation = null;

function applyEffect(effect, intensity) {
  // Cancel any existing animation
  if (effectAnimation) {
    cancelAnimationFrame(effectAnimation);
    videoPreview.style.transform = '';
  }
  
  if (effect === 'none' || !videoPreview.src) return;
  
  const scale = 1 + (intensity / 100);
  const duration = 2000;
  let start = null;
  
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = (timestamp - start) % duration;
    const pct = progress / duration;
    
    switch (effect) {
      case 'zoom-in':
        videoPreview.style.transform = `scale(${1 + pct * (scale - 1)})`;
        break;
      case 'zoom-out':
        videoPreview.style.transform = `scale(${scale - pct * (scale - 1)})`;
        break;
      case 'pan-left':
        videoPreview.style.transform = `translateX(${-pct * 50}px)`;
        break;
      case 'pan-right':
        videoPreview.style.transform = `translateX(${pct * 50}px)`;
        break;
      case 'pan-up':
        videoPreview.style.transform = `translateY(${-pct * 30}px)`;
        break;
      case 'pan-down':
        videoPreview.style.transform = `translateY(${pct * 30}px)`;
        break;
      case 'tilt':
        videoPreview.style.transform = `rotate(${Math.sin(pct * Math.PI * 2) * 5}deg)`;
        break;
      case 'shake':
        const shake = Math.random() * (intensity / 10) - (intensity / 20);
        videoPreview.style.transform = `translate(${shake}px, ${shake}px)`;
        break;
      case 'pulse':
        videoPreview.style.transform = `scale(${1 + Math.sin(pct * Math.PI * 2) * 0.1})`;
        break;
      case 'spin':
        videoPreview.style.transform = `rotate(${pct * 360}deg)`;
        break;
    }
    
    if (activeEffect !== 'none') {
      effectAnimation = requestAnimationFrame(animate);
    }
  }
  
  effectAnimation = requestAnimationFrame(animate);
}

document.querySelectorAll('.effect-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.effect-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeEffect = btn.dataset.effect;
    applyEffect(activeEffect, effectIntensity);
  });
});

document.getElementById('effectIntensity')?.addEventListener('input', (e) => {
  effectIntensity = parseInt(e.target.value);
  document.getElementById('effectIntVal').textContent = effectIntensity;
  if (activeEffect !== 'none') {
    applyEffect(activeEffect, effectIntensity);
  }
});

// ── Meme Templates ──
let activeMeme = 'none';

document.querySelectorAll('.meme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.meme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeMeme = btn.dataset.template;
    // In a full implementation, this would add a meme overlay image
  });
});
