import React from 'react';
import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import CategoryList from '../components/CategoryList';
import AboutSite from '../components/SectionAboutSite';
import { useGetProductQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

function ProductDetails() {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const qtyRef = useRef();

  const { data: product, isLoading, error } = useGetProductQuery(productId);

  const addToCartHandler = () => {
    console.log('test');
    dispatch(addToCart({ ...product.data, qty }));
    navigate('/cart');
  };

  const commaSeperatedValue = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle quantity change
  const handleQty = (operation) => {
    if (operation === 'add') {
      setQty((qty) => qty + 1);
      qtyRef.current.textContent = qty + 1;
    } else if (operation === 'sub') {
      // Minimum of 0
      if (qty === 1) {
        return;
      }

      setQty((qty) => qty - 1);
      qtyRef.current.textContent = qty - 1;
    }
  };

  return (
    <>
      {isLoading ? (
        ''
      ) : error ? (
        error?.data?.message || error.message
      ) : (
        <>
          <div className="white-space"></div>

          {/* Main product section */}
          <section className="product-detailed-container">
            <div className="go-back-container">
              <button className="go-back" onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>

            <div className="product-detailed">
              <div className="detailed-img-container">
                {/* Wait for product.image to be fetched */}
                {product.data.productImage && (
                  <picture>
                    <source
                      srcSet={product.data.productImage.desktop}
                      media="(min-width: 1110px)"
                    />
                    <source
                      srcSet={product.data.productImage.tablet}
                      media="(min-width: 768px)"
                    />
                    <img src={product.data.productImage.mobile} />
                  </picture>
                )}
              </div>

              {/* Product information, title, price, add to cart, etc */}
              <div className="detailed-product-info">
                {product.data.new && <h3>New Product</h3>}
                <h2>{product.data.name}</h2>
                <p>{product.data.description}</p>
                <h4>
                  {/* @Todo: Regex for comma seperated value */}$
                  <span>
                    {product.data.price &&
                      commaSeperatedValue(product.data.price)}
                  </span>
                </h4>

                <div className="detailed-product-btns">
                  {/* Quantity buttons */}
                  <div className="quantity-group">
                    <button
                      onClick={() => handleQty('sub')}
                      className="qty qty-sub"
                    >
                      <div>-</div>
                    </button>
                    <div className="qty qty-value">
                      <div ref={qtyRef}>1</div>
                    </div>
                    <button
                      onClick={() => handleQty('add')}
                      className="qty qty-add"
                    >
                      <div>+</div>
                    </button>
                  </div>

                  {/* Add to cart button */}
                  <Button
                    className={'btn btn-primary'}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Product features and whats in the box */}
          <section className="detailed-information-container">
            <div className="detailed-information">
              {/* Features */}
              <div className="detailed-features">
                <h2>Features</h2>
                <p>{product.data.features}</p>
              </div>

              {/* Whats in the box */}
              <div className="detailed-included">
                <div className="datiled-included-one">
                  <h2>In The Box</h2>
                </div>
                <div className="datiled-included-two">
                  <ul>
                    {product.data.includes &&
                      product.data.includes.map((included, index) => (
                        <li key={index}>
                          <span>{`${included.quantity}x`}</span>
                          {included.item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="detailed-gallery-container">
            <div className="detailed-gallery">
              {/* Top/left side of gallery */}
              <div className="gallery-part-one">
                <div className="img-container-one">
                  {product.data.gallery && (
                    <picture>
                      <source
                        srcSet={product.data.gallery.first.desktop}
                        media="(min-width: 1110px)"
                      />
                      <source
                        srcSet={product.data.gallery.first.tablet}
                        media="(min-width: 768px)"
                      />
                      <img src={product.data.gallery.first.mobile} />
                    </picture>
                  )}
                </div>

                <div className="img-container-two">
                  {product.data.gallery && (
                    <picture>
                      <source
                        srcSet={product.data.gallery.second.desktop}
                        media="(min-width: 1110px)"
                      />
                      <source
                        srcSet={product.data.gallery.second.tablet}
                        media="(min-width: 768px)"
                      />
                      <img src={product.data.gallery.second.mobile} />
                    </picture>
                  )}
                </div>
              </div>

              {/* Bottom/right side of gallery */}
              <div className="gallery-part-two">
                <div className="img-container-one">
                  {product.data.gallery && (
                    <picture>
                      <source
                        srcSet={product.data.gallery.third.desktop}
                        media="(min-width: 1110px)"
                      />
                      <source
                        srcSet={product.data.gallery.third.tablet}
                        media="(min-width: 768px)"
                      />
                      <img src={product.data.gallery.third.mobile} />
                    </picture>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* "You may also like" section */}
          <section className="recommended-container">
            <div className="recommended">
              <h2>You May Also Like</h2>

              {/* Recommended cards */}
              <div className="recommended-card-container">
                {product.data.others &&
                  product.data.others.map((other, index) => {
                    return (
                      <div key={index} className="recommended-card">
                        <div className="img-container">
                          {other.image && (
                            <picture>
                              <source
                                srcSet={other.image.desktop}
                                media="(min-width: 1110px)"
                              />
                              <source
                                srcSet={other.image.tablet}
                                media="(min-width: 768px)"
                              />
                              <img src={other.image.mobile} />
                            </picture>
                          )}
                        </div>

                        {/* Link to each recommended product */}
                        <h3>{other.name}</h3>
                        <Button
                          slug={`/${other.category}/${other.slug}`}
                          className="btn btn-primary"
                        >
                          See Product
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>

          {/* Category panels */}
          <section className="section category detailed">
            <div className="section category-container">
              <CategoryList />
            </div>
          </section>

          {/* About site component */}
          <AboutSite className={'product-detailed-page'} />
        </>
      )}
    </>
  );
}

export default ProductDetails;
