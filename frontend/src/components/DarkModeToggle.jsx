import useDarkMode from '../hooks/useDarkMode';

export default function DarkModeToggle({ className }) {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      className={`px-2 bg-gray-300 bg-opacity-50 dark:bg-gray-700 text-black dark:text-white rounded-md transition ${className}`}
    >
      {theme === 'light' ? (
        <span>
          ☀️<span className="hidden md:inline-block">Light Mode</span>
        </span>
      ) : (
        <span>
          🌙<span className="hidden md:inline-block">Dark Mode</span>
        </span>
      )}
    </button>
  );
}
