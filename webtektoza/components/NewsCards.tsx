import { getNews } from '@/lib/content';
import NewsCardsClient from './NewsCardsClient';
export default function NewsCards(){
  const news = getNews(3).map(n=>({title:n.title, slug:n.slug, date:n.date, cover:n.cover, excerpt:n.excerpt}));
  return <NewsCardsClient items={news} />;
}
