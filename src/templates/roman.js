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

class Roman extends Component {
	render() {
		const {
			data
		} = this.props;
		
		return (
			<Container fluid="true">
				<Row>
					<Col lg={{size: 8, offset:2}}>
						<div>
							<Breadcrumb>
								<BreadcrumbItem><a href="../../">Page d'accueil</a></BreadcrumbItem>
								<BreadcrumbItem><a href="../../ListeDesHistoires">Liste des histoires</a></BreadcrumbItem>
								<BreadcrumbItem active>{data.contentfulRoman.titreRoman}</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<Card>
							<CardBody>
								<CardText>
									<h1 className="page-header text-center">{data.contentfulRoman.titreRoman}</h1>
									<div className="text-justify" dangerouslySetInnerHTML={{__html: data.contentfulRoman.resume.childMarkdownRemark.html}}/>
									<p>Type d'histoire: {data.contentfulRoman.typeHistoire}</p>
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
									<ListGroup>
										{
											data.allContentfulChapitre.edges.map(
											(edge) => <ListGroupItem className="text-center"> <Link to={'../Chapitre/'+edge.node.slug}>{edge.node.titreChapitre}</Link>  </ListGroupItem>)
										}
									</ListGroup>
								</CardText>
							</CardBody>
						</Card>
					</Col>
				</Row>
      </Container> 
		)
	}
}

Roman.propTypes = { 
	data: PropTypes.object.isRequired
}

export default Roman

export const pageQuery = graphql
`query romanQuery($slug: String!, $romanSlug: String!) {
  contentfulRoman(slug: {eq: $slug}) {
    titreRoman
    resume {
      childMarkdownRemark {
        html
      }
		}
		typeHistoire
    slug
  }
  allContentfulChapitre(sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: "en-US"}, nomRoman: {eq: $romanSlug}}) {
    edges {
      node {
        id
        titreChapitre
        slug
      }
    }
  }
}`