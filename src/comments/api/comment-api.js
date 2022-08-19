import {HOST} from '../../commons/hosts'
import RestApiClient from '../../commons/api/rest-client'

const endpoint = {
    comment: '/comm',
    addComment:'/addCommentClient',
    getComm: '/getAllComments'

};


function getComments(callback) {
    let request = new Request(HOST.backend_api + endpoint.comment + endpoint.getComm, {
        method: 'GET',

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function addCommClient(comm, callback){
    let request = new Request(HOST.backend_api + endpoint.comment + endpoint.addComment , {
        method: 'POST',
        headers : {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comm)

    });

    console.log(JSON.stringify(comm))
    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}



export{
    getComments,
    addCommClient
}