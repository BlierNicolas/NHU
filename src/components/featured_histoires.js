import React from 'react'
import Link from 'gatsby-link'
import {
    Row,
    Col
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Featured_Histoires extends React.Component {
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
                    this.props.allHistoires.edges.map(
                        (edge) =>
                            <Col key={edge.node.id} lg="4" md="6" className="p-0 clearfix border-bottom mb-2 anim-bounce-in">
                                {
                                    <div>
                                        <h3><small><Link to={this.lang.list_histoires_url + edge.node.slug + "/"}>{edge.node.titreRoman}</Link></small></h3>
                                        <div className="list-group-item-text">
                                            <div className="mr-4" dangerouslySetInnerHTML={{ __html: edge.node.resume.childMarkdownRemark.html }} />
                                            <Link to={this.lang.list_histoires_url + edge.node.slug + "/"}>{this.lang.list_histoires_text}</Link>
                                        </div>
                                    </div>
                                }
                            </Col>
                    )
                }
            </Row>
        );
    }
}