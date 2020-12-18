import React from "react";

import { Link } from "react-router-dom";
import "./style.scss";
function HotFilm(props) {
  const { films, title } = props;
  console.log(films);
  return (
    <div className="topFilm">
      <p className="topFilm__title">{title}</p>
      <ul>
        {films.map((item) => (
          <li key={item._id}>
            <Link to={`/watch-film/${item._id}`}>
              <img src={item.img} alt="img" />
              <div className="topFilm__item__info">
                <p>{item.name}</p>
                <p>{item.ename}</p>
                <div className="topFilm__item__info__vote">
                  <i className="fas fa-star"></i>
                  <span>{item.averageVote}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HotFilm;
