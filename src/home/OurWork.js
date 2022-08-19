import React, {useEffect, useState} from 'react';
import '../commons/styles/events.css';
import {Link} from "react-router-dom";
import axios from "axios";
import Background from "../home/table.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};

const OurWork = () => {

    const [events, setEvents] = useState([]);


    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get('http://localhost:8080/ourWork/getOurWork');
            setEvents(data);
            console.log(data);
        }
        fetching();

    }, []);

    return (
        <div className="events-container" >
            <h2>Our Events</h2>
            <ul className ="event-list"  style={backgroundStyle}>
                {events.map(event=> (

                   <li key={event.id} className="event" style={backgroundStyle}>
                    <h5>{event.name_of_event}</h5>
                       <h6>Location: {event.location}</h6>

                   <img   height=' 350px'
                           width='261px' src={event.image_path}/>
                   <h6>Planner: {event.planner_name} </h6>


                        <Link className="txt2"
                            to={{

                                pathname: "/getDetailsEvent",
                                state: {events: event},


                            }}
                        > See Details </Link>
               </li>
                    ))}


            </ul>
        </div>
    );

};

export default OurWork;