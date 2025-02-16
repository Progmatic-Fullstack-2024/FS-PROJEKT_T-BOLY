import { useContext, useEffect } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './slider.css';
import { useSearchParams } from 'react-router-dom';

import FilterBySkeleton from './FilterBySkeleton';
import LanguageContext from '../../contexts/LanguageContext';

export default function FilterByPrice({
  minPrice,
  maxPrice,
  setMaxPrice,
  setMinPrice,
  priceRange,
  isLoading,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useContext(LanguageContext);

  const min = priceRange.rangeMin;
  const max = priceRange.rangeMax;

  useEffect(() => {
    setMinPrice(min);
    setMaxPrice(max);
  }, [min, max]);

  const handleFilterByPrice = () => {
    searchParams.set('minimumPrice', minPrice);
    searchParams.set('maximumPrice', maxPrice);
    searchParams.set('page', 1);
    searchParams.set('limit', 9);
    setSearchParams(searchParams);
  };

  const handleClearFilterByPrice = () => {
    setMinPrice(min);
    setMaxPrice(max);
    searchParams.delete('minimumPrice');
    searchParams.delete('maximumPrice');
    searchParams.set('page', 1);
    searchParams.set('limit', 9);
    setSearchParams(searchParams);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'inputMinPrice') {
      if (!Number.isNaN(value)) {
        setMinPrice(value);
      }
    } else if (name === 'inputMaxPrice') {
      if (!Number.isNaN(value)) {
        setMaxPrice(value);
      }
    }
  };
  if (isLoading) {
    return <FilterBySkeleton />;
  }
  return (
    <div className="flex flex-col gap-2 p-6 border-2 rounded-lg mb-10">
      <h3 className="text-xl mb-6">{t('filter by price')}</h3>
      <RangeSlider
        min={min}
        max={max}
        step={1}
        value={[minPrice, maxPrice]}
        onInput={(value) => {
          setMinPrice(value[0]);
          setMaxPrice(value[1]);
        }}
      />
      <div className="flex justify-between mb-3 mt-3">
        <div>
          <span className="text-xl">€</span>
          <input
            type="number"
            name="inputMinPrice"
            value={minPrice}
            onChange={handleInputChange}
            className="w-20 p-2 border-2 rounded-xl text-center hover:border-gray-900"
            min={0}
          />
        </div>
        <div>
          <span className="text-xl">€</span>
          <input
            type="number"
            name="inputMaxPrice"
            value={maxPrice}
            onChange={handleInputChange}
            className="w-20 p-2 border-2 rounded-xl text-center hover:border-gray-900"
            min={0}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="w-28 rounded-xl border-2 p-2 hover:border-gray-900"
          type="button"
          onClick={handleClearFilterByPrice}
        >
          {t('clear')}
        </button>
        <button
          className="w-28 rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
          type="button"
          onClick={handleFilterByPrice}
        >
          {t('apply')}
        </button>
      </div>
    </div>
  );
}
