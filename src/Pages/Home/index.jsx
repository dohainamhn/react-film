import React, { useEffect, useState } from "react";
import ListFilmContainer from "./ListFilmContainer";
import SlideShow from "./SlideShow";
import filmApi from "../../api/filmApi";

function Home(props) {
  const [newFilms, setNewFilms] = useState([]);
  const [actionFilms, setActionFilms] = useState([]);
  useEffect(() => {
    filmApi
      .getAll({
        sort: "date",
        limit: 10,
      })
      .then((res) => {
        setNewFilms(res.data.product);
      });

    filmApi
      .getAll({
        category: "5fd82f209644f00e2ee9b59c",
        limit: 10,
      })
      .then((res) => {
        setActionFilms(res.data.product);
      });
  }, []);
  return (
    <div>
      {newFilms && actionFilms && (
        <>
          <SlideShow slides={newFilms} />
          <ListFilmContainer films={newFilms} title="New Films" />
          <ListFilmContainer films={actionFilms} title="Action Films" />
        </>
      )}
    </div>
  );
}

export default Home;
