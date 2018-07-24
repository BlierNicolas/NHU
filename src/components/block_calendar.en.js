import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
    Row,
    Col
} from 'reactstrap';

export default class Block_Calendar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.allCalendrier.edges.map(
                        (edge) =>
                            <div className="clearfix border-bottom mb-2" key={edge.node.id}>
                                {edge.node.affiche ?
                                    (<div>
                                        <div className="">
                                            <Row className="no-gutters">
                                                <Col md="9" sm="12">
                                                    <h3 className="float-left"><small>{edge.node.titre}</small></h3>
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

                                                {
                                                    edge.node.romanSlug ?
                                                        (<Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
                                                            <Link className="float-right mb-2" to={"/en" + edge.node.romanSlug}>Go see the story</Link>
                                                        </Col>) :
                                                        ('')
                                                }
                                            </Row>
                                        </div>
                                    </div>) :
                                    ('')
                                }
                            </div>
                    )
                }
            </div>
        );
    }
}