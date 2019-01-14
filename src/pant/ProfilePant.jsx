import React, { Component } from 'react';

class ProfilePant extends Component {

    render() {
        const { pant, isSchoolclass, unCollectPant, deletePant } = this.props;

        return (
            <div className="pantItem">
                <div className="pantInfo">
                    <p>Uppskattat värde: {pant.value}</p>
                    <p>Adress: {pant.address}</p>
                    <p>Postnummer: {pant.postalCode} Ort: {pant.city} </p>
                    {/* <p>Uppläggare: {pant.user.name}</p>
                    <p>Mail: {pant.user.email}</p> */}
                    <p>Hämttid: {pant.collectTimeFrame}</p>
                    <p>Övrig info: {pant.collectInfo}</p>
                </div>

                {isSchoolclass && 
                    <button className="pantButton btn btn-secondary btn-sm" onClick={() => {
                        unCollectPant(pant.id)
                    }}>Ångra</button>
                }

                {!isSchoolclass && 
                    <button className="pantButton btn btn-secondary btn-sm" onClick={() => {
                        deletePant(pant.pantId)
                    }}>Ta bort</button> 
                }

            </div>
        );
    }
}

export default ProfilePant;