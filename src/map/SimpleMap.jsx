import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from "../constants";

const Burk = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.40,
            lng: 17.94
        },
        zoom: 11
    };

    render() {
        const varjePant = this.props.pantLista.map((pant, index) => {
            return (
                <Burk
                    key={pant.id}
                    lat={pant.latitude}
                    lng={pant.longitude}
                    text={'♻️'}
                />
            );
        })

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {varjePant}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;
