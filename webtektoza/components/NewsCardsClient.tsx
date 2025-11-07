'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
export type NewsItem={title:string; slug:string; date:string; cover?:string; excerpt?:string;};
export default function NewsCardsClient({items}:{items:NewsItem[]}){
  return (<section id="news" className="py-16">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif">Новости и статьи</h2>
        <Link href="/news" className="text-primary hover:underline">Все публикации</Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((n,idx)=>(
          <motion.article key={n.slug} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            transition={{duration:.6, delay: idx*0.06, ease:[0.16,1,0.3,1]}} className="rounded-md border border-gray-200 bg-white overflow-hidden">
            {n.cover && <div className="relative aspect-[4/3]"><Image src={n.cover} alt={n.title} fill className="object-cover" /></div>}
            <div className="p-4">
              <time className="text-xs text-textSecondary">{new Date(n.date).toLocaleDateString('ru-RU')}</time>
              <h3 className="mt-2 font-medium">{n.title}</h3>
              {n.excerpt && <p className="mt-1 text-sm text-textSecondary line-clamp-2">{n.excerpt}</p>}
              <Link className="mt-3 inline-flex text-primary hover:underline" href={`/news/${n.slug}`}>Читать</Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>);
}
