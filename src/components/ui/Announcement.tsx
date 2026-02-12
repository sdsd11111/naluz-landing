"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, FileDown } from 'lucide-react';

interface Announcement {
    id: number;
    title: string;
    offer: string;
    description: string;
    image_filename: string | null;
    pdf_filename: string | null;
    active: boolean;
}

const Announcement = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFloatingVisible, setIsFloatingVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await fetch('/api/announcements');
            const data = await res.json();
            if (data.success && data.data.length > 0) {
                setAnnouncements(data.data);
                // Iniciar con el modal
                setTimeout(() => setIsModalVisible(true), 1000);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        // Mostrar la burbuja flotante después de cerrar el modal
        setTimeout(() => setIsFloatingVisible(true), 500);
    };

    const handleNext = () => {
        if (currentIndex < announcements.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsFloatingVisible(false);
        }
    };

    if (announcements.length === 0) return null;

    const currentAnnouncement = announcements[currentIndex];

    return (
        <>
            <AnimatePresence>
                {/* MODAL VERSION (Splash on Load) */}
                {isModalVisible && currentAnnouncement && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-anthracite border border-gold/40 rounded-[2.5rem] p-0 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] pointer-events-none" />

                            <button
                                onClick={handleCloseModal}
                                className="absolute top-6 right-6 text-white/30 hover:text-gold transition-colors z-30 w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full"
                            >
                                <X size={24} />
                            </button>

                            <div className="relative z-10 flex flex-col">
                                <div className="relative">
                                    {currentAnnouncement.image_filename ? (
                                        <div className="w-full aspect-[16/10] md:aspect-video overflow-hidden">
                                            <img
                                                src={`/uploads/${currentAnnouncement.image_filename}`}
                                                alt={currentAnnouncement.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-transparent to-transparent" />
                                        </div>
                                    ) : (
                                        <div className="pt-12 px-8 flex justify-center">
                                            <div className="w-20 h-20 rounded-3xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-xl shadow-gold/5">
                                                <Lightbulb size={40} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Overlaid Badge - Moved outside overflow container to avoid clipping */}
                                    {currentAnnouncement.offer && (
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
                                            <span className="bg-gold text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.4)] border border-white/20 whitespace-nowrap">
                                                {currentAnnouncement.offer}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className={`p-8 md:p-10 text-center ${currentAnnouncement.image_filename ? 'pt-14' : ''}`}>
                                    {!currentAnnouncement.image_filename && currentAnnouncement.offer && (
                                        <span className="inline-block bg-gold text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6">
                                            {currentAnnouncement.offer}
                                        </span>
                                    )}

                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                                        {currentAnnouncement.title}
                                    </h2>

                                    <p className="text-white/60 text-lg font-sans leading-relaxed mb-8 mx-auto max-w-sm">
                                        {currentAnnouncement.description}
                                    </p>

                                    <div className="flex flex-col gap-4 w-full">
                                        {currentAnnouncement.pdf_filename && (
                                            <a
                                                href={`/uploads/${currentAnnouncement.pdf_filename}`}
                                                download
                                                className="w-full flex items-center justify-center gap-3 bg-gold hover:bg-amber text-black py-4 md:py-5 rounded-2xl font-sans font-bold text-lg transition-all shadow-xl shadow-gold/30 hover:scale-[1.02] active:scale-[0.98]"
                                            >
                                                <FileDown size={24} />
                                                <span>Descargar Catálogo PDF</span>
                                            </a>
                                        )}
                                        <button
                                            onClick={handleCloseModal}
                                            className="w-full py-4 text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                                        >
                                            Continuar Explorando
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {/* FLOATING VERSION (Compact) */}
                {isFloatingVisible && currentAnnouncement && (
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[60] w-[200px] md:w-[320px] max-w-[calc(100vw-48px)]"
                    >
                        <div className="bg-anthracite/95 border border-gold/30 rounded-2xl md:rounded-3xl shadow-2xl shadow-gold/10 backdrop-blur-xl relative overflow-hidden group">
                            {/* Image Header for Floating Version */}
                            {currentAnnouncement.image_filename && (
                                <div className="w-full h-20 md:h-32 overflow-hidden relative">
                                    <img
                                        src={`/uploads/${currentAnnouncement.image_filename}`}
                                        alt={currentAnnouncement.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-anthracite/95 via-transparent to-black/20" />
                                </div>
                            )}

                            <button
                                onClick={() => setIsFloatingVisible(false)}
                                className="absolute top-2 right-2 text-white/50 hover:text-gold transition-colors z-20 p-1 bg-black/20 backdrop-blur-sm rounded-full"
                            >
                                <X size={14} />
                            </button>

                            <div className={`p-3 md:p-5 relative z-10 flex flex-col gap-2 md:gap-3 ${currentAnnouncement.image_filename ? '-mt-4' : ''}`}>
                                <div className="flex items-center gap-2 md:gap-3">
                                    {!currentAnnouncement.image_filename && (
                                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold">
                                            <Lightbulb size={14} className="md:hidden" />
                                            <Lightbulb size={20} className="hidden md:block" />
                                        </div>
                                    )}
                                    {currentAnnouncement.offer && (
                                        <span className="bg-gold text-black px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest shadow-sm">
                                            {currentAnnouncement.offer}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-0.5 md:space-y-1">
                                    <h4 className="text-sm md:text-lg font-serif font-bold text-white tracking-tight leading-tight">
                                        {currentAnnouncement.title}
                                    </h4>
                                    <p className="text-white/60 text-[10px] md:text-xs leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                                        {currentAnnouncement.description}
                                    </p>
                                </div>

                                <div className="flex gap-2 pt-1">
                                    {currentAnnouncement.pdf_filename && (
                                        <a
                                            href={`/uploads/${currentAnnouncement.pdf_filename}`}
                                            download
                                            className="flex-1 flex items-center justify-center gap-1 bg-gold hover:bg-amber text-black py-1.5 md:py-2.5 rounded-lg md:rounded-xl font-sans font-bold text-[10px] md:text-xs transition-all shadow-lg shadow-gold/10"
                                        >
                                            <FileDown size={12} className="md:hidden" />
                                            <FileDown size={14} className="hidden md:block" />
                                            <span>Ver Catálogo</span>
                                        </a>
                                    )}
                                    {announcements.length > 1 && (
                                        <button
                                            onClick={handleNext}
                                            className="px-2 py-1.5 md:px-3 md:py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg md:rounded-xl text-white/60 hover:text-white text-[9px] md:text-xs font-bold transition-all"
                                        >
                                            Siguiente
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Announcement;
