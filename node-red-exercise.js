import {initializeApp} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {ref, getDatabase,onChildAdded , orderByChild , query , limitToLast} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import {drawTemperatureAndVoltageGraph} from "/control-plot.js";

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
const voltageDataRef = ref(database, 'Voltage');
const temperatureDataRef = ref(database, 'Temperature');
const voltageData = [];
const temperatureData = [];
const timeStamp = [];
const limit = 30;

const tempQuery = (limit) => query(temperatureDataRef, orderByChild('timestamp'), limitToLast(limit));
const voltageQuery = (limit) => query(voltageDataRef , orderByChild('timestamp'), limitToLast(limit));


onChildAdded(tempQuery(limit), (data) => {
    temperatureData.push(data.val());
});
let flag = true;
onChildAdded(voltageQuery(limit), (data) => {
    voltageData.push(data.val());
    timeStamp.push(data.key);
    drawTemperatureAndVoltageGraph(temperatureData, voltageData, timeStamp, flag);
    // Flag is for initiative step if flag is true then we first draw axis and tics also in graph
    flag = false;
});


