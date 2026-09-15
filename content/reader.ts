import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
export type Kind = 'work'|'blog'|'lab';
export type Entry = {slug:string;title:string;summary:string;body:string;date:string;order:number};
export function entries(kind:Kind):Entry[]{const dir=path.join(process.cwd(),'content',kind);if(!fs.existsSync(dir))return [];return fs.readdirSync(dir).filter(f=>f.endsWith('.mdx')).flatMap(file=>{const {data,content}=matter(fs.readFileSync(path.join(dir,file),'utf8'));if(data.status!=='published')return [];if(typeof data.title!=='string'||typeof data.summary!=='string')throw new Error('Missing title/summary: '+file);return [{slug:file.replace(/\.mdx$/,''),title:data.title,summary:data.summary,date:String(data.date||''),order:Number(data.order??99),body:content}]}).sort((a,b)=>a.order-b.order||b.date.localeCompare(a.date));}
