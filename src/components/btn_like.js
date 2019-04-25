import React from 'react'
import {
    Button,
    Collapse
} from 'reactstrap';
import firebase, { auth, provider } from 'firebase/app';
import 'firebase/database';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Btn_like extends React.Component {
    constructor(props) {
        super(props);

        this.onEntering = this.onEntering.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.checkUpLikes = this.checkUpLikes.bind(this);

        this.toggleLike = this.toggleLike.bind(this);

        this.login = this.login.bind(this);

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") { this.lang = lang_fr; }
        if (this.props.lang === "en-US") { this.lang = lang_en; }

        this.state = {
            user: null,
            lecteur: "vide",
            nomRoman: "",
            likeAutorise: true,
            loaded: false,
            update: ""
        };
        this.items = []
        this.likeStatus = false
        this.likeText = this.lang.btn_like_1
        this.btn_class_like = "secondary"
        this.nombreLike = 0

        this.handleSubmitLike = this.handleSubmitLike.bind(this);

        if (typeof window !== "undefined") {
            if (localStorage.getItem('lecteur_connect') == null) {
                localStorage.setItem('lecteur_connect', "vide");
            }

            if (localStorage.getItem('lecteur_connect') !== "vide") {
                this.state.lecteur = localStorage.getItem('lecteur_connect')
            }
        }
    }

    onEntering() { }

    onEntered() { }

    onExiting() { }

    onExited() { }

    toggleLike() {
        if ((this.state.lecteur !== "vide") && (this.state.loaded)) {
            if (!this.likeStatus) {
                this.likeStatus = true;
                this.likeText = this.lang.btn_like_2;
                this.nombreLike += 1;
                this.btn_class_like = "success";
            } else {
                this.likeStatus = false;
                this.likeText = this.lang.btn_like_1;
                this.nombreLike -= 1;
                this.btn_class_like = "secondary";

                this.items.map((item) =>
                    ((item.user === this.state.lecteur.email) && (item.chapitre === this.props.contentChapitre.titreChapitre)) ?
                        this.removeItem(item.id) : ''
                )
            }

            this.forceUpdate();
        }
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            const itemsRef = firebase.database().ref('likes');
            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    newState.push({
                        id: item,
                        chapitre: items[item].chapitre,
                        user: items[item].user
                    });
                }

                this.items = newState

                if (!this.state.loaded) {
                    this.checkUpLikes();
                    this.setState({ loaded: true });
                }
            });
        }
    }

    checkUpLikes() {
        this.nombreLike = 0;
        if (this.state.lecteur !== "vide") {
            this.items.map((item) =>
                (item.chapitre === this.props.contentChapitre.titreChapitre) ?
                    (
                        (item.user === this.state.lecteur.email) ?
                            (
                                this.likeStatus = true,
                                this.likeText = this.lang.btn_like_2,
                                this.btn_class_like = "success"
                            ) : '',

                        this.nombreLike = this.nombreLike + 1
                    ) : ''
            )
        }
    }

    handleSubmitLike(e) {
        if (typeof window !== "undefined") {
            // Empêche le refresh
            e.preventDefault();

            // Met la référence vers la database
            const itemsRef = firebase.database().ref('likes');

            if ((!this.likeStatus) && (this.state.loaded)) {
                this.items.map((item) =>
                    ((item.chapitre === this.props.contentChapitre.titreChapitre) && (item.user === this.state.lecteur.email)) ?
                        this.setState({ likeAutorise: false }) : ''
                )

                if (this.state.likeAutorise) {
                    // Popule les champs dans une collection "item"
                    const item = {
                        user: this.state.lecteur.email,
                        chapitre: this.props.contentChapitre.titreChapitre,
                        nomRoman: this.props.contentChapitre.nomRoman
                    }

                    // Pousse l'item créé dans la collection
                    itemsRef.push(item);
                }
            }

            this.toggleLike();
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

                    window.location.reload();
                });
        }
    }

    removeItem(itemId) {
        if (typeof window !== "undefined") {
            if (this.likeText === this.lang.btn_like_1) {
                const itemRef = firebase.database().ref(`/likes/${itemId}`);
                itemRef.remove();
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitLike} className="float-left d-content">
                <Button color={this.btn_class_like}>{this.nombreLike + " | " + this.likeText}</Button>

                <Collapse
                    isOpen={this.likeStatus}
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