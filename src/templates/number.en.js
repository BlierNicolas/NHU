import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Breadcrumb,
    BreadcrumbItem,
    Input,
    Button
} from 'reactstrap';
import HeaderEn from '../components/enHeader'
import FooterEn from '../components/enFooter'

class Number extends Component {
    constructor(props) {
        super(props);

        this.histoireEnCours = 0;
        this.histoireTerminees = 0;
    }

    componentWillMount() {
        this.histoireEnCours = 0;
        this.histoireTerminees = 0;
    }

    render() {
        const {
            data
        } = this.props;

        return (
            <div id="page-wrapper">
                <HeaderEn />

                <div>
                    <Breadcrumb className="mb-0">
                        <BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
                        <BreadcrumbItem active>The Universe in numbers!</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {/* <div className="equiv">
                    <Button className="float-right" color="primary"><Link className="text-white" to="/nombre">Fr</Link></Button>
                </div> */}

                <div className="my-5">
                    <Container>
                        <h1 className="display-4">The Universe in numbers!</h1>
                        <p className="lead">Here are all the novels and mini-stories that relate to the New Human Universe!</p>
                    </Container>
                </div>

                <Container className="pb-5">
                    <Row>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Number of stories: {data.allContentfulRoman.totalCount}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            {
                                <Input type="hidden" name="" hidden value={this.histoireEnCours = 0} />
                            }
                            {
                                data.allContentfulRoman.edges.map(
                                    (edge) => {
                                        edge.node.chapitreActuel < edge.node.maximumChapitre ?
                                            (
                                                this.histoireEnCours = this.histoireEnCours + 1
                                            ) :
                                            ('')
                                    }
                                )
                            }
                            Amount of stories in progress: {this.histoireEnCours}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            {
                                <Input type="hidden" name="" hidden value={this.histoireTerminees = 0} />
                            }
                            {
                                data.allContentfulRoman.edges.map(
                                    (edge) => {
                                        edge.node.chapitreActuel == edge.node.maximumChapitre ?
                                            (
                                                this.histoireTerminees = this.histoireTerminees + 1
                                            ) :
                                            ('')
                                    }
                                )
                            }
                            Amount of finished stories: {this.histoireTerminees}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Amount of chapters: {data.allContentfulChapitre.totalCount}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Amout of groups: {data.allContentfulGroupe.totalCount}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Amount of theories: {data.allContentfulTheorie.totalCount}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Amount of characters: {data.allContentfulPersonnage.totalCount}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Amount of powers: {data.allContentfulPouvoir.totalCount}
                        </Col>
                    </Row>
                </Container>

                <FooterEn />
            </div>
        )
    }
}

Number.propTypes = {
    data: PropTypes.object.isRequired
}

export default Number

export const pageQuery = graphql
    `query nombreQueryEN {
    allContentfulChapitre(filter: {node_locale: {eq: "en-US"}}) {
        totalCount
    }
    allContentfulRoman(filter: {node_locale: {eq: "en-US"}}) {
        totalCount
        edges {
            node {
                id
                typeHistoire
                chapitreActuel
                maximumChapitre
            }
        }
    }
    allContentfulGroupe(filter: {node_locale: {eq: "en-US"}}) {
        totalCount
    }
    allContentfulTheorie(filter: {node_locale: {eq: "en-US"}}) {
        totalCount
    }
    allContentfulPouvoir(filter: {node_locale: {eq: "en-US"}}) {
        totalCount
    }
    allContentfulPersonnage(filter: {node_locale: {eq: "en-US"}}) {
        totalCount
    }
}`