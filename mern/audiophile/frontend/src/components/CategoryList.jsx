import React from 'react';
import CategoryPanel from './CategoryDetails';
import { useGetCategoriesQuery } from '../slices/categoriesApiSlice.js';

function CategoryList({ drawerRef, overlayRef, cartRef, scrollRef }) {
  const {
    data: categories,
    isLoading,
    error,
  } = useGetCategoriesQuery('?sort=tabPosition');

  // Map through each category and use categoryDetails to create a panel
  return (
    <>
      {isLoading ? (
        ''
      ) : error ? (
        error?.data?.message || error.message
      ) : (
        <>
          <div className="category-list">
            {categories.data.map((category) => (
              <CategoryPanel
                key={category._id}
                categoryName={category.name}
                imageURL={category.image}
                slug={category.slug}
                drawerRef={drawerRef}
                overlayRef={overlayRef}
                cartRef={cartRef}
                scrollRef={scrollRef}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default CategoryList;
