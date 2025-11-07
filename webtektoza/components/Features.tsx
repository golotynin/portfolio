'use client';
import { motion } from 'framer-motion';
import Container from './Container';
const items=[
  { title:'Отборные сорта', text:'Мы бережно выбираем сорта с малых плантаций.' },
  { title:'Прямые поставки', text:'Без посредников — справедливая цена и свежесть.' },
  { title:'Ритуал и вкус', text:'Советы по завариванию и сервировке для каждого чая.' },
  { title:'Экологичная упаковка', text:'Минимум пластика, перерабатываемые материалы.' }
];
export default function Features(){
  return (<section id="features" className="py-16 bg-paper">
    <Container>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((i,idx)=>(
          <motion.div key={i.title} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6, delay: idx*0.06, ease:[0.16,1,0.3,1]}}
            className="rounded-md border border-gray-200 bg-white p-5">
            <h3 className="font-medium">{i.title}</h3>
            <p className="mt-2 text-sm text-textSecondary">{i.text}</p>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>);
}
