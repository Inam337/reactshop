// ProductDetail.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../redux/actions/fetchProductActions";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  console.log(selectedProduct);
  const error = useSelector((state) => state.products.error);
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    dispatch(fetchProductById(id)); // Use the 'id' from the URL to fetch the selected product
  }, [dispatch, id]); // Include 'id' as a dependency

  if (!selectedProduct || !selectedProduct.product) {
    // Handle the case where selectedProduct is undefined or product is undefined
    return <div className="loading"></div>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  const { title, description, price, thumbnail, images } =
    selectedProduct.product;
  return (
    <div class="col-xs-8 offset-xs-2 col-md-8 offset-md-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
      <div className="main-page">
        <h2>
          <span>Product Detail</span>
        </h2>

        <div className="product-detail-block">
          <div className="card">
            <div class="card-body">
              <div class="row ">
                <div class="col-lg-8 ">
                  <div class="row ">
                    <div class="col-lg-4 card-thumbnail d-flex">
                      <img src={thumbnail} class="card-img-top" alt="..." />
                    </div>
                    <div class="col-lg-8">
                      <h5 class="card-title">{title}</h5>
                      <p class="card-text">{description}</p>
                      <span class="card-price"> ${price}</span>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="card-body card-body-image">
                    <Swiper
                      // install Swiper modules
                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                      spaceBetween={20}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                      onSwiper={(swiper) => console.log()}
                      onSlideChange={() => console.log("slide change")}
                    >
                      {images.map((img) => (
                        <SwiperSlide key={img}>
                          <img src={img} alt="product.id" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <a href="/products" class="btn btn-primary btn-sm">
                Add to Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
