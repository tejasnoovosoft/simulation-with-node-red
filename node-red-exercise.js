import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { ref , getDatabase , onValue , onChildAdded } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import {drawAveragePointsGraph, drawTemperatureAndVoltageGraph} from "/control-plot.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzi_YhUl1IVZYDbxeYrxuQnSmIHOTlpdE",
    authDomain: "node-red-noovoso.firebaseapp.com",
    databaseURL: "https://node-red-noovoso-default-rtdb.firebaseio.com",
    projectId: "node-red-noovoso",
    storageBucket: "node-red-noovoso.appspot.com",
    messagingSenderId: "862897712000",
    appId: "1:862897712000:web:bb00af9a4420f8ccba6f65"
};


const svg4 = document.getElementById('svg4');
const svg5 = document.getElementById('svg5');
const svg3 = document.getElementById('svg3');
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const voltageDataRef = ref(database,'Voltage');
const temperatureDataRef = ref(database,'Temperature');
const voltageData = [];
const temperatureData = [];
const timeStamp = [];

// onValue(dataRef, (snapshot) => {
//     const FetchData = snapshot.val();
//     const voltage = FetchData.voltage;
//     const tempData = FetchData.temperature;
//     for (let key in voltage) {
//         timeStamp.push(key);
//         voltageData.push(voltage[key]);
//     }
//     for (let key in tempData) {
//         temperatureData.push(tempData[key]);
//     }
//     // drawTemperatureAndVoltageGraph(temperatureData.slice(-60),voltageData.slice(-60),timeStamp);
//     drawAveragePointsGraph(svg4,temperatureData);
//     // drawAveragePointsGraph(svg5,voltageData);
// },{
//     onlyOnce: true
// });


onChildAdded(temperatureDataRef,(data) => {
    temperatureData.push(data.val());
    drawTemperatureAndVoltageGraph(svg3,temperatureData.slice(-60),"green");
    drawAveragePointsGraph(svg4,temperatureData,"blue");
});

onChildAdded(voltageDataRef , (data) => {
    voltageData.push(data.val());
    drawTemperatureAndVoltageGraph(svg3,voltageData.slice(-60),"red");
    drawAveragePointsGraph(svg5,voltageData,"purple");
});

