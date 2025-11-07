import fs from 'node:fs';
import path from 'node:path';

export type Variant = { name: string; grams?: number; price?: number };
export type Product = { title: string; slug: string; price: number; oldPrice?: number; sku: string; variants?: Variant[]; inStock?: number; description: string; images: string[]; tags?: string[]; category?: string; };
export type News = { title: string; slug: string; date: string; cover?: string; excerpt?: string; content: string; tags?: string[]; };
export type Settings = { address: string; coords: { lat:number; lng:number }; workHours: { day:string; open:string; close:string }[]; contacts: { phone:string; telegram?:string; instagram?:string }; seo: { title:string; description:string; ogImage?: string } };

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readJSON<T>(rel: string): T { return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, rel), 'utf8')) as T; }

export function getSettings(): Settings { return readJSON<Settings>('settings.json'); }

function readMarkdown(dir: string) {
  const dirPath = path.join(CONTENT_DIR, dir);
  const files = fs.readdirSync(dirPath).filter(f=>f.endsWith('.md'));
  return files.map(f=>{
    const raw = fs.readFileSync(path.join(dirPath, f), 'utf8');
    const [fm, ...rest] = raw.split('\n---\n');
    const meta = JSON.parse(fm.replace(/^---\n?/, '').replace(/\n?---$/, '') || '{}');
    const body = rest.join('\n---\n');
    return { meta, body };
  });
}

export function getAllProducts(): Product[] {
  return readMarkdown('products').map((m:any)=>({ ...m.meta, description: m.body })) as Product[];
}

export function getProductsPaged(page:number, perPage:number) {
  const all = getAllProducts();
  const totalPages = Math.max(1, Math.ceil(all.length/perPage));
  const start = (page-1)*perPage;
  return { items: all.slice(start, start+perPage), totalPages, page };
}

export function getNews(limit?: number): News[] {
  const items = readMarkdown('news').map((m:any)=>({ ...m.meta, content: m.body })) as News[];
  const sorted = items.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
  return typeof limit==='number'? sorted.slice(0, limit): sorted;
}
