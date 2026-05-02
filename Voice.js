(function () {

    // ── Browser support check ─────────────────────────────
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return; // Silently exit if not supported

    const recognition = new SpeechRecognition();
    recognition.continuous     = true;  // Always listening
    recognition.interimResults = false; // Only fire on final results
    recognition.lang           = 'en-US';


    // ── THEME TOGGLE (with existing Liquid animation) ──────
    function triggerTheme(forceDark) {
        const isDark = document.body.classList.contains('dark-theme');
        if (forceDark === isDark) return; // Already in correct mode

        const overlay = document.getElementById('theme-overlay');
        const ox = '50%', oy = '50%'; // Centre-screen origin for voice

        overlay.style.setProperty('--ox', ox);
        overlay.style.setProperty('--oy', oy);
        overlay.style.background = isDark ? '#FFFAF0' : '#121008';
        overlay.classList.remove('expanding');
        overlay.style.transition = 'none';
        overlay.style.clipPath   = `circle(0% at ${ox} ${oy})`;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.classList.add('expanding');
                overlay.style.transition = 'clip-path 0.65s cubic-bezier(0.4, 0, 0.2, 1)';
                overlay.style.clipPath   = `circle(160% at ${ox} ${oy})`;

                setTimeout(() => {
                    document.body.classList.toggle('dark-theme', forceDark);
                    localStorage.setItem('theme', forceDark ? 'dark' : 'light');
                    document.querySelector('meta[name="theme-color"]')
                        ?.setAttribute('content', forceDark ? '#7A6200' : '#FFD600');
                }, 300);

                setTimeout(() => {
                    overlay.classList.remove('expanding');
                    overlay.style.clipPath = 'circle(0% at 50% 50%)';
                }, 680);
            });
        });
    }


    // ── SCROLL TO SECTION ─────────────────────────────────
    function voiceGoTo(id) {
        // Uses the existing goTo() from index.html if available
        if (typeof goTo === 'function') {
            goTo(id);
        } else {
            const el = document.getElementById(id);
            if (!el) return;
            const navH = document.querySelector('.top-navbar')?.offsetHeight || 0;
            const top  = el.getBoundingClientRect().top + window.scrollY - navH - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }


    // ── OPEN SECTIONS POPUP ───────────────────────────────
    function openSectionsPopup() {
        const popup = document.getElementById('sections-popup');
        const btn   = document.getElementById('sections-btn');
        if (popup && typeof openPopup === 'function') {
            openPopup(popup);
            btn?.classList.add('menu-open');
        }
    }


    // ── OPEN TOOLS / MAGIC BOX POPUP ─────────────────────
    function openToolsPopup() {
        const popup = document.getElementById('tools-popup');
        if (popup && typeof openPopup === 'function') openPopup(popup);
    }


    // ── WEATHER ANIMATION ─────────────────────────────────
    function playWeather() {
        const strip = document.getElementById('weather-strip');
        const code  = window._lastWeatherCode ?? parseInt(strip?.dataset.code);
        if (window.startWeatherScene && !isNaN(code)) {
            window.startWeatherScene(code);
        }
    }


    // ── SOCIAL LINKS ──────────────────────────────────────
    const social = {
        youtube:    'https://youtube.com/@rohitpal001?si=HXs0K6bQyBW-d6py',
        instagram:  'https://www.instagram.com/rohitpal_01?igsh=YXNtcGh6aDBjcGgz',
        facebook:   'https://www.facebook.com/share/1LmvJQBqVS/',
        snapchat:   'https://www.snapchat.com/add/rohitpal000035?share_id=kdWwM0TTLOE&locale=en-IN',
        pinterest:  'https://pin.it/2OBhQmeUi',
        googlemaps: 'https://maps.app.goo.gl/P8RCRLtFwc39HdvC9?g_st=ac',
        twitter:    'https://x.com/RohitPal_001',
        linkedin:   'https://in.linkedin.com/in/rohit-pal-7a9a58372',
        threads:    'https://www.threads.com/@rohitpal_01',
    };


    // ── COMMAND HANDLER ───────────────────────────────────
    function handleCommand(t) {

        // DARK MODE
        if (['dark', 'dark mode', 'turn on dark mode', 'turn off light mode', 'on dark mode']
            .some(p => t === p || t.includes(p))) {
            triggerTheme(true); return;
        }

        // LIGHT MODE
        if (['light', 'light mode', 'turn on light mode', 'turn off dark mode', 'on light mode']
            .some(p => t === p || t.includes(p))) {
            triggerTheme(false); return;
        }

        // WEATHER ANIMATION
        if (['weather', 'play weather', "today's weather", 'now weather', 'weather condition', 'show me weather']
            .some(p => t.includes(p))) {
            playWeather(); return;
        }

        // TOP / HOME
        if (['goto top', 'go to top', 'website top', 'hero section', 'hero area', 'goto home', 'go to home', 'go home']
            .some(p => t.includes(p)) || t === 'top' || t === 'home') {
            voiceGoTo('sec-top'); return;
        }

        // ADDRESS
        if (['address', 'show address', 'rohit pal address', "rohit's address", 'rohit address']
            .some(p => t.includes(p))) {
            voiceGoTo('sec-address'); return;
        }

        // BIRTHDAY
        if (['birthday', "rohit's birthday", 'date of birth', 'rohit birthday', 'rohit pal birthday', 'show birthday']
            .some(p => t.includes(p))) {
            voiceGoTo('sec-birthday'); return;
        }

        // FAVOURITES
        if (['favourites', "rohit's favourites", 'rohit pal favourites', 'rohit favourites', 'favourite']
            .some(p => t.includes(p))) {
            voiceGoTo('sec-favourites'); return;
        }

        // EDUCATION
        if (['education', 'rohit pal education', 'rohit education', "rohit's education", 'educational details']
            .some(p => t.includes(p))) {
            voiceGoTo('sec-education'); return;
        }

        // PROJECTS
        if (['projects', 'project', 'open projects', 'rohit pal project', 'rohit projects', "rohit's projects", 'show me projects']
            .some(p => t.includes(p))) {
            voiceGoTo('sec-projects'); return;
        }

        // GALLERY / PHOTOS / TIMELESS MOMENTS
        if (['photos', 'show me photos', 'show me images', 'open images', 'open photos',
             'timeless moments', 'timeless', 'rohit pal photos', 'rohit pal images',
             'rohit photos', "rohit's photos", "rohit's images", 'images']
            .some(p => t.includes(p))) {
            voiceGoTo('sec-gallery'); return;
        }

        // ALSO KNOWN AS
        if (['also known as', 'also know as'].some(p => t.includes(p))) {
            voiceGoTo('sec-aka'); return;
        }

        // QUICK SEARCH
        if (['open search bar', 'quick search'].some(p => t.includes(p)) || t === 'search') {
            voiceGoTo('sec-search'); return;
        }

        // SECTIONS POPUP
        if (['show sections', 'show me sections', 'show all sections', 'show me all sections']
            .some(p => t.includes(p)) || t === 'sections' || t === 'section') {
            openSectionsPopup(); return;
        }

        // MAGIC BOX / TOOLS POPUP
        if (['magic box', 'open magic box', 'show me magic box', 'show magic box']
            .some(p => t.includes(p))) {
            openToolsPopup(); return;
        }

        // MAGICAL IMAGE
        if (['magical image', 'open magical image', 'show me magical image']
            .some(p => t.includes(p))) {
            window.ImgCrusher?.open?.(); return;
        }

        // MAGICAL CHART
        if (['magical chart', 'open magical chart', 'show me magical chart']
            .some(p => t.includes(p))) {
            window.ChartMaker?.open?.(); return;
        }

        // SOCIAL LINKS
        if (t.includes('youtube'))                                    { window.open(social.youtube,    '_blank'); return; }
        if (t.includes('instagram'))                                  { window.open(social.instagram,  '_blank'); return; }
        if (t.includes('facebook'))                                   { window.open(social.facebook,   '_blank'); return; }
        if (t.includes('snapchat'))                                   { window.open(social.snapchat,   '_blank'); return; }
        if (t.includes('pinterest'))                                  { window.open(social.pinterest,  '_blank'); return; }
        if (t.includes('google maps') || t.includes('google map'))   { window.open(social.googlemaps, '_blank'); return; }
        if (t === 'x' || t.includes('twitter'))                      { window.open(social.twitter,    '_blank'); return; }
        if (t.includes('linkedin') || t.includes('linked in'))       { window.open(social.linkedin,   '_blank'); return; }
        if (t.includes('threads'))                                    { window.open(social.threads,    '_blank'); return; }
    }


    // ── RECOGNITION EVENTS ────────────────────────────────
    recognition.onresult = (event) => {
        const t = event.results[event.results.length - 1][0].transcript
                    .toLowerCase()
                    .trim();
        handleCommand(t);
    };

    let isRunning = false;

recognition.onstart = () => { isRunning = true; };

recognition.onend = () => {
    isRunning = false;
    setTimeout(() => recognition.start(), 100);
};

recognition.onerror = (e) => {
    isRunning = false;
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') return;
    setTimeout(() => recognition.start(), 200);
};

// Mic stream green dot alive - stop blinking
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        window._voiceMicStream = stream;
    })
    .catch(() => {}); // silently fail

recognition.start();

})();