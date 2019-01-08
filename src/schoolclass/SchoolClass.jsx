import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import { newSchoolclass } from "../util/APIUtils";


class SchoolClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolName: "",
            className: ""
        }
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleSchoolChange = this.handleSchoolChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSchoolChange(event) {
        this.setState({ schoolName: event.target.value })
    }

    handleClassChange(event) {
        this.setState({ className: event.target.value })
    }

    handleSubmit() {
        const newSchoolRequest = {
            schoolName: this.state.schoolName,
            className: this.state.className
        };
        newSchoolclass(newSchoolRequest)
            .then(response => {
                console.log("reg success: " + response);
                this.props.history.push("/login");
            }).catch(error => {
                console.log(error.message);
            });
    }

    render() {
        return (
            <div className="container">
                <InputGroup>
                    <Input value={this.state.schoolName} onChange={event => this.handleSchoolChange(event)} placeholder="Namn på skola" />
                </InputGroup>
                <br />
                <InputGroup>
                    <Input value={this.state.className} onChange={event => this.handleClassChange(event)} placeholder="Namn på klass" />
                </InputGroup>
                <br />
                <Button onClick={this.handleSubmit} color="primary">Registrera</Button>
            </div>
        );
    };
}

export default SchoolClass;