import React from 'react';

class AppHeader extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="company-logo">
                    <img className="happy-can-logo" src="../img/happy_can_black_white.png" alt="happy can" />
                    {/* <i className="fas fa-recycle"></i> */}
                    <h1>Happy Can</h1>
                </div>
                <i onClick={this.props.toggleMenu} className="fas fa-bars"></i>
            </div>
        );
    }
}

export default AppHeader;