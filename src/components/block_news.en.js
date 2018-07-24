import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
    Row,
    Col
} from 'reactstrap';

export default class Block_News extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.allNouvelles.edges.map(
                        (edge) =>
                            <div className="clearfix border-bottom mb-2" key={edge.node.id}>
                                <div className="">
                                    <Row className="no-gutters">
                                        <Col md="9" sm="12">
                                            <Link to={'en/news/' + edge.node.slug}><h3 className="float-left"><small>{edge.node.titreNouvelle}</small></h3></Link>
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
                                            <Link className="float-right mb-2" to={'en/news/' + edge.node.slug}>See more</Link>
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