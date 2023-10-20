import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '/src/assets/svg/shared/desktop/logo.svg';
import { ReactComponent as Facebook } from '/src/assets/svg/shared/desktop/icon-facebook.svg';
import { ReactComponent as Twitter } from '/src/assets/svg/shared/desktop/icon-twitter.svg';
import { ReactComponent as Instagram } from '/src/assets/svg/shared/desktop/icon-instagram.svg';
import { useGetCategoriesQuery } from '../slices/categoriesApiSlice.js';

function Footer() {
  const {
    data: categories,
    isLoading,
    error,
    // @Todo: Add positioning to the model for categories tabs
  } = useGetCategoriesQuery('?sort=tabPosition');

  return (
    <>
      {isLoading ? (
        ''
      ) : error ? (
        error?.data?.message || error.message
      ) : (
        <>
          <div className="footer">
            <div className="footer-container">
              {/* Footer top > logo and nav links */}
              <div className="footer-top">
                <Link className="footer-logo" to="/">
                  <Logo />
                </Link>

                {/* Home tab */}
                <ul className="footer-nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>

                  {/* Category tabs */}
                  {categories.data.map((category) => (
                    <li key={category._id}>
                      <Link to={`/${category.slug}`}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer middle > about, and socials for desktop/tablet */}
              <div className="footer-middle">
                <div className="footer-about">
                  <p>
                    Audiophile is an all in one stop to fulfill your audio
                    needs. We're a small team of music lovers and sound
                    specialists who are devoted to helping you get the most out
                    of personal audio. Come and visit our demo facility - we’re
                    open 7 days a week.
                  </p>
                </div>

                <div className="footer-socials socials-desktop">
                  <Link to="https://facebook.com" target="_blank">
                    <Facebook className="social-icon facebook" />
                  </Link>

                  <Link to="https://twitter.com">
                    <Twitter className="social-icon twitter" target="_blank" />
                  </Link>

                  <Link to="https://instagram.com">
                    <Instagram
                      className="social-icon instagram"
                      target="_blank"
                    />
                  </Link>
                </div>
              </div>

              {/* Footer bottom > copyright, and socials for mobile */}
              <div className="footer-bottom">
                <div className="footer-copyright">
                  <p>Copyright 2021. All Rights Reserved</p>
                </div>

                <div className="footer-socials socials-mobile">
                  <Link to="https://facebook.com" target="_blank">
                    <Facebook className="social-icon facebook" />
                  </Link>

                  <Link to="https://twitter.com">
                    <Twitter className="social-icon twitter" target="_blank" />
                  </Link>

                  <Link to="https://instagram.com">
                    <Instagram
                      className="social-icon instagram"
                      target="_blank"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Footer;
