import CategoryButtons from '../components/categoryButtons/CategoryButtons';
import Hero from '../components/Hero';
import TopProductsByRating from '../components/products/TopProductsByRating';

export default function Homepage() {
  return (
    <div>
      <Hero />
      <div>
        <CategoryButtons />
        <TopProductsByRating />
      </div>
    </div>
  );
}
