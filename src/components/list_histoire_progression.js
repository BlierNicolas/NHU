import React from 'react'
import Link from 'gatsby-link'
import {
    ListGroupItem,
    ListGroupItemHeading,
    Progress
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class List_Histoire_Progression extends React.Component {
    constructor(props) {
        super(props);

        this.lang = lang_fr;

        if (this.props.lang === "fr-CA") {
            this.lang = lang_fr;
        }
        if (this.props.lang === "en-US") {
            this.lang = lang_en;
        }
    }

    render() {
        return (
            <ListGroupItem className="mb-4 border-top-0 border-right-0 border-left-0 pt-0 pr-0 pl-0 anim-bounce-in">
                <ListGroupItemHeading><Link to={this.lang.list_histoires_url + this.props.histoire_progression.slug + "/"}>{this.props.histoire_progression.titreRoman}</Link></ListGroupItemHeading>
                <div className="list-group-item-text">
                    <Progress animated value={(this.props.histoire_progression.chapitreActuel / this.props.histoire_progression.maximumChapitre) * 100}>{this.props.histoire_progression.chapitreActuel + "/" + this.props.histoire_progression.maximumChapitre}</Progress>
                    <Link to={this.lang.list_histoires_url + this.props.histoire_progression.slug + "/"}>{this.lang.list_histoires_text}</Link>
                </div>
            </ListGroupItem>
        );
    }
}