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
  DropdownItem } from 'reactstrap';

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
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">New Human Universe</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/ListeDesNouvelles">Nouvelles</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Histoires
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/ListeDesHistoires">Liste des histoires</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/Calendrier">Calendrier des sorties</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Infos
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/ListeDesPersonnages">Les personnages</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/ListeDesPouvoirs">Les pouvoirs</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/ListeDesGroupes">Les groupes</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/Geographie">La géographie</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/ListeDesTheories">Les théories</Link>
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