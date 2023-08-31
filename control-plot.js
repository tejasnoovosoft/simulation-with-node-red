import { InitiateGraph } from "/initial-graph.js";

const svg = document.getElementById('svg3');
const firstGraphObj = new InitiateGraph(svg,60,12);
firstGraphObj.drawAxis();
firstGraphObj.drawXAxisTics();
firstGraphObj.drawXAxisLabel(1,60);
firstGraphObj.drawYAxisTics();
firstGraphObj.drawYAxisLabel(10,50);
export function drawTemperatureAndVoltageGraph(temperature,voltage,timestamp) {
    firstGraphObj.plotPoints(temperature,"green");
    firstGraphObj.plotPoints(voltage,"red");
}