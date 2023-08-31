import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { ref , getDatabase , onValue , onChildAdded } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import {drawAveragePointsGraph, drawTemperatureAndVoltageGraph} from "/control-plot.js";

const firebaseConfig = {
    apiKey: "AIzaSyBVpZ4l6gzYc1GDcH4F7jIJqtUQ7m_AM7A",
    authDomain: "node-red-exercise.firebaseapp.com",
    databaseURL: "https://node-red-exercise-default-rtdb.firebaseio.com",
    projectId: "node-red-exercise",
    storageBucket: "node-red-exercise.appspot.com",
    messagingSenderId: "1049851901020",
    appId: "1:1049851901020:web:98e79dc1401493a9b26299",
    measurementId: "G-MD190Q7EE8"
};
const svg4 = document.getElementById('svg4');
const svg5 = document.getElementById('svg5');
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef = ref(database,'data');
const tempDataRef = ref(database,'data/temperature');
const voltageDataRef = ref(database,'data/voltage');
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

onChildAdded(tempDataRef,(data) => {
    temperatureData.push(data.val());
    drawAveragePointsGraph(svg4,temperatureData);
});

onChildAdded(voltageDataRef , (data) => {
    voltageData.push(data.val());
    drawTemperatureAndVoltageGraph(temperatureData.slice(-60),voltageData.slice(-60),timeStamp);
    drawAveragePointsGraph(svg5,voltageData);
});

