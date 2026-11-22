/* K/IM — Some Blues gallery with an accessible frame viewer and caption modes. */
(() => {
 "use strict";
 const paths=["/assets/work/some-blues/frame-01.webp","/assets/work/some-blues/frame-02.webp","/assets/work/some-blues/frame-03.webp","/assets/work/some-blues/frame-04.webp","/assets/work/some-blues/frame-05.webp","/assets/work/some-blues/frame-06.webp"];
 const titles=["SOME BLUES.","FROM BOARD TO BODY.","THE BLUEPRINT.","THE LOOK MOVES.","IT'S IN THE DETAILS.","CONCEPT TO CAMERA."];
 const captions={visitor:["One colour story. A full look. A point of view.","The moodboard set the direction. The fit became the story.","The Blueprint: a blue-on-blue story of thrifted layers, Mr Price denim and Vans.","An outfit designed to be seen in motion.","Sneaker details, printed denim and styling choices.","Creative direction and styling by Siya Khanyi."],brand:["An independent Be The Next / Mr Price content creator concept.","Concept development translated into a styled and photographed editorial.","The Blueprint: accessible fashion, pre-loved layers and a considered blue colour system.","A movement-led approach suited to short-form fashion storytelling.","Detail photography for styling stories and visual cutdowns.","Independent creative direction and production concept. No paid collaboration is implied."]};

 // Give the photographed outfit its own creditable editorial identity.
 const gallery=document.getElementById("some-blues-gallery");
 if(gallery && !document.getElementById("kim-look-sheet")){
  const title=gallery.querySelector('[data-kim-frame="2"] .kim-frame-title');
  if(title)title.textContent="THE BLUEPRINT.";
  const trigger=gallery.querySelector('[data-kim-frame="2"]');
  if(trigger)trigger.setAttribute("aria-label","View THE BLUEPRINT., frame 3 of 6");
  const sheet=document.createElement("section");
  sheet.id="kim-look-sheet";
  sheet.className="kim-look-sheet";
  sheet.setAttribute("aria-labelledby","kim-look-name");
  sheet.innerHTML=`
   <div class="kim-look-story">
    <span class="kim-kicker">SOME BLUES / LOOK 001</span>
    <h3 id="kim-look-name">THE <em>BLUEPRINT.</em></h3>
    <p class="kim-look-subtitle">Different origins. One colour story.</p>
    <p>Thrifted denim meets everyday streetwear: a complete look built through layering, proportion and the blues in between.</p>
   </div>
   <div class="kim-look-credits">
    <span class="kim-kicker">THE FIT / WORN BY SIYA KHANYI</span>
    <h4>WHAT'S IN THE LOOK</h4>
    <dl>
     <div><dt>01 / CAP</dt><dd>Thrifted</dd></div>
     <div><dt>02 / SHIRT</dt><dd>Mr Price</dd></div>
     <div><dt>03 / DENIM HALF-JERSEY</dt><dd>Thrifted</dd></div>
     <div><dt>04 / JEANS</dt><dd>Mr Price × Artclub &amp; Friends <span class="kim-credit-qualifier">(tentative identification)</span></dd></div>
     <div><dt>05 / SNEAKERS</dt><dd>Vans</dd></div>
    </dl>
    <p class="kim-credit-note">Mr Price's Artclub &amp; Friends denim collection is verified. The exact jeans worn here have not yet been matched to a product label.</p>
   </div>`;
  gallery.insertAdjacentElement("afterend",sheet);
 }

 const dialog=document.getElementById("kim-story-dialog");
 if(!dialog)return;
 const picture=document.getElementById("kim-dialog-image");
 const label=document.getElementById("kim-dialog-caption");
 const counter=document.getElementById("kim-dialog-count");
 const triggerButtons=[...document.querySelectorAll("[data-kim-frame]")];
 const switchButtons=[...document.querySelectorAll("[data-kim-audience]")];
 let current=0, mode="visitor", previousFocus=null;
 function updateCaptions(){
  document.querySelectorAll("[data-kim-caption]").forEach(el=>{
   const i=Number(el.getAttribute("data-kim-caption"));
   el.textContent=captions[mode][i];
  });
  switchButtons.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.kimAudience===mode)));
  updateFrame();
 }
 function updateFrame(){
  picture.src=paths[current];
  picture.alt="Some Blues editorial frame "+(current+1)+": "+titles[current];
  label.textContent=titles[current]+" "+captions[mode][current];
  counter.textContent=String(current+1).padStart(2,"0")+" / 06";
 }
 function showFrame(i, trigger){
  current=(i+paths.length)%paths.length;previousFocus=trigger||document.activeElement;
  updateFrame();
  if(typeof dialog.showModal==="function")dialog.showModal();
  else dialog.setAttribute("open","");
 }
 function close(){
  if(typeof dialog.close==="function")dialog.close();
  else dialog.removeAttribute("open");
  if(previousFocus && typeof previousFocus.focus==="function")previousFocus.focus();
 }
 triggerButtons.forEach(el=>el.addEventListener("click",()=>showFrame(Number(el.dataset.kimFrame),el)));
 switchButtons.forEach(el=>el.addEventListener("click",()=>{mode=el.dataset.kimAudience;updateCaptions()}));
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
