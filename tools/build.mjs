// Generates the six static pages in ../site from the layout of "Hem 1920.design".
// Run:  node tools/build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
mkdirSync(OUT, { recursive: true });

/* ---------------------------------------------------------------- helpers */
const ic = (name, size, w = '', style = '') =>
  `<i class="ph${w ? '-' + w : ''} ph-${name}" style="font-size:${size}px;${style}"></i>`;
const asset = (f) => 'assets/' + encodeURI(f);
const photoStyle = (f) => `--src:url('../${asset(f)}')`;
const cut = (f, style, label = '') =>
  `<div class="a cut" data-src="${asset(f)}" data-label="${label}" style="${style}"></div>`;
const sec = (top, h, cls, inner, style = '', attrs = '') =>
  `<section class="sec ${cls}" style="top:${top}px;height:${h}px;${style}" ${attrs}><div class="in">${inner}</div></section>`;
const t = (txt, style) => `<div class="a nowrap" style="${style}">${txt}</div>`;

/* ----------------------------------------------------------- shared parts */
const NAV = [
  ['hem', 'Hem', 'index.html', 514],
  ['om', 'Om oss', 'om-oss.html', 591],
  ['butiken', 'Butiken', 'butiken.html', 694],
  ['kott', 'Kött', 'kott.html', 807],
];

function header(active) {
  const top = sec(0, 42, 'topbar',
    `<div class="tb" style="left:162px">Hemleverans i Malmö · 70 kr</div>
     <div class="tb" style="left:771px">Färskt kött varje dag</div>
     <div class="tb" style="left:1321px">Hämta på 10–30 min</div>`)
    .replace('</div></section>', '</div><div class="base"></div></section>');
  const nav = NAV.map(([k, l, h, x]) =>
    `<a class="nav ${active === k ? 'on' : ''}" href="${h}" style="left:${x}px">${l}</a>`).join('');
  const menu = sec(42, 76, 'menu', `
    <a class="logo" href="index.html" data-src="${asset('logo.png')}" aria-label="Tamer Elsafadi Kött"></a>
    ${nav}
    <div class="has-drop">
      <a class="nav" href="kott.html" style="left:880px">Webshop</a>
      ${ic('caret-down', 10, '', 'position:absolute;left:975px;top:34px;color:#fff')}
      <div class="drop"><div class="drop-in">
        <a href="kott.html#notkott">Nötkött</a><a href="kott.html#kyckling">Kyckling</a>
        <a href="kott.html#chark">Chark</a><a href="kott.html#paket">Paket</a>
      </div></div>
    </div>
    <a class="nav ${active === 'erb' ? 'on' : ''}" href="erbjudanden.html" style="left:1021px">Erbjudanden</a>
    <a class="nav ${active === 'kontakt' ? 'on' : ''}" href="kontakta-oss.html" style="left:1208px">Kontakta oss</a>
    <div class="a row lang"><span class="flag"></span><span>Svenska</span>${ic('caret-down', 8, 'fill', 'color:#666')}</div>
    <a class="circ-btn" href="erbjudanden.html" style="left:1637px" aria-label="Erbjudanden">${ic('percent', 20)}<span class="dot"></span></a>
    <a class="circ-btn" href="#" style="left:1691px" aria-label="Varukorg" data-cart>${ic('basket', 20)}<span class="badge" data-cart-count>0</span></a>
  `, 'overflow:visible');
  return top + menu;
}

function footer(top) {
  const links = [
    ['Hem', 'index.html', 185, 316], ['Om oss', 'om-oss.html', 185, 390], ['Butiken', 'butiken.html', 185, 464], ['Kött', 'kott.html', 185, 537],
    ['Webbshop', 'kott.html', 403, 316], ['Nötkött', 'kott.html#notkott', 403, 390], ['Kyckling', 'kott.html#kyckling', 403, 464], ['Chark', 'kott.html#chark', 403, 537],
    ['Veckans erbjudanden', 'erbjudanden.html', 627, 316], ['Kontakta oss', 'kontakta-oss.html', 627, 390], ['Varukorg', '#', 627, 464],
  ].map(([l, h, x, y]) => `<a class="fl" href="${h}" style="left:${x}px;top:${y}px">${l}</a>`).join('');
  return sec(top, 818, 'foot clip', `
    <a class="a logo" href="index.html" data-src="${asset('logo.png')}" style="left:183px;top:127px;width:64px;height:68px" aria-label="Tamer Elsafadi Kött"></a>
    ${links}
    ${ic('map-pin', 24, '', 'position:absolute;left:1338px;top:317px;color:#fff')}
    ${ic('alarm', 22, '', 'position:absolute;left:1335px;top:392px;color:#fff')}
    ${ic('phone', 24, '', 'position:absolute;left:1335px;top:466px;color:#fff')}
    ${ic('envelope-simple', 18, '', 'position:absolute;left:1335px;top:543px;color:#fff')}
    <div class="fc" style="left:1385px;top:316px">Bennets väg 38, 213 66 Malmö</div>
    <div class="fc" style="left:1385px;top:390px">Mån - Sön [tid] - 19.00</div>
    <div class="fc" style="left:1385px;top:464px">Tel [platshållare]</div>
    <div class="fc" style="left:1385px;top:539px">info@[platshållare]</div>
    <a class="ring" href="#" style="left:1329px" aria-label="Instagram">${ic('instagram-logo', 23)}</a>
    <a class="ring" href="#" style="left:1424px" aria-label="Facebook"><span style="font:700 29px Inter,sans-serif;line-height:1">f</span></a>
    <a class="ring" href="#" style="left:1519px" aria-label="TikTok">${ic('tiktok-logo', 22, 'fill')}</a>
    <div class="div"></div>
    <div class="bottom"><span class="cp">©2026 – Tamer Elsafadi Kött</span><span class="sep"></span>
      <a href="#">Köpvillkor</a><span class="sep"></span><a href="#">Integritetspolicy</a></div>
  `, `--src:url('../${asset('footer-bg2.png')}')`);
}

