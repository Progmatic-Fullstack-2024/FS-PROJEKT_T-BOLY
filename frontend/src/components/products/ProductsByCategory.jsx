import { useState, useEffect } from 'react';
import { ImList } from 'react-icons/im';
import { MdGridView } from 'react-icons/md';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import DisplayedProductsNumber from './DisplayedProductsNumber.jsx';
import FilterByAge from './FilterByAge.jsx';
import FilterByPlayersNumber from './FilterByPlayersNumber.jsx';
import FilterByPrice from './FilterByPrice.jsx';
import Nav from './Nav.jsx';
import Pagination from './Pagination.jsx';
import ProductsGrid from './ProductsGrid.jsx';
import ProductsList from './ProductsList.jsx';
import SelectCategoryInput from './SelectCategoryInput.jsx';
import Sorting from './Sorting.jsx';
import categoryService from '../../services/categoryService.js';
import productService from '../../services/productService.js';

export default function ProductsByCategory() {
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const { categoryId } = useParams();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const [gridView, setGridView] = useState(true);
  const [priceRange, setPriceRange] = useState({});

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setCategoryName(
          categoryId === 'all'
            ? 'All products'
            : (await categoryService.getCategoryById(categoryId)).name,
        );

        const productData = await productService.getAllProductsByCategory(
          categoryId,
          searchParams.toString(),
        );

        setProductsByCategory(productData.products);
        setTotalPages(productData.totalPages);
        setTotalProducts(productData.totalProducts);
        setPriceRange({ rangeMin: productData.minPriceDb, rangeMax: productData.maxPriceDb });
      } catch (error) {
        toast.error('Failed to fetch data. Please try again later.');
      }
    };
    fetchCategoryAndProducts();
  }, [categoryId, searchParams]);

  useEffect(() => {
    searchParams.set('page', 1);
    searchParams.set('limit', 9);
    setSearchParams(searchParams);
  }, [categoryId]);

  useEffect(() => {
    if (priceRange.rangeMin !== undefined && priceRange.rangeMax !== undefined) {
      setMinPrice(priceRange.rangeMin);
      setMaxPrice(priceRange.rangeMax);
    }
    setMinAge(0);
    setMaxAge(100);
  }, [categoryId, priceRange.rangeMin, priceRange.rangeMax]);

  const handleGridView = () => {
    setGridView(true);
    searchParams.set('page', 1);
    searchParams.set('limit', 9);
    setSearchParams(searchParams);
  };
  const handleListView = () => {
    setGridView(false);
    searchParams.set('page', 1);
    searchParams.set('limit', 6);
    setSearchParams(searchParams);
  };

  return (
    <div className="md:m-20">
      <h1 className="text-primary m-8 text-3xl font-medium">Products</h1>
      <div className="flex gap-32 m-8">
        <div className="shrink-0 md:w-80 hidden md:block">
          <Nav />
          {priceRange?.rangeMin && (
            <FilterByPrice
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
              priceRange={priceRange}
            />
          )}
          <FilterByAge
            minAge={minAge}
            maxAge={maxAge}
            setMaxAge={setMaxAge}
            setMinAge={setMinAge}
          />
        </div>
        <div>
          <h1 className=" hidden md:block mb-12 text-3xl">{categoryName}</h1>
          <div className="flex flex-col md:flex-row md:gap-80 gap-6 md:items-center md:mb-12">
            <div className="flex md:flex-row flex-col justify-between gap-6 md:mb-0 mb-8">
              <SelectCategoryInput />
              <button
                onClick={handleGridView}
                className={`hidden md:block text-2xl ${gridView ? 'text-primary border-primary' : 'text-gray-200 hover:text-gray-900'}`}
                type="button"
              >
                <MdGridView />
              </button>
              <button
                onClick={handleListView}
                className={`hidden md:block text-xl ${!gridView ? 'text-primary border-primary' : 'text-gray-200 hover:text-gray-900'}`}
                type="button"
              >
                <ImList />
              </button>
              <Sorting />
              <FilterByPlayersNumber />
            </div>
            <DisplayedProductsNumber totalProducts={totalProducts} />
          </div>
          <div>
            {gridView ? (
              <ProductsGrid productsByCategory={productsByCategory} />
            ) : (
              <ProductsList productsByCategory={productsByCategory} />
            )}
            <div className="mt-16">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
