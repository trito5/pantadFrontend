import React, { Component } from 'react';

class Pant extends Component {

    render() {
        const { pant } = this.props;

        let button = "";

        if (this.props.isSchoolclass) {
            button = <button className="collectButton btn btn-primary btn-sm" onClick={() => { this.props.collectedPant(this.props.pant.pantId) }}>Hämta</button>;
        }

        return (
            <div className="pantItem">
                <div className="pantInfo">
                    <p>{pant.value}</p>
                    <p>{pant.address}</p>
                </div>
                {button}
            </div>
        );
    }
}

export default Pant;

// value, address, longitude, latitude, user, collectedByClassId, isCollected, collectInfo