const fs = require('fs');

try {
    let content = fs.readFileSync('index.html', 'utf8');

    // Head snippet
    content = content.replace('<script type="application/ld+json" id="seo-ld"></script>',
        '<!-- Google tag (gtag.js) -->\\n  <script async src="https://www.googletagmanager.com/gtag/js?id=G-S0Y8GMMWGT"></script>\\n  <script>\\n    window.dataLayer = window.dataLayer || [];\\n    function gtag(){dataLayer.push(arguments);}\\n    gtag("js", new Date());\\n    gtag("config", "G-S0Y8GMMWGT");\\n  </script>\\n  <script type="application/ld+json" id="seo-ld"></script>');

    // Nav Phone
    content = content.replace('<a href="tel:+33644031931" class="nav-tel">', '<a href="tel:+33644031931" class="nav-tel" onclick="gtag(\\'event\\', \\'click_call\\', { \\'event_category\\': \\'Contact\\', \\'event_label\\': \\'Header\\' });">');

    // CTA Book Hero
    content = content.replace('<button class="cta-btn" id="ctaBtn" onclick="openModal()">', '<button class="cta-btn" id="ctaBtn" onclick="gtag(\\'event\\', \\'form_start\\', { \\'event_category\\': \\'Booking\\' }); openModal()">');

    // FAB Phone
    content = content.replace('<a href="tel:+33644031931" class="fab fab-call">', '<a href="tel:+33644031931" class="fab fab-call" onclick="gtag(\\'event\\', \\'click_call\\', { \\'event_category\\': \\'Contact\\', \\'event_label\\': \\'FAB\\' });">');

    // FAB WhatsApp
    content = content.replace('target="_blank" class="fab fab-whatsapp">', 'target="_blank" class="fab fab-whatsapp" onclick="gtag(\\'event\\', \\'click_whatsapp\\', { \\'event_category\\': \\'Contact\\', \\'event_label\\': \\'FAB\\' });">');

    // Sticky Phone
    content = content.replace('<a href="tel:+33644031931" class="sticky-call">', '<a href="tel:+33644031931" class="sticky-call" onclick="gtag(\\'event\\', \\'click_call\\', { \\'event_category\\': \\'Contact\\', \\'event_label\\': \\'StickyBar\\' });">');

    // Sticky Book
    content = content.replace('<button class="sticky-book" onclick="openModal()">', '<button class="sticky-book" onclick="gtag(\\'event\\', \\'form_start\\', { \\'event_category\\': \\'Booking\\' }); openModal()">');

    // Submit form
    content = content.replace("const confirmBtn = document.getElementById('confirmBtn');\\r\\n      confirmBtn.disabled = true;",
        "try { if (typeof gtag === 'function') { window.gtag('event', 'lead_submitted', { 'event_category': 'Booking', 'value': 1 }); } } catch(e){} const confirmBtn = document.getElementById('confirmBtn');\\r\\n      confirmBtn.disabled = true;");

    content = content.replace("const confirmBtn = document.getElementById('confirmBtn');\\n      confirmBtn.disabled = true;",
        "try { if (typeof gtag === 'function') { window.gtag('event', 'lead_submitted', { 'event_category': 'Booking', 'value': 1 }); } } catch(e){} const confirmBtn = document.getElementById('confirmBtn');\\n      confirmBtn.disabled = true;");

    fs.writeFileSync('index.html', content);
    console.log("index.html successfully updated");

    // seo-data.js virtual pageviews
    let seoContent = fs.readFileSync('seo-data.js', 'utf8');
    if (!seoContent.includes('page_view')) {
        seoContent = seoContent.replace("document.title = data.title;",
            "document.title = data.title;\\n    try { if (typeof gtag === 'function') { gtag('event', 'page_view', { page_title: data.title, page_location: window.location.href, page_path: window.location.pathname + window.location.search }); } } catch(e){}");
        fs.writeFileSync('seo-data.js', seoContent);
        console.log("seo-data.js successfully updated");
    }

} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
