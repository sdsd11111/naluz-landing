"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    return (
        <motion.a
            href="https://wa.me/593993441107"
            target="_blank"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center group"
        >
            <MessageCircle size={32} fill="white" />
            <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-md text-white text-xs font-bold py-2 px-4 rounded-xl opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap border border-white/10">
                ¿Necesitas ayuda técnica?
            </span>
            <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping" />
        </motion.a>
    );
};

export default WhatsAppButton;