const strip = (top, saleText = 'på allt nötkött denna vecka') => sec(top, 100, 'strip', `
  <div class="info">
    <div class="it"><span class="ico">${ic('credit-card', 20)}</span>Betala online eller i butiken</div>
    <div class="it"><span class="ico">${ic('storefront', 20)}</span>Klart att hämta på 10–30 min</div>
    <div class="it"><span class="ico">${ic('truck', 20)}</span>Hemleverans i Malmö · 70 kr</div>
    <div class="it"><span class="pill">Rea</span>${saleText}</div>
  </div>`);

function subHero({ top, h, photo, current, title, lead, contentTop, extra = '', width = 900 }) {
  return `<section class="sec hero photo clip" style="top:${top}px;height:${h}px;${photoStyle(photo)}">
    <div class="shade"></div>
    <div class="in"><div class="content" style="top:${contentTop}px;width:${width}px">
      <div class="crumb"><a href="index.html">Hem</a>${ic('caret-right', 12)}<b>${current}</b></div>
      <h1>${title}</h1>
      <p class="lead">${lead}</p>${extra}
    </div></div></section>`;
}

const priceBlock = (price, old) =>
  `<div class="price">${price}${old ? `<s>${old}</s>` : ''}</div>`;

function productCard({ name, desc, price, old, img }) {
  return `<div class="pc">
    <div class="well"><div class="prod" data-src="${asset(img)}" data-label="${name}"></div></div>
    <div class="info"><h3>${name}</h3><div class="d">${desc}</div>
      <div class="bot">${priceBlock(price, old)}<button class="add" aria-label="Lägg ${name} i varukorgen">${ic('plus', 18, 'bold')}</button></div></div>
  </div>`;
}

const reviewCards = [1, 2, 3].map(() => `
  <div class="review"><div class="stars">★★★★★</div><div class="txt">[Google-recension visas här]</div><hr>
    <div class="row" style="gap:12px"><div class="avatar">K</div>
      <div class="col" style="gap:2px"><b style="font:700 16px Inter">Kundnamn</b><span style="font:400 14px Inter;color:#707070">Google · nyligen</span></div></div></div>`).join('');

const reviewsSection = (top) => sec(top, 790, 'reviews', `
  <h2 class="a syne" style="left:0;top:150px;width:1920px;text-align:center;font:700 44px Syne,sans-serif;letter-spacing:-1px;color:#000">Vad våra kunder säger</h2>
  <p class="a" style="left:0;top:214px;width:1920px;text-align:center;font:400 18px Inter,sans-serif;color:#707070">Omdömen från Google visas här när butiken är kopplad</p>
  <div class="a" style="left:185px;top:290px;width:1550px;display:flex;gap:25px">${reviewCards}</div>
  <a class="a btn" href="#" style="left:830px;top:560px;height:54px;padding:0 26px">${ic('star', 18, 'fill')}Betygsätt oss på Google</a>
`, 'background:#F5F7FA');

const page = (file, { title, key, height, bg = '#F5F7FA', body }) => {
  const html = `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="Färskt kött på Bennets väg i Malmö – beställ online och hämta på 10–30 min.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css">
<link rel="stylesheet" href="css/style.css">
</head>
<body style="background:${bg}">
<main class="page" style="height:${height}px">
${body}
</main>
<script src="js/main.js"></script>
</body>
</html>
`;
  writeFileSync(join(OUT, file), html);
  console.log('wrote', file);
};

