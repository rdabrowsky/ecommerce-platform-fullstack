import { FaRegStar, FaStar, FaStarHalf } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;

    if (value >= starValue) {
      return <FaStar key={starValue} />;
    } else if (value >= starValue - 0.5) {
      return <FaStarHalf key={starValue} />;
    } else {
      return <FaRegStar key={starValue} />;
    }
  });

  return (
    <div className={'rating'}>
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
      {text && <span className={'rating-text'}>{text}</span>}
    </div>
  );
};

export default Rating;
