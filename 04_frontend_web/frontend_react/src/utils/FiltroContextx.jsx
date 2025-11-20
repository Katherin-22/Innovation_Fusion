import React, { createContext, useContext, useState } from 'react';

const FiltroContext = createContext();

export const useFiltro = () => {
  const context = useContext(FiltroContext);
  if (!context) {
    throw new Error('useFiltro debe usarse dentro de un FiltroProvider');
  }
  return context;
};

export const FiltroProvider = ({ children }) => {
  const [filtro, setFiltro] = useState('todos');
  
  return (
    <FiltroContext.Provider value={{ filtro, setFiltro }}>
      {children}
    </FiltroContext.Provider>
  );
};