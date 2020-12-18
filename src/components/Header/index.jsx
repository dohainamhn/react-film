import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import userContext from "../../context/UserContext";
import FilmApi from '../../api/filmApi'
import "../../style/reset.css";
import "./style.scss";
import countryApi from "../../api/country";
import categoryApi from "../../api/category";
function NavBar(props) {
  const { submit } = props
  const [collapse, setCollapse] = useState(false);
  const { user, setUser } = useContext(userContext);
  const [inputSearch, setInputSearch] = useState('')
  const history = useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    FilmApi.searFilm({
      data: e.target.input.value
    }).then((res) => {
      submit(res.data)
      history.push('/search')
      e.target.input.value = ""
    })
  }
  const [fillterCountry, setFillterCountry] = useState(null);
  const [filltercAtegory, setFilltercAtegory] = useState(null);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

  useEffect(() => {
    countryApi.getAll({ limit: 20 }).then((res) => {
      setFillterCountry(res.data);
      setIsLoading1(false);
    });
    categoryApi.getAll({ limit: 20 }).then((res) => {
      setFilltercAtegory(res.data);
      console.log(res.data);
      setIsLoading2(false);
    });
  }, []);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <nav className="nav">
      <div className="container">
        <div className="row">
          <div className="col col-img">
            <NavLink to="/" className="nav__logo">
              <img src="https://i.imgur.com/lGh30No.png" alt="logo" />
            </NavLink>
          </div>
          <div className="col col-hamburger">
            <div className="nav__hamburger">
              <i
                className={collapse ? "fas fa-times" : "fas fa-bars"}
                onClick={handleCollapse}
              ></i>
            </div>
          </div>
          <div
            className={collapse ? "nav__collapse nav__active" : "nav__collapse"}
          >
            <ul className="nav__menu">
              <li className="nav__item nav__hover">
                <label htmlFor="checkbox1" className="nav__link">
                  Thể Loại <i className="fas fa-caret-down"></i>
                </label>
                <input type="checkbox" id="checkbox1" />
                <ul className="nav__smenu">
                  {!isLoading2 &&
                    filltercAtegory.categories.map((category) => (
                      <li className="smenu__item" key={category._id}>
                        <Link
                          className="smenu__link"
                          to={`/filter/genres=${category._id}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li className="nav__item nav__hover">
                <label htmlFor="checkbox2" className="nav__link">
                  Quốc Gia <i className="fas fa-caret-down"></i>
                </label>
                <input type="checkbox" id="checkbox2" />
                <ul className="nav__smenu">
                  {!isLoading1 &&
                    fillterCountry.countries.map((country) => {
                      return (
                        <li className="smenu__item" key={country._id}>
                          <Link
                            to={`/filter/country=${country._id}`}
                            className="smenu__link"
                          >
                            {country.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
              <li className="nav__item">
                <NavLink to="/filter/sort=votes" className="nav__link">
                  Phim Hot
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/filter/year=2020" className="nav__link">
                  Phim Mới
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/movies-shown-in-theater" className="nav__link">
                  Phim Chiếu Rạp
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col nav__search">
            <div className="nav__form">
              <form onSubmit={handleSubmit} className="nav__input">
                <input autoComplete="off" onChange={(e) => {
                  setInputSearch(e.target.value)
                }} type="text" name="input" placeholder="Search" />
                <div className="nav__form--btn">
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
              <div className="nav__login">
                {user ? (
                  <>
                    {" "}
                    <div className="user">
                      <div className="logo-user">
                        <img src={user.avatar} alt="logo" />
                      </div>
                    </div>
                    <span className="user-name">{user.userName}</span>
                    <ul className="menu-user">
                      <span className="display-name">{user.userName}</span>
                      <li className="user-item">
                        <Link className="user-link" to="/member/user-infor">
                          <i className="far fa-user"></i>
                          Thông tin cá nhân
                        </Link>
                      </li>
                      <li className="user-item">
                        <Link className="user-link" to="/">
                          <i className="fas fa-film"></i>
                          tủ phim của bạn
                        </Link>
                      </li>
                      <li className="user-item">
                        <i className="fas fa-sign-out-alt"></i>
                        <span
                          className="user-link"
                          onClick={() => {
                            localStorage.removeItem("token");
                            window.location.reload();
                          }}
                        >
                          Đăng Xuất
                        </span>
                      </li>
                    </ul>
                  </>
                ) : (
                    <NavLink className="btn-login" to="/auth/sign-in">
                      Login
                    </NavLink>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
