/**
 * Andreas Vedvik - Actor Portfolio
 * Shared JavaScript
 */

(function() {
    'use strict';

    // ===========================================
    // Mobile Menu Toggle
    // ===========================================
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Update aria-expanded for accessibility
            const isExpanded = navLinks.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.focus();
            }
        });
    }

    // ===========================================
    // Language Toggle
    // ===========================================
    const langEN = document.getElementById('langEN');
    const langNO = document.getElementById('langNO');
    let currentLang = localStorage.getItem('lang') || 'en';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        // Update button states
        if (langEN && langNO) {
            if (lang === 'en') {
                langEN.classList.add('active');
                langNO.classList.remove('active');
            } else {
                langNO.classList.add('active');
                langEN.classList.remove('active');
            }
        }

        // Update all translatable elements
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = lang === 'en' ? el.dataset.en : el.dataset.no;
            if (text) {
                el.textContent = text;
            }
        });

        // Update page title based on current page
        updatePageTitle(lang);
    }

    function updatePageTitle(lang) {
        const path = window.location.pathname;
        const titles = {
            '/': {
                en: 'Andreas Vedvik – Actor, Norway | Film, Theatre & TV',
                no: 'Andreas Vedvik – Skuespiller, Norge | Film, Teater & TV'
            },
            '/index.html': {
                en: 'Andreas Vedvik – Actor, Norway | Film, Theatre & TV',
                no: 'Andreas Vedvik – Skuespiller, Norge | Film, Teater & TV'
            },
            '/portfolio.html': {
                en: 'Portfolio – Andreas Vedvik | Actor Norway',
                no: 'Portefølje – Andreas Vedvik | Skuespiller Norge'
            },
            '/photos.html': {
                en: 'Photos – Andreas Vedvik | Actor Norway',
                no: 'Bilder – Andreas Vedvik | Skuespiller Norge'
            },
            '/404.html': {
                en: 'Page Not Found – Andreas Vedvik',
                no: 'Side ikke funnet – Andreas Vedvik'
            }
        };

        // Check for exact match or default
        const titleObj = titles[path] || titles['/index.html'];
        if (titleObj) {
            document.title = titleObj[lang];
        }
    }

    // Initialize language toggle listeners
    if (langEN && langNO) {
        langEN.addEventListener('click', () => setLanguage('en'));
        langNO.addEventListener('click', () => setLanguage('no'));
    }

    // Set initial language
    setLanguage(currentLang);

    // ===========================================
    // Smooth Scroll for Anchor Links
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // ===========================================
    // YouTube Lite Embed
    // ===========================================
    function initYouTubeLite() {
        const youtubeContainers = document.querySelectorAll('.youtube-lite');

        youtubeContainers.forEach(container => {
            const videoId = container.dataset.videoId;
            if (!videoId) return;

            // Create thumbnail
            const img = document.createElement('img');
            img.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            img.alt = container.dataset.title || 'Video thumbnail';
            img.loading = 'lazy';

            // Fallback to hqdefault if maxres doesn't exist
            img.onerror = function() {
                this.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            };

            // Create play button
            const playBtn = document.createElement('div');
            playBtn.className = 'play-btn';
            playBtn.setAttribute('aria-label', 'Play video');

            container.appendChild(img);
            container.appendChild(playBtn);

            // Handle click - load iframe
            container.addEventListener('click', function() {
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                iframe.title = container.dataset.title || 'YouTube video';
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;

                // Replace content with iframe
                container.innerHTML = '';
                container.appendChild(iframe);
            });

            // Keyboard accessibility
            container.setAttribute('tabindex', '0');
            container.setAttribute('role', 'button');
            container.setAttribute('aria-label', `Play ${container.dataset.title || 'video'}`);

            container.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    initYouTubeLite();

    // ===========================================
    // Lightbox for Photos
    // ===========================================
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = lightbox?.querySelector('.lightbox-close');
        const photoItems = document.querySelectorAll('.photo-item');

        if (!lightbox || !lightboxImg || photoItems.length === 0) return;

        photoItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.dataset.src;
                const imgEl = item.querySelector('img');
                lightboxImg.src = src;
                lightboxImg.alt = imgEl?.alt || '';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
                lightboxClose?.focus();
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            lightboxImg.src = '';
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    initLightbox();

    // ===========================================
    // Scroll Indicator
    // ===========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

})();
