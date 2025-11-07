import { create } from 'zustand';
export type CartItem = { slug:string; title:string; price:number; image?:string; qty:number; inStock?:number; variant?:string; };
type State = { cart: CartItem[]; add:(item:Omit<CartItem,'qty'>, qty?:number)=>void; remove:(slug:string,variant?:string)=>void; setQty:(slug:string, qty:number, variant?:string)=>void; clear:()=>void; coupon?:string; setCoupon:(c?:string)=>void; };
const KEY='tektoza_cart_v2';
const persisted = typeof window!=='undefined'? JSON.parse(localStorage.getItem(KEY)||'null'):null;
export const useStore=create<State>((set)=> ({
  cart: persisted?.cart||[], coupon: persisted?.coupon,
  add:(item,qty=1)=>set(s=>{ const key=(i:CartItem)=>i.slug+'|'+(i.variant||''); const ex=s.cart.find(i=>key(i)===item.slug+'|'+(item as any).variant); const next=Math.min(99,Math.max(1,(ex?.qty||0)+qty)); const limited=item.inStock!=null?Math.min(next,item.inStock):next; const cart=ex?s.cart.map(i=> (i.slug+'|'+(i.variant||''))===(item.slug+'|'+((item as any).variant||''))?{...i,qty:limited}:i):[...s.cart,{...item,qty:Math.min(99,Math.max(1,qty))}]; return {cart}; }),
  remove:(slug,variant)=>set(s=>({cart:s.cart.filter(i=>!(i.slug===slug && i.variant===variant))})),
  setQty:(slug,qty,variant)=>set(s=>{const q=Math.min(99,Math.max(1,qty));const cart=s.cart.map(i=> (i.slug===slug && i.variant===variant)?{...i,qty:i.inStock!=null?Math.min(q,i.inStock):q}:i); return {cart};}),
  clear:()=>set({cart:[]}),
  setCoupon:(c)=>set({coupon:c})
}));
if (typeof window!=='undefined'){ useStore.subscribe(s=>localStorage.setItem(KEY, JSON.stringify({cart:s.cart, coupon:s.coupon}))); }
