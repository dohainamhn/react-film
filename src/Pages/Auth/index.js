import React, { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Signin from "./Signin/index";
import Signup from "./Signup/index";
import userContext from '../../context/UserContext'
import "./style.scss";

Auth.propTypes = {};


function Auth(props) {
  const history = useHistory()
  const {user,setUser} = useContext(userContext)
  useEffect(()=>{
    if(user){
      history.push('/')
    }
    else{
      history.push('/auth/sign-in')
    }
  },[user,history])
  return (
    <div className="auth">
      <Route path="/auth/sign-in" component={Signin} />
      <Route path="/auth/sign-up" component={Signup} />
    </div>
  );
}

export default Auth;
