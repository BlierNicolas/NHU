import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    ListGroup,
    ListGroupItem,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';

class Roman extends Component {
    render() {
        const {
            data
        } = this.props;

        return (
            <div>
                <Breadcrumb className="mb-0">
                    <BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/histoires">Nos Histoires de l'Univers...</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{data.contentfulRoman.titreRoman}</BreadcrumbItem>
                </Breadcrumb>

                <div className="my-5">
                    <Container>
                        <h1 className="display-4">{data.contentfulRoman.titreRoman}</h1>
                        <p className="lead" dangerouslySetInnerHTML={{ __html: data.contentfulRoman.resume.childMarkdownRemark.html }} />
                    </Container>
                </div>

                <Container className="pb-5">
                    <ListGroup>
                        {
                            data.allContentfulChapitre.edges.map(
                                (edge) => <ListGroupItem className="border-0 pl-0 pt-0" key={edge.node.id}><Link to={'/histoires/chapitre/' + edge.node.slug}>{edge.node.titreChapitre}</Link></ListGroupItem>)
                        }
                    </ListGroup>
                </Container>
            </div>
        )
    }
}

Roman.propTypes = {
    data: PropTypes.object.isRequired
}

export default Roman

export const pageQuery = graphql
    `query romanQueryFR ($slug: String!, $romanSlug: String!) {
  contentfulRoman(slug: {eq: $slug}, node_locale: {eq: "fr-CA"}) {
    titreRoman
    resume {
      childMarkdownRemark {
        html
      }
		}
		typeHistoire
    slug
  }
  allContentfulChapitre(sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: "fr-CA"}, nomRoman: {eq: $romanSlug}}) {
    edges {
      node {
        id
        titreChapitre
        slug
      }
    }
  }
}`