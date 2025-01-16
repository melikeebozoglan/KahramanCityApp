import React, { createContext, useState, useContext } from 'react';

// Context oluştur
const ThemeContext = createContext();

// Provider bileşeni
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook: Daha kolay erişim için
export const useTheme = () => useContext(ThemeContext);
