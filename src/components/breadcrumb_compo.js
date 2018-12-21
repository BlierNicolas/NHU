import React from 'react'
import Link from 'gatsby-link'
import {
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Breadcrumb_Compo extends React.Component {
    constructor(props) {
        super(props);

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") { this.lang = lang_fr; }
        if (this.props.lang === "en-US") { this.lang = lang_en; }
    }

    render() {
        return (
            <Breadcrumb className="mb-0">
                <BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
                {this.props.number >= 3 ? (<BreadcrumbItem><Link to={this.props.un_url + "/"}>{this.props.un}</Link></BreadcrumbItem>) : ('')}
                {this.props.number >= 4 ? (<BreadcrumbItem><Link to={this.props.deux_url + "/"}>{this.props.deux}</Link></BreadcrumbItem>) : ('')}
                <BreadcrumbItem active>{this.props.active}</BreadcrumbItem>
            </Breadcrumb>
        );
    }
}