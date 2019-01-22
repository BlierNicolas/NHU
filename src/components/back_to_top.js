import React from 'react'
import Link from 'gatsby-link'
import {
    Button
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';
import { URL } from 'url';

export default class Block_Calendrier extends React.Component {
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
            <Link className="text-white float-right mr-1" to={window.location.pathname + "#top"}>
                <Button className="" color="primary">{this.lang.back_to_top}</Button>
            </Link>
        );
    }
}