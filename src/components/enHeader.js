import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from 'reactstrap';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import cookie from 'react-cookies';

export default class HeaderEn extends React.Component {
    constructor(props) {
        super(props);

        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);

        this.toggle = this.toggle.bind(this);
        this.toggleNight = this.toggleNight.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            isOpen: false,
            nightMode: false,
            status: 'off',
            mounted: undefined,
            user: null
        };
    }

    onEntering() {
        this.setState({ status: 'deactivating...' });
    }

    onEntered() {
        this.setState({ status: 'off' });
        cookie.save('c_nightMode', 'off', { path: '/' });
        //console.log("onEntered: " + cookie.load('c_nightMode'));
    }

    onExiting() {
        this.setState({ status: 'activating...' });
    }

    onExited() {
        this.setState({ status: 'on' });
        cookie.save('c_nightMode', 'on', { path: '/' });
        //console.log("onExited: " + cookie.load('c_nightMode'));
    }

    componentWillMount() {
        this.state.mounted = cookie.load('c_nightMode');
        //console.log("Will Mount : " + cookie.load('c_nightMode'));
        this.checkActif();
    }

    componentDidMount() {
        this.setState({ nightMode: !this.state.nightMode });

        // auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         this.setState({ user });
        //     }
        // });
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleNight() {
        this.setState({ nightMode: !this.state.nightMode });

        this.checkActif();
    }

    checkActif() {
        //console.log(this.state.nightMode);
        if (typeof document !== "undefined") {
            //console.log(this.state.mounted);
            if (this.state.mounted == 'on') {
                this.state.nightMode = true;
                this.state.status = 'on';
                this.state.mounted = undefined;
            }
            if (this.state.nightMode) {
                document.body.classList.add('darkClass')
            } else {
                document.body.classList.remove('darkClass')
            }
        }
        //console.log("Night mode " + this.state.status);
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    login() {
        //auth.disableAutoSignIn()
        console.log(provider)
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
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
                                <Button color="primary" onClick={this.toggleNight}>
                                    <FontAwesome
                                        name='moon'
                                        className='mr-2'
                                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    />
                                    Night mode {this.state.status}
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
                                <Link to="/en" className="text-white nav-link">Homepage</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/en/news" className="text-white nav-link">What's new&nbsp;?</Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Reading corner
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/en/stories">Our Univese stories...</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/en/calendar">Calendar of releases</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/en/progression">Progression of the Universe</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Wiki
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/en/characters">Our characters</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/en/powers">Character abilities</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/en/groups">Groups, clans and organisations...</Link>
                                    </DropdownItem>
                                    {/* <DropdownItem>
                                        <Link to="/giervia">Giervia</Link>
                                    </DropdownItem> */}
                                    <DropdownItem>
                                        <Link to="/en/encyclopedia">The universal encyclopedia</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    {this.state.user ?
                                        <div>
                                            {this.state.user.displayName}
                                        </div>
                                        :
                                        <div>
                                            Connexion
                                        </div>
                                    }
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {this.state.user ?
                                        <div>
                                            <button onClick={this.logout}>Log Out</button>
                                        </div>
                                        :
                                        <div>
                                            <button onClick={this.login}>Log In</button>
                                        </div>
                                    }
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}