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

class ListeDesPouvoirs extends Component {
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
								<BreadcrumbItem><Link to="../">Page d'accueil</Link></BreadcrumbItem>
								<BreadcrumbItem active>Liste des pouvoirs</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<Card>
							<CardBody>
								<CardText>
									<h1 className="page-header text-center">Liste des pouvoirs</h1>
									<div className="text-justify"><p>Voici tous les pouvoirs qui sont présents dans l'Univers des Nouveaux Humains.</p></div>
								</CardText>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row>
                    <Col lg={{size: 8, offset:2}}>
						<Card>
							<CardBody>
								<CardText>
									<Row>
										{
											data.allContentfulPouvoir.edges.map(
											(edge) => <Col lg="4" md="6" sm="12" className="text-center"> <Link to={'../pouvoir/'+edge.node.slug}>{edge.node.nomPouvoir}</Link></Col>)
										}
									</Row>
								</CardText>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		)
	}
}

ListeDesPouvoirs.propTypes = { 
	data: PropTypes.object.isRequired
}

export default ListeDesPouvoirs

export const pageQuery = graphql`query listePouvoirQuery {
    allContentfulPouvoir(sort: {fields: [nomPouvoir], order: ASC}, filter: {node_locale: {eq: "en-US"}}) {
        edges {
            node {
                nomPouvoir
				slug
				description {
					childMarkdownRemark {
						html
					}
				}
            }
        }
    }
  }`