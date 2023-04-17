import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({ onRatingChange }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (ratingValue) => {
    setRating(ratingValue);
    onRatingChange(ratingValue);
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRatingChange(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
