import React from 'react'
import {
    Button,
    Collapse
} from 'reactstrap';
import firebase, { auth, provider } from 'firebase/app';
import 'firebase/database';
import cookie from 'react-cookies';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Btn_read extends React.Component {
    constructor(props) {
        super(props);

        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.checkUpReads = this.checkUpReads.bind(this);

        this.toggleRead = this.toggleRead.bind(this);

        this.login = this.login.bind(this);

        this.lang = lang_fr;

        if (this.props.lang === "fr-CA") {
            this.lang = lang_fr;
        }
        if (this.props.lang === "en-US") {
            this.lang = lang_en;
        }

        this.state = {
            user: null,
            lecteur: null,
            nomRoman: "",
            items: [],
            likeAutorise: true,
            loaded: false
        };
        this.itemsLu = []
        this.readStatus = false
        this.readText = this.lang.btn_read_1
        this.btn_class_read = "success"

        this.handleSubmitRead = this.handleSubmitRead.bind(this);

        if (cookie.load('lecteur') !== "null") {
            this.state.lecteur = cookie.load('lecteur')
        }
    }

    onEntering() { }

    onEntered() { }

    onExiting() { }

    onExited() { }

    toggleRead() {
        if ((this.state.lecteur) && (this.state.loaded)) {
            if (!this.readStatus) {
                this.readStatus = true;
                this.readText = this.lang.btn_read_2;
                this.btn_class_read = "danger";
            } else {
                this.readStatus = false;
                this.readText = this.lang.btn_read_1;
                this.btn_class_read = "success";

                this.itemsLu.map((item) =>
                    ((item.user === this.state.lecteur.email) && (item.chapitre === this.props.contentChapitre.titreChapitre)) ?
                        this.removeItem(item.id) : ''
                )
            }
        }
    }

    // UNSAFE_componentWillMount() {
    //     this.setState({ lecteur: cookie.load('lecteur') });
    // }

    componentDidMount() {
        if (typeof window !== "undefined") {
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

                this.itemsLu = newState

                if (!this.state.loaded) {
                    this.checkUpReads();
                    this.setState({ loaded: true });
                }
            });
        }
    }

    checkUpReads() {
        if (this.state.lecteur) {
            this.itemsLu.map((item) =>
                ((item.chapitre === this.props.contentChapitre.titreChapitre) && (item.user === this.state.lecteur.email)) ?
                    (
                        this.readStatus = true,
                        this.readText = this.lang.btn_read_2,
                        this.btn_class_read = "danger"
                    ) : ''
            )
        }
    }

    handleSubmitRead(e) {
        if (typeof window !== "undefined") {
            // Empêche le refresh
            e.preventDefault();

            // Met la référence vers la database
            const itemsRef = firebase.database().ref('reads');

            if ((!this.readStatus) && (this.state.loaded)) {
                this.state.items.map((itemLu) =>
                    ((itemLu.chapitre === this.props.contentChapitre.titreChapitre) && (itemLu.user === this.state.lecteur.email)) ?
                        this.setState({ likeAutorise: false }) : ''
                )

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
    }

    login() {
        if (typeof window !== "undefined") {
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
    }

    removeItem(itemId) {
        if (typeof window !== "undefined") {
            if (this.readText === this.lang.btn_read_2) {
                const itemRef = firebase.database().ref(`/reads/${itemId}`);
                itemRef.remove();
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitRead} className="float-left d-content">
                <Button color={this.btn_class_read}>{this.readText}</Button>

                <Collapse
                    isOpen={this.readStatus}
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