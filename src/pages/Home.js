import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../redux/actions/searchProductsAction";

import { Link } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(
    (state) => state.searchResults
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    dispatch(searchProducts(searchQuery));
  };

  // Render search results if available
  const renderSearchResults = () => {
    console.log("test searchResults", searchResults);
    if (loading === "loading") {
      return <div className="loading"></div>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (searchResults.length === 0) {
      return null; // Do not render anything if there are no search results
    } else {
      if (searchResults.products.length === 0) {
        return <p>No results found.</p>;
      } else {
        return (
          <div>
            <div className="search-result-block">
              <p>Total results: {searchResults.products.length}</p>
              <ul className="product-list-block">
                {searchResults.products.map((product) => (
                  <li key={product.id} className="product-box">
                    <Link to={`/products/${product.id}`}>
                      {product.title} - ${product.price}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      }
    }
  };
  return (
    <>
      <div className="col-xs-6 offset-xs-3 col-md-6 offset-md-3 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
        <div className="main-page">
          <h2 className="text-center">
            <span>Search Your Favourite Products</span>
          </h2>
          <div class="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="total-count">{searchResults.length}</div>
          )}

          <div className="total-results"> {renderSearchResults()}</div>
        </div>
      </div>
    </>
  );
};
export default Home;
