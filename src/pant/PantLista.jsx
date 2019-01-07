import React, { Component } from 'react';
import { getAllPant } from "../util/APIUtils";
import Pant from "./Pant";
import SimpleMap from "../map/SimpleMap";

class PantLista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            pantList: []
        }
        this.loadPant = this.loadPant.bind(this);
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

    render() {

        const allPant = this.state.pantList.map((pant, index) => {
            return (
                <Pant pant={pant} key={index} />
            );
        });

        if (this.state.isLoading) {
            return (<p>Loading...</p>);
        }
        return (
            <React.Fragment>
                {allPant}
                <SimpleMap />
            </React.Fragment>
        );
    }
}

export default PantLista;