import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
    ListGroupItem,
    ListGroupItemHeading,
    Progress
} from 'reactstrap';

export default class List_Story_Progression extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListGroupItem className="mb-4 border-top-0 border-right-0 border-left-0 pt-0 pr-0 pl-0">
                <ListGroupItemHeading><Link to={'/en/stories/' + this.props.histoire_progression.slug}>{this.props.histoire_progression.titreRoman}</Link></ListGroupItemHeading>
                <div className="list-group-item-text">
                    <Progress animated value={(this.props.histoire_progression.chapitreActuel / this.props.histoire_progression.maximumChapitre) * 100}>{this.props.histoire_progression.chapitreActuel + "/" + this.props.histoire_progression.maximumChapitre}</Progress>
                    <Link to={'/en/stories/' + this.props.histoire_progression.slug}>Start reading</Link>
                </div>
            </ListGroupItem>
        );
    }
}