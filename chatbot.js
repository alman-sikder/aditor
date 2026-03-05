// ── Knowledge Base ──
const kb = [
  {
    patterns: ['best free', 'free model', 'free ai video', 'no cost', 'without paying'],
    answer: () => `Here are the best <strong>free AI video generation models</strong>:<br><br>
<ul>
  <li>🆓 <strong>Kling AI</strong> (Kuaishou) — generous free tier, up to 2 min videos</li>
  <li>🆓 <strong>Luma Dream Machine</strong> — free credits daily, high quality</li>
  <li>🆓 <strong>Hailuo AI</strong> (MiniMax) — free tier with great motion quality</li>
  <li>🆓 <strong>Pika Labs</strong> — free tier with creative effects</li>
  <li>🆓 <strong>Pixverse</strong> — very generous free tier</li>
  <li>🔓 <strong>Wan 2.1</strong> (Alibaba) — fully open source, self-host for free</li>
  <li>🔓 <strong>HunyuanVideo</strong> (Tencent) — open source, 13B model</li>
  <li>🔓 <strong>CogVideoX</strong> — open source on HuggingFace</li>
</ul><br>
For the easiest free experience, try <strong>Kling AI</strong> or <strong>Luma Dream Machine</strong> first.`
  },
  {
    patterns: ['open source', 'self host', 'self-host', 'download model', 'huggingface'],
    answer: () => `These AI video models are <strong>open source</strong> and free to self-host:<br><br>
<ul>
  <li>🔓 <strong>Wan 2.1</strong> by Alibaba — text & image-to-video, up to 1080p</li>
  <li>🔓 <strong>HunyuanVideo</strong> by Tencent — 13B params, high quality</li>
  <li>🔓 <strong>CogVideoX</strong> by Zhipu AI — 5B & 2B models on HuggingFace</li>
  <li>🔓 <strong>Mochi 1</strong> by Genmo — 10B params, Apache license, fluid motion</li>
  <li>🔓 <strong>Stable Video Diffusion</strong> by Stability AI — image-to-video</li>
</ul><br>
You'll need a GPU (ideally 16GB+ VRAM) to run these locally. <strong>Wan 2.1</strong> and <strong>HunyuanVideo</strong> are currently the most capable open-source options.`
  },
  {
    patterns: ['sora', 'openai video'],
    answer: () => `<strong>Sora</strong> is OpenAI's flagship text-to-video model.<br><br>
<ul>
  <li>📅 Released: Late 2024</li>
  <li>⏱️ Max duration: Up to 60 seconds</li>
  <li>📐 Resolution: Up to 1080p</li>
  <li>💰 Pricing: Requires ChatGPT Plus or Pro subscription</li>
  <li>🎬 Capabilities: Text-to-video, image-to-video, video extension, remixing</li>
</ul><br>
Sora is known for its <strong>cinematic quality</strong>, complex scene understanding, and realistic physics. It's one of the most capable models available but requires a paid subscription.`
  },
  {
    patterns: ['longest video', 'long video', 'duration', 'minutes'],
    answer: () => `Models that support the <strong>longest video durations</strong>:<br><br>
<ul>
  <li>⏱️ <strong>Kling AI</strong> — up to <strong>2 minutes</strong></li>
  <li>⏱️ <strong>Veo 2</strong> (Google) — up to <strong>2 minutes</strong></li>
  <li>⏱️ <strong>Nova Reel</strong> (Amazon AWS) — up to <strong>2 minutes</strong></li>
  <li>⏱️ <strong>Sora</strong> (OpenAI) — up to <strong>60 seconds</strong></li>
  <li>⏱️ <strong>InVideo AI</strong> — <strong>full-length</strong> videos (uses stock footage)</li>
</ul><br>
For pure AI-generated long videos, <strong>Kling AI</strong> and <strong>Veo 2</strong> are the top choices.`
  },
  {
    patterns: ['text to video', 'text-to-video', 'difference', 'image to video', 'image-to-video'],
    answer: () => `Great question! Here's the difference:<br><br>
<strong>📝 Text-to-Video</strong><br>
You provide a text prompt describing the scene, and the AI generates a video from scratch. Example: <em>"A cat surfing on ocean waves at sunset"</em><br><br>
<strong>🖼️ Image-to-Video</strong><br>
You provide an existing image, and the AI animates it into a video. Great for bringing photos or illustrations to life.<br><br>
<strong>🎞️ Video-to-Video</strong><br>
You provide an existing video and the AI transforms its style, adds effects, or modifies it.<br><br>
Most modern models like <strong>Kling AI</strong>, <strong>Luma Dream Machine</strong>, and <strong>Runway Gen-3</strong> support all three modes.`
  },
  {
    patterns: ['best quality', 'highest quality', 'most realistic', 'photorealistic', 'best model'],
    answer: () => `The <strong>highest quality AI video models</strong> currently are:<br><br>
<ul>
  <li>🏆 <strong>Veo 2</strong> (Google DeepMind) — up to 4K, cinematic quality</li>
  <li>🏆 <strong>Sora</strong> (OpenAI) — photorealistic, complex scenes</li>
  <li>🏆 <strong>Kling AI</strong> — excellent motion & physics simulation</li>
  <li>🏆 <strong>Wan 2.1</strong> — best open-source quality</li>
</ul><br>
<strong>Veo 2</strong> is widely considered the current quality leader, but it's only available via Google Vertex AI. For accessible high quality, <strong>Sora</strong> and <strong>Kling AI</strong> are top picks.`
  },
  {
    patterns: ['get started', 'how to start', 'beginner', 'first time', 'new to'],
    answer: () => `Here's how to <strong>get started with AI video generation</strong>:<br><br>
<strong>Step 1 — Try a free platform:</strong><br>
Start with <strong>Kling AI</strong> (klingai.com) or <strong>Luma Dream Machine</strong> — both have free tiers and are beginner-friendly.<br><br>
<strong>Step 2 — Write a good prompt:</strong><br>
Be specific! Include: subject, action, setting, lighting, camera style. Example: <em>"A golden retriever running through a sunlit forest, slow motion, cinematic"</em><br><br>
<strong>Step 3 — Experiment:</strong><br>
Try text-to-video first, then image-to-video for more control.<br><br>
<strong>Step 4 — Explore open-source:</strong><br>
If you have a GPU, try <strong>Wan 2.1</strong> or <strong>CogVideoX</strong> for unlimited free generation.`
  },
  {
    patterns: ['4k', '4k resolution', 'highest resolution', 'best resolution'],
    answer: () => `Models that support <strong>4K or highest resolution</strong>:<br><br>
<ul>
  <li>📐 <strong>Veo 2</strong> (Google DeepMind) — up to <strong>4K</strong> resolution</li>
  <li>📐 <strong>Sora</strong> — up to <strong>1080p</strong></li>
  <li>📐 <strong>Kling AI</strong> — up to <strong>1080p</strong></li>
  <li>📐 <strong>Wan 2.1</strong> — up to <strong>1080p</strong> (open source)</li>
</ul><br>
Currently, <strong>Veo 2</strong> is the only model offering true 4K output, but it requires access via Google Vertex AI.`
  },
  {
    patterns: ['kling', 'kuaishou'],
    answer: () => `<strong>Kling AI</strong> is made by Kuaishou (a major Chinese tech company).<br><br>
<ul>
  <li>⏱️ Max duration: Up to 2 minutes</li>
  <li>📐 Resolution: Up to 1080p</li>
  <li>💰 Pricing: Freemium (generous free tier)</li>
  <li>🎬 Supports: Text-to-video & Image-to-video</li>
</ul><br>
Kling is known for <strong>realistic physics simulation</strong>, excellent character motion, and being one of the best free options available. Visit <a href="https://klingai.com" target="_blank">klingai.com</a> to try it.`
  },
  {
    patterns: ['runway', 'gen-3', 'gen3'],
    answer: () => `<strong>Runway Gen-3 Alpha</strong> is a professional-grade video generation model.<br><br>
<ul>
  <li>⏱️ Max duration: Up to 10 seconds</li>
  <li>📐 Resolution: Up to 1280×768</li>
  <li>💰 Pricing: Subscription + credits (free trial available)</li>
  <li>🎬 Supports: Text-to-video, Image-to-video, Video-to-video</li>
</ul><br>
Runway is popular with <strong>creative professionals and filmmakers</strong>. It offers unique tools like Motion Brush, camera controls, and style presets. Visit <a href="https://runwayml.com" target="_blank">runwayml.com</a>.`
  },
  {
    patterns: ['veo', 'google', 'deepmind'],
    answer: () => `<strong>Veo 2</strong> is Google DeepMind's state-of-the-art video generation model.<br><br>
<ul>
  <li>⏱️ Max duration: Up to 2 minutes</li>
  <li>📐 Resolution: Up to 4K</li>
  <li>💰 Pricing: Available via Google Vertex AI & VideoFX</li>
  <li>🎬 Supports: Text-to-video, Image-to-video</li>
</ul><br>
Veo 2 is considered one of the <strong>highest quality models</strong> available, with exceptional cinematic control and 4K output. Access it at <a href="https://deepmind.google/technologies/veo/" target="_blank">deepmind.google</a>.`
  },
  {
    patterns: ['luma', 'dream machine'],
    answer: () => `<strong>Luma Dream Machine</strong> is made by Luma AI.<br><br>
<ul>
  <li>⏱️ Max duration: Up to 9 seconds</li>
  <li>📐 Resolution: Up to 1080p</li>
  <li>💰 Pricing: Freemium (free daily credits)</li>
  <li>🎬 Supports: Text-to-video, Image-to-video</li>
</ul><br>
Luma is known for <strong>fast generation speeds</strong>, smooth motion, and accurate physics. Their Ray2 model architecture delivers impressive results. Try it at <a href="https://lumalabs.ai/dream-machine" target="_blank">lumalabs.ai</a>.`
  },
  {
    patterns: ['pika', 'pika labs'],
    answer: () => `<strong>Pika Labs</strong> (Pika 2.0) is a creative video generation platform.<br><br>
<ul>
  <li>⏱️ Max duration: Up to 10 seconds</li>
  <li>📐 Resolution: Up to 1080p</li>
  <li>💰 Pricing: Freemium</li>
  <li>🎬 Supports: Text-to-video, Image-to-video, Video-to-video</li>
</ul><br>
Pika is popular for its unique <strong>"Pikaffects"</strong> — creative transformations like melting, exploding, or morphing objects. Great for social media content. Visit <a href="https://pika.art" target="_blank">pika.art</a>.`
  },
  {
    patterns: ['wan', 'wan 2.1', 'alibaba'],
    answer: () => `<strong>Wan 2.1</strong> is Alibaba's open-source video generation model.<br><br>
<ul>
  <li>⏱️ Max duration: ~10 seconds</li>
  <li>📐 Resolution: Up to 1080p</li>
  <li>💰 Pricing: Free (open source)</li>
  <li>🎬 Supports: Text-to-video, Image-to-video</li>
  <li>🌎 Multilingual prompt support</li>
</ul><br>
Wan 2.1 is currently considered the <strong>best open-source video model</strong>, rivaling many commercial alternatives. Available on <a href="https://github.com/Wan-Video/Wan2.1" target="_blank">GitHub</a>.`
  },
  {
    patterns: ['how many', 'list all', 'all models', 'how many models'],
    answer: () => {
      const list = models.map(m => `<li><strong>${m.name}</strong> by ${m.company}</li>`).join('');
      return `There are <strong>${models.length} models</strong> in this directory:<br><br><ul>${list}</ul>`;
    }
  },
];