/* ===================================================================== HEM */
function home() {
  const dept = (x, w, name, sub, img, fb, glow, tag) => `
    <a class="dept photo ${fb}" href="kott.html#${name === 'Nötkött' ? 'notkott' : name.toLowerCase() === 'paket' ? 'paket' : name.toLowerCase()}"
       style="left:${x}px;width:${w}px;${photoStyle(img)};--glow:${glow}">
      <div class="label"><h3>${name}</h3><p>${sub}</p><span class="go">${ic('arrow-right', 20)}</span></div>
    </a>`;
  const s05 = sec(1148, 712, 'clip', `
    ${dept(198, 366, 'Nötkött', 'Från 100 kr/kg', 'pexels-notkott-s05b.png', 'fb-red',
      'radial-gradient(150px 150px at 55px 0,rgba(74,62,60,.75),transparent),radial-gradient(65px 65px at 98px 0,rgba(138,64,48,.8),transparent)')}
    ${dept(584, 366, 'Kyckling', 'Från 90 kr/kg', 'pexels-kyckling-s05b.png', 'fb-warm',
      'radial-gradient(120px 120px at 50% 0,rgba(140,74,56,.75),transparent),radial-gradient(60px 60px at 52px 0,rgba(160,92,74,.6),transparent)')}
    ${dept(970, 366, 'Chark', 'Från 80 kr/st', 'pexels-chark-s05b.png', 'fb-red',
      'radial-gradient(75px 75px at 50% 0,rgba(110,52,48,.85),transparent)')}
    ${dept(1356, 367, 'Paket', 'Från 560 kr', 'pexels-paket-s05b.png', 'fb-warm',
      'radial-gradient(105px 105px at 60px 0,rgba(150,78,26,.9),transparent)')}
    <span class="a pill lg" style="left:222px;top:47px;padding:0 14px">Rea denna vecka</span>
    <span class="a pill lg dark" style="left:1380px;top:47px;padding:0 14px">Nyhet</span>
    <div class="a" style="left:0;top:711px;width:100%;height:1px;background:#F5F7FA"></div>
  `, 'background:#fff');

  const s06 = sec(1860, 250, '', `
    <div class="a center" style="left:239px;top:88px;width:52px;height:52px;border-radius:26px;background:#F5F7FA;color:#EE0000">${ic('clock', 24)}</div>
    <div class="a syne nowrap" style="left:292px;top:95px;font:700 30px Syne,sans-serif;letter-spacing:-.6px;color:#000">Öppettider</div>
    <div class="a nowrap" style="left:250px;top:140px;font:400 17px Inter,sans-serif;letter-spacing:.3px;color:#555">Mån–Lör [tid] · Sön [tid] · öppettider från Inställningar (ÖPPEN)</div>
    <div class="a syne" style="left:1300px;top:88px;width:436px;text-align:right;font:700 30px Syne,sans-serif;letter-spacing:-.75px;color:#000">Följ oss på sociala medier</div>
    <div class="a" style="left:1270px;top:146px;width:466px;display:flex;justify-content:flex-end;gap:10px">
      <a class="soc-pill" href="#">${ic('instagram-logo', 18)}Instagram</a>
      <a class="soc-pill" href="#">${ic('facebook-logo', 18)}Facebook</a>
      <a class="soc-pill" href="#">${ic('tiktok-logo', 18)}TikTok</a>
    </div>
    ${cut('cutout-s06-steak.png', 'left:720px;top:218px;width:106px;height:116px;z-index:4')}
  `, 'background:#F5F7FA;z-index:4');

  const s07 = sec(2110, 880, 'clip', `
    <div class="a white-card" style="left:185px;top:13px;width:763px;height:560px"></div>
    <div class="a white-card" style="left:973px;top:305px;width:762px;height:561px"></div>
    <h2 class="a syne nowrap" style="left:260px;top:80px;font:700 44px Syne,sans-serif;letter-spacing:-.9px;color:#000">Färskvaror</h2>
    <div class="a nowrap" style="left:261px;top:144px;font:600 20px Inter,sans-serif;letter-spacing:-.22px;color:#CC0000">Det bästa från disken</div>
    <p class="a" style="left:261px;top:225px;width:560px;font:400 18px/1.65 Inter,sans-serif;color:#555">Vi finns på Bennets väg i Malmö och fyller disken med färskt kött varje dag. Nötkött, kyckling, chark och färdiga paket – noga utvalt och styckat för hand. Hos oss möts stamkunder och nya ansikten, och alla får samma omtanke vid disken.</p>
    <h2 class="a syne nowrap" style="left:1047px;top:372px;font:700 44px Syne,sans-serif;letter-spacing:-.9px;color:#000">Styckning &amp; Chark</h2>
    <p class="a" style="left:1048px;top:472px;width:600px;font:400 18px/1.65 Inter,sans-serif;color:#555">Vi styckar efter dina önskemål och väljer charken med omsorg. Beställ online och hämta inom 10–30 minuter – eller få det hemlevererat i Malmö. Du betalar när du hämtar eller vid dörren.</p>
    <div class="a photo fb-warm" style="left:973px;top:13px;width:368px;height:267px;border-radius:24px;${photoStyle('pexels-s07-disk.png')}"></div>
    <div class="a photo fb-red" style="left:1366px;top:13px;width:369px;height:267px;border-radius:24px;${photoStyle('pexels-s07-kyl.png')}"></div>
    <div class="a photo fb-red" style="left:185px;top:598px;width:369px;height:268px;border-radius:24px;${photoStyle('pexels-s07-not.png')}"></div>
    <div class="a photo fb-warm" style="left:579px;top:598px;width:369px;height:268px;border-radius:24px;${photoStyle('pexels-s07-gris.png')}"></div>
    ${cut('cutout-s07-chili.png', 'left:161px;top:430px;width:86px;height:85px')}
    ${cut('cutout-s07-citron.png', 'left:1687px;top:358px;width:89px;height:86px')}
    ${cut('cutout-s07-steak.png', 'left:724px;top:-2px;width:112px;height:88px')}
    <div class="a col" style="left:1048px;top:588px;width:612px;gap:10px">
      <div class="prow"><div class="thumb" data-src="${asset('entrecote (1).png')}"></div>
        <div class="col" style="gap:3px;flex:1"><div class="row" style="gap:8px"><span class="nm">Entrecôte</span><span class="pill sm">Rea</span></div><span class="sub">1 variant · 349 kr/kg</span></div>
        <button class="add" aria-label="Lägg i varukorgen">${ic('plus', 18, 'bold')}</button></div>
      <div class="prow"><div class="thumb" data-src="${asset('kyckling-ben.png')}"></div>
        <div class="col" style="gap:3px;flex:1"><span class="nm">Kycklingben</span><span class="sub">2 varianter · från 90 kr/kg</span></div>
        <button class="add" aria-label="Lägg i varukorgen">${ic('plus', 18, 'bold')}</button></div>
    </div>
    <a class="a link-red" href="kott.html" style="left:1048px;top:780px;font-size:18px">Till webbshoppen${ic('arrow-right', 18, 'bold')}</a>
    <a class="a" href="erbjudanden.html" style="left:261px;top:404px;width:612px;background:#111;border-radius:22px;padding:22px 28px;display:flex;align-items:center;justify-content:space-between">
      <div class="col" style="gap:6px"><span style="font:700 12px Inter;letter-spacing:1.5px;color:#AAA">VECKANS ERBJUDANDE</span>
        <span style="font:700 20px Inter;color:#fff">Helgens nötkött</span><span style="font:400 14px Inter;color:#AAA">Gäller t.o.m. 4 oktober</span></div>
      <span style="font:700 72px/1 Syne,sans-serif;letter-spacing:-3px;color:#fff;text-align:right">85 kr/kg</span>
    </a>
  `, 'background:#F5F7FA');

  const s08 = sec(2990, 600, '', `
    <div class="a white-card" style="left:185px;top:11px;width:1025px;height:438px"></div>
    <h2 class="a syne nowrap" style="left:260px;top:78px;font:700 46px Syne,sans-serif;letter-spacing:-.8px;color:#000">Service över disk</h2>
    <div class="a nowrap" style="left:261px;top:142px;font:600 20px Inter,sans-serif;letter-spacing:-.1px;color:#CC0000">Personlig hjälp varje dag</div>
    <p class="a" style="left:261px;top:223px;width:640px;font:400 18px/1.65 Inter,sans-serif;color:#555">Berätta vad du ska laga så föreslår vi rätt bit, styckar den precis som du vill ha den och tipsar om tillagningen. Välkommen in.</p>
    <div class="a photo fb-warm" style="left:1235px;top:11px;width:500px;height:438px;border-radius:28px;${photoStyle('pexels-s08-disk.png')}"></div>
    ${cut('cutout-s08-board-m.png', 'left:880px;top:293px;width:250px;height:234px')}
    <div class="a row" style="left:261px;top:340px;gap:12px">
      <a class="btn h54" href="butiken.html">${ic('map-pin', 18)}Hitta till butiken</a>
      <a class="btn h54 light" href="kontakta-oss.html">${ic('phone', 18)}Ring oss</a>
    </div>
  `, 'background:#F5F7FA');

  const s10 = sec(4380, 894, '', `
    <div class="a white-card" style="left:185px;top:128px;width:1550px;height:566px"></div>
    <div class="a photo fb-red" style="left:919px;top:128px;width:816px;height:563px;border-radius:28px;${photoStyle('pexels-s10-farsk-b.png')}"></div>
    <h2 class="a syne" style="left:238px;top:181px;width:560px;font:700 40px/1.1 Syne,sans-serif;letter-spacing:-1.2px;color:#000">Beställ kött online i Malmö – smidigt och snabbt</h2>
    <p class="a" style="left:238px;top:300px;width:580px;font:400 18px/1.65 Inter,sans-serif;letter-spacing:-.25px;color:#555">Välj bland nötkött, kyckling, chark och färdiga paket. Allt styckas och packas av oss i butiken – samma kvalitet som över disk.</p>
    <div class="a col" style="left:238px;top:420px;width:580px;gap:10px">
      <div class="optrow">${ic('storefront', 22, '', 'color:#EE0000')}<span class="f">Hämta i butiken – klart på 10–30 min</span><b style="font:700 15px Inter">Gratis</b></div>
      <div class="optrow">${ic('truck', 22, '', 'color:#EE0000')}<span class="f">Hemleverans i Malmö</span><b style="font:700 15px Inter;color:#CC0000">+70 kr</b></div>
      <div class="optrow">${ic('credit-card', 22, '', 'color:#EE0000')}<span class="f">Betala online eller i butiken</span></div>
    </div>
    <a class="a btn" href="kott.html" style="left:238px;top:610px;height:56px;padding:0 28px;font-size:17px">Till webbshoppen${ic('arrow-right', 18)}</a>
    <a class="a col" href="kott.html#paket" style="left:1430px;top:520px;width:270px;gap:8px;padding:26px 24px 22px 24px;background:#fff;border-radius:20px;box-shadow:0 12px 32px rgba(0,0,0,.18)">
      <span style="font:800 20px Inter;letter-spacing:-.5px;color:#111">Familjepaketet</span>
      <span class="row" style="gap:8px"><b style="font:800 18px Inter;color:#CC0000">560 kr</b><span style="font:400 14px Inter;color:#707070">ord. 700 kr</span></span>
      <span style="font:400 13px Inter;color:#707070">4 styckdetaljer · Beställ i webbshoppen</span>
      <span class="a center" style="left:-14px;top:-16px;width:52px;height:52px;border-radius:26px;background:#EE0000;color:#fff;font:800 14px Inter;transform:rotate(-12deg)">Rea</span>
    </a>
  `, 'background:#F5F7FA');

  const body = [
    header('hem'),
    `<section class="sec hero photo clip" style="top:118px;height:930px;${photoStyle('pexels-butik-hero3.png')}">
      <div class="in">
        <h1 class="a syne" style="left:0;top:345px;width:1920px;text-align:center;font:700 48px Syne,sans-serif;letter-spacing:-.5px;color:#fff;text-shadow:.5px 0 0 #fff">Tamer Elsafadi Kött i Malmö</h1>
        <p class="a" style="left:0;top:424px;width:1920px;text-align:center;font:500 18px Inter,sans-serif;letter-spacing:-.3px;color:#E6E6E6">Färskt kött på Bennets väg · beställ online och hämta på 10–30 min</p>
        <a class="a btn" href="kott.html" style="left:738px;top:504px;width:204px;height:62px;border-radius:14px;font-size:17px">Till webbshoppen</a>
        <a class="a btn glass" href="kontakta-oss.html" style="left:968px;top:504px;width:213px;height:62px;border-radius:14px;font-size:17px">Kontakta oss</a>
        <a class="a logo" href="index.html" data-src="${asset('logo.png')}" style="left:914px;top:796px;width:92px;height:99px" aria-label="Logga"></a>
        <div class="a" style="left:0;top:929px;width:100%;height:1px;background:#F7F5F4"></div>
      </div></section>`,
    strip(1048), s05, s06, s07, s08, reviewsSection(3590), s10, footer(5274),
  ].join('\n');
  page('index.html', { title: 'Tamer Elsafadi Kött i Malmö', key: 'hem', height: 6092, bg: '#fff', body });
}

