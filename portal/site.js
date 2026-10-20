(() => {
  const { lang, design, page } = document.body.dataset;
  const ja=lang==='ja';
  const menu=document.querySelector('.menu-toggle'), mobile=document.querySelector('#mobile-nav');
  menu.addEventListener('click',()=>{
    const expanded=menu.getAttribute('aria-expanded')==='true';
    menu.setAttribute('aria-expanded',String(!expanded));mobile.hidden=expanded;
  });
  mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.hidden=true;menu.setAttribute('aria-expanded','false');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobile.hidden){mobile.hidden=true;menu.setAttribute('aria-expanded','false');menu.focus();}});
  const dialog=document.querySelector('#search-dialog'), input=document.querySelector('#search-input'), results=document.querySelector('#search-results');
  let searchPages=[],loaded=false;
  async function loadSearch(){
    if(loaded)return;
    const response=await fetch(`/assets/search-${lang}-${design}.json`);
    if(!response.ok)throw new Error('Search index unavailable');
    searchPages=await response.json();loaded=true;
  }
  function renderResults(){
    results.replaceChildren();
    const query=input.value.normalize('NFKC').toLocaleLowerCase().trim();
    const matches=searchPages.filter(p=>!query||`${p.title} ${p.description} ${p.keywords}`.normalize('NFKC').toLocaleLowerCase().includes(query));
    matches.forEach(p=>{
      const a=document.createElement('a');a.className='search-result';a.href=p.url;
      const strong=document.createElement('strong');strong.textContent=p.title;
      const text=document.createElement('p');text.textContent=p.description;
      a.append(strong,text);results.append(a);
    });
    if(!matches.length){const p=document.createElement('p');p.textContent=ja?'該当するページがありません。「報酬」「ストレージ」「構築」などをお試しください。':'No matches. Try “rewards”, “storage”, or “setup”.';results.append(p);}
  }
  async function openSearch(){
    dialog.showModal();input.focus();
    try{await loadSearch();renderResults();}catch{results.textContent=ja?'検索情報を読み込めませんでした。ページを再読み込みしてください。':'Search could not load. Please reload the page.';}
  }
  document.querySelector('.search-open').addEventListener('click',openSearch);
  document.querySelector('.search-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  input.addEventListener('input',renderResults);
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();if(!dialog.open)openSearch();}});
  document.querySelectorAll('.copy-code').forEach(button=>button.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(button.dataset.copy);button.textContent=ja?'コピーしました':'Copied';document.querySelector('.copy-status').textContent=button.textContent;}
    catch{document.querySelector('.copy-status').textContent=ja?'コマンドを選択して手動でコピーしてください。':'Select and copy the command manually.';button.textContent=ja?'手動でコピー':'Copy manually';}
  }));
  if(window.parent!==window)window.parent.postMessage({type:'peers-preview-navigation',lang,design,page},location.origin);
})();
