(() => {
  const { lang } = document.body.dataset;
  const ja=lang==='ja';
  const themeButton=document.querySelector('.theme-toggle');
  const systemTheme=window.matchMedia('(prefers-color-scheme: dark)');
  let selectedTheme;
  try{selectedTheme=localStorage.getItem('peers-color-theme');}catch{}
  const applyTheme=theme=>{
    document.documentElement.dataset.theme=theme;
    document.documentElement.style.colorScheme=theme;
    const dark=theme==='dark';
    const label=ja?(dark?'ライトモードに切り替える':'ダークモードに切り替える'):(dark?'Switch to light mode':'Switch to dark mode');
    themeButton.setAttribute('aria-pressed',String(dark));
    themeButton.setAttribute('aria-label',label);themeButton.title=label;
    themeButton.querySelector('.theme-label').textContent=label;
  };
  applyTheme(selectedTheme==='light'||selectedTheme==='dark'?selectedTheme:systemTheme.matches?'dark':'light');
  themeButton.addEventListener('click',()=>{
    selectedTheme=document.documentElement.dataset.theme==='dark'?'light':'dark';
    try{localStorage.setItem('peers-color-theme',selectedTheme);}catch{}
    applyTheme(selectedTheme);
  });
  systemTheme.addEventListener('change',()=>{if(selectedTheme!=='light'&&selectedTheme!=='dark')applyTheme(systemTheme.matches?'dark':'light');});
  window.addEventListener('storage',event=>{if(event.key==='peers-color-theme'){selectedTheme=event.newValue;applyTheme(selectedTheme==='light'||selectedTheme==='dark'?selectedTheme:systemTheme.matches?'dark':'light');}});
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
    const response=await fetch(`/assets/search-${lang}.json`);
    if(!response.ok)throw new Error('Search index unavailable');
    searchPages=await response.json();loaded=true;
  }
  function renderResults(){
    results.replaceChildren();
    const query=input.value.normalize('NFKC').toLocaleLowerCase().trim();
    const terms=query.split(/\s+/).filter(Boolean);
    const normalized=value=>value.normalize('NFKC').toLocaleLowerCase();
    const matches=searchPages.filter(p=>terms.every(term=>normalized(`${p.title} ${p.description} ${p.keywords}`).includes(term)));
    const score=p=>terms.reduce((sum,term)=>sum+(normalized(p.title).includes(term)?10:0)+(normalized(p.description).includes(term)?2:0),0);
    matches.sort((a,b)=>score(b)-score(a));
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
})();
