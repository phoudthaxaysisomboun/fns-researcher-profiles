import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/layout";
import Auth from './hoc/auth'

import Home from "./components/Home";
import ResearcherSearch from "./components/Home/researcher";

import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'

import ProfileOverview from './components/User'
import ProfileInfo from './components/User/info'
import Feed from "./components/User/Feed";

import Research from './components/Research/index'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/profile/:id" exact component={Auth(ProfileOverview, null)} />
        <Route path="/profile/:id/info" exact component={Auth(ProfileInfo, null)} />
        <Route path="/research/:id" exact component={Auth(Research, null)} />

        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/search" exact component={Auth(Home, null)} />
        <Route path="/search/researchers/" exact component={Auth(ResearcherSearch, null)} />
        <Route path="/" exact component={Auth(Feed, true)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
