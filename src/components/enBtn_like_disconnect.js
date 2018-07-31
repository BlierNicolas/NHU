import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
    Button,
    Collapse
} from 'reactstrap';
import firebase, { auth, provider } from '../firebase.js';
import cookie from 'react-cookies';

export default class EnBtn_like_disconnect extends React.Component {
    constructor(props) {
        super(props);

        this.checkUpLikes = this.checkUpLikes.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            user: null,
            lecteur: null,
            nomRoman: "",
            items: [],
            nombreLike: 0,
            btn_class_like: "success",
			likeAutorise: false,
            loaded: false
        };
    }

    componentWillMount() {
        this.state.lecteur = cookie.load('lecteur');
    }

    componentDidMount() {
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

    checkUpLikes() {
        this.setState({ nombreLike: 0 });
        if (this.state.lecteur) {
            this.state.items.map((item) => {
                if (item.chapitre == this.props.contentChapitre.titreChapitre) {
                    if (item.user == this.state.lecteur.email) {
                        this.setState({ likeStatus: true });
                        this.setState({ likeText: "Je n'aime plus" });
                        this.setState({ btn_class_like: "danger" });
                    };

                    this.setState({ nombreLike: this.state.nombreLike + 1 });
                };
            })
        }
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

    render() {
        return (
            <Button color={this.state.btn_class_like} onClick={this.login}>{this.state.nombreLike + " | Login to give a like"}</Button>
        );
    }
}