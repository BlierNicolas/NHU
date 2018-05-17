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
          <NavbarBrand><Link to="/">New Human Universe</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/liste-des-nouvelles">Nouvelles</Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Histoires
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/liste-des-histoires">Liste des histoires</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/calendrier">Calendrier des sorties</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Infos
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/liste-des-personnages">Les personnages</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/Liste-des-pouvoirs">Les pouvoirs</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/Liste-des-groupes">Les groupes</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/geographie">La géographie</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to="/liste-des-theories">Les théories</Link>
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