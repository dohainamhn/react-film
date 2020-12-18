import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import NavBar from "./components/Header";
import Home from "./Pages/Home";
import FilterFilm from "./Pages/FilterFilm";
import WatchFilm from "./Pages/WatchFilm";
import LeftComponent from "./components/LeftComponent";
import Auth from "./Pages/Auth/index";
import userApi from "./api/userApi";
import ErrorPage from "./components/ErrorPage";

import "./App.css";
import "./style/reset.css";
import Member from "./Pages/Member";
import Footer from "./Pages/Footer";

function App() {
  const [data, setData] = useState([]);
  const [films, setFilms] = useState([]);
  const [unRight, setUnRight] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [submit,setSubmit] = useState(null)

  useEffect(() => {
    fetch("https://5f8a739718c33c0016b31771.mockapi.io/Film")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setFilms(res.slice(0, 7));
      });
    const token = localStorage.getItem("token");
    if (token) {
      console.log("ok2");
      userApi
        .signInAfterReload()
        .then((res) => {
          setUser(res.data);
          console.log("ok");
          console.log(res);
        })
        .catch((err) => {
          console.log("loi");
          localStorage.removeItem("token");
        });
    }
  }, []);
  useEffect(()=>{
    console.log(submit)
  },[submit])
  useEffect(() => {
    if (
      location.pathname === "/auth/sign-in" ||
      location.pathname === "/auth/sign-up" ||
      location.pathname === "/member/user-infor" ||
      location.pathname === "/member/favorite-film" ||
      location.pathname === "/member/change-password"
    ) {
      setUnRight(true);
      return;
    }
    setUnRight(false);
  }, [location]);
  return (
    <UserProvider value={{ user, setUser } }>
      <div className="app">
        <NavBar submit={(data)=>{
          setSubmit(data)
        }} className="nav-bar" />
        <div className="app__container">
          <div
            className="app__container__left"
            style={{ width: unRight && "100%" }}
          >
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/watch-film/:id">
                <WatchFilm />
              </Route>
              <Route exact path="/search">
              <FilterFilm  searchFilm={submit} />
              </Route>
              <Route path="/filter/:query">
                <FilterFilm films={films} />
              </Route>
              <Route path="/movies-shown-in-theater">
                <FilterFilm />
              </Route>
              <Route exact path="/">
                <Home films={films} />
              </Route>
              {user && <Route path="/member" component={Member} />}
              <Route exact path="*">
                <ErrorPage />
              </Route>
            </Switch>
          </div>
          {!unRight && (
            <div className="app__container__right">
              <LeftComponent films={films} />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
