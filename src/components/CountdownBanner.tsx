import React, { useState, useEffect } from 'react';

const CountdownBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 0,
    seconds: 0
  });
  
  // Usando useState para manter a data alvo constante entre renderizações
  const [targetDate] = useState(() => {
    const saved = localStorage.getItem('countdownTargetDate');
    if (saved) {
      return new Date(saved);
    } else {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 15);
      localStorage.setItem('countdownTargetDate', date.toISOString());
      return date;
    }
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        // Converter toda a diferença para minutos e segundos
        const totalMinutes = Math.floor(difference / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({
          minutes: totalMinutes,
          seconds: seconds
        });
      } else {
        // Quando o tempo acabar
        setTimeLeft({ minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft(); // Calcular imediatamente
    
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-purple-900 to-pink-800 text-white py-2 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center text-center h-full">
          <div className="hidden md:block text-lg font-semibold mr-2">
            Promoção especial e-book Home Office acaba em:
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold">{timeLeft.minutes}</span>
              <span className="text-xs uppercase ml-1">MINUTOS</span>
            </div>
            <div className="mx-2 text-xl font-bold relative -top-0.5 flex items-center">:</div>
            <div className="flex items-center">
              <span className="text-xl font-bold">{timeLeft.seconds}</span>
              <span className="text-xs uppercase ml-1">SEG</span>
            </div>
          </div>
          <div className="ml-4">
            <a 
              href="#cta" 
              className="bg-white text-purple-800 px-4 py-1 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Garantir Acesso
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner; 