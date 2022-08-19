import React, { useState } from 'react';
import Header from './HeaderFaq';
import FAQ from './FAQ';
import '../commons/styles/FAQ.css';
import Background from "../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};

function FAQApp () {

    const [faqs, setfaqs] = useState([
        {
            question: 'Why do I need an event planning?',
            answer: 'An experienced event planner saves you time and money.We will supply reputable suppliers and vendors, negotiate the best rates, discounts, terms and conditions on your behalf and coordinate ' +
                'all aspects of your event. Using an event planner takes away stress and worry, and gives you peace of mind to enjoy your event.',
            open: false
        },
        {
            question: 'What services do you offer?',
            answer: 'We’re able to find venues, organise catering, décor, accommodation, staffing, equipment and even hire speakers for corporate events. We offer a tailor made service to fit your requirements. Every event is unique and we have the capacity to fulfill your requirements from start to finish',
            open: false
        },
        {
            question: 'What are your fees?',
            answer: 'We will discuss all your event requirements before giving a quotation as obviously fees charged will depend on the scale and nature of the event, complexity of planning and our level of involvement. We’ll keep in contact with you regarding our time, hours spent, and liaise with you on specific items, but we’ll also work to your budget and plan accordingly. You’ll never be charged more than we agree upon and there will be no hidden extras or surprises.',
            open: false
        },
        {
            question: 'What factors do you consider when selecting a venue?',
            answer: 'We consider the size and capacity of venue needed for the number of guests, facilities provided, parking, technical needs and budget constraints. We visit venues to check on the quality of the facilities and liaise with clients, keeping them informed of decisions made.',
            open: false
        },
        {
            question: 'What are your areas of expertise?',
            answer: ' We work from start to finish on both commercial and personal events. These can be: birthday celebrations, weddings, anniversary events, baptisms, welcome parties. We have worked in all business sectors and are happy to provide references and testimonials.',
            open: false
        }
    ]);

    const toggleFAQ = index => {
        setfaqs(faqs.map((faq, i) => {
            if (i === index) {
                faq.open = !faq.open
            } else {
                faq.open = false;
            }

            return faq;
        }))
    }


    return (
        <div className="App" style={backgroundStyle}>
            <Header />
            <div className="faqs">
                {faqs.map((faq, i) => (
                    <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
                ))}
            </div>
        </div>
    );
}

export default FAQApp;