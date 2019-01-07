import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

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
                    bootstrapURLKeys={{ key: "AIzaSyD_lKjYk6AswFRCg7KIqd9s-GwXcy5nSSs" }}
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