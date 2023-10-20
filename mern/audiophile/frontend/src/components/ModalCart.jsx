import React from 'react';
import ButtonsQuantity from './ButtonsQuantity';
import Button from './Button';

function CartModalContents() {
  return (
    <>
      <div className="cart-heading">
        <h2>Cart (3)</h2>
        <button className="empty-cart">Remove all</button>
      </div>

      {/* In basket */}
      <div className="cart-product">
        <div className="cart-img-container">
          <img
            src="/images/cart/image-xx99-mark-two-headphones.jpg"
            alt="Product"
          ></img>
        </div>

        <div className="cart-product-details">
          <h3>XX99 MK II</h3>
          <p>
            $<span>2,999</span>
          </p>
        </div>

        <div>
          <ButtonsQuantity />
        </div>
      </div>

      <div className="cart-product">
        <div className="cart-img-container">
          <img src="/images/cart/image-xx59-headphones.jpg" alt="Product"></img>
        </div>

        <div className="cart-product-details">
          <h3>XX59</h3>
          <p>
            $<span>899</span>
          </p>
        </div>

        <div>
          <ButtonsQuantity />
        </div>
      </div>

      <div className="cart-product">
        <div className="cart-img-container">
          <img src="/images/cart/image-yx1-earphones.jpg" alt="Product"></img>
        </div>

        <div className="cart-product-details">
          <h3>YX1</h3>
          <p>
            $<span>599</span>
          </p>
        </div>

        <div>
          <ButtonsQuantity />
        </div>
      </div>

      {/* Total heading */}
      <div className="cart-total-header">
        <h2>Total</h2>
        <p>
          $<span>5,396</span>
        </p>
      </div>

      {/* Checkout button */}
      <Button className="btn btn-primary cart-btn">Checkout</Button>
    </>
  );
}

export default CartModalContents;
