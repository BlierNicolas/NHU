import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Col,
    Row,
    Container,
    ListGroup,
    ListGroupItem,
    Breadcrumb,
    BreadcrumbItem,
    Progress,
    Button
} from 'reactstrap';
import HeaderEn from '../components/enHeader'
import FooterEn from '../components/enFooter'

class Story extends Component {
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
                        <BreadcrumbItem><Link to="/en/stories">Our Univese stories...</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{data.contentfulRoman.titreRoman}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {/* <div className="equiv">
                    <Button className="float-right" color="primary"><Link className="text-white" to={data.contentfulRoman.equivalentUrl}>Fr</Link></Button>
                </div> */}

                <div className="my-5">
                    <Container>
                        <Row>
                            <Col lg="12">
                                <h1 className="display-4 mb-5">{data.contentfulRoman.titreRoman}</h1>
                            </Col>
                        </Row>

                        {data.contentfulRoman.imageCouverture ?
                            (
                                <Row>
                                    <Col lg="4">
                                        <img className="img-fluid mb-5" src={data.contentfulRoman.imageCouverture.file.url} />
                                    </Col>

                                    <Col lg="8">
                                        <div className="lead" dangerouslySetInnerHTML={{ __html: data.contentfulRoman.resume.childMarkdownRemark.html }} />

                                        <Progress animated value={(data.contentfulRoman.chapitreActuel / data.contentfulRoman.maximumChapitre) * 100}>{data.contentfulRoman.chapitreActuel + "/" + data.contentfulRoman.maximumChapitre}</Progress>

                                        <ListGroup className="pt-5">
                                            {
                                                data.allContentfulChapitre.edges.map(
                                                    (edge) => <ListGroupItem className="border-0 pl-0 pt-0" key={edge.node.id}><Link to={'/en/stories/chapter/' + edge.node.slug}>{edge.node.titreChapitre}</Link></ListGroupItem>)
                                            }
                                        </ListGroup>
                                    </Col>
                                </Row>
                            ) :
                            (
                                <Row>
                                    <Col lg="12">
                                        <div className="lead" dangerouslySetInnerHTML={{ __html: data.contentfulRoman.resume.childMarkdownRemark.html }} />

                                        <Progress animated value={(data.contentfulRoman.chapitreActuel / data.contentfulRoman.maximumChapitre) * 100}>{data.contentfulRoman.chapitreActuel + "/" + data.contentfulRoman.maximumChapitre}</Progress>

                                        <ListGroup className="pt-5">
                                            {
                                                data.allContentfulChapitre.edges.map(
                                                    (edge) => <ListGroupItem className="border-0 pl-0 pt-0" key={edge.node.id}><Link to={'/en/stories/chapter/' + edge.node.slug}>{edge.node.titreChapitre}</Link></ListGroupItem>)
                                            }
                                        </ListGroup>
                                    </Col>
                                </Row>
                            )
                        }
                        <br />
                    </Container>
                </div>

                <FooterEn />
            </div>
        )
    }
}

Story.propTypes = {
    data: PropTypes.object.isRequired
}

export default Story

export const pageQuery = graphql
    `query romanQueryEN ($slug: String!) {
  contentfulRoman(slug: {eq: $slug}, node_locale: {eq: "en-US"}) {
    titreRoman
    resume {
      childMarkdownRemark {
        html
      }
    }
    imageCouverture {
      file {
        url
      }
    }
    typeHistoire
    chapitreActuel
    maximumChapitre
    slug
    equivalentUrl
}
  allContentfulChapitre(sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: "en-US"}, nomRoman: {eq: $slug}}) {
    edges {
      node {
        id
        titreChapitre
        slug
      }
    }
  }
}`