import React, { useEffect, useState } from 'react';

import axios from 'axios';
import * as API_USERS from "../api/planner-api";
import { Link } from 'react-router-dom';
import ImageTable from "../../home/table.jpg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${ImageTable})`,
};
function EventsTablePlanner() {


    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(false);
    const handleDelete = () => setShow(true);
    const handleClose = () => setShow(false);
    const [mainEvents, setMainEvents] = useState([]);
    useEffect(  () => {
        const fetching = async () => {
        const {data} = await
            axios.get('http://localhost:8080/planner/getAllEvents', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }     })
            setEvents(data);

            setMainEvents(data);
            console.log(data);
    }
    fetching();

}, []);
    {events.map(u =>
        console.log(u.id))}

    const handleSearch = (e) => {
        setEvents(mainEvents.filter(u => u.location.toLowerCase()
            .includes(e.target.value.toLowerCase())
        ));
        console.log(e.target.value);
    }

    const handleSearchByName = (e) => {
        setEvents(mainEvents.filter(u => u.name.toLowerCase()
            .includes(e.target.value.toLowerCase())
        ));
        console.log(e.target.value);
    }
    function fetchEvents(){
        return API_USERS.getEvents((result, status, err) => {

        });
    }
    function reloadAfterDelete(){
        window.location.reload(false);
       fetchEvents();
    }
   function deleteEvent(event){
        API_USERS.deleteEventById(event, (result, status, err) => reloadAfterDelete());
        alert("Deleted successfully");
    }




    return (
        <div style={backgroundStyle}>
            <br/><br/>
            <h2>Planner Events</h2>
            <br/><br/>
            <div className='row my-2 mb-4 justify-content-between w-100 mx-0'>
                <div className='form-group col-10 col-md-6 col-lg-4'>
                    <input type="text" className='form-control shadow'
                           placeholder='Search Events By Location' onChange={handleSearch} />
                <br/>
                    <Link className="txt2"  to={{pathname: "/addEventByPlanner"}}>
                        Add New Event
                    </Link>
                </div>


                <div className='form-group col-10 col-md-6 col-lg-4'>
                    <input type="text" className='form-control shadow'
                           placeholder='Search Events By Name' onChange={handleSearchByName} />
                </div>
            </div>


            {events.length ? (
                <table className='table'>
                    <thead>
                    <tr>
                        <th scope="col">Name of Client</th>
                        <th scope="col">Location</th>
                        <th scope="col">Number of persons</th>
                        <th scope="col">Period of time for event</th>
                        <th scope="col">Date of Event</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>


                    </tr>
                    </thead>
                    <tbody>
                    {events.map(u =>
                        <tr key={u.id} >


                            <th scope="row">{u.name_of_client}</th>

                            <td>{u.location}</td>
                            <td>{u.number_of_persons}</td>
                            <td>{u.period_of_time_for_event}</td>
                            <td>{u.date}</td>

                           <td>
                             <>
                               <a type="button" style={{width: '25%', border: "none"}}  onClick={handleDelete}>
                                   Delete</a>
                               <Modal show={show} onHide={handleClose}>
                                   <Modal.Header closeButton>
                                   </Modal.Header>
                                   <Modal.Body>Are you sure you want to delete?</Modal.Body>
                                   <Modal.Footer>
                                       <Button variant="secondary" onClick={()=>deleteEvent(u.id) }>
                                          Yes
                                       </Button>
                                       <Button variant="primary" onClick={handleClose}>
                                           No
                                       </Button>
                                   </Modal.Footer>
                               </Modal>
                             </>
                           </td>
                            <td>

                                <Link className="txt2" to={{pathname: "/updateEvent", state: {events: u}}}>
                                   Update
                                </Link>
                            </td>




                        </tr>
                    )}
                    </tbody>
                </table>
            ) : (
                <h6 className='text-center text-info'>wating ...</h6>
            )}

        </div>
    )
}
export default EventsTablePlanner;