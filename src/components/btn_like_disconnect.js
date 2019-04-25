import React from 'react'
import {
    Button
} from 'reactstrap';
import firebase, { auth, provider } from '../firebase.js';
import 'firebase/database';
import 'firebase/auth';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Btn_like_disconnect extends React.Component {
    constructor(props) {
        super(props);

        this.checkUpLikes = this.checkUpLikes.bind(this);
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
            likeAutorise: false,
            loaded: false
        };

        this.items = []
        this.nombreLike = 0
        this.btn_class_like = "secondary"

        if (typeof window !== "undefined") {
            if (localStorage.getItem('lecteur_connect') == null) {
                localStorage.setItem('lecteur_connect', "vide");
            }

            if (localStorage.getItem('lecteur_connect') !== "vide") {
                this.state.lecteur = localStorage.getItem('lecteur_connect')
            }
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
        this.items.map((item) =>
            (item.chapitre === this.props.contentChapitre.titreChapitre) ?
                (this.nombreLike = this.nombreLike + 1) : ''
        )
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

    render() {
        return (
            <Button color={this.btn_class_like} onClick={this.login}>{this.nombreLike + this.lang.btn_like_3}</Button>
        );
    }
}