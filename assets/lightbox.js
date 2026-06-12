// ── LIGHTBOX CONTROLLER ──
class Lightbox {
  constructor() {
    this.lightbox = null;
    this.currentIndex = 0;
    this.images = [];
    this.init();
  }

  init() {
    // Create lightbox HTML
    const lightboxHTML = `
      <div class="lightbox" id="lightbox">
        <div class="lightbox-content">
          <img id="lightbox-img" src="" alt="Enlarged image">
          <div class="lightbox-nav">
            <button id="lightbox-prev" aria-label="Previous image">‹</button>
            <button id="lightbox-next" aria-label="Next image">›</button>
          </div>
          <button class="lightbox-close" id="lightbox-close" aria-label="Close lightbox">×</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    this.lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    // Event listeners
    closeBtn.addEventListener('click', () => this.close());
    prevBtn.addEventListener('click', () => this.prev());
    nextBtn.addEventListener('click', () => this.next());
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.close();
    });
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Add click handlers to gallery images
    this.attachGalleryHandlers();
  }

  attachGalleryHandlers() {
    // Find all gallery tiles/sections
    const galleries = document.querySelectorAll('[data-gallery]');

    galleries.forEach((gallery) => {
      const galleryName = gallery.getAttribute('data-gallery');
      const images = gallery.querySelectorAll('img');

      images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          this.open(images, index);
        });
      });
    });
  }

  open(images, startIndex = 0) {
    this.images = Array.from(images);
    this.currentIndex = startIndex;
    this.showImage();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  showImage() {
    const img = this.images[this.currentIndex];
    const lightboxImg = document.getElementById('lightbox-img');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || 'Gallery image';

    // Update nav button states
    prevBtn.disabled = this.currentIndex === 0;
    nextBtn.disabled = this.currentIndex === this.images.length - 1;
  }

  next() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.showImage();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.showImage();
    }
  }
}

// Initialize lightbox when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
  });
} else {
  new Lightbox();
}
