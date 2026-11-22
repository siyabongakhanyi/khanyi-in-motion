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

  // Four emotional states, told in the creator's first-person editorial voice.
  const emotions=document.createElement("section");
  emotions.id="kim-four-states";
  emotions.className="kim-emotions";
  emotions.setAttribute("aria-labelledby","kim-emotions-heading");
  emotions.dataset.tone="stillness";
  emotions.innerHTML=`
    <div class="kim-emotions-header">
      <div><span class="kim-bp-kicker">A PERSONAL NOTE / 004 STATES</span><h3 id="kim-emotions-heading">BLUE ISN'T<br>ONE FEELING.</h3></div>
      <p>I don't think blue belongs to sadness. For me, it has always held more than one feeling.</p>
    </div>
    <div class="kim-emotions-body">
      <div class="kim-emotions-controls" role="group" aria-label="Choose one of the four emotional states of blue">
        <button type="button" data-kim-emotion="0" aria-pressed="true"><span>01</span><strong>STILLNESS</strong><small>THE SOFT BLUE</small></button>
        <button type="button" data-kim-emotion="1" aria-pressed="false"><span>02</span><strong>MEMORY</strong><small>THE FADED BLUE</small></button>
        <button type="button" data-kim-emotion="2" aria-pressed="false"><span>03</span><strong>DEFIANCE</strong><small>THE ELECTRIC BLUE</small></button>
        <button type="button" data-kim-emotion="3" aria-pressed="false"><span>04</span><strong>RELEASE</strong><small>THE MOVING BLUE</small></button>
      </div>
      <div class="kim-emotion-stage" aria-live="polite" aria-atomic="true">
        <span class="kim-emotion-stage-index" id="kim-emotion-index">01 / STILLNESS</span>
        <blockquote id="kim-emotion-quote">"Some days I reach for blue because I need a little room to breathe."</blockquote>
        <p class="kim-emotion-reflection" id="kim-emotion-reflection">A quieter kind of confidence. Nothing to prove, nowhere to rush.</p>
        <div class="kim-emotion-stage-footer"><span>WORDS / SIYA KHANYI — EDITORIAL VOICE</span><span id="kim-emotion-progress">01 / 04</span></div>
      </div>
      <button class="kim-emotion-photo" type="button" data-kim-emotion-photo aria-label="Open the photograph for the selected blue mood">
        <img id="kim-emotion-image" src="/assets/work/some-blues/frame-02.webp" width="400" height="500" alt="Original Some Blues styling editorial photograph representing stillness">
        <span class="kim-emotion-photo-label">ORIGINAL PHOTO / SELECT TO EXPAND</span>
      </button>
    </div>
    <div class="kim-emotions-share">
      <p>See yourself in a shade of blue?</p>
      <div>
        <a href="/the-blueprint.html" class="kim-emotion-permalink">VIEW THE BLUEPRINT STORY <span aria-hidden="true">↗</span></a>
        <button type="button" class="kim-emotion-share-button" data-kim-share>SHARE THIS STORY <span aria-hidden="true">↗</span></button>
      </div>
      <span class="kim-share-feedback" role="status" aria-live="polite"></span>
    </div>`;
  sheet.after(emotions);

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

 // Give each emotion a real visual state; preserve the original photographs.
 const emotionalStates=[
  {name:"STILLNESS",tone:"stillness",quote:"Some days I reach for blue because I need a little room to breathe.",note:"A quieter kind of confidence. Nothing to prove, nowhere to rush.",img:1},
  {name:"MEMORY",tone:"memory",quote:"Other days, blue feels like a memory I can't quite name.",note:"Old pieces, new stories. Some things stay with me even when everything changes.",img:0},
  {name:"DEFIANCE",tone:"defiance",quote:"I can be soft and still take up space.",note:"Blue can make a statement without asking to be heard. This look is one of those statements.",img:2},
  {name:"RELEASE",tone:"release",quote:"And sometimes, I just want to move. No reason. No permission.",note:"The mood shifts. The layers move. The colour comes with me.",img:3}
 ];
 const moodPanel=document.getElementById("kim-four-states");
 let moodIndex=0;
 if(moodPanel){
  const moodButtons=[...moodPanel.querySelectorAll("[data-kim-emotion]")];
  const moodPhoto=moodPanel.querySelector("[data-kim-emotion-photo]");
  function chooseMood(index){
   moodIndex=Math.max(0,Math.min(index,emotionalStates.length-1));
   const item=emotionalStates[moodIndex];
   moodPanel.dataset.tone=item.tone;
   moodPanel.querySelector("#kim-emotion-index").textContent=String(moodIndex+1).padStart(2,"0")+" / "+item.name;
   moodPanel.querySelector("#kim-emotion-quote").textContent='"'+item.quote+'"';
   moodPanel.querySelector("#kim-emotion-reflection").textContent=item.note;
   moodPanel.querySelector("#kim-emotion-progress").textContent=String(moodIndex+1).padStart(2,"0")+" / 04";
   const image=moodPanel.querySelector("#kim-emotion-image");
   image.src=paths[item.img];image.alt="Original Some Blues styling editorial photograph representing "+item.name.toLowerCase();
   moodPhoto.setAttribute("aria-label","Open "+item.name.toLowerCase()+" photograph");
   moodButtons.forEach((b,i)=>b.setAttribute("aria-pressed",String(i===moodIndex)));
  }
  moodButtons.forEach((b,i)=>b.addEventListener("click",()=>chooseMood(i)));
  moodPhoto.addEventListener("click",()=>showFrame(emotionalStates[moodIndex].img,moodPhoto));
  const share=moodPanel.querySelector("[data-kim-share]");
  const feedback=moodPanel.querySelector(".kim-share-feedback");
  share.addEventListener("click",async()=>{
   const state=emotionalStates[moodIndex];
   const url="https://khanyi-in-motion.vercel.app/the-blueprint.html#state-"+state.tone;
   const title="THE BLUEPRINT — "+state.name+" | Siya Khanyi";
   const summary="“"+state.quote+"” A blue story in four emotional states. See The Blueprint.";
   if(navigator.share){
    try{await navigator.share({title,text:summary,url});feedback.textContent="Story ready to share.";return}
    catch(error){if(error.name==="AbortError")return}
   }
   if(navigator.clipboard && navigator.clipboard.writeText){
    try{await navigator.clipboard.writeText(url);feedback.textContent="Story link copied.";return}catch(error){}
   }
   const backup=document.createElement("input");
   backup.value=url;backup.setAttribute("aria-label","Story URL");
   moodPanel.append(backup);backup.select();
   try{feedback.textContent=document.execCommand("copy")?"Story link copied.":"Copy this story link to share."}
   catch(error){feedback.textContent="Copy this story link to share."}
   if(backup.parentElement)backup.remove();
  });
  chooseMood(0);
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


/* K/IM / CLEAN EDIT — single hero, purposeful media, progressive disclosure. */
(() => {
 "use strict";
 const host=document.querySelector(".kim-work-editorial");
 if(!host || document.getElementById("kim-edit-clean"))return;
 const heading=host.querySelector(".heading-grid");
 if(!heading)return;
 const states=[
  {id:"stillness",title:"STILLNESS",sub:"A little room to breathe",tag:"SOFT BLUE",quote:"Some days I reach for blue because I need a little room to breathe.",note:"I like that quiet confidence. Nothing to prove, nowhere to rush.",file:"05",imageTitle:"DETAILS / THE QUIETER TEXTURES"},
  {id:"memory",title:"MEMORY",sub:"The things that stay",tag:"FADED BLUE",quote:"Other days, blue feels like a memory I can't quite name.",note:"I like that thrifted pieces have lived before. I get to give them another story.",file:"02",imageTitle:"MOODBOARD / FROM BOARD TO BODY"},
  {id:"defiance",title:"DEFIANCE",sub:"Taking up space",tag:"ELECTRIC BLUE",quote:"I can be soft and still take up space.",note:"Sometimes getting dressed is how I make a statement before I say anything.",file:"01",imageTitle:"COVER / THE BOLD STATEMENT"},
  {id:"release",title:"RELEASE",sub:"Leaving the rules behind",tag:"MOVING BLUE",quote:"And sometimes, I just want to move. No reason. No permission.",note:"The look becomes something else when I stop posing and start moving in it.",file:"04",imageTitle:"MOVEMENT / THE LOOK MOVES"}
 ];
 const accHtml=states.map((s,i)=>[
  '<details class="kim2-accordion kim2-mood" id="state-'+s.id+'" data-tone="'+s.id+'">',
  '<summary><span class="kim2-n">0'+(i+1)+'</span><span class="kim2-summary-name">'+s.title+'<small>'+s.sub+'</small></span><span class="kim2-tint">'+s.tag+'</span><span class="kim2-plus" aria-hidden="true"></span></summary>',
  '<div class="kim2-mood-inner"><div class="kim2-words"><span class="kim2-code">PERSONAL NOTES / 0'+(i+1)+'</span><blockquote>“'+s.quote+'”</blockquote><p>'+s.note+'</p></div>',
  '<figure class="kim2-mood-image"><button type="button" class="kim2-image-button" data-kim2-image="/assets/work/some-blues/frame-'+s.file+'.webp" data-kim2-alt="'+s.imageTitle+'" aria-label="Enlarge '+s.title.toLowerCase()+' editorial image"><img loading="lazy" decoding="async" width="400" height="500" src="/assets/work/some-blues/frame-'+s.file+'.webp" alt="'+s.imageTitle+'"></button><figcaption>FRAME '+s.file+' / '+s.imageTitle+'</figcaption></figure></div>',
  '</details>'
 ].join('')).join('');
 const article=document.createElement("article");
 article.id="kim-edit-clean";
 article.className="kim2-editorial";
 article.setAttribute("aria-labelledby","kim2-heading");
 article.innerHTML=[
  '<section class="kim2-hero"><div class="kim2-hero-text">',
   '<div class="kim2-eyebrow"><i aria-hidden="true"></i> LOOK 001 / SOME BLUES <span>—</span> PERSONAL EDITORIAL</div>',
   '<h3 id="kim2-heading">THE <span>BLUEPRINT.</span></h3>',
   '<p class="kim2-declaration">Blue isn’t one feeling.</p>',
   '<p class="kim2-opening">I wear it when I need to breathe, when I’m remembering, when I want to be seen, and when I just want to move.</p>',
   '<div class="kim2-hero-links"><a href="#kim2-states">EXPLORE THE FOUR STATES <span aria-hidden="true">↗</span></a><button type="button" data-kim2-open="kim2-what">WHAT I WORE <span aria-hidden="true">+</span></button></div>',
   '<div class="kim2-signature">SIYA KHANYI <span>/</span> STYLE. STORY. MOTION.</div>',
  '</div><figure class="kim2-hero-image">',
   '<button type="button" class="kim2-image-button" data-kim2-image="/assets/work/some-blues/frame-03.webp" data-kim2-alt="THE BLUEPRINT / FULL FIT" aria-label="Enlarge the complete Blueprint outfit photograph">',
    '<span class="kim2-fig-top">FIG 01 / THE COMPLETE LOOK</span>',
    '<img decoding="async" width="400" height="500" src="/assets/work/some-blues/frame-03.webp" alt="The full blue layered denim outfit styled by Siya Khanyi">',
    '<span class="kim2-fig-bottom">THE FULL FIT <span>EXPAND ↗</span></span>',
   '</button><figcaption>THE COMPLETE LOOK / ONE PURPOSEFUL HERO IMAGE</figcaption>',
  '</figure></section>',
  '<section id="kim2-states" class="kim2-states" aria-labelledby="kim2-states-heading">',
   '<header class="kim2-section-intro"><span class="kim2-code">01 / THE FEELING</span><h3 id="kim2-states-heading">FOUR STATES.<br><em>ONE BLUE.</em></h3><p>Every shade says something different. Open the feeling that speaks to you.</p></header>',
   '<div class="kim2-accordion-list">'+accHtml+'</div>',
  '</section>',
  '<section class="kim2-more" aria-labelledby="kim2-more-heading">',
   '<header class="kim2-section-intro kim2-more-intro"><span class="kim2-code">02 / UNDER THE SURFACE</span><h3 id="kim2-more-heading">IF YOU WANT<br><em>TO KNOW MORE.</em></h3><p>A closer look at the styling, creative process and brand possibilities.</p></header>',
   '<div class="kim2-accordion-list">',
    '<details class="kim2-accordion kim2-extra" id="kim2-what"><summary><span class="kim2-n">01</span><span class="kim2-summary-name">WHAT I WORE<small>Five pieces, one personal uniform</small></span><span class="kim2-plus" aria-hidden="true"></span></summary>',
     '<div class="kim2-what-detail"><p>Different origins, one colour story. The thrifted pieces make it mine; the denim brings it together.</p>',
      '<dl class="kim2-garments"><div><dt>CAP</dt><dd>Thrifted</dd></div><div><dt>SHIRT</dt><dd><span class="kim2-mrp">mr price</span></dd></div><div><dt>DENIM HALF-JERSEY</dt><dd>Thrifted</dd></div><div><dt>JEANS</dt><dd>Mr Price × Artclub &amp; Friends <a target="_blank" rel="noopener noreferrer" href="https://www.mrp.com/artclub-and-friends-burnout-laser-print-jeans-104679814">Burnout Laser Print Jeans ↗</a></dd></div><div><dt>SNEAKERS</dt><dd>Vans</dd></div></dl>',
     '</div></details>',
    '<details class="kim2-accordion kim2-extra" id="kim2-process"><summary><span class="kim2-n">02</span><span class="kim2-summary-name">BEHIND THE LOOK<small>From the first mood to the finished fit</small></span><span class="kim2-plus" aria-hidden="true"></span></summary>',
     '<div class="kim2-process-detail"><div><span class="kim2-code">CONCEPT / STYLING / EDITORIAL</span><h4>AN IDEA<br>YOU CAN WEAR.</h4><p>I started with blue, then built the outfit around texture, contrast and movement. The thrifted layers carry their own histories. The fit becomes a story when they meet.</p></div><figure><button type="button" class="kim2-image-button" data-kim2-image="/assets/work/some-blues/frame-06.webp" data-kim2-alt="CONCEPT TO CAMERA / THE CREATIVE PROCESS" aria-label="Enlarge the creative-process editorial image"><img loading="lazy" decoding="async" width="400" height="500" src="/assets/work/some-blues/frame-06.webp" alt="Concept to Camera original mood-to-production creative direction frame"></button><figcaption>FRAME 06 / CONCEPT TO CAMERA</figcaption></figure></div>',
    '</details>',
    '<details class="kim2-accordion kim2-extra" id="kim2-brand"><summary><span class="kim2-n">03</span><span class="kim2-summary-name">FOR BRAND PARTNERS<small>What this visual idea could become</small></span><span class="kim2-plus" aria-hidden="true"></span></summary>',
     '<div class="kim2-brand-detail"><div class="kim2-brand-head"><span class="kim2-mrp">mr price</span><span class="kim2-code">INDEPENDENT CREATOR STUDY / NOT COMMISSIONED</span></div>',
      '<h4>DON’T JUST WEAR<br>THE BRAND. <em>MOVE IT.</em></h4>',
      '<p class="kim2-brand-lede">Fashion isn’t only about how a product looks on a rack. It’s how it becomes part of somebody’s life, feeling and movement.</p>',
      '<div class="kim2-brand-ideas"><div><span>01 / THE STORY</span><strong>EMOTION FIRST</strong><p>Four emotional meanings give one denim look multiple entry points for an audience.</p></div><div><span>02 / THE PRODUCT</span><strong>DENIM IN CONTEXT</strong><p>Verified Mr Price × Artclub &amp; Friends jeans styled alongside accessible and thrifted pieces.</p></div><div><span>03 / THE NEXT FORMATS</span><strong>READY TO EXPAND</strong><p>Existing editorial photography; vertical transition Reel and close-up cutdowns proposed for a future brief.</p></div></div>',
      '<div class="kim2-brand-action"><span>ORIGINAL CREATOR STUDY. NO PAID PARTNERSHIP IMPLIED.</span><a href="#collaborate">START A CONVERSATION ↗</a></div>',
     '</div></details>',
   '</div>',
  '</section>',
  '<footer class="kim2-footer"><div><strong>THE BLUEPRINT / 001</strong><span>PERSONAL STYLE, FOUR EMOTIONAL STATES.</span></div><div class="kim2-footer-action"><a href="/the-blueprint.html">OPEN SHAREABLE STORY ↗</a><button type="button" data-kim2-share>SHARE ↗</button></div><span class="kim2-share-status" role="status" aria-live="polite"></span></footer>'
 ].join("");

 // Preserve Work in Motion heading. Remove all earlier repeated imagery and pitch sections.
 const keep=new Set([host.querySelector(".section-head"),heading]);
 Array.from(host.children).forEach(node=>{if(!keep.has(node))node.remove();});
 heading.insertAdjacentElement("afterend",article);
 document.getElementById("kim-story-dialog")?.remove();
 const intro=host.querySelector(".kim-work-intro");
 if(intro)intro.textContent="One look, four feelings, and the story behind the blue.";

 // Native details: meaningful content stays collapsed until requested.
 const moods=Array.from(article.querySelectorAll(".kim2-mood"));
 moods.forEach(item=>item.addEventListener("toggle",()=>{if(item.open)moods.forEach(other=>{if(other!==item)other.open=false;});}));
 article.querySelectorAll("[data-kim2-open]").forEach(button=>button.addEventListener("click",()=>{
  const panel=document.getElementById(button.dataset.kim2Open);
  if(!panel)return;
  panel.open=true;
  panel.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
 }));
 const viewer=document.createElement("dialog");
 viewer.className="kim2-viewer";
 viewer.setAttribute("aria-label","Expanded editorial image");
 viewer.innerHTML='<button type="button" class="kim2-viewer-close" aria-label="Close image viewer">CLOSE ×</button><figure><img alt=""><figcaption></figcaption></figure>';
 document.body.appendChild(viewer);
 let opener=null;
 const large=viewer.querySelector("img");
 article.querySelectorAll("[data-kim2-image]").forEach(button=>button.addEventListener("click",()=>{
  opener=button;large.src=button.dataset.kim2Image;
  large.alt=button.dataset.kim2Alt||"The Blueprint editorial frame";
  viewer.querySelector("figcaption").textContent=large.alt;
  if(viewer.showModal)viewer.showModal();else viewer.setAttribute("open","");
 }));
 const close=()=>{if(viewer.close)viewer.close();else viewer.removeAttribute("open");};
 viewer.querySelector(".kim2-viewer-close").addEventListener("click",close);
 viewer.addEventListener("click",e=>{if(e.target===viewer)close();});
 viewer.addEventListener("close",()=>opener?.focus());
 const share=article.querySelector("[data-kim2-share]");
 const feedback=article.querySelector(".kim2-share-status");
 share.addEventListener("click",async()=>{
  const url="https://khanyi-in-motion.vercel.app/the-blueprint.html";
  try{
   if(navigator.share){await navigator.share({title:"The Blueprint — Four States of Blue",text:"Blue isn't one feeling. A personal editorial by Siya Khanyi.",url});return;}
   if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(url);feedback.textContent="Link copied.";return;}
  }catch(err){if(err?.name==="AbortError")return;}
  feedback.textContent="Share: "+url;
 });
})();
