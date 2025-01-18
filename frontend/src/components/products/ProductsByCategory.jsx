import { useState, useEffect } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { LuHeart } from 'react-icons/lu';
import { ImList } from 'react-icons/im';
import { MdGridView } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import DisplayedProductsNumber from './DisplayedProductsNumber.jsx';
import Nav from './Nav.jsx';
import Pagination from './Pagination.jsx';
import SelectCategoryInput from './SelectCategoryInput.jsx';
import categoryService from '../../services/categoryService.js';
import productService from '../../services/productService.js';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './slider.css';
import ProductsGrid from './ProductsGrid.jsx';
import ProductsList from './ProductsList.jsx';

export default function ProductsByCategory() {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [sortingOption, setSortingOption] = useState({ sorting: 'name', order: 'asc' });
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const { categoryId } = useParams();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filterByMinPrice, setFilterByMinPrice] = useState(0);
  const [filterByMaxPrice, setFilterByMaxPrice] = useState(1000);
  const [gridView, setGridView] = useState(true);

  useEffect(() => {
    const fetchCategoryById = async () => {
      try {
        if (categoryId === 'all') {
          setCategoryName('All products');
        } else {
          const data = await categoryService.getCategoryById(categoryId);
          setCategoryName(data.name);
        }
      } catch (error) {
        toast.error('Failed to fetch category name:', error);
      }
    };

    const fetchProductsByCategory = async () => {
      try {
        const { sorting, order } = sortingOption;
        const data = await productService.getAllProductsByCategory(
          categoryId,
          sorting,
          order,
          pageNumber,
          9,
          filterByMinPrice,
          filterByMaxPrice,
        );
        console.log(data);
        setProductsByCategory(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
      } catch (error) {
        toast.error('Failed to fetch products:', error);
      }
    };
    fetchCategoryById();
    fetchProductsByCategory();
  }, [categoryId, sortingOption, pageNumber, filterByMinPrice, filterByMaxPrice]);

  useEffect(() => {
    setPageNumber(1);
  }, [categoryId, sortingOption, filterByMinPrice, filterByMaxPrice]);

  useEffect(() => {
    setMinPrice(0);
    setMaxPrice(1000);
    setFilterByMinPrice(0);
    setFilterByMaxPrice(1000);
  }, [categoryId]);

  const handleSortingChange = (e) => {
    const [sorting, order] = e.target.value.split('-');
    setSortingOption({ sorting, order });
  };

  const handleFilterByPrice = () => {
    setFilterByMinPrice(minPrice);
    setFilterByMaxPrice(maxPrice);
  };

  const handleGridView = () => {
    setGridView(true);
  };
  const handleListView = () => {
    setGridView(false);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageLimit = 3;
    let startPage = Math.max(1, pageNumber - Math.floor(pageLimit / 2));
    const endPage = Math.min(totalPages, startPage + pageLimit - 1);

    if (endPage - startPage + 1 < pageLimit) {
      startPage = Math.max(1, endPage - pageLimit + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  console.log('productsByCategory', productsByCategory);

  return (
    <div className="m-20">
      <h1 className="text-primary m-8 text-3xl">Products</h1>
      <div className="flex gap-32 m-8">
        <div className="shrink-0 md:w-80 hidden md:block">
          <Nav />
          <div className="flex flex-col gap-2 p-6 border-2 rounded-lg">
            <h3 className="text-xl mb-6">Filter by price</h3>
            <RangeSlider
              min={0}
              max={1000}
              step={1}
              value={[minPrice, maxPrice]}
              onInput={(value) => {
                setMinPrice(value[0]);
                setMaxPrice(value[1]);
              }}
            />
            <div className="flex justify-between mt-1 mb-3">
              <div>${minPrice}</div>
              <div>${maxPrice}</div>
            </div>
            <div className="flex justify-end">
              <button
                className="w-28 rounded-xl bg-primary p-2 text-white  hover:text-black hover:font-semibold"
                type="button"
                onClick={handleFilterByPrice}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div>
          <h1 className="md:w-80 hidden md:block mb-12 text-4xl">{categoryName}</h1>
          <div className="flex justify-between mr-44 items-center">
            <div className="flex justify-between gap-5">
              <button
                onClick={handleGridView}
                className={`text-2xl ${gridView ? 'text-primary border-primary' : 'text-gray-200 hover:text-gray-400'}`}
                type="button"
              >
                <MdGridView />
              </button>
              <button
                onClick={handleListView}
                className={`text-xl ${!gridView ? 'text-primary border-primary' : 'text-gray-200 hover:text-gray-400'}`}
                type="button"
              >
                <ImList />
              </button>
              <select
                className="p-2"
                id="sorting"
                onChange={handleSortingChange}
                value={`${sortingOption.sorting}-${sortingOption.order}`}
              >
                <option value="name-asc">Default sorting</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating-asc">Rating (Low to High)</option>
                <option value="rating-desc">Rating (High to Low)</option>
              </select>
            </div>
            <DisplayedProductsNumber pageNumber={pageNumber} totalProducts={totalProducts} />
          </div>

          <SelectCategoryInput />
          {gridView ? <ProductsGrid productsByCategory={productsByCategory} /> : <ProductsList />}
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            getPageNumbers={getPageNumbers}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
