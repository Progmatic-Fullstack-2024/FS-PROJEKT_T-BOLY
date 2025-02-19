import { motion } from 'framer-motion';
import { useContext } from 'react';

import AntImage from '../assets/ant-black.png';
import Logo from '../assets/ant-orange.png';
import LanguageContext from '../contexts/LanguageContext';

const teamMembers = [
  { name: 'Zsuzsi', role: 'Fullstack Developer' },
  { name: 'Réka', role: 'Fullstack Developer' },
  { name: 'Zoli', role: 'Fullstack Developer' },
  { name: 'Jani', role: 'Fullstack Developer' },
  { name: 'Márkó', role: 'Fullstack Developer' },
  { name: 'Csilla', role: 'Scrum Master' },
  { name: 'Norbi', role: 'Product Owner' },
];

export default function About() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="flex flex-col items-center justify-center px-8 md:px-36 text-justify text-gray-900 dark:text-primary">
      <motion.h1
        className="font-agbalumo text-6xl p-10 mb-5 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {t('T-Boly Webshop Project')}
      </motion.h1>

      <motion.p
        className="text-lg leading-relaxed max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {t(
          'The T-Boly full-stack project was part of the Progmatic Bootcamp, aimed at creating a modern and interactive webshop for board games and beyond. The focus was on an engaging user experience, ensuring users can easily browse and find the best games available.',
        )}
      </motion.p>

      <motion.h2
        className="text-4xl font-bold mt-12 mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {t('Meet the Team')} 🐜
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:flex md:flex-wrap justify-center gap-12 mt-8 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="flex flex-col w-1/6 shrink-0 items-center bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
          >
            <img src={AntImage} alt={member.name} className="h-20 w-20 object-contain" />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-700 dark:text-gray-300">{t(member.role)}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        <motion.div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-bold mb-2">🏗 {t('Development Insights')}</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t(
              'The project had 26 branches, over 400 commits, and 5 developers worked collaboratively on both backend and frontend.',
            )}
          </p>
        </motion.div>

        <motion.div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-bold mb-2">🌟 {t('Features & Goals')}</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t(
              'A seamless experience for users with filtering, browsing, and intuitive recommendations to find the best games. Integrated Stripe payments, authentication, and a powerful admin panel.',
            )}
          </p>
        </motion.div>
      </motion.div>

      <motion.img
        src={Logo}
        alt="T-Boly Logo"
        className="h-20 mt-16"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 3 }}
      />
    </div>
  );
}
