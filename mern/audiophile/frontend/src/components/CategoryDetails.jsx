import React from 'react';
import { useContext } from 'react';
import { NavHeaderContext } from '../context/NavHeaderContext';
import Button from './Button';

function CategoryDetails({
  imageURL,
  categoryName,
  slug,
  scrollRef,
  overlayRef,
  drawerRef,
  cartRef,
}) {
  const { handleDrawer } = useContext(NavHeaderContext);

  return (
    <div className="category-panel">
      {/* Category thumbnail */}
      <div className="category-img">
        <img src={imageURL} alt={categoryName}></img>
      </div>

      {/* Category name & button */}
      <p className="category-name">{categoryName}</p>

      <div
        onClick={() => {
          if (drawerRef !== undefined) {
            handleDrawer(scrollRef, overlayRef, drawerRef, cartRef);
          }
        }}
      >
        <Button slug={`/${slug}`} className="btn btn-tertairy">
          Shop
        </Button>
      </div>

      {/* Thumbnail platform */}
      <div className="category-base"></div>
    </div>
  );
}

export default CategoryDetails;
