import React, { Component } from 'react';
import AppHeader from "./common/AppHeader";
import MenuOverlay from "./common/MenuOverlay";
import { getCurrentUser } from "./util/APIUtils";
import Login from "./user/login/Login";
import Signup from "./user/signup/Signup";
import { ACCESS_TOKEN } from "./constants";
import { Route, withRouter, Switch } from "react-router-dom";
import PantLista from './pant/PantLista';
import NewPant from './pant/NewPant';
import Profile from './user/profile/Profile';
import PrivateRoute from './common/PrivateRoute';
import StartPage from './common/StartPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
      menuOpen: false,
      coords: {
        lat: 49.33,
        lng: 18.07
      }
    }
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.getPosition = this.getPosition.bind(this);
  }

  toggleMenu() {
    this.setState((prevState) => ({
      menuOpen: !prevState.menuOpen
    }));
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
        console.log(error)
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    this.loadCurrentUser();
  }

  getPosition(position) {
    this.setState({
      coords: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  }

  handleLogout(redirectTo = "/") {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    this.props.history.push(redirectTo);
  }

  handleLogin() {
    this.loadCurrentUser();
    this.props.history.push("/pant");
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <MenuOverlay
          toggleMenu={this.toggleMenu}
          menuOpen={this.state.menuOpen}
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout}
        />
        <AppHeader
          menuOpen={this.state.menuOpen}
          toggleMenu={this.toggleMenu}
        />

        <Switch>
          <Route exact path="/" component={StartPage} />
          <div className="mainContent">
            <Route
              path="/login"
              render={props => <Login onLogin={this.handleLogin} {...props} />}
            />
            <Route
              path="/signupUser"
              render={() => <Signup regAsSchool={false} />}
            />
            <Route
              path="/signupSchool"
              render={() => <Signup regAsSchool={true} />}
            />
            <Route
              path="/pantMap"
              render={() => <PantLista map={true} center={this.state.coords} currentUser={this.state.currentUser} />}
            />
            <Route
              path="/pantList"
              render={() => <PantLista map={false} currentUser={this.state.currentUser} />}
            />
            <PrivateRoute authenticated={this.state.isAuthenticated}
              path="/regpant"
              component={NewPant} />
            <PrivateRoute authenticated={this.state.isAuthenticated}
              path="/minpant"
              component={Profile}
              currentUser={this.state.currentUser} />
          </div>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
