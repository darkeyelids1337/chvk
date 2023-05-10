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
  const [userInfo, setUserInfo] = useState();
  const [term, changeTerm] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:7000/backend/getmovies/")
      .then((res) => res.json())
      .then((jsonData) => {
        setData(
          Object.keys(jsonData).map((key) => {
            return jsonData[key];
          })
        );
      });
      

  }, []);
  const [cart, setCart] = useState([]);
  const [catalogData, setCatalogData] = useState([0]);
  useEffect(() => {
    const userActive = localStorage.getItem("user");
    if (userActive) {
      setLogin(true);
      setUserInfo(JSON.parse(userActive));
    }
  }, []);
  useEffect(() => {
    if (!login) {
      return navigate("/login");
    } else {
      return navigate("/");
    }
  }, [login]);
  useEffect(() => {
    if (userInfo) {
      fetch("http://127.0.0.1:7000/backend/bought/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo.id,
          access_token: userInfo.access_token,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            fetch("http://127.0.0.1:7000/backend/refresh/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: userInfo.id,
                refresh_token: userInfo.refresh_token,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                localStorage.setItem("user", JSON.stringify(res));
                setUserInfo(res);
              });
          }
        })
        .then((res) => {
          console.log("res", res);
          if(Object.keys(res).length !== 0){
            setCatalogData([res]);
          }
        });
    }
  },[userInfo, setUserInfo]);
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
  console.log(catalogData);
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
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            ></Layout>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <LoginPage
              setLogin={setLogin}
              setUserInfo={setUserInfo}
            ></LoginPage>
          }
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
