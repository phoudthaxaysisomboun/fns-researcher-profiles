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
import ResearchComments from './components/Research/comments'

import ResearcherAdmin from './components/User/Admin/researchers'
import RequestRegisterAdmin from './components/User/Admin/requests'
import NewComerResearchersAdmin from './components/User/Admin/newcomer'
import OutstandingResearchersAdmin from './components/User/Admin/outstanding'
import ResearchesAdmin from './components/User/Admin/researches'

import AllResearcherNumbersReports from './components/User/Admin/Reports/Researcher'
import AllResearchersList from './components/User/Admin/Reports/Researcher/list_all_researchers'
import OutstandingResearchersList from './components/User/Admin/Reports/Researcher/outstanding'
import NewcomerResearchersList from './components/User/Admin/Reports/Researcher/newcomer'
import ResearchNumber from './components/User/Admin/Reports/Research'
import AllResearchesList from './components/User/Admin/Reports/Research/list_all_researches'
import ResearchLikesCommentsSharesReports from './components/User/Admin/Reports/Research/likes_shares_comments'
import ResearchReadsReports from './components/User/Admin/Reports/Research/reads'
import ResearchDownloadsReports from './components/User/Admin/Reports/Research/downloads'
import ResearchCitationsReports from './components/User/Admin/Reports/Research/citations'
import research from "./components/User/Card/research";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/profile/:id" exact component={Auth(ProfileOverview, null)} />
        <Route path="/profile/:id/info" exact component={Auth(ProfileInfo, null)} />
        <Route path="/research/:id" exact component={Auth(Research, null)} />
        <Route path="/research/:id/comments" exact component={Auth(ResearchComments, null)} />

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

        <Route path="/admin/reports/researchers/numbers" exact component={Auth(AllResearcherNumbersReports, true, true)} />
        <Route path="/admin/reports/researchers/lists" exact component={Auth(AllResearchersList, true, true)} />
        <Route path="/admin/reports/researchers/outstanding" exact component={Auth(OutstandingResearchersList, true, true)} />
        <Route path="/admin/reports/researchers/newcomer" exact component={Auth(NewcomerResearchersList, true, true)} />
        <Route path="/admin/reports/researches/numbers" exact component={Auth(ResearchNumber, true, true)} />
        <Route path="/admin/reports/researches/lists" exact component={Auth(AllResearchesList, true, true)} />
        <Route path="/admin/reports/researches/likes_comments_shares" exact component={Auth(ResearchLikesCommentsSharesReports, true, true)} />
        <Route path="/admin/reports/researches/reads" exact component={Auth(ResearchReadsReports, true, true)} />
        <Route path="/admin/reports/researches/downloads" exact component={Auth(ResearchDownloadsReports, true, true)} />
        <Route path="/admin/reports/researches/citations" exact component={Auth(ResearchCitationsReports, true, true)} />

      </Switch>
    </Layout>
  );
};

export default Routes;
