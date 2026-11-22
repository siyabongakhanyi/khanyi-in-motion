/* K/IM — Some Blues gallery with an accessible frame viewer and caption modes. */
(() => {
 "use strict";
 const paths=["/assets/work/some-blues/frame-01.webp","/assets/work/some-blues/frame-02.webp","/assets/work/some-blues/frame-03.webp","/assets/work/some-blues/frame-04.webp","/assets/work/some-blues/frame-05.webp","/assets/work/some-blues/frame-06.webp"];
 const titles=["SOME BLUES.","FROM BOARD TO BODY.","THE FULL FIT.","THE LOOK MOVES.","IT'S IN THE DETAILS.","CONCEPT TO CAMERA."];
 const captions={visitor:["One colour story. A full look. A point of view.","The moodboard set the direction. The fit became the story.","A blue-on-blue look, layered with indigo and texture.","An outfit designed to be seen in motion.","Sneaker details, printed denim and styling choices.","Creative direction and styling by Siya Khanyi."],brand:["An independent Be The Next / Mr Price content creator concept.","Concept development translated into a styled and photographed editorial.","A consistent colour system and clothing-focused visual narrative.","A movement-led approach suited to short-form fashion storytelling.","Detail photography for styling stories and visual cutdowns.","Independent creative direction and production concept. No paid collaboration is implied."]};
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
