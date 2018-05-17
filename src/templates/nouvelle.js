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
	Breadcrumb, 
	BreadcrumbItem
} from 'reactstrap';

// var marked = require('marked');

class Nouvelle extends Component {
	render() {
		const {
			titreNouvelle,
			description,
			date,
			slug,
			lienReference
		} = this.props.data.contentfulNouvelle
		
		return (
			<Container fluid="true"> 
				<Row>
					<Col lg={{size: 8, offset:2}}>
						<div>
							<Breadcrumb>
								<BreadcrumbItem><a href="../../../">Page d'accueil</a></BreadcrumbItem>
								<BreadcrumbItem><a href="../../../listedesnouvelles">Liste des nouvelles</a></BreadcrumbItem>
								<BreadcrumbItem active>{titreNouvelle}</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<Card>
							<CardHeader>{titreNouvelle}</CardHeader>
							<CardBody>
									<p className="text-right">{date}</p>
									<CardText>
										<div dangerouslySetInnerHTML={{__html: description.childMarkdownRemark.html}}/>
										{
											lienReference ?
											(<Link to={lienReference}>Voir les détails</Link>) :
											('')
										}
									</CardText>
							</CardBody>
						</Card>
					</Col>
				</Row>
            </Container>
		)
	}
}

Nouvelle.propTypes = { 
	data: PropTypes.object.isRequired
}

export default Nouvelle

export const pageQuery = graphql`query nouvelleQuery($slug: String!) {
	contentfulNouvelle(slug: {eq:$slug}) {
		titreNouvelle
		description {
			childMarkdownRemark {
				html
			}
		}
		date(formatString: "YYYY MMMM DD HH:MM")
		slug
		lienReference
	}
}`