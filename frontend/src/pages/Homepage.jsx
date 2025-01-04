import Header from '../components/Header/Header';
import CategoryButtons from '../components/categoryButtons/CategoryButtons';
export default function Homepage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>
          Find the Perfect Toy
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>Our Collections</p>
        <CategoryButtons />
      </div>
    </div>
  );
}
