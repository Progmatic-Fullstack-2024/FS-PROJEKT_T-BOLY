import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

function PictureModal({ isOpen, onClose, allPictures, selectedPictureIndex }) {
  const [currentIndex, setCurrentIndex] = useState(selectedPictureIndex);

  useEffect(() => {
    setCurrentIndex(selectedPictureIndex);
  }, [selectedPictureIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === allPictures.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return allPictures.length - 1;
      }
      return prevIndex - 1;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className=" md:w-[900px] md:h-[700px] w-[400px] h-[400px] relative flex justify-center bg-white rounded-xl dark:bg-gray-700">
        <img
          src={allPictures[currentIndex]}
          alt="Large view"
          className="max-w-[800px] w-full h-auto object-contain p-16"
        />
        <button
          type="button"
          onClick={handlePrevious}
          className={`absolute top-1/2 md:left-6 left-2 md:p-3 p-2 md:text-3xl rounded-full border-2  ${allPictures.length <= 1 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-gray-400 hover:border-primary hover:text-primary'}`}
          disabled={allPictures.length <= 1}
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={`absolute top-1/2 md:right-6 right-2 md:p-3 p-2 md:text-3xl rounded-full border-2 ${allPictures.length <= 1 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-gray-400 hover:border-primary hover:text-primary'}`}
          disabled={allPictures.length <= 1}
        >
          <MdKeyboardArrowRight />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="absolute md:top-5 top-2 md:right-5 right-1 md:p-3 p-2 font-medium md:text-4xl text-2xl hover:text-primary"
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}

export default PictureModal;
