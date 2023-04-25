import "./film-list.css";
import MovieCard from "../movie-card";
import { List } from "react-virtualized";
const FilmList = ({ data, setMovieInfo }) => {

  return (
    <div className="film-list-container">
      <List
        style={{ boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2) inset"}}
        width={700}
        height={700}
        rowHeight={data.length % 2 === 0 ? 500 : 400}
        rowCount={data.length}
        rowRenderer={({ key, index, style }) => {
          const film = data[index];
          return <MovieCard key={film.title} movieName={film} setMovieInfo = {setMovieInfo}></MovieCard>;
        }}
      ></List>
    </div>
  );
};

export default FilmList;
