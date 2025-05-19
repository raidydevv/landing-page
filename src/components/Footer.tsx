import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm w-full">
      vagashomeoffice &copy; {new Date().getFullYear()} - Todos os direitos reservados.
    </footer>
  );
};

export default Footer; 