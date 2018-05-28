import React from 'react'
import Link from 'gatsby-link'
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

export default class Header extends React.Component {
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
                <Navbar color="dark" dark expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" pills>
                            <NavItem>
                                <Link to="/" className="text-white nav-link">Accueil</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/nouvelles" className="text-white nav-link">Quoi de nouveau&nbsp;?</Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Coin lecture
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/histoires">Nos Histoires de l'Univers...</Link>
                                    </DropdownItem>
                                    {/* <DropdownItem>
                                        <Link to="/calendrier">Calendrier des sorties</Link>
                                    </DropdownItem> */}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Wiki
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/personnages">Nos personnages</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/pouvoirs">Abilités des personnages</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/groupes">Groupes, clans et organisations...</Link>
                                    </DropdownItem>
                                    {/* <DropdownItem>
                                        <Link to="/giervia">Giervia</Link>
                                    </DropdownItem> */}
                                    <DropdownItem>
                                        <Link to="/encyclopedie">L'encyclopédie universelle</Link>
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