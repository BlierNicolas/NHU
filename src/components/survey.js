import React from 'react'
import {
    Row,
    Col,
    Input,
    Label,
    FormGroup,
    Button
} from 'reactstrap';
import firebase, { auth, provider } from '../firebase.js';
import 'firebase/database';
import 'firebase/auth';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Survey extends React.Component {
    constructor(props) {
        super(props);

        //this.login = this.login.bind(this);

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") { this.lang = lang_fr; }
        if (this.props.lang === "en-US") { this.lang = lang_en; }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitSurvey = this.handleSubmitSurvey.bind(this);

        this.state = {
            user: null,
            lecteur: "vide",
            nomRoman: "",
            surveyAutorise: true,
            surveyStatus: false,
            loaded: false
        };

        this.surveyId = 0;

        if (localStorage.getItem('lecteur_connect') == null) {
            localStorage.setItem('lecteur_connect', "vide");
        }

        if (localStorage.getItem('lecteur_connect') !== "vide") {
            this.state.lecteur = localStorage.getItem('lecteur_connect')
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            const itemsRef = firebase.database().ref('survey');
            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    newState.push({
                        id: item,
                        user: this.state.lecteur.email,
                        reponse: this.state.question1,
                        surveyId: this.surveyId
                    });
                }

                this.items = newState

                if (!this.state.loaded) {
                    //this.checkUpLikes();
                    this.setState({ loaded: true });
                }
            });
        }
    }

    handleSubmitSurvey(e) {
        if (typeof window !== "undefined") {
            // Empêche le refresh
            e.preventDefault();

            // Met la référence vers la database
            const itemsRef = firebase.database().ref('survey');

            console.log(this.state.question1)

            if ((!this.surveyStatus) && (this.state.loaded)) {
                this.items.map((item) =>
                    (item.user === this.state.lecteur.email) ?
                        this.setState({ surveyAutorise: false }) : ''
                )

                if (this.state.surveyAutorise) {
                    // Popule les champs dans une collection "item"
                    const item = {
                        user: this.state.lecteur.email,
                        reponse: this.state.question1,
                        surveyId: this.surveyId
                    }

                    console.log("submit: " + this.state.question1)

                    // Pousse l'item créé dans la collection
                    itemsRef.push(item);
                }
            }

            //this.toggleLike();
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col lg="12" className="p-0">
                        <h2>Survey</h2>
                    </Col>
                    <Col lg="3" className="p-0">
                        <form onSubmit={this.handleSubmitSurvey}>
                            <FormGroup>
                                <Label for="question1">Question 1</Label>
                                <Input type="text" name="question1" id="question1" onChange={this.handleChange} placeholder="Réponse question 1" />
                            </FormGroup>
                            <Button>Submit</Button>
                        </form>
                    </Col>

                    {/* 
                    Si la personne n'a jamais répondu au survey, il voit l'affichage vide
                    Si la personna a répondu au survey, il voit sa réponse et l'option de changer sa réponse ou de la supprimer
                    */}
                </Row>
            </div>
        );
    }
}