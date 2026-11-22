#!/usr/bin/env python3
"""One-time, repeat-safe Khanyi in Motion home performance and brand discovery repair.
Uses the exact original embedded WebP bytes; never creates synthetic photography.
"""
from pathlib import Path
import base64
import re

ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "index.html"
HTML = HOME.read_text(encoding="utf-8")
original_size = len(HTML.encode("utf-8"))

names = [
    "world-worn.webp",
    "world-built.webp",
    "world-moved.webp",
    "world-lived.webp",
    "creator-portrait.webp",
]
pattern = re.compile(r"data:image/webp;base64,([A-Za-z0-9+/=]+)")
matches = list(pattern.finditer(HTML))
if len(matches) not in (0, len(names)):
    raise SystemExit(f"Expected zero or exactly five embedded original WebPs; found {len(matches)}. No changes made.")

if matches:
    out_dir = ROOT / "assets" / "home"
    out_dir.mkdir(parents=True, exist_ok=True)
    sizes = []
    for filename, match in zip(names, matches):
        raw = base64.b64decode(match.group(1), validate=True)
        if not (raw[:4] == b"RIFF" and raw[8:12] == b"WEBP") or len(raw) < 1000:
            raise SystemExit(f"Invalid original WebP for {filename}.")
        (out_dir / filename).write_bytes(raw)
        sizes.append(len(raw))
    iterator = iter(names)
    def externalise(match):
        return "/assets/home/" + next(iterator)
    HTML = pattern.sub(externalise, HTML)
    print("Extracted exactly five untouched original WebP images:", sizes)
else:
    print("No embedded WebPs remain; using existing separate media assets.")

for filename in names[1:]:
    src = f'src="/assets/home/{filename}"'
    if src in HTML and not re.search(re.escape(src) + r'[^>]*\\bloading=', HTML):
        HTML = HTML.replace(src, src + ' loading="lazy" decoding="async"')
first = f'src="/assets/home/{names[0]}"'
if first in HTML and not re.search(re.escape(first) + r'[^>]*\\bdecoding=',HTML):
    HTML = HTML.replace(first, first + ' decoding="async"')
if "assets/home/world-worn.webp" not in HTML:
    raise SystemExit("Missing the first real image after extraction.")

if 'property="og:image"' not in HTML:
    meta = (
        '  <link rel="canonical" href="https://khanyi-in-motion.vercel.app/" />\\n'
        '  <meta name="robots" content="index,follow,max-image-preview:large" />\\n'
        '  <meta property="og:url" content="https://khanyi-in-motion.vercel.app/" />\\n'
        '  <meta property="og:image" content="https://khanyi-in-motion.vercel.app/assets/home/world-worn.webp" />\\n'
        '  <meta property="og:image:alt" content="Siya Khanyi wearing an original blue outfit and cap" />\\n'
        '  <meta name="twitter:card" content="summary_large_image" />\\n'
        '  <meta name="twitter:title" content="Khanyi in Motion — Siya Khanyi" />\\n'
        '  <meta name="twitter:description" content="Style, systems, strength and stories. Original creative work by Siya Khanyi." />\\n'
        '  <meta name="twitter:image" content="https://khanyi-in-motion.vercel.app/assets/home/world-worn.webp" />\\n'
    )
    target = '  <link rel="icon" '
    if target not in HTML:
        raise SystemExit("Missing icon metadata insertion point.")
    HTML = HTML.replace(target, meta + target, 1)

nav_marker = '      <a href="#about">About</a>'
if 'href="/for-brands.html"' not in HTML:
    if nav_marker not in HTML:
        raise SystemExit("Missing nav insertion point.")
    HTML = HTML.replace(nav_marker, '      <a href="/for-brands.html">For brands</a>\\n' + nav_marker, 1)

collab_marker = "If there's a story to tell or an idea to explore, let's talk.</p>"
if 'class="kim-partner-start"' not in HTML:
    if collab_marker not in HTML:
        raise SystemExit("Missing existing collaboration section.")
    HTML = HTML.replace(
        collab_marker,
        collab_marker +
        '\\n      <a class="kim-partner-start" href="/for-brands.html">'
        'FOR BRANDS — EXPLORE MY WORK AND CAPABILITIES'
        ' <svg class="line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" aria-hidden="true">'
        '<path d="M7 17 17 7M7 7h10v10"/></svg></a>',
        1
    )

css_marker = "/* KIM_HOME_REPAIR_V1 */"
if css_marker not in HTML:
    css = """
/* KIM_HOME_REPAIR_V1: contrast + direct partner discovery; retain original system. */
#about > .section-head > span{color:#30302d!important}
.kin-action-label,.kin-minilabel{color:#35352f!important}
#the-world .kim-world-option > span{color:#e2e7f3!important}
.kim-partner-start{display:inline-flex;align-items:center;justify-content:space-between;gap:14px;max-width:100%;min-height:46px;margin:8px 0 22px;padding:11px 15px;border:1px solid currentColor;font-size:11px;font-weight:850;letter-spacing:.07em;color:inherit;text-decoration:none}
.kim-partner-start svg{width:18px;height:18px;flex:none}
.kim-partner-start:hover{background:#cfddf7;color:#0f2655}
.kim-partner-start:focus-visible{outline:3px solid #e8793d;outline-offset:4px}
@media(max-width:560px){.kim-partner-start{width:100%;font-size:10px;letter-spacing:.045em;padding:12px}}
"""
    if "</style>" not in HTML:
        raise SystemExit("Missing closing CSS tag.")
    HTML = HTML.replace("</style>", css + "</style>", 1)

HOME.write_text(HTML,encoding="utf-8")

sitemap = ROOT / "sitemap.xml"
sm = sitemap.read_text(encoding="utf-8")
brand = 'https://khanyi-in-motion.vercel.app/for-brands.html'
if brand not in sm:
    if "</urlset>" not in sm:
        raise SystemExit("Sitemap is malformed.")
    sm = sm.replace("</urlset>", '  <url><loc>' + brand + '</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>\\n</urlset>')
    sitemap.write_text(sm,encoding="utf-8")

new_size = len(HTML.encode("utf-8"))
print(f"Home HTML: {original_size:,} → {new_size:,} bytes; reduction {(1 - new_size/max(original_size,1))*100:.1f}%.")
print("Brand navigation, contact CTA, canonical/social image and sitemap verified.")
