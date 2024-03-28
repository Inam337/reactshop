// CategoryList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../redux/actions/categoriesActions";
import { Link } from "react-router-dom";

function CategoryList() {
  const {
    items: categories,
    status,
    error,
  } = useSelector((state) => state.categories);
  const loading = useSelector((state) => state.categories.loading);
  const iconsList = [
    {
      index: 0,
      icons: "bi-phone",
    },
    {
      index: 1,
      icons: "bi-laptop",
    },
    {
      index: 2,
      icons: "bi-heart",
    },
    {
      index: 3,
      icons: "bi-vinyl",
    },
    {
      index: 4,
      icons: "bi-basket3",
    },
    {
      index: 5,
      icons: "bi-house-heart",
    },
    {
      index: 6,
      icons: "bi-xbox",
    },
    {
      index: 7,
      icons: "bi-aspect-ratio",
    },
    {
      index: 8,
      icons: "bi-collection",
    },
    {
      index: 9,
      icons: "bi-flower1",
    },
    {
      index: 10,
      icons: "bi-front",
    },
    {
      index: 11,
      icons: "bi-gpu-card",
    },
    {
      index: 12,
      icons: "bi-x-diamond",
    },
    {
      index: 13,
      icons: "bi-watch",
    },
    {
      index: 14,
      icons: "bi-suitcase",
    },
    {
      index: 15,
      icons: "bi-universal-access-circle",
    },
    {
      index: 16,
      icons: "bi-usb-mini",
    },
    {
      index: 17,
      icons: "bi-tags",
    },
    {
      index: 18,
      icons: "bi-speedometer",
    },
    {
      index: 19,
      icons: "bi-snow3",
    },
    {
      index: 20,
      icons: "bi-stop",
    },
    {
      index: 21,
      icons: "bi-peace",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    if (!categories.length && !error) {
      dispatch(fetchCategories());
    }
  }, [categories, error, dispatch]);

  if (loading) {
    return <div className="loading"></div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="col-xs-8 offset-xs-2 col-md-8 offset-md-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
      <div className="main-page">
        <h2>
          <span>Categories</span>
        </h2>

        <ul className="row category-block">
          {categories.map((category, index) => {
            const foundIcon = iconsList.find((icon) => icon.index === index);
            const iconClassName = foundIcon ? foundIcon.icons : "";

            return (
              <li key={category} className="col-lg-4 category-box">
                <span className="category-text">
                  <Link to={`/products/category/${category}`}>
                    <i className={iconClassName}></i>
                    {category}
                  </Link>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CategoryList;
