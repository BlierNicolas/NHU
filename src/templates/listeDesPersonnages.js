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

class ListeDesPersonnages extends Component {
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
								<BreadcrumbItem active>Liste des personnages</BreadcrumbItem>
							</Breadcrumb>
						</div>
					</Col>
				</Row>
				<Row>
                    <Col lg={{size: 8, offset:2}}>
                        <Row>
                            {
                                data.allContentfulPersonnage.edges.map(
                                (edge) => 
                                <Col lg="4">
                                    <Card>
                                        <CardImg top width="100%" src={edge.node.image.file.url} />
                                        <CardBody>
                                            <CardTitle>{edge.node.nomComplet}</CardTitle>
                                            <CardSubtitle>{edge.node.alignement}</CardSubtitle>
                                            <CardText></CardText>
                                            <Button href={"../personnage/" + edge.node.slug}>Plus d'informations</Button>
                                        </CardBody>
                                    </Card>
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

ListeDesPersonnages.propTypes = { 
	data: PropTypes.object.isRequired
}

export default ListeDesPersonnages

export const pageQuery = graphql`query listePersonnageQuery {
    allContentfulPersonnage(filter: {node_locale: {eq: "en-US"}}) {
        edges {
            node {
                nomComplet
                image {
                    file {
                        url
                    }
                }
                alignement
                slug
            }
        }
    }
  }`