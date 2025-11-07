import type { Metadata } from 'next';
import './globals.css';
import { getSettings } from '@/lib/content';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin','cyrillic'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin','cyrillic'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'TEKTOZA — Китайский чай',
  description: 'Китайский чай, собранный мастерами',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  const s = getSettings();
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`min-h-screen antialiased ${inter.variable} ${playfair.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context":"https://schema.org","@type":"Organization","name":"TEKTOZA","url":"https://example.com",
          "telephone": s.contacts.phone, "address": s.address
        })}} />
      </body>
    </html>
  );
}
