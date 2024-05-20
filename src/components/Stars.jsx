import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fullStar,
  faStarHalfAlt,
  faStar as emptyStar,
} from "@fortawesome/free-solid-svg-icons";
import calculateStars from "../hooks/calculateStars";

const Stars = ({ movie }) => {
  const { fullStars, halfStar, emptyStars } = calculateStars(
    movie.averageRating
  );
  return (
    <div className="stars-container">
      <div>
        {Array.from({ length: fullStars }).map((_, idx) => (
          <FontAwesomeIcon
            key={`full-${idx}`}
            icon={fullStar}
            className="text-gold"
          />
        ))}
        {halfStar > 0 && (
          <FontAwesomeIcon icon={faStarHalfAlt} className="text-gold" />
        )}
      </div>
      <div>
        {Array.from({ length: emptyStars }).map((_, idx) => (
          <FontAwesomeIcon
            key={`empty-${idx}`}
            icon={emptyStar}
            className="text-muted"
          />
        ))}
      </div>
    </div>
  );
};

export default Stars;
