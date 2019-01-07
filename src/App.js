import React, { Component } from 'react';
import AppHeader from "./common/AppHeader";
import { Route } from "react-router-dom";
import SchoolClass from "./schoolclass/SchoolClass";
import PantLista from './pant/PantLista';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
  }
  render() {
    return (
      <div className="App">
        <AppHeader />
        <Route exact path="/" component={PantLista} />
        <Route path="/regclass" component={SchoolClass} />
      </div>
    );
  }
}

export default App;
