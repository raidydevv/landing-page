import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

function App() {
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitModal(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  useEffect(() => {
    if (showExitModal && window.fbq) {
      window.fbq('trackCustom', 'ExitIntentModalShown');
    }
  }, [showExitModal]);

  useEffect(() => {
    // Evitar múltiplas exibições por sessão
    if (showExitModal) {
      sessionStorage.setItem('exit_modal_shown', 'true');
    }
  }, [showExitModal]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState === 'hidden' &&
        window.innerWidth < 768 &&
        !showExitModal &&
        !sessionStorage.getItem('exit_modal_shown')
      ) {
        setShowExitModal(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [showExitModal]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (
        e.touches &&
        e.touches[0].clientY < 10 &&
        window.innerWidth < 768 &&
        !showExitModal &&
        !sessionStorage.getItem('exit_modal_shown')
      ) {
        setShowExitModal(true);
      }
    };
    document.addEventListener('touchmove', handleTouchMove);
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, [showExitModal]);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-purple-800">
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">⚠️</span>
              <h2 className="text-2xl font-extrabold mb-4 text-white">VOCÊ VAI MESMO FECHAR ESSA TELA?</h2>
      </div>
            <p className="mb-4 text-gray-300 text-base">
              Você está prestes a perder a chance de mudar de vida com algo simples, direto e que já está funcionando pra centenas de pessoas.
            </p>
            <p className="mb-4 text-blue-300 text-base">
              📘 O e-book te mostra como sair do zero e começar a ganhar dinheiro de casa, mesmo sem experiência, investindo quase nada.
            </p>
            <p className="mb-4 text-red-400 text-base">
              🚨 É o tipo de conteúdo que ninguém quer te mostrar — porque funciona de verdade.
            </p>
            <p className="mb-4 text-gray-300 text-base">
              🔒 Sem enrolação. Sem papo furado. Só o que dá resultado.
            </p>
            <p className="mb-6 text-purple-200 text-base font-semibold">
              👉 Vai fechar essa aba e continuar reclamando da vida, ou vai dar o primeiro passo agora?
            </p>
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition mb-3 text-lg shadow-lg"
              onClick={() => setShowExitModal(false)}
            >
              QUERO COMEÇAR AGORA
            </button>
            <button
              className="w-full text-gray-400 hover:text-gray-200 text-sm py-2 rounded-lg transition"
              onClick={() => setShowExitModal(false)}
            >
              NÃO. Prefiro continuar no perrengue
        </button>
          </div>
        </div>
      )}
      </div>
  )
}

export default App
