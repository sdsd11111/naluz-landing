"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Zap, Sun, Moon, Cloud, ChevronDown } from 'lucide-react';

const VideoExperience = () => {
    const [isOpen, setIsOpen] = useState(false);

    const tones = [
        { icon: <Sun size={14} />, label: "Cálida 3000K", color: "text-amber-400" },
        { icon: <Cloud size={14} />, label: "Neutra 4000K", color: "text-white" },
        { icon: <Moon size={14} />, label: "Fría 6000K", color: "text-blue-300" }
    ];

    return (
        <section
            id="experiencia"
            className="relative pt-12 pb-24 bg-black overflow-hidden"
        >
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
                            Tecnología que <br /> <span className="text-gold italic">da vida a tus espacios</span>
                        </h2>

                        <p className="text-base md:text-xl text-white/70 font-sans max-w-2xl mx-auto leading-relaxed">
                            Mira cómo nuestra tecnología LED de tres tonos transforma ambientes de frío a cálido al instante. Eficiencia de hasta 133.33 lm/W para que pagues menos en tu planilla de luz.
                        </p>
                    </motion.div>
                </div>

                <div className="w-full relative aspect-[4/5] md:aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    {/* Static Image Poster for Performance */}
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src="/images/product-6.webp"
                            alt="Tecnología de iluminación LED 3 tonos en Loja - Naluz"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        {/* Subtle Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>

                    {/* Overlay Content: Play Button ONLY */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold flex items-center justify-center text-black shadow-2xl shadow-gold/40 transition-transform group-hover:scale-110">
                                <Play size={32} className="md:size-[40px]" fill="currentColor" />
                            </div>
                            <span className="text-white font-sans font-bold text-lg md:text-xl uppercase tracking-[0.2em] group-hover:text-gold transition-colors">Ver video</span>
                        </div>
                    </div>

                    {/* Lighting Tones Badge Group - Responsive */}
                    <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full flex flex-wrap justify-center gap-2 md:gap-4 px-4 md:px-6">
                        {tones.map((tone, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-1.5 md:gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full"
                            >
                                <span className={tone.color}>{tone.icon}</span>
                                <span className="text-white/90 text-[10px] md:text-xs font-sans font-medium">{tone.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Video Modal Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-[400px] md:max-w-6xl aspect-[9/16] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black"
                        >
                            <video
                                autoPlay
                                controls
                                className="w-full h-full object-contain"
                            >
                                <source src="/video/video.mp4" type="video/mp4" />
                            </video>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}
                                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
                            >
                                <X size={24} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default VideoExperience;
