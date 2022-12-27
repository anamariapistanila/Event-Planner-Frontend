import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Col,  Row} from "react-bootstrap";
import {Label} from "reactstrap";
import * as API_USERS from "../planner/api/planner-api";
import DatePicker from "react-datepicker";
import moment from "moment";
import Background from "../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};
export function UpdateProfileClient() {
    const [values, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const initialValues = {address:""};
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
            update();
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};

        if (!values.address) {
            errors.address = "Required field!";
        }

        return errors;
    }
    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get('http://localhost:8080/client/clientById', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }     })

            setData(data);
            console.log(data);


        }
        fetching();


    }, []);

    function updateClient(user){
        return API_USERS.updateProfileClient(user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Successfully updated profile " + result);
                window.location.reload(false);
            }
            reloadAfterUpdate();
        });
    }

    function update(){

        let clientDTO = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            birthdate: startDate.getDate() + "/" + (startDate.getMonth()+1) + "/"+startDate.getFullYear(),


        };

        updateClient(clientDTO);
    }

    function reloadAfterUpdate(){
        window.location.href="/plannerCards";

    }
    return (
        <div>
            <div  key={localStorage.getItem("plannerEventsId")} >
                <h5 style={{color: 'rgba(76,78,78,0.65)', width:'60%',height:'10%', padding:'5px 100px',position:'relative',top:'20%',align : 'center'}}>Update Profile</h5>

            </div>
            <div className="container-login100" style={backgroundStyle}>
                <div className="wrap-login100">
                    <form onSubmit={handleSubmit}>


                        <Label> Name: </Label>
                        <div className="field" style={{width: '400px'}}>
                        <input className="input100"  defaultValue={values.name}
                               placeholder="Name"
                               type="text"
                               name="name"
                               id="name"

                        />
                        <span className="symbol-input">
                             <i className="fa fa-user-circle-o" aria-hidden="true"/>
                          </span>

                    </div>

                        <Label> Email: </Label>
                        <div className="field" style={{width: '400px'}}>
                        <input className="input100" defaultValue={values.email}
                               placeholder="email"
                               type="text"
                               name="email"
                               id="email"
                        />
                        <span className="symbol-input">
                             <i className="fa fa-envelope-o" aria-hidden="true"/>
                          </span>

                    </div>

                        <Label> Phone:  </Label>
                        <div className="field" style={{width: '400px'}}>
                        <input className="input100" defaultValue={values.phone}
                               placeholder="phone"
                               type="text"
                               name="phone"
                               id="phone"
                        />
                        <span className="symbol-input">
                             <i className="fa fa-phone" aria-hidden="true"/>
                          </span>

                    </div>
                            < p>{formErrors.address}</p>
                        <div className="field" style={{width: '400px'}}>
                        <Label> Address: </Label>
                        <input className="input100" type="text" name="address" id= "address" placeholder="Address"  value={formValues.address}
                               onChange={handleChange}/>

                        <span className="symbol-input">
							  <i className="fa fa-address-card-o" aria-hidden="true"/>
						    </span>
                        </div>


                        <div className="field" style={{width: '400px'}}>
                        <style>
                            {`.date-picker input {
                             width: 100%,
                             color:red
                             
                         }`}
                        </style>
                        <Label> BirthDate: </Label>
                        <DatePicker  maxDate={moment().toDate()} showMonthDropdown
                                     showYearDropdown
                                     dropdownMode="select" selected={startDate}  onChange={ (date:Date) =>  setStartDate(date)} wrapperClassName="date-picker"/>
                    </div>

<br/>

                    <Row className="container-login100-form-btn">
                        <Col xs lg="4">

                            <button  className="login100-form-btn" >Update Profile</button>
                        </Col>
                    </Row>

                    </form>
                </div>
            </div>
        </div>
    )
};
export default UpdateProfileClient;