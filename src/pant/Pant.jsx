import React, { Component } from 'react';

class Pant extends Component {
    render() {
        const { pant } = this.props;
        return (
            <div>
                <p>{pant.value}</p>
                <p>{pant.address}</p>
                <p>{pant.longitude}</p>
                <p>{pant.latitude}</p>
            </div>
        );
    }
}

export default Pant;

// value, address, longitude, latitude, user, collectedByClassId, isCollected, collectInfo