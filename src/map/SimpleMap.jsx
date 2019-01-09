import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from "../constants";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.40,
            lng: 17.94
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '50vh', width: '50%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={59.407319}
                        lng={17.946887}
                        text={'ACADEMY'}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;
