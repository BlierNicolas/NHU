import React, {Component} from 'react';
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
	CardHeader,
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

class ListeDesHistoires extends Component {
	render() {
		const {
			data
		} = this.props

		return (
			<Container fluid="true"> 
				<Row>
					<Col lg={{size: 8, offset:2}}>
						<div>
							<Breadcrumb>
								<BreadcrumbItem><a href="/">Page d'accueil</a></BreadcrumbItem>
								<BreadcrumbItem active>Liste des histoires</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<Card>
							<CardBody>
								<CardText>
									<h1 className="page-header text-center">Liste des histoires</h1>
									<div className="text-justify"><p>Voici tous les romans et mini-histoires qui se rapportent à l'Univers des Nouveaux Humains</p></div>
								</CardText>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<br />
				<Row>
					<Col lg={{size: 8, offset:2}}>
						<Row>
							{
								data.allContentfulRoman.edges.map(
									(edge) => 
									<Col lg="4" md="6" sm="12">
										<Card className="fff">
											<CardHeader>{edge.node.titreRoman} - {edge.node.typeHistoire}</CardHeader>
											<CardBody>
												<CardText>
													<div className="text-justify" dangerouslySetInnerHTML={{__html: edge.node.resume.childMarkdownRemark.html}}/>
													<Link to={'Roman/'+edge.node.slug}>Voir les détails</Link>
												</CardText>
											</CardBody>
										</Card>
										<br />
									</Col>
								)
							}
						</Row>
					</Col>
				</Row>
            </Container>
		)
	}
}

ListeDesHistoires.propTypes = { 
	data: PropTypes.object.isRequired
}

export default ListeDesHistoires

export const pageQuery = graphql`query listeHistoireQuery {
    allContentfulRoman(sort: {fields: [typeHistoire, titreRoman], order: DESC}, filter: {node_locale: {eq: "en-US"}}) {
      edges {
        node {
          titreRoman
		  typeHistoire
		  resume {
			childMarkdownRemark {
			  html
			}
		  }
          slug
        }
      }
    }
  }`