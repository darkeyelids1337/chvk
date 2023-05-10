import "./cart.css";
import { CloseOutlined } from "@ant-design/icons";
const Cart = ({
  cart,
  isCartActive,
  setCartActive,
  setCart,
  catalogData,
  setCatalogData,
  userInfo,
  setUserInfo,
  setBalance,
}) => {
  const oldCart = cart;
  // const but = document.querySelector('.cart-buy-button');
  // console.log(typeof catalogData)
  //  function ref_token(){
  //     fetch("http://127.0.0.1:7000/backend/refresh/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         'id': userInfo.id,
  //         'refresh_token': userInfo.refresh_token,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         console.log('refresh res', res);
  //         localStorage.setItem("user", JSON.stringify(res));
  //         setUserInfo(res);
  //         // return document.querySelector('.cart-buy-button').click();
  //       });
  //   }
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
     {cart.length === 0 ? null : <button
        className="cart-buy-button"
        onClick={async () => {
          for (let i = 0; i < cart.length; i++) {
            await fetch("http://127.0.0.1:7000/backend/subscription/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: userInfo.id,
                id_movie: cart[i].id,
                access_token: userInfo.access_token,
              }),
            })
              .then((res) => {
                if (res.status === 200) {
                  console.log("rrres", res);
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
                      console.log("refresh res", res);
                      localStorage.setItem("user", JSON.stringify(res));
                      setUserInfo(res);
                      // but.click();
                    });
                }
              })
              .then((res) => {
                if(typeof res !== 'undefined'){
                  console.log("cart res", res);
                  console.log("cart", cart);
                  console.log('Catalog data first time', catalogData);
                  console.log("cart catalog inside", catalogData);
                  //const [cd] = catalogData;
                  // const catalogDataArray = Object.keys(cd).map((key) => [key, cd[key]]);
                  // console.log("cart catalog array", catalogDataArray);
                  if (catalogData === null) {
                    console.log("ya tut");
                    setCatalogData([{ ...cart}]);
                  // } else {
                  //   console.log('CD', catalogData);
                  //   console.log('cart', cart);
                  //   const cd = {...catalogData}
                  //   console.log(Object.keys(cd).map((item) => {
                  //     return {
                  //       item:cd[item]
                  //     }
                  //   }));
                  //   const cheto = cd[0][0];
                  //   const ident = cheto['id'];
                  //   console.log('...', cheto, '...!', ...cheto);
                  //   //console.log('...', ...catalogData, ...cart, cd['0'], cheto, cd);
                  //   setCatalogData([{...cheto, ...cart}]);
                   }
                  setCart([]);
                  setBalance(+res.user.balance);
                }
                // else{
                //   but.click();
                // }
              });
          }
          setCartActive(!isCartActive);
        }}
      >
        Купить
      </button> }
    </div>
  );
};

export default Cart;
