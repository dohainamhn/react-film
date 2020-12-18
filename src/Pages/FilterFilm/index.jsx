import React, { useEffect, useRef, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import ListFilm from "../../components/ListFilm";
import ErrorPage from "../../components/ErrorPage";
import filmApi from "../../api/filmApi";

import "./style.scss";
function FilterFilm(props) {
  const {searchFilm} = props
  let { query } = useParams();
  const [genres, setGenres] = useState(null);
  const [country, setCountry] = useState(null);
  const [sort, setSort] = useState(null);
  const [year, setYear] = useState(null);
  const [err, setErr] = useState(false);
  const [listFilm, setListFilm] = useState([]);
  const [fillter, setFillter] = useState({
    country: "default",
    year: "default",
    genres: "default",
    sort: "default",
  });

  useEffect(() => {
   if(query!== undefined){
    let arrQuery = query.split("&");
    arrQuery.forEach((item) => {
      let a = item.split("=");
      if (a[0] === "country") setCountry(a[1]);
      if (a[0] === "genres") setGenres(a[1]);
      if (a[0] === "year") setYear(a[1]);
      if (a[0] === "sort") setSort(a[1]);
    });
   }
   if(searchFilm!== undefined){
    console.log(searchFilm);
    setListFilm(searchFilm)
  }
    return () => {
      console.log("removed");
      setCountry(null);
      setGenres(null);
      setYear(null);
      setSort(null);
    };
  }, [query]);

  const handleOnchange = (e) => {
    setFillter({
      ...fillter,
      [e.target.name]: e.target.value,
    });

    // if (e.target.name === "genres") {
    //   setGenres(e.target.value);
    // }
    // if (e.target.name === "country") setCountry(e.target.value);
    // if (e.target.name === "year") setYear(e.target.value);
  };
  useEffect(()=>{
    console.log(searchFilm);
    if(searchFilm!== undefined){
      console.log(searchFilm);
      setListFilm(searchFilm)
    }
  },[searchFilm])
  useEffect(() => {
    country &&
      filmApi.getAll({ country: country }).then((res) => {
        console.log(res.data.product);
        setListFilm(res.data.product);
      });
    genres &&
      filmApi.getAll({ category: genres }).then((res) => {
        setListFilm(res.data.product);
      });
  }, [country, genres]);
  const handleSubmit = (e) => {
    e.preventDefault();
    filmApi
      .getAll({
        category: fillter.genres,
        country: fillter.country,
        year: fillter.year,
        sort: fillter.sort
      })
      .then((res) => {
        console.log(res.data.product);
        setListFilm(res.data.product);
      });
    console.log(fillter);
  };
  return (
    <div className="filterFilm">
      {!err ? (
        <>
          <div className="filterFilm__title">
            <span>Fillter Films</span>
            <i className="fas fa-caret-right"></i>
          </div>
          {
            <div className="filterFilm__filter">
              <form onSubmit={handleSubmit}>
                <select
                  name="genres"
                  onChange={handleOnchange}
                  value={fillter.genres ? fillter.genres : "default"}
                >
                  <option value="default">Genres</option>
                  <option value="5fd82f209644f00e2ee9b59c">Action</option>
                  <option value="5fd829015956e30ad2b47c59">Horror</option>
                  <option value="5fd82f0d9644f00e2ee9b59b">
                    Science Fiction
                  </option>
                  <option value="5fd82f279644f00e2ee9b59d">Comedy</option>
                  <option value="5fcc7a7a08fd0b07136ef11a">Drama</option>
                  <option value="5fd8415f7e38360f816e5f75">Cartoon</option>
                </select>
                <select
                  name="country"
                  onChange={handleOnchange}
                  value={fillter.country ? fillter.country : "default"}
                >
                  <option value="default">Country</option>
                  <option value="5fcdcef26ddb480fad13b2db">Viet Nam</option>
                  <option value="5fd8411f2ae2e546fc566363">
                    United States
                  </option>
                  <option value="5fd841522ae2e546fc566366">China</option>
                  <option value="5fd8413c2ae2e546fc566364">korea</option>
                  <option value="5fd7b993aa16a62b596010ee">thailand</option>
                  <option value="5fd841492ae2e546fc566365">Hong Kong</option>
                </select>
                <select
                  name="year"
                  onChange={handleOnchange}
                  value={fillter.year ? fillter.year : "default"}
                >
                  <option value="default">Year</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                </select>
                <select
                  name="sort"
                  onChange={handleOnchange}
                  value={fillter.sort ? fillter.sort : "default"}
                >
                  <option value="default">Sort</option>
                  <option value="vote">Votes</option>
                  <option value="date">Date update</option>
                </select>
                <button type="submit">Filter Film</button>
              </form>
            </div>
          }
          <div className="filterFilm__listFilm">
            <ListFilm films={listFilm} />
          </div>
        </>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}

export default FilterFilm;
