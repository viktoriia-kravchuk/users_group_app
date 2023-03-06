import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListUserComponent from "./components/ListUserComponent";
import ListGroupComponent from "./components/ListGroupComponent";
import Header from "./components/Header";
import CreateUserComponent from "./components/CreateUserComponent";
import CreateGroupComponent from "./components/CreateGroupComponent";
import ViewUserComponent from "./components/ViewUserComponent";
import ViewGroupComponent from "./components/ViewGroupComponent";
import AddUserGroup from "./components/AddUserGroup";

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListUserComponent} />
            <Route path="/users" component={ListUserComponent} />
            <Route path="/groups" component={ListGroupComponent} />
            <Route path="/add-group/:id" component={CreateGroupComponent} />
            <Route path="/add-user/:id" component={CreateUserComponent} />
            <Route path="/view-user/:id" component={ViewUserComponent} />
            <Route path="/view-group/:id" component={ViewGroupComponent} />
            <Route path="/add-user-group/:id" component={AddUserGroup} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
