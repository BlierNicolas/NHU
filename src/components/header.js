import React, { Component } from 'react'
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
    DropdownItem,
    Button
} from 'reactstrap';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

		this.onEntering = this.onEntering.bind(this);
		this.onEntered = this.onEntered.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            nightMode: false, 
            status: 'inactif'
        };
        
		this.checkActif();
	}

	onEntering() {
		this.setState({ status: 'desactivation...' });
	}

	onEntered() {
		this.setState({ status: 'inactif' });
	}

	onExiting() {
		this.setState({ status: 'activation...' });
	}

	onExited() {
		this.setState({ status: 'actif' });
	}

	componentDidMount() {
		this.setState({ nightMode: !this.state.nightMode });
    }
    
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.setState({ nightMode: !this.state.nightMode });

		this.checkActif();
    }

	checkActif() {
		console.log(this.state.nightMode);
		if (this.state.nightMode) {
			document.body.classList.add('darkClass')
		} else {
			document.body.classList.remove('darkClass')
		}
		console.log("Night mode " + this.state.status);
	}

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" pills>
                            <NavItem>
								<Button color="primary" onClick={this.toggle}>
									<FontAwesome
										name='moon'
										className='mr-2'
										style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
									/>
									Mode nuit {this.state.status}
								</Button>

								<Collapse
									isOpen={this.state.nightMode}
									onEntering={this.onEntering}
									onEntered={this.onEntered}
									onExiting={this.onExiting}
									onExited={this.onExited}
								>
								</Collapse>
							</NavItem>
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