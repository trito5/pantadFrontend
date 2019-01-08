import React, { Component } from 'react';
import AppHeader from "./common/AppHeader";
import { getCurrentUser } from "./util/APIUtils";
import Login from "./user/login/Login";
import Signup from "./user/signup/Signup";
import { ACCESS_TOKEN } from "./constants";
import { Route, withRouter, Switch } from "react-router-dom";
import SchoolClass from "./schoolclass/SchoolClass";
import PantLista from './pant/PantLista';
import NewPant from './pant/NewPant';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo = "/") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false,
    });

    this.props.history.push(redirectTo);
  }

  handleLogin() {
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <AppHeader
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout}
        />
        <Switch>
          <Route
            path="/login"
            render={props => <Login onLogin={this.handleLogin} {...props} />}
          />
          <Route path="/signup" component={Signup} />
          <Route path="/regclass" component={SchoolClass} />
          <Route path="/pant" component={PantLista} />
          <Route path="/regpant" component={NewPant} />
        </Switch>

      </div>
    );
  }
}

export default withRouter(App);
