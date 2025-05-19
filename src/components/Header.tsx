import React from 'react';
import CountdownBanner from './CountdownBanner';

const Header: React.FC = () => {
  // Definir ou restaurar a data-alvo do cronômetro
  // (Apenas manter se for usado em CountdownBanner, senão pode remover)
  return (
    <header className="bg-black shadow-lg fixed top-0 left-0 w-full z-50 border-b border-gray-800">
      <CountdownBanner />
    </header>
  );
};

export default Header; 