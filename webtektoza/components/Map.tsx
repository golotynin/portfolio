'use client';
import dynamic from 'next/dynamic';
const Leaf = dynamic(()=>import('./MapClient'), { ssr:false, loading:()=> <div className="h-[380px] rounded-md border border-gray-200 bg-cream animate-pulse" /> });
export default function Map({center,address}:{center:[number,number]; address:string}){ return <Leaf center={center} address={address} />; }
