// Lightbox gallery
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || !items.length) return;

  const img = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let currentIndex = 0;
  let visibleItems = [];

  function getVisibleItems() {
    visibleItems = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"])'));
  }

  function openLightbox(index) {
    getVisibleItems();
    currentIndex = index;
    img.src = visibleItems[currentIndex].querySelector('img').src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
    img.src = visibleItems[currentIndex].querySelector('img').src;
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Filter buttons
  document.querySelectorAll('.gallery-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const year = btn.dataset.year;
      items.forEach(item => {
        item.style.display = (!year || item.dataset.year === year) ? '' : 'none';
      });
    });
  });
});
