import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import ImageTable from "../home/table.jpg";

ChartJS.register(ArcElement, Tooltip, Legend);
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${ImageTable})`,
};
function PieChartEvents(){
    const [events, setEvents] = useState([]);
    const locations = []
    let withoutDuplicates=[];
    let number = [];
    const counts = {};
    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get('http://localhost:8080/ourWork/getOurWork', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }     })

            setEvents(data);
            console.log(data);


        }
        fetching();


    }, []);
    function  nr_locations(){


    events.forEach((data) => {
        locations.push(data.location);
    })
        withoutDuplicates = [...new Set(locations)];

        return withoutDuplicates;}

function count(){
        for (const num of locations) {
            counts[num] = counts[num] ? counts[num] + 1 : 1;

        }
    for (const num of Object.keys(counts)) {
        const value = counts[num];
        number.push(value);
        console.log(value);
    }


return number;
    }

    const data = {

        labels: nr_locations(),
        datasets: [
            {
                label: '# of Votes',
                data: count(),
                backgroundColor: [
                    'rgba(99,125,255,0.2)',
                    'rgb(230,190,138)',
                    'rgba(212,100,237,0.7)',

                ],
                borderColor: [
                    'rgb(138,159,230)',
                    'rgb(230,190,138)',
                    'rgba(212,100,237,0.7)',

                ],
                borderWidth: 1,
            },
        ],
    }


return(  <div style={backgroundStyle} >
    <div >
        <h5 style={{color: 'rgb(16,3,10)', width:'60%',height:'10%', padding:'5px 100px',position:'relative',top:'20%',align : 'center'}}>The number of events organized in each location</h5>

    </div>
<div style={{width: '40%', height: '40%'}}>
<Doughnut data={data} />
</div>
</div>);}

export default PieChartEvents;
