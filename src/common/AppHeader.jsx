import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link, withRouter } from "react-router-dom";

class AppHeader extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {

        let signupClass = (
            <DropdownItem>
                <NavLink tag={Link} to="/signup" onClick={this.props.onSchoolclass}>Registera class</NavLink>
            </DropdownItem>
        );

        let signupUser = (
            <DropdownItem>
                <NavLink tag={Link} to="/signup">Registera Användare</NavLink>
            </DropdownItem>
        );

        let login = (
            <DropdownItem>
                <NavLink tag={Link} to="/login">Log In</NavLink>
            </DropdownItem>
        );

        let profile = "";

        let signOut = "";

        let regPant = "";

        if (this.props.isAuthenticated) {
            login = "";
            signupUser = "";
            signupClass = "";

            profile = (
                <DropdownItem>
                    <NavLink tag={Link} to="/profile">Profil</NavLink>
                </DropdownItem>
            );

            signOut = (
                <DropdownItem>
                    <NavLink onClick={() => this.props.onLogout()}>Sign Out</NavLink>
                </DropdownItem>
            );

            regPant = (
                <DropdownItem>
                    <NavLink tag={Link} to="/regpant">Registera pant</NavLink>
                </DropdownItem>
            );

        }

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Pantad</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Meny
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavLink tag={Link} to="/pant">Pantlista</NavLink>
                                    </DropdownItem>
                                    {signupUser}
                                    {signupClass}
                                    {login}
                                    {regPant}
                                    {profile}
                                    {signOut}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(AppHeader);