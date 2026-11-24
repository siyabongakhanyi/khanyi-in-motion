import { createHash, createHmac, randomBytes, timingSafeEqual, createDecipheriv } from 'node:crypto';
import media0 from '../private-media/media-1.mjs';
import media1 from '../private-media/media-2.mjs';
import media2 from '../private-media/media-3.mjs';
import media3 from '../private-media/media-4.mjs';
import media4 from '../private-media/media-5.mjs';
import media5 from '../private-media/media-6.mjs';
const encryptedPhotos = Object.freeze({setup:media0,guests:media1,occasion:media2,venue:media3,signage:media4,entrance:media5});

// The public GitHub repository intentionally contains NO client-specific brief,
// recipient addresses, passwords, or confidential attachments. Private content
// and access credentials are supplied through encrypted Vercel environment vars.
const ROUTE = '/private/december-room';
const COOKIE = '__Host-kfl_december';
const SESSION_SECONDS = 12 * 60 * 60;

function securityHeaders(type = 'text/html; charset=utf-8') {
  return {
    'Content-Type': type,
    'Cache-Control': 'private, no-store, no-cache, max-age=0, must-revalidate',
    'Pragma': 'no-cache',
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self'; script-src 'none'; object-src 'none'; upgrade-insecure-requests",
  };
}

