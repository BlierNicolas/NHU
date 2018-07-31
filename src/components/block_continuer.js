import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
    Row,
    Col
} from 'reactstrap';
//import firebase from '../firebase.js';
import cookie from 'react-cookies';

export default class Block_Continuer extends React.Component {
    constructor(props) {
        super(props);

        this.checkUpReads = this.checkUpReads.bind(this);

        this.state = {
            user: null,
            lecteur: null,
            nomRoman: "",
            items: [],
            itemsLu: [],
            readStatus: false,
            readText: "Lu",
            btn_class_read: "success",
            likeAutorise: true,
            loaded: false,
            dernierChapitreLu: "",
            chapitres: []
        };
    }

    componentWillMount() {
        this.state.lecteur = cookie.load('lecteur');
    }

    componentDidMount() {
        // if (this.state.lecteur != null) {
        //     let itemsRefLu = firebase.database().ref('reads');
        //     itemsRefLu = itemsRefLu.orderByChild("codeChapitre").startAt("H0001C000").endAt("H9999C999");
        //     itemsRefLu.on('value', (snapshot) => {
        //         let itemsLu = snapshot.val();
        //         let newState = [];
        //         for (let item in itemsLu) {
        //             if (itemsLu[item].user == this.state.lecteur.email) {
        //                 newState.push({
        //                     id: item,
        //                     chapitre: itemsLu[item].chapitre,
        //                     chapitreSlug: itemsLu[item].chapitreSlug,
        //                     user: itemsLu[item].user,
        //                     nomRoman: itemsLu[item].nomRoman,
        //                     chapitreApres: itemsLu[item].chapitreApres,
        //                     codeChapitre: itemsLu[item].codeChapitre,
        //                     traite: "non"
        //                 });
        //             }
        //         }

        //         const myData = [].concat(newState).sort((a, b) => a.codeChapitre > b.codeChapitre)

        //         this.setState({
        //             itemsLu: myData
        //         });

        //         if (!this.state.loaded) {
        //             this.checkUpReads();
        //             this.setState({ loaded: true });
        //         }
        //     });
        // }
    }

    checkUpReads() {
        if (this.state.lecteur) {
            this.state.itemsLu.map((item) => {
                console.log(item.codeChapitre);
            })

            this.props.allChapitre.edges.map((edge) => {

                this.state.itemsLu.map((item) => {
                    if (item.traite == "non") {
                        if ((item.chapitre == edge.node.titreChapitre) && (item.user == this.state.lecteur.email)) {
                            if (this.state.dernierChapitreLu != item.chapitreApres) {
                                this.setState({ dernierChapitreLu: item.chapitreApres })
                                item.traite = "oui";
                            }
                        }
                        if (this.state.dernierChapitreLu == edge.node.slug) {
                            // console.log("test 2 " + this.state.dernierChapitreLu + " " + item.chapitre);
                            let slugChapitre = edge.node.slug;

                            this.state.chapitres.push({
                                slugChapitre
                            });
                        }
                    }
                })
            })

            //Traitement du dernier élément lu
            this.props.allChapitre.edges.map((edge) => {
                // console.log("test 1 " + this.state.dernierChapitreLu);
                if (this.state.dernierChapitreLu == edge.node.slug) {
                    // console.log("test 2 " + this.state.dernierChapitreLu);
                    let slugChapitre = edge.node.slug;

                    this.state.chapitres.push({
                        slugChapitre
                    });
                }
            })
        }
    }

    render() {
        return (
            <div className="ok 1">
                {
                    this.state.chapitres.length > 0 ?
                        (
                            this.props.allChapitre.edges.map((edge) =>
                                this.state.chapitres.map((item) =>
                                    (item.slugChapitre == edge.node.slug) ?
                                        (<div className="clearfix border-bottom mb-2" key={edge.node.id}>
                                            <Row className="no-gutters">
                                                <Col md="9" sm="12">
                                                    <h3><small><Link className="float-left" to={"/histoires/chapitre/" + edge.node.slug}>{edge.node.titreChapitre}</Link></small></h3>
                                                </Col>
                                            </Row>
                                        </div>) :
                                        ('')
                                )
                            )
                        ) :
                        ("Vous n'avez rien lu ou rien à continuer pour l'instant.")
                }
            </div>
        );
    }
}