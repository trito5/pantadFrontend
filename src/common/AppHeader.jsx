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
        let navBarItems;

        if (this.props.isAuthenticated) {
            navBarItems = (
                <React.Fragment>
                    <DropdownItem>
                        <NavLink tag={Link} to="/regpant">Registera pant</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink tag={Link} to="/profile">Profil</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink onClick={() => this.props.onLogout()}>Sign Out</NavLink>
                    </DropdownItem>
                </React.Fragment>
            );
        } else {
            navBarItems = (
                <React.Fragment>
                    <DropdownItem>
                        <NavLink tag={Link} to="/login">Log In</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink tag={Link} to="/signup">Registera Användare</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                        <NavLink tag={Link} to="/signup" onClick={this.props.onSchoolclass}>Registera klass</NavLink>
                    </DropdownItem>
                </React.Fragment>
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
                                    {navBarItems}
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