function htmlEscape(value) {
  return String(value ?? '').replace(/[&<>\"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[ch]));
}
function sha(value) { return createHash('sha256').update(value).digest(); }
function safeEqual(a, b) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x,y);
}
function sharedSecret() { return process.env.OFFDESK_ACCESS_KEY || ''; }
function checkPassword(candidate, secret) {
  return typeof candidate === 'string' && candidate.length > 0 && candidate.length <= 200 &&
    safeEqual(sha(candidate), sha(secret));
}
function sign(value, secret) {
  const key = createHash('sha256').update(`session:v1:${secret}`).digest();
  return createHmac('sha256', key).update(value).digest('hex');
}
function makeCookie(secret) {
  const until = Math.floor(Date.now()/1000) + SESSION_SECONDS;
  const payload = `${until}.${randomBytes(16).toString('hex')}`;
  return `${payload}.${sign(payload, secret)}`;
}
function getCookies(req) {
  const raw = req.headers.get('cookie') || '';
  const candidate = raw.split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE}=`));
  return candidate?.slice(COOKIE.length + 1) || '';
}
function hasValidSession(req, secret) {
  const token = getCookies(req);
  const m = /^(\d{10,12})\.([a-f0-9]{32})\.([a-f0-9]{64})$/.exec(token);
  if(!m) return false;
  const expires=Number(m[1]);
  if(!Number.isSafeInteger(expires) || expires <= Date.now()/1000 || expires > Date.now()/1000 + SESSION_SECONDS) return false;
  const payload = `${m[1]}.${m[2]}`;
  return safeEqual(Buffer.from(m[3],'hex'),Buffer.from(sign(payload, secret),'hex'));
}
function send(markup, status=200, extra={}) {
  return new Response(markup,{status,headers:{...securityHeaders(),...extra}});
}
function frame(inner, label='PRIVATE PROJECT ROOM') {
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="theme-color" content="#e9e5df"><title>Private December Review</title><style>
  :root{--ink:#1d2425;--paper:#e9e5df;--muted:#6b706d;--cream:#faf8f3;--line:#bdbeb8;--accent:#69776b;--coral:#a17768}
  *{box-sizing:border-box}body{margin:0;min-height:100svh;background:var(--paper);color:var(--ink);font-family:Arial,Helvetica,sans-serif;line-height:1.5}a{color:inherit}button,input{font:inherit}
  .top{height:74px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 clamp(22px,5vw,80px);gap:15px}
  .word{font-size:12px;font-weight:750;letter-spacing:.18em}.top small{font-size:9px;letter-spacing:.14em;color:var(--muted)}
  .shell{max-width:1440px;margin:auto;padding:clamp(26px,5vw,78px)}.eyebrow{font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--muted)}
  .intro{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(34px,6vw,104px);align-items:center;min-height:560px}
  h1,h2,h3,p{margin:0}h1{font:normal clamp(70px,11vw,170px)/.84 Georgia,serif;letter-spacing:-.077em;margin:25px 0 35px}
  h1 em{font-weight:normal;color:var(--accent)}.lead{font:clamp(22px,2.45vw,35px)/1.27 Georgia,serif;max-width:670px}.sublead{font-size:14px;color:var(--muted);max-width:560px;margin-top:22px}
  .art{position:relative;min-height:530px;background:var(--accent);overflow:hidden;border:14px solid var(--cream);outline:1px solid var(--line)}
  .art:before{content:"";position:absolute;inset:20px;border:1px solid #d8dbd3;opacity:.7}.art:after{content:"CONFIDENTIAL / 2026";position:absolute;bottom:36px;left:36px;color:#f9f5ed;font-size:10px;letter-spacing:.2em}
  .shape{position:absolute;border:1px solid rgba(255,255,255,.66)}.shape.one{width:85%;height:85%;left:26%;top:-19%;border-radius:50%;transform:rotate(17deg)}.shape.two{width:47%;height:65%;left:9%;top:18%;background:rgba(230,229,216,.15);transform:rotate(-11deg)}.shape.three{width:56%;height:24%;left:32%;top:54%;transform:rotate(10deg);border-color:#e9e5d8}
  .folio{position:absolute;top:33px;left:33px;color:#f9f5ed;font-size:12px;letter-spacing:.2em}.strip{margin-top:48px;padding-top:14px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:20px;font-size:10px;font-weight:700;letter-spacing:.14em}
  .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:60px}.module{border-top:1px solid var(--ink);padding-top:24px;min-height:250px}.num{font:italic 42px/.9 Georgia,serif;color:var(--accent)}h2{font:normal 32px/1.1 Georgia,serif;letter-spacing:-.04em;margin:23px 0 17px}.module p{font-size:14px;color:var(--muted);line-height:1.7}
  .note{border-top:1px solid var(--line);padding:36px 0;display:flex;align-items:center;justify-content:space-between;gap:22px;margin-top:46px;font-size:12px;color:var(--muted)}
  .button{display:inline-flex;align-items:center;justify-content:center;background:var(--ink);border:1px solid var(--ink);min-height:48px;color:#fff;padding:12px 22px;cursor:pointer;text-decoration:none;font-size:11px;letter-spacing:.12em;font-weight:700}
  .button:hover{background:#31403c}.form{margin-top:35px;max-width:520px}.form label{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px;font-weight:700}
  .form input{width:100%;padding:17px 18px;background:var(--cream);border:1px solid var(--line);border-radius:0;font-size:17px}.form button{width:100%;margin-top:13px}.form p{font-size:13px;color:var(--muted);margin-top:18px}
  .error{color:#973f42!important}.splash{max-width:1050px;margin:auto}.splash h1{font-size:clamp(61px,9vw,130px)}
  :focus-visible{outline:3px solid var(--coral);outline-offset:4px}
  @media(max-width:800px){.intro{grid-template-columns:1fr;gap:35px}.art{min-height:340px}.grid{grid-template-columns:1fr}.module{min-height:0}.strip{flex-direction:column}.note{align-items:start;flex-direction:column}.top small{display:none}.shell{padding:26px}}

  /* Recipient-only editorial application. No external assets or fonts. */
  .application{--thingy:#9f8050;--cream2:#f2ede3;--night:#202323;--paper2:#fffdf8}
  .application .eyebrow{letter-spacing:.14em}
  .application .app-hero{position:relative;padding:clamp(42px,6vw,82px) 0 clamp(32px,5vw,64px);border-bottom:1px solid var(--line);display:grid;grid-template-columns:minmax(0,1.15fr) minmax(275px,.85fr);align-items:stretch;gap:clamp(30px,5vw,86px)}
  .application .app-hero-left{display:flex;flex-direction:column;justify-content:space-between;gap:36px}
  .application .app-topline{display:flex;gap:12px;align-items:center;font-size:10px;font-weight:750;letter-spacing:.12em;text-transform:uppercase;color:#75644d}
  .application .app-topline:before{content:"";width:28px;height:1px;background:var(--thingy)}
  .application h1{font-size:clamp(68px,9.1vw,142px);line-height:.86;letter-spacing:-.086em;margin:0;max-width:980px}
  .application h1 em{font-style:italic;color:var(--thingy)}
  .application .app-hero-lead{font:clamp(22px,2.4vw,34px)/1.28 Georgia,serif;max-width:760px;letter-spacing:-.028em}
  .application .app-hero-bottom{display:flex;flex-wrap:wrap;gap:9px}
  .application .app-pill{font-size:10px;font-weight:750;letter-spacing:.07em;padding:11px 14px;border:1px solid #aaa69c;background:var(--cream);text-transform:uppercase}
  .application .app-aside{position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;min-height:550px;background:var(--night);color:#f5efe5;padding:clamp(28px,4vw,56px);isolation:isolate}
  .application .app-aside:after{content:"";position:absolute;border:1px solid rgba(245,239,229,.46);width:95%;aspect-ratio:1;border-radius:50%;right:-48%;top:6%;z-index:-1}
  .application .app-aside:before{content:"";position:absolute;border:1px solid rgba(245,239,229,.28);width:75%;aspect-ratio:1;border-radius:50%;right:-31%;top:19%;z-index:-1}
  .application .app-aside-top{display:flex;justify-content:space-between;gap:20px;align-items:center;border-bottom:1px solid #76746d;padding-bottom:22px;font-size:10px;letter-spacing:.15em}
  .application .app-aside-names{margin:30px 0}
  .application .app-aside-names strong{display:block;font:normal clamp(46px,5vw,80px)/.96 Georgia,serif;letter-spacing:-.065em}
  .application .app-aside-names span{display:block;font-size:13px;line-height:1.8;color:#d1c7b7;margin-top:22px;max-width:350px}
  .application .app-aside-foot{border-top:1px solid #777268;padding-top:19px;display:flex;align-items:end;justify-content:space-between;gap:15px;font-size:11px;letter-spacing:.1em}
  .application .app-aside-foot b{font-size:11px;font-weight:700;color:#dbcca8}
  .application .app-ribbon{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-bottom:1px solid var(--line);margin:0 0 42px}
  .application .app-ribbon>div{padding:20px 13px;border-right:1px solid var(--line);display:grid;gap:7px}
  .application .app-ribbon>div:last-child{border-right:0}
  .application .app-ribbon span{font-size:9px;color:#71706b;letter-spacing:.14em;text-transform:uppercase;font-weight:750}
  .application .app-ribbon strong{font-size:13px;font-weight:650;line-height:1.45}
  .application .app-section{padding:clamp(48px,6vw,91px) 0;border-bottom:1px solid var(--line)}
  .application .app-section-head{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);align-items:start;gap:clamp(24px,6vw,90px)}
  .application .app-section h2{font:normal clamp(42px,5.7vw,85px)/.96 Georgia,serif;letter-spacing:-.06em;margin:17px 0 0;max-width:670px}
  .application .app-section-text{font:clamp(21px,2.1vw,30px)/1.35 Georgia,serif;letter-spacing:-.022em;max-width:820px}
  .application .app-section-text p+p{margin-top:17px}
  .application .app-local-note{margin-top:32px;background:var(--cream);border:1px solid var(--line);padding:19px clamp(18px,3vw,40px);display:flex;gap:18px;align-items:start}
  .application .app-local-note b{color:var(--thingy);font:italic 39px/.9 Georgia,serif}
  .application .app-local-note p{font-size:14px;line-height:1.75}
  .application .app-values-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:29px}
  .application .app-values-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px}
  .application .app-value{border:1px solid #bdb9ae;background:var(--cream);padding:clamp(22px,2.7vw,34px);min-height:268px;display:flex;flex-direction:column;gap:22px}
  .application .app-value-no{font:italic 39px/.9 Georgia,serif;color:var(--thingy)}
  .application .app-value h3{font:normal clamp(23px,2.4vw,31px)/1.12 Georgia,serif;letter-spacing:-.035em}
  .application .app-value p{color:#535750;font-size:14px;line-height:1.75}
  .application .app-value:nth-child(4),.application .app-value:nth-child(5){grid-column:span 1}
  .application .app-checks{display:grid;grid-template-columns:1fr 1fr;gap:0 clamp(26px,5vw,80px);margin-top:31px;border-top:1px solid var(--line)}
  .application .app-check{display:grid;grid-template-columns:27px 1fr;gap:13px;align-items:start;padding:21px 0;border-bottom:1px solid var(--line);font-size:15px;line-height:1.7}
  .application .app-check span{width:24px;height:24px;border:1px solid #96836a;display:grid;place-items:center;font-size:12px;color:#796345}
  .application .app-strip{display:grid;grid-template-columns:1.1fr .9fr;gap:25px;margin-top:32px}
  .application .app-strip>div{background:#e1d9cb;border-left:3px solid var(--thingy);padding:clamp(25px,3vw,43px)}
  .application .app-strip strong{font:normal clamp(27px,2.8vw,42px)/1.12 Georgia,serif;letter-spacing:-.04em}
  .application .app-strip p{font-size:14px;line-height:1.8;margin-top:20px}
  .application .app-personal{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;margin-top:32px}
  .application .app-personal article{padding:25px 18px;background:#ded8cc;border:1px solid #c1beb4}
  .application .app-personal h3{font:normal 25px/1.12 Georgia,serif;margin-bottom:15px}
  .application .app-personal p{font-size:13px;line-height:1.7;color:#5d5c56}
  .application .app-reply{display:flex;align-items:center;gap:20px;flex-wrap:wrap;background:var(--night);color:#f8f1e5;padding:clamp(25px,4vw,51px);margin-top:37px}
  .application .app-reply .date{color:#d8bb8f;font-size:10px;letter-spacing:.15em;flex:0 0 auto}
  .application .app-reply blockquote{margin:0;font:clamp(20px,2.25vw,29px)/1.3 Georgia,serif}
  .application .app-reply span{font-size:11px;letter-spacing:.12em;color:#c9c3b7}
  .application .app-contact{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(30px,6vw,92px);align-items:end;padding-bottom:70px}
  .application .app-contact h2{font-size:clamp(54px,7vw,106px);margin:18px 0 20px}
  .application .app-contact .app-contact-lead{font:clamp(21px,2vw,30px)/1.35 Georgia,serif;margin:16px 0 22px}
  .application .app-contact-grid{display:grid;gap:18px}
  .application .app-contact-item{border-bottom:1px solid #bdb6ac;padding-bottom:14px}
  .application .app-contact-item small{display:block;text-transform:uppercase;letter-spacing:.14em;color:#79756f;margin-bottom:5px;font-size:10px;font-weight:700}
  .application .app-contact-item a,.application .app-contact-item span{font-size:15px;font-weight:700;overflow-wrap:anywhere;text-decoration-thickness:1px;text-underline-offset:4px}
  .application .app-buttons{display:flex;gap:9px;flex-wrap:wrap;margin-top:25px}
  .application .app-buttons .button{background:var(--night);color:white}.application .app-buttons .button.alt{background:transparent;color:var(--night)}
  .application .app-bottom{border-top:1px solid var(--line);padding:22px 0;display:flex;justify-content:space-between;align-items:center;gap:22px;color:#6f716d;font-size:11px}
  .application .app-bottom form{flex:none}.application .app-bottom .button{min-height:38px;padding:10px 15px}
  @media(max-width:900px){.application .app-hero{grid-template-columns:1fr}.application .app-aside{min-height:320px}.application .app-ribbon{grid-template-columns:repeat(2,1fr)}.application .app-ribbon>div:nth-child(2){border-right:0}.application .app-values-grid{grid-template-columns:repeat(2,1fr)}.application .app-personal{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:600px){.application .app-hero{padding:35px 0}.application h1{font-size:clamp(61px,14vw,92px)}.application .app-aside{padding:24px;min-height:325px}.application .app-aside-names strong{font-size:48px}.application .app-section-head,.application .app-contact{grid-template-columns:1fr;gap:23px}.application .app-section h2{font-size:50px}.application .app-section-text{font-size:23px}.application .app-values-grid,.application .app-checks,.application .app-strip{grid-template-columns:1fr}.application .app-value{min-height:0}.application .app-personal{grid-template-columns:1fr 1fr}.application .app-personal h3{font-size:20px}.application .app-reply{align-items:start;flex-direction:column}.application .app-bottom{flex-direction:column;align-items:start}.application .app-ribbon strong{font-size:12px}}

  .application .case-gallery{margin-top:36px}.application .case-gallery header{margin:0 0 18px}.application .case-gallery h3{font:normal clamp(28px,4vw,46px)/1.1 Georgia,serif;margin:10px 0}.application .case-photo-grid{display:flex;gap:14px;align-items:flex-start}.application .case-photo{margin:0;min-width:0;flex:1}.application .case-photo.wide{flex:2.25}.application .case-photo img{width:100%;height:auto;display:block;background:#ded8cc;object-fit:contain;image-orientation:from-image}.application .case-photo figcaption{font-size:12px;color:#535750;line-height:1.55;padding:12px 0;border-bottom:1px solid var(--line)}@media(max-width:600px){.application .case-photo-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.application .case-photo.wide{grid-column:1/-1}}

  .application .retail-proof{margin:30px 0;padding:clamp(20px,3vw,40px);border:1px solid var(--line);background:var(--cream)}.application .retail-proof-top{display:grid;grid-template-columns:1.5fr .8fr .8fr;gap:20px;align-items:end;padding-bottom:22px;border-bottom:1px solid var(--line)}.application .retail-proof h3{font:normal clamp(24px,3vw,42px)/1.1 Georgia,serif;margin:9px 0}.application .retail-proof p{font-size:13px;line-height:1.65}.application .retail-stat{display:flex;flex-direction:column;gap:8px}.application .retail-stat strong{font:normal clamp(36px,5vw,68px)/1 Georgia,serif;color:#725a37;font-variant-numeric:tabular-nums}.application .retail-stat span{font-size:11px;font-weight:700;line-height:1.4}.application .retail-scope{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px 24px;margin:24px 0}.application .retail-scope-row{display:grid;grid-template-columns:1fr auto;gap:8px;font-size:13px;align-items:end}.application .retail-meter{grid-column:1/-1;height:5px;background:#d4cfc4;overflow:hidden}.application .retail-meter i{display:block;height:100%;background:#8d7652}.application .retail-source{color:#555950;border-top:1px solid var(--line);padding-top:15px}.application a.app-pill{text-decoration:none}.application a.app-pill:hover{text-decoration:underline}@media(max-width:600px){.application .retail-proof-top{grid-template-columns:1fr 1fr}.application .retail-proof-top>div:first-child{grid-column:1/-1}.application .retail-scope{grid-template-columns:1fr}}
  @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation:none!important;transition:none!important}}
  </style></head><body><header class="top"><span class="word">PRIVATE / DECEMBER</span><small>${htmlEscape(label)} &nbsp; • &nbsp; RESTRICTED ACCESS</small></header>${inner}</body></html>`;
}
function login(error=false) {
  const body=`<main class="shell splash"><span class="eyebrow">Private review / access-controlled</span><h1>A space for<br><em>one conversation.</em></h1><p class="lead">A separate project room for the December opportunity. Not part of the public Khanyi in Motion experience.</p><form class="form" method="POST" action="${ROUTE}"><label for="pass">Private access code</label><input id="pass" name="pass" type="password" autocomplete="current-password" required autofocus maxlength="200" aria-describedby="help"><button class="button" type="submit">ENTER PRIVATE REVIEW</button><p id="help" class="${error?'error':''}">${error?'Access code not recognised. Try again.':'Access is reserved for people issued a private review code.'}</p></form><div class="strip"><span>RESTRICTED REVIEW / NO PUBLIC NAVIGATION</span><span>DECEMBER 2026</span></div></main>`;
  return frame(body,'ACCESS / PRIVATE');
}

