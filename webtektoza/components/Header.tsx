'use client';
import { useStore } from '@/lib/store';
import Logo from './Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Header() {
  const count = useStore(s => s.cart.reduce((a, c) => a + c.qty, 0));
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#catalog" className="hover:text-primary">Каталог</Link>
          <Link href="/#features" className="hover:text-primary">Преимущества</Link>
          <Link href="/#news" className="hover:text-primary">Новости</Link>
          <Link href="/#map" className="hover:text-primary">Где мы</Link>
        </nav>
        <Link href="/cart" className="relative rounded-md border border-gray-200 px-3 py-2 hover:shadow-soft transition-all" aria-label="Корзина">
          <span>Корзина</span>

          {/* Плашку рендерим только после монтирования на клиенте,
              чтобы не было рассинхронизации HTML от сервера */}
          {mounted && count > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 250, damping: 24 }}
              className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center"
            >
              {count}
            </motion.span>
          )}
        </Link>
      </div>
    </header>
  );
}
