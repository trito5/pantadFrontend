import React, { Component } from 'react';
import { getMyPant } from "../../util/APIUtils";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
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
        getMyPant()
            .then(response => {
                this.setState({
                    pantList: response,
                    isLoading: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: false
                });
            });
    }


    render() {
        const { isLoading } = this.state;
        const allPant = this.state.pantList.map((pant, index) => {
            return (
                <div key={index} className="mainContent">
                    <p>ID: {pant.id}</p>
                    <p>ADDRESS: {pant.address}</p>
                    <p>VALUE: {pant.value}</p>
                    <p>LONGITUDE: {pant.longitude}</p>
                    <p>LATITUDE: {pant.latitude}</p>
                </div>
            );
        });

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <React.Fragment>
                {allPant}
            </React.Fragment>
        );
    }
}

export default Profile;