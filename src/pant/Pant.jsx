import React, { Component } from 'react';

class Pant extends Component {

    render() {
        const { pant } = this.props;

        let button;

        if (this.props.isSchoolclass) {
            button = <button className="pantButton btn btn-success btn-sm" onClick={() => {
                this.props.collectPant(this.props.pant.pantId)
            }}>Hämta</button>;
        }

        return (
            <div className="pantItem">
                <div className="pantInfo">
                    <p>Uppskattat värde: {pant.value}</p>
                    <p>Adress: {pant.address}</p>
                </div>
                {button}
            </div>
        );
    }
}

export default Pant;