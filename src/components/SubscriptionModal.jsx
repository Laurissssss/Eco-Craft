import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Crown, 
  Zap, 
  Users, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SUBSCRIPTION_PLANS = [
  {
    id: 'monthly',
    name: 'Plan Mensual',
    price: '$3.99 USD',
    period: '/ mes',
    badge: null,
    highlight: false,
    features: [
      'Escaneos ilimitados por IA',
      'Asistente de taller sin interrupciones',
      'Acceso a biblioteca completa de guías DIY',
      'Insignia de Eco-Maker Verificado'
    ]
  },
  {
    id: 'annual',
    name: 'Plan Anual',
    price: '$29.99 USD',
    period: '/ año',
    badge: 'Más Popular • Ahorra 35%',
    highlight: true,
    features: [
      'Todo lo del Plan Mensual',
      'Equivale a solo $2.49 USD / mes',
      'Generación ilimitada de proyectos personalizados',
      'Soporte artesanal prioritario por chat'
    ]
  },
  {
    id: 'duo',
    name: 'Plan Dúo',
    price: '$5.99 USD',
    period: '/ mes',
    badge: 'Colaborativo',
    highlight: false,
    features: [
      '2 Perfiles ecológicos independientes',
      'Retos de reciclaje colaborativos en casa',
      'Sincronización compartida de Eco-Puntos',
      'Escaneos y taller ilimitados para ambos'
    ]
  }
];

