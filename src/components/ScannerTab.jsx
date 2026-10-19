import React, { useState, useRef } from 'react';
import { 
  Camera, 
  UploadCloud, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  Lightbulb, 
  Compass, 
  Layers, 
  Clock, 
  ShieldCheck,
  Package,
  Cpu
} from 'lucide-react';
import { saveScanRecord } from '../supabaseClient';

const TARGET_PURPOSES = [
  { id: 'Almacenamiento', label: 'Almacenamiento', icon: '📦' },
  { id: 'Decoración', label: 'Decoración', icon: '🪴' },
  { id: 'Moda', label: 'Moda', icon: '👕' },
  { id: 'Jardín', label: 'Jardín', icon: '🌻' },
  { id: 'Herramientas', label: 'Herramientas', icon: '🔨' }
];

const PRESET_ITEMS = [
  {
    name: 'Botella de Plástico PET (1.5L)',
    material: 'Plástico',
    category: 'Jardín',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    tags: ['PET #1', 'Reutilizable', 'Impermeable'],
    insights: 'Material ligero, impermeable y fácil de cortar. Ideal para retención hídrica o almacenamiento.'
  },
  {
    name: 'Caja de Cartón Corrugado',
    material: 'Cartón',
    category: 'Almacenamiento',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    tags: ['Kraft', 'Corrugado', 'Biodegradable'],
    insights: 'Estructura rígida de fibra natural. Excelente para organizadores modulares y cajas decorativas.'
  },
  {
    name: 'Camiseta de Algodón Vieja',
    material: 'Textil',
    category: 'Moda',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    tags: ['100% Algodón', 'Flexible', 'Lavable'],
    insights: 'Fibras naturales elásticas y resistentes a la tracción. Ideal para bolsas tote o alfombrillas.'
  },
  {
    name: 'Frasco de Vidrio de Mermelada',
    material: 'Vidrio',
    category: 'Decoración',
    image: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=600&q=80',
    tags: ['Vidrio Sódico', 'Térmico', 'Transparente'],
    insights: 'Material no poroso de alta durabilidad estética. Seguro para velas aromáticas o especieros.'
  }
];

