import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { LuHeart } from 'react-icons/lu'

export default function ProductsGrid({productsByCategory, }) {
  return (
    <div className="flex flex-wrap gap-8 justify-between mr-44">
            {productsByCategory && productsByCategory.length > 0 ? (
              productsByCategory.map((product, index) => (
                <div>
                  <div className="flex flex-col gap-1" key={index}>
                    <div className="relative">
                      <img
                        className="border-2 rounded-2xl w-80 h-80 p-7 pr-8 shrink-0"
                        src={product.pictureUrl}
                        alt={product.name}
                      />
                      <button
                        type="submit"
                        className="absolute top-2 right-2 rounded-full flex items-center justify-center"
                      >
                        <LuHeart className="m-2" />
                      </button>
                      <button
                        type="submit"
                        className="absolute top-9 right-2 rounded-full flex items-center justify-center"
                      >
                        <FiShoppingCart className="m-2" />
                      </button>
                    </div>
                    <div className="w-60">{product.name}</div>
                    <div className="font-medium text-lg">${product.price}</div>
                    <div>Rating: {product.rating}</div>
                  </div>
                </div>
              ))
            ) : (
              <div>No products found for this category.</div>
            )}
          </div>
  )
}

