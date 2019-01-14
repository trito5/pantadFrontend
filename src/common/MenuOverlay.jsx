import React from 'react';
import { Link } from "react-router-dom";

class AppHeader extends React.Component {
    render() {
        return (
            <div className={this.props.menuOpen ? "menu-overlay open" : "menu-overlay"}>
                <div onClick={this.props.toggleMenu}>
                    <i className="fas fa-times main-menu-link"></i>
                </div>
                <nav className="main-menu">
                    <Link className="main-menu-link" to="/pantMap" onClick={this.props.toggleMenu}>Pantlista</Link>
                    {this.props.isAuthenticated &&
                        <React.Fragment>
                            <Link className="main-menu-link" to="/minpant" onClick={this.props.toggleMenu}>Min pant</Link>
                            <Link className="main-menu-link" to="/regpant" onClick={this.props.toggleMenu}>Registera pant</Link>
                            <Link className="main-menu-link" to="" onClick={() => this.props.onLogout()}>Logga ut</Link>
                        </React.Fragment>
                    }
                    {!this.props.isAuthenticated &&
                        <React.Fragment>
                            <Link className="main-menu-link" to="/login" onClick={this.props.toggleMenu}>Logga in</Link>
                            <Link className="main-menu-link" to="/signupUser" onClick={this.props.toggleMenu}>Registera som användare</Link>
                            <Link className="main-menu-link" to="/signupSchool" onClick={this.props.toggleMenu}>Registera som skola</Link>
                        </React.Fragment>
                    }

                </nav>
            </div>
        );
    }
}

export default AppHeader;