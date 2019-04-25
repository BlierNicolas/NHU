import React from 'react'
import Link from 'gatsby-link'
import {
    Row,
    Col
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/database';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Block_Continuer extends React.Component {
    constructor(props) {
        super(props);

        this.checkUpReads = this.checkUpReads.bind(this);

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") { this.lang = lang_fr; }
        if (this.props.lang === "en-US") { this.lang = lang_en; }

        this.state = {
            user: null,
            lecteur: "vide",
            nomRoman: "",
            items: [],
            itemsLu: [],
            loaded: false,
            chapitres: []
        };

        this.dernierChapitreLu = ""

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
            if (this.state.lecteur !== "vide") {
                let itemsRefLu = firebase.database().ref('reads');
                itemsRefLu = itemsRefLu.orderByChild("codeChapitre").startAt("H0001C000").endAt("H9999C999");
                itemsRefLu.on('value', (snapshot) => {
                    let itemsLu = snapshot.val();
                    let newState = [];
                    for (let item in itemsLu) {
                        if (itemsLu[item].user === this.state.lecteur.email) {
                            newState.push({
                                id: item,
                                chapitre: itemsLu[item].chapitre,
                                chapitreSlug: itemsLu[item].chapitreSlug,
                                user: itemsLu[item].user,
                                nomRoman: itemsLu[item].nomRoman,
                                chapitreApres: itemsLu[item].chapitreApres,
                                codeChapitre: itemsLu[item].codeChapitre,
                                traite: "non"
                            });
                        }
                    }

                    const myData = [].concat(newState).sort((a, b) => a.codeChapitre > b.codeChapitre)

                    myData.map(
                        (item) => this.state.itemsLu.push(item)
                    )

                    if (!this.state.loaded) {
                        this.checkUpReads();
                        this.setState({ loaded: true });
                    }
                });
            }
        }
    }

    checkUpReads() {
        let slugChapitre = "";

        if (this.state.lecteur !== "vide") {
            this.props.allChapitre.edges.map((edge) =>
                this.state.itemsLu.map((item) =>
                    (item.traite === "non") ?
                        (
                            ((item.chapitre === edge.node.titreChapitre) && (item.user === this.state.lecteur.email)) ?
                                (
                                    (this.dernierChapitreLu === "") ?
                                        (
                                            this.dernierChapitreLu = item.chapitreApres
                                        ) : (
                                            ((this.dernierChapitreLu === edge.node.slug) && (edge.node.chapitreApres === item.chapitreApres)) ?
                                                (
                                                    this.dernierChapitreLu = item.chapitreApres,
                                                    item.traite = "oui"
                                                ) : (
                                                    slugChapitre = this.dernierChapitreLu,
                                                    this.state.chapitres.push({ slugChapitre }),
                                                    this.dernierChapitreLu = item.chapitreApres
                                                )
                                        )
                                ) : ''
                        ) : ''
                )
            )

            //Traitement du dernier élément lu
            this.props.allChapitre.edges.map((edge) =>
                (this.dernierChapitreLu === edge.node.slug) ?
                    (
                        slugChapitre = edge.node.slug,
                        this.state.chapitres.push({ slugChapitre })
                    ) : ''
            )
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
                                    (item.slugChapitre === edge.node.slug) ?
                                        (<div className="clearfix border-bottom mb-2" key={edge.node.id}>
                                            <Row className="no-gutters">
                                                <Col md="9" sm="12">
                                                    <h3><small><Link className="float-left" to={this.lang.chapitre_btn_url + edge.node.slug + "/"}>{edge.node.titreChapitre}</Link></small></h3>
                                                </Col>
                                            </Row>
                                        </div>) :
                                        ('')
                                )
                            )
                        ) :
                        (this.lang.continuer_rien)
                }
            </div>
        );
    }
}