'use client';
import Container from '@/components/Container';
import { useStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function CartPage(){
  const { cart, remove, setQty, setCoupon } = useStore();
  const [promo, setPromo] = useState('');
  const total = useMemo(()=> cart.reduce((a,c)=>a+c.price*c.qty,0), [cart]);
  return (<section className="py-12">
    <Container>
      <h1 className="text-3xl font-serif mb-6">Корзина</h1>
      {cart.length===0? (<p>Корзина пуста. <Link href="/catalog/page/1" className="text-primary underline">Вернуться в каталог</Link></p>) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item=>(
              <div key={item.slug+(item.variant||'')} className="flex items-center gap-4 rounded-md border border-gray-200 p-3">
                {item.image && <div className="relative w-20 h-16"><Image src={item.image} alt={item.title} fill className="object-cover rounded-md" /></div>}
                <div className="flex-1">
                  <div className="font-medium">{item.title}{item.variant?` — ${item.variant}`:''}</div>
                  <div className="text-sm text-textSecondary">{item.price} ₽</div>
                  <div className="mt-2 inline-flex items-center gap-2">
                    <button aria-label="Уменьшить" className="px-2 py-1 rounded border" onClick={()=>setQty(item.slug, item.qty-1, item.variant)}>-</button>
                    <input aria-label="Количество" className="w-12 text-center rounded border" type="number" min={1} max={Math.min(99, item.inStock ?? 99)} value={item.qty} onChange={e=>setQty(item.slug, Number(e.target.value), item.variant)} />
                    <button aria-label="Увеличить" className="px-2 py-1 rounded border" onClick={()=>setQty(item.slug, item.qty+1, item.variant)}>+</button>
                  </div>
                </div>
                <button className="text-sm text-red-600 underline" onClick={()=>remove(item.slug, item.variant)}>Удалить</button>
              </div>
            ))}
          </div>
          <aside className="rounded-md border border-gray-200 p-4 h-fit">
            <div className="flex items-center justify-between"><span>Итого</span><span className="text-xl font-semibold">{total} ₽</span></div>
            <div className="mt-4">
              <label className="text-sm text-textSecondary">Промокод</label>
              <div className="mt-1 flex gap-2">
                <input value={promo} onChange={e=>setPromo(e.target.value)} className="flex-1 rounded-md border border-gray-200 px-3 py-2" placeholder="Введите код" />
                <button onClick={()=>setCoupon(promo)} className="px-4 py-2 rounded-md border">Применить</button>
              </div>
            </div>
            <Link href="/checkout" className="mt-4 block text-center bg-primary text-white rounded-md py-2 hover:opacity-95">Оформить</Link>
          </aside>
        </div>
      )}
    </Container>
  </section>);
}
