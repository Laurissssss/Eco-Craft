import React, { useState } from 'react';
import { X, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';
import { saveNewProject } from '../supabaseClient';

const MATERIAL_OPTIONS = ['Plástico', 'Cartón', 'Textil', 'Vidrio', 'Metal', 'Madera'];
const CATEGORY_OPTIONS = ['Almacenamiento', 'Decoración', 'Moda', 'Jardín', 'Herramientas'];
const DIFFICULTY_OPTIONS = ['Fácil', 'Medio', 'Avanzado'];

export default function NewProjectModal({ onClose, onProjectCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    material: 'Plástico',
    category: 'Decoración',
    difficulty: 'Fácil',
    time: '20 min',
    co2_saved: '0.5 kg CO2',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    description: '',
    materialsText: '1 botella plástica\nTijeras\nPintura al agua',
    stepsText: 'Cortar la base\nPintar la superficie con diseño botánico\nDejar secar 1 hora'
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    const materials_list = formData.materialsText
      .split('\n')
      .map((m) => m.trim())
      .filter(Boolean);

    const steps = formData.stepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((text, i) => ({
        step: i + 1,
        title: `Paso ${i + 1}`,
        detail: text
      }));

    const projectPayload = {
      title: formData.title,
      material: formData.material,
      category: formData.category,
      difficulty: formData.difficulty,
      time: formData.time,
      co2_saved: formData.co2_saved,
      image: formData.image,
      description: formData.description || 'Increíble proyecto de upcycling artesanal sustentable.',
      materials_list: materials_list.length > 0 ? materials_list : ['Residuo seleccionado', 'Herramientas básicas de corte'],
      steps: steps.length > 0 ? steps : [{ step: 1, title: 'Preparación', detail: 'Ensambla las piezas y disfruta tu diseño.' }]
    };

    try {
      const created = await saveNewProject(projectPayload);
      onProjectCreated(created);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#D8CEBC]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#D8CEBC] flex items-center justify-between bg-[#EFE8DC]/50">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#2D5A27] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <h3 className="font-bold text-sm text-[#2E2823]">Añadir Nueva Idea DIY</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/5 text-[#6E5034] hover:bg-black/10 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs flex-1">
          {/* Title */}
          <div>
            <label className="font-bold text-[#6E5034] block mb-1">Título del Proyecto *</label>
            <input
              type="text"
              required
              placeholder="Ej. Lámpara Geométrica con Tetra Pak"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 bg-white border border-[#D8CEBC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
            />
          </div>

          {/* Material & Category Row */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-[#6E5034] block mb-1">Material Base</label>
              <select
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#D8CEBC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
              >
                {MATERIAL_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-[#6E5034] block mb-1">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#D8CEBC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Difficulty & Time */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold text-[#6E5034] block mb-1">Dificultad</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#D8CEBC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
              >
                {DIFFICULTY_OPTIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-[#6E5034] block mb-1">Tiempo Estimado</label>
              <input
                type="text"
                placeholder="25 min"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-2.5 bg-white border border-[#D8CEBC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
              >
              </input>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="font-bold text-[#6E5034] block mb-1">URL de la Imagen</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-2.5 bg-white border border-[#D8CEBC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-bold text-[#6E5034] block mb-1">Descripción Breve</label>
            <textarea
              rows={2}
              placeholder="Explica en pocas palabras qué uso tiene y por qué es genial..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 bg-white border border-[#D8CEBC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
            />
          </div>

          {/* Materials (Line by line) */}
          <div>
            <label className="font-bold text-[#6E5034] block mb-1">Materiales (uno por línea)</label>
            <textarea
              rows={3}
              placeholder="1 Caja de cartón&#10;Tijeras&#10;Regla"
              value={formData.materialsText}
              onChange={(e) => setFormData({ ...formData, materialsText: e.target.value })}
              className="w-full p-2.5 bg-white border border-[#D8CEBC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
            />
          </div>

          {/* Steps (Line by line) */}
          <div>
            <label className="font-bold text-[#6E5034] block mb-1">Instrucciones Paso a Paso (una por línea)</label>
            <textarea
              rows={3}
              placeholder="Corta las solapas superiores&#10;Forra con tela o papel&#10;Fija los compartimentos con pegamento"
              value={formData.stepsText}
              onChange={(e) => setFormData({ ...formData, stepsText: e.target.value })}
              className="w-full p-2.5 bg-white border border-[#D8CEBC] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-[#2D5A27] text-white font-bold rounded-2xl shadow-md hover:bg-[#3E7035] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60"
            >
              <Plus className="w-4 h-4" />
              <span>{saving ? 'Guardando en Supabase...' : 'Publicar Idea DIY'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
