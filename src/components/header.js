import React from 'react'
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
import FontAwesome from 'react-fontawesome';
import { auth, provider } from '../firebase.js';
import 'firebase/database';
import 'firebase/auth';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Header extends React.Component {
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

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") { this.lang = lang_fr; }
        if (this.props.lang === "en-US") { this.lang = lang_en; }

        this.state = {
            isOpen: false,
            user: null,
            status: this.lang.btn_nuit_inactif
        };

        this.nightMode = false
        //this.status = this.lang.btn_nuit_inactif
        this.mounted = undefined

        if (localStorage.getItem('c_nightMode') !== "null") {
            this.mounted = localStorage.getItem('c_nightMode');
            this.checkActif();
        }
    }

    onEntering() {
        this.setState({status: this.lang.btn_nuit_desactivation});
    }

    onEntered() {
        this.setState({status: this.lang.btn_nuit_inactif});
    }

    onExiting() {
        this.setState({status: this.lang.btn_nuit_activation});
    }

    onExited() {
        this.setState({status: this.lang.btn_nuit_actif});
    }

    componentDidMount() {
        //this.nightMode = !this.nightMode;
        //console.log("CompotDidMount: " + this.nightMode)
        if (typeof window !== "undefined") {
            auth.onAuthStateChanged((user) => {
                if (user) {
                    this.setState({ user });
                }
            });
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleNight() {
        //(this.nightMode === true) ? (this.nightMode = false) : (this.nightMode = true)
        this.nightMode = !this.nightMode;
        //console.log(this.nightMode);

        if (this.nightMode === true) {
            this.setState({status: this.lang.btn_nuit_actif});
            //console.log(this.state.status);
            this.nightMode = true
            localStorage.setItem('c_nightMode', 'on');
            //console.log("ToggleNight: Actif");
        } else {
            this.setState({status: this.lang.btn_nuit_inactif});
            //console.log(this.state.status);
            this.nightMode = false
            localStorage.setItem('c_nightMode', 'off');
            //console.log("ToggleNight: Inactif");
        }

        this.checkActif();
    }

    checkActif() {
        if (typeof document !== "undefined") {
            if (this.mounted === 'on') {
                this.nightMode = true;
                this.setState({status: this.lang.btn_nuit_actif});
                this.mounted = undefined;
            }
            if (this.nightMode) {
                document.body.classList.add('darkClass')
            } else {
                document.body.classList.remove('darkClass')
            }
            //console.log("CheckActif: " + this.status);
        }
    }

    logout() {
        if (typeof window !== "undefined") {
            auth.signOut()
                .then(() => {
                    this.setState({
                        user: null
                    });
                    localStorage.setItem('lecteur_connect', "vide");

                    window.location.reload();
                });
        }
    }

    login() {
        if (typeof window !== "undefined") {
            auth.signInWithPopup(provider)
                .then((result) => {
                    const user = result.user;
                    this.setState({
                        user
                    });
                    localStorage.setItem('lecteur_connect', this.state.user);
                });
        }
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto nav-center" pills>
                            <NavItem>
                                <Button color="primary" onClick={this.toggleNight}>
                                    <FontAwesome
                                        name='moon'
                                        className='mr-2'
                                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    />
                                    {this.lang.btn_nuit + ((this.nightMode) ? (this.lang.btn_nuit_actif) : (this.lang.btn_nuit_inactif))}
                                </Button>

                                <Collapse
                                    isOpen={this.nightMode}
                                    onEntering={this.onEntering}
                                    onEntered={this.onEntered}
                                    onExiting={this.onExiting}
                                    onExited={this.onExited}
                                >
                                </Collapse>
                            </NavItem>
                            <NavItem>
                                <Link to={this.lang.header_accueil_url} className="text-white nav-link">{this.lang.header_accueil}</Link>
                            </NavItem>
                            <NavItem>
                                <Link to={this.lang.header_nouvelles_url + "/"} className="text-white nav-link">{this.lang.header_nouvelles}</Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    {this.lang.header_lecture}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to={this.lang.header_histoires_url + "/"}>{this.lang.header_histoires}</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={this.lang.header_calendrier_url + "/"}>{this.lang.header_calendrier}</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={this.lang.header_progression_url + "/"}>{this.lang.header_progression}</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={this.lang.header_projets_url + "/"}>{this.lang.header_projets}</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    {this.lang.header_wiki}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to={this.lang.header_personnages_url + "/"}>{this.lang.header_personnages}</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={this.lang.header_pouvoirs_url + "/"}>{this.lang.header_pouvoirs}</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={this.lang.header_groupes_url + "/"}>{this.lang.header_groupes}</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={this.lang.header_giervia_url + "/"}>{this.lang.header_giervia}</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={this.lang.header_evenements_url + "/"}>{this.lang.header_evenements}</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={this.lang.header_encyclopedie_url + "/"}>{this.lang.header_encyclopedie}</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    {this.state.user ?
                                        this.state.user.displayName
                                        :
                                        <span>{this.lang.header_connexion}</span>
                                    }
                                </DropdownToggle>
                                <DropdownMenu right className="no-padding">
                                    {this.state.user ?
                                        <div>
                                            <Button color="primary" onClick={this.logout}>{this.lang.header_logout}</Button>
                                        </div>
                                        :
                                        <div>
                                            <Button color="primary" onClick={this.login}>{this.lang.header_login}</Button>
                                        </div>
                                    }
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}