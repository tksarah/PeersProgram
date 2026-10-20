(() => {
  const designs=JSON.parse(document.querySelector('#design-data').textContent);
  const validDesigns=designs.map(d=>d.id),validPages=['','rewards','setup'];
  const frame=document.querySelector('#preview-frame'),stage=document.querySelector('#preview-stage');
  const params=new URLSearchParams(location.search);
  const state={design:validDesigns.includes(params.get('design'))?params.get('design'):'portal',lang:params.get('lang')==='ja'?'ja':'en',page:validPages.includes(params.get('page'))?params.get('page'):'',width:params.get('width')==='mobile'?'mobile':'desktop'};
  function update(navigate=true){
    const d=designs.find(d=>d.id===state.design),i=designs.indexOf(d);
    for(const key of ['design','lang','page','width'])document.querySelectorAll(`button[data-${key}]`).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[key]===state[key])));
    document.querySelector('#design-summary').textContent=d.summary;
    document.querySelector('#design-detail').textContent=d.detail;
    document.querySelector('#design-check').textContent='見るポイント：'+d.check;
    stage.classList.toggle('mobile',state.width==='mobile');
    const url=`/${state.lang}/${state.design}/${state.page?state.page+'/':''}`;
    if(navigate)frame.src=url;
    frame.title=`${d.name} — ${state.lang==='en'?'英語':'日本語'}・${state.page==='rewards'?'報酬の記事':state.page==='setup'?'構築ガイド':'トップページ'}`;
    document.querySelector('#open-preview').href=url;
    document.querySelector('#frame-status').textContent=`0${i+1} / 05 · ${d.name}`;
    history.replaceState(null,'','?'+new URLSearchParams(state).toString());
  }
  for(const key of ['design','lang','page','width'])document.querySelectorAll(`button[data-${key}]`).forEach(b=>b.addEventListener('click',()=>{if(b.dataset[key]===state[key])return;state[key]=b.dataset[key];update(key!=='width');}));
  window.addEventListener('message',e=>{
    if(e.origin!==location.origin||e.source!==frame.contentWindow||e.data?.type!=='peers-preview-navigation')return;
    const {design,lang,page}=e.data;
    if(!validDesigns.includes(design)||!['en','ja'].includes(lang)||!validPages.includes(page))return;
    Object.assign(state,{design,lang,page});update(false);
  });
  update(true);
})();
