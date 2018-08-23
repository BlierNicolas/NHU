import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
    Row,
    Col
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Block_Pays_List extends React.Component {
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
            <Col sm="12" md="6" lg="3">
                <div className="">
                    <h3>{this.props.continent}</h3>
                </div>
                {
                    this.props.allPays.edges.map(
                        (edge) =>
                            <div className="clearfix mb-2" key={edge.node.id}>
                                {edge.node.nomContinent == this.props.continent ?
                                    (<div>
                                        <div>
                                            <Row className="no-gutters">
                                                <Col md="3" sm="12">
                                                    <Link className="mb-2" to={this.lang.monde_url + edge.node.slug + "/"}>{edge.node.nomPays}</Link>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>) :
                                    ('')
                                }
                            </div>
                    )
                }
            </Col>
        );
    }
}