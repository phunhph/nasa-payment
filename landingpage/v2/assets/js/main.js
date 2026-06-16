(function () {

    const progressBar = document.getElementById('scroll-progress-bar');
    const progressRoot = document.getElementById('scroll-progress');
    const topBtn = document.getElementById('scroll-top-btn');
    const navDrawer = document.getElementById('site-nav-drawer');
    const navToggle = document.getElementById('site-nav-toggle');
    const hud = document.getElementById('scroll-hud');
    const hudSection = document.getElementById('hud-section');
    const hudY = document.getElementById('hud-y');
    const hudPct = document.getElementById('hud-pct');

    const sectionLabels = {
        'home-section': 'Trang chủ',
        about: 'Giới thiệu',
        ecosystem: 'Hệ sinh thái',
        solutions: 'Giải pháp',
        model: 'Mô hình hoạt động',
        'money-flow': 'Dòng tiền',
        technology: 'Công nghệ & Bảo mật',
        econtract: 'Hợp đồng số',
        team: 'Đội ngũ',
        partners: 'Đối tác',
        news: 'Tin tức',
        contact: 'Liên hệ',
        'download-app': 'Tải app'
    };

    /** Cuộn bằng rAF — không nhánh prefers-reduced-motion (Windows hay bật → nhảy tức thì). */
    function scrollWindowToY(targetY, onDone) {
        const root = document.scrollingElement || document.documentElement;
        const maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
        const clamped = Math.max(0, Math.min(maxScroll, targetY));
        const startY = window.scrollY || root.scrollTop || 0;
        const dy = clamped - startY;
        if (Math.abs(dy) < 2) {
            window.scrollTo(0, clamped);
            if (typeof onDone === 'function') {
                onDone();
            }
            return;
        }
        const duration = Math.min(1200, Math.max(480, Math.abs(dy) * 0.55));
        const t0 = performance.now();

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(now) {
            const u = Math.min(1, (now - t0) / duration);
            window.scrollTo(0, startY + dy * easeOutCubic(u));
            if (u < 1) {
                requestAnimationFrame(step);
            } else if (typeof onDone === 'function') {
                onDone();
            }
        }

        requestAnimationFrame(step);
    }

    function smoothScrollIntoView(el, onDone) {
        if (!el) {
            return;
        }
        const root = document.scrollingElement || document.documentElement;
        const rect = el.getBoundingClientRect();
        const yDoc = rect.top + (window.scrollY || root.scrollTop || 0);
        let marginTop = parseFloat(getComputedStyle(el).scrollMarginTop);
        if (!Number.isFinite(marginTop)) {
            marginTop = 0;
        }
        scrollWindowToY(yDoc - marginTop, onDone);
    }

    function closeSiteNavDrawer() {
        if (!navDrawer) {
            return;
        }
        if (!navDrawer.classList.contains('is-open')) {
            return;
        }
        navDrawer.classList.remove('is-open');
        navDrawer.setAttribute('aria-hidden', 'true');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Mở menu điều hướng');
        }
        document.body.classList.remove('site-nav-drawer-open');
    }

    function openSiteNavDrawer() {
        if (!navDrawer) {
            return;
        }
        navDrawer.classList.add('is-open');
        navDrawer.setAttribute('aria-hidden', 'false');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'true');
            navToggle.setAttribute('aria-label', 'Đóng menu điều hướng');
        }
        document.body.classList.add('site-nav-drawer-open');
    }

    function toggleSiteNavDrawer() {
        if (!navDrawer) {
            return;
        }
        if (navDrawer.classList.contains('is-open')) {
            closeSiteNavDrawer();
        } else {
            openSiteNavDrawer();
        }
    }

    function runCounterOnce(el) {
        if (!el || el.dataset.animated === '1') {
            return;
        }

        el.dataset.animated = '1';
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = parseInt(el.getAttribute('data-duration') || '900', 10);
        const start = performance.now();

        function tick(now) {
            const u = Math.min(1, (now - start) / duration);
            const eased = 1 - (1 - u) * (1 - u);
            const val = Math.round(target * eased);
            el.textContent = val + suffix;
            if (u < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = String(target) + suffix;
            }
        }

        requestAnimationFrame(tick);
    }

    const sections = Array.prototype.slice.call(
        document.querySelectorAll('section[id]')
    );

    function pickActiveSection(scrollY) {
        const pad = 120;
        const y = scrollY + pad;
        let best = null;
        let bestTop = -Infinity;
        for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            const id = sec.id;
            if (!id) {
                continue;
            }
            const top = sec.getBoundingClientRect().top + window.scrollY;
            if (top <= y && top >= bestTop) {
                bestTop = top;
                best = id;
            }
        }
        return best;
    }

    let scrollTick = false;

    function updateScrollUi() {
        scrollTick = false;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        const pct = Math.round((scrollY / max) * 100);

        if (progressBar) {
            progressBar.style.width = pct + '%';
        }

        if (progressRoot) {
            progressRoot.setAttribute('aria-valuenow', String(pct));
        }

        if (topBtn) {
            topBtn.classList.toggle('is-visible', scrollY > 380);
        }

        if (hud && hudSection && hudY && hudPct) {
            const activeId = pickActiveSection(scrollY);
            const label = (activeId && sectionLabels[activeId]) || 'Đang xem';
            hudSection.textContent = label;
            hudY.textContent = String(Math.round(scrollY));
            hudPct.textContent = String(pct);
            hud.classList.toggle('is-visible', scrollY > 200);
        }
    }

    function onScroll() {
        if (!scrollTick) {
            scrollTick = true;
            requestAnimationFrame(updateScrollUi);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1280) {
            closeSiteNavDrawer();
        }
        updateScrollUi();
    });

    if (navToggle && navDrawer) {
        navToggle.addEventListener('click', function () {
            toggleSiteNavDrawer();
        });
    }

    document.querySelectorAll('[data-nav-close]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            closeSiteNavDrawer();
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeSiteNavDrawer();
        }
    });

    if (topBtn) {
        topBtn.addEventListener('click', function () {
            const home = document.getElementById('home');
            if (home) {
                smoothScrollIntoView(home);
            } else {
                scrollWindowToY(0);
            }
        });
    }

    /** Click menu / neo trang: luôn cuộn mượt (capture) — đóng drawer trước rồi đo lại vị trí. */
    function handleInPageAnchorClick(e) {
        const link = e.target && e.target.closest && e.target.closest('a[href^="#"]');
        if (!link) {
            return;
        }
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') {
            return;
        }
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
            return;
        }
        const target = document.querySelector(targetId);
        if (!target) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        const drawerWasOpen = navDrawer && navDrawer.classList.contains('is-open');
        closeSiteNavDrawer();

        function applyHashWhenDone() {
            try {
                history.pushState(null, '', targetId);
            } catch (err) {
                /* file:// */
            }
        }

        if (drawerWasOpen) {
            window.setTimeout(function () {
                smoothScrollIntoView(target, applyHashWhenDone);
            }, 320);
        } else {
            window.requestAnimationFrame(function () {
                smoothScrollIntoView(target, applyHashWhenDone);
            });
        }
    }

    document.addEventListener('click', handleInPageAnchorClick, true);

    window.addEventListener('popstate', function () {
        const id = location.hash;
        if (!id || id === '#') {
            return;
        }
        const t = document.querySelector(id);
        if (t) {
            smoothScrollIntoView(t);
        }
    });

    const ioRevealInview = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-inview');
            entry.target.querySelectorAll('.js-counter').forEach(runCounterOnce);
            ioRevealInview.unobserve(entry.target);
        });
    }, { threshold: 0.22, rootMargin: '0px 0px -5% 0px' });

    document.querySelectorAll('[data-scroll-reveal]').forEach(function (el) {
        ioRevealInview.observe(el);
    });

    const ioLegacyReveal = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('active');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
        ioLegacyReveal.observe(el);
    });

    updateScrollUi();
})();
