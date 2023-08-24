// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dataRef = ref(db, 'data');

let voltage = [];
let temperature = [];
let timeStamp = [];

function clearGraph() {
    const myNode = document.getElementById("svg3");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}

onValue(dataRef, (snapshot) => {
    voltage = [];
    timeStamp = [];
    temperature = [];
    const FetchData = snapshot.val();
    const voltageData = FetchData.voltage;
    const tempData = FetchData.temperature;
    for (let key in voltageData) {
        timeStamp.push(key);
        voltage.push(voltageData[key]);
    }
    temperature = [];
    for (let key in tempData) {
        temperature.push(tempData[key]);
    }
    clearGraph();
    drawPlot(voltage, temperature, timeStamp);
});



