import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Comments from "./comments";
import Loadding from "../../components/Loadding";
import FilmApi from "../../api/filmApi";
import ErrorPage from "../../components/ErrorPage";
import "./style.scss";
import UserContext from "../../context/UserContext";
import VideoPlayer from "../../components/VideoPlayer";
import filmApi from "../../api/filmApi";
import Advertisement from "./advertisement"

function WatchFilm() {
  const [isOpenFilmInfo, setIsOpenFilmInfo] = useState(true);
  const [isOpenFilm, setIsOpenFilm] = useState(false);
  const [film, setFilm] = useState(null);
  const [filmStar, setFilmStar] = useState(null);
  const [linkFilm, setLinkFilm] = useState(null)
  const [err, setErr] = useState(false);
  const { user, setUser } = useContext(UserContext)
  const { id } = useParams();
  const overlayRef = useRef()
  const ticketRef = useRef(null)
  const openInfoRef = useRef();
  const yourVoteItemRef = useRef();
  const InfoContainerRef = useRef();
  const [disableClick, setDisableClick] = useState(true)

  const handleVoteStar = (index) => {
    if (user) {
      console.log(index);
      try {
        filmApi.voteFilm({
          idFilm: id,
          idUser: user._id,
          vote: index,
        }).then((res) => {
          alert(res.data.message)
        })
      }
      catch (err) {
        alert(err)
      }
    } else alert("please login to vote");
  };
  const handleOverVoteStar = (index) => {
    let newArr = [...yourVoteItemRef.current.children];
    newArr.forEach((item, i) => {
      if (i < index) item.classList.add("yellow");
    });
  };
  const handleMouseOutVoteStar = () => {
    let newArr = [...yourVoteItemRef.current.children];
    newArr.forEach((item) => {
      item.classList.remove("yellow");
    });
  };
  const renderStar = () => {
    const star = [];
    for (let x = 0; x < 10; x++) {
      star.push(
        <i
          key={x}
          onClick={() => {
            handleVoteStar(x + 1);
          }}
          onMouseOver={() => {
            handleOverVoteStar(x + 1);
          }}
          onMouseOut={() => {
            handleMouseOutVoteStar();
          }}
          className="fas fa-star"
        ></i>
      );
    }
    return star.map((item) => item);
  };
  const convertDate = () => {
    var res = film.updatedAt.toString().slice(0, 10).replace(/-/g, "/");
    return res
  }
  useEffect(() => {
    setTimeout(() => {
    }, 5000)
  }, [])
  useEffect(() => {
    async function getFilm() {
      try {
        let res = await FilmApi.getOne(`id=${id}`);
        console.log(res.data);
        setFilm(res.data);
      } catch (err) {
        console.log(err);
        if (err) setErr(true);
      }
    }
    getFilm();
  }, [id]);

  useEffect(() => {
    if (film) {
      console.log(film.streamTapeId);
      FilmApi.getTicket({
        key: film.streamTapeId
      }).then((res) => {
        if (res.data.status === 200) {
          console.log(res.data);
          ticketRef.current = res.data.result.ticket
          setDisableClick(false)
        }
        else if (res.data.status === 500||res.data.status === 400) {
          alert('Sorry we cant get link this Film')
        }
      })
    }

    if (film) {
      let vote = [];
      for (let i = 0; i < 10; i++) {
        if (i < parseInt(film.averageVote))
          vote.push(
            <i
              style={{
                color: "#dbb043",
              }}
              className="fas fa-star"
            ></i>
          );
        else vote.push(<i className="fas fa-star"></i>);
      }
      setFilmStar(vote);
    }
  }, [film]);
  return (
    <>
      {err && <ErrorPage />}
      {!err && film && (
        <div className="watchFilm">
          {!isOpenFilm ? (
            <div className="watchFilm__video">
              <img src={film.largerImg} alt="logo" />
              {
                disableClick
                ?<Advertisement/>
                :<div
                onClick={() => {
                  if (disableClick) {
                    
                  } else {
                    if (film.streamTapeId !== "null" && ticketRef.current !== null) {
                      console.log(film.streamTapeId);
                      console.log(ticketRef.current);
                      try {
                        filmApi.getLink({
                          ticket: ticketRef.current,
                          key: film.streamTapeId
                        }).then((res) => {
                          setLinkFilm(res.data.result.url)
                        })
                      } catch (err) {
                        console.log(err);
                      }
                      setIsOpenFilm(true);

                    } else alert('sorry this film is not available now')
                  }
                }

                }
                ref={overlayRef} className="watchFilm__video__overlay"
              >
                  <div className="watchFilm__video__overlay__playIcon">
                  <svg
                    x="0px"
                    y="0px"
                    height="100%"
                    width="100%"
                    viewBox="0 0 100 100"
                    enableBackground="new 0 0 100 100"
                  >
                    <path
                      className="stroke-solid"
                      fill="none"
                      stroke="#ffff"
                      d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
                                    C97.3,23.7,75.7,2.3,49.9,2.5"
                    />
                    <path
                      className="icon"
                      fill="#ffff"
                      d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"
                    />
                  </svg>
                </div>
              </div>
              }
              </div>    
          ) : (
              <div className="watchFilm__video">
                {linkFilm && <VideoPlayer link={linkFilm} />}
              </div>
            )}
          <div className="watchFilm__main">
            <div className="watchFilm__vieName">
              <p>{film.name}</p>
              <select>
                <option value="sv1">Server 1</option>
                <option value="sv2">Server 2</option>
              </select>
            </div>
            <div className="watchFilm__engName">
              <p>{film.ename}</p>
              <div className="watchFilm__engName__favorite">
                <i className="fas fa-heart"></i>
                <p>Favorite film</p>
              </div>
            </div>
            <div className="watchFilm__vote">
              <div className="watchFilm__vote__right">
                <p>Voted: {film.averageVote}</p>
                <div className="watchFilm__vote__right__star">
                  {filmStar
                    ? filmStar.map((item, index) => <div key={index}>{item}</div>)
                    : ""}
                </div>
                <div>( {film.voteLength} voted )</div>
              </div>
              <div className="watchFilm__vote__left">
                <div onClick={() => {
                  if (user) {
                    filmApi.postFilmError({
                      id: id
                    }).then((res) => {
                      if (res.status === 200) alert("report film successfully")
                      else alert('something wrong')
                    })
                  }
                  else alert('you have to login to report')
                }} className="watchFilm__vote__left__error">
                  <i className="fas fa-exclamation-triangle"></i>
                  <p>Film Error</p>
                </div>
              </div>
            </div>
            <button className="watchFilm__trailer">
              Trailer <i className="fas fa-caret-right"></i>
            </button>
            <div className="watchFilm__filmInfo">
              <div
                onClick={() => {
                  if (isOpenFilmInfo) {
                    openInfoRef.current.innerHTML = "+";
                    setIsOpenFilmInfo(false);
                  } else {
                    openInfoRef.current.innerHTML = "-";
                    setIsOpenFilmInfo(true);
                  }
                }}
                className="watchFilm__filmInfo__top"
              >
                <h3>Film Info</h3>
                <span ref={openInfoRef}>-</span>
              </div>
              <ul
                ref={InfoContainerRef}
                className={
                  isOpenFilmInfo
                    ? "watchFilm__filmInfo__bottom activeInfo"
                    : "watchFilm__filmInfo__bottom"
                }
              >
                <li>Subtitle: VietSub</li>
                <li>Update date: {convertDate()}</li>
                <li>Movie length: 120 munites</li>
                <li style={{ display: "flex", alignItems: "center" }}>
                  <p>Actors:</p>
                  <ul className="watchFilm__filmInfo__bottom__actors">
                    <li>
                      <img
                        src="https://cf.shopee.vn/file/6705ccbb67416a1dd07e00ec1eddd49b"
                        alt="logo"
                      />
                      <p>Tony Stark</p>
                    </li>
                    <li>
                      <img
                        src="https://cf.shopee.vn/file/6705ccbb67416a1dd07e00ec1eddd49b"
                        alt="logo"
                      />
                      <p>Tony Stark</p>
                    </li>
                    <li>
                      <img
                        src="https://cf.shopee.vn/file/6705ccbb67416a1dd07e00ec1eddd49b"
                        alt="logo"
                      />
                      <p>Tony Stark</p>
                    </li>
                    <li>
                      <img
                        src="https://cf.shopee.vn/file/6705ccbb67416a1dd07e00ec1eddd49b"
                        alt="logo"
                      />
                      <p>Tony Stark</p>
                    </li>
                  </ul>
                </li>
                <li className="watchFilm__filmInfo__bottom__description">
                  {film.description}
                </li>
                <li>
                  Genres:{" "}
                  {film.categories.map((item, index) => {
                    if (index !== film.categories.length - 1) {
                      return <span key={index}>{item.name},</span>;
                    } else return <span key={index}>{item.name}.</span>;
                  })}
                </li>
                <li>Country: {film.country[0].name}</li>
              </ul>
            </div>
          </div>
          <div className="watchFilm__yourVote">
            <p>Vote this film</p>
            <div ref={yourVoteItemRef} className="watchFilm__yourVote__item">
              {renderStar()}
            </div>
          </div>
          <div className="watchFilm__comments">
            <Comments user={user} filmId={id} />
          </div>
        </div>
      )}
      {!film && !err && <Loadding />}
    </>
  );
}

export default WatchFilm;
