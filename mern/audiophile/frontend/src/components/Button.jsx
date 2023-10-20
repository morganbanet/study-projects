import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowRight } from '/src/assets/svg/shared/desktop/icon-arrow-right.svg';

function Button({ children, className, slug }) {
  return (
    <button className={className}>
      <Link to={slug}>
        <span>{children}</span>{' '}
        {className.includes('btn btn-tertairy') && (
          <ArrowRight className='shop-arrow' />
        )}
      </Link>
    </button>
  );
}

export default Button;
