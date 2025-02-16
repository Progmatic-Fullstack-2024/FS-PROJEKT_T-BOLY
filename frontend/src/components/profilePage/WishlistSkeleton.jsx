import { t } from 'i18next';

export default function WishlistSkeleton() {
  return (
    <div className="mx-auto w-full h-full bg-white rounded-lg shadow-md p-8 animate-pulse">
      <h1 className="text-2xl font-bold mb-4">{t('wishlist')}</h1>
      <ul className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded" />
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded" />
          </li>
        ))}
      </ul>
    </div>
  );
}
