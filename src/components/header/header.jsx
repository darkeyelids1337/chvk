import "./header.css";
import { Input } from "antd";
import { ShoppingCartOutlined, PlaySquareOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
const { Search } = Input;
const Header = ({ changeTerm }) => {
  const onSearch = (value) => changeTerm(value.toLowerCase());
  const [balance, setBalance] = useState(107);
  const [balanceForm, setBalanceForm] = useState(false);
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
        <div className="cart">
          <ShoppingCartOutlined style={{ fontSize: 30 }}></ShoppingCartOutlined>
        </div>
        <div className="film-list">
          <PlaySquareOutlined style={{ fontSize: 30 }}></PlaySquareOutlined>
        </div>
      </div>
      <BalanceForm></BalanceForm>
    </>
  );
};

export default Header;
