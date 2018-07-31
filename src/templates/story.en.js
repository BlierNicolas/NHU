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
import HeaderEn from '../components/enHeader'
import FooterEn from '../components/enFooter'
import firebase, { auth, provider } from '../firebase.js';
import cookie from 'react-cookies';
import EnBtn_like from '../components/enBtn_like'
import EnBtn_read from '../components/enBtn_read'
import EnBtn_like_disconnect from '../components/enBtn_like_disconnect'

class Story extends Component {
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
                <HeaderEn />

                <div>
                    <Breadcrumb className="mb-0">
                        <BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/en/stories">Our Univese stories...</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{data.contentfulRoman.titreRoman}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="equiv">
                    <Link className="text-white" to={data.contentfulRoman.equivalentUrl}><Button className="float-right" color="primary">Fr</Button></Link>
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
														<Link to={'/en/stories/chapter/' + edge.node.slug}>{edge.node.titreChapitre}</Link>
														{
															this.state.lecteur != "null" ?
																(<React.Fragment>
																	<span>
																		&nbsp;<EnBtn_read contentChapitre={edge.node} />
																	</span>
																	<span>
																		&nbsp;<EnBtn_like contentChapitre={edge.node} />
																	</span>
																</React.Fragment>) :
																(<span>
																	{/* &nbsp;<EnBtn_like_disconnect contentChapitre={edge.node} /> */}
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
														<Link to={'/en/stories/chapter/' + edge.node.slug}>{edge.node.titreChapitre}</Link>
														{
															this.state.lecteur != "null" ?
																(<React.Fragment>
																	<span>
																		&nbsp;<EnBtn_read contentChapitre={edge.node} />
																	</span>
																	<span>
																		&nbsp;<EnBtn_like contentChapitre={edge.node} />
																	</span>
																</React.Fragment>) :
																(<span>
																	{/* &nbsp;<EnBtn_like_disconnect contentChapitre={edge.node} /> */}
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

                <FooterEn />
            </div>
        )
    }
}

Story.propTypes = {
    data: PropTypes.object.isRequired
}

export default Story

export const pageQuery = graphql
    `query romanQueryEN ($slug: String!) {
  contentfulRoman(slug: {eq: $slug}, node_locale: {eq: "en-US"}) {
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
  allContentfulChapitre(sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: "en-US"}, nomRoman: {eq: $slug}}) {
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