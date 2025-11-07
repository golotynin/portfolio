import Container from '@/components/Container';
import ProductCard from '@/components/ProductCard';
import { getProductsPaged } from '@/lib/content';
import Link from 'next/link';

export default function CatalogPage({ params }: { params: { page: string } }){
  const page = Math.max(1, Number(params.page) || 1);
  const { items, totalPages } = getProductsPaged(page, 12);
  return (<section className="py-12">
    <Container>
      <h1 className="text-3xl font-serif mb-6">Каталог</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p=> <ProductCard key={p.slug} product={p as any} />)}
      </div>
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({length: totalPages}, (_,i)=>i+1).map(i=>(
          <Link key={i} href={`/catalog/page/${i}`} className={`px-3 py-2 rounded-md border ${i===page?'bg-primary text-white border-primary':'border-gray-200 hover:bg-cream'}`}>{i}</Link>
        ))}
      </div>
    </Container>
  </section>);
}
