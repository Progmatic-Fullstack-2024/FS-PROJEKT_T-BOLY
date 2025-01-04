import CategoryButtons from './components/categoryButtons/CategoryButtons';
import Header from "./components/Header/Header";
export default function App() {
  return (
    <div>
      <div><Header/></div>
      <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Find the Perfect Toy</h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>Our Collections</p>
      <CategoryButtons />
      </div>
    </div>
  );
}
