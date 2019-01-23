import React from 'react'
import Link from 'gatsby-link'
import {
    Button
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Back_To_Top extends React.Component {
    constructor(props) {
        super(props);

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") { this.lang = lang_fr; }
        if (this.props.lang === "en-US") { this.lang = lang_en; }

        // this.pat = "";
        // if (typeof window !== "undefined") {
        //     this.pat = window.location.pathname;
        // }
    }

    render() {
        return (
            <div>
                {/* <Link className="text-white float-right mr-1" to={this.pat + "#top"}>
                <Button className="" color="primary">{this.lang.back_to_top}</Button>
                </Link> */}
            </div>
        );
    }
}