/* Sherwood Adventure — main.js */

(function () {
    'use strict';

    // ── Mobile nav toggle ──────────────────────────────────
    var navToggle = document.getElementById('navToggle');
    var navLinks  = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close nav when any link inside it is clicked
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ── Outlaw's Camp dropdown (click/touch-friendly) ──────
    var outlawsToggle = document.getElementById('outlawsToggle');
    if (outlawsToggle) {
        var dropdown = outlawsToggle.closest('.dropdown');

        outlawsToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = dropdown.classList.toggle('open');
            outlawsToggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Keyboard: open on Enter/Space
        outlawsToggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                outlawsToggle.click();
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function () {
            if (dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
                outlawsToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ── Mark current page in nav ───────────────────────────
    var currentPath = window.location.pathname.replace(/\/$/, '');
    document.querySelectorAll('.nav-links a.nav-btn').forEach(function (link) {
        var linkPath = link.getAttribute('href');
        if (!linkPath) return;
        // Handle root index
        if ((currentPath === '' || currentPath.endsWith('/')) && linkPath === 'index.html') return;
        if (currentPath.endsWith(linkPath.replace(/^\//, ''))) {
            link.style.background = 'var(--orange)';
            link.style.color = 'var(--green)';
        }
    });

}());
