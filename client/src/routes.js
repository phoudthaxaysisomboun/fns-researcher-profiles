import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/layout";
import Home from "./components/Home";
import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'

import UserProfile from './components/User'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/profile" exact component={UserProfile} />

        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={RegisterLogin} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default Routes;
