"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'py-4 bg-black/40 backdrop-blur-md border-b border-white/10'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10">
                        <Image
                            src="/images/Logo.webp"
                            alt="Naluz Logo"
                            fill
                            className="object-contain"
                            priority
                            unoptimized
                        />
                    </div>
                    <span className="text-white font-serif font-bold text-2xl tracking-tight group-hover:text-gold transition-colors uppercase">NALUZ</span>
                </Link>

                {/* Desktop Nav */}

                {/* CTA Button Desktop */}
                <div className="hidden md:block">
                    <Link
                        href="https://wa.me/593996264362"
                        target="_blank"
                        className="flex items-center gap-2 bg-gold hover:bg-amber text-black px-6 py-2.5 rounded-full font-sans font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-gold/20"
                    >
                        <MessageCircle size={18} />
                        <span>Asesoría Directa</span>
                    </Link>
                </div>

                {/* CTA Button Mobile */}
                <div className="md:hidden">
                    <Link
                        href="https://wa.me/593996264362"
                        target="_blank"
                        className="flex items-center gap-2 bg-gold text-black px-4 py-2 rounded-full font-sans font-bold text-xs uppercase tracking-tight shadow-lg shadow-gold/20"
                    >
                        <MessageCircle size={14} />
                        <span>Asesoría</span>
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default Header;
