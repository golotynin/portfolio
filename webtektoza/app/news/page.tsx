import Container from '@/components/Container';
import { getNews } from '@/lib/content';
import Link from 'next/link';
export default function NewsList(){
  const news = getNews();
  return (<section className="py-12">
    <Container>
      <h1 className="text-3xl font-serif mb-6">Новости и статьи</h1>
      <ul className="space-y-3">
        {news.map(n=>(
          <li key={n.slug} className="rounded-md border border-gray-200 p-4">
            <div className="text-xs text-textSecondary">{new Date(n.date).toLocaleDateString('ru-RU')}</div>
            <Link href={`/news/${n.slug}`} className="text-lg font-medium hover:underline">{n.title}</Link>
            {n.excerpt && <p className="text-sm text-textSecondary mt-1">{n.excerpt}</p>}
          </li>
        ))}
      </ul>
    </Container>
  </section>);
}
