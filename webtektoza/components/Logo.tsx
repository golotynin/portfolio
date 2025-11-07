'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Logo(){
  return (
    <Link href="/" aria-label="TEKTOZA">
      <motion.div initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} transition={{duration:.6,ease:[0.16,1,0.3,1]}}
        className="inline-flex items-center gap-2">
        <div className="relative w-9 h-9 rounded-md border border-gray-200 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-primary" />
          <span className="font-serif text-xl tracking-wide">T</span>
        </div>
        <span className="text-xl font-semibold tracking-wide">TEKTOZA</span>
      </motion.div>
    </Link>
  );
}
