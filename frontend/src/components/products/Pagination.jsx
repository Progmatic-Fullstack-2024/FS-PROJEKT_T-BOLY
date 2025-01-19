import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

import getPageNumbers from '../../utils/getPageNumbers';

export default function Pagination({ pageNumber, setPageNumber, totalPages }) {
  return (
    <div className="flex mt-16 justify-center mr-44">
      <div className="flex items-center h-12 gap-2">
        <button
          type="button"
          onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
          disabled={pageNumber <= 1}
        >
          <div
            className={`flex items-center justify-center px-2 h-10 ms-0 leading-tight text-2xl text-gray-900 bg-white border border-1 border-gray-400 rounded-full ${pageNumber <= 1 ? 'cursor-not-allowed text-gray-100 border-gray-100' : 'hover:text-primary hover:border-primary'}`}
          >
            <div className="sr-only">Previous</div>
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
            className={`flex items-center justify-center px-2 h-10 ms-0 leading-tight text-2xl text-gray-900 bg-white border border-1 border-gray-400 rounded-full ${pageNumber >= totalPages || pageNumber <= 0 ? 'cursor-not-allowed text-gray-100 border-gray-100' : 'hover:text-primary hover:border-primary'}`}
          >
            <div className="sr-only">Next</div>
            <MdKeyboardArrowRight />
          </div>
        </button>
      </div>
    </div>
  );
}
