import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/layout";
import Auth from './hoc/auth'

import Home from "./components/Home";

import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'

import ProfileOverview from './components/User'
import Feed from "./components/User/Feed";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/profile/:id" exact component={Auth(ProfileOverview, null)} />

        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/home" exact component={Auth(Home, null)} />
        <Route path="/" exact component={Auth(Feed, true)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
