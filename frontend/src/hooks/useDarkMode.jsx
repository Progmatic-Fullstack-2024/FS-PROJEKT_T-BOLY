import { useContext } from 'react';

import  { ThemeContext } from '../contexts/ThemeContext';

const useDarkMode = () => useContext(ThemeContext);

export default useDarkMode;