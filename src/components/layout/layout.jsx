import "./layout.css";
import Header from "../header";
import FilmList from "../film-list";
import MovieInfo from "../movie-info";
import { useEffect, useState } from "react";
const Layout = ({data, changeTerm, isCritic, cart, setCart, catalogData, setCatalogData, userInfo, setUserInfo}) => {
  const [movieInfo, setMovieInfo] = useState();
  return (
    <>
      <Header changeTerm={changeTerm} cart={cart} setCart={setCart} catalogData={catalogData} setCatalogData={setCatalogData} userInfo={userInfo} setUserInfo = {setUserInfo}></Header>
      <div className="main-page">
        <FilmList data = {data} setMovieInfo = {setMovieInfo}></FilmList>
        {movieInfo ? <MovieInfo props = {movieInfo} setMovieInfo = {setMovieInfo} isCritic={isCritic} setCart={setCart} cart={cart} catalogData={catalogData} userInfo={userInfo} setUserInfo={setUserInfo}></MovieInfo> : null}
      </div>
    </>
  );
};

export default Layout;
