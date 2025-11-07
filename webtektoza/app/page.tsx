import Hero from '@/components/Hero';
import Features from '@/components/Features';
import NewsCards from '@/components/NewsCards';
import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { getProductsPaged, getSettings } from '@/lib/content';
import Map from '@/components/Map';
import Link from 'next/link';

export default function Home(){
  const catalog = getProductsPaged(1, 12);
  const s = getSettings();
  const center: [number, number] = [s.coords.lat, s.coords.lng];
  return (<>
    <Hero />
    <section id="catalog" className="py-16">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif">Ассортимент</h2>
          <Link href="/catalog/page/1" className="text-primary hover:underline">Смотреть всё</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalog.items.map(p=> <ProductCard key={p.slug} product={p as any} />)}
        </div>
      </Container>
    </section>
    <Features />
    <NewsCards />
    <section id="map" className="py-16 bg-paper">
      <Container>
        <h2 className="text-2xl font-serif mb-6">Как нас найти</h2>
        <Map center={center} address={s.address} />
        <div className="mt-4 flex flex-wrap gap-3">
          <a className="underline text-primary" href="https://yandex.ru/maps/?text=Сургут, улица Игоря Киртбая, 24/1" target="_blank" rel="noreferrer">Построить маршрут</a>
          <a className="underline text-primary" href="tel:+79224175531">Связаться</a>
        </div>
      </Container>
    </section>
  </>);
}
