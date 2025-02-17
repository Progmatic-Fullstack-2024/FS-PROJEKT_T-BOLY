import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  // Load the theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Toggle theme and persist in localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Apply theme to <html> tag for Tailwind or CSS
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
