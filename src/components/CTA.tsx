import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CTA: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false
  });

  // Validate fields with proper formatting
  useEffect(() => {
    // Validate name (at least 3 characters)
    const nameValid = name.trim().length >= 3;
    
    // Validate email format with strict domain validation
    // This regex validates common email patterns and ensures proper domain format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|co|io|info|biz|me|tv)$/;
    const emailValid = emailRegex.test(email);
    
    // Validate phone (exactly 11 digits for Brazilian mobile format)
    // Remove non-numeric characters for validation
    const phoneDigits = phone.replace(/\D/g, '');
    const phoneValid = phoneDigits.length === 11;
    
    // Update error states
    setErrors({
      name: name.trim() !== '' && !nameValid,
      email: email.trim() !== '' && !emailValid,
      phone: phone.trim() !== '' && !phoneValid
    });
    
    // Set form validity
    setFormValid(nameValid && emailValid && phoneValid);
  }, [name, email, phone]);

  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Keep only digits
    const digits = value.replace(/\D/g, '');
    
    // Format according to Brazilian mobile phone format (11 digits)
    let formattedPhone = '';
    if (digits.length <= 2) {
      formattedPhone = digits;
    } else if (digits.length <= 7) {
      formattedPhone = `${digits.slice(0, 2)} ${digits.slice(2)}`;
    } else if (digits.length <= 11) {
      formattedPhone = `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7)}`;
    } else {
      // Limit to 11 digits
      formattedPhone = `${digits.slice(0, 2)} ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
    
    setPhone(formattedPhone);
  };

  // Handle email change with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Convert to lowercase and limit length
    const formattedEmail = value.toLowerCase().slice(0, 50);
    setEmail(formattedEmail);
  };

  // Add animation styles
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes lock-vibration {
        0% { transform: rotate(0deg); }
        10% { transform: rotate(-5deg); }
        20% { transform: rotate(5deg); }
        30% { transform: rotate(-5deg); }
        40% { transform: rotate(5deg); }
        50% { transform: rotate(-5deg); }
        60% { transform: rotate(5deg); }
        70% { transform: rotate(-5deg); }
        80% { transform: rotate(5deg); }
        90% { transform: rotate(-5deg); }
        100% { transform: rotate(0deg); }
      }
      .lock-icon {
        display: inline-block;
      }
      .lock-icon.vibrate {
        animation: lock-vibration 1s ease-in-out infinite;
      }
      .input-error {
        border-color: #ef4444 !important;
      }
      .error-message {
        color: #ef4444;
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }
      
      /* Botão ativo com animação suave entre cores */
      @keyframes btn-color-change {
        0% { background-color: #10b981; }
        25% { background-color: #059669; }
        50% { background-color: #047857; }
        75% { background-color: #059669; }
        100% { background-color: #10b981; }
      }
      
      .btn-active {
        background-image: linear-gradient(to right, #10b981, #047857, #10b981);
        background-size: 200% auto;
        animation: btn-gradient 3s ease infinite;
      }
      
      @keyframes btn-gradient {
        0% { background-position: 0% center; }
        50% { background-position: 100% center; }
        100% { background-position: 0% center; }
      }
      
      .btn-active:hover {
        animation: btn-gradient 1.5s ease infinite;
        box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
      }
      
      /* Botão inativo com animação suave entre cores cinzas */
      @keyframes btn-disabled-color-change {
        0% { background-color: #4b5563; }
        50% { background-color: #374151; }
        100% { background-color: #4b5563; }
      }
      
      .btn-disabled {
        background-image: linear-gradient(to right, #4b5563, #374151, #4b5563);
        background-size: 200% auto;
        animation: btn-disabled-gradient 4s ease infinite;
      }
      
      @keyframes btn-disabled-gradient {
        0% { background-position: 0% center; }
        50% { background-position: 100% center; }
        100% { background-position: 0% center; }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
  };
  }, []);

  return (
    <section id="cta" className="py-10 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-black rounded-xl shadow-xl overflow-hidden border border-gray-800">
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center bg-gray-800 rounded-lg px-3 py-1 mb-3">
                  <span className="text-green-500 text-lg mr-2">✓</span>
                  <span className="text-white text-sm">Atendimento personalizado</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Comece sua jornada home office</h3>
                <p className="text-gray-400 text-sm">Fale com um de nossos especialistas</p>
                    </div>

              <form className="space-y-3">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                          Seu nome
                        </label>
                        <input 
                          type="text" 
                          id="name"
                    className={`w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-white text-sm ${errors.name ? 'input-error' : ''}`}
                          placeholder="Digite seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                          required
                        />
                  {errors.name && (
                    <div className="error-message">Nome deve ter pelo menos 3 caracteres</div>
                  )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                          Seu melhor e-mail
                        </label>
                        <input 
                          type="email" 
                          id="email"
                    className={`w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-white text-sm ${errors.email ? 'input-error' : ''}`}
                          placeholder="Digite seu e-mail"
                          value={email}
                    onChange={handleEmailChange}
                          required
                        />
                  {errors.email && (
                    <div className="error-message">Digite um e-mail válido (exemplo: seu@email.com)</div>
                  )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">
                          Celular (WhatsApp)
                        </label>
                        <input 
                          type="tel" 
                          id="phone"
                    className={`w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 text-white text-sm ${errors.phone ? 'input-error' : ''}`}
                          placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={handlePhoneChange}
                          required
                        />
                  {errors.phone && (
                    <div className="error-message">O número deve ter 11 dígitos (DDD + número)</div>
                  )}
                      </div>
                      
                {formValid ? (
                  <motion.a
                    href="https://wa.link/s1h50h"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center mt-2 relative overflow-hidden"
                    style={{ backgroundColor: '#10b981' }}
                  >
                    <motion.div
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gray-800 z-0"
                      style={{ transformOrigin: '100% 50%' }}
                    />
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                      </svg>
                      FALAR COM ESPECIALISTA
                    </span>
                  </motion.a>
                ) : (
                  <motion.button
                    className="w-full text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center mt-2 cursor-not-allowed opacity-80 relative overflow-hidden"
                    disabled
                    style={{ backgroundColor: '#10b981' }}
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-gray-800 z-0"
                      style={{ transformOrigin: '100% 50%' }}
                    />
                    <span className="relative z-10 flex items-center">
                      <span className="lock-icon vibrate">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
                        </svg>
                      </span>
                      FALAR COM ESPECIALISTA
                    </span>
                  </motion.button>
                )}
                    </form>

              <div className="mt-4 text-center">
                <p className="text-gray-400 text-xs">
                        Transforme seu futuro profissional hoje mesmo!
                      </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 