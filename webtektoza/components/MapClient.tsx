'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const icon=L.icon({ iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', iconAnchor:[12,41]});
export default function MapClient({center,address}:{center:[number,number]; address:string}){
  return (<MapContainer center={center} zoom={15} scrollWheelZoom={false}>
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={center} icon={icon}><Popup>{address}</Popup></Marker>
  </MapContainer>);
}
