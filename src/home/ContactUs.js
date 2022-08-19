import emailjs from "emailjs-com";
import React, {useRef} from 'react';
import { Label} from "reactstrap";
import Img from "../commons/images/contactUs.jpg";

import Background from "../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};
export default function ContactUs() {
    const form = useRef();
    let user_id="lGbr7K6WoG4ScOobv";
    emailjs.init(user_id);

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm("service_iy1ncti", "template_8m49n7d", form.current,user_id)
            .then((result) => {
                console.log(result.text);
                alert("Message was sent successfully");
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    }

    return(

        <div className="limiter">
            <div>
                <h5 style={{color: 'rgb(16,3,10)', width:'60%',height:'10%', padding:'5px 100px',position:'relative',top:'20%',align : 'center'}}> Cluj-Napoca , Str. Alexandru Vaida Voevod</h5>
                <h5 style={{color: 'rgb(16,3,10)', width:'60%',height:'10%', padding:'5px 100px',position:'relative',top:'20%'}}> 0754584520</h5>
            </div>
            <div className="container-login100" style={backgroundStyle}>
                <div className="wrap-login100">
                    <div className="login100-pic" >
                        <br/>  <br/>   <br/>   <br/>
                        <img src={Img} alt="IMG"/>
                    </div>

                    <form onSubmit={handleSubmit} ref={form}>

                        <div className="wrap-input100 validate-input" >

                            <Label> Name: </Label>
                            <input className="input100" type="text" name="name" placeholder="Name"/>
                            <span className="focus-input100"/>
                            <span className="symbol-inputContactUs">
							            <i className="fa fa-user-circle-o" aria-hidden="true"/>
						            </span>
                        </div>

                        <div className="wrap-input100 validate-input" >
                            <Label> Email Address: </Label>
                            <input className="input100" type="text" name="email_address" placeholder="Email Address" />
                            <span className="focus-input100"/>
                            <span className="symbol-inputContactUs">
							            <i className="fa fa-envelope-o" aria-hidden="true"/>
						            </span>
                        </div>
                        <div className="wrap-input100 validate-input" >
                            <Label> Subject: </Label>
                            <input className="input100" type="text" name="subject" placeholder="Subject" />
                            <span className="focus-input100"/>
                            <span className="symbol-inputContactUs">
							            <i className="fa fa-commenting" aria-hidden="true"/>
						            </span>
                        </div>
                        <div className="wrap-input100 validate-input" >
                            <Label> Message: </Label>
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                            <span className="focus-input100"/>

                        </div>
                        <div className="container-login100-form-btn">
                            <button type="submit" className="login100-form-btn" >
                              Send Message
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}
