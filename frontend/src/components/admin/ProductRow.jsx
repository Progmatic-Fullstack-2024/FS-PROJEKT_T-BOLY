import { BsFillStarFill, BsStar, BsStarHalf } from 'react-icons/bs';

import ProductAdminModal from './CreateProductByAdmin.jsx';
import DeleteProductModal from './DeleteProductModal.jsx';

function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    if (i <= Math.floor(rating)) {
      stars.push(<BsFillStarFill key={`${i}-${rating}`} className="h-full text-yellow-500" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(<BsStarHalf key={`${i}-${rating}`} className="h-full text-yellow-500" />);
    } else {
      stars.push(<BsStar key={`${i}-${rating}`} className="h-full text-gray-300" />);
    }
  }
  return stars;
}

export default function ProductRow({ product, onUpdate, onDelete, isStatus }) {
  return (
    <tr className="border-b dark:border-gray-600 hover:bg-orange-200">
      {/* <td className="w-4 px-4 py-3">
        <div className="flex items-center">
          <input
            id="checkbox-1"
            type="checkbox"
            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td> */}
      <td className="px-4 py-3">{product.name}</td>
      <td className="px-4 py-3 hidden md:table-cell">{product.description}</td>
      <td className="px-4 py-3">
        {product?.categoryProduct?.map((c) => c.category.name).join(', ')}
      </td>
      <td className="px-4 py-3 text-right">€ {product.price}</td>
      <td className="px-4 py-3 text-right">{product.quantity}</td>
      <td className="px-4 py-3">
        <div className="flex justify-center space-x-1">{renderStars(4.5)}</div>
      </td>
      {isStatus ? (
        <td className="px-4 py-3">
          <div className="flex justify-center space-x-1">
            {product.isDeleted ? (
              <p className="text-red-600">Inactive</p>
            ) : (
              <p className="text-green-600">Active</p>
            )}
          </div>
        </td>
      ) : (
        ''
      )}

      <td className="px-4 py-3">
        <div className="flex space-x-2">
          <ProductAdminModal productIdFromProductRow={product.id} onUpdate={onUpdate} />
          <DeleteProductModal product={product} onDelete={onDelete} />
        </div>
      </td>
    </tr>
  );
}
