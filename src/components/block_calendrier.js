import React from 'react'
import Teaser from '../components/teaser';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

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
            <div>
                {
                    this.props.allCalendrier.edges.map(
                        (edge) =>
                            edge.node.affiche ?
                                (<div className="clearfix border-bottom mb-2 anim-bounce-in" key={edge.node.id}>
                                    <Teaser haveHeader={false} titre={edge.node.titre} haveDate={true} dateSpe={edge.node.dateSpe} date={edge.node.date} description={edge.node.description} haveLink={true} link_url={this.lang.header_base + edge.node.romanSlug} link_label={this.lang.block_calendrier_lien} />
                                </div>) :
                                ('')
                    )
                }
            </div>
        );
    }
}