/* ================================================================= OM OSS */
function omOss() {
  const val = (icon, title, text) => `<div class="val"><div class="ico">${ic(icon, 24)}</div><h3>${title}</h3><p>${text}</p></div>`;
  const body = [
    header('om'),
    subHero({ top: 118, h: 520, photo: 'pexels-om-hero2.png', current: 'Om oss', contentTop: 150,
      title: 'Färskt kött och ärlig service i Malmö',
      lead: 'Vi är köttbutiken på Bennets väg. Här styckar vi för hand, fyller disken varje morgon och tar oss tid för varje kund.' }),
    strip(638),
    sec(738, 680, '', `
      <div class="a white-card hist" style="left:185px;top:40px;width:763px;height:600px">
        <div class="eyebrow">VÅR HISTORIA</div>
        <h2 style="font:700 44px/1.1 Syne,sans-serif;letter-spacing:-1px;color:#000">Från disken, för grannarna</h2>
        <div style="font:600 20px Inter;color:#CC0000">Sedan [år] på Bennets väg</div>
        <div style="height:22px"></div>
        <p class="p">Tamer Elsafadi Kött började med en enkel idé: att Malmö ska ha en köttbutik där kvaliteten syns i disken och där man alltid blir hjälpt. Vi väljer råvaran själva, styckar den i butiken och säljer den samma dag.</p>
        <p class="p">I dag handlar stamkunder och nya ansikten hos oss – över disk, i webbshoppen eller med hemleverans i Malmö.</p>
        <div class="numbers" style="margin-top:auto">
          <div><b>10–30</b><span>min till hämtning</span></div>
          <div><b>7 dagar</b><span>öppet i veckan</span></div>
          <div><b>4</b><span>avdelningar i disken</span></div>
        </div>
      </div>
      <div class="a photo fb-warm" style="left:973px;top:40px;width:762px;height:600px;border-radius:28px;${photoStyle('pexels-om.png')}"></div>
      ${cut('cutout-s07-steak.png', 'left:880px;top:560px;width:112px;height:88px')}
    `, 'background:#F5F7FA'),
    sec(1418, 1364, '', `
      <div class="a col" style="left:0;top:0;width:1920px;height:560px;align-items:center;padding-top:90px">
        <h2 style="font:700 44px Syne,sans-serif;letter-spacing:-1px;color:#000">Det här står vi för</h2>
        <p style="margin-top:14px;font:400 18px Inter;color:#707070">Tre löften vi håller varje dag, oavsett om du handlar över disk eller online</p>
        <div style="display:flex;gap:25px;width:1550px;margin-top:56px">
          ${val('sun-horizon', 'Färskt varje morgon', 'Disken fylls på varje dag. Det som inte håller vår standard hamnar aldrig framför dig.')}
          ${val('knife', 'Styckat för hand', 'Vi styckar i butiken efter dina önskemål – tjocklek, storlek och mängd som passar din rätt.')}
          ${val('hand-heart', 'Personlig service', 'Fråga oss om rätt bit och tillagning. Vi tar oss tid, både vid disken och i telefon.')}
        </div>
      </div>
      <div class="a photo fb-warm" style="left:185px;top:580px;width:369px;height:300px;border-radius:24px;${photoStyle('pexels-s07-disk.png')}"></div>
      <div class="a photo fb-red" style="left:579px;top:580px;width:369px;height:300px;border-radius:24px;${photoStyle('pexels-s07-not.png')}"></div>
      <div class="a photo fb-warm" style="left:973px;top:580px;width:369px;height:300px;border-radius:24px;${photoStyle('pexels-s08-disk.png')}"></div>
      <div class="a photo fb-red" style="left:1366px;top:580px;width:369px;height:300px;border-radius:24px;${photoStyle('pexels-s07-kyl.png')}"></div>
      <div class="a" style="left:185px;top:960px;width:1550px;height:324px;background:#111;border-radius:28px;padding:0 75px;display:flex;align-items:center;justify-content:space-between">
        <div class="col" style="width:760px;gap:14px">
          <div class="eyebrow" style="color:#AAA">VÄLKOMMEN IN</div>
          <h2 style="font:700 48px/1.1 Syne,sans-serif;letter-spacing:-1px;color:#fff">Kom förbi disken på Bennets väg 38</h2>
          <p style="font:400 18px/1.6 Inter;color:#AAA">Öppet alla dagar till 19:00. Ingen tid? Beställ i webbshoppen och hämta på 10–30 min.</p>
        </div>
        <div class="row" style="gap:12px">
          <a class="btn h56" href="butiken.html">${ic('map-pin', 18)}Hitta till butiken</a>
          <a class="btn h56 glass" href="kott.html" style="background:rgba(255,255,255,.12)">Till webbshoppen${ic('arrow-right', 18)}</a>
        </div>
      </div>
    `, 'background:#F5F7FA'),
    footer(2782),
  ].join('\n');
  page('om-oss.html', { title: 'Om oss – Tamer Elsafadi Kött', key: 'om', height: 3600, body });
}

