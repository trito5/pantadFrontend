import React, { Component } from 'react';
import { newPant, getGpsFromAddress } from "../util/APIUtils";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class NewPant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            address: "",
            addressForDB: "",
            postalCode: "",
            city: "",
            longitude: "",
            latitude: "",
            info: "",
            collectTimeFrame: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCoords = this.getCoords.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleGpsFromOnlyAddress = this.handleGpsFromOnlyAddress.bind(this);
        this.register = this.register.bind(this);
    }


    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => {
                this.setState({
                    addressForDB: `${results[0].address_components[1].long_name} ${results[0].address_components[0].long_name}`,
                    address: results[0].formatted_address,
                    postalCode: results[0].address_components[6].long_name,
                    city: results[0].address_components[3].long_name
                });
                this.getCoords(results);
            })
            .catch(error => console.error('Error', error));
    };

    getCoords(results) {
        getLatLng(results[0])
            .then(latLng => this.setState({
                latitude: latLng.lat,
                longitude: latLng.lng
            }))
            .catch(error => console.log(error))
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChange = address => {
        this.setState({ address });
    };

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
        // this.handleGpsFromOnlyAddress()
        //     .then(() => {
        //         this.register();
        //     })
        //     .catch(error => { console.log(error) });
        this.register();
    }

    register() {
        const newPantRequest = {
            value: this.state.value,
            address: this.state.addressForDB,
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
            <div className="container">
                <h1>Lägg upp pant</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input required className="form-control" value={this.state.value} onChange={this.handleInputChange} name="value" placeholder="Värde*" />
                    </div>
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className="form-group">
                                <input
                                    {...getInputProps({
                                        placeholder: 'Upphämtningsadress*',
                                        className: 'form-control',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>

                    <div className="form-group">
                        <input required className="form-control" value={this.state.collectTimeFrame} onChange={this.handleInputChange} name="collectTimeFrame" placeholder="Hämttid*" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input className="form-control" value={this.state.info} onChange={this.handleInputChange} name="info" placeholder="Portkod, trappor, övrigt" />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Registrera</button>
                </form>
            </div>
        );
    }
}

export default NewPant;