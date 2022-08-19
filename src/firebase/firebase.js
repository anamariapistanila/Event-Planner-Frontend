import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDAHgsIRUFm3BQ3sgeeE3KEf3Pda5G8Sm8",
    authDomain: "event-planner-2a7d0.firebaseapp.com",
    projectId: "event-planner-2a7d0",
    storageBucket: "event-planner-2a7d0.appspot.com",
    messagingSenderId: "516674971966",
    appId: "1:516674971966:web:f623fb1915d7c948bbe46f"
};

const app=initializeApp(firebaseConfig);
const storage = getStorage(app);
export  {storage
}