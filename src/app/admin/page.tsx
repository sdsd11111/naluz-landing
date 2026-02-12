"use client";

import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Megaphone, Save, FileText, Trash2, Plus, Edit, Power, Upload, Home } from 'lucide-react';
import Link from 'next/link';

interface Announcement {
    id?: number;
    title: string;
    offer: string;
    description: string;
    image_filename: string | null;
    pdf_filename: string | null;
    active: boolean;
}

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState<Announcement>({
        title: '',
        offer: '',
        description: '',
        image_filename: null,
        pdf_filename: null,
        active: false
    });

    useEffect(() => {
        const logged = sessionStorage.getItem('naluz_admin');
        if (logged) {
            setIsLoggedIn(true);
            fetchAnnouncements();
        }
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await fetch('/api/announcements?admin=true');
            const data = await res.json();
            if (data.success) {
                setAnnouncements(data.data);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'Naluz' && password === 'Contraseña123.') {
            setIsLoggedIn(true);
            sessionStorage.setItem('naluz_admin', 'true');
            setError('');
            fetchAnnouncements();
        } else {
            setError('Credenciales incorrectas');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('naluz_admin');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'image' = 'pdf') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formDataUpload
            });
            const data = await res.json();
            if (data.success) {
                if (type === 'image') {
                    setFormData({ ...formData, image_filename: data.filename });
                } else {
                    setFormData({ ...formData, pdf_filename: data.filename });
                }
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error al subir el archivo');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            const method = editingAnnouncement ? 'PUT' : 'POST';
            const body = editingAnnouncement
                ? { ...formData, id: editingAnnouncement.id }
                : formData;

            const res = await fetch('/api/announcements', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();
            if (data.success) {
                alert('Anuncio guardado correctamente');
                setShowModal(false);
                setFormData({ title: '', offer: '', description: '', image_filename: null, pdf_filename: null, active: false });
                setEditingAnnouncement(null);
                fetchAnnouncements();
            }
        } catch (error) {
            console.error('Error saving announcement:', error);
            alert('Error al guardar el anuncio');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este anuncio?')) return;

        try {
            const res = await fetch(`/api/announcements?id=${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.success) {
                alert('Anuncio eliminado');
                fetchAnnouncements();
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const handleToggleActive = async (announcement: Announcement) => {
        try {
            const res = await fetch('/api/announcements', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...announcement, active: !announcement.active })
            });
            const data = await res.json();
            if (data.success) {
                fetchAnnouncements();
            }
        } catch (error) {
            console.error('Error toggling active:', error);
        }
    };

    const openEditModal = (announcement: Announcement) => {
        setEditingAnnouncement(announcement);
        setFormData(announcement);
        setShowModal(true);
    };

    const openNewModal = () => {
        setEditingAnnouncement(null);
        setFormData({ title: '', offer: '', description: '', image_filename: null, pdf_filename: null, active: false });
        setShowModal(true);
    };

    if (!isLoggedIn) {
        return (
            <main className="bg-black min-h-screen flex flex-col justify-center items-center p-6">
                <div className="w-full max-w-md p-8 rounded-3xl bg-anthracite border border-white/10 shadow-2xl relative">
                    <Link href="/" className="absolute top-6 left-6 text-white/40 hover:text-gold transition-colors flex items-center gap-2">
                        <Home size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Inicio</span>
                    </Link>
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4">
                            <Lock size={32} className="text-black" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-white uppercase tracking-widest">NALUZ ADMIN</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Usuario</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-all"
                                placeholder="Naluz"
                            />
                        </div>
                        <div>
                            <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="w-full bg-gold text-black py-4 rounded-xl font-sans font-bold hover:bg-amber transition-all shadow-lg shadow-gold/20">
                            Ingresar
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-black min-h-screen font-sans text-white">
            <div className="container mx-auto px-6 pt-12 pb-20">
                <div className="flex items-center gap-4 mb-12 pb-6 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors">
                        <Home size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Volver al Sitio</span>
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Panel de <span className="text-gold italic">Anuncios</span></h1>
                        <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Gestión de Ofertas y Popups</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={openNewModal}
                            className="flex items-center gap-2 bg-gold text-black px-6 py-3 rounded-xl hover:bg-amber transition-all font-bold"
                        >
                            <Plus size={18} />
                            Nuevo Anuncio
                        </button>
                        <button onClick={handleLogout} className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl hover:bg-white/10 transition-all text-white/70">
                            <LogOut size={18} />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* Announcements Table */}
                <div className="bg-anthracite border border-white/10 rounded-3xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-white/40 uppercase tracking-widest">Título</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-white/40 uppercase tracking-widest">Oferta</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-white/40 uppercase tracking-widest">Estado</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-white/40 uppercase tracking-widest">PDF</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-white/40 uppercase tracking-widest">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-white/20">
                                        No hay anuncios aún. Crea uno nuevo.
                                    </td>
                                </tr>
                            ) : (
                                announcements.map((announcement) => (
                                    <tr key={announcement.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-white font-serif font-bold">{announcement.title}</td>
                                        <td className="px-6 py-4 text-gold text-sm">{announcement.offer || '-'}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleToggleActive(announcement)}
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${announcement.active
                                                    ? 'bg-gold text-black'
                                                    : 'bg-white/10 text-white/40'
                                                    }`}
                                            >
                                                {announcement.active ? 'Activo' : 'Inactivo'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {announcement.pdf_filename ? (
                                                <FileText size={16} className="text-gold mx-auto" />
                                            ) : (
                                                <span className="text-white/20 text-xs">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => openEditModal(announcement)}
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                                >
                                                    <Edit size={16} className="text-white/60" />
                                                </button>
                                                <button
                                                    onClick={() => announcement.id && handleDelete(announcement.id)}
                                                    className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} className="text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
                    <div className="bg-anthracite border border-white/10 rounded-3xl p-8 w-full max-w-2xl">
                        <h2 className="text-3xl font-serif font-bold text-white mb-6">
                            {editingAnnouncement ? 'Editar' : 'Nuevo'} Anuncio
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Título *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
                                        placeholder="Oferta Especial"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Etiqueta Oferta</label>
                                    <input
                                        type="text"
                                        value={formData.offer}
                                        onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none"
                                        placeholder="-20% Descuento"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Descripción</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold outline-none resize-none"
                                    placeholder="Describe la oferta..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                        <Upload size={14} /> Subir Imagen
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, 'image')}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gold file:text-black file:font-bold text-xs"
                                    />
                                    {formData.image_filename && (
                                        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gold/30 mt-2">
                                            <img
                                                src={`/uploads/${formData.image_filename}`}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                        <Upload size={14} /> Subir PDF
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => handleFileUpload(e, 'pdf')}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gold file:text-black file:font-bold text-xs"
                                    />
                                    {formData.pdf_filename && (
                                        <p className="text-green-400 text-[10px] flex items-center gap-2 mt-2 truncate">
                                            <FileText size={12} /> {formData.pdf_filename}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {uploading && <p className="text-gold text-xs animate-pulse">Subiendo archivo...</p>}

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                                <span className="text-sm font-bold text-white/60">Publicar automáticamente:</span>
                                <button
                                    onClick={() => setFormData({ ...formData, active: !formData.active })}
                                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${formData.active ? 'bg-gold text-black' : 'bg-white/10 text-white/40'
                                        }`}
                                >
                                    {formData.active ? 'Sí' : 'No'}
                                </button>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 flex items-center justify-center gap-3 bg-gold text-black py-4 rounded-xl font-sans font-bold hover:bg-amber transition-all"
                                >
                                    <Save size={20} />
                                    Guardar
                                </button>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingAnnouncement(null);
                                    }}
                                    className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer removed */}
        </main>
    );
};

export default AdminPage;
