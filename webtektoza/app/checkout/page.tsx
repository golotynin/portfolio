'use client';
import Container from '@/components/Container';
import { useStore } from '@/lib/store';
import { useMemo, useState } from 'react';

export default function Checkout(){
  const cart = useStore(s=>s.cart);
  const clear = useStore(s=>s.clear);
  const total = useMemo(()=> cart.reduce((a,c)=>a+c.price*c.qty,0), [cart]);
  const [done, setDone] = useState(false);
  if(done){return (<section className="py-12"><Container><h1 className="text-3xl font-serif">Спасибо!</h1><p className="mt-2">Мы свяжемся с вами для подтверждения заказа.</p></Container></section>);}
  return (<section className="py-12">
    <Container>
      <h1 className="text-3xl font-serif mb-6">Оформление заказа</h1>
      <form onSubmit={(e)=>{e.preventDefault(); clear(); setDone(true);}} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div><label className="block text-sm">Имя</label><input required className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-sm">Телефон</label><input required type="tel" className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2" /></div>
            <div><label className="block text-sm">E-mail</label><input type="email" className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2" /></div>
          </div>
          <div><label className="block text-sm">Доставка/самовывоз</label>
            <select className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2"><option>Самовывоз</option><option>Курьер по городу</option></select></div>
          <div><label className="block text-sm">Комментарий</label><textarea className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2" rows={4} /></div>
        </div>
        <aside className="rounded-md border border-gray-200 p-4 h-fit">
          <div className="flex items-center justify-between"><span>К оплате</span><span className="text-xl font-semibold">{total} ₽</span></div>
          <button className="mt-4 w-full bg-primary text-white rounded-md py-2 hover:opacity-95">Подтвердить заказ</button>
        </aside>
      </form>
    </Container>
  </section>);
}
