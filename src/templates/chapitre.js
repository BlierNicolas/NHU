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
	Breadcrumb,
	BreadcrumbItem
} from 'reactstrap';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';

class Chapitre extends Component {
	constructor(props) {
		super(props);
		this.onEntering = this.onEntering.bind(this);
		this.onEntered = this.onEntered.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
		this.toggle = this.toggle.bind(this);
		this.state = { nightMode: false, status: 'inactif' };
	}

	onEntering() {
		this.setState({ status: 'desactivation...' });
	}

	onEntered() {
		this.setState({ status: 'inactif' });
	}

	onExiting() {
		this.setState({ status: 'activation...' });
	}

	onExited() {
		this.setState({ status: 'actif' });
	}

	componentDidMount() {
		this.setState({ nightMode: !this.state.nightMode });
	}

	toggle() {
		this.setState({ nightMode: !this.state.nightMode });

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
			titreChapitre,
			texte,
			chapitreAvant,
			chapitreApres,
			nomRoman
		} = this.props.data.contentfulChapitre

		return (
			<div>
				<Breadcrumb className="mb-0">
					<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
					<BreadcrumbItem><Link to="/histoires">Nos Histoires de l'Univers...</Link></BreadcrumbItem>
					<BreadcrumbItem><Link to={nomRoman}>Roman</Link></BreadcrumbItem>
					<BreadcrumbItem active>{titreChapitre}</BreadcrumbItem>
				</Breadcrumb>

				<div>
					<Container>
						<Row>
							<Col lg={{ size: 10, offset: 1 }} md="12">
								<h1 className="page-header display-4 text-center my-5">{titreChapitre}</h1>
								<div className="text-justify lecture-texte" dangerouslySetInnerHTML={{ __html: texte.childMarkdownRemark.html }} />
							</Col>
							<Col lg="1">
								<Button color="primary my-5" onClick={this.toggle} style={{ marginBottom: '1rem' }}>
									<FontAwesome
										name='moon'
										className='mr-2'
										style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
									/>
									Mode nuit {this.state.status}
								</Button>

								<Collapse
									isOpen={this.state.nightMode}
									onEntering={this.onEntering}
									onEntered={this.onEntered}
									onExiting={this.onExiting}
									onExited={this.onExited}
								>
								</Collapse>
							</Col>
						</Row>
					</Container>
				</div>

				<div className="py-5">
					<Container>
						<Row>
							<Col lg={{ size: 10, offset: 1 }} md="12">
								<Row>
									<Col xs="4" className="text-left pl-0">
										{
											chapitreAvant ?
												(<Link className="btn btn-primary" to={chapitreAvant}>Chapitre précédent</Link>) :
												('')
										}
									</Col>
									<Col xs="4" className="text-center"><Link className="btn btn-primary" to={nomRoman}>Retourner au roman</Link></Col>
									<Col xs="4" className="text-right pr-0">
										{
											chapitreApres ?
												(<Link className="btn btn-primary" to={chapitreApres}>Chapitre suivant</Link>) :
												('')
										}
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		)
	}
}

Chapitre.propTypes = {
	data: PropTypes.object.isRequired
}

export default Chapitre

export const pageQuery = graphql`query chapitreQueryFR ($slug: String!) {
	contentfulChapitre(slug: {eq:$slug}, node_locale: {eq: "fr-CA"}) {
		titreChapitre
		texte {
			childMarkdownRemark {
				html
			}
		}
        chapitreAvant
        chapitreApres
        nomRoman
		slug
	}
}`