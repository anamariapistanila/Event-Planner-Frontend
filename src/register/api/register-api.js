import {HOST} from '../../commons/hosts'
import RestApiClient from '../../commons/api/rest-client'

const endpoint = {
  users: '/users',
  registerClient: '/registerClient',
  registerPlanner: '/registerPlanner',
    registerAdmin: '/registerAdmin'
};
function postAdmin(userAdmin, callback){
    let request = new Request(HOST.backend_api + endpoint.users + endpoint.registerAdmin , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAdmin)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequestRegister(request, callback);
}
function postClient(userClient, callback){
    let request = new Request(HOST.backend_api + endpoint.users + endpoint.registerClient , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userClient)
    });

    console.log("URL: " + request.url);

   RestApiClient.performRequestRegister(request, callback);

}



function postPlanner(userPlanner, callback){
    let request = new Request(HOST.backend_api + endpoint.users + endpoint.registerPlanner , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPlanner)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequestRegister(request, callback);
}

export{
    postClient,
    postPlanner,
    postAdmin
}