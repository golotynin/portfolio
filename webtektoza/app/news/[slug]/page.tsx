import fs from 'node:fs';
import path from 'node:path';
import Container from '@/components/Container';

export default function NewsPage({ params }: { params: { slug: string }}){
  const file = path.join(process.cwd(), 'content', 'news', params.slug + '.md');
  const raw = fs.readFileSync(file, 'utf8');
  const [fm, ...rest] = raw.split('\n---\n');
  const meta = JSON.parse(fm.replace(/^---\n?/, '').replace(/\n?---$/, '') || '{}');
  const body = rest.join('\n---\n');
  return (<section className="py-12">
    <Container>
      <div className="text-xs text-textSecondary">{new Date(meta.date).toLocaleDateString('ru-RU')}</div>
      <h1 className="text-3xl font-serif mt-2">{meta.title}</h1>
      <article className="prose prose-neutral max-w-none mt-6 whitespace-pre-wrap">{body}</article>
    </Container>
  </section>);
}
