

    // --- NAVBAR SCROLL ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // --- MOBILE MENU ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    function openMenu() {
      mobileMenu.classList.add('open');
      hamburger.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });
    document.getElementById('mobileClose').addEventListener('click', closeMenu);
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // --- SCROLL REVEAL ---
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- PROJECT FILTERS ---
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // =====================================================
        // FILTER LOGIC: When you add real project images,
        // add data-category="residential" etc. to each .project-card
        // and implement filtering logic here.
        // =====================================================
      });
    });

    // --- CONTACT FORM ---
    function submitForm() {
      const name = document.getElementById('fname').value;
      const email = document.getElementById('femail').value;
      const msg = document.getElementById('fmsg').value;
      if (!name || !email) {
        alert('Please fill in your name and email.');
        return;
      }
      // =====================================================
      // FORM SUBMISSION — Connect to your backend or email service:
      // Option 1: EmailJS (emailjs.com) — free email sending
      // Option 2: Formspree (formspree.io) — replace form action
      // Option 3: Your own API endpoint
      // =====================================================
      document.getElementById('contactForm').style.opacity = '0.5';
      setTimeout(() => {
        document.getElementById('contactForm').style.opacity = '1';
        document.getElementById('formSuccess').style.display = 'block';
        document.getElementById('fname').value = '';
        document.getElementById('femail').value = '';
        document.getElementById('fphone').value = '';
        document.getElementById('fmsg').value = '';
        document.getElementById('ftype').value = '';
      }, 800);
    }

    // --- SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // --- LOAD PROJECT VIDEOS ---
    fetch('project/videos.json')
      .then(response => response.json())
      .then(videos => {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        videos.forEach((video, index) => {
          const item = document.createElement('div');
          item.className = 'gallery-item';
          item.innerHTML = `
            <video controls class="gallery-video" playsinline preload="metadata" autoplay muted loop>
              <source src="project/${video}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
            <div class="portfolio-caption">Project Video ${index + 1}</div>
          `;
          galleryGrid.appendChild(item);
        });
      })
      .catch(error => console.error('Error loading videos:', error));

    // Images are no longer shown in the gallery — only videos are displayed.