/* ==================================================================== KÖTT */
function kott() {
  const head = (title, pill, sub, linkText = 'Se alla i webbshoppen') => `
    <div class="sec-head"><div><div class="t"><h2 class="h-44">${title}</h2><span class="pill md">${pill}</span></div><div class="s">${sub}</div></div>
      <a class="link-red" href="kott.html">${linkText}${ic('arrow-right', 16)}</a></div>`;
  const notkott = [
    { name: 'Entrecôte', desc: 'Marmorerad, perfekt för grillen', price: '279 kr/kg', old: '349 kr', img: 'entrecote (1).png' },
    { name: 'Bringa', desc: 'För långkok och rökning', price: '103 kr/kg', old: '129 kr', img: 'bringa.png' },
    { name: 'Bogbladsplatta', desc: 'Mör och smakrik', price: '80 kr/kg', old: '100 kr', img: 'bogbladsplatta.png' },
    { name: 'Bogrulle', desc: 'Till stek i ugn', price: '80 kr/kg', old: '100 kr', img: 'bogrulle (1).png' },
  ].map(productCard).join('');
  const kyck = [
    { name: 'Kycklingben', desc: 'Saftiga, för ugn och grill', price: '90 kr/kg', old: '100 kr', img: 'kyckling-ben.png' },
    { name: 'Bröstfilé', desc: 'Mager och mångsidig', price: '100 kr/kg', img: 'brost-file.png' },
    { name: 'Charkuterier', desc: 'Korv och pålägg, utvalt av oss', price: '89 kr/st', img: 'charkuterier.png' },
  ].map(productCard).join('');
  const li = (a, b) => `<div class="li"><b>${a}</b><span>${b}</span></div>`;
  const strip3 = (imgs) => `<div class="strip3">${imgs.map(([f, l]) => `<div><div class="prod" data-src="${asset(f)}" data-label="${l}"></div></div>`).join('')}</div>`;
  const pkgs = `
    <div class="pkg" id="familjepaket">
      <div class="top"><div><h3>Familjepaket</h3><div class="desc">Bogrulle, bringa och bröstfilé för veckans middagar.</div></div><span class="pill md" style="align-self:flex-start">Rea</span></div>
      ${strip3([['bogrulle (1).png', 'Bogrulle'], ['bringa.png', 'Bringa'], ['brost-file.png', 'Bröstfilé']])}
      <div><div class="incl" style="margin-bottom:6px">VAD SOM INGÅR</div>${li('Bogrulle', '2 kg')}${li('Bringa', '1,5 kg')}${li('Bröstfilé', '2 kg')}</div>
      <div class="foot-row"><div class="pr">560 kr<s>ord. 700 kr</s></div><button class="btn h54 add-pkg">Beställ paketet</button></div>
    </div>
    <div class="pkg" id="grillpaket">
      <div class="top"><div><h3>Grillpaket</h3><div class="desc">Entrecôte, kycklingben och charkuterier – redo för grillen.</div></div><span class="pill md dark" style="align-self:flex-start">Nyhet</span></div>
      ${strip3([['entrecote (1).png', 'Entrecôte'], ['kyckling-ben.png', 'Kycklingben'], ['charkuterier.png', 'Charkuterier']])}
      <div><div class="incl" style="margin-bottom:6px">VAD SOM INGÅR</div>${li('Entrecôte', '1 kg')}${li('Kycklingben', '2 kg')}${li('Charkuterier', '2 st')}</div>
      <div class="foot-row"><div class="pr">727 kr</div><button class="btn h54 add-pkg">Beställ paketet</button></div>
    </div>`;
  const chips = ['Allt', 'Nötkött', 'Kyckling', 'Chark', 'Paket'].map((c, i) =>
    `<a class="chip ${i === 0 ? 'on' : ''}" href="${i === 0 ? '#' : '#' + ['', 'notkott', 'kyckling', 'chark', 'paket'][i]}">${c}</a>`).join('');
  const body = [
    header('kott'),
    subHero({ top: 118, h: 440, photo: 'pexels-notkott.png', current: 'Kött', contentTop: 110, width: 1000,
      title: 'Vårt kött',
      lead: 'Nötkött, kyckling, chark och färdiga paket – samma sortiment i disken som i webbshoppen.',
      extra: `<div style="height:14px"></div><div class="row" style="gap:10px">${chips}</div>` }),
    strip(558),
    sec(738, 617, '', `<div class="a" id="notkott" style="left:185px;top:0;width:1550px">
      ${head('Nötkött', 'Helgens nötkött · nya priser', '5 produkter · styckas efter dina önskemål')}
      <div class="pgrid" style="height:377px">${notkott}</div></div>`, 'background:#F5F7FA'),
    sec(1355, 617, '', `<div class="a" id="kyckling" style="left:185px;top:0;width:1550px">
      ${head('Kyckling &amp; chark', 'Kycklingben 90 kr/kg', '3 produkter · färskt i disken varje dag')}
      <div class="pgrid" style="height:377px">${kyck}
        <div class="offer"><div><div class="e">VECKANS ERBJUDANDE</div><div class="n">Kycklingben</div><div class="u">Gäller t.o.m. 4 oktober</div></div>
          <div class="big">90 kr</div>
          <a class="btn" href="erbjudanden.html">Handla erbjudandet${ic('arrow-right', 16)}</a></div>
      </div></div><span id="chark" class="a" style="left:0;top:0"></span>`, 'background:#F5F7FA'),
    sec(1972, 822, '', `<div class="a" id="paket" style="left:185px;top:0;width:1550px">
      <div class="sec-head"><div><h2 class="h-44" style="margin-bottom:8px">Färdiga paket</h2><div class="s">Hopplockat av oss – beställ som en enda rad i varukorgen</div></div>
        <a class="link-red" href="kott.html">Alla paket${ic('arrow-right', 16)}</a></div>
      <div class="pgrid" style="height:627px;gap:25px">${pkgs}</div></div>`, 'background:#F5F7FA'),
    footer(2794),
  ].join('\n');
  page('kott.html', { title: 'Kött – Tamer Elsafadi Kött', key: 'kott', height: 3612, body });
}

