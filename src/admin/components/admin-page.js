import React from "react";
import { Col, Row} from "reactstrap";
import "../../commons/styles/planner.css"
import "../../commons/styles/planner.css"
import "../../commons/styles/Card.css"
import PlannersImg from "../../commons/images/planners.jpg"
import ClientsImg from "../../commons/images/clientsAdmin.jpg"

import Background from "../../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "970px",
    backgroundImage: `url(${Background})`,
};
const textStyle = {
    color: 'white',
    marginLeft:'25px'
};


class AdminPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            collapseForm: false,
            isLoaded: false,
            errorStatus: 0,
            error: null,

            statistics: false,
            markDisPerson: false,
        };
    }


    render() {
        return (
            <div style={backgroundStyle}>
                <h5 className="display-3" style={textStyle}>Admin Page</h5>
                <br/><br/>   <br/><br/>   <br/><br/>
                <Row >
                    <Col sm={{size: '4', offset: 2}}>
                        <div className="card-container">
                            <div className="image-container">
                                <img src={PlannersImg} alt=''/>

                            </div>
                            <div className="card-content">
                                <div className="card-title">
                                    <h3>Planners</h3>
                                </div>
                                <div className="card-body">
                                    <p></p>
                                </div>
                            </div>
                            <div className="text-center p-t-136">
                                <a className="txt2" href="/planners">
                                    View More
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"/>
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col sm={{size: '4', offset: 2}}>
                        <div className="card-container">
                            <div className="image-container">
                                <img src={ClientsImg} alt=''/>

                            </div>
                            <div className="card-content">
                                <div className="card-title">
                                    <h3>Clients</h3>
                                </div>
                                <div className="card-body">
                                    <p></p>
                                </div>
                            </div>

                            <div className="text-center p-t-136">
                                <a className="txt2" href="/clientsAdmin">
                                    View More
                                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"/>
                                </a>
                            </div>

                        </div>
                    </Col>

                </Row>

            </div>

        )
    };
}

export default AdminPage;