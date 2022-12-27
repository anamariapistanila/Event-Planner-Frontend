import {HOST} from '../../commons/hosts'
import RestApiClient from '../../commons/api/rest-client'

const endpoint = {
    details: '/detailsEvent',
    addDetails: '/addDetailsEvent'


};



function addDetailsEv(details, callback){
    let request = new Request(HOST.backend_api + endpoint.details + endpoint.addDetails, {
        method: 'POST',
        headers : {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(details)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequestText(request, callback);
}


export{
    addDetailsEv
}