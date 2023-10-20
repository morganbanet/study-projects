import React from 'react';
import Button from '../components/Button';
import CategoryList from '../components/CategoryList';
import SectionAboutSite from '../components/SectionAboutSite';
import { ReactComponent as Rings } from '/src/assets/svg/home/desktop/pattern-circles.svg';
import { useGetProductsQuery } from '../slices/productsApiSlice';

function HomeScreen() {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery('?featured=true&sort=featuredPosition');

  return (
    <>
      {isLoading ? (
        ''
      ) : error ? (
        error?.data?.message || error.message
      ) : (
        <>
          {/* Card position 1 (hero image) */}
          <section className="home-section hero">
            <div className="hero-container">
              <div className="hero-img-container">
                <picture>
                  <source
                    srcSet={products.data[0].featuredImage.desktop}
                    media="(min-width: 1110px)"
                  />
                  <source
                    srcSet={products.data[0].featuredImage.tablet}
                    media="(min-width: 768px)"
                  />
                  <img src={products.data[0].featuredImage.mobile} />
                </picture>

                {/* Hero text on image */}
                <div className="hero-text-outer-container">
                  <div className="hero-text-middle-container">
                    <div className="hero-text-inner-container">
                      <p className="hero-text-overline">New Product</p>
                      <h1 className="hero-text-heading">
                        XX99 Mark II Headphones
                      </h1>
                      <p className="hero-text-body">
                        Experience natural, lifelike audio and exceptional build
                        quality made for the passionate music enthusiast.
                      </p>

                      <Button
                        slug={
                          products.data[0] &&
                          `/${products.data[0].category.slug}/${products.data[0].slug}/${products.data[0]._id}`
                        }
                        className={'btn btn-primary'}
                      >
                        See Product
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Category panels */}
          <section className="section category">
            <div className="section category-container">
              <CategoryList />
            </div>
          </section>

          {/* Featured products (cards 2-4) */}
          <section className="home-section featured">
            <div className="featured-container">
              {/* Card position 2 */}
              <div className="card-one">
                <div className="img-container">
                  <picture>
                    <source
                      srcSet={products.data[1].featuredImage.desktop}
                      media="(min-width: 1110px)"
                    />
                    <source
                      srcSet={products.data[1].featuredImage.tablet}
                      media="(min-width: 768px)"
                    />
                    <img src={products.data[1].featuredImage.mobile} />
                  </picture>
                </div>

                <div className="card-one-info">
                  <h2>ZX9 SPEAKER</h2>
                  <p>
                    Upgrade to premium speakers that are phenomenally built to
                    deliver truly remarkable sound.
                  </p>

                  <Button
                    slug={
                      products.data[1] &&
                      `/${products.data[1].category.slug}/${products.data[1].slug}/${products.data[1]._id}`
                    }
                    className={'btn btn-secondary inverted'}
                  >
                    See Product
                  </Button>
                </div>

                <Rings className="card-one-rings" />
              </div>

              {/* Card position 3 */}
              <div className="card-two">
                <div className="img-container">
                  <picture>
                    <source
                      srcSet={products.data[2].featuredImage.desktop}
                      media="(min-width: 1110px)"
                    />
                    <source
                      srcSet={products.data[2].featuredImage.tablet}
                      media="(min-width: 768px)"
                    />
                    <img src={products.data[2].featuredImage.mobile} />
                  </picture>
                </div>

                <div className="card-two-info">
                  <h2>ZX7 SPEAKER</h2>

                  <Button
                    slug={
                      products.data[2] &&
                      `/${products.data[2].category.slug}/${products.data[2].slug}/${products.data[2]._id}`
                    }
                    className={'btn btn-secondary'}
                  >
                    See Product
                  </Button>
                </div>
              </div>

              {/* Card position 4 */}
              <div className="card-three">
                <div className="img-container">
                  <picture>
                    <source
                      srcSet={products.data[3].featuredImage.desktop}
                      media="(min-width: 1110px)"
                    />
                    <source
                      srcSet={products.data[3].featuredImage.tablet}
                      media="(min-width: 768px)"
                    />
                    <img src={products.data[3].featuredImage.mobile} />
                  </picture>
                </div>

                <div className="card-three-info-container">
                  <div className="card-three-info">
                    <h2>YX1 EARPHONES</h2>

                    <Button
                      slug={
                        products.data[3] &&
                        `/${products.data[3].category.slug}/${products.data[3].slug}/${products.data[3]._id}`
                      }
                      className={'btn btn-secondary'}
                    >
                      See Product
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <SectionAboutSite />
        </>
      )}
    </>
  );
}

export default HomeScreen;
