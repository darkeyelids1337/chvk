import { Link, Outlet } from "react-router-dom";
import "./layout.css";
import Header from "../header";
import FilmList from "../film-list";
import MovieInfo from "../movie-info";
import { useEffect, useState } from "react";
const Layout = ({data, changeTerm, isCritic, cart, setCart}) => {
  const [movieInfo, setMovieInfo] = useState();
  return (
    <>
      <Header changeTerm={changeTerm} cart={cart} setCart={setCart}></Header>
      <div className="main-page">
        <FilmList data = {data} setMovieInfo = {setMovieInfo}></FilmList>
        {movieInfo ? <MovieInfo props = {movieInfo} isCritic={isCritic} setCart={setCart} cart={cart}></MovieInfo> : null}
      </div>
    </>
  );
};

export default Layout;
