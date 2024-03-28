// src/components/ProductList.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/features/cart/cartSlice";
import { fetchProducts } from "../redux/actions/productActions";
import { Link } from "react-router-dom";

const ProductList = () => {
  // const [products, setProducts] = useState([]);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);
  // useEffect(() => {
  //   // Fetch products from the API (https://dummyjson.com/products) and update the 'products' state
  //   // You can use Axios, Fetch, or any other method to fetch the products.
  //   // Here's a simplified example using Fetch:
  //   fetch("https://dummyjson.com/products")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const { products } = data;
  //       setProducts(products);
  //       return;
  //     })
  //     .catch((error) => console.error("Error fetching products: ", error));
  // }, []);

  const handleAddToCart = (products) => {
    dispatch(addToCart(products));
  };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const loadedCount = useSelector((state) => state.products.loadedCount);

  const [displayedProducts, setDisplayedProducts] = useState(10);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLoadMore = () => {
    // Increase the number of displayed products by 10 on load more button click
    setDisplayedProducts(displayedProducts + 10);
  };

  if (loading) {
    return <div className="loading"></div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    // <div>
    //   <h2>Product List</h2>
    //   <ul>
    //     {products &&
    //       products?.map((product) => (
    //         <li key={product.id}>
    //           <div>
    //             <h3>{product.name}</h3>
    //             <p>
    //               Image: <img src={product.thumbnail} alt="" />
    //             </p>
    //             <p>Price: ${product.price}</p>
    //             <p>Description: {product.description}</p>
    //             <Link to={`/product/${product.id}`}>{product.name}</Link>
    //           </div>
    //
    //         </li>
    //       ))}
    //   </ul>
    // </div>
    <div className="col-xs-8 offset-xs-2 col-md-8 offset-md-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
      <div className="main-page">
        <h2>
          <span>Products </span>
        </h2>
        <ul className="product-list-block">
          {products.slice(0, displayedProducts).map((product) => (
            <li key={product.id} className="product-box">
              <h5 class="card-title">{product.title}</h5>
              <span class="card-price"> ${product.price}</span>

              <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                <button
                  className="btn btn-primary btn-sm px-4 me-md-2"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-info btn-sm px-4"
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {displayedProducts < products.length && (
          <div className="load-more-block">
            <button
              className="btn btn-primary load-more-btn"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
