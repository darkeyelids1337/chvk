import './movie-info.css';

const MovieInfo = ({props, isCritic}) => {
    const {posterUrl, title, year, director, genres, actors, plot, reviews} = props;
    const actorsArray = actors.split(',');
    const AddReviewButton = () => {
        return(
            <div className='review-button'>
                <h3>Добавить отзыв:</h3>
                <textarea className='review-input' placeholder='Введите отзыв'></textarea>
                <button className='add-review' onClick={(e) => {
                    e.preventDefault();
                    const reviewText = e.target.parentElement.querySelector('.review-input').value;
                    console.log(reviewText);
                }}>Добавить отзыв</button>
            </div>
        )
    }
    return(
        <div className="movie-info">
        <div className="top">
            <div className="picture">
                <img
                    src={posterUrl}
                    alt="oops"
                    width="300px"
                    height="350px"
                    onError={({currentTarget}) => {
                        currentTarget.onerror = null;
                        currentTarget.src = 'https://sun9-18.userapi.com/impg/ld4HRPdQTroGM7GskVKA0jSjX4ldRi9hUUknJA/GOJnrhnYEHc.jpg?size=532x521&quality=95&sign=2c199fd865adfb4a9b165bc6e3c5f675&type=album';
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
                        <span className="special">Жанры:</span> {genres.join(', ')}
                    </p>
                </div>
                <div className="top-right-info">
                    <h3>Актеры:</h3>
                    <ul>
                        {actorsArray.map((item, index) => {
                            return <li key={item}>{item}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </div>
        <div className="bottom-info">
            <h3>Описание</h3>
            <p>{plot}</p>
            <div className='reviews-info'>
                <h3>Отзывы:</h3>
                <ul>
                    {reviews.map((item) => {
                        return <li key={item.review} className='review'>{item.author}: {item.review}</li>
                    })}
                </ul>
                {isCritic ? <AddReviewButton></AddReviewButton>: null}
            </div>
        </div>
    </div>
    );
}

export default MovieInfo;