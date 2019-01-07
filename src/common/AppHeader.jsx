import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";

export default class Example extends React.Component {
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
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Pantad</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {/* <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem> */}
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/">Pantlista</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/reguser">Registera användare</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/regclass">Registera class</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                            <NavLink tag={Link} to="/regpant">Registera pant</NavLink>
                                        </NavItem>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}