import React from 'react';

export default function CategoryButtonSkeleton() {
  return (
    <div className="w-40 mt-4 flex flex-col items-center animate-pulse">
      <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 shadow-md" />
      <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 mt-4 rounded" />
    </div>
  );
}
