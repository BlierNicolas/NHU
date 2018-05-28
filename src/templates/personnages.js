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
	CardDeck,
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
import classnames from 'classnames';

class ListeDesPersonnages extends Component {
    constructor(props) {
		super(props);
        this.state = { nightMode: false, status: 'inactif' };

        this.checkActif();
    }

	checkActif() {
		console.log(this.state.nightMode);
		if (this.state.nightMode) {
			document.body.classList.add('darkClass')
		} else {
			document.body.classList.remove('darkClass')
		}
		console.log("Night mode " + this.state.status);
	}

	render() {
		const {
			data
		} = this.props

		return (
			<div>
				<Breadcrumb className="mb-0">
					<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
					<BreadcrumbItem active>Nos personnages</BreadcrumbItem>
				</Breadcrumb>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Nos personnages</h1>
						<p className="lead">Voici la liste de tous les personnages présents (ou presque) dans l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						{
							data.allContentfulPersonnage.edges.map(
								(edge) =>
									<Col lg="3" md="4" sm="6" key={edge.node.id} className="text-center my-3">
										<Link to={"/personnages/" + edge.node.slug}>{edge.node.nomComplet}</Link>
									</Col>
							)
						}
					</Row>
				</Container>
			</div>
		)
	}
}

ListeDesPersonnages.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesPersonnages

export const pageQuery = graphql`query listePersonnageQueryFR {
    allContentfulPersonnage(sort: {fields: [nomComplet], order: ASC}, filter: {node_locale: {eq: "fr-CA"}}) {
        edges {
            node {
				id
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