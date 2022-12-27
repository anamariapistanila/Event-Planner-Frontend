import React, {useEffect, useState} from 'react';

import "../commons/styles/client.css"
import "../commons/styles/CardClient.css"
import axios from 'axios';
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Background from "../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};

const textStyle = {
    color: 'black',
    marginLeft:'25px'
};
function PlannersCards() {

    const [planners, setPlanners] = useState([]);

    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get('http://localhost:8080/client/allPlannersDetails', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }     })
                setPlanners(data);
                console.log(data);


        }
        fetching();


    }, []);


    return (

        <div className="Client" style={backgroundStyle}>
            <h3 className="display-3" style={textStyle}>Our Team</h3>
            <br/><br/>
            <Row  >
                {planners.map((e)=> (
                    <div  key={e.id} >


                        <Col sm={{size: '2', offset: 10}}
                        >
                            <div className="CardClient">
                                <div className="upper-container">
                                    <div className="image-container1">
                                        <img src={e.image_path} alt="" height="200px"  width="200px" />
                                    </div>
                                </div>
                                <div className="lower-container">
                                    <br/>

                                    <h2>{e.name}</h2>
                                    <h5>{e.type_of_planner}</h5>
                                    <h6>{e.description} </h6>
                                <br/>
                                    <Link className="txt2"
                                        to={{
                                            pathname: "/createYourEvent/?id=" + e.id,
                                            state: {planners: e}, //array of objects


                                        }}
                                    > Create Your Event </Link>

                                </div>

                            </div>

                        </Col>

                    </div>
                ))}
            </Row>


        </div>
    );


}
export default PlannersCards;