// ── Chatbot Logic ──
const messagesEl = document.getElementById('chatMessages');
const inputEl = document.getElementById('chatInput');
const sendBtn = document.getElementById('chatSend');

function addMessage(text, role) {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${role}`;
  const avatar = role === 'bot' ? '🤖' : '👤';
  msg.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-bubble">${text}</div>
  `;
  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTyping() {
  const msg = document.createElement('div');
  msg.className = 'chat-msg bot';
  msg.id = 'typingMsg';
  msg.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="msg-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
  `;
  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typingMsg');
  if (t) t.remove();
}

function getBotResponse(query) {
  const q = query.toLowerCase();
  for (const entry of kb) {
    if (entry.patterns.some(p => q.includes(p))) {
      return entry.answer();
    }
  }
  // Fallback: search model names
  const matched = models.filter(m =>
    m.name.toLowerCase().includes(q) || m.company.toLowerCase().includes(q)
  );
  if (matched.length > 0) {
    const m = matched[0];
    return `Here's what I know about <strong>${m.name}</strong> by ${m.company}:<br><br>
${m.description}<br><br>
<ul>
  <li>⏱️ Max Duration: ${m.maxDuration}</li>
  <li>📐 Resolution: ${m.resolution}</li>
  <li>💰 Pricing: ${m.pricing}</li>
  <li>🔓 Open Source: ${m.openSource ? 'Yes' : 'No'}</li>
  <li>🆓 Free Tier: ${m.free ? 'Yes' : 'No'}</li>
</ul><br>
<a href="${m.url}" target="_blank" rel="noopener">Visit ${m.name} →</a>`;
  }
  return `I'm not sure about that specific question, but I can help with:<br><br>
<ul>
  <li>Comparing AI video models</li>
  <li>Finding free or open-source options</li>
  <li>Explaining features like text-to-video vs image-to-video</li>
  <li>Recommending models for specific use cases</li>
</ul><br>
Try asking something like: <em>"What is the best free AI video generator?"</em> or <em>"Tell me about Sora"</em>`;
}

function handleSend() {
  const text = inputEl.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  inputEl.value = '';
  showTyping();
  setTimeout(() => {
    removeTyping();
    addMessage(getBotResponse(text), 'bot');
  }, 700 + Math.random() * 500);
}

sendBtn.addEventListener('click', handleSend);
inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

// Quick topic buttons
document.querySelectorAll('.topic-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    inputEl.value = btn.dataset.q;
    handleSend();
  });
});
