import {InitiateGraph} from "/initial-graph.js";

// All the svg Tags
const svg3 = document.getElementById('svg3');
const svg4 = document.getElementById('svg4');
const svg5 = document.getElementById('svg5');

// Objects for plotting Graph
const voltageAndTemperatureDataObj = new InitiateGraph(svg3, 30, 12);
const averageOfVoltage = new InitiateGraph(svg4, 30, 12);
const averageOfTemperature = new InitiateGraph(svg5, 30, 12);

function drawLayoutOfGraph(currObject) {
    currObject.drawAxis();
    currObject.drawXAxisTics();
    currObject.drawYAxisTics();
}

function updateLabel(currObject, minYAxisData, maxYAxisData, minXAxisData, maxXAxisData, timestamp) {
    currObject.drawYAxisLabel(minYAxisData, maxYAxisData);
    currObject.drawXAxisLabel(timestamp.slice(-30), 1, 30);
}

function countAverage(data) {
    const avgVoltage = [];
    let count = 0;
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i];
        count++;
        if (count === 5) {
            avgVoltage.push(sum / 5);
            sum = 0;
            count = 0;
        }
    }
    return avgVoltage;
}

function createNewTimeStamp(time) {
    const newTimeStamp = [];
    let count = 0;
    for (let i = 0; i < time.length; i++) {
        count++;
        if (count === 5) {
            newTimeStamp.push(time[i]);
            count = 0;
        }
    }
    return newTimeStamp
}

export function drawTemperatureAndVoltageGraph(temperature, voltage, timestamp, flag) {

    // Flag to check for graph's axis and tics are already made or not
    if (flag) {
        drawLayoutOfGraph(voltageAndTemperatureDataObj);
        drawLayoutOfGraph(averageOfTemperature);
        drawLayoutOfGraph(averageOfVoltage);
    }

    // Voltage and Temperature
    const minData = Math.min(Math.min(...temperature), Math.min(...voltage));
    const maxData = Math.max(Math.max(...temperature), Math.max(...voltage));
    updateLabel(voltageAndTemperatureDataObj, minData, maxData, 1, 30, timestamp);
    voltageAndTemperatureDataObj.plotPoints(temperature.slice(-30), "green");
    voltageAndTemperatureDataObj.plotPoints(voltage.slice(-30), "red");

    const newTimeStamp = createNewTimeStamp(timestamp);

    // Voltage's Average
    const averageVoltage = countAverage(voltage);
    updateLabel(averageOfVoltage, Math.floor(Math.min(...averageVoltage)),
        Math.ceil(Math.max(...averageVoltage)),
        1, 30, newTimeStamp);
    averageOfVoltage.plotPoints(averageVoltage.slice(-30), "purple");

    // Temperature's Average
    const averageTemperature = countAverage(temperature);
    updateLabel(averageOfTemperature, Math.floor(Math.min(...averageTemperature)),
        Math.ceil(Math.max(...averageTemperature)),
        1, 30, newTimeStamp);
    averageOfTemperature.plotPoints(averageTemperature.slice(-30), "blue");
}
