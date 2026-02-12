"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, HelpCircle, MapPin } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <div className="border-b border-gold/30 last:border-0 overflow-hidden">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-6 px-4 md:px-8 text-left hover:bg-white/5 transition-colors group"
            >
                <span className={`text-lg md:text-xl font-sans font-bold transition-colors ${isOpen ? 'text-gold' : 'text-white/80 group-hover:text-white'}`}>
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? '#D4AF37' : '#FFFFFF66' }}
                    className="flex-shrink-0 ml-4"
                >
                    <Plus size={28} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-4 md:px-8 pb-8 text-white/70 font-sans leading-relaxed text-base md:text-lg bg-anthracite/20">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const questions = [
        {
            question: "¿Donde comprar material eléctrico en Loja de alta calidad?",
            answer: (
                <p>
                    En <strong>Naluz</strong>, ubicados en la intersección de Celica y 18 de Noviembre. Ofrecemos desde bombillas LED Bullet de alta potencia hasta calefactores duales adaptados al clima lojano.
                </p>
            )
        },
        {
            question: "¿Qué ahorro ofrece la iluminación LED de Naluz?",
            answer: (
                <p>
                    Nuestras soluciones LED de alta gama consumen hasta un <strong>40% menos</strong> que las tecnologías incandescentes, manteniendo un flujo lumínico superior y reduciendo significativamente tu planilla de luz en Loja.
                </p>
            )
        },
        {
            question: "¿Qué beneficio tiene la tecnología LED de 3 tonos en mis espacios?",
            answer: (
                <p>
                    Permite alternar entre luz cálida (<strong>3000K</strong>), neutra (<strong>4000K</strong>) y fría (<strong>6000K</strong>). Es la solución ideal para la variabilidad lumínica de Loja, ajustando el ambiente según la actividad.
                </p>
            )
        },
        {
            question: "¿Por qué elegir tomacorrientes universales SCHUKO?",
            answer: (
                <p>
                    Ofrecen compatibilidad universal para los diversos dispositivos electrónicos usados en Loja y mayor seguridad ante cortocircuitos o sobrecalentamiento, protegiendo tus instalaciones de <strong>125-250V</strong>.
                </p>
            )
        },
        {
            question: "¿Cómo ayuda Naluz a mejorar el confort térmico en mi hogar?",
            answer: (
                <p>
                    Ofrecemos unidades duales de calefactor y ventilador (<strong>800-1500W</strong>) con termostato ajustable. Son la solución perfecta para el clima lojano, donde las noches pueden ser frías y los mediodías calurosos.
                </p>
            )
        }
    ];

    return (
        <section id="faq" className="py-24 bg-black relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 text-gold bg-gold/10 px-4 py-2 rounded-full mb-4"
                    >
                        <HelpCircle size={18} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Asesoría Lumínica</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Preguntas <span className="text-gold italic">Frecuentes</span>
                    </h2>
                    <p className="text-white/40 font-sans max-w-2xl mx-auto">
                        Resolvemos tus dudas técnicas sobre eficiencia energética y diseño decorativo para transformar tus espacios.
                    </p>
                </div>

                <div className="bg-anthracite/30 rounded-[2.5rem] border border-white/10 overflow-hidden backdrop-blur-sm">
                    {questions.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>

                {/* Local SEO Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-12 text-center"
                >
                    <div className="inline-flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl group hover:border-gold/30 transition-all cursor-default">
                        <MapPin size={20} className="text-gold" />
                        <p className="text-white/60 font-sans text-sm md:text-base">
                            ¿Tienes más dudas técnicas? <span className="text-white font-bold">Visítanos en la Celica y 18 de Noviembre</span> para una asesoría personalizada.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;
