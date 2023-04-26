import './catalog.css';
import { CloseOutlined } from '@ant-design/icons';

const Catalog =({catalogData, setCatalogData, isCatalogActive, setCatalogActive}) => {
    return (
        <div className="catalog-container">
          <div className="close-icon" onClick={() => setCatalogActive(!isCatalogActive)}>
            <CloseOutlined />
          </div>
          <ul className="catalog-movies-list">
            {catalogData.map((item) => {
                return (
                    <li className="catalog-li" key={item.title}>
                        {item.title}
                    </li>
                )
            })}
          </ul>
          <button
        className="cart-clear-button"
        onClick={() => {
          setCatalogData([]);
        }}
      >
        Очистка
      </button>
        </div>
      );
}

export default Catalog;