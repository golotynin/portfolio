'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from './Container';
import Button from './Button';

export default function Hero(){
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0,1], [0,-40]);
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div style={{y}} className="absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primarySubtle/60 via-transparent to-transparent" />
        <div className="absolute -top-10 left-1/3 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-32 right-1/4 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent" />
      </div>
      <Container>
        <div className="relative py-20 sm:py-28 lg:py-32 text-center">
          <motion.h1 initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-100px'}} transition={{duration:.7,ease:[0.16,1,0.3,1]}} className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight">Китайский чай, собранный мастерами</motion.h1>
          <motion.p initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.06, duration:.7,ease:[0.16,1,0.3,1]}} className="mt-4 text-textSecondary max-w-2xl mx-auto">Мягкая эстетика, восточные мотивы и бережное отношение к каждому листу.</motion.p>
          <div className="mt-8 flex items-center justify-center gap-3"><Button as="a" href="#catalog" size="lg">Смотреть ассортимент</Button></div>
        </div>
      </Container>
    </section>
  );
}
