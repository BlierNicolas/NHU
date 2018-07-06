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
import Header from '../components/header'
import Footer from '../components/footer'

class Nombre extends Component {
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
                <Header />

                <div>
                    <Breadcrumb className="mb-0">
                        <BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
                        <BreadcrumbItem active>L'Univers en nombre!</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {/* <div className="equiv">
                    <Button className="float-right" color="primary"><Link className="text-white" to="/en/number">En</Link></Button>
                </div> */}

                <div className="my-5">
                    <Container>
                        <h1 className="display-4">L'Univers en nombre!</h1>
                        <p className="lead">Voici une petite page informationnelle au sujet de l'Univers en lui même!</p>
                    </Container>
                </div>

                <Container className="pb-5">
                    <Row>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Nombre d'histoires: {data.allContentfulRoman.totalCount}
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
                            Nombre d'histoires en cours: {this.histoireEnCours}
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
                            Nombre d'histoires terminées: {this.histoireTerminees}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Nombre de chapitre: {data.allContentfulChapitre.totalCount}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Nombre de groupe: {data.allContentfulGroupe.totalCount}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Nombre de théories: {data.allContentfulTheorie.totalCount}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Nombre de personnages: {data.allContentfulPersonnage.totalCount}
                        </Col>
                        <Col sm="12" md="6" lg="4" className="mb-3">
                            Nombre de pouvoirs: {data.allContentfulPouvoir.totalCount}
                        </Col>
                    </Row>
                </Container>

                <Footer />
            </div>
        )
    }
}

Nombre.propTypes = {
    data: PropTypes.object.isRequired
}

export default Nombre

export const pageQuery = graphql
    `query nombreQueryFR {
    allContentfulChapitre(filter: {node_locale: {eq: "fr-CA"}}) {
        totalCount
    }
    allContentfulRoman(filter: {node_locale: {eq: "fr-CA"}}) {
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
    allContentfulGroupe(filter: {node_locale: {eq: "fr-CA"}}) {
        totalCount
    }
    allContentfulTheorie(filter: {node_locale: {eq: "fr-CA"}}) {
        totalCount
    }
    allContentfulPouvoir(filter: {node_locale: {eq: "fr-CA"}}) {
        totalCount
    }
    allContentfulPersonnage(filter: {node_locale: {eq: "fr-CA"}}) {
        totalCount
    }
}`