import React, { Component } from 'react'
import Link from 'gatsby-link'
import {
    ListGroupItem,
    ListGroupItemHeading
} from 'reactstrap';

export default class List_Histoire_Info extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.allHistoires.edges.map(
                        (edge) =>
                            <div key={edge.node.id}>
                                {
                                    edge.node.typeHistoire == this.props.typeHistoire ?
                                        (
                                            <ListGroupItem className="mb-4 border-top-0 border-right-0 border-left-0 pt-0 pr-0 pl-0">
                                                <ListGroupItemHeading><Link to={'/histoires/' + edge.node.slug}>{edge.node.titreRoman}</Link></ListGroupItemHeading>
                                                <div className="list-group-item-text">
                                                    <div className="text-justify" dangerouslySetInnerHTML={{ __html: edge.node.resume.childMarkdownRemark.html }} />
                                                    <Link to={'/histoires/' + edge.node.slug}>Commencer à lire</Link>
                                                </div>
                                            </ListGroupItem>
                                        ) :
                                        ('')
                                }
                            </div>
                    )
                }
            </div>
        );
    }
}