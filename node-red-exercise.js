import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { ref , getDatabase , onValue , onChildAdded } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import {drawTemperatureAndVoltageGraph} from "/control-plot.js";

const firebaseConfig = {
    apiKey: "AIzaSyAzi_YhUl1IVZYDbxeYrxuQnSmIHOTlpdE",
    authDomain: "node-red-noovoso.firebaseapp.com",
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

onValue(voltageDataRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        voltageData.push(childSnapshot.val());
    });
}, {
    onlyOnce: true
});
onValue(temperatureDataRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        temperatureData.push(childSnapshot.val());
        timeStamp.push(childSnapshot.key);
    });
    drawTemperatureAndVoltageGraph(temperatureData,voltageData,timeStamp);
}, {
    onlyOnce: true
});

let promiseForTemp,promiseForVoltage;
onChildAdded(temperatureDataRef,(data)=>{
    promiseForTemp = new Promise(function (res , rej){
        res(data.val());
    });
});

onChildAdded(voltageDataRef,(data)=>{
    promiseForVoltage = new Promise(function (res , rej){
        res(data.val());
    });
    promiseForTemp.then(function (value){
        temperatureData.push(value);
        promiseForVoltage.then( function (value) {
            voltageData.push(value)
            drawTemperatureAndVoltageGraph(temperatureData,voltageData);
        },function (err){});
    },function (err){});
});