/* ============================================================= ERBJUDANDEN */
function erbjudanden() {
  const rea = [
    { name: 'Entrecôte', desc: 'Marmorerad, perfekt för grillen', price: '279 kr/kg', old: '349 kr', img: 'entrecote (1).png' },
    { name: 'Bringa', desc: 'För långkok och rökning', price: '103 kr/kg', old: '129 kr', img: 'bringa.png' },
    { name: 'Bogbladsplatta', desc: 'Mör och smakrik', price: '80 kr/kg', old: '100 kr', img: 'bogbladsplatta.png' },
    { name: 'Kycklingben', desc: 'Saftiga, för ugn och grill', price: '90 kr/kg', old: '100 kr', img: 'kyckling-ben.png' },
  ].map(productCard).join('');
  const banner = (x, img, e, n, u, price) => `
    <a class="banner photo fb-red" href="kott.html" style="left:${x}px;${photoStyle(img)}">
      <div class="lab"><div><div class="e">${e}</div><div class="n">${n}</div><div class="u">${u}</div></div>
        <div class="pr">${price}<span class="go">${ic('arrow-right', 20)}</span></div></div></a>`;
  const step = (n, title, text) => `<div class="val"><div class="ico dark">${n}</div><h3>${title}</h3><p>${text}</p></div>`;
  const body = [
    header('erb'),
    subHero({ top: 118, h: 440, photo: 'pexels-paket.png', current: 'Erbjudanden', contentTop: 110, width: 1000,
      title: 'Veckans erbjudanden',
      lead: 'Sänkta priser i disken och i webbshoppen – så länge lagret räcker.',
      extra: `<div style="height:14px"></div><div class="row"><span class="chip">${ic('clock', 18)}Gäller t.o.m. söndag 4 oktober</span></div>` }),
    strip(558),
    sec(738, 440, '', `<div class="a" style="left:185px;top:0;width:1550px;height:440px">
      ${banner(0, 'pexels-notkott-s05.png', 'VECKANS STÖRSTA', 'Allt nötkött', 'Entrecôte, bringa, bog och mer', '85 kr')}
      ${banner(787, 'pexels-kyckling-s05.png', 'KYCKLING', 'Kycklingben', 'Nu 90 kr/kg · ord. 100 kr/kg', '90 kr')}
    </div>`, 'background:#F5F7FA'),
    sec(1262, 568, '', `<div class="a" style="left:185px;top:0;width:1550px">
      <div class="sec-head"><div><div class="t"><h2 class="h-44">Alla varor på rea</h2><span class="pill md">5 varor</span></div><div class="s">Samma priser i butiken och i webbshoppen</div></div>
        <a class="link-red" href="kott.html">Se alla i webbshoppen${ic('arrow-right', 16)}</a></div>
      <div class="pgrid" style="height:373px">${rea}</div></div>`, 'background:#F5F7FA'),
    sec(1830, 592, '', `<div class="a col" style="left:0;top:0;width:1920px;align-items:center;padding-top:90px">
      <h2 style="font:700 44px Syne,sans-serif;letter-spacing:-1px;color:#000">Så handlar du veckans erbjudanden</h2>
      <p style="margin-top:14px;font:400 18px Inter;color:#707070">Tre steg – från webbshoppen till din disk hemma</p>
      <div style="display:flex;gap:25px;width:1550px;margin-top:56px">
        ${step(1, 'Välj i webbshoppen', 'Rea-priserna syns direkt på varorna. Lägg till i kilo eller styck – vi väger upp exakt.')}
        ${step(2, 'Betala online eller i butiken', 'Betala med kort direkt, eller välj att betala när du hämtar i butiken.')}
        ${step(3, 'Hämta eller få hemleverans', 'Klart att hämta på 10–30 min på Bennets väg 38, eller hemleverans i Malmö för 70 kr.')}
      </div></div>`, 'background:#F5F7FA'),
    footer(2422),
  ].join('\n');
  page('erbjudanden.html', { title: 'Veckans erbjudanden – Tamer Elsafadi Kött', key: 'erb', height: 3240, body });
}

