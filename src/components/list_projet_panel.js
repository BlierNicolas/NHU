import React from 'react'
import {
    Row,
    Col
} from 'reactstrap';
import Teaser from '../components/teaser';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class List_Projet_Panel extends React.Component {
    constructor(props) {
        super(props);

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") { this.lang = lang_fr; }
        if (this.props.lang === "en-US") { this.lang = lang_en; }
    }

    render() {
        return (
            <Row>
                {
                    this.props.allProjets.edges.map(
                        (edge) =>
                            <Col sm="12" md="6" lg="4" key={edge.node.id}>
                                {
                                    edge.node.afficher ?
                                        (<Teaser haveHeader={true} titre_url={this.lang.list_projet_url + edge.node.slug} titre={edge.node.titre} haveDate={false} description={edge.node.resume} haveLink={true} link_url={this.lang.list_projet_url + edge.node.slug} link_label={this.lang.nouvelle_details} />) :
                                        ('')
                                }
                            </Col>
                    )
                }
            </Row>
        );
    }
}