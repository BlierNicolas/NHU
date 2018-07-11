import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';
import HeaderEn from '../components/enHeader'
import FooterEn from '../components/enFooter'

class IndexPageEn extends Component {
    render() {
        const {
            data
        } = this.props

        return (
            <div>
                <HeaderEn />

                <div className="equiv">
                    <Button className="float-right" color="primary"><Link className="text-white" to="/">Fr</Link></Button>
                </div>

                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">New Humans Universe</h1>
                        <p className="lead">New Human Universe is a fictive universe where 0.01% of the population have a power.</p>
                        <p className="lead">The powers are detectable via a gene that has been named the Drumel gene, on behalf of the scientist who identified the different cases and possibilities of this gene.</p>
                        <Link className="btn btn-primary" to="/en/stories">Enter in the Universe</Link>
                    </Container>
                </Jumbotron>

                <Container fluid className="p-0">
                    <Row className="pb-5">
                        <Col sm="12" lg="9" >
                            <h2 className="mb-4">Recents news</h2>
                            {
                                data.allContentfulNouvelle.edges.map(
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
                        </Col>
                        <Col sm="12" lg="3" ><h2 className="mb-4">Upcoming releases</h2>
                            {
                                data.allContentfulCalendrier.edges.map(
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

                                                            <Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
                                                                {
                                                                    edge.node.romanSlug ?
                                                                        (<Link className="float-right mb-2" to={"/en" + edge.node.romanSlug}>Go see the story</Link>) :
                                                                        ('')
                                                                }
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
                    </Row>
                    <Row className="pb-5">
                        <Col>
                            <h2 className="mb-4">Creation of the Universe</h2>
                            <p>I started creating the Universe around January 2015, the first story I wrote was <a href="/en/stories/the-first-cyborg-volume-1">The First Cyborg</a>, after the first volume, I started writing a sequel.</p>
                            <p>Soon, the Universe expanded, leading to the creation of several characters, powers and groups. The concepts were detailed as time went on.</p>
                            <p>Eventually, all the characters will have their stories to tell and the Universe will continue to grow again and again.</p>
                        </Col>
                    </Row>
                </Container>

                <FooterEn />
            </div>
        )
    }
}

IndexPageEn.propTypes = {
    data: PropTypes.object.isRequired
}

export default IndexPageEn

export const pageQuery = graphql`query listeNouvelleQueryEN {
    allContentfulNouvelle (limit: 9, sort: {fields: [date], order: DESC}, filter: {node_locale: {eq: "en-US"}}) {
      edges {
        node {
          id
          titreNouvelle
          description {
            childMarkdownRemark {
              html
            }
          }
          date(formatString: "YYYY-MM-DD")
          dateSpe
          slug
        }
      }
    }
    allContentfulCalendrier (limit: 6, sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: "en-US"}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY-MM-DD")
                dateSpe
                romanSlug
                affiche
			}
		}
	}
  }`