/* =================================================================== BUTIKEN */
function butiken() {
  const day = (a, b) => `<div class="r"><b>${a}</b><span>${b}</span></div>`;
  const svc = (icon, a, b, strong) => `<div class="svc">${ic(icon, 22, '', 'color:#EE0000')}<b>${a}</b><span class="${strong ? 'strong' : ''}">${b}</span></div>`;
  const body = [
    header('butiken'),
    subHero({ top: 118, h: 520, photo: 'pexels-butik-hero2.png', current: 'Butiken', contentTop: 112,
      title: 'Välkommen in till disken på Bennets väg',
      lead: 'Titta på köttet innan du väljer, få det styckat som du vill ha det och hämta dina webbeställningar – allt på samma ställe.',
      extra: `<div class="row" style="gap:12px;margin-top:0"><a class="btn h56" href="https://www.google.com/maps/search/?api=1&query=Bennets+v%C3%A4g+38+Malm%C3%B6" target="_blank" rel="noopener">${ic('map-pin', 18)}Vägbeskrivning</a>
        <a class="btn h56 glass" href="tel:">${ic('phone', 18)}Ring butiken</a></div>` }),
    sec(718, 580, '', `<div class="a" style="left:185px;top:0;width:1550px;height:500px">
      <div class="a clip" style="left:0;top:0;width:940px;height:500px;background:#EEE;border-radius:28px;overflow:hidden">
        <div class="map">
          <div style="left:40px;top:40px;width:220px;height:150px"></div><div style="left:300px;top:40px;width:260px;height:150px"></div>
          <div style="left:600px;top:40px;width:300px;height:150px"></div><div style="left:40px;top:250px;width:220px;height:120px"></div>
          <div style="left:600px;top:250px;width:300px;height:120px"></div><div style="left:40px;top:430px;width:220px;height:140px"></div>
          <div style="left:300px;top:430px;width:260px;height:140px"></div><div style="left:600px;top:430px;width:300px;height:140px"></div>
          <div class="road" style="left:0;top:205px;width:940px;height:30px"></div><div class="road" style="left:0;top:385px;width:940px;height:30px"></div>
          <div class="road" style="left:270px;top:0;width:22px;height:600px"></div><div class="road" style="left:570px;top:0;width:22px;height:600px"></div>
          <div class="park" style="left:300px;top:250px;width:260px;height:120px"></div>
        </div>
        <div class="a center" style="left:402px;top:282px;width:56px;height:56px;border-radius:28px;background:#EE0000;color:#fff;box-shadow:0 6px 16px rgba(238,0,0,.4)">${ic('map-pin', 26, 'fill')}</div>
        <div class="a" style="left:28px;top:376px;width:884px;height:96px;background:#fff;border-radius:20px;padding:0 24px;display:flex;align-items:center;justify-content:space-between">
          <div class="row" style="gap:14px"><div class="center" style="width:48px;height:48px;border-radius:24px;background:#F5F7FA;color:#EE0000">${ic('map-pin', 22)}</div>
            <div class="col" style="gap:2px"><b style="font:700 18px Inter">Bennets väg 38, 213 66 Malmö</b><span style="font:400 14px Inter;color:#707070">Parkering: [platshållare] · Buss: [platshållare]</span></div></div>
          <a class="btn" href="https://www.google.com/maps/search/?api=1&query=Bennets+v%C3%A4g+38+Malm%C3%B6" target="_blank" rel="noopener" style="height:48px;padding:0 20px;font-size:15px">Öppna i Kartor${ic('arrow-up-right', 16)}</a>
        </div>
      </div>
      <div class="a white-card" style="left:965px;top:0;width:585px;height:500px;padding:44px;display:flex;flex-direction:column">
        <div class="row" style="justify-content:space-between">
          <div class="row" style="gap:12px"><div class="center" style="width:52px;height:52px;border-radius:26px;background:#F5F7FA;color:#EE0000">${ic('clock', 24)}</div>
            <h2 style="font:700 32px Syne,sans-serif;letter-spacing:-1px;color:#000">Öppettider</h2></div>
          <span class="pill md dark">Öppet nu</span></div>
        <div style="height:28px"></div>
        <div class="rows">${day('Måndag – fredag', '[tid] – 19:00')}${day('Lördag', '[tid] – 19:00')}${day('Söndag', '[tid] – 19:00')}${day('Helgdagar', '[platshållare]')}</div>
        <div style="height:24px"></div>
        <div class="row" style="gap:14px;padding:16px 18px;background:#F5F7FA;border-radius:16px;font:600 16px Inter">${ic('storefront', 22, '', 'color:#EE0000')}Webbeställningar är klara att hämta på 10–30 min</div>
      </div>
    </div>`, 'background:#F5F7FA'),
    sec(1298, 540, '', `<div class="a" style="left:185px;top:0;width:1550px;height:500px">
      <div class="a photo fb-warm" style="left:0;top:0;width:640px;height:500px;border-radius:28px;${photoStyle('pexels-s08-disk.png')}"></div>
      <div class="a white-card" style="left:665px;top:0;width:885px;height:500px;padding:60px 75px;display:flex;flex-direction:column">
        <h2 style="font:700 44px Syne,sans-serif;letter-spacing:-1px;color:#000">Service över disk</h2>
        <div style="height:10px"></div>
        <div style="font:600 20px Inter;color:#CC0000">Det här hjälper vi dig med</div>
        <div style="height:36px"></div>
        <div class="col" style="gap:10px">
          ${svc('knife', 'Styckning efter dina önskemål', 'Tjocklek och mängd')}
          ${svc('calendar-check', 'Förbeställ till helg och högtid', 'Ring eller kom in')}
          ${svc('storefront', 'Hämta din webbeställning', '10–30 min', true)}
          ${svc('chat-circle-dots', 'Tips om bit och tillagning', 'Fråga oss gärna')}
        </div>
      </div>
    </div>
    ${cut('cutout-s08-board-m.png', 'left:735px;top:402px;width:150px;height:140px;z-index:3')}`, 'background:#F5F7FA'),
    reviewsSection(1838),
    footer(2628),
  ].join('\n');
  page('butiken.html', { title: 'Butiken – Tamer Elsafadi Kött', key: 'butiken', height: 3446, body });
}