export default function ScannerTab({ onSelectProject, onScanCompleted, projects = [] }) {
  const [selectedPurpose, setSelectedPurpose] = useState('Jardín');
  const [selectedPreset, setSelectedPreset] = useState(PRESET_ITEMS[0]);
  const [customImage, setCustomImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanProgress, setScanProgress] = useState('');
  const fileInputRef = useRef(null);

  // Trigger file selection
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result);
        setSelectedPreset({
          name: file.name.replace(/\.[^/.]+$/, '').slice(0, 25) || 'Objeto Detectado',
          material: 'Material Mixto',
          category: selectedPurpose,
          image: reader.result,
          tags: ['Detectado por IA', 'Personalizado'],
          insights: 'La red neuronal ha segmentado los componentes estructurales y geometría del residuo.'
        });
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run simulated AI Scan
  const triggerAiScan = async () => {
    setIsScanning(true);
    setScanResult(null);

    // Realistic scanning phase steps
    setScanProgress('Detectando silueta y textura...');
    setTimeout(() => {
      setScanProgress('Identificando polímeros y fibras...');
    }, 700);

    setTimeout(() => {
      setScanProgress('Generando proyectos de upcycling recomendados...');
    }, 1400);

    setTimeout(async () => {
      setIsScanning(false);
      setScanProgress('');

      // Filter or generate matching project suggestions
      const matching = projects.filter(
        (p) => p.material.toLowerCase() === selectedPreset.material.toLowerCase() ||
               p.category.toLowerCase() === selectedPurpose.toLowerCase()
      );
      
      const recommendations = matching.length > 0 ? matching : projects.slice(0, 2);

      const result = {
        item_name: selectedPreset.name,
        material: selectedPreset.material,
        target_purpose: selectedPurpose,
        image_url: customImage || selectedPreset.image,
        recommendations,
        co2_potential: '1.2 kg CO2 evitado',
        tags: selectedPreset.tags
      };

      setScanResult(result);

      // Save to Supabase scans_history
      try {
        await saveScanRecord({
          item_name: result.item_name,
          material: result.material,
          target_purpose: result.target_purpose,
          image_url: result.image_url,
          recommendations_count: recommendations.length
        });
        if (onScanCompleted) {
          onScanCompleted();
        }
      } catch (err) {
        console.error('Failed to log scan to Supabase:', err);
      }
    }, 2100);
  };

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Intro banner */}
      <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#D8CEBC] shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-[#2E2823]">Escáner de Residuos Inteligente</h3>
            <p className="text-[11px] text-[#6E5034]">La IA analiza tus materiales y diseña ideas de reciclaje</p>
          </div>
        </div>
      </div>

      {/* Camera Viewport Simulation */}
      <div className="relative bg-[#1A1815] rounded-3xl overflow-hidden border-2 border-[#D8CEBC] shadow-lg aspect-4/3 flex items-center justify-center group">
        {/* Background Image / Preset */}
        <img 
          src={customImage || selectedPreset.image} 
          alt="Objeto a reciclar" 
          className={`w-full h-full object-cover transition-transform duration-700 ${isScanning ? 'scale-105 filter contrast-125' : ''}`}
        />

        {/* Viewfinder Corners */}
        <div className="absolute inset-4 pointer-events-none border border-white/20 rounded-2xl flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-5 h-5 border-t-2 border-l-2 border-[#A3B899] rounded-tl-md"></div>
            <div className="w-5 h-5 border-t-2 border-r-2 border-[#A3B899] rounded-tr-md"></div>
          </div>
          <div className="flex justify-between items-end">
            <div className="w-5 h-5 border-b-2 border-l-2 border-[#A3B899] rounded-bl-md"></div>
            <div className="w-5 h-5 border-b-2 border-r-2 border-[#A3B899] rounded-br-md"></div>
          </div>
        </div>

        {/* Dynamic Scanning Laser Beam */}
        {isScanning && (
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#76C893] to-transparent shadow-[0_0_15px_#76C893] animate-scan-beam pointer-events-none z-10" />
        )}

        {/* Overlay Darkening during scan */}
        {isScanning && (
          <div className="absolute inset-0 bg-[#2D5A27]/25 backdrop-blur-[1px] flex flex-col items-center justify-center text-white z-10">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center animate-spin mb-2">
              <RefreshCw className="w-6 h-6 text-[#A3B899]" />
            </div>
            <span className="text-xs font-semibold tracking-wide drop-shadow-md text-white bg-black/40 px-3 py-1 rounded-full">
              {scanProgress}
            </span>
          </div>
        )}

        {/* Active Item Overlay Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-white/10 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A3B899] animate-ping" />
            <span>{selectedPreset.name}</span>
          </span>
          <span className="bg-[#2D5A27]/80 backdrop-blur-md text-[#FDFBF7] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            {selectedPreset.material}
          </span>
        </div>
      </div>

      {/* Target Purpose Pills */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#6E5034] flex items-center space-x-1">
            <span>Objetivo Deseado</span>
          </label>
          <span className="text-[10px] text-[#8C7A68]">¿En qué quieres transformarlo?</span>
        </div>
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
          {TARGET_PURPOSES.map((purpose) => {
            const isSelected = selectedPurpose === purpose.id;
            return (
              <button
                key={purpose.id}
                onClick={() => setSelectedPurpose(purpose.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-[#2D5A27] text-white shadow-sm shadow-[#2D5A27]/30 scale-102'
                    : 'bg-[#FDFBF7] text-[#6E5034] border border-[#D8CEBC] hover:bg-[#E8DEC8]'
                }`}
              >
                <span>{purpose.icon}</span>
                <span>{purpose.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fast Preset Selector / Upload controls */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5034]">
            O selecciona un residuo común:
          </span>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-semibold text-[#2D5A27] hover:underline flex items-center space-x-1"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Subir propia foto</span>
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {PRESET_ITEMS.map((item, idx) => {
            const isChosen = selectedPreset.name === item.name && !customImage;
            return (
              <button
                key={idx}
                onClick={() => {
                  setCustomImage(null);
                  setSelectedPreset(item);
                  setScanResult(null);
                }}
                className={`p-1.5 rounded-xl border text-center transition-all flex flex-col items-center ${
                  isChosen
                    ? 'border-[#2D5A27] bg-[#2D5A27]/10 ring-1 ring-[#2D5A27]'
                    : 'border-[#D8CEBC] bg-[#FDFBF7] hover:bg-[#F2ECE1]'
                }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden mb-1 border border-black/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-semibold text-[#2E2823] line-clamp-1">
                  {item.material}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Scan Button */}
      <button
        onClick={triggerAiScan}
        disabled={isScanning}
        className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#2D5A27] via-[#3E7035] to-[#2D5A27] text-white font-bold text-sm shadow-md shadow-[#2D5A27]/25 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center space-x-2 border border-[#2D5A27]/40 cursor-pointer disabled:opacity-70"
      >
        {isScanning ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Analizando con Red Neuronal...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Escanear y Generar Proyectos IA</span>
          </>
        )}
      </button>

      {/* Scan Results Section */}
      {scanResult && (
        <div className="bg-[#FDFBF7] border border-[#A3B899] rounded-2xl p-4 shadow-sm space-y-3.5 animate-fadeIn">
          {/* Result Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-1.5 text-[#2D5A27]">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Identificación Exitosa</span>
              </div>
              <h4 className="text-base font-bold text-[#2E2823] mt-0.5">{scanResult.item_name}</h4>
              <p className="text-[11px] text-[#6E5034]">
                Optimizado para objetivo: <span className="font-semibold">{scanResult.target_purpose}</span>
              </p>
            </div>
            <span className="text-[10px] font-semibold bg-[#6B9AC4]/15 text-[#3D6992] px-2 py-0.5 rounded-full border border-[#6B9AC4]/30">
              Impacto: {scanResult.co2_potential}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {scanResult.tags?.map((tag, tIdx) => (
              <span key={tIdx} className="text-[10px] bg-[#EFE8DC] text-[#6E5034] px-2 py-0.5 rounded-md font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* Suggested Projects */}
          <div className="pt-2 border-t border-[#D8CEBC]/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#2E2823] flex items-center space-x-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Ideas de Upcycling Recomendadas ({scanResult.recommendations.length})</span>
              </span>
            </div>

            <div className="space-y-2">
              {scanResult.recommendations.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  className="p-2.5 bg-[#EFE8DC]/60 hover:bg-[#EFE8DC] border border-[#D8CEBC] rounded-xl flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-2.5">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      className="w-12 h-12 rounded-lg object-cover border border-black/5 shrink-0" 
                    />
                    <div>
                      <h5 className="text-xs font-bold text-[#2E2823] group-hover:text-[#2D5A27] transition-colors line-clamp-1">
                        {proj.title}
                      </h5>
                      <div className="flex items-center space-x-2 mt-0.5 text-[10px] text-[#6E5034]">
                        <span className="flex items-center">
                          <Clock className="w-2.5 h-2.5 mr-0.5" />
                          {proj.time}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-[#2D5A27]">{proj.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#FDFBF7] flex items-center justify-center text-[#2D5A27] shadow-xs group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
