import React from 'react';
import "../commons/styles/login.css"
import Img from "../commons/images/img-01.png"
import 'font-awesome/css/font-awesome.min.css'
import * as API_USERS_login from "../login/api/login";
import {
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';

import Background from "../commons/images/background4.jpg";
import ChangePassForm from "./components/change-pass-form";
import {NotificationManager} from "react-notifications";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};




class LoginContainer extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            errorStatus: 0,
            error: null,
            err: false,
            errorMessage: '',

            formIsValid: false,
            showErrMsg: false,
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
                        isRequired: true
                    }
                },
                selectedChangePass:false

            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePass=this.handleChangePass.bind(this);

    }


    handleChange = event => {

        const name = event.target.name;

        const value = event.target.value;
        const updatedControls = this.state.formControls;
        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedControls[name] = updatedFormElement;

        this.setState({
            formControls: updatedControls,
        });
    };


    handleChangePass(){
        this.setState({selectedChangePass: !this.state.selectedChangePass});
    }



    handleSubmit() {

        let credentials = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value
        };
        return API_USERS_login.login(credentials, (result, status, error) => {
            if (status === 200 || status === 201) {
                API_USERS_login.getUserData(credentials.username, (result1,status, error) => {
                    if (status === 200 || status === 201) {
                        window.localStorage.setItem("Username", credentials.username);
                        console.log(window.localStorage.getItem("Username"));
                        window.localStorage.setItem("UserId", result1);
                    }
                })

                API_USERS_login.getRole(credentials.username, (result, status, error) => {
                    if (result !== null && (status === 200)) {
                        if (result === "Client") {
                            window.location.href="/plannerCards";
                            window.localStorage.setItem("role", result);

                        } else if (result === "Planner") {
                            window.localStorage.setItem("role", result);
                            window.location.href="/planner"

                        }
                        else if (result === "Admin") {
                            window.localStorage.setItem("role", result);
                            window.location.href="/admin"
                        }
                    }
                });

                this.setState(({showErrMsg: false}));


            } else if(status === 403) {

                this.setState(({
                    showErrMsg: true
                }));
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));

            }

        });
    }

    render() {
        return (

            <div className="limiter" >
                <div className="container-login100" style={backgroundStyle}>
                    <div className="wrap-login100">
                        <div className="login100-pic" >
                            <img src={Img} alt="IMG"/>
                        </div>

                        <form className="login100-form validate-form" id={"loginForm"}>
                            <span className="login100-form-title">
                                Login
                            </span>

                            <div className="wrap-input100 validate-input" >
                                <input className="input100" type="text" name="username" placeholder="Username"  onChange={this.handleChange}/>
                                    <span className="focus-input100"/>
                                    <span className="symbol-input100">
							            <i className="fa fa-user-circle-o" aria-hidden="true"/>
						            </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" name="password" placeholder="Password"  onChange={this.handleChange}/>
                                    <span className="focus-input100"/>
                                    <span className="symbol-input100">
							            <i className="fa fa-lock" aria-hidden="true"/>
						            </span>
                            </div>

                            <p className="error-message-login"  style={{display: this.state.showErrMsg ? 'block' : 'none' }}> ** User unauthorized </p>

                            <div className="container-login100-form-btn">
                                <button type="button" className="login100-form-btn" onClick={this.handleSubmit}>
                                    Login
                                </button>
                            </div>

                            <div className="text-center p-t-12">
                                <span className="txt1">
                                    Forgot
                                </span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <a type={"submit"} className="txt2" onClick={this.handleChangePass}>
                                    Password?
                                </a>
                            </div>

                            <div className="text-center p-t-136">
                                <a className="txt2" href="/register">
                                    Create your Account
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"/>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
                <Modal isOpen={this.state.selectedChangePass} toggle={this.handleChangePass}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.handleChangePass}> Change password: </ModalHeader>
                    <ModalBody>
                        <ChangePassForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default LoginContainer;
