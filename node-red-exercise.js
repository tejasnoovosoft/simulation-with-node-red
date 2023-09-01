import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { ref , getDatabase , onValue , onChildAdded } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import {
    drawTemperatureAndVoltageGraph,
    drawTemperatureAveragePointsGraph,
    drawVoltageAveragePointsGraph
} from "/control-plot.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzi_YhUl1IVZYDbxeYrxuQnSmIHOTlpdE",
    authDomain: "node-red-noovoso.firebaseapp.com",
    databaseURL: "https://node-red-noovoso-default-rtdb.firebaseio.com",
    projectId: "node-red-noovoso",
    storageBucket: "node-red-noovoso.appspot.com",
    messagingSenderId: "862897712000",
    appId: "1:862897712000:web:bb00af9a4420f8ccba6f65"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const voltageDataRef = ref(database,'Voltage');
const temperatureDataRef = ref(database,'Temperature');
const voltageData = [];
const temperatureData = [];
const timeStamp = [];

onChildAdded(temperatureDataRef,(data) => {
    temperatureData.push(data.val());
});
let flag = true;
onChildAdded(voltageDataRef , (data) => {
    voltageData.push(data.val());
    timeStamp.push(data.key);
    drawTemperatureAndVoltageGraph(temperatureData,voltageData,timeStamp,flag);

    // Average of Points after every 5 Second when new points add into firebase
    setTimeout(drawVoltageAveragePointsGraph(voltageData,timeStamp,flag),5000);
    setTimeout(drawTemperatureAveragePointsGraph(temperatureData,timeStamp,flag),5000);

    // Flag is for initiative step if flag is true then we first draw axis and tics also in graph
    flag = false;
});

// let promiseForTemp,promiseForVoltage;
// onChildAdded(temperatureDataRef,(data)=>{
//     promiseForTemp = new Promise(function (res , rej){
//         res(temperatureData.push(data.val()));
//     });
// });
// onChildAdded(voltageDataRef,(data)=>{
//     promiseForVoltage = new Promise(function (res , rej){
//         res([voltageData.push(data.val()),timeStamp.push(data.key)]);
//     });
//     promiseForTemp.then(function (value){
//         promiseForVoltage.then( function (value) {
//             drawTemperatureAndVoltageGraph(temperatureData,voltageData,timeStamp,flag);
//             drawVoltageAveragePointsGraph(voltageData,timeStamp,flag);
//             drawTemperatureAveragePointsGraph(temperatureData,timeStamp,flag);
//             flag = false;
//         },function (err){});
//     },function (err){});
// });

