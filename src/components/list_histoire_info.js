import React from 'react'
import Link from 'gatsby-link'
import {
    ListGroupItem,
    ListGroupItemHeading
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class List_Histoire_Info extends React.Component {
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
            <div>
                {
                    this.props.allHistoires.edges.map(
                        (edge) =>
                            <div key={edge.node.id}>
                                {
                                    edge.node.typeHistoire === this.props.typeHistoire ?
                                        (
                                            <ListGroupItem className="mb-4 border-top-0 border-right-0 border-left-0 pt-0 pr-0 pl-0 anim-bounce-in">
                                                <ListGroupItemHeading><Link to={this.lang.list_histoires_url + edge.node.slug + "/"}>{edge.node.titreRoman}</Link></ListGroupItemHeading>
                                                <div className="list-group-item-text">
                                                    <div className="text-justify" dangerouslySetInnerHTML={{ __html: edge.node.resume.childMarkdownRemark.html }} />
                                                    <Link to={this.lang.list_histoires_url + edge.node.slug + "/"}>{this.lang.list_histoires_text}</Link>
                                                </div>
                                            </ListGroupItem>
                                        ) :
                                        ('')
                                }
                            </div>
                    )
                }
            </div>
        );
    }
}