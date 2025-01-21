import { useEffect } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './slider.css';

export default function FilterByPrice({
  minPrice,
  maxPrice,
  setMaxPrice,
  setMinPrice,
  handleFilterByPrice,
  priceRange,
  handleClearFilterByPrice
}) {
  const min = priceRange.rangeMin;
  const max = priceRange.rangeMax;

  useEffect(() => {
    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  return (
    <div className="flex flex-col gap-2 p-6 border-2 rounded-lg mb-10">
      <h3 className="text-xl mb-6">Filter by price</h3>
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
      <div className="flex justify-between mt-1 mb-3">
        <div>€{minPrice}</div>
        <div>€{maxPrice}</div>
      </div>
      <div className="flex justify-between">
      <button
          className="w-28 rounded-xl border-2 p-2 hover:border-gray-900"
          type="button"
          onClick={handleClearFilterByPrice}
        >
          Clear
        </button>
        <button
          className="w-28 rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
          type="button"
          onClick={handleFilterByPrice}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
