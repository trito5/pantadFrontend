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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGpsFromOnlyAddress = this.handleGpsFromOnlyAddress.bind(this);
        this.register = this.register.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
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
            postalCode: this.state.postalCode,
            city: this.state.city,
            collectTimeFrame: this.state.collectTimeFrame,
            collectInfo: this.state.info,


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
            <div className="mainContent">
                <form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Input required value={this.state.value} onChange={this.handleInputChange} name="value" placeholder="Värde" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input required value={this.state.address} onChange={this.handleInputChange} name="address" placeholder="Upphämtningsadress" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input required value={this.state.postalCode} onChange={this.handleInputChange} name="postalCode" placeholder="Postnummer" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input required value={this.state.city} onChange={this.handleInputChange} name="city" placeholder="Postord" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input required value={this.state.collectTimeFrame} onChange={this.handleInputChange} name="collectTimeFrame" placeholder="Hämttid" />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <Input value={this.state.info} onChange={this.handleInputChange} name="info" placeholder="Portkod, trappor, övrigt" />
                    </InputGroup>
                    <br />
                    <Button type="submit" color="primary">Registrera</Button>
                </form>
            </div>
        );
    }
}

export default NewPant;