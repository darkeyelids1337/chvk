import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./components/login-page";
import SignUp from "./components/signup-page";
import Layout from "./components/layout";
import ErrorComponent from "./components/error-component";
const App = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [isCritic, setIsCritic] = useState(true);
  const [term, changeTerm] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      title: "Andy",
      year: 2022,
      genres: ["Crime", "Drama"],
      director: "Korobkin",
      actors: "Jim Carry, Sobaka Sharik, Barak Obama",
      plot: "Лютый трешак просто ппц",
      posterUrl:
        "https://sun9-24.userapi.com/impg/UgyghmKx2mPKKmJW0-FaMZ2Kv_Av64XeuCS6sw/9YLFeQwqQcw.jpg?size=828x817&quality=95&sign=cf11be4c7cd01483aca1d656780b1ffb&type=album",
      reviews: [
        {
          author: "Vlad",
          review: "Жесть",
        },
        {
          author: "Artem",
          review:
            "А мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилосьА мне понравилось",
        },
      ],
    },
    {
      id: 2,
      title: "Andy 2",
      year: 2023,
      genres: ["Crime", "Drama"],
      director: "Korobkin",
      actors: "Jim Carry, Sobaka Sharik, Barak Obama",
      plot: "Лютый трешак просто ппц",
      posterUrl: "",
      reviews: [
        {
          author: "Vlad",
          review: "Жесть",
        },
        {
          author: "Artem",
          review: "А мне понравилось",
        },
      ],
    },
    {
      id: 3,
      title: "Andy 3",
      year: 2023,
      genres: ["Crime", "Drama"],
      actors: "Jim Carry, Sobaka Sharik, Barak Obama",
      plot: "Лютый трешак просто ппц",
      director: "Korobkin",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg",
      reviews: [
        {
          author: "Vlad",
          review: "Жесть",
        },
        {
          author: "Artem",
          review: "А мне понравилось",
        },
      ],
    },
    {
      id: 4,
      title: "Andy 4",
      year: 2023,
      genres: ["Crime", "Drama"],
      actors: "Jim Carry, Sobaka Sharik, Barak Obama",
      director: "Korobkin",
      plot: "Лютый трешак просто ппц",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg",
      reviews: [
        {
          author: "Vlad",
          review: "Жесть",
        },
        {
          author: "Artem",
          review: "А мне понравилось",
        },
      ],
    },
    {
      id: 5,
      title: "Andy 5",
      year: 2023,
      genres: ["Crime", "Drama"],
      actors: "Jim Carry, Sobaka Sharik, Barak Obama",
      director: "Korobkin",
      plot: "Лютый трешак просто ппц",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg",
      reviews: [
        {
          author: "Vlad",
          review: "Жесть",
        },
        {
          author: "Artem",
          review: "А мне понравилось",
        },
      ],
    },
    {
      id: 6,
      title: "Scream",
      year: 2023,
      genres: ["Crime", "Drama"],
      actors: "Jim Carry, Sobaka Sharik, Barak Obama",
      director: "Korobkin",
      plot: "Лютый трешак просто ппц",
      posterUrl:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg",
      reviews: [
        {
          author: "Vlad",
          review: "Жесть",
        },
        {
          author: "Artem",
          review: "А мне понравилось",
        },
      ],
    },
  ]);
  const [cart, setCart] = useState([]);
  const [catalogData, setCatalogData] = useState([]);
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setLogin(true);
    }
  }, []);
  useEffect(() => {
    if (!login) {
      return navigate("/login");
    } else return navigate("/");
  }, [login]);
  function searchPost(data, term) {
    if (data.length === 1 || !data) {
      return;
    }
    if (term.length === 0) {
      return data;
    }
    return data.filter((item) => {
      if (typeof item.title !== "undefined")
        return item.title.toLowerCase().indexOf(term) > -1;
    });
  }
  const visible = searchPost(data, term);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              data={visible}
              changeTerm={changeTerm}
              isCritic={isCritic}
              cart={cart}
              setCart={setCart}
              catalogData={catalogData}
              setCatalogData={setCatalogData}
            ></Layout>
          }
        ></Route>
        <Route
          path="/login"
          element={<LoginPage setLogin={setLogin}></LoginPage>}
        ></Route>
        <Route
          path="/signup"
          element={<SignUp setLogin={setLogin}></SignUp>}
        ></Route>
        <Route path="*" element={<ErrorComponent></ErrorComponent>}></Route>
      </Routes>
    </>
  );
};

export default App;




