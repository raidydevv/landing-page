import React, { useRef, useState, useEffect } from 'react';
import logoHomeOffice from '../assets/logohomeoffice.png';
// import videoFile from '../assets/videoprositecomlegendatamanhotop.mp4';
import { IoVolumeMute } from "react-icons/io5";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  // Adiciona a animação de pulsação ao DOM quando o componente é montado
  useEffect(() => {
    // Cria um elemento de estilo para a animação de pulsação
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes pulse-animation {
        0% {
          box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.7);
          transform: scale(1);
        }
        50% {
          box-shadow: 0 0 0 10px rgba(124, 58, 237, 0);
          transform: scale(1.03);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(124, 58, 237, 0);
          transform: scale(1);
        }
      }
      .pulse-button {
        animation: pulse-animation 2s infinite;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      // Remove o estilo ao desmontar o componente
      document.head.removeChild(styleEl);
    };
  }, []);

  // Autoplay do vídeo ao montar
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {}); // Silencia erros de autoplay bloqueado
      }
    }
  }, []);

  // Atualiza a barra de progresso com easing customizado
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => {
      const duration = video.duration || 1;
      const current = video.currentTime;
      // Easing: rápido no início, lento no fim (expoente 0.85)
      const eased = Math.pow(current / duration, 0.85);
      setProgress(eased);
    };
    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [videoRef]);

  // Função para ativar o áudio
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.volume = 1;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Função para scroll suave até o botão de transformar resultados
  const scrollToTransformarBtn = () => {
    const el = document.getElementById('btn-transformar');
    if (el) {
      const targetY = el.getBoundingClientRect().top + window.scrollY - 450;
      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = 1800; // duração mais lenta em ms
      let start: number | null = null;

      function step(timestamp: number) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * progress);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    }
  };

  return (
    <section className="text-white py-10 sm:py-16 md:py-20 pt-16">
      <div className="container mx-auto px-4">
        {/* Em mobile, invertemos a ordem - vídeo primeiro, depois texto */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          {/* Conteúdo da esquerda */}
          <div className="w-full md:w-1/2 mt-5 md:mt-0 md:pr-6">
            <div className="mb-4">
              <span className="inline-block bg-indigo-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                GUIA COMPLETO: HOME OFFICE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Ganhe DINHEIRO em casa e conquiste sua independência financeira
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-300">
              Descubra como trabalhar de qualquer lugar do mundo e criar novas fontes de renda com este guia passo a passo para o mercado home office.
            </p>
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="flex -space-x-2">
                <img className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-black" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Usuário" />
                <img className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-black" src="https://randomuser.me/api/portraits/women/2.jpg" alt="Usuário" />
                <img className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-black" src="https://randomuser.me/api/portraits/men/3.jpg" alt="Usuário" />
              </div>
              <p className="ml-3 sm:ml-4 text-xs sm:text-sm text-gray-400">
                <span className="font-bold text-white">Milhares de pessoas</span> já conquistaram sua liberdade geográfica
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                className="pulse-button bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:opacity-90 transition duration-300 w-full sm:w-auto text-center"
                onClick={scrollToTransformarBtn}
              >
                GARANTIR MEU E-BOOK 🔥
              </button>
              <div className="flex items-center justify-center sm:justify-start text-gray-400 py-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base">Acesso vitalício</span>
              </div>
            </div>
          </div>
          
          {/* Vídeo à direita - em mobile, aparece primeiro */}
          <div className="w-full md:w-1/2 md:pl-2">
            <div className="relative">
              <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-full h-full bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg transform rotate-3"></div>
              <div className="relative bg-gray-900 p-3 sm:p-6 rounded-lg shadow-2xl">
                {/* Player de vídeo personalizado com arquivo local */}
                <div className="rounded-md shadow-lg mb-4 w-full overflow-hidden" style={{padding: 0}}>
                  <div className="w-full aspect-video relative video-container">
                    {/* Vídeo local */}
                    <video 
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster={logoHomeOffice}
                      preload="metadata"
                      playsInline
                      muted={isMuted}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src="https://res.cloudinary.com/drhfjrq8a/video/upload/videoprositecomlegendatamanhotop_1_blnf5d.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                    {/* Botão de áudio centralizado sobre o vídeo */}
                    {isMuted && (
                      <button
                        onClick={handleUnmute}
                        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 rounded-full flex items-center justify-center shadow-2xl p-4 hover:bg-opacity-90 transition transform hover:scale-110"
                        aria-label="Ativar áudio"
                        style={{ pointerEvents: 'auto' }}
                      >
                        <IoVolumeMute className="w-12 h-12 text-white" />
                      </button>
                    )}
                    {/* Controles personalizados */}
                    <div 
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer"
                      onClick={togglePlay}
                      style={{backgroundColor: isPlaying ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.3)'}}
                    >
                      {!isPlaying && (
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-30 hover:scale-110">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Barra de progresso customizada */}
                    <div className="absolute left-0 right-0 bottom-0 h-2 bg-gray-700 rounded-b-md overflow-hidden z-30">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-purple-600 transition-all duration-200"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-black bg-opacity-60 p-3 sm:p-4 rounded-md">
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <div className="text-gray-400">Preço normal</div>
                    <div className="text-gray-400 line-through">R$ 59,90</div>
                  </div>
                  <div className="flex justify-between mb-3 sm:mb-4 text-base sm:text-lg">
                    <div className="font-bold text-white">Oferta especial</div>
                    <div className="font-bold text-white" style={{ fontSize: '19px' }}>R$ 19,90</div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full mb-2">
                    <div className="bg-red-500 h-2 rounded-full w-4/5"></div>
                  </div>
                  <div className="text-xs sm:text-sm text-red-400 mb-3 sm:mb-4">
                    Oferta por tempo limitado!
                  </div>
                  <ul className="space-y-1 sm:space-y-2 mb-2 sm:mb-4 text-sm sm:text-base">
                    <li className="flex items-center text-gray-300">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Acesso vitalício ao e-book</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>+ 15 sites e plataformas confiáveis</span>
                    </li>
                    <li className="flex items-center text-gray-300">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Template de currículo otimizado</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 