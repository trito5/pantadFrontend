import React, { Component } from "react";
import { login } from "../../util/APIUtils";
import { ACCESS_TOKEN } from "../../constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    login({
      usernameOrEmail: this.state.email,
      password: this.state.password
    })
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        this.setState({ email: "", password: "" });
        this.props.onLogin();
      })
      .catch(error => {
        if (error.status === 401) {
          console.log("Fel email eller lösenord");
        } else {
          console.log("Något gick tokigt, prova igen");
        }
      });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={event => this.handleSubmit(event)}>
          <input
            type="text"
            name="email"
            onChange={this.handleEmailChange}
            value={this.state.email}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            placeholder="Password"
          />
          <input type="submit" value="Logga in" />
        </form>
      </div>
    );
  }
}

export default Login;
