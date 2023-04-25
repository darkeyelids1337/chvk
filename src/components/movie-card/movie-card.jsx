import "./movie-card.css";
import photo from "../../doggy.jpg";
import { useCallback } from "react";
const MovieCard = ({ movieName, setMovieInfo }) => {
  const memoSet = useCallback(() => {
    setMovieInfo(movieName);
  }, [movieName, setMovieInfo]);
  return (
    <div className="card-container" onClick={memoSet}>
      <img
        className="card-photo"
        height="263px"
        width="177px"
        alt="hz"
        src={movieName.posterUrl}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://sun9-18.userapi.com/impg/ld4HRPdQTroGM7GskVKA0jSjX4ldRi9hUUknJA/GOJnrhnYEHc.jpg?size=532x521&quality=95&sign=2c199fd865adfb4a9b165bc6e3c5f675&type=album";
        }}
      ></img>
      <p>{movieName.title}</p>
    </div>
  );
};

export default MovieCard;
