import React, { useEffect, useState } from "react";
import HotFilm from "../HotFilm";
import Conversation from "../Conversation";
import filmApi from "../../api/filmApi";
import "./style.scss";

function LeftComponent() {
  // const [data, setData] = useState([]);
  const [films, setFilms] = useState(null);
  // const { films } = props;

  useEffect(() => {
    filmApi
      .getAll({
        sort: "vote",
        limit: 10,
      })
      .then((res) => {
        setFilms(res.data.product);
      });
  }, []);
  return (
    <div className="LeftComponent">
      <Conversation />
      <div className="LeftComponent__topFilms">
        {films && <HotFilm films={films} title="Hot Films" />}
      </div>
    </div>
  );
}

export default LeftComponent;
