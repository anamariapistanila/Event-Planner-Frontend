import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { Label} from "reactstrap";
import {Col, FormGroup, Row} from "react-bootstrap";
import * as API_DETAILS from "../../planner/api/details-api";


import Background from "../../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};

function AddDetailsEvent() {


    function postDetails(details){
        return API_DETAILS.addDetailsEv(details, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Successfully add details " + result);


            }
            reloadAfterAdd();
        });
    }
    function reloadAfterAdd(){
        window.location.href="/planner";

    }

    function addDetails(){

        let detailsDTO = {
            description: document.getElementById("descript").value,
            services: document.getElementById("services").value,


        };
console.log(document.getElementById("descript").value);
console.log(document.getElementById("services").value);
        postDetails(detailsDTO);


    }




    return (
        <div>
            <div  key={localStorage.getItem("plannerEventsId")} >
                <h5 style={{color: 'rgba(76,78,78,0.65)', width:'60%',height:'10%', padding:'5px 100px',position:'relative',top:'20%',align : 'center'}}>Add Details Event</h5>

            </div>
            <div className="container-login100" style={backgroundStyle}>
                <div className="wrap-login100">

                    <FormGroup className="register-input" >
                        <Label> Description: </Label>
                        <textarea className="form-control" id="descript" cols="30" rows="8" placeholder="Description" name="descript"/>


                    </FormGroup>

                    <br/>   <br/>    <br/>
                    <br/> <br/> <br/>   <br/>    <br/>
                    <br/>   <br/>
                    <FormGroup className="register-input" >
                        <Label> Services: </Label>
                        <textarea className="form-control" id="services" cols="30" rows="8" placeholder="Services" name="services"/>


                    </FormGroup>

                    <br/> <br/>   <br/>    <br/>
                    <br/> <br/>   <br/>    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <Row className="container-login100-form-btn">
                        <Col xs lg="4">

                            <button type="button" className="login100-form-btn" onClick={addDetails}>Add Event</button>
                        </Col>
                    </Row>

                </div>
            </div></div>
    );

}
export default AddDetailsEvent;