/* K/IM / SOME BLUES: The Blueprint hero, working audience modes and original-photo editorials. */
(() => {
 "use strict";
 const paths=["/assets/work/some-blues/frame-01.webp","/assets/work/some-blues/frame-02.webp","/assets/work/some-blues/frame-03.webp","/assets/work/some-blues/frame-04.webp","/assets/work/some-blues/frame-05.webp","/assets/work/some-blues/frame-06.webp"];
 const titles=["SOME BLUES.","FROM BOARD TO BODY.","THE BLUEPRINT.","THE LOOK MOVES.","IT'S IN THE DETAILS.","CONCEPT TO CAMERA."];
 const captions={
  visitor:["One colour story. A full look. A point of view.","From the first visual reference to the fully styled blue story.","Thrifted layers, Mr Price × Artclub & Friends denim and Vans. This is The Blueprint.","Movement adds dimension to the blue-on-blue look.","The jeans, sneaker details and styling choices bring the outfit together.","An independent style editorial by Siya Khanyi."],
  brand:["The editorial's attention-grabbing opening frame: a recognisable colour world.","Concept, mood, visual direction and styling brought into one connected narrative.","Hero product: Mr Price × Artclub & Friends burnout laser-print jeans styled in a real-world outfit.","Movement-led styling offers a natural bridge to short-form video.","Close-up product storytelling can reveal denim texture, prints and the styling mix.","A reusable six-frame visual asset, with additional social-first formats proposed."]
 };
 const gallery=document.getElementById("some-blues-gallery");
 const feature=document.querySelector(".kim-work-editorial .kim-feature");
 let pitch=null;
 if(gallery && feature && !document.getElementById("kim-blueprint")){
  const sheet=document.createElement("section");
  sheet.id="kim-blueprint";sheet.className="kim-blueprint";sheet.setAttribute("aria-labelledby","kim-bp-heading");
  sheet.innerHTML="\n  <div class=\"kim-bp-stage\">\n    <div class=\"kim-bp-copy\">\n      <div class=\"kim-bp-overline\"><span class=\"kim-bp-pulse\" aria-hidden=\"true\"></span> LOOK 001 <span class=\"kim-bp-separator\">/</span> SOME BLUES <span class=\"kim-bp-rightcode\">K/IM — STYLE SYSTEM</span></div>\n      <h3 id=\"kim-bp-heading\">THE <span>BLUEPRINT.</span></h3>\n      <p class=\"kim-bp-lead\">Different origins.<br>One colour story.</p>\n      <p class=\"kim-bp-description\">A blue-on-blue uniform built from thrifted finds, Mr Price essentials, Artclub &amp; Friends denim, and Vans. Personal style, deliberately assembled.</p>\n      <div class=\"kim-bp-actions\">\n        <a href=\"#some-blues-gallery\" class=\"kim-bp-action-primary\">EXPLORE THE EDITORIAL <span aria-hidden=\"true\">↗</span></a>\n        <button type=\"button\" data-kim-open-pitch class=\"kim-bp-action-secondary\">FOR BRAND PARTNERS <span aria-hidden=\"true\">↗</span></button>\n      </div>\n      <div class=\"kim-bp-brand-row\" aria-label=\"Featured fashion brands\">\n        <span class=\"kim-bp-brand-label\">WORN IN THE LOOK</span>\n        <span class=\"kim-mrp-wordmark\">mr price</span>\n        <span class=\"kim-bp-brand-divider\" aria-hidden=\"true\"></span>\n        <span class=\"kim-bp-brand-text\">ARTCLUB &amp; FRIENDS</span>\n        <span class=\"kim-bp-brand-divider\" aria-hidden=\"true\"></span>\n        <span class=\"kim-bp-brand-text\">VANS</span>\n      </div>\n    </div>\n    <button type=\"button\" class=\"kim-bp-visual\" data-kim-frame=\"2\" aria-label=\"Open The Blueprint outfit editorial photograph\">\n      <span class=\"kim-bp-visual-head\"><span>FIG. 01 // FULL FIT</span><span>BLUE / 001</span></span>\n      <img src=\"/assets/work/some-blues/frame-03.webp\" alt=\"The Blueprint: original blue denim outfit editorial, photographed and styled by Siya Khanyi\" width=\"400\" height=\"500\" decoding=\"async\">\n      <span class=\"kim-bp-crosshair kim-bp-crosshair-one\" aria-hidden=\"true\">+</span>\n      <span class=\"kim-bp-crosshair kim-bp-crosshair-two\" aria-hidden=\"true\">+</span>\n      <span class=\"kim-bp-visual-foot\"><span>THE LOOK / 001</span><span>CLICK TO EXPAND ↗</span></span>\n    </button>\n    <span class=\"kim-bp-vertical\" aria-hidden=\"true\">PERSONAL STYLE / CREATIVE DIRECTION / 2026</span>\n  </div>\n  <div class=\"kim-bp-fit\">\n    <div class=\"kim-bp-fit-intro\"><span class=\"kim-bp-kicker\">THE LOOK / GARMENT INDEX</span><h4>PIECES OF<br>THE STORY.</h4><p>Five pieces. One creative decision.</p></div>\n    <dl class=\"kim-bp-fit-list\">\n      <div><dt>01 / CAP</dt><dd>Thrifted</dd></div>\n      <div><dt>02 / SHIRT</dt><dd><span class=\"kim-credit-mrp\">mr price</span></dd></div>\n      <div><dt>03 / DENIM HALF-JERSEY</dt><dd>Thrifted</dd></div>\n      <div><dt>04 / JEANS</dt><dd><a href=\"https://www.mrp.com/artclub-and-friends-burnout-laser-print-jeans-104679814\" rel=\"noopener noreferrer\" target=\"_blank\">Mr Price × Artclub &amp; Friends <span class=\"kim-bp-jeans-type\">Burnout Laser Print Jeans <span aria-hidden=\"true\">↗</span></span></a></dd></div>\n      <div><dt>05 / SNEAKERS</dt><dd>Vans</dd></div>\n    </dl>\n    <p class=\"kim-bp-annotation\">BRAND ATTRIBUTION / GARMENTS WORN. INDEPENDENT EDITORIAL, NOT A PAID BRAND PARTNERSHIP.</p>\n  </div>\n";
  feature.before(sheet);
  pitch=document.createElement("section");
  pitch.id="kim-partner-pitch";pitch.className="kim-partner-pitch";
  pitch.setAttribute("aria-labelledby","kim-partner-heading");
  pitch.hidden=true;pitch.innerHTML="\n  <div class=\"kim-pitch-topline\"><span>BRAND PARTNER MODE / 01</span><span class=\"kim-pitch-status\"><span aria-hidden=\"true\"></span> CREATIVE PROPOSAL / INDEPENDENT</span></div>\n  <div class=\"kim-pitch-lead\">\n    <div class=\"kim-pitch-lead-copy\">\n      <div class=\"kim-pitch-badge\">A CREATIVE CASE FOR <strong>mr price</strong></div>\n      <h3 id=\"kim-partner-heading\">DON'T JUST<br>WEAR THE<br><em>BRAND.</em><br>MOVE IT.</h3>\n      <p>Not another outfit post. A creator-led content system that makes the product, the personality and the story work together.</p>\n      <a href=\"#collaborate\" class=\"kim-pitch-cta\">LET'S MAKE THE NEXT ONE <span aria-hidden=\"true\">↗</span></a>\n    </div>\n    <div class=\"kim-pitch-lead-visual\">\n      <div class=\"kim-pitch-photo-tag\"><span>PRODUCT STORY / DETAIL FRAME</span><span>01:06</span></div>\n      <img src=\"/assets/work/some-blues/frame-05.webp\" alt=\"Existing Some Blues creative editorial detail frame showing sneaker and denim styling\" width=\"400\" height=\"500\" loading=\"lazy\" decoding=\"async\">\n      <div class=\"kim-pitch-visual-caption\"><span>MR PRICE × ARTCLUB &amp; FRIENDS / DENIM</span><span>STYLE IS THE MESSAGE.</span></div>\n    </div>\n  </div>\n  <div class=\"kim-pitch-systemhead\"><span>THE CREATIVE SYSTEM</span><span>FROM LOOK TO LAUNCH / 3 MODULES</span></div>\n  <div class=\"kim-pitch-modules\">\n    <article><span class=\"kim-pitch-module-index\">01 / THE INSIGHT</span><h4>REAL STYLE.<br>REAL REACH.</h4><p>Mr Price's fashion-value DNA meets a look with a genuine point of view. Thrifted layers give the denim a fresh context instead of making it look like a catalogue item.</p><span class=\"kim-pitch-module-tag\">STYLE NARRATIVE / CULTURE</span></article>\n    <article><span class=\"kim-pitch-module-index\">02 / THE PRODUCT</span><h4>DENIM GETS<br>THE CLOSE-UP.</h4><p>Feature the verified Mr Price × Artclub &amp; Friends burnout laser-print jeans, backed by fit details, movement and the complete blue palette.</p><span class=\"kim-pitch-module-tag\">PRODUCT FOCUS / BRAND FIT</span></article>\n    <article><span class=\"kim-pitch-module-index\">03 / THE ACTIVATION</span><h4>BUILT FOR<br>THE SCROLL.</h4><p>Make the look modular: an editorial carousel, a vertical outfit-build Reel and punchy product-detail cutdowns for social-first storytelling.</p><span class=\"kim-pitch-module-tag\">REELS / CAROUSEL / SHORTS</span></article>\n  </div>\n  <div class=\"kim-pitch-formats\">\n    <div><span class=\"kim-bp-kicker\">CONTENT ARCHITECTURE</span><h4>ONE LOOK.<br>MORE THAN ONE FORMAT.</h4><p>What this visual direction can become for a future partner brief.</p></div>\n    <div class=\"kim-pitch-format-list\">\n      <div><span>01</span><strong>THE EDITORIAL</strong><span>6-frame visual story</span><b>SHOWN</b></div>\n      <div><span>02</span><strong>THE TRANSITION REEL</strong><span>9:16 / outfit-build concept</span><b>PROPOSED</b></div>\n      <div><span>03</span><strong>THE PRODUCT CUTS</strong><span>Denim details / close-up stills</span><b>PROPOSED</b></div>\n    </div>\n  </div>\n  <footer class=\"kim-pitch-footer\"><span class=\"kim-pitch-independent\">INDEPENDENT CREATOR STUDY. MR PRICE IS FEATURED AS A BRAND WORN; NO SPONSORSHIP OR OFFICIAL COMMISSION IS IMPLIED.</span><a href=\"#collaborate\">START A CONVERSATION <span aria-hidden=\"true\">↗</span></a></footer>\n";
  gallery.after(pitch);
  const preface=document.createElement("div");preface.className="kim-concept-preface";preface.innerHTML='<span>02 / THE CREATIVE CONCEPT</span><span>INDEPENDENT STYLE STUDY</span>';
  feature.prepend(preface);
  const fitTitle=gallery.querySelector('[data-kim-frame="2"] .kim-frame-title');
  if(fitTitle)fitTitle.textContent="THE BLUEPRINT.";
  const lookTrigger=gallery.querySelector('[data-kim-frame="2"]');
  if(lookTrigger)lookTrigger.setAttribute("aria-label","View THE BLUEPRINT., frame 3 of 6");
 }
 const dialog=document.getElementById("kim-story-dialog");
 if(!dialog)return;
 const picture=document.getElementById("kim-dialog-image");
 const label=document.getElementById("kim-dialog-caption");
 const counter=document.getElementById("kim-dialog-count");
 const triggerButtons=[...document.querySelectorAll("[data-kim-frame]")];
 const switchButtons=[...document.querySelectorAll("[data-kim-audience]")];
 let current=0,mode="visitor",previousFocus=null;
 function updateFrame(){
  picture.src=paths[current];picture.alt="Some Blues editorial frame "+(current+1)+": "+titles[current];
  label.textContent=titles[current]+" "+captions[mode][current];
  counter.textContent=String(current+1).padStart(2,"0")+" / 06";
 }
 function updateCaptions(){
  document.querySelectorAll("[data-kim-caption]").forEach(el=>{
   const i=Number(el.getAttribute("data-kim-caption"));if(captions[mode][i])el.textContent=captions[mode][i];
  });
  switchButtons.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.kimAudience===mode)));
  if(gallery)gallery.dataset.kimMode=mode;
  if(pitch)pitch.hidden=mode!=="brand";
  updateFrame();
 }
 function setMode(next,scrollToPitch){
  mode=next==="brand"?"brand":"visitor";updateCaptions();
  if(scrollToPitch && mode==="brand" && pitch){
   const reduced=window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   pitch.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});
  }
 }
 function showFrame(i,trigger){
  current=(i+paths.length)%paths.length;previousFocus=trigger||document.activeElement;updateFrame();
  if(typeof dialog.showModal==="function")dialog.showModal();else dialog.setAttribute("open","");
 }
 function close(){
  if(typeof dialog.close==="function")dialog.close();else dialog.removeAttribute("open");
  if(previousFocus && typeof previousFocus.focus==="function")previousFocus.focus();
 }
 triggerButtons.forEach(el=>el.addEventListener("click",()=>showFrame(Number(el.dataset.kimFrame),el)));
 switchButtons.forEach(el=>el.addEventListener("click",()=>setMode(el.dataset.kimAudience,el.dataset.kimAudience==="brand")));
 document.querySelectorAll("[data-kim-open-pitch]").forEach(el=>el.addEventListener("click",()=>setMode("brand",true)));
 dialog.querySelector("[data-kim-close]").addEventListener("click",close);
 dialog.querySelector("[data-kim-prev]").addEventListener("click",()=>{current=(current+paths.length-1)%paths.length;updateFrame()});
 dialog.querySelector("[data-kim-next]").addEventListener("click",()=>{current=(current+1)%paths.length;updateFrame()});
 dialog.addEventListener("click",event=>{if(event.target===dialog)close()});
 dialog.addEventListener("keydown",event=>{
  if(event.key==="ArrowLeft"){event.preventDefault();current=(current+paths.length-1)%paths.length;updateFrame()}
  if(event.key==="ArrowRight"){event.preventDefault();current=(current+1)%paths.length;updateFrame()}
  if(event.key==="Escape" && typeof dialog.close!=="function")close();
 });
 updateCaptions();
})();
