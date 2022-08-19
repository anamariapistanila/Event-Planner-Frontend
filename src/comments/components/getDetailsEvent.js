import React, {useEffect, useRef, useState} from 'react';
import Button from "react-bootstrap/Button";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Background from "../../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};
function GetDetailsEvent() {
    const [details, setDetails] = useState([]);
    const [logged, setLogged] = useState([]);
    const {state} = useLocation();
    const [comments, setComments] = useState([]);
    const [show, setShow] = useState(false);

    const id= state.events.id;
    const signIn = () => {
        window.location.href="/register";

    };
    const login = () => {
        window.location.href="/login";

    };
    const handleClose = () => setShow(false);
    const handleComm = () => setShow(true);


    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get('http://localhost:8080/comm/getAllComments/' + id, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }     })
            setLogged(false);
            if(localStorage.getItem("UserId")!=null){
                setLogged(true);
            }
            setComments(data);
            console.log(data);
        }
        fetching();

    }, []);
    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get('http://localhost:8080/detailsEvent/getAllDetails/' + id);
            setLogged(false);
            if(localStorage.getItem("UserId")!=null){
                setLogged(true);
            }
            setDetails(data);
            console.log(data);
        }
        fetching();

    }, []);
    return (
        <div >
            <div className="container-login100" style={backgroundStyle}>
                <div className="wrap-login100">
            <h4>{state.events.name_of_event}</h4>
            <ul>
            <li>
                {details.map((d) => (
                    <div key={d.id}>
                        <h6>{d.description}</h6>
                        <br/>
                        <h6>SERVICES</h6>
                    <h6>{d.services}</h6>
                    </div>
                ))}
            </li>
            </ul>
                    <div>
                    <h4>Comments</h4>
                    <ul>
                        {comments.map((comm) => (
                            <li key = {comm.id}>
                                <h6>{comm.name_of_client}/{comm.date}</h6>
                                <p>{comm.comment}</p>
                            </li>

                        ))}
                    </ul>
                    </div>
                    <div>
                    <br/> <br/><br/>  <br/> <br/><br/><br/>
                    <ul>
                        {(logged===false) ?
                            <>
                                <a type="button" style={{width: '25%', border: "none"}}onClick={handleComm}>
                                    Add Comment
                                </a>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    </Modal.Header>
                                    <Modal.Body>You need to Sign in or Log in first</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={ signIn}>
                                            Sign In
                                        </Button>
                                        <Button variant="primary" onClick={login}>
                                            Login
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                            :
                            <Link className="txt2"
                                to={{

                                    pathname: "/addCommentClient",
                                    state: {events: state.events},


                                }}
                            > Add Comment </Link>}
                    </ul>
                    </div>
        </div>
            </div>
        </div>
    );
}
export default GetDetailsEvent;