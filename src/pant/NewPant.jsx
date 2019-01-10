import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import { newPant, getGpsFromAddress } from "../util/APIUtils";

class NewPant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            address: "",
            postalCode: "",
            city: "",
            longitude: "",
            latitude: "",
            info: "",
            collectTimeFrame: ""
        }
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleInfoChange = this.handleInfoChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
        this.handlecollectTimeFrameChange = this.handlecollectTimeFrameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGpsFromOnlyAddress = this.handleGpsFromOnlyAddress.bind(this);
        this.register = this.register.bind(this);
    }


    handleValueChange(event) {
        this.setState({ value: event.target.value })
    }

    handlecollectTimeFrameChange(event) {
        this.setState({ collectTimeFrame: event.target.value })
    }

    handleAddressChange(event) {
        this.setState({ address: event.target.value })
    }

    handleInfoChange(event) {
        this.setState({ info: event.target.value })
    }

    handleCityChange(event) {
        this.setState({ city: event.target.value });
    }

    handlePostalCodeChange(event) {
        this.setState({ postalCode: event.target.value });
    }

    handleGpsFromOnlyAddress() {
        return getGpsFromAddress(this.state.address)
            .then(response => {
                this.setState({
                    latitude: response.results[0].geometry.location.lat,
                    longitude: response.results[0].geometry.location.lng
                })
            })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.handleGpsFromOnlyAddress()
            .then(() => {
                this.register();
            })
            .catch(error => { console.log(error) });

    }

    register() {
        const newPantRequest = {
            value: this.state.value,
            address: this.state.address,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            collectInfo: this.state.info,
            city: this.state.city,
            postalCode: this.state.postalCode
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
                    <InputGroup>
                        <Input required value={this.state.postalCode} onChange={event => this.handlePostalCodeChange(event)} placeholder="Postnummer" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input required value={this.state.city} onChange={event => this.handleCityChange(event)} placeholder="Postord" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input required value={this.state.collectTimeFrame} onChange={event => this.handlecollectTimeFrameChange(event)} placeholder="Hämttid" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input value={this.state.info} onChange={event => this.handleInfoChange(event)} placeholder="Portkod, trappor, övrigt" />
                    </InputGroup>
                    <br />
                    <Button type="submit" color="primary">Registrera</Button>
                </form>
            </div>
        );
    }
}

export default NewPant;