import React, { useContext } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import UserInfor from "./UserInfor";
import userContext from "../../context/UserContext";
import FavoriteFilm from "./FavoriteFilm";
import ErrorPage from "../../components/ErrorPage";

import "./style.scss";
import ChangePassword from "./ChangePassword";
function Member(props) {
  const { user, setUser } = useContext(userContext);

  return (
    <div className="container-user">
      <div className="menu-left">
        <div className="user-infor">
          <NavLink to="/member/user-infor" activeClassName="user-active">
            <i className="far fa-user"></i> Thông tin tài khoản
          </NavLink>
        </div>
        <div className="favorite-films">
          <NavLink to="/member/favorite-film" activeClassName="user-active">
            <i className="fas fa-film"></i> phim yêu thích
          </NavLink>
        </div>
      </div>
      <div className="content-right">
        <Switch>
          <Route path="/member/user-infor">
            <UserInfor user={user} />
          </Route>
          <Route path="/member/favorite-film" component={FavoriteFilm} />
          <Route path="/member/change-password" component={ChangePassword} />
        </Switch>
      </div>
    </div>
  );
}

export default Member;
