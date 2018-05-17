import React from 'react'
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
    CardHeader,
	CardBody,
	CardTitle, 
	CardSubtitle,
	ListGroup, 
	ListGroupItem
} from 'reactstrap';

const IndexPage = ({data}) => (
    <Container fluid="true">
        <Row>
            <Col lg={{size: 8, offset:2}}>
                <div className="page-header text-center">
                    <h1>L'Univers des Nouveaux Humains</h1>
                    <p>L'Univers des Nouveaux Humains est un Univers fictif où 0.01% de la population mondiale possède des pouvoirs.</p>
                    <p>Les pouvoirs sont détectables via un gène qui a été nommé le gène Drumel, au nom du scientifique qui a identifié les différents cas et possibilités de ce gène.</p>
                </div>
            </Col>
        </Row>
        <hr/>
        <Row>
            {
                data.allContentfulNouvelle.edges.map(
                    (edge) => 
                        <Col lg="4" md="6" sm="12">
                            <Card>
                                <CardHeader>{edge.node.titreNouvelle}</CardHeader>
                                <CardBody>
                                    <p className="text-right">{edge.node.date}</p>
                                    <CardText>
                                        <div dangerouslySetInnerHTML={{__html: edge.node.description.childMarkdownRemark.html}}/>
                                        <Link to={'../Nouvelle/'+edge.node.slug}>Voir les détails</Link>
                                    </CardText>
                                </CardBody>
                            </Card>
                            <br />
                        </Col>
                )
            }
        </Row>
    </Container> 
)

export default IndexPage

export const pageQuery = graphql`query listeNouvelleQuery {
    allContentfulNouvelle(filter: {node_locale: {eq: "en-US"}}) {
      edges {
        node {
          titreNouvelle
          description {
            childMarkdownRemark {
              html
            }
          }
          date(formatString: "YYYY MMMM DD HH:MM")
          slug
        }
      }
    }
  }`