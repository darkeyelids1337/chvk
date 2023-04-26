import "./cart.css";
import { CloseOutlined } from "@ant-design/icons";
const Cart = ({ cart, isCartActive, setCartActive, setCart, catalogData, setCatalogData}) => {
  const oldCart = cart;
  console.log(oldCart);
  return (
    <div className="cart-container">
      <div className="close-icon" onClick={() => setCartActive(!isCartActive)}>
        <CloseOutlined />
      </div>
      <ul className="cart-movies-list">
        {cart.length === 0 ? (
          <h2>Корзина пуста =(</h2>
        ) : (
          cart.map((item, index) => {
            return item === "deleted" ? null : (
              <li className="cart-li" key={item.title}>
                {item.title}{" "}
                <span
                  style={{ width: "15px", height: "15px" }}
                  className={"span-icon"}
                  id={item.title}
                  onClick={(e) => {
                    const id =
                      e.target.parentElement.parentElement.parentElement
                        .className === "span-icon"
                        ? e.target.parentElement.parentElement.parentElement.id
                        : e.target.parentElement.parentElement.parentElement.querySelector(
                            ".span-icon"
                          ).id;
                    let toRemove = 0;
                    cart.forEach((item, index) => {
                      if (item.title === id) toRemove = index;
                    });

                    oldCart.splice(toRemove, 1);
                    setCart([...oldCart]);
                  }}
                >
                  <CloseOutlined style={{ marginTop: "5px" }} />
                </span>
              </li>
            );
          })
        )}
      </ul>
      <button
        className="cart-buy-button"
        onClick={() => {
          setCatalogData([...catalogData, ...cart]);
          setCartActive(!isCartActive);
          setCart([]);
        }}
      >
        Купить
      </button>
    </div>
  );
};

export default Cart;
