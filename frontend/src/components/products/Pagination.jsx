import React, { useContext } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext';

import getPageNumbers from '../../utils/getPageNumbers';

export default function Pagination({ totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useContext(LanguageContext);

  const pageNumber = Number(searchParams.get('page')) || 1;

  const setPageNumber = (value) => {
    if (value) {
      searchParams.set('page', value);
    } else {
      searchParams.delete('page');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center h-12 gap-2">
        <button
          type="button"
          onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
          disabled={pageNumber <= 1}
        >
          <div
            className={`flex items-center justify-center px-2 h-10 ms-0 leading-tight text-2xl border border-1 rounded-full ${pageNumber <= 1 ? 'cursor-not-allowed text-gray-300 border-gray-200' : 'text-gray-900 bg-white  border-gray-400 hover:text-primary hover:border-primary'}`}
          >
            <div className="sr-only">{t('previous')}</div>
            <MdKeyboardArrowLeft />
          </div>
        </button>
        {getPageNumbers(pageNumber, totalPages).map((page) => (
          <div key={page}>
            <button
              type="button"
              onClick={() => setPageNumber(page)}
              className={`px-4 h-10 leading-tight rounded-full ${page === pageNumber ? 'text-white bg-primary border-primary' : 'text-gray-900 bg-white border-gray-400 border hover:text-primary hover:border-primary'}`}
            >
              {page}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setPageNumber(Math.min(totalPages, pageNumber + 1))}
          disabled={pageNumber >= totalPages || pageNumber <= 0}
        >
          <div
            className={`flex items-center justify-center px-2 h-10 ms-0 leading-tight text-2xl border border-1  rounded-full ${pageNumber >= totalPages || pageNumber <= 0 ? 'cursor-not-allowed text-gray-300 border-gray-200' : 'text-gray-900 bg-white  border-gray-400 hover:text-primary hover:border-primary'}`}
          >
            <div className="sr-only">{t('next')}</div>
            <MdKeyboardArrowRight />
          </div>
        </button>
      </div>
    </div>
  );
}
