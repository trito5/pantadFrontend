import React, { Component } from 'react';
import { getAllPant, collectPant } from "../util/APIUtils";
import Pant from "./Pant";

class PantLista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            pantList: []
        }
        this.loadPant = this.loadPant.bind(this);
        this.handleSetCollected = this.handleSetCollected.bind(this);
    }

    componentDidMount() {
        this.loadPant();
    }

    loadPant() {
        this.setState({
            isLoading: true
        });
        getAllPant()
            .then(response => {
                this.setState({
                    pantList: response,
                    isLoading: false
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                });
            });
    }

    handleSetCollected(id) {
        this.setState({
            isLoading: true
        });
        collectPant(id)
            .then(response => {
                console.log(response);
                this.setState({
                    isLoading: false
                });
            })
            .then(() => { this.loadPant() })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                });
            });
    }


    render() {

        const allPant = this.state.pantList.map((pant, index) => {
            return (
                <Pant pant={pant} collectedPant={this.handleSetCollected} isSchoolclass={this.props.currentUser.schoolclass} key={index} />
            );
        });

        if (this.state.isLoading) {
            return (<p>Loading...</p>);
        }
        return (
            <React.Fragment>
                {/* <SimpleMap pantLista={this.state.pantList}/> */}
                {allPant}
            </React.Fragment>
        );
    }
}

export default PantLista;