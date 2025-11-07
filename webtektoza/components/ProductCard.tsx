'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from './Button';
import { useStore } from '@/lib/store';

type Props = { product: { title:string; slug:string; price:number; oldPrice?:number; images:string[]; description:string; variants?:{name:string; grams?:number; price?:number}[]; inStock?:number; } };

export default function ProductCard({product}:Props){
  const add = useStore(s=>s.add);
  const primary = product.images?.[0] || '/tea/sample.jpg';
  const price = product.variants?.[0]?.price ?? product.price;
  return (
    <motion.article initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6,ease:[0.16,1,0.3,1]}} whileHover={{scale:1.02}}
      className="group rounded-md border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-soft">
      <div className="relative aspect-[4/3]"><Image src={primary} alt={product.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" /></div>
      <div className="p-4">
        <h3 className="font-medium">{product.title}</h3>
        <p className="mt-1 text-sm text-textSecondary line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">{price} ₽</span>
            {product.oldPrice && <span className="text-sm text-textSecondary line-through">{product.oldPrice} ₽</span>}
          </div>
          <Button onClick={()=>add({slug:product.slug, title:product.title, price, image:primary, inStock:product.inStock},1)}>Добавить</Button>
        </div>
      </div>
    </motion.article>
  );
}
