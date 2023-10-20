import React from 'react';
import { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList';
import Modal from './ModalBase';
import { NavHeaderContext } from '../context/NavHeaderContext';
import { ReactComponent as Logo } from '/src/assets/svg/shared/desktop/logo.svg';
import { ReactComponent as Cart } from '/src/assets/svg/shared/desktop/icon-cart.svg';
import { ReactComponent as Hamburger } from '/src/assets/svg/shared/tablet/icon-hamburger.svg';
import { useGetCategoriesQuery } from '../slices/categoriesApiSlice.js';

function Header() {
  const {
    data: categories,
    isLoading,
    error,
  } = useGetCategoriesQuery('?sort=tabPosition');

  const { handleDrawer, handleCart, exitMenuItems } =
    useContext(NavHeaderContext);

  const scrollRef = useRef();
  const overlayRef = useRef();
  const drawerRef = useRef();
  const cartRef = useRef();

  window.addEventListener('resize', () => {
    if (
      drawerRef.current !== undefined &&
      drawerRef.current.classList.contains('visible') &&
      window.innerWidth > 1110
    ) {
      handleDrawer(scrollRef, overlayRef, drawerRef, cartRef);
    }
  });

  return (
    <>
      {isLoading ? (
        ''
      ) : error ? (
        error?.data?.message || error.message
      ) : (
        <>
          <header>
            <div className="header-container">
              {/* Expand drawer icon */}
              <button className="nav-btn hamburger">
                <div
                  className="mobile-touchpoint mobile-btn"
                  onClick={() =>
                    handleDrawer(scrollRef, overlayRef, drawerRef, cartRef)
                  }
                ></div>
                <Hamburger className="nav-icon" />
              </button>

              {/* Brand logo */}
              <Link className="brand-link" to="/">
                <Logo
                  onClick={() => {
                    exitMenuItems(scrollRef, overlayRef, drawerRef, cartRef);
                    document.documentElement.scrollTo(0, 0);
                  }}
                />
              </Link>

              <ul className="desktop-nav">
                {/* Home tab */}
                <li>
                  <Link to="/">Home</Link>
                </li>

                {/* Categories tabs */}
                {categories.data.map((category) => (
                  <li key={category._id}>
                    <Link to={`/${category.slug}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>

              {/* Shopping cart modal icon */}
              <button className="nav-btn cart">
                <div
                  className="mobile-touchpoint mobile-btn"
                  onClick={() =>
                    handleCart(scrollRef, overlayRef, drawerRef, cartRef)
                  }
                ></div>
                <Cart className="nav-icon" />
              </button>
            </div>

            <div ref={scrollRef} className="scroll-container">
              {/* Expanding drawer, hidden by default */}
              <div className="hamburger-drawer" ref={drawerRef}>
                <CategoryList
                  scrollRef={scrollRef}
                  overlayRef={overlayRef}
                  drawerRef={drawerRef}
                  cartRef={cartRef}
                />
              </div>

              {/* Shopping cart modal */}
              <div className="shopping-modal-container">
                <div className="shopping-modal-inner-container">
                  <Modal ref={cartRef} className={'modal shopping-modal'} />
                </div>
              </div>

              {/* Background overlay when drawer or modal open*/}
              <div
                className="nav-overlay"
                ref={overlayRef}
                onClick={() =>
                  exitMenuItems(scrollRef, overlayRef, drawerRef, cartRef)
                }
              ></div>
            </div>
          </header>
        </>
      )}
    </>
  );
}

export default Header;
