import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Col,
	Row,
	Container,
	ListGroup,
	ListGroupItem,
	Breadcrumb,
	BreadcrumbItem,
	Progress,
	Button
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import firebase, { auth, provider } from '../firebase.js';
import cookie from 'react-cookies';
import Btn_like from '../components/btn_like';
import Btn_read from '../components/btn_read'
import Btn_like_disconnect from '../components/btn_like_disconnect'

class Roman extends Component {
	constructor(props) {
		super(props);

		this.login = this.login.bind(this);

		this.state = {
			user: null,
			lecteur: null
		};
	}

	componentWillMount() {
		this.state.lecteur = cookie.load('lecteur');
	}

	login() {
		auth.signInWithPopup(provider)
			.then((result) => {
				const user = result.user;
				this.setState({
					user
				});
				cookie.save('lecteur', this.state.user, { path: '/' });

				window.location.reload();
			});
	}

	render() {
		const {
			data
		} = this.props;

		return (
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/histoires">Nos Histoires de l'Univers...</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulRoman.titreRoman}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={"/en" + data.contentfulRoman.equivalentUrl}><Button className="float-right" color="primary">En</Button></Link>
				</div>

				<div className="my-5">
					<Container>
						<Row>
							<Col lg="12">
								<h1 className="display-4 mb-5">{data.contentfulRoman.titreRoman}</h1>
							</Col>
						</Row>

						{data.contentfulRoman.imageCouverture ?
							(
								<Row>
									<Col lg="4">
										<img className="img-fluid mb-5" src={data.contentfulRoman.imageCouverture.file.url} />
									</Col>

									<Col lg="8">
										<div className="lead" dangerouslySetInnerHTML={{ __html: data.contentfulRoman.resume.childMarkdownRemark.html }} />

										<Progress animated value={(data.contentfulRoman.chapitreActuel / data.contentfulRoman.maximumChapitre) * 100}>{data.contentfulRoman.chapitreActuel + "/" + data.contentfulRoman.maximumChapitre}</Progress>

										<ListGroup className="pt-5">
											{
												data.allContentfulChapitre.edges.map(
													(edge) => <ListGroupItem className="border-0 pl-0 pt-0" key={edge.node.id}>
														<Link to={'/histoires/chapitre/' + edge.node.slug}>{edge.node.titreChapitre}</Link>
														{
															this.state.lecteur != "null" ?
																(<React.Fragment>
																	<span>
																		&nbsp;<Btn_read contentChapitre={edge.node} />
																	</span>
																	<span>
																		&nbsp;<Btn_like contentChapitre={edge.node} />
																	</span>
																</React.Fragment>) :
																(<span>
																	{/* &nbsp;<Btn_like_disconnect contentChapitre={edge.node} /> */}
																</span>)

														}
													</ListGroupItem>)
											}
										</ListGroup>
									</Col>
								</Row>
							) :
							(
								<Row>
									<Col lg="12">
										<div className="lead" dangerouslySetInnerHTML={{ __html: data.contentfulRoman.resume.childMarkdownRemark.html }} />

										<Progress animated value={(data.contentfulRoman.chapitreActuel / data.contentfulRoman.maximumChapitre) * 100}>{data.contentfulRoman.chapitreActuel + "/" + data.contentfulRoman.maximumChapitre}</Progress>

										<ListGroup className="pt-5">
											{
												data.allContentfulChapitre.edges.map(
													(edge) => <ListGroupItem className="border-0 pl-0 pt-0" key={edge.node.id}>
														<Link to={'/histoires/chapitre/' + edge.node.slug}>{edge.node.titreChapitre}</Link>
														{
															this.state.lecteur != "null" ?
																(<React.Fragment>
																	<span>
																		&nbsp;<Btn_read contentChapitre={edge.node} />
																	</span>
																	<span>
																		&nbsp;<Btn_like contentChapitre={edge.node} />
																	</span>
																</React.Fragment>) :
																(<span>
																	{/* &nbsp;<Btn_like_disconnect contentChapitre={edge.node} /> */}
																</span>)

														}
													</ListGroupItem>)
											}
										</ListGroup>
									</Col>
								</Row>
							)
						}
						<br />
					</Container>
				</div>

				<Footer />
			</div>
		)
	}
}

Roman.propTypes = {
	data: PropTypes.object.isRequired
}

export default Roman

export const pageQuery = graphql
	`query romanQueryFR ($slug: String!) {
  contentfulRoman(slug: {eq: $slug}, node_locale: {eq: "fr-CA"}) {
    titreRoman
    resume {
      childMarkdownRemark {
        html
      }
    }
    imageCouverture {
      file {
        url
      }
    }
    typeHistoire
    chapitreActuel
    maximumChapitre
    slug
    equivalentUrl
}
  allContentfulChapitre(sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: "fr-CA"}, nomRoman: {eq: $slug}}) {
    edges {
      node {
        id
        titreChapitre
		nomRoman
		chapitreApres
		codeChapitre
        slug
      }
    }
  }
}`