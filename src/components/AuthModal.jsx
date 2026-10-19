import React, { useState } from 'react';
import { X, Lock, Mail, User, LogIn, UserPlus, AlertCircle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        });
        if (error) {
          throw error;
        }
        setSuccessMessage('¡Bienvenido de vuelta a EcoCraft!');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(data.user || data.session?.user);
          onClose();
        }, 800);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password
        });
        if (error) {
          throw error;
        }
        setSuccessMessage('¡Cuenta creada con éxito! Sesión iniciada.');
        setTimeout(() => {
          if (onAuthSuccess) onAuthSuccess(data.user || data.session?.user);
          onClose();
        }, 800);
      }
    } catch (err) {
      console.error(err);
      let msg = err.message || 'Error al procesar la autenticación';
      if (msg.includes('Invalid login credentials') || msg.includes('invalid_grant')) {
        msg = 'Credenciales incorrectas. Verifica tu email y contraseña.';
      } else if (msg.includes('User already registered')) {
        msg = 'Este correo ya tiene una cuenta. Intenta iniciar sesión.';
      }
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-[#D8CEBC]">
        {/* Header */}
        <div className="p-4 border-b border-[#D8CEBC] flex items-center justify-between bg-[#EFE8DC]/60">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#2E2823]">Comunidad EcoCraft</h3>
              <p className="text-[10px] text-[#6E5034]">Sincroniza tus EcoPuntos y creaciones</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/5 text-[#6E5034] hover:bg-black/10 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-4 pb-0">
          <div className="flex bg-[#EFE8DC] p-1 rounded-xl border border-[#D8CEBC]">
            <button
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'login'
                  ? 'bg-[#FDFBF7] text-[#2D5A27] shadow-xs'
                  : 'text-[#6E5034] hover:text-[#2E2823]'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Iniciar Sesión</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === 'register'
                  ? 'bg-[#FDFBF7] text-[#2D5A27] shadow-xs'
                  : 'text-[#6E5034] hover:text-[#2E2823]'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Registrarse</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleAuth} className="p-5 space-y-3.5 text-xs">
          {/* Notifications */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Email input */}
          <div>
            <label className="font-bold text-[#6E5034] block mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C7A68] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8CEBC] rounded-xl text-xs placeholder-[#8C7A68] focus:outline-none focus:ring-1 focus:ring-[#2D5A27] text-[#2E2823]"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="font-bold text-[#6E5034] block mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8C7A68] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D8CEBC] rounded-xl text-xs placeholder-[#8C7A68] focus:outline-none focus:ring-1 focus:ring-[#2D5A27] text-[#2E2823]"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#2D5A27] via-[#3E7035] to-[#2D5A27] text-white font-extrabold text-xs rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-60 active:scale-95"
          >
            <span>
              {loading 
                ? 'Conectando con Supabase...' 
                : (activeTab === 'login' ? 'Entrar a EcoCraft' : 'Crear Mi Cuenta Eco')}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Dismiss as guest */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-[#6E5034] hover:text-[#2E2823] underline cursor-pointer"
            >
              Continuar como invitado sin cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
