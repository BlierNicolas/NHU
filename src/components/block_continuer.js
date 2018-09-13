import React from 'react'
import Link from 'gatsby-link'
import {
    Row,
    Col
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/database';
import cookie from 'react-cookies';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Block_Continuer extends React.Component {
    constructor(props) {
        super(props);

        this.checkUpReads = this.checkUpReads.bind(this);

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
            itemsLu: [],
            loaded: false,
            dernierChapitreLu: "",
            chapitres: []
        };
    }

    UNSAFE_componentWillMount() {
        this.setState({ lecteur: cookie.load('lecteur') });
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            if (this.state.lecteur != null) {
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

                    this.setState({
                        itemsLu: myData
                    });

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

        if (this.state.lecteur) {
            this.state.itemsLu.map((item) =>
                console.log(item.codeChapitre)
            )

            this.props.allChapitre.edges.map((edge) =>
                this.state.itemsLu.map((item) =>
                    (item.traite === "non") ?
                        (
                            ((item.chapitre === edge.node.titreChapitre) && (item.user === this.state.lecteur.email)) ?
                                (
                                    (this.state.dernierChapitreLu !== item.chapitreApres) ?
                                        (
                                            this.setState({ dernierChapitreLu: item.chapitreApres }),
                                            item.traite = "oui"
                                        ) : '',
                                    (this.state.dernierChapitreLu === edge.node.slug) ?
                                        (
                                            slugChapitre = edge.node.slug,
                                            this.state.chapitres.push({ slugChapitre })
                                        ) : ''
                                ) : ''
                        ) : ''
                )
            )

            //Traitement du dernier élément lu
            this.props.allChapitre.edges.map((edge) =>
                (this.state.dernierChapitreLu === edge.node.slug) ?
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