function getGalleryConfig() {
  try { return JSON.parse(process.env.OFFDESK_PRIVATE_GALLERY_JSON || '{}') || {}; } catch { return {}; }
}
function serveGalleryPhoto(id) {
  if (!Object.hasOwn(encryptedPhotos,id)) return unavailable();
  try {
    const key = Buffer.from(getGalleryConfig().key || '', 'base64');
    if (key.length !== 32) return unavailable();
    const b = Buffer.from(encryptedPhotos[id], 'base64');
    const decipher = createDecipheriv('chacha20-poly1305',key,b.subarray(0,12),{authTagLength:16});
    decipher.setAuthTag(b.subarray(-16));
    const photo = Buffer.concat([decipher.update(b.subarray(12,-16)),decipher.final()]);
    if (photo[0] !== 255 || photo[1] !== 216) return unavailable();
    return new Response(photo,{status:200,headers:securityHeaders('image/jpeg')});
  } catch { return unavailable(); }
}
function privateContent() {
  let data = {};
  try { data = JSON.parse(process.env.OFFDESK_PRIVATE_CONTENT_JSON || '{}'); }
  catch { data = {}; }
  if(!data || typeof data !== 'object' || Array.isArray(data)) data = {};
  // If the content has not been configured, do not disclose a generic application.
  if(data.kind !== 'seasonal_retail_application' || !data.applicant || !data.company) {
    return frame('<main class="shell splash"><span class="eyebrow">Private review</span><h1>Content in<br><em>preparation.</em></h1><p class="lead">The application is not yet configured.</p></main>', 'DECEMBER / PRIVATE');
  }
  const e=htmlEscape;
  const arr=value=>Array.isArray(value)?value:[];
  function url(raw, kind='https') {
    try {
      const u=new URL(String(raw||''));
      return u.protocol===(kind+':') ? e(u.href) : '#';
    } catch { return '#'; }
  }
  const company=e(data.company), applicant=e(data.applicant);
  let retail = {};
  try { retail = JSON.parse(process.env.OFFDESK_PRIVATE_RETAIL_EVIDENCE_JSON || '{}') || {}; } catch { retail = {}; }
  let operations = {};
  try { operations = JSON.parse(process.env.OFFDESK_PRIVATE_OPERATIONS_JSON || '{}') || {}; } catch { operations = {}; }
  const operationalEvidence = arr(operations.operations).length ? `<div class="retail-proof"><span class="eyebrow">Operational &amp; technical experience</span><h3>Behind the customer experience.</h3><div class="app-personal">${arr(operations.operations).map(x=>`<article><h3>${e(x.title)}</h3><p>${e(x.text)}</p></article>`).join('')}</div><p class="retail-source" style="margin-top:24px">${e(operations.operationNote)}</p></div>` : '';
  const values=arr(operations.strengths || retail.strengths || data.strengths).map((x,i)=>`<article class="app-value"><div class="app-value-no">0${i+1}</div><h3>${e(x.title)}</h3><p>${e(x.text)}</p></article>`).join('');
  const promises=arr(operations.onShift || retail.onShift || data.onShift).map((x,i)=>`<div class="app-check"><span aria-hidden="true">${i+1}</span><p>${e(x)}</p></div>`).join('');
  const interests=arr(data.outside).map(x=>`<article><h3>${e(x.title)}</h3><p>${e(x.text)}</p></article>`).join('');
  let caseData = {};
  try { caseData = JSON.parse(process.env.OFFDESK_PRIVATE_CASE_JSON || '{}') || {}; } catch { caseData = {}; }
  const retailScope = retail.scope && Array.isArray(retail.scope) ? `<div class="retail-proof"><div class="retail-proof-top"><div><span class="eyebrow">Documented engagement / May 2024</span><h3>Social Blend at Nineteen45.</h3><p>Joint client work with my partner. Evidence of scope, not individual hours.</p></div><div class="retail-stat"><strong>${e(retail.hours)}</strong><span>Combined service hours</span></div><div class="retail-stat"><strong>${e(retail.categories)}</strong><span>Service categories</span></div></div><div class="retail-scope">${retail.scope.map(x=>`<div class="retail-scope-row"><span>${e(x.title)}</span><strong>${e(x.hours)}h</strong><div class="retail-meter" aria-hidden="true"><i style="width:${Math.max(0,Math.min(100,Number(x.hours)*10))}%"></i></div></div>`).join('')}</div><p class="retail-source">${e(retail.source)}</p></div>` : '';
  const galleryConfig = getGalleryConfig();
  const galleryGroup = i => {
    const g = arr(galleryConfig.groups)[i];
    if (!g) return '';
    const figures = arr(g.photos).filter(p=>Object.hasOwn(encryptedPhotos,p.id)).map(p => `<figure class="case-photo ${p.w>p.h?'wide':'tall'}"><img src="${ROUTE}?photo=${encodeURIComponent(p.id)}" width="${Number(p.w)}" height="${Number(p.h)}" alt="${e(p.alt)}" loading="lazy" decoding="async"><figcaption>${e(p.caption)}</figcaption></figure>`).join('');
    return figures ? `<div class="case-gallery"><header><span class="eyebrow">${e(g.description)}</span><h3>${e(g.name)}</h3></header><div class="case-photo-grid">${figures}</div></div>` : '';
  };
  let supportingData = {};
  try { supportingData = JSON.parse(process.env.OFFDESK_PRIVATE_SUPPORTING_CASE_JSON || '{}') || {}; } catch { supportingData = {}; }
  const supportingSection = supportingData.title && supportingData.url ? `<article class="app-section" style="padding:32px 0 0;margin-top:32px;border-top:1px solid var(--line);border-bottom:0" aria-labelledby="supporting-h"><div class="app-section-head"><div><span class="eyebrow">Additional experience / Media archive</span><h3 id="supporting-h" style="font:normal clamp(30px,4vw,58px)/1.1 Georgia,serif;margin:12px 0">${e(supportingData.title)}</h3></div><div><p class="sublead">${e(galleryConfig.support || supportingData.intro)}</p><div class="app-buttons"><a class="button alt" href="${url(supportingData.url)}" target="_blank" rel="noopener noreferrer">VIEW PROJECT ARCHIVE ↗</a></div></div></div><div class="app-ribbon" style="grid-template-columns:repeat(3,minmax(0,1fr));margin:22px 0 0;border-top:1px solid var(--line)">${arr(supportingData.counts).map(x=>`<div><span>${e(x.label)}</span><strong style="font-size:clamp(23px,3vw,36px);font-variant-numeric:tabular-nums">${e(x.value)}</strong></div>`).join('')}</div>${galleryGroup(1)}</article>` : '';
  const caseSection = caseData.title && caseData.event ? `<section class="app-section" id="client-experience" aria-labelledby="case-h"><div class="app-section-head"><div><span class="eyebrow">02 / Proven experience</span><h2 id="case-h">${e(caseData.title)}.<br>People first.</h2><p class="sublead">${e(caseData.event)} · ${e(caseData.date)} · ${e(caseData.location)}</p></div><div class="app-section-text"><p>${e(operations.caseIntro || galleryConfig.intro || caseData.intro)}</p><p>${e(operations.caseRelevance || caseData.relevance)}</p></div></div><div class="app-local-note"><div><span class="eyebrow">COLLABORATION / CREDIT</span><p>${e(galleryConfig.credit || '')}</p></div></div><div class="app-personal">${arr(caseData.areas).map(x=>`<article><h3>${e(x.title)}</h3><p>${e(x.text)}</p></article>`).join('')}</div>${operationalEvidence}${retailScope}${galleryGroup(0)}<div class="app-buttons"><a class="button" href="${url(caseData.gallery)}" target="_blank" rel="noopener noreferrer">VIEW EVENT PHOTOGRAPHY ↗</a><a class="button alt" href="${url(caseData.video)}" target="_blank" rel="noopener noreferrer">VIEW VIDEO ARCHIVE ↗</a></div><p class="sublead">Original event media. Google Drive access permissions apply.</p>${supportingSection}</section>` : '';
  const body=`<main class="shell application" id="main"><section class="app-hero" aria-labelledby="app-title"><div class="app-hero-left"><div class="app-topline">A private seasonal application / ${company}</div><div><h1 id="app-title">Off the desk.<br><em>On the floor.</em></h1><p class="app-hero-lead">${e(operations.hero || retail.hero || data.heroLine)}</p></div><div class="app-hero-bottom"><span class="app-pill">${e(data.availability)}</span><span class="app-pill">Weekends + late shifts</span><span class="app-pill">Bedfordview local</span><a class="app-pill" href="#client-experience">SEE MY EXPERIENCE ↓</a></div></div><div class="app-aside" aria-label="Applicant introduction"><div class="app-aside-top"><span>PRIVATE PROFILE / 01</span><span>DEC '26</span></div><div class="app-aside-names"><strong>${applicant.split(' ').join('<br>')}</strong><span>${e(data.headline)}</span></div><div class="app-aside-foot"><span>CUSTOMER EXPERIENCE<br>OPERATIONS + TECHNOLOGY</span><b>READY TO LEARN</b></div></div></section>
<div class="app-ribbon"><div><span>Applicant</span><strong>${applicant}</strong></div><div><span>Where</span><strong>${e(data.location)}</strong></div><div><span>Availability</span><strong>${e(data.availability)}</strong></div><div><span>Shift preference</span><strong>${e(data.shifts)}</strong></div></div>
<section class="app-section" id="story" aria-labelledby="story-h"><div class="app-section-head"><div><span class="eyebrow">01 / The person</span><h2 id="story-h">Why I want<br>to join.</h2></div><div class="app-section-text"><p>${e(operations.about || retail.about || data.about)}</p><p>${e(operations.intention || retail.intention || data.intention)}</p></div></div><div class="app-local-note"><b>↗</b><p>${e(retail.why || data.whyCompany)}</p></div></section>
${caseSection}
<section class="app-section" id="value" aria-labelledby="value-h"><div class="app-values-head"><div><span class="eyebrow">03 / What I bring</span><h2 id="value-h">What I bring<br>to your team.</h2></div><span class="eyebrow">${arr(operations.strengths || retail.strengths || data.strengths).length} strengths / One team</span></div><div class="app-values-grid">${values}</div></section>
<section class="app-section" id="shift" aria-labelledby="shift-h"><div class="app-section-head"><div><span class="eyebrow">04 / My approach</span><h2 id="shift-h">How I'll<br>show up.</h2></div><div class="app-section-text"><p>${e(retail.shift || data.shiftIntro)}</p></div></div><div class="app-checks">${promises}</div><div class="app-strip"><div><strong>I don't expect a shortcut.</strong><p>${e(operations.humility || retail.humility || data.humility)}</p></div><div><strong>Every shift counts.</strong><p>${e(retail.close || data.closingValue)}</p></div></div></section>
<section class="app-section" id="beyond" aria-labelledby="beyond-h"><span class="eyebrow">05 / Beyond the job title</span><h2 id="beyond-h">More than<br>a consultant.</h2><div class="app-personal">${interests}</div><div class="app-local-note"><b>↗</b><p>${e(data.professionalBackground)}</p></div></section>
<section class="app-section" id="reply" aria-labelledby="reply-h"><span class="eyebrow">06 / Our conversation</span><h2 id="reply-h">The next<br>conversation.</h2><div class="app-reply"><span class="date">${e(data.replyDate)}</span><blockquote>“${e(data.reply)}”</blockquote><span>${company} / Instagram reply</span></div><p class="sublead">${e(data.followup)}</p></section>
<section class="app-section app-contact" id="contact" aria-labelledby="contact-h"><div><span class="eyebrow">07 / Connect directly</span><h2 id="contact-h">Let's make<br>December count.</h2><p class="app-contact-lead">${e(retail.cta || data.whyApplying)}</p><p class="sublead">${e(data.availability)}. ${e(data.shifts)}.</p><div class="app-buttons"><a class="button" href="mailto:${e(data.email)}?subject=${encodeURIComponent('December seasonal application - '+data.applicant)}">EMAIL SIYABONGA</a><a class="button alt" href="tel:${e(data.phone.replace(/\s+/g,''))}">CALL DIRECTLY</a></div></div><div class="app-contact-grid"><div class="app-contact-item"><small>Email</small><a href="mailto:${e(data.email)}">${e(data.email)}</a></div><div class="app-contact-item"><small>Telephone</small><a href="tel:${e(data.phone.replace(/\s+/g,''))}">${e(data.phone)}</a></div><div class="app-contact-item"><small>LinkedIn</small><a href="${url(data.linkedin)}" target="_blank" rel="noopener noreferrer">Professional background ↗</a></div><div class="app-contact-item"><small>Instagram</small><a href="${url(data.instagram)}" target="_blank" rel="noopener noreferrer">@${e(data.instagramHandle)} ↗</a></div><div class="app-contact-item"><small>Base</small><span>${e(data.location)}</span></div></div></section><div class="app-bottom"><span>PRIVATE APPLICATION / ${company} &nbsp; · &nbsp; PREPARED BY ${applicant}<br>Not affiliated with or endorsed by the recipient organisation.</span><form method="POST" action="${ROUTE}?logout=1"><button class="button" type="submit">SIGN OUT</button></form></div></main>`;
  return frame(body,'SEASONAL APPLICATION / PRIVATE');
}