export default function SubscriptionModal({ onClose, onUpgradeSuccess, currentIsPro = false }) {
  const [step, setStep] = useState(1); // 1: Select Plan, 2: Checkout Form, 3: Success
  const [selectedPlanId, setSelectedPlanId] = useState('annual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Card Form Fields
  const [cardHolder, setCardHolder] = useState('Carlos Mendoza');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('321');

  const selectedPlan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[1];

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setProcessingStatus('Conectando con pasarela segura SSL 256-bit...');

    setTimeout(() => {
      setProcessingStatus('Validando fondos y token de tarjeta...');
    }, 900);

    setTimeout(() => {
      setProcessingStatus('Activando membresía EcoCraft PRO...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2D5A27', '#E76F51', '#F4A261', '#E9C46A', '#6B9AC4']
        });
      } catch (e) {
        console.warn(e);
      }

      if (onUpgradeSuccess) {
        onUpgradeSuccess(selectedPlan);
      }
    }, 2500);
  };

  const handleFillDemoCard = () => {
    setCardHolder('Ana Silva (Demo)');
    setCardNumber('4000 1234 5678 9010');
    setCardExpiry('12/29');
    setCardCvv('789');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-[#FDFBF7] rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#D8CEBC]">
        {/* Modal Top Header */}
        <div className="p-4 border-b border-[#D8CEBC] flex items-center justify-between bg-gradient-to-r from-[#EFE8DC] via-[#F4EDE2] to-[#EFE8DC]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-xs">
              <Crown className="w-4 h-4 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-extrabold text-sm text-[#2E2823]">EcoCraft PRO</h3>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-md uppercase tracking-wider">
                  Premium
                </span>
              </div>
              <p className="text-[10px] text-[#6E5034]">Upcycling ilimitado impulsado por IA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/5 text-[#6E5034] hover:bg-black/10 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* STEP 1: PLAN SELECTION */}
          {step === 1 && (
            <div className="space-y-3.5">
              <div className="text-center space-y-1">
                <h4 className="text-sm font-extrabold text-[#2E2823]">
                  Elige el plan ideal para tu taller ecológico
                </h4>
                <p className="text-xs text-[#6E5034]">
                  Cancela en cualquier momento sin compromisos
                </p>
              </div>

              {/* Plans List */}
              <div className="space-y-2.5">
                {SUBSCRIPTION_PLANS.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#2D5A27] bg-[#2D5A27]/5 ring-2 ring-[#2D5A27] shadow-sm'
                          : 'border-[#D8CEBC] bg-[#FDFBF7] hover:bg-[#EFE8DC]/40'
                      }`}
                    >
                      {plan.badge && (
                        <span className="absolute -top-2.5 right-4 text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                          {plan.badge}
                        </span>
                      )}

                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2.5">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                              isSelected
                                ? 'bg-[#2D5A27] border-[#2D5A27] text-white'
                                : 'border-[#8C7A68] bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-[#2E2823]">{plan.name}</h5>
                            <span className="text-sm font-extrabold text-[#2D5A27]">
                              {plan.price}
                              <span className="text-[10px] font-normal text-[#6E5034]">{plan.period}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Benefits Bullets */}
                      <div className="mt-2.5 pt-2 border-t border-[#D8CEBC]/50 space-y-1">
                        {plan.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center space-x-1.5 text-[11px] text-[#6E5034]">
                            <Check className="w-3 h-3 text-[#2D5A27] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Guarantees Box */}
              <div className="p-2.5 bg-[#EFE8DC]/60 rounded-xl border border-[#D8CEBC] flex items-center justify-center space-x-2 text-[10px] text-[#6E5034]">
                <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
                <span>Garantía de reembolso total de 14 días • Pago 100% cifrado</span>
              </div>
            </div>
          )}

          {/* STEP 2: CHECKOUT SIMULATION */}
          {step === 2 && (
            <div className="space-y-3.5">
              {/* Back to plans button */}
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-[#2D5A27] flex items-center space-x-1 hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cambiar de plan</span>
              </button>

              {/* Selected Plan Summary Banner */}
              <div className="p-3 bg-[#EFE8DC]/80 rounded-2xl border border-[#D8CEBC] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#6E5034] block">Plan Seleccionado</span>
                  <h4 className="text-xs font-bold text-[#2E2823]">{selectedPlan.name}</h4>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-[#2D5A27]">{selectedPlan.price}</span>
                  <span className="text-[10px] text-[#6E5034] block">{selectedPlan.period}</span>
                </div>
              </div>

              {/* Simulated Card Form */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#6E5034]">Datos de la Tarjeta</label>
                  <button
                    type="button"
                    onClick={handleFillDemoCard}
                    className="text-[10px] font-semibold text-[#2D5A27] underline cursor-pointer"
                  >
                    Usar tarjeta de prueba
                  </button>
                </div>

                {/* Cardholder */}
                <div>
                  <span className="text-[10px] text-[#8C7A68] block mb-0.5">Nombre del Titular</span>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full p-2 bg-white border border-[#D8CEBC] rounded-xl text-xs text-[#2E2823] focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
                  />
                </div>

                {/* Card Number with Card Logos */}
                <div>
                  <span className="text-[10px] text-[#8C7A68] block mb-0.5">Número de Tarjeta</span>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-9 pr-16 py-2 bg-white border border-[#D8CEBC] rounded-xl text-xs font-mono text-[#2E2823] focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
                    />
                    <CreditCard className="w-4 h-4 text-[#8C7A68] absolute left-3 top-1/2 -translate-y-1/2" />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                      <span className="text-[9px] font-extrabold text-blue-700 bg-blue-50 px-1 rounded border border-blue-200">
                        VISA
                      </span>
                      <span className="text-[9px] font-extrabold text-amber-700 bg-amber-50 px-1 rounded border border-amber-200">
                        MC
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-[#8C7A68] block mb-0.5">Vencimiento</span>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2 bg-white border border-[#D8CEBC] rounded-xl text-xs font-mono text-[#2E2823] focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C7A68] block mb-0.5">CVV</span>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full p-2 bg-white border border-[#D8CEBC] rounded-xl text-xs font-mono text-[#2E2823] focus:outline-none focus:ring-1 focus:ring-[#2D5A27]"
                      />
                      <Lock className="w-3 h-3 text-[#8C7A68] absolute right-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security info */}
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-[10px] text-emerald-800">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Simulación segura. No se realizará ningún cobro monetario real.</span>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS SCREEN */}
          {step === 3 && (
            <div className="py-6 px-2 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#2D5A27] to-[#4B7B3B] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#2D5A27]/30 ring-4 ring-emerald-100">
                <Crown className="w-8 h-8 text-amber-300" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  ¡Suscripción Activada!
                </span>
                <h3 className="text-lg font-black text-[#2E2823] mt-2 font-serif">
                  ¡Bienvenido a EcoCraft PRO!
                </h3>
                <p className="text-xs text-[#6E5034] mt-1 max-w-xs mx-auto leading-relaxed">
                  Ahora disfrutas de escaneos de IA sin restricciones, modo taller completo y proyectos ilimitados.
                </p>
              </div>

              <div className="p-3 bg-[#EFE8DC]/80 rounded-2xl border border-[#D8CEBC] text-xs text-left space-y-1.5">
                <div className="flex justify-between text-[#6E5034]">
                  <span>Plan contratado:</span>
                  <span className="font-bold text-[#2E2823]">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between text-[#6E5034]">
                  <span>Importe simulado:</span>
                  <span className="font-bold text-[#2D5A27]">{selectedPlan.price}</span>
                </div>
                <div className="flex justify-between text-[#6E5034]">
                  <span>Estado:</span>
                  <span className="font-bold text-emerald-700">Activo (Membresía PRO)</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-[#2D5A27] text-white font-extrabold text-xs rounded-2xl shadow-md hover:bg-[#3E7035] transition-all cursor-pointer active:scale-95"
              >
                Comenzar a Crear con PRO
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer (Steps 1 & 2) */}
        {step !== 3 && (
          <div className="p-4 border-t border-[#D8CEBC] bg-[#FDFBF7]">
            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#2D5A27] via-[#3E7035] to-[#2D5A27] text-white font-bold text-xs shadow-md shadow-[#2D5A27]/25 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center space-x-1.5 border border-[#2D5A27]/40 cursor-pointer"
              >
                <span>Continuar al Pago ({selectedPlan.price})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-700 via-[#2D5A27] to-emerald-700 text-white font-black text-xs shadow-md shadow-[#2D5A27]/30 hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center space-x-2 border border-[#2D5A27]/50 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{processingStatus}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Pagar {selectedPlan.price} {selectedPlan.period}</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
