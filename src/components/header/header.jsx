import "./header.css";
import { Input } from "antd";
import { ShoppingCartOutlined, PlaySquareOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Cart from "../cart";
import Catalog from "../catalog";
const { Search } = Input;
const Header = ({ changeTerm, cart, setCart, catalogData, setCatalogData}) => {
  const onSearch = (value) => changeTerm(value.toLowerCase());
  const [isCartActive, setCartActive] = useState(false);
  const [balance, setBalance] = useState(107);
  const [balanceForm, setBalanceForm] = useState(false);
  const [isCatalogActive, setCatalogActive] = useState(false);
  useEffect(() => {
    if (balanceForm) {
      document
        .querySelector(".balance-form")
        .classList.toggle("visually-hidden");
    }
  }, [balanceForm]);
  const BalanceForm = () => {
    return (
      <div className="balance-form visually-hidden">
        <div className="close-icon" onClick={() => setBalanceForm(!balanceForm)}>
            <CloseOutlined />
          </div>
        <h3>Пожалуйста введите насколько вы хотите пополнить</h3>
        <input type="number"></input>
        <button
          onClick={(e) => {
            const balanceValue = e.target.parentElement.querySelector(
              'input[type="number"]'
            ).value;
            if (balanceValue) {
              setBalanceForm(!balanceForm);
              setBalance(balance + +balanceValue);
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
          catalogData ={catalogData}
          setCatalogData={setCatalogData}
        ></Cart>
      ) : null}
      {isCatalogActive ? (
        <Catalog
          isCatalogActive={isCatalogActive}
          setCatalogActive={setCatalogActive}
          catalogData={catalogData}
          setCatalogData={setCatalogData}
        ></Catalog>
      ) : null}
    </>
  );
};

export default Header;
