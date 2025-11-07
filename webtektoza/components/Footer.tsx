import Container from './Container';
import Link from 'next/link';
import { getSettings } from '@/lib/content';
export default function Footer(){
  const s = getSettings();
  return (<footer className="mt-20 border-t border-gray-200 py-10 bg-white">
    <Container>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
        <div><div className="font-serif text-xl">TEKTOZA</div><p className="mt-2 text-textSecondary">{s.seo.description}</p></div>
        <div><div className="font-medium">Контакты</div><ul className="mt-2 space-y-1">
          <li><a href={`tel:${s.contacts.phone}`} className="hover:underline">{s.contacts.phone}</a></li>
          {s.contacts.telegram && <li><a className="hover:underline" href={s.contacts.telegram} target="_blank">Telegram</a></li>}
          {s.contacts.instagram && <li><a className="hover:underline" href={s.contacts.instagram} target="_blank">Instagram</a></li>}
        </ul></div>
        <div><div className="font-medium">Информация</div><ul className="mt-2 space-y-1">
          <li><Link className="hover:underline" href="/policy">Политика</Link></li>
          <li><Link className="hover:underline" href="/offer">Оферта</Link></li>
        </ul></div>
        <div><div className="font-medium">Адрес</div><p className="mt-2 text-textSecondary">{s.address}</p></div>
      </div>
      <div className="mt-8 text-xs text-textSecondary">© {new Date().getFullYear()} TEKTOZA</div>
    </Container>
  </footer>);
}
