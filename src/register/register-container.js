import React from 'react';
import "../commons/styles/register.css"
import 'font-awesome/css/font-awesome.min.css'
import Background from "../commons/images/background4.jpg";

import {
    Button,
    CardHeader,
    Col, FormGroup, Input, Label,
    Row
} from 'reactstrap';
import validate from "../commons/validators/validators.js";
import * as API_USERS from "../register/api/register-api";

const registerCardHeader = {
    backgroundColor: "rgb(230,190,138)",
    fontSize:'25px',
    textAlign:'center'
};
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};
const vertical_center = {
    background: 'rgb(230,190,138)',
    border: 'none',
    outline: 'none',
    color: 'black',
    position: 'relative',
    bottom: '-30px',
    right: '-80px',
    height: '40px',
    width: '100px'

};

const input_style = {
    lineHeight: 1.5,
    color: '#666666',
    display: 'block',
    width: '100%',
    background: '#e6e6e6',
    height: '50px',
    borderRadius: '25px',
    padding: '0 30px 0 68px',
};


class RegisterContainer extends React.Component {

    constructor(props) {

        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {

            errorStatus: 0,
            error: null,
            err: false,
            errorMessage: '',

            formIsValid: false,
            passIsValid: false,

            formControls: {
                username: {
                    value: '',
                    placeholder: 'Username...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
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
                        isRequired: true,
                        minLength: 6
                    }
                },
                name: {
                    value: '',
                    placeholder: 'Name...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true,
                        minLength: 5
                    }
                },
                email: {
                    value: '',
                    placeholder: 'Email...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        emailValidator: true
                    }
                },
                role: {
                    value: '0'
                },
                phone: {
                    value: '',
                    placeholder: 'Phone...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        phoneValidator: true
                    }
                },
            }
        };


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
        let passIsValid = true;
        passIsValid = this.state.formControls.password.value === value;

        this.setState({
            formControls: updatedControls,
            formIsValid: passIsValid
        });

    };

    registerClient(){
        let userDTO = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            role: "Client",
            username: this.state.formControls.username.value,

        };
        let clientDTO = {
            name: this.state.formControls.name.value,
            email: this.state.formControls.email.value,
            phone: this.state.formControls.phone.value,

        };
        if(this.state.password!==this.state.confirmpass){
            console.log(this.state.password);
            console.log(this.state.confirmpass);
            alert("Passwords doesn't match");}
        else{
        let UA = {userDTO, clientDTO};
        console.log(UA);
        this.postClient(UA);}
    }





    registerPlanner(){
        let userDTO = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            role: "Planner",
            username: this.state.formControls.username.value,

        };
        let plannerDTO = {
            name: this.state.formControls.name.value,
            email: this.state.formControls.email.value,
            phone: this.state.formControls.phone.value,
        };
        if(this.state.password!==this.state.confirmpass){
            alert("Passwords doesn't match");}
            else {
        let UDP = {userDTO, plannerDTO};
        console.log(UDP);
        this.postPlanner(UDP);}
    }

    registerAdmin(){
        let userDTO = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            role: "Admin",
            username: this.state.formControls.username.value,

        };
        let adminDTO = {
            name: this.state.formControls.name.value,
            email: this.state.formControls.email.value,
            phone: this.state.formControls.phone.value,
        };
        if(this.state.password!==this.state.confirmpass){
        alert("Passwords doesn't match");
    } else{
        let UDP = {userDTO, adminDTO};
        console.log(UDP);
        this.postAdmin(UDP);}
    }

    postClient(userClient){
        return API_USERS.postClient(userClient, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully register new client " + result);
                alert("Client added succesfully");
                window.location.href="/login";


            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    postAdmin(userAdmin){
        return API_USERS.postAdmin(userAdmin, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully register new admin " + result);
                alert("Admin added succesfully");
                window.location.href="/login";


            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }



    postPlanner(userPlanner){
        return API_USERS.postPlanner(userPlanner, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully register new planner" + result);
                alert("Planner added succesfully");

                window.location.href="/login";


            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }


    handleSubmit() {

        let role = this.state.formControls.role.value;

        if(role === 'client')
            this.registerClient();


        else if(role === 'planner')
            this.registerPlanner();

        else if(role === 'admin')
            this.registerAdmin();

    }

    render() {
        return (
            <div className="register-page" style={backgroundStyle}>
                <div className="register-form">
                    <CardHeader style={registerCardHeader}>
                        <strong> Register </strong>
                    </CardHeader>
                    <div >
                        <FormGroup className="register-input" id='name'>
                            <Label for='nameField'> Name: </Label>
                            <Input style={input_style} name='name' id='nameField'
                                   placeholder={this.state.formControls.name.placeholder}
                                   onChange={this.handleChange}
                                   defaultValue={this.state.formControls.name.value}
                                   touched={this.state.formControls.name.touched ? 1 : 0}
                                   valid={this.state.formControls.name.valid}
                                   required
                            />
                            <span className="symbol-input">
							    <i className="fa fa-user fa-lg" aria-hidden="true"/>
						    </span>

                            {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                            <div className="error-message-register"> * Name must have at least 5 characters </div>}
                        </FormGroup>

                        <br/>

                        <FormGroup className="register-input" id='username'>
                            <Label for='usernameField'> Username: </Label>
                            <Input style={input_style} name='username' id='usernameField'
                                   placeholder={this.state.formControls.username.placeholder}
                                   onChange={this.handleChange}
                                   defaultValue={this.state.formControls.username.value}
                                   touched={this.state.formControls.username.touched ? 1 : 0}
                                   valid={this.state.formControls.username.valid}
                                   required
                            />
                            <span className="symbol-input">
							    <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"/>
						    </span>
                            {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                            <div className={"error-message-register"}> * Username must have at least 3 characters </div>}
                        </FormGroup>

                        <br/>

                        <FormGroup className="register-input" id='email'>
                            <Label for='emailField'> Email: </Label>
                            <Input style={input_style} name='email' id='emailField' placeholder={this.state.formControls.email.placeholder}
                                   onChange={this.handleChange}
                                   defaultValue={this.state.formControls.email.value}
                                   touched={this.state.formControls.email.touched ? 1 : 0}
                                   valid={this.state.formControls.email.valid}
                                   required
                            />
                            <span className="symbol-input">
							    <i className="fa fa-envelope fa-lg" aria-hidden="true"/>
						    </span>
                            {this.state.formControls.email.touched && !this.state.formControls.email.valid &&
                            <div className={"error-message-register"}> * Email must have a valid format</div>}
                        </FormGroup>

                        <br/>

                        <FormGroup className="register-input" id='role'>
                            <Label for='roleField'> Role: </Label>
                            <Input value={this.state.value} onChange={this.handleChange} style={input_style} type="select" name="role" id="roleField" >
                                <option value="0">Choose role...</option>
                                <option value="client">Client</option>
                                <option value="planner">Planner</option>
                                <option value="admin">Admin</option>
                            </Input>

                            <span className="symbol-input">
							    <i className="fa fa-address-card-o" aria-hidden="true"/>
						    </span>

                        </FormGroup>

                        <br/>

                        <FormGroup className="register-input" id='phone'>
                            <Label for='phoneField'> Telephone Number: </Label>
                            <Input style={input_style} name='phone' id='phoneField' placeholder={this.state.formControls.phone.placeholder}
                                   onChange={this.handleChange}
                                   defaultValue={this.state.formControls.phone.value}
                                   touched={this.state.formControls.phone.touched ? 1 : 0}
                                   valid={this.state.formControls.phone.valid}
                                   required
                            />
                            <span className="symbol-input">
							    <i className="fa fa-mobile fa-2x" aria-hidden="true"/>
						    </span>
                            {this.state.formControls.phone.touched && !this.state.formControls.phone.valid &&
                            <div className={"error-message-register"}> * You must enter a valid number </div>}
                        </FormGroup>

                        <br/>

                        <FormGroup className="register-input" id='password'>
                            <Label for='passwordField'> Password: </Label>
                            <Input style={input_style} type='password' name='password' id='passwordField'
                                   placeholder={this.state.formControls.password.placeholder}
                                   onChange={this.handleChange}
                                   defaultValue={this.state.formControls.password.value}
                                   touched={this.state.formControls.password.touched ? 1 : 0}
                                   valid={this.state.formControls.password.valid}
                                   required
                            />
                            <span className="symbol-input">
							    <i className="fa fa-lock fa-lg" aria-hidden="true"/>
						    </span>
                            {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                            <div className={"error-message-register"}> * Password must have at least 6 characters </div>}
                        </FormGroup>

                        <br/>

                        <FormGroup className="register-input" id='confirmpass'>
                            <Label for='confirmpassField'> Confirm Password: </Label>
                            <Input style={input_style} type='password' name='confirmpass' id='confirmpassField'
                                   placeholder={this.state.formControls.confirmpass.placeholder}
                                   onChange={this.handlePass}
                                   defaultValue={this.state.formControls.confirmpass.value}
                                   touched={this.state.formControls.confirmpass.touched ? 1 : 0}
                                   valid={this.state.formControls.confirmpass.valid}
                                   required
                            />
                            <span className="symbol-input">
							    <i className="fa fa-lock fa-lg" aria-hidden="true"/>
						    </span>
                            {this.state.formControls.confirmpass.touched && !this.state.formIsValid && !this.state.passIsValid &&
                            <div className={"error-message-register"}> * Passwords must match </div>}
                        </FormGroup>

                    </div>
                    <br/>
                    <Row>
                        <Col sm={{size: '4', offset: 6}}>
                            <Button type="button" style={vertical_center} onClick={this.handleSubmit} disabled={!this.state. formIsValid}> Submit </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default RegisterContainer;
