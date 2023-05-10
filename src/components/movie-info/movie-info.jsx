import { useEffect, useState } from "react";
import "./movie-info.css";

const MovieInfo = ({
  props,
  isCritic,
  setCart,
  cart,
  catalogData,
  setMovieInfo,
  userInfo,
  setUserInfo,
}) => {
  const { posterUrl, title, year, director, genres, plot, review, price, id } =
    props;
  console.log("props", props);
  console.log('info cd', catalogData);
  const [newReview, setNewReview] = useState(false);
  let isBought = false;
  if(catalogData !== null){
    const [cd] = catalogData;
    const catalogDataArray = Object.keys(cd).map((key) => [key, cd[key]]);
    console.log(catalogDataArray);
    for (let i = 0; i < catalogDataArray.length; i++) {
      if (catalogDataArray[i][1].title === title) {
        isBought = true;
      }
    }
  }
 
  //   useEffect(() => {
  //     fetch("http://127.0.0.1:7000/backend/revs/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id_movie: id,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  //         //console.log(res);
  //         review !== null ? setReview([...review, res[0]]) : setReview([res[0]])

  //     });
  //   }, [id]);
  //   console.log("revs", review);
  const AddReviewButton = () => {
    return (
      <div className="review-button">
        <h3>Добавить отзыв:</h3>
        <textarea
          className="review-input"
          placeholder="Введите отзыв"
        ></textarea>
        <button
          className="add-review"
          onClick={(e) => {
            e.preventDefault();
            const reviewText =
              e.target.parentElement.querySelector(".review-input").value;
            const bodyData = {
              id: userInfo.id,
              id_movie: id,
              rating: 5,
              access_token: userInfo.access_token,
              review: reviewText,
            };
            console.log(JSON.stringify(bodyData));
            fetch("http://127.0.0.1:7000/backend/review/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bodyData),
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
                setNewReview(res);
              });
          }}
        >
          Добавить отзыв
        </button>
      </div>
    );
  };
  return (
    <div className="movie-info">
      <div className="top">
        <div className="picture">
          <img
            src={posterUrl}
            alt="oops"
            width="300px"
            height="350px"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://sun9-18.userapi.com/impg/ld4HRPdQTroGM7GskVKA0jSjX4ldRi9hUUknJA/GOJnrhnYEHc.jpg?size=532x521&quality=95&sign=2c199fd865adfb4a9b165bc6e3c5f675&type=album";
            }}
          ></img>
        </div>
        <div className="top-info">
          <div className="top-left-info">
            <h1>{title}</h1>
            <p className="special">{director}</p>
            <p>
              <span className="special">Год:</span> {year}
            </p>
            <p>
              <span className="special">Жанры:</span>{" "}
              {Object.keys(genres).map((item) => genres[item].name + " ")}
            </p>
          </div>
          <div className="top-right-info">
            <ul>
              {isBought ? null : (
                <button
                  className="buy-film-button"
                  onClick={() => {
                    setCart([...cart, props]);
                  }}
                >
                  Купить фильм: {price} ₽
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom-info">
        <h3>Описание</h3>
        <p>{plot}</p>
        <div className="reviews-info">
          <h3>Отзывы:</h3>
          <ul>
            {review[0] === undefined
              ? null
              : review.map((item, index) => {
                  return (
                    <li key={item[index].review} className="review">
                      {item[index].user.login}: {item[index].review}
                    </li>
                  );
                })}
          </ul>
          {userInfo.user.role === 1 ? (
            <AddReviewButton></AddReviewButton>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
