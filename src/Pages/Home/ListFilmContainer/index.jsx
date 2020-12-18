import React, { useEffect, useState } from "react";
import ListFilm from "../../../components/ListFilm";

import Loadding from "../../../components/Loadding";
import "./style.scss";
function ListFilmContainer(props) {
  const { title, films } = props;
  useEffect(() => {}, []);
  return (
    <div className="ListFilmContainer">
      <div className="ListFilmContainer__title">
        <a href="/">
          <span>{title}</span>
          <i className="fas fa-caret-right"></i>
        </a>
      </div>
      {films.length ? <ListFilm films={films} /> : <Loadding />}
    </div>
  );
}

export default ListFilmContainer;
