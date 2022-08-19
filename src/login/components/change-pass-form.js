import React from 'react';
import Button from "react-bootstrap/Button";
import {Col, Row} from "reactstrap";
import {FormGroup, Input, Label} from 'reactstrap';
import validate from "../../commons/validators/validators";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import "../../commons/styles/login.css"
import * as API_USERS from "../api/login"

const input_style = {
    lineHeight: 1.5,
    color: '#666666',
    display: 'block',
    width: '100%',
    background: '#ede6d6',
    height: '50px',
    borderRadius: '25px',
    padding: '0 30px 0 68px',
};

const symbol_style = {
    position: 'relative',
    top: '-40px',
    left: '20px',
    color: "rgb(16,3,10)",
};

const submit_style = {
    backgroundColor: "rgb(237,230,214)",
    border:'none',
    outline:'none',
    color:'black'
};



class ChangePassForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleChangePass = this.toggleChangePass.bind(this);

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                email: {
                    value: '',
                    placeholder: 'Enter your email...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                username: {
                    value: '',
                    placeholder: 'Username...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 5,
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Password...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        minLength: 6
                    }
                },
                confirmpass: {
                    value: '',
                    placeholder: 'Confirm Password...',
                    valid: false,
                    touched: false,
                    validationRules: {

                    }
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePass=this.handlePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    toggleChangePass() {
        this.setState({collapseForm: !this.state.collapseForm});
    }



    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    handlePass = event => {
        const value = event.target.value;
        const name = event.target.name;
        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];
        updatedFormElement.value = value;
        updatedFormElement.touched = true;

        let formIsValid = true;
        formIsValid = this.state.formControls.password.value === value;

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

     changePass(email,credential) {
        return API_USERS.changePassword(email,credential, ( result, status, error) => {
             if ( result !== null && (status === 200 || status === 201)) {
                 window.location.href = "/login";
                 window.alert("Password changed")
             } else {
                 this.setState(({
                     errorStatus: status,
                     error: error
                 }));
             }
         });
     }
     handleSubmit() {
         let credential = {
             username: this.state.formControls.username.value,
             password: this.state.formControls.password.value,
         };
         let email = this.state.formControls.email.value;
         this.changePass(email,credential);
     }

    render() {
        return (
            <div>

                <FormGroup id='email'>
                    <Label for='emailField'> Email: </Label>
                    <Input style={input_style} name='email' id='emailField'
                           placeholder={this.state.formControls.email.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.email.value}
                           touched={this.state.formControls.email.touched ? 1 : 0}
                           valid={this.state.formControls.email.valid}
                           required
                    />
                    <span style={symbol_style}>
							    <i className="fa fa-envelope fa-lg" aria-hidden="true"/>
						    </span>
                    {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                    <div className={"error-message-changepass"}> * Email must have a valid format</div>}
                </FormGroup>

                <FormGroup  id='username'>
                    <Label for='usernameField'> Username: </Label>
                    <Input style={input_style} name='username' id='usernameField'
                           placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched ? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    <span style={symbol_style}>
							    <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"/>
						    </span>
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                    <div className={"error-message-changepass"}> * Username must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup  id='password'>
                    <Label for='passwordField'>New Password: </Label>
                    <Input style={input_style} type='password' name='password' id='passwordField'
                           placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched ? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    <span style={symbol_style}>
							    <i className="fa fa-lock fa-lg" aria-hidden="true"/>
						    </span>
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                    <div className={"error-message-changepass"}> * Password must have at least 6 characters </div>}
                </FormGroup>
                <FormGroup id='confirmpass'>
                    <Label for='confirmpassField'> Confirm Password: </Label>
                    <Input style={input_style} type='password' name='confirmpass' id='confirmpassField'
                           placeholder={this.state.formControls.confirmpass.placeholder}
                           onChange={this.handlePass}
                           defaultValue={this.state.formControls.confirmpass.value}
                           touched={this.state.formControls.confirmpass.touched ? 1 : 0}
                           valid={this.state.formControls.confirmpass.valid}
                           required
                    />
                    <span style={symbol_style}>
							    <i className="fa fa-lock fa-lg" aria-hidden="true"/>
						    </span>
                    {this.state.formControls.confirmpass.touched && !this.state.formIsValid &&
                    <div className={"error-message-changepass"}> * Passwords must match </div>}
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button style={submit_style}  disabled={!this.state.formIsValid}
                                onClick={this.handleSubmit}> Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        );
    }
}

export default ChangePassForm;
