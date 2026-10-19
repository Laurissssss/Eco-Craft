import React, { useState } from 'react';
import { 
  Award, 
  Flame, 
  History, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Share2, 
  ShieldCheck, 
  ChevronRight, 
  ExternalLink, 
  LogIn, 
  LogOut, 
  User,
  Crown,
  Zap,
  Check
} from 'lucide-react';
import { isSupabaseConfigured } from '../supabaseClient';

export default function ProfileTab({ 
  ecoPoints, 
  recycledStreak, 
  completedProjects = [], 
  scansHistory = [], 
  allProjects = [], 
  onSelectProject, 
  user = null, 
  isPro = false,
  onOpenAuthModal, 
  onSignOut,
  onOpenSubscriptionModal
}) {
  const [activeSubTab, setActiveSubTab] = useState('completed');

  const completedList = allProjects.filter((p) => completedProjects.includes(p.id));

  const userName = user 
    ? (user.user_metadata?.name || user.email?.split('@')[0]) 
    : 'Invitado';

  return (
    <div className="px-4 py-4 space-y-4">
      {/* User Eco Status Card */}
      <div className="bg-[#FDFBF7] p-4 rounded-3xl border border-[#D8CEBC] shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-28 h-28 bg-[#2D5A27]/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2D5A27] to-[#4B7B3B] flex items-center justify-center text-white text-xl font-bold shadow-sm shadow-[#2D5A27]/20 border border-white/40">
              🌱
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-base text-[#2E2823]">
                  {user ? userName : 'Eco-Maker Invitado'}
                </h3>
                {isPro && (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white px-1.5 py-0.2 rounded-md shadow-2xs">
                    PRO
                  </span>
                )}
                {user && <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />}
              </div>
              <p className="text-xs text-[#6E5034]">
                {user ? user.email : 'Inicia sesión para sincronizar datos'}
              </p>
              <div className="flex items-center space-x-2 mt-1.5">
                <span className="text-[10px] font-semibold bg-[#2D5A27]/10 text-[#2D5A27] px-2 py-0.5 rounded-full">
                  {isSupabaseConfigured ? '🟢 Conectado a Supabase' : '🟡 Modo Local Reactivo'}
                </span>
              </div>
            </div>
          </div>

          <div>
            {user ? (
              <button
                onClick={onSignOut}
                title="Cerrar Sesión"
                className="p-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3 py-1.5 rounded-xl bg-[#2D5A27] text-white text-xs font-bold hover:bg-[#3E7035] transition-all flex items-center space-x-1 cursor-pointer shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Entrar</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats 3-Col Bar */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#D8CEBC]/60 text-center">
          <div className="p-2 rounded-xl bg-[#EFE8DC]/50">
            <span className="text-[10px] text-[#6E5034] block">Eco-Puntos</span>
            <span className="text-sm font-extrabold text-[#2D5A27] flex items-center justify-center space-x-0.5">
              <Sparkles className="w-3 h-3 mr-0.5" />
              {ecoPoints}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-[#EFE8DC]/50">
            <span className="text-[10px] text-[#6E5034] block">Racha</span>
            <span className="text-sm font-extrabold text-amber-600 flex items-center justify-center space-x-0.5">
              <Flame className="w-3 h-3 mr-0.5" />
              {recycledStreak} días
            </span>
          </div>
          <div className="p-2 rounded-xl bg-[#EFE8DC]/50">
            <span className="text-[10px] text-[#6E5034] block">Creaciones</span>
            <span className="text-sm font-extrabold text-[#6B9AC4] flex items-center justify-center space-x-0.5">
              <CheckCircle className="w-3 h-3 mr-0.5" />
              {completedProjects.length}
            </span>
          </div>
        </div>
      </div>

      {/* Membership / Subscription Status Card */}
      <div className={`p-4 rounded-3xl border shadow-xs relative overflow-hidden transition-all ${
        isPro 
          ? 'bg-gradient-to-br from-[#FDFBF7] to-[#FAF4E8] border-amber-300 ring-1 ring-amber-400/40' 
          : 'bg-[#FDFBF7] border-[#D8CEBC]'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
              isPro 
                ? 'bg-gradient-to-tr from-amber-500 to-amber-600 text-white' 
                : 'bg-[#6E5034]/10 text-[#6E5034]'
            }`}>
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="text-xs font-black text-[#2E2823]">
                  {isPro ? 'Plan EcoCraft PRO Activo ⭐' : 'Plan Básico Gratuito'}
                </h4>
              </div>
              <p className="text-[11px] text-[#6E5034] mt-0.5 leading-relaxed">
                {isPro 
                  ? 'Tienes escaneos ilimitados por IA, modo taller sin cortes y soporte exclusivo.' 
                  : 'Desbloquea escaneos por IA ilimitados y funciones de taller avanzadas.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#D8CEBC]/60 flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#8C7A68]">
            {isPro ? 'Membresía activa e ilimitada' : 'Acceso gratuito limitado'}
          </span>
          <button
            onClick={onOpenSubscriptionModal}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shadow-xs flex items-center space-x-1 cursor-pointer active:scale-95 ${
              isPro
                ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{isPro ? 'Gestionar Plan' : 'Actualizar a PRO'}</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex rounded-xl bg-[#EFE8DC] p-1 border border-[#D8CEBC]">
        <button
          onClick={() => setActiveSubTab('completed')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'completed'
              ? 'bg-[#FDFBF7] text-[#2D5A27] shadow-xs'
              : 'text-[#6E5034] hover:text-[#2E2823]'
          }`}
        >
          Proyectos Realizados ({completedList.length})
        </button>
        <button
          onClick={() => setActiveSubTab('scans')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'scans'
              ? 'bg-[#FDFBF7] text-[#2D5A27] shadow-xs'
              : 'text-[#6E5034] hover:text-[#2E2823]'
          }`}
        >
          Historial Escaneos ({scansHistory.length})
        </button>
      </div>

      {/* Sub Tab: Completed Creations */}
      {activeSubTab === 'completed' && (
        <div className="space-y-3">
          {completedList.length === 0 ? (
            <div className="text-center py-10 bg-[#FDFBF7] rounded-2xl border border-dashed border-[#D8CEBC] p-6 space-y-2">
              <Award className="w-8 h-8 text-[#A3B899] mx-auto" />
              <h4 className="text-xs font-bold text-[#2E2823]">Aún no has completado proyectos</h4>
              <p className="text-[11px] text-[#6E5034]">
                Explora el feed de ideas o escanea un residuo y pulsa "Completar Proyecto" para sumar tus creaciones aquí.
              </p>
            </div>
          ) : (
            completedList.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProject(item)}
                className="p-3 bg-[#FDFBF7] rounded-2xl border border-[#D8CEBC] flex items-center justify-between cursor-pointer hover:border-[#2D5A27] transition-all"
              >
                <div className="flex items-center space-x-3">
                  <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#2E2823] line-clamp-1">{item.title}</h4>
                    <div className="flex items-center space-x-2 text-[10px] text-[#6E5034] mt-0.5">
                      <span className="text-emerald-700 font-semibold flex items-center">
                        <CheckCircle className="w-2.5 h-2.5 mr-0.5" />
                        Completado
                      </span>
                      <span>•</span>
                      <span>{item.material}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8C7A68]" />
              </div>
            ))
          )}
        </div>
      )}

      {/* Sub Tab: Scans History */}
      {activeSubTab === 'scans' && (
        <div className="space-y-3">
          {scansHistory.length === 0 ? (
            <div className="text-center py-10 bg-[#FDFBF7] rounded-2xl border border-dashed border-[#D8CEBC] p-6 space-y-2">
              <History className="w-8 h-8 text-[#A3B899] mx-auto" />
              <h4 className="text-xs font-bold text-[#2E2823]">Sin historial de escaneos</h4>
              <p className="text-[11px] text-[#6E5034]">Usa la cámara inteligente para analizar residuos.</p>
            </div>
          ) : (
            scansHistory.map((scan) => (
              <div
                key={scan.id}
                className="p-3 bg-[#FDFBF7] rounded-2xl border border-[#D8CEBC] flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <img src={scan.image_url} alt={scan.item_name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-[#2E2823] line-clamp-1">{scan.item_name}</h4>
                    <div className="flex items-center space-x-2 text-[10px] text-[#6E5034] mt-0.5">
                      <span className="bg-[#6B9AC4]/15 text-[#2B5780] px-1.5 py-0.2 rounded font-medium">
                        {scan.material}
                      </span>
                      <span>Objetivo: {scan.target_purpose}</span>
                    </div>
                    <span className="text-[9px] text-[#8C7A68]">
                      {new Date(scan.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#2D5A27] bg-[#2D5A27]/10 px-2 py-0.5 rounded-full">
                  {scan.recommendations_count || 2} ideas
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Supabase Integration Note Card */}
      <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#D8CEBC] text-[11px] text-[#6E5034] space-y-1.5">
        <h5 className="font-bold text-[#2E2823] flex items-center space-x-1">
          <span>⚡ Configuración de Supabase & Pagos</span>
        </h5>
        <p className="leading-relaxed">
          Autenticación y base de datos en la nube conectadas a través de Supabase:
        </p>
        <pre className="p-2 bg-[#1A1815] text-[#A3B899] rounded-lg text-[10px] overflow-x-auto">
{`VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...`}
        </pre>
        <p className="text-[10px] text-[#8C7A68]">
          Tablas soportadas: <code className="text-[#2D5A27]">projects</code>, <code className="text-[#2D5A27]">scans_history</code> y Supabase Auth.
        </p>
      </div>
    </div>
  );
}
