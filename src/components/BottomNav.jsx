import React from 'react';
import { Compass, ScanLine, UserCheck, Sparkles } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="sticky bottom-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#D8CEBC] px-6 py-2 shadow-lg">
      <div className="flex items-center justify-between relative max-w-xs mx-auto">
        {/* Tab 1: Feed / Explorar */}
        <button
          onClick={() => onTabChange('feed')}
          className={`flex flex-col items-center py-1 transition-all cursor-pointer ${
            activeTab === 'feed' ? 'text-[#2D5A27] font-bold' : 'text-[#8C7A68] hover:text-[#2E2823]'
          }`}
        >
          <Compass className={`w-5 h-5 transition-transform ${activeTab === 'feed' ? 'scale-110' : ''}`} />
          <span className="text-[10px] mt-1">Explorar</span>
        </button>

        {/* Tab 2: Escanear (Hero Center Button) */}
        <div className="relative -top-4 flex flex-col items-center">
          <button
            onClick={() => onTabChange('scan')}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 cursor-pointer border-4 border-[#EFE8DC] ${
              activeTab === 'scan'
                ? 'bg-gradient-to-tr from-[#2D5A27] to-[#4B7B3B] ring-2 ring-[#2D5A27] shadow-[#2D5A27]/40 scale-105'
                : 'bg-gradient-to-tr from-[#2D5A27] to-[#3E7035] hover:scale-105 shadow-[#2D5A27]/30'
            }`}
          >
            <ScanLine className="w-6 h-6 stroke-[2.2]" />
          </button>
          <span className={`text-[10px] mt-0.5 font-bold ${activeTab === 'scan' ? 'text-[#2D5A27]' : 'text-[#6E5034]'}`}>
            Escanear
          </span>
        </div>

        {/* Tab 3: Mis Creaciones / Perfil */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center py-1 transition-all cursor-pointer ${
            activeTab === 'profile' ? 'text-[#2D5A27] font-bold' : 'text-[#8C7A68] hover:text-[#2E2823]'
          }`}
        >
          <UserCheck className={`w-5 h-5 transition-transform ${activeTab === 'profile' ? 'scale-110' : ''}`} />
          <span className="text-[10px] mt-1">Mis Creaciones</span>
        </button>
      </div>
    </nav>
  );
}
