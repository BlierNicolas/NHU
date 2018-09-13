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
            nombreLike: 0,
            likeStatus: false,
            likeText: this.lang.btn_like_1,
            btn_class_like: "success",
            likeAutorise: true,
            loaded: false
        };
        this.handleSubmitLike = this.handleSubmitLike.bind(this);
    }

    onEntering() { }

    onEntered() { }

    onExiting() { }

    onExited() { }

    toggleLike() {
        if ((this.state.lecteur) && (this.state.loaded)) {
            if (!this.state.likeStatus) {
                this.setState({ likeStatus: true });
                this.setState({ likeText: this.lang.btn_like_2 });
                this.setState({ nombreLike: this.state.nombreLike + 1 });
                this.setState({ btn_class_like: "danger" });
            } else {
                this.setState({ likeStatus: false });
                this.setState({ likeText: this.lang.btn_like_1 });
                this.setState({ nombreLike: this.state.nombreLike - 1 });
                this.setState({ btn_class_like: "success" });

                this.state.items.map((item) =>
                    ((item.user === this.state.lecteur.email) && (item.chapitre === this.props.contentChapitre.titreChapitre)) ?
                        this.removeItem(item.id) : ''
                )
            }
        }
    }

    UNSAFE_componentWillMount() {
        this.setState({ lecteur: cookie.load('lecteur') });
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
                this.setState({
                    items: newState
                });

                if (!this.state.loaded) {
                    this.checkUpLikes();
                    this.setState({ loaded: true });
                }
            });
        }
    }

    checkUpLikes() {
        this.setState({ nombreLike: 0 });
        if (this.state.lecteur) {
            this.state.items.map((item) =>
                (item.chapitre === this.props.contentChapitre.titreChapitre) ?
                    (
                        (item.user === this.state.lecteur.email) ?
                            (
                                this.setState({ likeStatus: true }),
                                this.setState({ likeText: this.lang.btn_like_2 }),
                                this.setState({ btn_class_like: "danger" })
                            ) : '',

                        this.setState({ nombreLike: this.state.nombreLike + 1 })
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

            if ((!this.state.likeStatus) && (this.state.loaded)) {
                this.state.items.map((item) =>
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
                    cookie.save('lecteur', this.state.user, { path: '/' });

                    window.location.reload();
                });
        }
    }

    removeItem(itemId) {
        if (typeof window !== "undefined") {
            if (this.state.likeText === this.lang.btn_like_2) {
                const itemRef = firebase.database().ref(`/likes/${itemId}`);
                itemRef.remove();
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitLike} className="float-left d-content">
                <Button color={this.state.btn_class_like}>{this.state.nombreLike + " | " + this.state.likeText}</Button>

                <Collapse
                    isOpen={this.state.likeStatus}
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