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
    Button
} from 'reactstrap';
import HeaderEn from '../components/enHeader'
import FooterEn from '../components/enFooter'

class Character extends Component {
    render() {
        const {
            data
        } = this.props

        return (
            <div id="page-wrapper">
                <HeaderEn />

                <div>
                    <Breadcrumb className="mb-0">
                        <BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/personnages">Our characters</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{data.contentfulPersonnage.nomComplet}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="equiv">
                    <Button className="float-right" color="primary"><Link className="text-white" to={data.contentfulPersonnage.equivalentUrl}>Fr</Link></Button>
                </div>

                <Container fluid>
                    <Row className="pb-5">
                        <Col lg={{ size: 8, offset: 2 }} md="12">
                            <div className="mt-5 mb-3">
                                <div>
                                    <h1 className="display-4">{data.contentfulPersonnage.nomComplet}</h1>
                                    <div>
                                        {
                                            data.contentfulPersonnage.pouvoirNom ?
                                                (<div>
                                                    Power: {data.contentfulPersonnage.pouvoirNom}<br />
                                                </div>) :
                                                ('')
                                        }
                                        Alignment: {data.contentfulPersonnage.alignement}<br />
                                        Birth date: {data.contentfulPersonnage.dateNaissance}<br />
                                        Age: {data.contentfulPersonnage.age}
                                    </div>
                                </div>
                            </div>
                            {
                                data.contentfulPersonnage.descriptionSommaire ?
                                    (<div className="my-3">
                                        <div>
                                            <h3>Brief description</h3>
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.descriptionSommaire.childMarkdownRemark.html }} />
                                            </div>
                                        </div>
                                    </div>) :
                                    ('')
                            }
                            {
                                data.contentfulPersonnage.descriptionPouvoir ?
                                    (<div className="my-3">
                                        <div>
                                            <h3>Power description</h3>
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.descriptionPouvoir.childMarkdownRemark.html }} />
                                            </div>
                                        </div>
                                    </div>) :
                                    ('')
                            }
                            {
                                data.contentfulPersonnage.descriptionPhysique ?
                                    (<div className="my-3">
                                        <div>
                                            <h3>Physical description</h3>
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.descriptionPhysique.childMarkdownRemark.html }} />
                                            </div>
                                        </div>
                                    </div>) :
                                    ('')
                            }
                            {
                                data.contentfulPersonnage.relation ?
                                    (<div className="my-3">
                                        <div>
                                            <h3>Relations</h3>
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.relation.childMarkdownRemark.html }} />
                                            </div>
                                        </div>
                                    </div>) :
                                    ('')
                            }
                            {
                                data.contentfulPersonnage.apparition ?
                                    (<div className="my-3">
                                        <div>
                                            <h3>Appearances</h3>
                                            <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.apparition.childMarkdownRemark.html }} />
                                        </div>
                                    </div>) :
                                    ('')
                            }
                        </Col>
                    </Row>
                </Container>

                <FooterEn />
            </div>
        )
    }
}

Character.propTypes = {
    data: PropTypes.object.isRequired
}

export default Character

export const pageQuery = graphql`query personnageQueryEN ($slug: String!) {
    contentfulPersonnage(slug: {eq: $slug}, node_locale: {eq: "en-US"}) {
      nomComplet
      dateNaissance
      age
      pouvoirNom
      alignement
      descriptionSommaire {
        childMarkdownRemark {
          html
        }
      }
      descriptionPouvoir {
        childMarkdownRemark {
          html
        }
      }
      descriptionPhysique {
        childMarkdownRemark {
          html
        }
      }
      relation {
        childMarkdownRemark {
          html
        }
      }
      apparition {
        childMarkdownRemark {
          html
        }
      }
      typeGene
      slug
      equivalentUrl
    }
  }`