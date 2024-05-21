import ActorCard from "./ActorCard.jsx";

const CarouselActors = ({ tmdbCast }) => {
  const actorsWithImages = tmdbCast.filter((actor) => actor.profile_path);
  return (
    <div className="carousel-actors">
      {actorsWithImages.length > 0 ? (
        actorsWithImages.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))
      ) : (
        <p>No actors available.</p>
      )}
    </div>
  );
};

export default CarouselActors;
