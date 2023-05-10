import "./header.css";
import { Input } from "antd";
import {
  ShoppingCartOutlined,
  PlaySquareOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import Cart from "../cart";
import Catalog from "../catalog";
const { Search } = Input;
const Header = ({
  changeTerm,
  cart,
  setCart,
  catalogData,
  setCatalogData,
  userInfo,
  setUserInfo,
}) => {
  const onSearch = (value) => changeTerm(value.toLowerCase());
  const [isCartActive, setCartActive] = useState(false);
  const [balance, setBalance] = useState(null);
  const [balanceForm, setBalanceForm] = useState(false);
  const [isCatalogActive, setCatalogActive] = useState(false);

  useEffect(() => {
    if (userInfo) {
      fetch("http://127.0.0.1:7000/backend/topupbalance/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'payment': 0,
          'access_token': userInfo.access_token,
          'id': userInfo.id,
        }),
      })
        .then((res) => 
        {
          if (res.status === 200) {
            return res.json();
          } else {
            fetch("http://127.0.0.1:7000/backend/refresh/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                'id': userInfo.id,
               'refresh_token': userInfo.refresh_token,
              }),
            })
              .then((res) => {
                if (res.status === 200) {
                  return res.json();
                } else {
                  console.log(userInfo.refresh_token);
                }
              })
              .then((res) => {
                console.log('posle refresh', res);
                localStorage.setItem('user', JSON.stringify(res));
                setUserInfo(res)
              });
          }
        })
        .then((res) => res ? setBalance(+res.user.balance) : null);
    }
  }, [setUserInfo, userInfo]);
  useEffect(() => {
    if (balanceForm) {
      document
        .querySelector(".balance-form")
        .classList.toggle("visually-hidden");
    }
  }, [balanceForm]);
  // useEffect(() => {
  //   if (userInfo) {
  //     console.log(userInfo.refresh_token);
  //     setBalance(userInfo.user.balance);
  //   }
  // }, [userInfo]);
  const BalanceForm = () => {
    return (
      <div className="balance-form visually-hidden">
        <div
          className="close-icon"
          onClick={() => setBalanceForm(!balanceForm)}
        >
          <CloseOutlined />
        </div>
        <h3>Пожалуйста введите насколько вы хотите пополнить</h3>
        <input type="number"></input>
        <button
          onClick={(e) => {
            const balanceValue = e.target.parentElement.querySelector(
              'input[type="number"]'
            ).value;
            const balanceBody = {
              'payment': +balanceValue,
              'access_token': userInfo.access_token,
              'id': userInfo.id,
            };
            if (balanceValue) {
              setBalanceForm(!balanceForm);
              fetch("http://127.0.0.1:7000/backend/topupbalance/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(balanceBody),
              })
                .then((res) => {
                  if (res.status === 200) {
                    return res.json();
                  } else
                    fetch("http://127.0.0.1:7000/backend/refresh/", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        'id': userInfo.id,
                        'refresh_token': userInfo.refresh_token,
                      }),
                    })
                      .then((res) => {
                        if (res.status === 200) {
                          return res.json();
                        } else {
                          console.log('refresh', userInfo.access_token);
                        }
                      })
                      .then((res) => {
                        localStorage.setItem('user', JSON.stringify(res));
                        setUserInfo(res);
                      });
                })
                .then((res) => {
                  // console.log(typeof +balance);
                  // console.log(+balance)
                  setBalance(+res.user.balance);
                });
              // setBalance(balance + +balanceValue);
            } else alert("Please enter a number");
          }}
        >
          OK
        </button>
      </div>
    );
  };
  return (
    <>
      <div className="header-container">
        <p className="header-name">CHVK</p>
        <div className="search-bar">
          <Search
            placeholder="Поиск фильма"
            onSearch={onSearch}
            style={{ width: 630, borderRadius: 10, textAlign: "center" }}
          ></Search>
        </div>
        <div className="balance">
          Баланс: {balance}₽
          <button
            className="balance-button"
            onClick={() => setBalanceForm(!balanceForm)}
          >
            Пополнить баланс
          </button>
        </div>
        <div className="cart" onClick={() => setCartActive(!isCartActive)}>
          <ShoppingCartOutlined style={{ fontSize: 30 }}></ShoppingCartOutlined>
        </div>
        <div
          className="film-list"
          onClick={() => setCatalogActive(!isCatalogActive)}
        >
          <PlaySquareOutlined style={{ fontSize: 30 }}></PlaySquareOutlined>
        </div>
      </div>
      <BalanceForm></BalanceForm>
      {isCartActive ? (
        <Cart
          cart={cart}
          setCart={setCart}
          isCartActive={isCartActive}
          setCartActive={setCartActive}
          catalogData={catalogData}
          setCatalogData={setCatalogData}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setBalance={setBalance}
        ></Cart>
      ) : null}
      {isCatalogActive ? (
        <Catalog
          isCatalogActive={isCatalogActive}
          setCatalogActive={setCatalogActive}
          catalogData={catalogData}
          setCatalogData={setCatalogData}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        ></Catalog>
      ) : null}
    </>
  );
};

export default Header;
