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

class Chapter extends Component {
	render() {
		const {
			titreChapitre,
			texte,
			chapitreAvant,
			chapitreApres,
			nomRoman,
			equivalentUrl
		} = this.props.data.contentfulChapitre

		return (
			<div id="page-wrapper">
			<HeaderEn />

			<div>
				<Breadcrumb className="mb-0">
					<BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
					<BreadcrumbItem><Link to="/en/stories">Our Univese stories...</Link></BreadcrumbItem>
					<BreadcrumbItem><Link to={"/en/stories/" + nomRoman}>Story</Link></BreadcrumbItem>
					<BreadcrumbItem active>{titreChapitre}</BreadcrumbItem>
				</Breadcrumb>
				</div>

				<div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to={equivalentUrl}>Fr</Link></Button>
				</div>

				<div>
					<Container>
						<Row>
							<Col lg={{ size: 10, offset: 1 }} md="12">
								<h1 className="page-header display-4 text-center my-5">{titreChapitre}</h1>
								<div className="text-justify lecture-texte" dangerouslySetInnerHTML={{ __html: texte.childMarkdownRemark.html }} />
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
												(<Link className="btn btn-primary" to={"/en/stories/chapter/" + chapitreAvant}>Previous chapitre</Link>) :
												('')
										}
									</Col>
									<Col xs="4" className="text-center"><Link className="btn btn-primary" to={"/en/stories/" + nomRoman}>Go back to the story</Link></Col>
									<Col xs="4" className="text-right pr-0">
										{
											chapitreApres ?
												(<Link className="btn btn-primary" to={"/en/stories/chapter/" + chapitreApres}>Next chapitre</Link>) :
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
		equivalentUrl
	}
}`