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


const api_url = "https://node-red-exercise-default-rtdb.firebaseio.com/temperature"
async function fetchData(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}

let voltage = [];
let temperature = [];
let timeStamp = [];

let myPromise = new Promise(function(myResolve, myReject) {
    // "Producing Code" (May take some time)
    onValue(temperatureRef, (snapshot) => {
        const data = snapshot.val();
        timeStamp = Object.keys(data);
        temperature = Object.values(data);
    });
    onValue(voltageRef, (snapshot) => {
        const data = snapshot.val();
        voltage = Object.values(data);
    });

    myResolve(); // when successful
    myReject();  // when error
});

myPromise.then(
    function(value) {
        console.log(voltage);
        console.log(temperature); },
    function(error) { /* code if some error */ }
);
// setTimeout( () => {
// },2000);










