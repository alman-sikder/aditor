document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('cardsGrid');
  const totalCount = document.getElementById('totalCount');
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let activeFilter = 'all';
  let searchQuery = '';

  totalCount.textContent = models.length;

  function renderCards() {
    const q = searchQuery.toLowerCase();
    const filtered = models.filter(m => {
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'open-source' && m.openSource) ||
        (activeFilter === 'free' && m.free) ||
        m.tags.includes(activeFilter);

      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some(t => t.includes(q));

      return matchesFilter && matchesSearch;
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-results">No models found matching your search.</div>`;
      return;
    }

    filtered.forEach(m => {
      const card = document.createElement('div');
      card.className = `card${m.highlight ? ' highlight' : ''}`;

      const tagHTML = m.tags.map(t =>
        `<span class="tag tag-${t.replace(/-/g, '')}">${formatTag(t)}</span>`
      ).join('');

      const badgeHTML = m.badges.map(b =>
        `<span class="badge">${b}</span>`
      ).join('');

      const logoHTML = m.logo
        ? `<img src="${m.logo}" alt="${m.company} logo" class="company-logo" onload="this.classList.add('logo-loaded')" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><span class="logo-fallback" style="display:none">${m.logoFallback}</span>`
        : `<span class="logo-fallback">${m.logoFallback}</span>`;

      card.innerHTML = `
        <div class="card-header">
          <div class="card-logo">
            ${logoHTML}
          </div>
          <div class="card-title-group">
            <h2 class="card-name">${m.name}</h2>
            <span class="card-company">${m.company}</span>
          </div>
          ${m.highlight ? '<span class="top-badge">⭐ Top Pick</span>' : ''}
        </div>
        <p class="card-description">${m.description}</p>
        <div class="badges-row">${badgeHTML}</div>
        <div class="card-meta">
          <div class="meta-item"><span class="meta-icon">⏱️</span><span>${m.maxDuration}</span></div>
          <div class="meta-item"><span class="meta-icon">📐</span><span>${m.resolution}</span></div>
          <div class="meta-item"><span class="meta-icon">💰</span><span>${m.pricing}</span></div>
          <div class="meta-item"><span class="meta-icon">📅</span><span>${m.released}</span></div>
        </div>
        <div class="tags-row">${tagHTML}</div>
        <a href="${m.url}" target="_blank" rel="noopener noreferrer" class="visit-btn">Visit Website →</a>
      `;
      grid.appendChild(card);
    });
  }

  function formatTag(tag) {
    const map = {
      'text-to-video': '📝 Text-to-Video',
      'image-to-video': '🖼️ Image-to-Video',
      'video-to-video': '🎞️ Video-to-Video',
      'open-source': '🔓 Open Source',
    };
    return map[tag] || tag;
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderCards();
    });
  });

  searchInput.addEventListener('input', e => {
    searchQuery = e.target.value;
    renderCards();
  });

  renderCards();
});
