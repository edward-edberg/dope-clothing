import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCategoriesMap } from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  // console.log("render/re-rendering category component");
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    // console.log("effect fired calling setProducts");
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        <Outlet />
      </div>
    </>
  );
};

export default Category;
