"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sun, BatteryCharging, ShieldCheck, ArrowUpRight, Cpu } from 'lucide-react';

interface ProductCardProps {
    category: string;
    title: string;
    image: string;
    span?: string;
    specs: { label: string; value: string; icon?: React.ReactNode }[];
    cta: string;
    glowColor: string;
}

const ProductCard = ({ category, title, image, span = "", specs, cta, glowColor }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative overflow-hidden rounded-3xl border border-white/10 group bg-anthracite flex flex-col ${span}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Glow Effect */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10`}
                style={{
                    boxShadow: isHovered ? `inset 0 0 50px ${glowColor}` : 'none'
                }}
            />

            {/* Content */}
            <div className="relative z-20 p-8 mt-auto flex flex-col h-full">
                <div className="mb-2">
                    <span className="text-gold text-[10px] uppercase tracking-[0.2em] font-sans font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        {category}
                    </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 leading-tight">
                    {title}
                </h3>

                {/* Hover-Reveal Specs */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3 mb-6"
                        >
                            <div className="grid grid-cols-1 gap-2 pt-4 border-t border-white/10">
                                {specs.map((spec, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs font-sans">
                                        <span className="text-white/40 flex items-center gap-2 uppercase tracking-tighter">
                                            {spec.icon} {spec.label}
                                        </span>
                                        <span className="text-white font-mono font-bold">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-auto flex items-center justify-between pointer-events-none">
                    <button className="text-white text-sm font-bold flex items-center gap-2 group/btn pointer-events-auto">
                        {cta}
                        <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>

                    {!isHovered && (
                        <div className="flex gap-1">
                            {specs.slice(0, 2).map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const ProductGrid = () => {
    const products = [
        {
            category: "Tendencia Interior",
            title: "Iluminación de Diseño 3 Tonos",
            image: "https://images.unsplash.com/photo-1540608273917-99abb2e63f53?q=80&w=2070&auto=format&fit=crop",
            span: "lg:col-span-8 lg:row-span-2 min-h-[400px]",
            glowColor: "rgba(212, 175, 55, 0.2)",
            cta: "Ver Detalles",
            specs: [
                { label: "Temperatura", value: "3000K | 4000K | 6000K", icon: <Sun size={12} /> },
                { label: "Modo", value: "Control Táctil / Switch", icon: <Cpu size={12} /> },
                { label: "Vida Útil", value: "20,000h" }
            ]
        },
        {
            category: "Máxima Potencia",
            title: "Bombilla LED BULLET 60W",
            image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop",
            span: "lg:col-span-4 lg:row-span-1 min-h-[300px]",
            glowColor: "rgba(255, 255, 255, 0.15)",
            cta: "Consultar Stock",
            specs: [
                { label: "Flujo Lumínico", value: "8000 Lúmenes", icon: <Zap size={12} /> },
                { label: "Eficiencia", value: "133.33 lm/W" }
            ]
        },
        {
            category: "Sostenibilidad",
            title: "Faroles Solares Fotovoltaicos",
            image: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?q=80&w=2060&auto=format&fit=crop",
            span: "lg:col-span-4 lg:row-span-2 min-h-[400px]",
            glowColor: "rgba(52, 211, 153, 0.15)",
            cta: "Ver Detalles",
            specs: [
                { label: "Autonomía", value: "12h continuas", icon: <BatteryCharging size={12} /> },
                { label: "Carga", value: "Solar Automática" },
                { label: "Resistencia", value: "IP65 Waterproof" }
            ]
        },
        {
            category: "Confort & Seguridad",
            title: "Sistemas SCHUKO & Clima",
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2069&auto=format&fit=crop",
            span: "lg:col-span-4 lg:row-span-1 min-h-[300px]",
            glowColor: "rgba(59, 130, 246, 0.15)",
            cta: "Consultar Stock",
            specs: [
                { label: "Seguridad", value: "Universal Certificada", icon: <ShieldCheck size={12} /> },
                { label: "Control", value: "Calefactores & Ventilación" }
            ]
        }
    ];

    return (
        <section id="productos" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-gold text-sm font-sans tracking-[0.3em] uppercase font-bold block mb-4"
                    >
                        Ingeniería Lumínica
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-white max-w-2xl leading-tight"
                    >
                        Colección <span className="text-gold italic">Exclusiva</span> & Soluciones Técnicas
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-auto">
                    {products.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>

                {/* Bottom CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-16 p-8 rounded-[2rem] bg-gold/5 border border-gold/10 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div>
                        <h4 className="text-2xl font-serif font-bold text-white mb-2">¿Buscas una solución para tu proyecto?</h4>
                        <p className="text-white/60 font-sans text-sm">Nuestro equipo de ingenieros y diseñadores te asesorarán sin costo.</p>
                    </div>
                    <button className="bg-gold text-black px-10 py-4 rounded-full font-sans font-bold text-lg hover:bg-amber transition-all shadow-xl shadow-gold/20 whitespace-nowrap">
                        Agendar Asesoría Técnica
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductGrid;
