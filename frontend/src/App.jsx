import CategoryButtons from './components/categoryButtons/CategoryButtons';
export default function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Find the Perfect Toy</h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>Our Collections</p>
      <CategoryButtons />
    </div>
  );
}
