import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./Auth/AuthContainer";
import RoomList from "./Room/RoomContainer";
import Chat from "./Chat/ChatContainer";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={RoomList} />
    <Route exact path="/:roomname" component={Chat} />
    <Route path="/:roomname/People" component={Chat} />
    <Route path="/:roomname/:categoryName" component={Chat} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
