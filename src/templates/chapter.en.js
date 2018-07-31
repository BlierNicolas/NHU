import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	Col,
	Breadcrumb,
	BreadcrumbItem,
	Button
} from 'reactstrap';
import HeaderEn from '../components/enHeader'
import FooterEn from '../components/enFooter'
import EnBtn_like from '../components/enBtn_like'
import EnBtn_read from '../components/enBtn_read'
import EnBtn_like_disconnect from '../components/enBtn_like_disconnect'
import { auth, provider } from '../firebase.js';
import cookie from 'react-cookies';

class Chapter extends Component {
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
		} = this.props

		return (
			<div id="page-wrapper">
				<HeaderEn />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/en/stories">Our Univese stories...</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to={"/en/stories/" + data.contentfulChapitre.nomRoman}>Story</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulChapitre.titreChapitre}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={data.contentfulChapitre.equivalentUrl}><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<div>
					<Container>
						<Row>
							<Col lg={{ size: 10, offset: 1 }} md="12">
								<h1 className="page-header display-4 text-center my-5">{data.contentfulChapitre.titreChapitre}</h1>
								<div className="text-justify lecture-texte" dangerouslySetInnerHTML={{ __html: data.contentfulChapitre.texte.childMarkdownRemark.html }} />
							</Col>
						</Row>
					</Container>
				</div>

				<div className="py-5">
					<Container>
						<Row>
							<Col lg={{ size: 10, offset: 1 }} md="12">
								{
									this.state.lecteur != "null" ?
										(<Row>
											<Col xs="6" className="text-center">
												<EnBtn_read contentChapitre={data.contentfulChapitre} />
											</Col>
											<Col xs="6" className="text-center">
												<EnBtn_like contentChapitre={data.contentfulChapitre} />
											</Col>
										</Row>) :
										(<Row>
											<Col xs="12" className="text-center">
												{/* <EnBtn_like_disconnect contentChapitre={data.contentfulChapitre} /> */}
											</Col>
										</Row>)

								}
							</Col>
						</Row>
					</Container>
					{/* <section className='display-item'>
						<div className="wrapper">
							<ul>
								{this.state.items.map((item) => {
									if (item.user == this.state.lecteur.email) {
										return (
											<li key={item.id}>
												<p>{item.chapitre} liked by: {item.user}</p>
											</li>
										)
									};
								})}
							</ul>
						</div>
					</section> */}
				</div>

				<div className="py-5">
					<Container>
						<Row>
							<Col lg={{ size: 10, offset: 1 }} md="12">
								<Row>
									<Col xs="4" className="text-left pl-0">
										{
											data.contentfulChapitre.chapitreAvant ?
												(<Link className="btn btn-primary" to={"/en/stories/chapter/" + chapitreAvant}>Previous chapter</Link>) :
												('')
										}
									</Col>
									<Col xs="4" className="text-center"><Link className="btn btn-primary" to={"/en/stories/" + data.contentfulChapitre.nomRoman}>Go back to the story</Link></Col>
									<Col xs="4" className="text-right pr-0">
										{
											data.contentfulChapitre.chapitreApres ?
												(<Link className="btn btn-primary" to={"/en/stories/chapter/" + chapitreApres}>Next chapter</Link>) :
												('')
										}
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
				</div>

				<FooterEn />
			</div>
		)
	}
}

Chapter.propTypes = {
	data: PropTypes.object.isRequired
}

export default Chapter

export const pageQuery = graphql`query chapitreQueryEN ($slug: String!) {
	contentfulChapitre(slug: {eq:$slug}, node_locale: {eq: "en-US"}) {
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
		codeChapitre
		equivalentUrl
	}
}`