/* ============================================================ KONTAKTA OSS */
function kontakta() {
  const way = (icon, label, value, chev = true, href = '#') =>
    `<a class="cway" href="${href}"><span class="ico">${ic(icon, 24)}</span><span class="grow"><div class="lab">${label}</div><div class="val2">${value}</div></span>${chev ? ic('caret-right', 20, '', 'color:#AAA') : ''}</a>`;
  const soc = (icon, label) => `<a class="soc-pill" href="#">${ic(icon, 18)}${label}</a>`;
  const body = [
    header('kontakt'),
    subHero({ top: 118, h: 400, photo: 'pexels-butik-hero.png', current: 'Kontakta oss', contentTop: 105,
      title: 'Kontakta oss',
      lead: 'Frågor om en beställning, större mängder eller något annat? Ring, skriv eller kom förbi – vi hjälper dig gärna.' }),
    sec(518, 1864, '', `
      <div class="a col" style="left:185px;top:80px;width:585px;gap:12px">
        ${way('phone', 'Ring oss', 'Tel [platshållare]')}
        ${way('envelope-simple', 'Mejla oss', 'info@[platshållare]')}
        ${way('map-pin', 'Besök butiken', 'Bennets väg 38, Malmö', true, 'butiken.html')}
        <div class="cway"><span class="ico">${ic('clock', 24)}</span><span class="grow"><div class="lab">Öppettider</div><div class="val2">Mån–Sön [tid] – 19:00</div></span><span class="pill md dark" style="font-size:13px">Öppet nu</span></div>
        <div style="height:10px"></div>
        <div class="row" style="gap:10px">${soc('instagram-logo', 'Instagram')}${soc('facebook-logo', 'Facebook')}${soc('tiktok-logo', 'TikTok')}</div>
      </div>
      <form class="a white-card form" id="contact-form" style="left:795px;top:80px;width:940px" novalidate>
        <div class="col" style="gap:6px"><h2 style="font:700 36px Syne,sans-serif;letter-spacing:-1px;color:#000">Skicka ett meddelande</h2>
          <p style="font:400 17px Inter;color:#707070">Vi svarar så snart vi kan, oftast samma dag.</p></div>
        <div class="col" style="gap:10px"><label class="l">Vad gäller det?</label>
          <div class="chips">
            <label><input type="radio" name="topic" checked><span>Min beställning</span></label>
            <label><input type="radio" name="topic"><span>Större beställning</span></label>
            <label><input type="radio" name="topic"><span>Styckning</span></label>
            <label><input type="radio" name="topic"><span>Övrigt</span></label>
          </div></div>
        <div class="row" style="gap:16px;align-items:stretch">
          <div class="field"><label class="l" for="f-name">Namn</label><input class="in-f" id="f-name" placeholder="Ditt namn"></div>
          <div class="field"><label class="l" for="f-contact">Telefon eller e-post</label><input class="in-f" id="f-contact" placeholder="Så vi kan svara dig"></div>
        </div>
        <div class="col" style="gap:8px"><label class="l" for="f-msg">Meddelande</label><textarea id="f-msg" placeholder="Skriv ordernummer om det gäller en beställning"></textarea></div>
        <div class="row" style="justify-content:space-between">
          <span style="font:400 14px Inter;color:#707070">Vi använder bara dina uppgifter för att svara dig.</span>
          <button class="btn h56" type="submit" style="padding:0 28px">Skicka meddelande${ic('paper-plane-tilt', 18)}</button>
        </div>
        <div class="thanks" role="status">Tack! Ditt meddelande är skickat – vi hör av oss så snart vi kan.</div>
      </form>
    `, 'background:#F5F7FA'),
    footer(2382),
  ].join('\n');
  page('kontakta-oss.html', { title: 'Kontakta oss – Tamer Elsafadi Kött', key: 'kontakt', height: 3200, body });
}

home(); omOss(); kott(); erbjudanden(); butiken(); kontakta();
