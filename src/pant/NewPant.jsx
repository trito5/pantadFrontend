import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import { newPant, getGpsFromAddress } from "../util/APIUtils";

class NewPant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            address: "",
            longitude: "",
            latitude: ""
        }
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGetGPS = this.handleGetGPS.bind(this);
        this.handleGpsFromOnlyAddress = this.handleGpsFromOnlyAddress.bind(this);
    }

    handleValueChange(event) {
        this.setState({ value: event.target.value })
    }

    handleAddressChange(event) {
        this.setState({ address: event.target.value })
    }

    handleGpsFromOnlyAddress() {
        return getGpsFromAddress(this.state.address)
            .then(response => {
                this.setState({
                    latitude: response.results[0].geometry.location.lat,
                    longitude: response.results[0].geometry.location.lng
                })
                console.log(response.results[0].geometry.location.lat);
                console.log(response.results[0].geometry.location.lng);
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleGetGPS() {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const success = (pos) => {
            this.setState({
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude
            });
            console.log(pos.coords.longitude);
            console.log(pos.coords.latitude);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    handleSubmit(event) {
        event.preventDefault();
        const { latitude, longitude } = this.state;
        if (latitude === "" && longitude === "") {
            this.handleGpsFromOnlyAddress().then(
                () => this.register()
            );
        }
        else this.register();


    }
    register() {
        const newPantRequest = {
            value: this.state.value,
            address: this.state.address,
            longitude: this.state.longitude,
            latitude: this.state.latitude
        };
        newPant(newPantRequest)
            .then(response => {
                console.log("reg success: " + response);
                this.props.history.push("/pant");
            }).catch(error => {
                console.log(error.message);
            });
        console.log(this.state);
    }
    render() {
        return (
            <div address="container">
                <form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Input required value={this.state.value} onChange={event => this.handleValueChange(event)} placeholder="Värde" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input required value={this.state.address} onChange={event => this.handleAddressChange(event)} placeholder="Upphämtningsadress" />
                    </InputGroup>
                    <br />
                    <Button onClick={this.handleGetGPS}>Underlätta med GPS</Button>
                    <p></p>
                    <Button type="submit" color="primary">Registrera</Button>
                </form>
            </div>
        );
    }
}

export default NewPant;