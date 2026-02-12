"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TermsPage = () => {
    return (
        <main className="bg-black min-h-screen text-white/80 font-sans">
            <Header />
            <div className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-12">
                    Términos y <span className="text-gold italic">Condiciones</span>
                </h1>

                <div className="space-y-8 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gold mb-4 uppercase tracking-wider">1. Aceptación de Términos</h2>
                        <p>Al acceder y utilizar el sitio web de Naluz, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gold mb-4 uppercase tracking-wider">2. Propiedad Intelectual</h2>
                        <p>Todo el contenido, diseños, logos e imágenes son propiedad exclusiva de Naluz Loja. Queda prohibida su reproducción total o parcial sin autorización previa.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gold mb-4 uppercase tracking-wider">3. Productos y Precios</h2>
                        <p>Los precios y la disponibilidad de los productos están sujetos a cambios sin previo aviso. Naluz se reserva el derecho de corregir cualquier error tipográfico.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gold mb-4 uppercase tracking-wider">4. Garantías</h2>
                        <p>Nuestros productos cuentan con garantía contra defectos de fabricación. Los términos específicos de cada garantía se detallan en el momento de la compra.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default TermsPage;
