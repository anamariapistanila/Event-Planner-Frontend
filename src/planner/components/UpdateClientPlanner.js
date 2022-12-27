import React, {useEffect, useState} from 'react';

import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Label} from "reactstrap";
import {Col,  Row} from "react-bootstrap";
import * as API_USERS from "../api/planner-api";

import Background from "../../commons/images/background4.jpg";


const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};


function UpdateClientPlanner() {
    const {state} =useLocation();
    const initialValues = { emailClient: "", phoneClient:"",addressClient:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
            updateClients();
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!values.emailClient) {
            errors.emailClient= "Required field!";
        }
        else if (!regex.test(values.emailClient)) {
            errors.emailClient = "This is not a valid email format!";
        }
        if (!values.phoneClient) {
            errors. phoneClient = "Required field!";
        }
        else if(values.phoneClient.length >10  || values.phoneClient.length<10){
            errors. phoneClient = "Incorrect phone number";
        }

        if (!values.addressClient) {
            errors.addressClient = "Required field!";
        }

        return errors;
    }
    function update(userClient){

        return API_USERS.updateClient(state.clients.id,userClient ,(result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Successfully updated client " + result);


            }
            reloadAfterUpdate();
        });
    }

    function updateClients(){

        let clientDTO = {
            email: document.getElementById("emailClient").value,
            phone:document.getElementById("phoneClient").value,
            address:document.getElementById("addressClient").value,
            birthdate: state.clients.birthdate


        };
console.log(document.getElementById("emailClient").value);
console.log(document.getElementById("phoneClient").value);
        update(clientDTO);
    }



    function reloadAfterUpdate(){
        if(localStorage.getItem("role")==="Planner"){

        window.location.href="/clients";}
        else if(localStorage.getItem("role")==="Admin"){
            window.location.href="/clientsAdmin";
        }
    }




    return (
        <div>
            <div className="container-login100" style={backgroundStyle}>
                <div className="wrap-login100">
                    <form onSubmit={handleSubmit}>
                        < p>{formErrors.emailClient}</p>

                        <div className="field" style={{width: '600px'}}>
                        <Label for='emailField'> Email: </Label>
                        <input className="input100" type="text" name="emailClient" id= "emailClient" placeholder="Email" value={formValues.emailClient}
                               onChange={handleChange}/>
                        <span className="symbol-input">
                             <i className="fa fa-envelope-o" aria-hidden="true"/>
                          </span>

                    </div>

                        < p>{formErrors.phoneClient}</p>

                        <div className="field">
                        <Label for='phoneField'> Phone: </Label>
                        <input className="input100" type="text" name="phoneClient" id= "phoneClient" placeholder="Phone" value={formValues.phoneClient}
                               onChange={handleChange}/>
                        <span className="symbol-input">
                            <i className="fa fa-phone" aria-hidden="true"/>
                          </span>

                    </div>

                        < p>{formErrors.addressClient}</p>

                        <div className="field">
                        <Label for='addressField'> Address: </Label>
                        <input className="input100" type="text" name="addressClient" id= "addressClient" placeholder="Address" value={formValues.addressClient}
                               onChange={handleChange}/>
                        <span className="symbol-input">
                            <i className="fa fa-address-card-o" aria-hidden="true"/>
                          </span>

                    </div>
                        <br/>

                    <Row className="container-login100-form-btn">
                        <Col xs lg="4">
                            <button  className="login100-form-btn"  >Update Client</button>
                        </Col>
                    </Row>
                    </form>
                </div>
            </div>
        </div>
    );

}
export default UpdateClientPlanner;