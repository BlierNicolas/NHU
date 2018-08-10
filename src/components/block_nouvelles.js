import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
    Row,
    Col
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Block_Nouvelles extends React.Component {
    constructor(props) {
        super(props);

        this.lang = lang_fr;

        if (this.props.lang == "fr-CA") {
            this.lang = lang_fr;
        }
        if (this.props.lang == "en-US") {
            this.lang = lang_en;
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.allNouvelles.edges.map(
                        (edge) =>
                            <div className="clearfix border-bottom mb-2 anim-bounce-in" key={edge.node.id}>
                                <div className="">
                                    <Row className="no-gutters">
                                        <Col md="9" sm="12">
                                            <Link to={this.lang.block_nouvelle_url + edge.node.slug + "/"}><h3 className="float-left"><small>{edge.node.titreNouvelle}</small></h3></Link>
                                        </Col>

                                        <Col md="3" sm="12">
                                            <span className="float-right"><small>{edge.node.dateSpe} / {edge.node.date}</small></span>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <Row className="no-gutters">
                                        <Col md="9" sm="12">
                                            <div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
                                        </Col>

                                        <Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
                                            <Link className="float-right mb-2" to={this.lang.block_nouvelle_url + edge.node.slug + "/"}>{this.lang.block_nouvelle_lien}</Link>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                    )
                }
            </div>
        );
    }
}