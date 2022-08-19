import React, {useEffect, useState} from 'react';

import { useLocation} from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Label} from "reactstrap";
import {Col, FormGroup, Row} from "react-bootstrap";
import * as API_CLIENT from "./api/client-api";
import moment from "moment";
import Background from "../commons/images/background4.jpg";
import axios from "axios";


const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};


function CreateYourEvent() {

    const { state} = useLocation();
    const [startDate, setStartDate] = useState(new Date());
    const initialValues = { location: "", number:"",period:""};
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
            addYourEvent();
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};

        if (!values.location) {
            errors.location = "Required field!";
        }

        if (!values. number) {
            errors. number = "Required field!";
        }
        if (!values.period) {
            errors.period = "Required field!";
        }

        return errors;
    }
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get('http://localhost:8080/unregistered/allEvents', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }     })

            setEvents(data);
            console.log(localStorage.getItem('token'));
            console.log(data);


        }
        fetching();


    }, []);


   window.localStorage.setItem("plannerId",state.planners.id);

    console.log(state.planners.id);



    function postEvents(userEvent){
        return API_CLIENT.addEvent(userEvent, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Successfully sent your event " + result);


            }
        });
    }
    function reloadAfterCreate(){
        window.location.href="/plannerCards";

    }
    function postClientPlanner(user){
        return API_CLIENT.addClientPlanner(user, (result, status, error) => {
            reloadAfterCreate();
        });
    }


   function addYourEvent(){

        let eventDTO = {
            id_client: localStorage.getItem("UserId"),
            location: document.getElementById("location").value,
            number_of_persons: document.getElementById("number").value,
            period_of_time_for_event: document.getElementById("period").value,
            date: startDate.getDate() + "/" + (startDate.getMonth()+1) + "/"+startDate.getFullYear(),
            id_planner: localStorage.getItem("plannerId")

        };

       let client_plannerDTO = {
           id_client: localStorage.getItem("UserId"),
           id_planner: localStorage.getItem("plannerId")
       }
        postEvents(eventDTO);
       postClientPlanner(client_plannerDTO);

    }



return (
        <div>
            <div  key={localStorage.getItem("plannerEventsId")} >
                <h5 style={{color: 'rgba(76,78,78,0.65)', width:'60%',height:'10%', padding:'5px 100px',position:'relative',top:'20%',align : 'center'}}>Create your own event</h5>

            </div>
            <div className="container-login100" style={backgroundStyle}>
                <div className="wrap-login100">
                    <form onSubmit={handleSubmit}>
                        < p>{formErrors.location}</p>
                        <div className="field" style={{width: '600px'}}>
                        <Label> Location: </Label>
                        <input className="input100" type="text" name="location" id= "location" placeholder="Location"  value={formValues.location}
                               onChange={handleChange}/>

                        <span className="symbol-input">
							   <i className="fa fa-location-arrow" aria-hidden="true"/>
						    </span>
                        </div>

                        < p>{formErrors.number}</p>
                        <div className="field" style={{width: '600px'}}>
                        <Label> Number of persons: </Label>
                        <input className="input100" type="text" name="number" id= "number" placeholder="Number of persons"  value={formValues.number}
                               onChange={handleChange}/>

                        <span className="symbol-input">
							 <i className="fa fa-users" aria-hidden="true"/>
						    </span>
                        </div>

                        < p>{formErrors.period}</p>

                        <div className="field" style={{width: '600px'}}>
                        <Label for='period_of_time_for_eventField'> Period of time: </Label>
                        <input className="input100" type="text" name="period" id= "period" placeholder="Period of time"  value={formValues.period}
                               onChange={handleChange}/>

                        <span className="symbol-input">
							 <i className="fa fa-clock-o" aria-hidden="true"/>
						    </span>
                        </div>

                        <div className="field" style={{width: '600px'}}>
                        <style>
                            {`.date-picker input {
                             width: 100%,
                             color:red
                             
                         }`}
                        </style>
                        <Label> Event Date: </Label>
                        <DatePicker  minDate={moment().toDate()}
                                     showMonthDropdown
                                     showYearDropdown
                                     dropdownMode="select" selected={startDate}  onChange={ (date:Date) => events!=null ? (events.map((e)=>{
                            (date.getDate().valueOf()==e.date.substring(0,2) && date.getMonth().valueOf()+1 ==e.date.substring(3,4) && date.getFullYear().valueOf()==e.date.substring(5,9))  ? alert("This date is already taken") :  setStartDate(date)}))  : setStartDate(date)} />

                    </div>


                    <br/>
                    <Row className="container-login100-form-btn">
                        <Col xs lg="4">

                            <button className="login100-form-btn" >Send to our planner</button>
                        </Col>
                    </Row>
                    </form>
                </div>
            </div></div>
    );

}
export default CreateYourEvent;