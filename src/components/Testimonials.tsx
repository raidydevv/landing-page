import React, { useState, useRef, useEffect } from 'react';
import { IoVolumeMute } from "react-icons/io5";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  person: string;
  role: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, person, role }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay mutado quando entra em tela
  useEffect(() => {
    const handleIntersection = (entries: any[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.muted = true;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
        }
      });
    };
    const observer = new window.IntersectionObserver(handleIntersection, { threshold: 0.5 });
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  // Atualiza a barra de progresso
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => {
      const duration = video.duration || 1;
      const current = video.currentTime;
      const eased = Math.pow(current / duration, 0.85);
      setProgress(eased);
    };
    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, [videoRef]);

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

  return (
    <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-800 flex flex-col h-full">
      <div className="relative w-full aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          preload="metadata"
          playsInline
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
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
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
          style={{ backgroundColor: isPlaying ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.3)' }}
        >
          {!isPlaying && (
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-30 hover:scale-110">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-2 bg-gray-700 rounded-b-md overflow-hidden z-30">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-purple-600 transition-all duration-200"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <div className="flex items-center">
          <div>
            <p className="font-bold text-white">{person}</p>
            <p className="text-gray-500 text-sm">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Com esse eBook consegui meu primeiro trabalho remoto! Tudo é explicado passo a passo, sem enrolação. As dicas de LinkedIn e os sites de vagas me ajudaram demais!",
      author: "Rodrigo Mendes",
      position: "Empresário, Setor de Tecnologia",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      highlight: "primeiro trabalho remoto"
    },
    {
      quote: "Finalmente um conteúdo sério sobre home office. Me livrei dos golpes e encontrei formas reais de ganhar dinheiro de casa. Já estou aplicando tudo o que aprendi!",
      author: "Amanda Soares",
      position: "Freelancer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      highlight: "2x mais projetos"
    },
    {
      quote: "Achei que seria só mais um guia, mas esse eBook me surpreendeu! Mostra desde como procurar vagas reais até criar renda extra com afiliados. Comecei minha transição da CLT hoje!",
      author: "Carlos Oliveira",
      position: "Afiliado Digital, Fitness",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5,
      highlight: "R$12.000 em vendas"
    }
  ];

  const videoTestimonials = [
    {
      videoUrl: "https://res.cloudinary.com/drhfjrq8a/video/upload/criativodocaracomlegenda_brj6b9.mp4",
      title: "Como transformei minha carreira com o trabalho remoto",
      person: "Ricardo Silva",
      role: "Desenvolvedor Web"
    },
    {
      videoUrl: "https://res.cloudinary.com/drhfjrq8a/video/upload/v1685641234/CRIATIVOMUIECOMLEGENDA_uayvdr.mp4",
      title: "Conquistei a liberdade geográfica e financeira",
      person: "Mariana Costa",
      role: "Designer"
    }
  ];

  // Função para scroll lento até o card do Carlos Oliveira
  const scrollToCarlos = () => {
    const el = document.getElementById('card-carlos');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 40; // offset para header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold bg-purple-600 text-white mb-4">
            CASOS DE SUCESSO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Resultados reais de quem aplicou</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Não são promessas vazias. São histórias reais de pessoas que aplicaram o método e transformaram seus resultados.
          </p>
          
          {/* Seção de avatares - reorganizada para evitar sobreposição */}
          <div className="mt-6 flex flex-col items-center">
            <div className="flex -space-x-2 mb-2">
              {[...Array(12)].map((_, i) => (
                <img 
                  key={i} 
                  className="w-8 h-8 rounded-full border-2 border-black object-cover" 
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`} 
                  alt="Usuário" 
                />
              ))}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              <span className="font-bold text-white">+1.200 pessoas</span> transformaram seus resultados
            </div>
          </div>
        </div>
        
        {/* Vídeo Depoimentos */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Veja quem já transformou sua vida</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoTestimonials.map((video, index) => (
              <VideoPlayer
                key={index}
                videoUrl={video.videoUrl}
                title={video.title}
                person={video.person}
                role={video.role}
              />
            ))}
          </div>
        </div>
        
        {/* Depoimentos em texto */}
        <h3 className="text-2xl font-bold text-white mb-6 text-center">O que nossos clientes dizem</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-900 p-8 rounded-xl shadow-xl hover:shadow-purple-900/20 transition-shadow duration-300 border border-gray-800 flex flex-col h-full"
              id={testimonial.author === 'Carlos Oliveira' ? 'card-carlos' : undefined}
            >
              <div className="mb-4">
                <div className="inline-block bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {testimonial.highlight}
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6 italic flex-grow">{testimonial.quote}</p>
              <div className="flex items-center mt-auto">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full mr-4 border-2 border-purple-500"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 rounded-xl border border-purple-800/30">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Se eles conseguiram, você também pode!</h3>
            <button
              id="btn-transformar"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-lg hover:opacity-90 transition duration-300 transform hover:scale-105"
              onClick={scrollToCarlos}
            >
              QUERO TRANSFORMAR MEUS RESULTADOS AGORA
            </button>
            <p className="mt-4 text-gray-400 text-sm">
              Acesso imediato + Garantia de 30 dias
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 