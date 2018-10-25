import React from 'react'
import Link from 'gatsby-link'
import {
    ListGroupItem,
    ListGroupItemHeading,
    Row,
    Col
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class List_Projet_Panel extends React.Component {
    constructor(props) {
        super(props);

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") {this.lang = lang_fr;}
        if (this.props.lang === "en-US") {this.lang = lang_en;}
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
                                        (
                                            <ListGroupItem className="mb-4 border-0 pt-0 pr-0 pl-0 anim-bounce-in">
                                                <ListGroupItemHeading><Link to={this.lang.list_projet_url + edge.node.slug + "/"}>{edge.node.titre}</Link></ListGroupItemHeading>
                                                <div className="list-group-item-text">
                                                    <div className="text-justify" dangerouslySetInnerHTML={{ __html: edge.node.resume.childMarkdownRemark.html }} />
                                                    <Link to={this.lang.list_projet_url + edge.node.slug + "/"}>{this.lang.nouvelle_details}</Link>
                                                </div>
                                            </ListGroupItem>
                                        ) :
                                        ('')
                                }
                            </Col>
                    )
                }
            </Row>
        );
    }
}