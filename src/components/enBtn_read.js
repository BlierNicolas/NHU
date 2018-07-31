import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
    Button,
    Collapse
} from 'reactstrap';
import firebase, { auth, provider } from '../firebase.js';
import cookie from 'react-cookies';

export default class EnBtn_read extends React.Component {
    constructor(props) {
        super(props);

        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.checkUpReads = this.checkUpReads.bind(this);

        this.toggleRead = this.toggleRead.bind(this);

        this.login = this.login.bind(this);

        this.state = {
            user: null,
            lecteur: null,
            nomRoman: "",
            items: [],
            itemsLu: [],
            readStatus: false,
            readText: "Mark read",
            btn_class_read: "success",
			likeAutorise: true,
            loaded: false
        };
        this.handleSubmitRead = this.handleSubmitRead.bind(this);
    }

    onEntering() { }

    onEntered() { }

    onExiting() { }

    onExited() { }

    toggleRead() {
        if ((this.state.lecteur) && (this.state.loaded)) {
            if (!this.state.readStatus) {
                this.setState({ readStatus: true });
                this.setState({ readText: "Unmark read" });
                this.setState({ btn_class_read: "danger" });
            } else {
                this.setState({ readStatus: false });
                this.setState({ readText: "Mark read" });
                this.setState({ btn_class_read: "success" });

                this.state.itemsLu.map((item) => {
                    if ((item.user == this.state.lecteur.email) && (item.chapitre == this.props.contentChapitre.titreChapitre)) {
                        this.removeItem(item.id);
                    };
                })
            }
        }
    }

    componentWillMount() {
        this.state.lecteur = cookie.load('lecteur');
    }

    componentDidMount() {
        const itemsRefLu = firebase.database().ref('reads');
        itemsRefLu.on('value', (snapshot) => {
            let itemsLu = snapshot.val();
            let newState = [];
            for (let item in itemsLu) {
                newState.push({
                    id: item,
                    chapitre: itemsLu[item].chapitre,
                    chapitreSlug: itemsLu[item].slug,
                    user: itemsLu[item].user,
                    nomRoman: itemsLu[item].nomRoman
                });
            }
            this.setState({
                itemsLu: newState
            });

            if (!this.state.loaded) {
                this.checkUpReads();
                this.setState({ loaded: true });
            }
        });
    }

    checkUpReads() {
        if (this.state.lecteur) {
            this.state.itemsLu.map((item) => {
                if ((item.chapitre == this.props.contentChapitre.titreChapitre) && (item.user == this.state.lecteur.email)) {
                    this.setState({ readStatus: true });
                    this.setState({ readText: "Unmark read" });
                    this.setState({ btn_class_read: "danger" });
                };
            })
        }
    }

    handleSubmitRead(e) {
        // Empêche le refresh
        e.preventDefault();

        // Met la référence vers la database
        const itemsRef = firebase.database().ref('reads');

        if ((!this.state.readStatus) && (this.state.loaded)) {
            this.state.items.map((itemLu) => {
                if ((itemLu.chapitre == this.props.contentChapitre.titreChapitre) && (itemLu.user == this.state.lecteur.email)) {
                    this.setState({ likeAutorise: false });
                };
            })

            if (this.state.likeAutorise) {
                // Popule les champs dans une collection "item"
                const itemLu = {
                    user: this.state.lecteur.email,
                    chapitre: this.props.contentChapitre.titreChapitre,
                    chapitreSlug: this.props.contentChapitre.slug,
                    nomRoman: this.props.contentChapitre.nomRoman,
                    chapitreApres: this.props.contentChapitre.chapitreApres,
                    codeChapitre: this.props.contentChapitre.codeChapitre
                }

                // Pousse l'item créé dans la collection
                itemsRef.push(itemLu);
            }
        }

        this.toggleRead();
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
                cookie.save('lecteur', this.state.user, { path: '/' });

                window.location.reload();
            });
    }

    removeItem(itemId) {
        if (this.state.readText == "Unmark read") {
            const itemRef = firebase.database().ref(`/reads/${itemId}`);
            itemRef.remove();
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitRead} className="float-left d-content">
                <Button color={this.state.btn_class_read}>{this.state.readText}</Button>

                <Collapse
                    isOpen={this.state.readStatus}
                    onEntering={this.onEntering}
                    onEntered={this.onEntered}
                    onExiting={this.onExiting}
                    onExited={this.onExited}

                    className="float-left"
                >
                </Collapse>
            </form>
        );
    }
}