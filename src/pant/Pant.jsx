import React, { Component } from 'react';

class Pant extends Component {

    render() {
        const { pant } = this.props;

        console.log(this.props)

        let button = "";

        if (this.props.isSchoolclass) {
            button = <button onClick={() => { this.props.collectedPant(this.props.pant.pantId) }}>Knapp</button>;
        }

        return (
            <div>
                <p>{pant.value}</p>
                <p>{pant.address}</p>
                {button}
            </div>
        );
    }
}

export default Pant;

// value, address, longitude, latitude, user, collectedByClassId, isCollected, collectInfo