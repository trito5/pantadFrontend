import React, { Component } from 'react';

class ProfilePant extends Component {

    render() {
        const { pant, isSchoolclass, unCollectPant, deletePant } = this.props;

        let button;

        if (isSchoolclass) {
            button = <button className="pantButton btn btn-primary btn-sm" onClick={() => {
                unCollectPant(pant.id)
            }}>Ångra</button>;
        } else {
            button = <button className="pantButton btn btn-primary btn-sm" onClick={() => {
                deletePant(pant.pantId)
            }}>Ta bort</button>
        }

        return (
            <div className="card">
                <img src="../img/card-img.png" className="card-img-top" alt="burkBild" />
                <div class="card-body">
                    <h5 class="card-title">Cirka värde: {pant.value}</h5>
                    <p class="card-text">Adress: {pant.address}</p>
                    {button}
                </div>
            </div>

        );
    }
}

export default ProfilePant;