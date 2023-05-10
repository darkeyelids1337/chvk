import { useEffect } from "react";
import "./catalog.css";
import { CloseOutlined } from "@ant-design/icons";

const Catalog = ({
  catalogData,
  setCatalogData,
  isCatalogActive,
  setCatalogActive,
  userInfo,
  setUserInfo
}) => {
  useEffect(() => {
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
  }, [setCatalogData, setUserInfo])
  let catalogDataArray;
  const [cd] = catalogData;
  catalogDataArray = Object.keys(cd).map((key) => [key, cd[key]]);

  // console.log("catalogData", ...catalogData);
  // console.log("catalogDataArray", catalogDataArray);
  return (
    <div className="catalog-container">
      <div
        className="close-icon"
        onClick={() => setCatalogActive(!isCatalogActive)}
      >
        <CloseOutlined />
      </div>
      <ul className="catalog-movies-list">
        {catalogDataArray.map((item) => {
          return (
            <li className="catalog-li" key={item[1].title}>
              {item[1].title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Catalog;
