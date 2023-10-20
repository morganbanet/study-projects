import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import AboutSite from '../components/SectionAboutSite';
import ProductListing from '../components/ProductListing';
import { useGetProductsQuery } from '../slices/productsApiSlice';

function CategoryScreen() {
  const { categorySlug } = useParams();

  const categoryTitleCase = `${categorySlug[0].toUpperCase()}${categorySlug.slice(
    1
  )}`;

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery(`?category=${categoryTitleCase}`);

  return (
    <>
      {isLoading ? (
        ''
      ) : error ? (
        error?.data?.message || error.message
      ) : (
        <>
          {/* Top banner */}
          <div className="category-heading">
            <div className="category-heading-container">
              <h1>{categorySlug}</h1>
            </div>
          </div>

          {/* Products listed */}
          <section children className="product-list">
            <div className="product-list-container">
              {products.data.map((product) => (
                <div key={product._id} className="product">
                  <ProductListing
                    product={product}
                    categorySlug={categorySlug}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Category panels */}
          <section className="section category">
            <div className="section category-container">
              <CategoryList />
            </div>
          </section>

          {/* About site component */}
          <AboutSite className={'product-listing-page'} />
        </>
      )}
    </>
  );
}

export default CategoryScreen;
