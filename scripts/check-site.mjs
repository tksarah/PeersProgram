import assert from 'node:assert/strict';
import { readdirSync,readFileSync,existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { Marked } from 'marked';
const root=resolve('dist'),files=[];
const walk=dir=>{for(const e of readdirSync(dir,{withFileTypes:true})){const p=resolve(dir,e.name);e.isDirectory()?walk(p):files.push(p);}};walk(root);
const html=files.filter(f=>f.endsWith('.html'));
const allHtml=html.map(f=>readFileSync(f,'utf8')).join('\n').replaceAll('&amp;','&');
for(const link of JSON.parse(readFileSync('portal/migration-links.json','utf8')))assert.ok(allHtml.includes(link),`Missing original external reference: ${link}`);
for(const file of html){
 const text=readFileSync(file,'utf8'),ids=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.ok(!text.includes('undefined'),`Missing generated content: ${file}`);
 assert.equal(new Set(ids).size,ids.length,`Duplicate ids: ${file}`);
 for(const m of text.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const link=m[1].replaceAll('&amp;','&');if(/^https?:/.test(link))continue;
  const [path,hash]=link.split('#');let target=path?resolve(root,'.'+path):file;if(path.endsWith('/'))target=resolve(target,'index.html');
  assert.ok(existsSync(target),`Missing ${link} from ${file}`);
  if(hash&&target.endsWith('.html'))assert.ok(readFileSync(target,'utf8').includes(`id="${decodeURIComponent(hash)}"`),`Missing anchor ${link} from ${file}`);
 }
 assert.ok(!text.includes('forms.gle'),'Closed recruitment must not expose an active application link');
 assert.ok(!text.includes('peers.sun-t-sarah.work'),'No content links depend on the legacy host');
 assert.ok(!text.includes('preview-frame'),'No review gallery in the production site');
}
const marked=new Marked();
const codeBlocks=source=>marked.lexer(source).filter(t=>t.type==='code').map(t=>t.text);
const enCommands=codeBlocks(readFileSync('portal/content/en/maintenance.md','utf8'));
assert.deepEqual(codeBlocks(readFileSync('portal/content/ja/maintenance.md','utf8')),enCommands,'Translated maintenance guide preserves every command and output block in order');
for(const lang of ['en','ja']){
 const index=JSON.parse(readFileSync(resolve(root,`assets/search-${lang}.json`),'utf8'));
 assert.equal(index.length,12,'Home and all 11 articles are searchable');
 for(const result of index){const page=readFileSync(resolve(root,'.'+result.url,'index.html'),'utf8');assert.ok(page.includes('data-theme="light"'));assert.ok(page.includes('peers-color-theme'));assert.ok(page.includes('class="theme-toggle'));assert.ok(!page.includes('noindex'));assert.ok(page.includes(`href="/${lang==='en'?'ja':'en'}/${result.url.split('/')[2]?result.url.split('/')[2]+'/':''}"`),'Language link preserves current article');}
 const rewards=readFileSync(resolve(root,lang,'rewards/index.html'),'utf8');
 const priorityTable=rewards.split('id="reward-categories"')[1].split('</table>')[0];
 const rates=[...priorityTable.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(m=>[...m[1].matchAll(/<td(?:\s[^>]*)?>([\s\S]*?)<\/td>/g)]).filter(cells=>cells.length===3).map(cells=>cells[2][1].match(/(\d+%)/)[1]);
 assert.deepEqual(rates,['0%','30%','0%','100%','50%']);assert.ok(rewards.includes('EMA30'));
 const people=readFileSync(resolve(root,lang,'community/index.html'),'utf8');assert.ok(people.includes('2026-10-01'));assert.ok(people.includes('2023-12-05'));assert.ok(readFileSync(resolve(root,lang,'guides/index.html'),'utf8').includes('Sequaja'));
}
const css=readFileSync('portal/site.css','utf8');assert.ok(css.includes('font:20px/1.85'));assert.ok(css.includes('body{font-size:18px}'));assert.ok(css.includes(':root[data-theme=dark]'));
// Verify the key foreground/surface pairs in both palettes meet WCAG AA for normal text.
const luminance=hex=>{const rgb=hex.match(/[a-f0-9]{2}/gi).map(n=>parseInt(n,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
for(const [a,b] of [['555f75','ffffff'],['6244cf','ffffff'],['ffffff','6244cf'],['b5bed4','111624'],['b5bed4','1b2234'],['bda7ff','111624'],['211538','bda7ff']]){const l=[luminance(a),luminance(b)].sort((a,b)=>b-a),ratio=(l[0]+.05)/(l[1]+.05);assert.ok(ratio>=4.5,`Contrast ${a}/${b}: ${ratio}`);}
console.log(`Verified ${html.length} HTML files: bilingual content, links, anchors, search, reward priorities, command parity, theme controls, readable type, and palette contrast.`);
