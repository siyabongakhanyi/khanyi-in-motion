/* KFL / editorial reading progress. No image manipulation and no third-party requests. */
(function(){
  "use strict";
  const line=document.getElementById("kfl-reading-progress");
  if(!line)return;
  let pending=false;
  function draw(){
    pending=false;
    const doc=document.documentElement;
    const length=Math.max(1,doc.scrollHeight-window.innerHeight);
    const pct=Math.min(100,Math.max(0,window.scrollY/length*100));
    line.style.width=pct.toFixed(2)+"%";
  }
  function schedule(){
    if(pending)return;
    pending=true;
    window.requestAnimationFrame(draw);
  }
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule,{passive:true});
  draw();
})();