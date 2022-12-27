import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as API_ADMIN from "../../admin/api/admin-api";
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
function AdminPlanners() {


    const [planners, setPlanners] = useState([]);
    const [events, setEvents] = useState([]);
    const [ourWork, setOurWork] = useState([]);
    let event=0;
    let ourWork1=0;
    const [show, setShow] = useState(false);
    const handleDelete = () => setShow(true);
    const handleClose = () => setShow(false);
    const [mainPlanners, setMainPlanners] = useState([]);
    useEffect(() => {const fetching = async () => {
        const {data} =await
        axios.get('http://localhost:8080/admin/allPlanners',{ headers: {
                'Authorization': localStorage.getItem('token')
            }     })
            setPlanners(data);
            setMainPlanners(data);
            console.log(data);
    }
        fetching();
    }, []);

    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get('http://localhost:8080/client/allEvents', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }     })

            setEvents(data);
            console.log(localStorage.getItem('token'));
            console.log(data);


        }
        fetching();


    }, []);
    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get('http://localhost:8080/ourWork/getOurWork');
            setOurWork(data);
            console.log(data);
        }
        fetching();

    }, []);
    const handleSearchByName = (e) => {
        setPlanners(mainPlanners.filter(u => u.name.toLowerCase()
            .includes(e.target.value.toLowerCase())
        ));
        console.log(e.target.value);
    }

    function fetchPlanners(){
        return API_ADMIN.getPlanners((result, status, err) => {
            console.log(result.id);
            localStorage.setItem("PlannerId",result.id);

        });}

    function reloadAfterDelete(){
        window.location.reload(false);
        fetchPlanners();
    }
    function deletePlanner(planner){
        {ourWork.map((o=>{
            if(o.id_planner!=null){
                ourWork1=1;
            }
        }))}
        {events.map((e=>{
            if(e.id_planner!=null){
                event=1;
                console.log(event);
            }
        }))}
        if(event==1 || ourWork1==1){
            alert("The planner still have events");
            window.location.reload(false);
        }
       else{
           console.log(event);
           console.log(planner);
        API_ADMIN.deletePlannerById(planner,(result, status, err) => reloadAfterDelete());
        alert("Deleted successfully");}
    }




    return (
        <div style={backgroundStyle}>
            <br/><br/>
            <h2>Admin Planners</h2>
            <br/><br/>
            <div className='form-group col-10 col-md-6 col-lg-4'>
                <input type="text" className='form-control shadow'
                       placeholder='Search Planners By Name' onChange={handleSearchByName} />
            </div>



            {planners.length ? (
                <table className='table'>
                    <thead>
                    <tr>
                        <th scope="col">Name of Planner</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col"></th>
                        <th scope="col">Type of planner</th>

                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>


                    </tr>
                    </thead>
                    <tbody>
                    {planners.map(u =>
                        <tr key={u.id}>

                            <th scope="row">{u.name}</th>

                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>{u.address}</td>
                            <td>{u.type_of_planner}</td>
                            <td>
                                <>
                                    <a type="button" style={{width: '25%', border: "none"}}  onClick={handleDelete}>
                                        Delete</a>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure you want to delete?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={()=>deletePlanner(u.id)}>
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

                                <Link className="txt2" to={{pathname: "/updatePlannerAdmin", state: {planners:u} }}>
                                    Update
                                </Link>
                            </td>

                        </tr>
                    )}
                    </tbody>
                </table>
            ) : (
                <h6 className='text-center text-info'>waiting ...</h6>
            )}

        </div>
    )
}
export default AdminPlanners;