import { useState } from 'react';
import EditOrderStatus from './EditOrderStatus';
import OrderedProduct from './OrderedProduct';
import { IoIosArrowDropdown } from 'react-icons/io';
export default function OrderRow({ order }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr className="border-b dark:border-gray-600 hover:bg-orange-200">
        <td className="px-4 py-3">
          {order.user.lastName} {order.user.firstName}
        </td>
        <td className="px-4 py-3 hidden md:table-cell">{order.user.email}</td>
        <td className="px-4 py-3 hidden md:table-cell">{order.user.adress}</td>
        <td className="px-4 py-3 hidden md:table-cell">{order.totalPrice}$</td>
        <td className="px-4 py-3">
          <EditOrderStatus order={order} />
        </td>
        <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
        <td className="px-4 py-3 text-center" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex cursor-pointer">
            <h5>SHOW</h5> <IoIosArrowDropdown className="w-4 h-4 ml-2 " />
          </div>
        </td>
      </tr>
      {isOpen && (
        <tr className="">
          <td colSpan="7" className=" w-full">
            <div className="overflow-x-auto w-full bg-white">
              <table className="w-full text-sm text-left text-gray-500 overflow-x-scroll">
                <thead className="text-xs text-white uppercase bg-gray-300">
                  <tr>
                    <th>Product name</th>
                    <th>Product image</th>
                    <th>Product price</th>
                    <th>Ordered quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => (
                    <OrderedProduct key={product.product.id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
