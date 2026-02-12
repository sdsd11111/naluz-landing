"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, MapPin, Phone, Mail, Globe } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-3 mb-6 group">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/images/Logo.webp"
                                    alt="Naluz - Proveedor de Material Eléctrico Loja"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <span className="text-white font-serif font-bold text-xl tracking-tight uppercase group-hover:text-gold transition-colors">NALUZ</span>
                        </div>
                        <p className="text-white/50 font-sans text-sm leading-relaxed mb-6 max-w-sm">
                            Transformamos espacios con diseño sofisticado y tecnología LED de vanguardia. La elegancia de Loja ahora tiene nombre propio.
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://instagram.com/naluz_19" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-gold hover:text-black transition-all">
                                <Instagram size={20} />
                            </Link>
                            <Link href="https://facebook.com/naluz" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-gold hover:text-black transition-all">
                                <Facebook size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Row: Quick Links & Contact */}
                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 md:contents">
                        {/* Column 2: Quick Links */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <h4 className="text-white font-serif font-bold text-lg mb-6">Enlaces Rápidos</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: 'Inicio', href: '#' },
                                    { name: 'Nosotros', href: '#nosotros' },
                                    { name: 'Productos', href: '#productos' },
                                    { name: 'Ubicación', href: '#ubicacion' },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-white/50 hover:text-gold transition-colors text-sm font-sans">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Contact */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <h4 className="text-white font-serif font-bold text-lg mb-6">Contacto</h4>
                            <ul className="space-y-4">
                                <li className="flex flex-col items-center md:items-start md:flex-row gap-3">
                                    <MapPin size={18} className="text-gold shrink-0 md:mt-1" />
                                    <span className="text-white/50 text-sm font-sans">
                                        Celica y 18<br className="md:hidden" /> de Nov.
                                    </span>
                                </li>
                                <li className="flex flex-col items-center md:items-start md:flex-row gap-3">
                                    <Phone size={18} className="text-gold shrink-0" />
                                    <span className="text-white/50 text-sm font-sans">+593 99 626 4362</span>
                                </li>
                                <li className="flex flex-col items-center md:items-start md:flex-row gap-3">
                                    <Mail size={18} className="text-gold shrink-0" />
                                    <span className="text-white/50 text-sm font-sans break-all">email@<br className="md:hidden" />naluzloja.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Map */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-white font-serif font-bold text-lg mb-6">Visítanos</h4>
                        <div className="aspect-video w-full max-w-sm md:max-w-none rounded-xl overflow-hidden border border-white/10 relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.069966257073!2d-79.2034951!3d-4.0060391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cb373c9b254913%3A0x92662d1cf07bd8ef!2sNALUZ!5e0!3m2!1ses-419!2sec!4v1770906379063!5m2!1ses-419!2sec"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale opacity-60 group-hover:opacity-100 transition-opacity"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <p className="text-white/30 text-xs font-sans">
                        Diseñado por <Link href="https://www.cesarreyesjaramillo.com/" target="_blank" className="text-white/60 hover:text-gold underline underline-offset-4">Cesar Reyes</Link> | Naluz Loja 2026
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-white/30 hover:text-white/60 text-[10px] uppercase tracking-widest font-sans">Términos</Link>
                        <Link href="#" className="text-white/30 hover:text-white/60 text-[10px] uppercase tracking-widest font-sans">Privacidad</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
