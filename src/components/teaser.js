import React from 'react'
import Link from 'gatsby-link'
import {
    Row,
    Col
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Teaser extends React.Component {
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
            <div>
                <Row className="no-gutters">
                    <Col md="9" sm="12">
                        {this.props.haveHeader ?
                            (<Link to={this.props.titre_url + "/"}><h3 className="float-left"><small>{this.props.titre}</small></h3></Link>) :
                            (<h3 className="float-left"><small>{this.props.titre}</small></h3>)}
                    </Col>

                    {this.props.haveDate ?
                        (<Col md="3" sm="12">
                            <span className="float-right"><small>{this.props.dateSpe} / {this.props.date}</small></span>
                        </Col>) : ('')}

                    <Col md="9" sm="12">
                        <div dangerouslySetInnerHTML={{ __html: this.props.description.childMarkdownRemark.html }} />
                    </Col>

                    {
                        this.props.haveLink ?
                            (<Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
                                <Link className="float-right mb-2" to={this.props.link_url + "/"}>{this.props.link_label}</Link>
                            </Col>) :
                            ('')
                    }
                </Row>
            </div>
        );
    }
}