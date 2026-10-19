import React, { useState } from 'react';
import { Leaf, Flame, Sparkles, User, LogIn, LogOut, ChevronDown, Crown } from 'lucide-react';

export default function Header({ 
  ecoPoints = 120, 
  recycledStreak = 5, 
  user = null, 
  isPro = false,
  onOpenAuthModal, 
  onSignOut,
  onOpenSubscriptionModal
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const displayName = user 
    ? (user.user_metadata?.name || user.email?.split('@')[0] || 'Eco-Maker') 
    : null;

  return (
    <header className="sticky top-0 z-30 bg-[#EFE8DC]/95 backdrop-blur-md px-4 py-3 border-b border-[#D8CEBC]/70 shadow-xs">
      <div className="flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2D5A27] to-[#4B7B3B] flex items-center justify-center shadow-sm shadow-[#2D5A27]/20 border border-[#2D5A27]/30">
            <Leaf className="w-5 h-5 text-[#FDFBF7]" strokeWidth={2.4} />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-tight text-[#2E2823] font-serif">
                EcoCraft <span className="text-[#2D5A27] font-sans text-xs bg-[#2D5A27]/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">AI</span>
              </span>
            </div>
            <p className="text-[10px] text-[#6E5034] font-medium leading-none mt-0.5">
              Upcycling Creativo & Sostenible
            </p>
          </div>
        </div>

        {/* Status badges & User Auth & Pro Badge */}
        <div className="flex items-center space-x-1.5">
          {/* Recycled streak */}
          <div className="flex items-center space-x-1 bg-[#FDFBF7] border border-[#D8CEBC] px-2 py-1 rounded-full shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="text-xs font-bold text-[#6E5034]">
              {recycledStreak}
            </span>
          </div>

          {/* Eco-points counter */}
          <div className="flex items-center space-x-1 bg-gradient-to-r from-[#2D5A27]/10 to-[#4B7B3B]/15 border border-[#2D5A27]/20 px-2 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2D5A27]" />
            <span className="text-xs font-extrabold text-[#2D5A27]">
              {ecoPoints}
            </span>
          </div>

          {/* Golden/Botanical PRO Badge */}
          <button
            onClick={onOpenSubscriptionModal}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full shadow-xs text-xs font-black transition-all cursor-pointer active:scale-95 ${
              isPro
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border border-amber-300 shadow-amber-500/20'
                : 'bg-amber-100/90 text-amber-900 border border-amber-300 hover:bg-amber-200'
            }`}
          >
            <Crown className={`w-3.5 h-3.5 ${isPro ? 'text-amber-100 fill-amber-100' : 'text-amber-700'}`} />
            <span className="text-[10px] uppercase tracking-wide">
              {isPro ? 'PRO' : 'Planes'}
            </span>
          </button>

          {/* User Profile / Auth Button */}
          <div className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-1 bg-[#2D5A27] text-white px-2 py-1 rounded-full shadow-xs text-xs font-bold hover:bg-[#3E7035] transition-all cursor-pointer"
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] uppercase">
                    {displayName?.[0] || 'U'}
                  </span>
                  <span className="max-w-[42px] truncate text-[11px]">{displayName}</span>
                  <ChevronDown className="w-3 h-3 text-white/70" />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-1.5 w-44 bg-[#FDFBF7] border border-[#D8CEBC] rounded-2xl shadow-xl py-1.5 z-50 animate-fadeIn text-xs">
                    <div className="px-3 py-1.5 border-b border-[#D8CEBC]/60">
                      <p className="text-[10px] text-[#6E5034]">Sesión iniciada como</p>
                      <p className="font-bold text-[#2E2823] truncate">{user.email}</p>
                      {isPro && (
                        <span className="inline-block mt-0.5 text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-md">
                          ⭐ Miembro PRO Activo
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        onOpenSubscriptionModal();
                      }}
                      className="w-full text-left px-3 py-2 text-amber-900 hover:bg-amber-50 flex items-center space-x-2 transition-colors cursor-pointer border-b border-[#D8CEBC]/40 font-semibold"
                    >
                      <Crown className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isPro ? 'Gestionar PRO' : 'Ver Membresía PRO'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        if (onSignOut) onSignOut();
                      }}
                      className="w-full text-left px-3 py-2 text-rose-700 hover:bg-rose-50 flex items-center space-x-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1 bg-[#FDFBF7] hover:bg-[#E8DEC8] text-[#2D5A27] border border-[#2D5A27]/40 px-2 py-1 rounded-full shadow-xs text-xs font-bold transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#2D5A27]" />
                <span className="text-[11px]">Entrar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
