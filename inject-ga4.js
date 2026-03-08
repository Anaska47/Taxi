import fs from 'fs';

let content = fs.readFileSync('index.html', 'utf8');

// 1. Head snippet
content = content.replace('<script type="application/ld+json" id="seo-ld"></script>',
    `<!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-S0Y8GMMWGT"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-S0Y8GMMWGT');
  </script>
  <script type="application/ld+json" id="seo-ld"></script>`);

// 2. Nav Phone
content = content.replace('<a href="tel:+33644031931" class="nav-tel">', '<a href="tel:+33644031931" class="nav-tel" onclick="gtag(\\'event\\', \\'click_call\\', { \\'event_category\\': \\'Contact\\', \\'event_label\\': \\'Header\\' });">');

// 3. CTA Book Hero
content = content.replace('<button class="cta-btn" id="ctaBtn" onclick="openModal()">', '<button class="cta-btn" id="ctaBtn" onclick="gtag(\\'event\\', \\'form_start\\', { \\'event_category\\': \\'Booking\\' }); openModal()">');

// 4. FAB Phone
content = content.replace('<a href="tel:+33644031931" class="fab fab-call">', '<a href="tel:+33644031931" class="fab fab-call" onclick="gtag(\\'event\\', \\'click_call\\', { \\'event_category\\': \\'Contact\\', \\'event_label\\': \\'FAB\\' });">');

// 5. FAB WhatsApp
content = content.replace('<a href="https://wa.me/33644031931?text=Bonjour%20Sam%2C%20je%20voudrais%20r%C3%A9server%20un%20taxi"\n      target="_blank" class="fab fab-whatsapp">', '<a href="https://wa.me/33644031931?text=Bonjour%20Sam%2C%20je%20voudrais%20r%C3%A9server%20un%20taxi"\n      target="_blank" class="fab fab-whatsapp" onclick="gtag(\\'event\\', \\'click_whatsapp\\', { \\'event_category\\': \\'Contact\\', \\'event_label\\': \\'FAB\\' });">');

// 5b fallback if newline diff
content = content.replace('target="_blank" class="fab fab-whatsapp">', 'target="_blank" class="fab fab-whatsapp" onclick="gtag(\\'event\\', \\'click_whatsapp\\', { \\'event_category\\': \\'Contact\\', \\'event_label\\': \\'FAB\\' });">');

// 6. Sticky Phone & Book
content = content.replace('<a href="tel:+33644031931" class="sticky-call">', '<a href="tel:+33644031931" class="sticky-call" onclick="gtag(\\'event\\', \\'click_call\\', { \\'event_category\\': \\'Contact\\', \\'event_label\\': \\'StickyBar\\' });">');
content = content.replace('<button class="sticky-book" onclick="openModal()">', '<button class="sticky-book" onclick="gtag(\\'event\\', \\'form_start\\', { \\'event_category\\': \\'Booking\\' }); openModal()">');

// 7. Submit form
content = content.replace("const confirmBtn = document.getElementById('confirmBtn');\\n      confirmBtn.disabled = true;", `try {
        if (typeof gtag === 'function') {
          gtag('event', 'lead_submitted', { 'event_category': 'Booking', 'value': 1 });
        }
      } catch (e) {}
      
      const confirmBtn = document.getElementById('confirmBtn');
      confirmBtn.disabled = true;`);

// Also fix SEO Data
let seoContent = fs.readFileSync('seo-data.js', 'utf8');
seoContent = seoContent.replace("document.title = data.title;", `document.title = data.title;
    
    // GA4 Page tracking with real title instead of slug
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', {
        page_title: data.title,
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.search
      });
    }`);

fs.writeFileSync('index.html', content);
fs.writeFileSync('seo-data.js', seoContent);

console.log("Injection completed");
