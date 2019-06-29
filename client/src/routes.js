import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/layout";
import Auth from './hoc/auth'

import Home from "./components/Home";
import ResearcherSearch from "./components/Home/researcher";
import ResearchSearch from "./components/Home/research";

import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'

import ProfileOverview from './components/User'
import ProfileInfo from './components/User/info'
import Feed from "./components/User/Feed";

import Research from './components/Research/index'

import ResearcherAdmin from './components/User/Admin/researchers'
import RequestRegisterAdmin from './components/User/Admin/requests'
import NewComerResearchersAdmin from './components/User/Admin/newcomer'
import OutstandingResearchersAdmin from './components/User/Admin/outstanding'
import ResearchesAdmin from './components/User/Admin/researches'

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
        <Route path="/search/researches/" exact component={Auth(ResearchSearch, null)} />
        <Route path="/" exact component={Auth(Feed, true)} />

        <Route path="/admin/researchers" exact component={Auth(ResearcherAdmin, true, true)} />
        <Route path="/admin/researches" exact component={Auth(ResearchesAdmin, true, true)} />
        <Route path="/admin/researchers/requests" exact component={Auth(RequestRegisterAdmin, true, true)} />
        <Route path="/admin/researchers/outstanding" exact component={Auth(OutstandingResearchersAdmin, true, true)} />
        <Route path="/admin/researchers/newcomer" exact component={Auth(NewComerResearchersAdmin, true, true)} />

      </Switch>
    </Layout>
  );
};

export default Routes;
