import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Clock, 
  Award, 
  Layers, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Heart,
  Leaf,
  Wrench,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectDetailModal({ project, onClose, onCompleteProject, isCompleted = false }) {
  if (!project) return null;

  const [checkedMaterials, setCheckedMaterials] = useState({});
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completed, setCompleted] = useState(isCompleted);
  const [liked, setLiked] = useState(false);

  // Workshop Mode State
  const [isWorkshopMode, setIsWorkshopMode] = useState(false);
  const [workshopStepIndex, setWorkshopStepIndex] = useState(0);
  
  // Workshop Timer (Defaults to 15 mins = 900 seconds)
  const defaultSeconds = 15 * 60;
  const [timeLeft, setTimeLeft] = useState(defaultSeconds);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMaterial = (index) => {
    setCheckedMaterials((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCelebrate = () => {
    if (completed) return;
    setCompleted(true);

    // Trigger cheerful confetti blast
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2D5A27', '#4B7B3B', '#A3B899', '#6B9AC4', '#F4A261']
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }

    if (onCompleteProject) {
      onCompleteProject(project.id, 50);
    }
  };

  const materials = project.materials_list || [
    'Material base del residuo (limpio y seco)',
    'Tijeras o cúter multiusos',
    'Pegamento ecológico o adhesivo no tóxico',
    'Elementos decorativos opcionales'
  ];

  const steps = project.steps || [
    {
      step: 1,
      title: 'Limpieza y preparación del residuo',
      detail: 'Lava minuciosamente el envase o tela con agua tibia y déjalo secar por completo antes de intervenirlo.'
    },
    {
      step: 2,
      title: 'Corte y estructurado de la forma',
      detail: 'Marca las líneas guías con lápiz o tiza y corta siguiendo las instrucciones con precisión.'
    },
    {
      step: 3,
      title: 'Ensamble y fijación de componentes',
      detail: 'Une las piezas usando las pestañas o adhesivo asegurando estabilidad estructural.'
    },
    {
      step: 4,
      title: 'Acabado y puesta en uso',
      detail: 'Añade toques personales, barniz protector al agua o cuerda decorativa y colócalo en su nuevo rincón.'
    }
  ];

  const allChecked = materials.length > 0 && materials.every((_, i) => checkedMaterials[i]);

  // Workshop Mode View (Distraction-Free Crafting View)
  if (isWorkshopMode) {
    const currentWorkshopStep = steps[workshopStepIndex] || steps[0];
    const isFirstStep = workshopStepIndex === 0;
    const isLastStep = workshopStepIndex === steps.length - 1;
    const workshopProgress = ((workshopStepIndex + 1) / steps.length) * 100;

    return (
      <div className="fixed inset-0 z-50 bg-[#1C1A17] text-[#FDFBF7] flex flex-col justify-between p-5 animate-fadeIn">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center font-bold text-xs">
              🛠️
            </span>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3B899]">
                  Modo Taller
                </span>
                <span className="text-[10px] text-white/50">•</span>
                <span className="text-[11px] text-white/70 line-clamp-1 max-w-[170px]">
                  {project.title}
                </span>
              </div>
              <p className="text-xs font-semibold text-white">
                Paso {workshopStepIndex + 1} de {steps.length}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWorkshopMode(false)}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white/90 transition-all flex items-center space-x-1 cursor-pointer"
          >
            <span>Salir</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Floating Timer Widget */}
        <div className="flex items-center justify-between bg-[#2A2621] p-3 rounded-2xl border border-white/10 shadow-md my-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400/90 tracking-wider">
                Temporizador de Trabajo
              </span>
              <div className="text-xl font-mono font-black text-amber-300 leading-tight">
                {formatTimer(timeLeft)}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              {timerRunning ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setTimeLeft(defaultSeconds);
              }}
              title="Reiniciar temporizador"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Line */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden my-1">
          <div 
            className="h-full bg-gradient-to-r from-[#2D5A27] to-[#76C893] transition-all duration-300"
            style={{ width: `${workshopProgress}%` }}
          />
        </div>

        {/* Step Big Typography Card */}
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-[#25221D] rounded-3xl border border-white/5 shadow-inner my-2">
          <div className="w-14 h-14 rounded-2xl bg-[#2D5A27] text-white flex items-center justify-center text-xl font-black mb-4 shadow-lg shadow-[#2D5A27]/40 ring-4 ring-white/10">
            {workshopStepIndex + 1}
          </div>

          <h3 className="text-xl font-extrabold text-white mb-3 tracking-tight font-serif">
            {currentWorkshopStep.title}
          </h3>

          <p className="text-base text-stone-300 leading-relaxed font-medium max-w-sm">
            {currentWorkshopStep.detail}
          </p>

          <div className="mt-6 flex items-center space-x-2 text-[11px] text-[#A3B899] bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Leaf className="w-3.5 h-3.5" />
            <span>Tómate tu tiempo. Sin distracciones.</span>
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="pt-2 flex items-center space-x-2.5">
          <button
            onClick={() => setWorkshopStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={isFirstStep}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Paso Anterior</span>
          </button>

          {!isLastStep ? (
            <button
              onClick={() => setWorkshopStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#2D5A27] via-[#4B7B3B] to-[#2D5A27] text-white font-extrabold text-xs shadow-lg shadow-[#2D5A27]/40 transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 border border-[#2D5A27]/50"
            >
              <span>Siguiente Paso</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                handleCelebrate();
                setIsWorkshopMode(false);
              }}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-xs shadow-lg shadow-emerald-600/40 transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Terminar (+50 pts)</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div 
        className="w-full max-w-md bg-[#FDFBF7] rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#D8CEBC]"
      >
        {/* Modal Header Image */}
        <div className="relative h-48 w-full bg-stone-300 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2D5A27] text-white">
                  {project.material}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
                  {project.category}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white leading-tight drop-shadow-sm">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Close & Share buttons */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className={`absolute top-3 left-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
              liked ? 'bg-rose-500 text-white' : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Modal Content Scrollable */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-3 gap-2 p-2.5 bg-[#EFE8DC]/80 rounded-2xl border border-[#D8CEBC]/70 text-center">
            <div>
              <span className="text-[10px] text-[#6E5034] block">Dificultad</span>
              <span className="text-xs font-bold text-[#2D5A27]">{project.difficulty || 'Fácil'}</span>
            </div>
            <div className="border-x border-[#D8CEBC]">
              <span className="text-[10px] text-[#6E5034] block">Tiempo</span>
              <span className="text-xs font-bold text-[#2E2823]">{project.time || '20 min'}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#6E5034] block">Ahorro CO2</span>
              <span className="text-xs font-bold text-[#4B7B3B]">{project.co2_saved || '0.5 kg'}</span>
            </div>
          </div>

          {/* Hands-Free Crafting Mode Hero Banner */}
          <div className="p-3 bg-gradient-to-r from-[#2D5A27]/10 via-[#4B7B3B]/10 to-[#6E5034]/10 rounded-2xl border border-[#2D5A27]/25 flex items-center justify-between shadow-2xs">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center shadow-xs">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#2E2823]">Modo Taller Libre</h4>
                <p className="text-[10px] text-[#6E5034]">Vista limpia, textos grandes y temporizador</p>
              </div>
            </div>
            <button
              onClick={() => {
                setWorkshopStepIndex(0);
                setIsWorkshopMode(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#2D5A27] text-white text-xs font-bold shadow-xs hover:bg-[#3E7035] transition-all flex items-center space-x-1 cursor-pointer active:scale-95"
            >
              <span>Iniciar 🛠️</span>
            </button>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E5034] mb-1">
              Sobre este Proyecto
            </h4>
            <p className="text-xs text-[#2E2823] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Materials Checklist */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E5034] flex items-center space-x-1">
                <span>Materiales Necesarios</span>
                {allChecked && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold lowercase">
                    ¡todo listo!
                  </span>
                )}
              </h4>
              <span className="text-[10px] text-[#8C7A68]">Toca para marcar</span>
            </div>

            <div className="space-y-1.5">
              {materials.map((mat, idx) => {
                const isDone = Boolean(checkedMaterials[idx]);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleMaterial(idx)}
                    className={`flex items-center space-x-2.5 p-2 rounded-xl border text-xs transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-50/70 border-emerald-300 text-stone-500 line-through'
                        : 'bg-[#FDFBF7] border-[#D8CEBC] text-[#2E2823] hover:bg-[#EFE8DC]/50'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isDone ? 'bg-[#2D5A27] text-white' : 'border border-[#8C7A68]'
                      }`}
                    >
                      {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{mat}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step by Step Accordion / Slider */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E5034]">
              Instrucciones Paso a Paso ({steps.length})
            </h4>

            <div className="space-y-2">
              {steps.map((st, sIdx) => {
                const isOpen = activeStepIndex === sIdx;
                return (
                  <div
                    key={sIdx}
                    className="border border-[#D8CEBC] rounded-xl overflow-hidden bg-[#FDFBF7]"
                  >
                    <button
                      onClick={() => setActiveStepIndex(isOpen ? -1 : sIdx)}
                      className="w-full p-2.5 flex items-center justify-between text-left hover:bg-[#EFE8DC]/40 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#2D5A27] text-white font-bold text-[10px] flex items-center justify-center">
                          {st.step || sIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-[#2E2823]">{st.title}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#8C7A68]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-[#8C7A68]" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-3 pt-0 text-xs text-[#6E5034] border-t border-[#D8CEBC]/40 leading-relaxed bg-[#EFE8DC]/20">
                        {st.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 border-t border-[#D8CEBC] bg-[#FDFBF7]">
          {completed ? (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-center space-x-2 text-emerald-800 text-xs font-bold animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>¡Proyecto Completado! +50 EcoPuntos agregados 🔥</span>
            </div>
          ) : (
            <button
              onClick={handleCelebrate}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#2D5A27] via-[#3E7035] to-[#2D5A27] text-white font-bold text-xs shadow-md shadow-[#2D5A27]/25 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center space-x-2 border border-[#2D5A27]/40 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Completar Proyecto (+50 EcoPuntos)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
