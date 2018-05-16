import React from 'react'
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

const IndexPage = () => (
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
      <Col lg="4" md="6" sm="12">
          <Card>
              <CardHeader>
                  <h3 className="text-center">Titre de la nouvelle</h3>
              </CardHeader>
              <CardBody>
                  <CardText>
                      <p className="text-right">Date</p>
                      <p>Voici le nouveau chapitre de l'histoire de Sam Mithus. Bonne lecture!</p>
                      <a className="text-right" href="#">
                          <p>Voir les détails</p>
                      </a>
                  </CardText>
              </CardBody>
          </Card>
      </Col>
      <Col lg="4" md="6" sm="12">
          <Card>
              <CardHeader>
                  <h3 className="text-center">Titre de la nouvelle</h3>
              </CardHeader>
              <CardBody>
                  <CardText>
                      <p className="text-right">Date</p>
                      <p>Voici le Texte de la nouvelle</p>
                      <a className="text-right" href="#">
                          <p>Voir les détails</p>
                      </a>
                  </CardText>
              </CardBody>
          </Card>
      </Col>
    </Row>
  </Container> 
)

export default IndexPage
