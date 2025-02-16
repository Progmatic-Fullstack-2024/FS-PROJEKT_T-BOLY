import useDarkMode from "../hooks/useDarkMode";

export default function DarkModeToggle() {
  const {theme, toggleTheme} = useDarkMode();

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      className="px-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-md transition"
    >
      {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