function unavailable() { return send('Not Found',404); } // fail closed until configured
export function GET(req) {
  const secret=sharedSecret();
  if(!secret || secret.length < 24) return unavailable();
  const valid=hasValidSession(req,secret);
  const photo=new URL(req.url).searchParams.get('photo');
  if(photo!==null) return valid?serveGalleryPhoto(photo):unavailable();
  return send(valid?privateContent():login());
}
export async function POST(req) {
  const secret=sharedSecret();
  if(!secret || secret.length < 24) return unavailable();
  if(new URL(req.url).searchParams.get('logout')==='1') {
    return new Response(null,{status:303,headers:{...securityHeaders(),'Location':ROUTE,'Set-Cookie':`${COOKIE}=; Path=/; Max-Age=0; Secure; HttpOnly; SameSite=Strict`}});
  }
  const type=req.headers.get('content-type')||'';
  if(!type.startsWith('application/x-www-form-urlencoded'))return send('Unsupported Media Type',415);
  const data=await req.text();
  if(data.length>1024)return send(login(true),413);
  const password=new URLSearchParams(data).get('pass')||'';
  if(!checkPassword(password,secret))return send(login(true),401);
  const token=makeCookie(secret);
  return new Response(null,{status:303,headers:{...securityHeaders(),'Location':ROUTE,'Set-Cookie':`${COOKIE}=${token}; Path=/; Max-Age=${SESSION_SECONDS}; Secure; HttpOnly; SameSite=Strict`}});
}