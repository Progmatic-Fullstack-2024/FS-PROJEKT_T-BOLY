import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './slider.css';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function FilterByPrice({ minAge, maxAge, setMaxAge, setMinAge }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterByAge = () => {
    searchParams.set('minAge', minAge);
    searchParams.set('maxAge', maxAge);
    searchParams.set('page', 1);
    searchParams.set('limit', 9);
    setSearchParams(searchParams);
  };

  const handleClearFilterByAge = () => {
    setMinAge(0);
    setMaxAge(100);
    searchParams.delete('minAge');
    searchParams.delete('maxAge');
    searchParams.set('page', 1);
    searchParams.set('limit', 9);
    setSearchParams(searchParams);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'inputMinAge' && !Number.isNaN(value)) {
      setMinAge(value);
    } else if (name === 'inputMaxAge' && !Number.isNaN(value)) {
      setMaxAge(value);
    } else {
      toast.error('You need to give a number.');
    }
  };

  return (
    <div className="flex flex-col gap-2 p-6 border-2 rounded-lg mb-10">
      <h3 className="text-xl mb-6">Filter by Age</h3>
      <RangeSlider
        min={0}
        max={100}
        step={1}
        value={[minAge, maxAge]}
        onInput={(value) => {
          setMinAge(value[0]);
          setMaxAge(value[1]);
        }}
      />
      <div className="flex justify-between mb-3 mt-3">
        <div>
          <input
            type="number"
            name="inputMinAge"
            value={minAge}
            onChange={handleInputChange}
            className="w-20 p-2 border-2 rounded-xl text-center hover:border-gray-900"
            min={0}
          />
        </div>
        <div>
          <input
            type="number"
            name="inputMaxAge"
            value={maxAge}
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
          onClick={handleClearFilterByAge}
        >
          Clear
        </button>
        <button
          className="w-28 rounded-xl border-2 border-primary bg-primary p-2 text-white  hover:text-black hover:border-gray-900"
          type="button"
          onClick={handleFilterByAge}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
