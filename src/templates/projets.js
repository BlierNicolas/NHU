import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	ListGroup,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import classnames from 'classnames';
import ListProjetInfo from '../components/list_projet_info';
import BlockIntro from '../components/block_intro';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class ListeDesProjets extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1',
		};

		this.lang = lang_fr;

		if (this.props.pageContext.lang === "fr-CA") {
			this.lang = lang_fr;
		}
		if (this.props.pageContext.lang === "en-US") {
			this.lang = lang_en;
		}
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	render() {
		const {
			data
		} = this.props

		return (
			<Layout>
				<div id="page-wrapper">
					<Header lang={this.props.pageContext.lang} />

					<div>
						<Breadcrumb className="mb-0">
							<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
							<BreadcrumbItem active>{this.lang.header_projets}</BreadcrumbItem>
						</Breadcrumb>
					</div>

					<div className="equiv">
						<Link className="text-white" to={this.lang.equi_projets + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
					</div>

					<BlockIntro full={false} titre={this.lang.header_projets} first={this.lang.header_projets} />

					<Container className="py-5">
						<Nav pills>
							<NavItem className="cursor-update">
								<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
									{this.lang.projet_histoires_text}
								</NavLink>
							</NavItem>
							<NavItem className="cursor-update">
								<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
									{this.lang.projet_wiki_text}
								</NavLink>
							</NavItem>
							<NavItem className="cursor-update">
								<NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
									{this.lang.projet_site_text}
								</NavLink>
							</NavItem>
						</Nav>
						<br />
						<TabContent activeTab={this.state.activeTab}>
							<TabPane tabId="1">
								<ListGroup>
									<ListProjetInfo allProjets={data.allContentfulProject} typeProjet="Histoires" lang={this.props.pageContext.lang} />
								</ListGroup>
							</TabPane>
							<TabPane tabId="2">
								<ListGroup>
									<ListProjetInfo allProjets={data.allContentfulProject} typeProjet="Wiki" lang={this.props.pageContext.lang} />
								</ListGroup>
							</TabPane>
							<TabPane tabId="3">
								<ListGroup>
									<ListProjetInfo allProjets={data.allContentfulProject} typeProjet="Site web" lang={this.props.pageContext.lang} />
								</ListGroup>
							</TabPane>
						</TabContent>
					</Container>

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
		)
	}
}

ListeDesProjets.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesProjets

export const pageQuery = graphql`query listeProjetQueryFR2 ($lang: String!) {
	allContentfulProject (sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: $lang}}) {
		edges {
			node {
				id
				titre
				resume {
					childMarkdownRemark {
						html
					}
				}
				slug
				terminer
				ordre
				equivalentUrl
				typeProjet
			}
		}
	}
  }`