import React, { Component } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';

class SchoolClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolName: "",
            className: "",
            personOfContact: ""
        }
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handlePersonChange = this.handlePersonChange.bind(this);
        this.handleSchoolChange = this.handleSchoolChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSchoolChange(event) {
        this.setState({ schoolName: event.target.value })
    }

    handleClassChange(event) {
        this.setState({ className: event.target.value })
    }

    handlePersonChange(event) {
        this.setState({ personOfContact: event.target.value })
    }

    handleSubmit() {

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
                <InputGroup>
                    <Input value={this.state.personOfContact} onChange={event => this.handlePersonChange(event)} placeholder="Kontaktperson" />
                </InputGroup>
                <br />
                <Button onClick={this.handleSubmit} color="primary">Registrera</Button>
            </div>
        );
    };
}

export default SchoolClass;