"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Send, MessageCircle, ShieldCheck, Heart } from 'lucide-react';

const ContactLocation = () => {
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        projectType: 'Hogar',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, ''); // Only numbers
        setFormData({ ...formData, whatsapp: val });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', whatsapp: '', projectType: 'Hogar', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section id="ubicacion" className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-gold text-sm font-sans tracking-[0.3em] uppercase font-bold block mb-4">Ubicación & Contacto</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                        Tu proveedor de confianza en el <span className="text-gold italic">centro de Loja</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* Left: Map & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="bg-anthracite/50 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gold/10 rounded-2xl text-gold">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold font-sans mb-1 text-lg">Nuestra Tienda</h4>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        Esquina de las calles <span className="text-white font-bold">Celica y 18 de Noviembre</span>,<br />
                                        Loja, Ecuador.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gold/10 rounded-2xl text-gold">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold font-sans mb-1 text-lg">Atención Directa</h4>
                                    <p className="text-white/60 text-sm">WhatsApp: <span className="text-white font-bold">+593 99 626 4362</span></p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gold/10 rounded-2xl text-gold">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold font-sans mb-1 text-lg">Horarios</h4>
                                    <p className="text-white/60 text-sm">Lunes a Sábado: 8:30 AM — 7:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Container */}
                        <div className="flex-grow min-h-[350px] rounded-[2.5rem] overflow-hidden border border-white/10 relative shadow-2xl">
                            {/* Embedded Google Map (Dark-ish mode can be forced via CSS filters) */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.069966257073!2d-79.2034951!3d-4.0060391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cb373c9b254913%3A0x92662d1cf07bd8ef!2sNALUZ!5e0!3m2!1ses-419!2sec!4v1770906379063!5m2!1ses-419!2sec"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full grayscale opacity-80 contrast-125"
                            ></iframe>
                            <a
                                href="https://maps.app.goo.gl/NaluzLoja"
                                target="_blank"
                                className="absolute top-4 left-4 bg-black/60 hover:bg-gold hover:text-black backdrop-blur-md px-4 py-2 rounded-full border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 group/map"
                            >
                                <MapPin size={12} className="group-hover/map:animate-bounce" />
                                Ubicación Estratégica
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-anthracite/50 backdrop-blur-md p-10 md:p-12 rounded-[2.5rem] border border-white/10 h-full flex flex-col gap-6"
                        >
                            <div className="mb-4 text-center lg:text-left">
                                <h3 className="text-3xl font-serif font-bold text-white mb-2 italic">Envíanos tu Consulta</h3>
                                <p className="text-white/40 text-sm">Nuestro equipo técnico te responderá en menos de 24 horas.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-white/40 ml-2 tracking-widest">Nombre Completo</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold transition-colors font-sans"
                                    placeholder="Ej. Juan Pérez"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2 tracking-widest">WhatsApp</label>
                                    <input
                                        type="tel"
                                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold transition-colors font-sans"
                                        placeholder="+593 99 626 4362"
                                        value={formData.whatsapp}
                                        onChange={handleWhatsappChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-white/40 ml-2 tracking-widest">Tipo de Proyecto</label>
                                    <select
                                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold transition-colors font-sans appearance-none cursor-pointer"
                                        value={formData.projectType}
                                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                    >
                                        <option value="Hogar">Hogar / Residencial</option>
                                        <option value="Comercial">Comercio / Oficina</option>
                                        <option value="Técnico">Asesoría Técnica</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2 flex-grow">
                                <label className="text-xs uppercase font-bold text-white/40 ml-2 tracking-widest">Tu Mensaje</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold transition-colors font-sans resize-none"
                                    placeholder="Cuéntanos sobre tu necesidad de iluminación..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className={`group relative w-full font-sans font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 overflow-hidden ${status === 'success' ? 'bg-green-500 text-white' :
                                    status === 'error' ? 'bg-red-500 text-white' :
                                        'bg-gold hover:bg-amber-400 text-black'
                                    }`}
                            >
                                <div className={`absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 ${status === 'idle' ? 'group-hover:translate-y-0' : ''}`} />
                                <Send size={20} className={`relative z-10 ${status === 'loading' ? 'animate-pulse' : ''}`} />
                                <span className="relative z-10">
                                    {status === 'loading' ? 'Enviando...' :
                                        status === 'success' ? '¡Mensaje Enviado!' :
                                            status === 'error' ? 'Error. Intenta de nuevo.' :
                                                'Enviar Consulta Lumínica'}
                                </span>
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Final Footer / Confidence Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 pt-12 border-t border-white/5 text-center flex flex-col items-center gap-6"
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                            <Heart size={24} fill="currentColor" />
                        </div>
                        <p className="max-w-xl text-white/50 text-sm font-sans leading-relaxed">
                            Orgullosamente <span className="text-white font-bold italic">lojanos</span>. Apoyando a nuestra comunidad desde el corazón de la ciudad con soluciones que transforman cada rincón.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactLocation;
