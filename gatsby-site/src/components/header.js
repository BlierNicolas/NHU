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
                <NavLink href="/nouvelles">Nouvelles</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Histoires
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/ListeDesRomans">Les romans</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="#">Calendrier des sorties</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Infos
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="https://venatusuniverse.com/ListeDesPersonnages">Les personnages</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="#">Les pouvoirs</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="#">Les groupes</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="#">La géographie</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="#">Les théories</Link>
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