import cn from 'classnames';
import Link from 'next/link';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'|'a'; href?: string; size?: 'sm'|'md'|'lg' };
export default function Button({as='button', href, size='md', className, children, ...rest}:Props){
  const cls = cn(
    'inline-flex items-center justify-center rounded-md bg-primary text-white shadow-soft hover:shadow transition-transform',
    'hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-none',
    size==='sm' && 'px-3 py-2 text-sm', size==='md'&&'px-4 py-2.5', size==='lg'&&'px-5 py-3 text-lg',
    className
  );
  if(as==='a' && href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
