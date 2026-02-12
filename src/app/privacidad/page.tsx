"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const PrivacyPage = () => {
    return (
        <main className="bg-black min-h-screen text-white/80 font-sans">
            <Header />
            <div className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-12">
                    Política de <span className="text-gold italic">Privacidad</span>
                </h1>

                <div className="space-y-8 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gold mb-4 uppercase tracking-wider">1. Recolección de Datos</h2>
                        <p>Solicitamos información personal solo cuando es realmente necesaria para brindarle un servicio, como consultas vía WhatsApp o contacto directo.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gold mb-4 uppercase tracking-wider">2. Uso de la Información</h2>
                        <p>Utilizamos sus datos para responder a sus solicitudes de asesoría técnica, procesar pedidos e informarle sobre novedades en nuestra colección.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gold mb-4 uppercase tracking-wider">3. Protección de Datos</h2>
                        <p>Implementamos medidas de seguridad para proteger su información personal contra accesos no autorizados o divulgación.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gold mb-4 uppercase tracking-wider">4. Cookies</h2>
                        <p>Este sitio puede utilizar cookies para mejorar la experiencia del usuario y analizar el tráfico de forma anónima.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default PrivacyPage;
