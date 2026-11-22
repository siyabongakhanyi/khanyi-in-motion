/* Automated visual-layout smoke test against the published Khanyi In Motion site.
   Ensures portrait/landscape navigation, no horizontal page overflow,
   and that the original-photo lightbox is usable with mouse and keyboard. */
const fs=require("node:fs");
const {chromium}=require("playwright-core");
const origin=process.env.KIM_BASE_URL||"https://khanyi-in-motion.vercel.app";
const viewports=[
 {name:"mobile-small-portrait",width:320,height:640},
 {name:"mobile-portrait",width:390,height:844},
 {name:"mobile-landscape",width:844,height:390},
 {name:"tablet-portrait",width:768,height:1024},
 {name:"tablet-landscape",width:1024,height:768},
 {name:"desktop",width:1440,height:900},
 {name:"wide-desktop",width:1920,height:1080}
];
const pages=[
 {name:"HOME",path:"/",gallery:false},
 {name:"SOME BLUES STORY",path:"/the-blueprint.html",gallery:false},
 {name:"LIVED PHOTO ARCHIVE",path:"/blue-in-real-life.html",gallery:true}
];
const report=["Khanyi In Motion — responsive smoke test","Generated "+new Date().toISOString(),"Source: "+origin,""];
const failures=[];
const chrome=process.env.CHROME_PATH||"/usr/bin/google-chrome";
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:chrome,args:["--no-sandbox","--disable-dev-shm-usage"]});
try {
 for(const v of viewports){
  const page=await browser.newPage({viewport:{width:v.width,height:v.height},deviceScaleFactor:1});
  for(const p of pages){
   let issues=[];
   try{
    const response=await page.goto(origin+p.path,{waitUntil:"domcontentloaded",timeout:35000});
    await page.waitForTimeout(450);
    const d=await page.evaluate(()=>({
     statusTitle:document.title,
     width:window.innerWidth,
     docWidth:document.documentElement.scrollWidth,
     bodyWidth:document.body.scrollWidth,
     headingCount:document.querySelectorAll("h1").length,
     mainCount:document.querySelectorAll("main").length,
     canvaEmbeds:document.querySelectorAll('iframe[src*="canva.com"]').length,
     photos:document.querySelectorAll('button[data-archive-view][data-src*="photo-"]').length,
     slides:document.querySelectorAll('button[data-archive-view][data-src*="story-"]').length
    }));
    if(!response||response.status()!==200)issues.push("http "+response?.status());
    if(d.docWidth>d.width+3||d.bodyWidth>d.width+3){const offenders=await page.evaluate(()=>Array.from(document.querySelectorAll("body *")).map(el=>({el,r:el.getBoundingClientRect(),s:getComputedStyle(el)})).filter(x=>x.r.width>0&&x.r.right>window.innerWidth+2&&x.s.position!=="absolute"&&x.s.position!=="fixed"&&x.s.display!=="none").sort((a,b)=>b.r.right-a.r.right).slice(0,8).map(x=>x.el.tagName.toLowerCase()+(x.el.id?"#"+x.el.id:"")+(x.el.className&&typeof x.el.className==="string"?"."+x.el.className.split(" ").slice(0,2).join("."):"")+":"+Math.round(x.r.right)));issues.push("horizontal overflow "+d.docWidth+"/"+d.bodyWidth+" > "+d.width+" offenders "+offenders.join(","));}
    if(d.headingCount!==1)issues.push("expected one h1, found "+d.headingCount);
    if(p.path==="/"&&d.canvaEmbeds)issues.push("broken Canva embed remains");
    if(p.gallery&&(d.photos!==12||d.slides!==7))issues.push("gallery media count mismatch "+d.photos+"/"+d.slides);
    if(p.gallery){
     const first=page.locator("button[data-archive-view]").first();
     await first.click({timeout:7000});
     if(!(await page.locator("#archive-dialog").evaluate(x=>x.open)))issues.push("photo viewer did not open");
     const before=await page.locator("#modal-image").getAttribute("src");
     await page.keyboard.press("ArrowRight");
     const after=await page.locator("#modal-image").getAttribute("src");
     if(before===after)issues.push("keyboard navigation did not advance");
     await page.keyboard.press("Escape");
     if(await page.locator("#archive-dialog").evaluate(x=>x.open))issues.push("Escape did not close viewer");
    }
    const label=(issues.length?"FAIL":"PASS")+" | "+v.name.padEnd(23)+" "+p.name.padEnd(19)+" | "+d.docWidth+"/"+d.width;
    report.push(label+(issues.length?" | "+issues.join("; "):""));
    if(issues.length)failures.push(label);
   }catch(e){
    const label="ERROR | "+v.name+" "+p.name+": "+String(e).slice(0,220);
    report.push(label);failures.push(label);
   }
  }
  await page.close();
 }
 report.push("","RESULT "+(failures.length?"FAIL "+failures.length:"PASS 21 responsive page/viewport checks"));
 fs.mkdirSync("docs",{recursive:true});
 fs.writeFileSync("docs/responsive-smoke-report.txt",report.join("\n")+"\n");
 console.log(report.join("\n"));
 if(failures.length)process.exitCode=1;
}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
