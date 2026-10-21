// Existing Python layout is preserved. Its rendered footer is the page-change signal.
let previousPage;
const readPage=()=>{
  const footer=document.querySelector('.app-footer');
  const match=footer?.textContent?.match(/第\s*(\d+)\s*页/);
  if(!match)return;
  const page=Number(match[1]);
  if(previousPage!==undefined&&previousPage!==page)window.__pythonNarrationPlayer.stopSpeech();
  previousPage=page;
};
const observer=new MutationObserver(readPage);
observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true});
readPage();
window.addEventListener('pagehide',()=>window.__pythonNarrationPlayer.stopSpeech());
window.addEventListener('beforeunload',()=>window.__pythonNarrationPlayer.stopSpeech());
