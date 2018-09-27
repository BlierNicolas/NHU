import React from 'react'
import {
    Container
} from 'reactstrap';

export default class Block_Intro extends React.Component {
    render() {
        return (
            <div className="py-5">
                <Container fluid={this.props.full}>
                    <h1 className="display-4">{this.props.titre}</h1>
                    {this.props.first ? (<p className="lead">{this.props.first}</p>) : ('')}
                    {this.props.second ? (<p className="lead">{this.props.second}</p>) : ('')}
                </Container>
            </div>
        );
    }
}