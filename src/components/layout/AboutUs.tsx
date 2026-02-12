"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart, MapPin, ExternalLink } from 'lucide-react';

const AboutUs = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" as any }
    };

    const values = [
        {
            icon: <ShieldCheck className="text-gold" size={32} />,
            title: "Sofisticación",
            desc: "Diseños que siguen tendencias internacionales, elevando la estética de la arquitectura lojana."
        },
        {
            icon: <Zap className="text-gold" size={32} />,
            title: "Eficiencia Energética",
            desc: "Nuestras soluciones LED de alta gama combinan ahorro energético con una calidez inigualable."
        },
        {
            icon: <Heart className="text-gold" size={32} />,
            title: "Cercanía Comunitaria",
            desc: "Somos más que una tienda; somos un vecino comprometido con el bienestar de Loja."
        }
    ];

    return (
        <section id="nosotros" className="pt-24 pb-12 bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Asymmetric Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">

                    {/* Visual Element (warm lighting) */}
                    <motion.div
                        {...fadeIn}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                            <Image
                                src="/images/about-essencia-1.webp"
                                alt="Tienda de Material Eléctrico Naluz en el centro de Loja"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent" />

                            {/* Location Badge Overlay */}
                            <div className="absolute bottom-8 left-8 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <MapPin className="text-gold" size={20} />
                                    <div>
                                        <p className="text-white text-xs font-bold uppercase tracking-widest">Encuéntranos</p>
                                        <p className="text-white/60 text-[10px]">Celica y 18 de Noviembre, Loja</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Gold Leaf */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-gold/30 rounded-tr-3xl -z-10" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-gold/30 rounded-bl-3xl -z-10" />
                    </motion.div>

                    {/* Story Block */}
                    <motion.div
                        {...fadeIn}
                        className="lg:col-span-7 flex flex-col gap-8"
                    >
                        <div className="space-y-4">
                            <span className="text-gold text-sm font-sans tracking-[0.3em] uppercase font-bold">Nuestra Esencia</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                                Más que una ferretería, tu aliado en <span className="text-gold italic">proyectos eléctricos</span>.
                            </h2>
                        </div>

                        <div className="space-y-6 text-white/70 font-sans text-lg leading-relaxed">
                            <p>
                                Ubicados estratégicamente en la intersección de las calles <span className="text-white font-bold">Celica y 18 de Noviembre</span>, Naluz nació para transformar la arquitectura lojana. Nos diferenciamos por ofrecer una curaduría experta que se aleja de la frialdad técnica tradicional, enfocándonos en soluciones que aportan valor estético y ahorro real.
                            </p>
                        </div>

                        {/* Values Cards */}
                        <div className="flex md:grid md:grid-cols-3 gap-6 pt-6 overflow-x-auto pb-4 md:pb-0 snap-x hide-scrollbar">
                            {values.map((v, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2, duration: 0.5 }}
                                    className="min-w-[280px] md:min-w-0 p-6 rounded-2xl bg-anthracite border border-white/5 hover:border-gold/30 transition-all group snap-center"
                                >
                                    <div className="mb-4 transform group-hover:scale-110 transition-transform">{v.icon}</div>
                                    <h4 className="text-white font-serif font-bold text-lg mb-2">{v.title}</h4>
                                    <p className="text-white/50 text-xs leading-relaxed">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default AboutUs;
