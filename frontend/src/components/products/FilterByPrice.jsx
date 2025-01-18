import React from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './slider.css';

export default function FilterByPrice({minPrice, maxPrice, setMaxPrice, setMinPrice, handleFilterByPrice}) {
  return (
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
  );
}
