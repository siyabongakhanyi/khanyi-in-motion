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
   '<div class="kim2-hero-links"><a href="#kim2-states">EXPLORE THE FOUR STATES <span aria-hidden="true"><svg class="line-icon kim2-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg></span></a><button type="button" data-kim2-open="kim2-what">WHAT I WORE <span aria-hidden="true"><svg class="line-icon kim2-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"/></svg></span></button></div>',
   '<div class="kim2-signature">SIYA KHANYI <span>/</span> STYLE. STORY. MOTION.</div>',
  '</div><figure class="kim2-hero-image">',
   '<button type="button" class="kim2-image-button" data-kim2-image="/assets/work/some-blues/frame-03.webp" data-kim2-alt="THE BLUEPRINT / FULL FIT" aria-label="Enlarge the complete Blueprint outfit photograph">',
    '<span class="kim2-fig-top">FIG 01 / THE COMPLETE LOOK</span>',
    '<img decoding="async" width="400" height="500" src="/assets/work/some-blues/frame-03.webp" alt="The full blue layered denim outfit styled by Siya Khanyi">',
    '<span class="kim2-fig-bottom">THE FULL FIT <span>EXPAND <svg class="line-icon kim2-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg></span></span>',
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
      '<dl class="kim2-garments"><div><dt>CAP</dt><dd>Thrifted</dd></div><div><dt>SHIRT</dt><dd><span class="kim2-mrp">mr price</span></dd></div><div><dt>DENIM HALF-JERSEY</dt><dd>Thrifted</dd></div><div><dt>JEANS</dt><dd>Mr Price × Artclub &amp; Friends <a target="_blank" rel="noopener noreferrer" href="https://www.mrp.com/artclub-and-friends-burnout-laser-print-jeans-104679814">Burnout Laser Print Jeans <svg class="line-icon kim2-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg></a></dd></div><div><dt>SNEAKERS</dt><dd>Vans</dd></div></dl>',
     '</div></details>',
    '<details class="kim2-accordion kim2-extra" id="kim2-process"><summary><span class="kim2-n">02</span><span class="kim2-summary-name">BEHIND THE LOOK<small>From the first mood to the finished fit</small></span><span class="kim2-plus" aria-hidden="true"></span></summary>',
     '<div class="kim2-process-detail"><div><span class="kim2-code">CONCEPT / STYLING / EDITORIAL</span><h4>AN IDEA<br>YOU CAN WEAR.</h4><p>I started with blue, then built the outfit around texture, contrast and movement. The thrifted layers carry their own histories. The fit becomes a story when they meet.</p></div><figure><button type="button" class="kim2-image-button" data-kim2-image="/assets/work/some-blues/frame-06.webp" data-kim2-alt="CONCEPT TO CAMERA / THE CREATIVE PROCESS" aria-label="Enlarge the creative-process editorial image"><img loading="lazy" decoding="async" width="400" height="500" src="/assets/work/some-blues/frame-06.webp" alt="Concept to Camera original mood-to-production creative direction frame"></button><figcaption>FRAME 06 / CONCEPT TO CAMERA</figcaption></figure></div>',
    '</details>',
    '<details class="kim2-accordion kim2-extra" id="kim2-brand"><summary><span class="kim2-n">03</span><span class="kim2-summary-name">FOR BRAND PARTNERS<small>What this visual idea could become</small></span><span class="kim2-plus" aria-hidden="true"></span></summary>',
     '<div class="kim2-brand-detail"><div class="kim2-brand-head"><span class="kim2-mrp">mr price</span><span class="kim2-code">INDEPENDENT CREATOR STUDY / NOT COMMISSIONED</span></div>',
      '<h4>DON’T JUST WEAR<br>THE BRAND. <em>MOVE IT.</em></h4>',
      '<p class="kim2-brand-lede">Fashion isn’t only about how a product looks on a rack. It’s how it becomes part of somebody’s life, feeling and movement.</p>',
      '<div class="kim2-brand-ideas"><div><span>01 / THE STORY</span><strong>EMOTION FIRST</strong><p>Four emotional meanings give one denim look multiple entry points for an audience.</p></div><div><span>02 / THE PRODUCT</span><strong>DENIM IN CONTEXT</strong><p>Verified Mr Price × Artclub &amp; Friends jeans styled alongside accessible and thrifted pieces.</p></div><div><span>03 / THE NEXT FORMATS</span><strong>READY TO EXPAND</strong><p>Existing editorial photography; vertical transition Reel and close-up cutdowns proposed for a future brief.</p></div></div>',
      '<div class="kim2-brand-action"><span>ORIGINAL CREATOR STUDY. NO PAID PARTNERSHIP IMPLIED.</span><a href="#collaborate">START A CONVERSATION <svg class="line-icon kim2-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg></a></div>',
     '</div></details>',
   '</div>',
  '</section>',
  '<footer class="kim2-footer"><div><strong>THE BLUEPRINT / 001</strong><span>PERSONAL STYLE, FOUR EMOTIONAL STATES.</span></div><div class="kim2-footer-action"><a href="/the-blueprint.html">OPEN SHAREABLE STORY <svg class="line-icon kim2-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg></a><button type="button" data-kim2-share>SHARE <svg class="line-icon kim2-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10"/></svg></button></div><span class="kim2-share-status" role="status" aria-live="polite"></span></footer>'
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
 viewer.innerHTML='<button type="button" class="kim2-viewer-close" aria-label="Close image viewer">CLOSE <svg class="line-icon kim2-line-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 5 19 19M19 5 5 19"/></svg></button><figure><img alt=""><figcaption></figcaption></figure>';
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

