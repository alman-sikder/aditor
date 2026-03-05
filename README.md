# 🎬 Aditor — AI Video Generation Directory

> A free, open-source directory of the best AI video generation models, with a built-in AI chatbot and browser-based video editor.

**Created by [Alman Sikder](mailto:antualmansikder3.1417@gmail.com)**

---

## 🌐 Live Demo

Deploy to Vercel in under 2 minutes (see guide below).

---

## 📋 Features

### 📋 Directory
- 15+ AI video generation models listed (Sora, Kling, Veo 2, Runway, Wan 2.1, and more)
- Live search + filter by category (Text-to-Video, Image-to-Video, Open Source, Free Tier)
- Model cards with duration, resolution, pricing, and direct links

### 🤖 AI Chatbot
- Built-in knowledge base — works 100% offline, no API key needed
- Answers questions about all listed models
- Quick-question sidebar buttons

### ✂️ Browser Video Editor (Aditor)
- **Trim** with visual drag handles
- **12 filter presets** (B&W, Sepia, Neon, Matte, Glow, etc.)
- **Manual adjustments**: Brightness, Contrast, Saturation, Hue, Blur, Opacity, Sharpness
- **Transform**: Flip horizontal/vertical, Rotate 90°/180°
- **Aspect Ratio**: 16:9, 9:16 (Reels/TikTok), 1:1, 4:3, 21:9
- **Text Overlay**: Font, size, color, position, background
- **Watermark**: Custom text, position, opacity
- **Speed control**: 0.25×, 0.5×, 0.75×, 1×, 1.1×, 1.25×, 1.5×, 2×, 4×
- **Volume** control + mute
- **Export**: WebM/MP4, 3 quality levels, canvas-based rendering
- 100% private — video never leaves your browser

### 📬 Contact
- Contact form (opens email client)
- Creator info: Alman Sikder — antualmansikder3.1417@gmail.com

---

## 🚀 Deploying to Vercel (Recommended)

Vercel is the best choice for this project:
- ✅ **AI Optimized** — handles modern web workflows seamlessly
- ✅ **100 GB free bandwidth/month**
- ✅ **Free SSL** certificates automatically
- ✅ **Auto-deploy** — every GitHub push updates your live site instantly

### Step 1: Prepare Your Project

Ensure your files are in a single folder. The main entry point is `index.html`.

> ⚠️ This project has **no API keys** — the chatbot is fully offline. No environment variables needed.

### Step 2: Upload to GitHub

1. Create a free account at [github.com](https://github.com)
2. Click **New Repository** and give it a name (e.g. `aditor`)
3. Click **Add file → Upload files**
4. Drag the entire `ai-video-directory/` folder contents in
5. Click **Commit changes**

### Step 3: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **Add New → Project**
3. Find your GitHub repository and click **Import**
4. Leave all settings as default (no build command needed for static sites)
5. Click **Deploy**

### Step 4: Go Live 🎉

Within ~60 seconds, Vercel provides a live URL like:
```
https://aditor.vercel.app
```

You can also connect a **custom domain** for free if you own one.

---

## 🆚 Hosting Platform Comparison

| Platform | Best For | Free Limit |
|---|---|---|
| **Vercel** ⭐ | Static + AI sites | 100 GB bandwidth/month |
| Netlify | Simple static sites | 125k requests/month |
| GitHub Pages | Basic personal sites | Static only (no backend) |
| Render | Full-stack apps | Servers "sleep" after 15min |

---

## 📁 File Structure

```
ai-video-directory/
├── index.html        — AI Video Model Directory
├── editor.html       — Browser Video Editor
├── chatbot.html      — AI Chatbot
├── contact.html      — Contact Page
├── styles.css        — Shared styles + navbar
├── editor.css        — Editor-specific styles
├── chatbot.css       — Chatbot-specific styles
├── contact.css       — Contact-specific styles
├── data.js           — AI model data (15 models)
├── app.js            — Directory search/filter logic
├── editor.js         — Video editor logic
├── chatbot.js        — Chatbot knowledge base
├── logo.svg          — Aditor SVG logo
├── vercel.json       — Vercel deployment config
└── README.md         — This file
```

---

## 📬 Contact

**Alman Sikder**
📧 [antualmansikder3.1417@gmail.com](mailto:antualmansikder3.1417@gmail.com)

---

## 📄 License

MIT License — free to use, modify, and distribute.
