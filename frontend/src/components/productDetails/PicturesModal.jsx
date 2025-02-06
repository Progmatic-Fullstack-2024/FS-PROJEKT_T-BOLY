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
      <div className=" w-[900px] h-[700px] relative flex justify-center max-w-[900px] bg-white rounded-xl">
        <img
          src={allPictures[currentIndex]}
          alt="Large view"
          className="max-w-[800px] w-full h-auto object-contain p-16"
        />
        <button
          type="button"
          onClick={handlePrevious}
          className={`absolute top-1/2 left-6 p-3 text-3xl rounded-full border-2  ${allPictures.length <= 1 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-gray-400 hover:border-primary hover:text-primary'}`}
          disabled={allPictures.length <= 1}
        >
          <MdKeyboardArrowLeft />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={`absolute top-1/2 right-6 p-3 text-3xl rounded-full border-2 ${allPictures.length <= 1 ? 'border-gray-300 text-gray-300 cursor-not-allowed' : 'border-gray-400 hover:border-primary hover:text-primary'}`}
          disabled={allPictures.length <= 1}
        >
          <MdKeyboardArrowRight />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-3 font-medium text-4xl hover:text-primary"
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}

export default PictureModal;
