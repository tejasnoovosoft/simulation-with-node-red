import { InitiateGraph } from "/initial-graph.js";
const svg3 = document.getElementById('svg3');
const svg4 = document.getElementById('svg4');
const svg5 = document.getElementById('svg5');

const voltageAndTemperatureDataObj = new InitiateGraph(svg3,30,12);
const averageOfVoltage = new InitiateGraph(svg4,30,12);
const averageOfTemperature = new InitiateGraph(svg5,30,12);
export function drawTemperatureAndVoltageGraph(temperature , voltage , timestamp , flag) {
    if(flag) {
        voltageAndTemperatureDataObj.drawAxis();
        voltageAndTemperatureDataObj.drawXAxisTics();
        voltageAndTemperatureDataObj.drawYAxisTics();
    }
    const minData = Math.min(Math.min(...temperature),Math.min(...voltage));
    const maxData = Math.max(Math.max(...temperature),Math.max(...voltage));
    voltageAndTemperatureDataObj.drawYAxisLabel(minData,maxData);
    voltageAndTemperatureDataObj.drawXAxisLabel(timestamp.slice(-30),1,30);
    voltageAndTemperatureDataObj.plotPoints(temperature.slice(-30),"green");
    voltageAndTemperatureDataObj.plotPoints(voltage.slice(-30),"red");
}
export function drawVoltageAveragePointsGraph(voltage , timestamp , flag) {
    if(flag) {
        averageOfVoltage.drawAxis();
        averageOfVoltage.drawXAxisTics();
        averageOfVoltage.drawYAxisTics();
    }
    const avgVoltage = [];
    const newTimeStamp = [];
    let count = 0;
    let sum = 0;
    for(let i=0;i<voltage.length;i++) {
        sum += voltage[i];
        count++;
        if(count === 5) {
            newTimeStamp.push(timestamp[i]);
            avgVoltage.push(sum/5);
            sum = 0;
            count = 0;
        }
    }
    averageOfVoltage.drawYAxisLabel(Math.floor(Math.min(...avgVoltage)),Math.ceil(Math.max(...avgVoltage)));
    averageOfVoltage.drawXAxisLabel(newTimeStamp.slice(-30),1,30);
    averageOfVoltage.plotPoints(avgVoltage.slice(-30),"blue");
}

export function drawTemperatureAveragePointsGraph(temperature , timestamp , flag) {
    if(flag) {
        averageOfTemperature.drawAxis();
        averageOfTemperature.drawXAxisTics();
        averageOfTemperature.drawYAxisTics();
    }
    const avgTemperature = [];
    const newTimeStamp = [];
    let count = 0;
    let sum = 0;
    for(let i=0;i<temperature.length;i++) {
        sum += temperature[i];
        count++;
        if(count === 5) {
            newTimeStamp.push(timestamp[i]);
            avgTemperature.push(sum/5);
            sum = 0;
            count = 0;
        }
    }
    averageOfTemperature.drawXAxisLabel(newTimeStamp.slice(-30),1,30);
    averageOfTemperature.drawYAxisLabel(Math.floor(Math.min(...avgTemperature)),Math.ceil(Math.max(...avgTemperature)));
    averageOfTemperature.plotPoints(avgTemperature.slice(-30),"purple");
}