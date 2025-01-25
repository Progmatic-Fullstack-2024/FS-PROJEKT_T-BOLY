import { useState, useEffect } from 'react';
import { ImList } from 'react-icons/im';
import { MdGridView } from 'react-icons/md';
import { useParams } from 'react-router-dom';
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
  const [sortingOption, setSortingOption] = useState({ sorting: 'name', order: 'asc' });
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const { categoryId } = useParams();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(100);
  const [filterByMinPrice, setFilterByMinPrice] = useState(0);
  const [filterByMaxPrice, setFilterByMaxPrice] = useState(1000);
  const [filterByMinAge, setFilterByMinAge] = useState(0);
  const [filterByMaxAge, setFilterByMaxAge] = useState(100);
  const [filterByPlayersNumber, setFilterByPlayersNumber] = useState('all');
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

        const { sorting, order } = sortingOption;
        const productData = await productService.getAllProductsByCategory(
          categoryId,
          sorting,
          order,
          pageNumber,
          limit,
          filterByMinPrice,
          filterByMaxPrice,
          filterByMinAge,
          filterByMaxAge,
          filterByPlayersNumber,
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
  }, [
    categoryId,
    sortingOption,
    pageNumber,
    limit,
    filterByMinPrice,
    filterByMaxPrice,
    filterByMinAge,
    filterByMaxAge,
    filterByPlayersNumber,
  ]);

  useEffect(() => {
    setPageNumber(1);
  }, [
    categoryId,
    sortingOption,
    filterByMinPrice,
    filterByMaxPrice,
    filterByMinAge,
    filterByMaxAge,
    filterByPlayersNumber,
  ]);

  useEffect(() => {
    if (priceRange.rangeMin !== undefined && priceRange.rangeMax !== undefined) {
      setMinPrice(priceRange.rangeMin);
      setMaxPrice(priceRange.rangeMax);
    }
    setFilterByMinPrice(0);
    setFilterByMaxPrice(1000);
    setMinAge(0);
    setMaxAge(100);
    setFilterByMinAge(0);
    setFilterByMaxAge(100);
    setFilterByPlayersNumber('all');
  }, [categoryId, priceRange.rangeMin, priceRange.rangeMax]);

  const handleSortingChange = (e) => {
    const [sorting, order] = e.target.value.split('-');
    setSortingOption({ sorting, order });
  };

  const handleFilterByPrice = () => {
    setFilterByMinPrice(minPrice);
    setFilterByMaxPrice(maxPrice);
  };

  const handleClearFilterByPrice = () => {
    setMinPrice(priceRange.rangeMin);
    setMaxPrice(priceRange.rangeMax);
    setFilterByMinPrice(0);
    setFilterByMaxPrice(1000);
  };

  const handleFilterByAge = () => {
    setFilterByMinAge(minAge);
    setFilterByMaxAge(maxAge);
  };

  const handleClearFilterByAge = () => {
    setMinAge(0);
    setMaxAge(100);
    setFilterByMinAge(0);
    setFilterByMaxAge(100);
  };

  const handleFilterByPlayersNumber = (e) => {
    setFilterByPlayersNumber(e.target.value);
  };

  const handleGridView = () => {
    setGridView(true);
    setPageNumber(1);
    setLimit(9);
  };
  const handleListView = () => {
    setGridView(false);
    setPageNumber(1);
    setLimit(6);
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
              handleFilterByPrice={handleFilterByPrice}
              handleClearFilterByPrice={handleClearFilterByPrice}
            />
          )}
          <FilterByAge
            minAge={minAge}
            maxAge={maxAge}
            setMaxAge={setMaxAge}
            setMinAge={setMinAge}
            handleFilterByAge={handleFilterByAge}
            handleClearFilterByAge={handleClearFilterByAge}
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
              <Sorting handleSortingChange={handleSortingChange} sortingOption={sortingOption} />
              <FilterByPlayersNumber
                handleFilterByPlayersNumber={handleFilterByPlayersNumber}
                filterByPlayersNumber={filterByPlayersNumber}
              />
            </div>
            <DisplayedProductsNumber
              limit={limit}
              pageNumber={pageNumber}
              totalProducts={totalProducts}
            />
          </div>
          <div>
            {gridView ? (
              <ProductsGrid productsByCategory={productsByCategory} />
            ) : (
              <ProductsList productsByCategory={productsByCategory} />
            )}
            <div className="mt-16">
              <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
