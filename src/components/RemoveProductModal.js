import React from "react";
import { removeFromCart } from "../redux/features/cart/cartSlice";
import { closeModal } from "../redux/features/products/productsSlice";
import { useDispatch } from "react-redux";
export default function Modal() {
  const dispatch = useDispatch();
  return (
    <div>
      <aside className="modal-container">
        <div className="modal">
          <h4>Remove Product from your shopping cart?</h4>
          <div className="btn-container">
            <button
              type="button"
              className="btn confirm-btn"
              onClick={() => {
                dispatch(removeFromCart());
                dispatch(closeModal());
              }}
            >
              confirm
            </button>
            <button
              type="button"
              className="btn clear-btn"
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
