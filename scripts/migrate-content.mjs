// One-time import of the original MkDocs articles. Kept only until migration completes.
import { readFileSync, writeFileSync } from 'node:fs';
const articles={program:'readme/program',join:'readme/join',requirements:'readme/requirements',operations:'readme/operations',rewards:'readme/rewards',setup:'build/setup',maintenance:'build/tips',updates:'readme/updates',resources:'resources/links'};
for(const [name,source] of Object.entries(articles)){
 let text=readFileSync(`docs/${source}.md`,'utf8');
 text=text.replace(/\]\((?:\.\.\/|\.\/)*([^/)]+)\.md\)/g,(_,p)=>`](/en/${p==='tips'?'maintenance':p}/)`);
 text=text.replaceAll('../assets/images/','/assets/images/').replaceAll('../operations/#7-register-an-on-chain-identity','/en/operations/#7-register-an-on-chain-identity');
 text=text.replaceAll('<p>','').replaceAll('</p>','');
 if(name==='join')text=text.replace('Applications for Season 3.1 are now open.','**Applications for Season 3.1 are closed.**').replace('3. **Submit your application**','3. **Submit your application during an open recruitment period**').replace('Use the official application form or instructions announced for the relevant season.','Use the official application form or instructions announced for the relevant season. Season 3.1 closed on August 31, 2026; there is no active application link.');
 if(name==='updates')text='# Program updates\n\n## August 31, 2026 — Season 3.1 applications closed\n\nThe application deadline was August 31, 2026, at 23:59 UTC. The next scheduled reviews are March 2027 and September 2027.\n\n'+text.replace('## July 2026 -','## July 2026 — Season 3.1 recruitment opened').replace('## Jan 2023 - Dec 2025','## January 2023 – December 2025');
 if(name==='resources')text=text.replace('# Links','# Resources').replace('# Previous Season','## Previous seasons');
 writeFileSync(`portal/content/en/${name}.md`,text.trim()+'\n');
}
let community=readFileSync('docs/community/peers.md','utf8').replace('# Peers Dashboard','## Peers Dashboard');
community+='\n\n'+readFileSync('docs/community/discord.md','utf8').replaceAll('<p>','').replaceAll('../assets/images/','/assets/images/');
community=community.replace('# Peers','# Community & Peers');
writeFileSync('portal/content/en/community.md',community.trim()+'\n');
writeFileSync('portal/content/en/guides.md',`# Operator guides

Practical documentation for preparing, operating, and maintaining an Astar archive node.

## Start with the requirements

Review the [machine and technical requirements](/en/requirements/) before preparing your environment. The program's requirements are based on archive-node operating experience and may differ from the general Astar documentation.

## Build and operate

- [Set up an archive node](/en/setup/) — official documentation, Docker, and Docker Compose.
- [Node operation rules](/en/operations/) — telemetry, uptime, monitoring, recovery, and Identity.
- [Rewards and payments](/en/rewards/) — eligibility, condition priorities, conversion, and timing.

## Maintenance and troubleshooting

- [Storage migration guide](/en/maintenance/) — XFS migration from a 2 TB HDD to a 5 TB HDD.
- [Astar Peers Program — Troubleshooting Guide and FAQ](https://medium.com/@sequaja.marco/astar-peers-program-troubleshooting-guide-and-faq-a6958a76d021) / Author: Sequaja.
- [Technical articles and previous proposals](/en/resources/).

## Get help

Find the Builder Role and the #peers-program channel in the [community guide](/en/community/#astar-network-discord).
`);
console.log('Imported 14 original pages into 11 consolidated English articles.');
