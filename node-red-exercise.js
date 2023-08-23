// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
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
const voltageRef = ref(db, 'voltage');
const temperatureRef = ref(db, 'temperature');

let voltage = [];
let temperature = [];
let timeStamp = [];

onValue(voltageRef, (snapshot) => {
    const FetchData = snapshot.val();
    for(let key in FetchData) {
        timeStamp.push(key);
        voltage.push(FetchData[key]);
    }
});



onValue(temperatureRef, (snapshot) => {
    const FetchData = snapshot.val();
    for(let key in FetchData) {
        temperature.push(FetchData[key]);
    }
    drawPlot(voltage,temperature,timeStamp);
});