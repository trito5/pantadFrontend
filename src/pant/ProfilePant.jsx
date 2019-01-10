import React, { Component } from 'react';

class ProfilePant extends Component {

    render() {
        const { pant, isSchoolclass, unCollectPant, deletePant } = this.props;

        let button = "";

        if (isSchoolclass) {
            button = <button className="pantButton btn btn-primary btn-sm" onClick={() => {
                unCollectPant(pant.id)
            }}>Ångra</button>;
        } else {
            button = <button className="pantButton btn btn-primary btn-sm" onClick={() => {
                deletePant(pant.id)
            }}>Ta bort</button>
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

export default ProfilePant;