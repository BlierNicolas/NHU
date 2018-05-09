import React, {Component} from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

// var marked = require('marked');

class Chapitre extends Component {
	render() {
		const {
			titre,
			texte
		} = this.props.data.contentfulChapitre
		
		return (
			<div>
				<div className="row"> 
					<div className="col-lg-12">
						<h1 className="page-header text-center">{titre}</h1>
					</div>
				</div>
				<div className="row">  
					<div className="col-lg-offset-2 col-lg-8">
						<div className="panel panel-primary">
							<div className="panel-body">
								<div className="text-justify" dangerouslySetInnerHTML={{__html: texte.childMarkdownRemark.html}}/>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-offset-2 col-lg-8">
						<div className="panel panel-primary">
							<div className="panel-body">
								<div className="col-xs-4 text-center"></div>
								<div className="col-xs-4 text-center"><a className="btn btn-default" href="https://venatusuniverse.com/Romans/LePremierCyborg-Tome1">Retourner au roman</a></div>
								<div className="col-xs-4 text-center"><a className="btn btn-default" href="https://venatusuniverse.com/Romans/Chapitres/Chapitre-2-Les-modifications">Chapitre suivant</a></div>
							</div>
						</div>
					</div>
				</div>
            </div>
		)
	}
}

Chapitre.propTypes = { 
	data: PropTypes.object.isRequired
}

export default Chapitre

export const pageQuery = graphql`query chapitreQuery($slug: String!) {
	contentfulChapitre(slug: {eq:$slug}) {
		titre
		texte {
			childMarkdownRemark {
				html
			}
		}
		slug
	}
}`