import React from 'react';

import { useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Label} from "reactstrap";
import {Col, FormGroup, Row} from "react-bootstrap";
import Background from "../../commons/images/background4.jpg";
import * as API_ADMIN from "../api/admin-api";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};


function UpdatePlannerAdmin() {

const {state} = useLocation();

    function update(planner){

        return API_ADMIN.updatePlanner(state.planners.id,planner ,(result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Successfully updated planner " + result);


            }
            reloadAfterUpdate();
        });
    }

    function updatePlanner(){

        let plannerDTO = {
            name: document.getElementById("namePlanner").value,
            email: document.getElementById("emailPlanner").value,
            phone:document.getElementById("phonePlanner").value,
            type_of_planner: state.planners.type_of_planner


        };
        update(plannerDTO);

    }



    function reloadAfterUpdate(){

        window.location.href="/planners";}




    return (
        <div>
            <div className="container-login100" style={backgroundStyle}>
                <div className="wrap-login100">

                    <FormGroup className="register-input" id='name'>
                        <Label for='nameField'> Name: </Label>
                        <input className="input100" type="text" name="name" id= "namePlanner" placeholder="Name"/>
                        <span className="symbol-input">
                    <i className="fa fa-user-circle-o" aria-hidden="true"/>
                          </span>

                    </FormGroup>
                    <br/> <br/> <br/> <br/>


                    <FormGroup className="register-input" id='email'>
                        <Label for='emailField'> Email: </Label>
                        <input className="input100" type="text" name="email" id= "emailPlanner" placeholder="Email"/>
                        <span className="symbol-input">
                             <i className="fa fa-envelope-o" aria-hidden="true"/>
                          </span>

                    </FormGroup>
                    <br/> <br/> <br/> <br/>

                    <FormGroup className="register-input" id='phone'>
                        <Label for='phoneField'> Phone: </Label>
                        <input className="input100" type="text" name="phone" id= "phonePlanner" placeholder="Phone"/>
                        <span className="symbol-input">
                            <i className="fa fa-phone" aria-hidden="true"/>
                          </span>

                    </FormGroup>
                    <br/> <br/> <br/> <br/> <br/>

                    <Row className="container-login100-form-btn">
                        <Col xs lg="4">
                            <button type="button" className="login100-form-btn" onClick={updatePlanner} >Update Planner</button>
                        </Col>
                    </Row>

                </div>
            </div>
        </div>
    );

}
export default UpdatePlannerAdmin;