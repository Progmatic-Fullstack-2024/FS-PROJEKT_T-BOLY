import { useEffect, useState } from "react";
import CategoryButton from "./CategoryButton";
import categoryService from "../../services/categoryService";

export default function CategoryButtons() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: "20px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {categories.map((category, idx) => (
        <CategoryButton key={category.id} category={category} idx={idx} />
      ))}
    </div>
  );
}

