import React from 'react';
import { FaHome, FaSearch, FaBalanceScale, FaUserTie, FaCoins, FaShieldAlt } from 'react-icons/fa';

const Features: React.FC = () => {
  const features = [
    {
      title: 'Comece do Começo',
      description: 'Aprenda a desbravar o oceano azul de oportunidades no mercado de trabalho home office e transforme seu talento em liberdade financeira.',
      icon: <FaHome />
    },
    {
      title: 'Como procurar vagas Home-Office',
      description: 'Descubra maneiras de encontrar vagas de trabalhos legítimas, sem cair em falsas promessas ou oportunidades duvidosas.',
      icon: <FaSearch />
    },
    {
      title: 'Home-Office VS Freelancer',
      description: 'Entenda os conceitos e diferenças entre trabalho formal remoto e trabalho por demanda, e escolha o melhor para seu perfil.',
      icon: <FaBalanceScale />
    },
    {
      title: 'Perfil profissional no linkedIn',
      description: 'Aprenda a construir um perfil profissional que valorize suas qualidades para se destacar dentre os concorrentes.',
      icon: <FaUserTie />
    },
    {
      title: 'Diversificando fontes de renda',
      description: 'Conheça opções como Marketing de Afiliados, E-commerce e Criação de conteúdo online para gerar renda passiva.',
      icon: <FaCoins />
    },
    {
      title: 'Como evitar golpes',
      description: 'Saiba identificar e evitar golpes ou ofertas que só farão você perder tempo, focando em oportunidades legítimas.',
      icon: <FaShieldAlt />
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold bg-purple-600 text-white mb-4">O QUE VOCÊ VAI APRENDER</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transforme sua carreira com trabalho remoto</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Este guia passo a passo vai ensinar você a ganhar dinheiro trabalhando de casa e criar novas fontes de renda para conquistar sua independência financeira.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-5 md:p-8 rounded-xl hover:shadow-xl hover:shadow-purple-900/20 transition-shadow duration-300 border border-gray-700"
            >
              <div className="text-2xl mb-5 bg-gradient-to-br from-purple-500 to-pink-600 text-white inline-flex items-center justify-center p-4 rounded-full shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 break-words leading-snug">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-purple-500/30">
          <div className="flex flex-col items-center">
            <div className="w-full">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">BÔNUS EXCLUSIVOS INCLUÍDOS!</h3>
              <ul className="space-y-3 max-w-2xl mx-auto">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300"><span className="font-semibold text-white">Bônus 1:</span> Compilado com +15 sites e plataformas confiáveis</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300"><span className="font-semibold text-white">Bônus 2:</span> Template de currículo otimizado para candidaturas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 