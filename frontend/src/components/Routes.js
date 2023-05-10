import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ProfileForm from "./ProfileForm";
import HomeAnon from "./HomeAnon";
import UserInfo from "./UserInfo";
import Comp404 from "./Comp404";
import Logout from "./Logout";
import ItemsContext from "./ItemsContext";
import Country from "./Country";

function Routes() {
  //Our menu items and the function to properly add new items with our NewItemForm
  const { register, login, logout } = useContext(ItemsContext);

  return (
    <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/country/:name">
      <Country/>
    </Route>
    <Route path="/login">
      <LoginForm login={login} />
    </Route>
    <Route path="/register">
      <RegisterForm register={register} />
    </Route>
    <Route path="/profile/update">
      <ProfileForm />
    </Route>
    <Route path="/profile">
      <UserInfo />
    </Route>
    <Route path="/logout">
      <Logout logout={logout} />
    </Route>
    <Route path="/homeanon">
      <HomeAnon />
    </Route>
    <Route>
      <Comp404 />
    </Route>
  </Switch>
  );
}

export default Routes;
