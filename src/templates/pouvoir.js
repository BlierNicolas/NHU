import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
	Breadcrumb, 
	BreadcrumbItem
} from 'reactstrap';

// var marked = require('marked');

class Pouvoir extends Component {
	render() {
		const {
			nomPouvoir,
			description
		} = this.props.data.contentfulPouvoir
		
		return (
			<Container fluid="true"> 
				<Row>
					<Col lg={{size: 8, offset:2}}>
						<div>
							<Breadcrumb>
								<BreadcrumbItem><a href="../../">Page d'accueil</a></BreadcrumbItem>
								<BreadcrumbItem><a href="../../ListeDesPouvoirs">Liste des pouvoirs</a></BreadcrumbItem>
								<BreadcrumbItem active>{nomPouvoir}</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<Card>
							<CardBody>
								<CardText>
									<h1 className="page-header text-center">{nomPouvoir}</h1>
									<div className="text-justify" dangerouslySetInnerHTML={{__html: description.childMarkdownRemark.html}}/>
								</CardText>
							</CardBody>
						</Card>
					</Col>
				</Row>
            </Container>
		)
	}
}

Pouvoir.propTypes = { 
	data: PropTypes.object.isRequired
}

export default Pouvoir

export const pageQuery = graphql`query pouvoirQuery($slug: String!) {
	contentfulPouvoir(slug: {eq:$slug}) {
		nomPouvoir
		description {
			childMarkdownRemark {
				html
			}
		}
	}
}`