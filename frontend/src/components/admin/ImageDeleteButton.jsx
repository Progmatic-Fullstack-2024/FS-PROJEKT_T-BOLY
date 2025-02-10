import React, { useState } from 'react';
import { toast } from 'react-toastify';

import productImagesService from '../../services/productImagesService';
import productService from '../../services/productService';

export default function ImageDeleteButton({ url, productId, onUpdate }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleImageDelete = async () => {
    const productData = await productService.getProductById(productId);
    const pictureUrlArray = await productData.product.morePictureUrl;

    const newPicturArray = await pictureUrlArray.filter((urls) => urls !== url);

    try {
      const updatedProductImages = await productImagesService.updateProductImage(productId, {
        morePictureUrl: newPicturArray,
        urlForDelete: url,
      });
      onUpdate(updatedProductImages);
    } catch (error) {
      toast.error('Faild to upload image.');
    }
  };

  const handleOpenConfirm = async () => {
    setOpenConfirm((prev) => !prev);
    setTimeout(() => setOpenConfirm((prev) => !prev), 2000);
  };

  return !openConfirm ? (
    <button
      type="button"
      onClick={handleOpenConfirm}
      className="absolute -top-1 -right-1 border rounded-full w-6 h-6 text-white hover:bg-red-600 bg-red-400 opacity-70 hover:opacity-100"
    >
      ✗
    </button>
  ) : (
    <button
      type="button"
      onClick={() => handleImageDelete({ url, productId })}
      className="absolute -top-1 -right-1 border rounded-full w-6 h-6 text-white bg-red-600 "
    >
      !
    </button>
  );
}
