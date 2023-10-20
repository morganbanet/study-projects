import React from 'react';
import Button from '../components/Button';

function ProductListing({ product, categorySlug }) {
  return (
    <>
      <div className="img-container">
        <picture>
          <source
            srcSet={product.categoryImage.desktop}
            media="(min-width: 1110px)"
          />
          <source
            srcSet={product.categoryImage.tablet}
            media="(min-width: 768px)"
          />
          <img src={product.categoryImage.mobile} />
        </picture>
      </div>

      <div className="product-info">
        {product.new && <h3>New Product</h3>}
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <Button
          slug={`/${categorySlug}/${product.slug}/${product._id}`}
          className={'btn btn-primary'}
        >
          See Product
        </Button>
      </div>
    </>
  );
}

export default ProductListing;
