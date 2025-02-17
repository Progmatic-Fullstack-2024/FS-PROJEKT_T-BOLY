import ProductAdminModal from './CreateProductByAdmin.jsx';
import DeleteProductModal from './DeleteProductModal.jsx';

export default function ProductRow({ product, onUpdate, onDelete, isStatus }) {
  return (
    <tr className="border-b dark:border-primary hover:bg-orange-200 dark:hover:bg-gray-600">
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
      <td className="w-20 top-auto place-items-center">
        <img
          className="object-contain max-w-20 max-h-20 border rounded-lg bg-white p-2 dark:bg-gray-800 dark:border-primary"
          src={product.pictureUrl}
          alt="Product"
        />
      </td>
      <td className="px-4 py-3 max-w-6">{product.name}</td>
      <td className="px-4 py-3 hidden md:table-cell">{product.description}</td>
      <td className="px-4 py-3">
        {product?.categoryProduct?.map((c) => c.category.name).join(', ')}
      </td>
      <td className="px-4 py-3 text-right max-w-5">€ {product.price}</td>
      <td className="px-4 py-3 text-right w-3">{product.quantity}</td>
      <td className="px-4 py-3">
        <div className="flex justify-center space-x-1">
          {Math.round(product.rating * 100) / 100}
        </div>
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
