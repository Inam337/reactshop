import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDataCategoryByProduct } from "../redux/actions/fetchProductsByCategory";
import { setSelectedCategory } from "../redux/features/products/productByCategorySlice"; // Import the actions from your slice
import { addToCart } from "../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";

function ProductsByCategory() {
  const { category } = useParams();
  const dispatch = useDispatch();

  // Use useSelector to select the relevant state from the Redux store
  const selectedCategory = useSelector(
    (state) => state.productByCategory.selectedCategory
  );
  const products = useSelector((state) => state.productByCategory.products);
  const loading = useSelector((state) => state.productByCategory.loading);
  const error = useSelector((state) => state.productByCategory.error);
  useEffect(() => {
    // Dispatch the setSelectedCategory action to store the selected category
    dispatch(setSelectedCategory(category));

    // Dispatch the fetchDataCategoryByProduct action (if needed)
    dispatch(fetchDataCategoryByProduct(category));
  }, [category, dispatch]);
  const handleAddToCart = (products) => {
    dispatch(addToCart(products));
  };
  if (loading) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products available for this category.</div>;
  }
  console.log("products", products);
  return (
    <div>
      <div class="col-xs-8 offset-xs-2 col-md-8 offset-md-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
        <div className="main-page">
          <h2>
            <span>Products in {selectedCategory}</span>
          </h2>

          <ul className="product-list-block">
            {products &&
              products.products.map((product) => (
                <li key={product.id} className="product-box">
                  <span className="row d-flex">
                    <span className="col-lg-9 d-flex product-title">
                      <h3>{product.title}</h3>
                    </span>
                    <span className="col-lg-3 action-buttons">
                      <button
                        className="w-100 btn btn-primary btn-sm text-center mx-1"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <Link
                        to={`/products/${product.id}`}
                        className="w-100 btn btn-info btn-sm text-center  mx-1"
                      >
                        View
                      </Link>
                    </span>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductsByCategory;
