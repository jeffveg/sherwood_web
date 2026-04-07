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

        // Close nav when any link/anchor inside it is clicked (mobile)
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ── Generic dropdown handler (handles all dropdowns) ───
    function closeAllDropdowns(except) {
        document.querySelectorAll('.dropdown.open').forEach(function (d) {
            if (d === except) return;
            d.classList.remove('open');
            var btn = d.querySelector('[aria-haspopup="true"]');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        var toggle = dropdown.querySelector('[aria-haspopup="true"]');
        if (!toggle) return;

        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            // Close any other open dropdown
            closeAllDropdowns(isOpen ? dropdown : null);
        });

        // Keyboard accessibility
        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', function () {
        closeAllDropdowns(null);
    });

    // ── Highlight current page link ────────────────────────
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        var href = (link.getAttribute('href') || '').split('/').pop();
        if (href && href === path && !link.classList.contains('nav-cta')) {
            link.style.color = 'var(--gold)';
        }
    });

}());
