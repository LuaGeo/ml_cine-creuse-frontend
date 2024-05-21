const ActorCard = ({ actor }) => {
  return (
    <div key={actor.id} className="actor">
      <img
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt={actor.name}
      />
      <div className="details-actor-card-container">
        <p>{actor.name}</p>
        <p>({actor.character})</p>
      </div>
    </div>
  );
};

export default ActorCard;
