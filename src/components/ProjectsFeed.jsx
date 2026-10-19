import React, { useState } from 'react';
import { 
  Clock, 
  Sparkles, 
  ChevronRight, 
  PlusCircle, 
  Search, 
  Layers, 
  Filter,
  Leaf,
  Flame,
  Droplet,
  Package,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

const MATERIAL_FILTERS = [
  { id: 'Todos', label: 'Todos' },
  { id: 'Plástico', label: 'Plástico' },
  { id: 'Cartón', label: 'Cartón' },
  { id: 'Textil', label: 'Textil' },
  { id: 'Vidrio', label: 'Vidrio' }
];

export default function ProjectsFeed({ 
  projects = [], 
  onSelectProject, 
  onOpenAddModal, 
  onEarnPoints,
  recycledCount = 5 
}) {
  const [selectedMaterial, setSelectedMaterial] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Daily challenge state
  const [challengeCompleted, setChallengeCompleted] = useState(() => {
    return localStorage.getItem('ecocraft_daily_challenge') === 'true';
  });

  const handleCompleteChallenge = () => {
    if (challengeCompleted) return;
    setChallengeCompleted(true);
    localStorage.setItem('ecocraft_daily_challenge', 'true');

    // Confetti celebration
    try {
      confetti({
        particleCount: 70,
        spread: 55,
        origin: { y: 0.4 },
        colors: ['#2D5A27', '#4B7B3B', '#F4A261', '#E76F51', '#6B9AC4']
      });
    } catch (e) {
      console.warn(e);
    }

    if (onEarnPoints) {
      onEarnPoints(25);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesMaterial = selectedMaterial === 'Todos' || 
      project.material.toLowerCase() === selectedMaterial.toLowerCase();
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMaterial && matchesSearch;
  });

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'fácil':
      case 'facil':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'medio':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'avanzado':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const getMaterialColor = (mat) => {
    switch (mat?.toLowerCase()) {
      case 'plástico':
      case 'plastico':
        return 'bg-[#6B9AC4]/15 text-[#2B5780] border-[#6B9AC4]/30';
      case 'cartón':
      case 'carton':
        return 'bg-[#6E5034]/15 text-[#523B25] border-[#6E5034]/30';
      case 'textil':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'vidrio':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-[#A3B899]/20 text-[#2D5A27] border-[#A3B899]/40';
    }
  };

  return (
    <div className="px-4 py-3 space-y-3.5">
      {/* 1. Daily Eco-Challenge Banner (Reto del Día) */}
      <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#D8CEBC] shadow-xs relative overflow-hidden transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  Reto del Día
                </span>
                <span className="text-[10px] text-[#6E5034] font-medium">Recompensa diaria</span>
              </div>
              <h4 className="text-xs font-bold text-[#2E2823] mt-1">
                Transforma 1 residuo plástico hoy
              </h4>
              <p className="text-[11px] text-[#6E5034] mt-0.5">
                Dale un nuevo uso a cualquier botella, tapa o envase que tengas en casa.
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-[#6E5034]">Progreso Diario</span>
            <span className={challengeCompleted ? 'text-emerald-700 font-extrabold' : 'text-[#2D5A27]'}>
              {challengeCompleted ? '1 / 1 Completado 🎉' : '0 / 1 Listo'}
            </span>
          </div>
          <div className="w-full h-2 bg-[#EFE8DC] rounded-full overflow-hidden border border-[#D8CEBC]/60">
            <div 
              className={`h-full transition-all duration-500 ${
                challengeCompleted ? 'w-full bg-emerald-600' : 'w-1/4 bg-[#2D5A27]'
              }`}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3 pt-2.5 border-t border-[#D8CEBC]/50 flex items-center justify-between">
          <span className="text-[10px] font-semibold text-[#8C7A68]">
            {challengeCompleted ? '¡Excelente impacto!' : '¿Ya rescataste tu plástico?'}
          </span>
          {challengeCompleted ? (
            <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-xl border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Reto Completado (+25 pts)</span>
            </span>
          ) : (
            <button
              onClick={handleCompleteChallenge}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#2D5A27] to-[#4B7B3B] text-white text-xs font-bold shadow-xs hover:shadow-sm active:scale-95 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Completar Reto (+25 pts)</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar & Add Button */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7A68]" />
          <input
            type="text"
            placeholder="Buscar proyectos DIY o ideas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FDFBF7] border border-[#D8CEBC] rounded-xl text-xs placeholder-[#8C7A68] focus:outline-none focus:ring-1 focus:ring-[#2D5A27] text-[#2E2823] shadow-2xs"
          />
        </div>
        <button
          onClick={onOpenAddModal}
          title="Crear Nueva Idea"
          className="p-2 rounded-xl bg-[#2D5A27] text-white hover:bg-[#3E7035] transition-all shadow-xs shrink-0 flex items-center justify-center cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Environmental Impact Tracker Widget */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#FDFBF7] p-2 rounded-xl border border-[#D8CEBC] text-center shadow-2xs">
          <div className="flex items-center justify-center space-x-1 text-[10px] text-[#2D5A27] font-semibold mb-0.5">
            <Leaf className="w-3 h-3 text-[#2D5A27]" />
            <span>CO₂ Evitado</span>
          </div>
          <span className="text-xs font-extrabold text-[#2E2823]">
            {(recycledCount * 0.48).toFixed(1)} kg
          </span>
        </div>

        <div className="bg-[#FDFBF7] p-2 rounded-xl border border-[#D8CEBC] text-center shadow-2xs">
          <div className="flex items-center justify-center space-x-1 text-[10px] text-[#6B9AC4] font-semibold mb-0.5">
            <Droplet className="w-3 h-3 text-[#6B9AC4]" />
            <span>Agua Ahorrada</span>
          </div>
          <span className="text-xs font-extrabold text-[#2E2823]">
            {recycledCount * 3.6} L
          </span>
        </div>

        <div className="bg-[#FDFBF7] p-2 rounded-xl border border-[#D8CEBC] text-center shadow-2xs">
          <div className="flex items-center justify-center space-x-1 text-[10px] text-[#6E5034] font-semibold mb-0.5">
            <Package className="w-3 h-3 text-[#6E5034]" />
            <span>Residuos</span>
          </div>
          <span className="text-xs font-extrabold text-[#2E2823]">
            {recycledCount} items
          </span>
        </div>
      </div>

      {/* Filter Chips by Material */}
      <div>
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
          {MATERIAL_FILTERS.map((f) => {
            const isSelected = selectedMaterial === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedMaterial(f.id)}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#2D5A27] text-[#FDFBF7] shadow-xs'
                    : 'bg-[#FDFBF7] text-[#6E5034] border border-[#D8CEBC] hover:bg-[#E8DEC8]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects List Counter */}
      <div className="flex items-center justify-between text-xs text-[#6E5034] font-medium px-0.5">
        <span>Mostrando {filteredProjects.length} proyectos ecológicos</span>
        <span className="flex items-center space-x-1 text-[11px] text-[#2D5A27] font-semibold">
          <Leaf className="w-3 h-3" />
          <span>100% Upcycled</span>
        </span>
      </div>

      {/* Project Cards Grid */}
      <div className="space-y-3.5">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-[#FDFBF7] rounded-2xl border border-dashed border-[#D8CEBC] p-6 space-y-2">
            <Layers className="w-8 h-8 text-[#A3B899] mx-auto" />
            <h4 className="text-xs font-bold text-[#2E2823]">No se encontraron proyectos</h4>
            <p className="text-[11px] text-[#6E5034]">Prueba con otra palabra o selecciona otro material.</p>
            <button
              onClick={() => { setSelectedMaterial('Todos'); setSearchQuery(''); }}
              className="text-xs text-[#2D5A27] font-bold underline mt-2 inline-block cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#FDFBF7] border border-[#D8CEBC] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              {/* Image & Material badge */}
              <div className="relative h-40 w-full overflow-hidden bg-stone-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-2xs ${getMaterialColor(project.material)}`}>
                    {project.material}
                  </span>
                  {project.category && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                      {project.category}
                    </span>
                  )}
                </div>
                {project.co2_saved && (
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-[#2D5A27]/90 text-white px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center space-x-1">
                    <span>🌱 {project.co2_saved}</span>
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2.5">
                <div>
                  <h3 className="text-sm font-bold text-[#2E2823] line-clamp-1 group-hover:text-[#2D5A27] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#6E5034] line-clamp-2 mt-1 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Card Meta & Action */}
                <div className="pt-2 border-t border-[#D8CEBC]/50 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    <span className="text-[11px] text-[#6E5034] flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-[#8C7A68]" />
                      {project.time}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-3 py-1.5 rounded-xl bg-[#2D5A27]/10 hover:bg-[#2D5A27] text-[#2D5A27] hover:text-white font-bold text-xs transition-all flex items-center space-x-1 cursor-pointer active:scale-95"
                  >
                    <span>Ver Paso a Paso</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
