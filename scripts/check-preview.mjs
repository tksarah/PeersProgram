import assert from 'node:assert/strict';
import { readdirSync,readFileSync,existsSync } from 'node:fs';
import { resolve,dirname } from 'node:path';
import { designs,copy } from '../portal/content.mjs';
const root=resolve('dist');
const files=[];
const walk=dir=>{for(const entry of readdirSync(dir,{withFileTypes:true})){const file=resolve(dir,entry.name);if(entry.isDirectory())walk(file);else files.push(file);}};
walk(root);
const html=files.filter(f=>f.endsWith('.html'));
assert.equal(html.length,31,'Review gallery plus 30 language/design/page variants');
for(const file of html){
 const text=readFileSync(file,'utf8');
 const ids=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`Duplicate ids: ${file}`);
 for(const match of text.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   const url=match[1].replaceAll('&amp;','&');if(/^https?:/.test(url))continue;
   const [path,hash]=url.split('#');
   let target=path?resolve(root,'.'+path):file;
   if(path.endsWith('/'))target=resolve(target,'index.html');
   assert.ok(existsSync(target),`Missing ${url} from ${file}`);
   if(hash&&target.endsWith('.html'))assert.ok(readFileSync(target,'utf8').includes(`id="${hash}"`),`Missing anchor ${url} from ${file}`);
 }
 assert.ok(!text.includes('forms.gle'),'No application button while recruitment is closed');
}
for(const lang of ['en','ja'])for(const {id} of designs){
 const reward=readFileSync(resolve(root,lang,id,'rewards/index.html'),'utf8');
 for(const value of ['0%','30%','0%','100%','50%'])assert.ok(reward.includes(`<strong>${value}</strong>`));
 assert.deepEqual(copy[lang].categories.map(r=>r[2]),['0%','30%','0%','100%','50%']);
 assert.ok(reward.includes('EMA30'));
 const home=readFileSync(resolve(root,lang,id,'index.html'),'utf8');
 assert.ok(home.includes(copy[lang].closed));
 const search=JSON.parse(readFileSync(resolve(root,`assets/search-${lang}-${id}.json`),'utf8'));
 assert.equal(search.length,3);for(const result of search)assert.ok(existsSync(resolve(root,'.'+result.url,'index.html')));
}
console.log(`Verified ${html.length} HTML pages: local links, anchors, language variants, search indexes, recruitment closure, and reward priorities.`);
