import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
      {/* Star 1 */}
      <span>
        {value >= 1 ? (
          // Full star if 1 - 1.9
          <FaStar />
        ) : value >= 0.5 ? (
          // Half star if 0.5 - 0.9
          <FaStarHalfAlt />
        ) : (
          // Empty star if 0 - 0.4
          <FaRegStar />
        )}
      </span>

      {/* Star 2 */}
      <span>
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      {/* Star 3 */}
      <span>
        {value >= 3 ? (
          <FaStar />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      {/* Star 4 */}
      <span>
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      {/* Star 5 */}
      <span>
        {value >= 5 ? (
          <FaStar />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>

      <span className='rating-text'>{text && text}</span>
    </div>
  );
};

export default Rating;
