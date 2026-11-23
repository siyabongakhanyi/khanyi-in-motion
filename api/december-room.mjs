import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

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
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'none'; script-src 'none'; object-src 'none'; upgrade-insecure-requests",
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
  </style></head><body><header class="top"><span class="word">PRIVATE / DECEMBER</span><small>${htmlEscape(label)} &nbsp; • &nbsp; RESTRICTED ACCESS</small></header>${inner}</body></html>`;
}
function login(error=false) {
  const body=`<main class="shell splash"><span class="eyebrow">Private review / access-controlled</span><h1>A space for<br><em>one conversation.</em></h1><p class="lead">A separate project room for the December opportunity. Not part of the public Khanyi in Motion experience.</p><form class="form" method="POST" action="${ROUTE}"><label for="pass">Private access code</label><input id="pass" name="pass" type="password" autocomplete="current-password" required autofocus maxlength="200" aria-describedby="help"><button class="button" type="submit">ENTER PRIVATE REVIEW</button><p id="help" class="${error?'error':''}">${error?'Access code not recognised. Try again.':'Access is reserved for people issued a private review code.'}</p></form><div class="strip"><span>RESTRICTED REVIEW / NO PUBLIC NAVIGATION</span><span>DECEMBER 2026</span></div></main>`;
  return frame(body,'ACCESS / PRIVATE');
}
function privateContent() {
  let obj={};
  try { obj=JSON.parse(process.env.OFFDESK_PRIVATE_CONTENT_JSON||'{}'); } catch { obj={}; }
  if(!obj||typeof obj!=='object'||Array.isArray(obj))obj={};
  const title=htmlEscape(obj.title||'December\nProject Room');
  const lines=title.split('\n').join('<br>');
  const subtitle=htmlEscape(obj.subtitle||'A dedicated space for the December collaboration, separate from the public portfolio.');
  const overview=htmlEscape(obj.overview||'The agreed December brief will appear here once its specific requirements and audience are confirmed.');
  const contribution=htmlEscape(obj.contribution||'A tailored proposal will describe the relevant creative, media, design or technical contribution, using only work and claims supported by the agreed brief.');
  const nextStep=htmlEscape(obj.nextStep||'Access recipients, availability and the review process will be confirmed before this private page is shared.');
  const content=`<main class="shell"><div class="intro"><div><span class="eyebrow">A private opportunity / 2026</span><h1>${lines}</h1><p class="lead">${subtitle}</p><p class="sublead">A focused, confidential presentation. Public brand chapters, photography galleries and unrelated projects are intentionally excluded.</p></div><div class="art" aria-hidden="true"><div class="folio">DEC / 001</div><div class="shape one"></div><div class="shape two"></div><div class="shape three"></div></div></div><div class="strip"><span>THE REVIEW / PRIVATE EDITION</span><span>DO NOT FORWARD WITHOUT PERMISSION</span></div><section class="grid" aria-label="Private proposal sections"><article class="module"><span class="num">01</span><h2>The brief</h2><p>${overview}</p></article><article class="module"><span class="num">02</span><h2>The contribution</h2><p>${contribution}</p></article><article class="module"><span class="num">03</span><h2>Next steps</h2><p>${nextStep}</p></article></section><div class="note"><span>PRIVATE REVIEW. NO PUBLIC INDEXING OR NAVIGATION.</span><form method="POST" action="${ROUTE}?logout=1"><button class="button" type="submit">SIGN OUT</button></form></div></main>`;
  return frame(content,'DECEMBER / PRIVATE PRESENTATION');
}
function unavailable() { return send('Not Found',404); } // fail closed until configured
export function GET(req) {
  const secret=sharedSecret();
  if(!secret || secret.length < 24) return unavailable();
  return send(hasValidSession(req,secret)?privateContent():login());
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