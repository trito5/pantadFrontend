import React, { Component } from 'react';
import { signup, checkEmailAvailability, newSchoolclass } from '../../util/APIUtils';
import {
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH,
    SCHOOLNAME_MIN_LENGTH, SCHOOLNAME_MAX_LENGTH,
    SCHOOLCLASSNAME_MIN_LENGTH, SCHOOLCLASSNAME_MAX_LENGTH
} from '../../constants';
import { withRouter } from "react-router-dom";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            schoolName: {
                value: ''
            },
            schoolClassName: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.props.isSchoolclass) {
            const signupRequest = {
                school: this.state.schoolName.value,
                className: this.state.schoolClassName.value,
                name: this.state.name.value,
                email: this.state.email.value,
                password: this.state.password.value,
                username: this.state.email.value
            };
            newSchoolclass(signupRequest)
                .then(response => {
                    console.log("reg success: " + response);
                    this.props.history.push("/login");
                }).catch(error => {
                    console.log(error.message);
                });
        }
        else {

            const signupRequest = {
                name: this.state.name.value,
                email: this.state.email.value,
                password: this.state.password.value,
                username: this.state.email.value
            };
            signup(signupRequest)
                .then(response => {
                    console.log("reg success: " + response);
                    this.props.history.push("/login");
                }).catch(error => {
                    console.log(error.message);
                });
        }
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    render() {

        let skola = ""

        if (this.props.isSchoolclass) {
            skola =
                <React.Fragment>
                    <label>School name</label>
                    <br />
                    <input
                        name="schoolName"
                        autoComplete="off"
                        placeholder="Your school name"
                        value={this.state.schoolName.value}
                        onChange={event => this.handleInputChange(event, this.validateSchoolName)}
                    />
                    <small>{this.state.schoolName.errorMsg}</small>
                    <br />
                    <label>School class name</label>
                    <br />
                    <input
                        name="schoolClassName"
                        autoComplete="off"
                        placeholder="Your class name"
                        value={this.state.schoolClassName.value}
                        onChange={event => this.handleInputChange(event, this.validateSchoolClassName)}
                    />
                    <small>{this.state.schoolClassName.errorMsg}</small>
                    <br />
                </React.Fragment>
        }

        return (
            <div className="container">
                <h1>Sign Up</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        {skola}
                        <label>Full Name</label>
                        <br />
                        <input
                            name="name"
                            autoComplete="off"
                            placeholder="Your full name"
                            value={this.state.name.value}
                            onChange={event => this.handleInputChange(event, this.validateName)}
                        />
                        <small>{this.state.name.errorMsg}</small>
                        <br />
                        <label>Email</label>
                        <br />
                        <input
                            name="email"
                            autoComplete="off"
                            placeholder="Your email"
                            value={this.state.email.value}
                            onBlur={this.validateEmailAvailability}
                            onChange={event => this.handleInputChange(event, this.validateEmail)}
                        />
                        <small>{this.state.email.errorMsg}</small>
                        <br />
                        <label>Password</label>
                        <br />
                        <input
                            name="password"
                            type="password"
                            autoComplete="off"
                            placeholder="A password between 6 to 20 characters"
                            value={this.state.password.value}
                            onChange={event => this.handleInputChange(event, this.validatePassword)}
                        />
                        <small>{this.state.password.errorMsg}</small>
                        <br />
                        <input type="submit" value="Sign Up" disabled={this.isFormInvalid()} />
                    </form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateSchoolName = (schoolName) => {
        if (schoolName.length < SCHOOLNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${SCHOOLNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (schoolName.length > SCHOOLNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${SCHOOLNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateSchoolClassName = (schoolClassName) => {
        if (schoolClassName.length < SCHOOLCLASSNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${SCHOOLCLASSNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (schoolClassName.length > SCHOOLCLASSNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${SCHOOLCLASSNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: 'This Email is already registered'
                        }
                    });
                }
            }).catch(error => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            });
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

}

export default withRouter(Signup);