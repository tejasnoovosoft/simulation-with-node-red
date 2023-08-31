import { InitiateGraph } from "/initial-graph.js";

const svg = document.getElementById('svg3');

function clearGraph(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}
export function drawTemperatureAndVoltageGraph(temperature,voltage,timestamp) {
    clearGraph(svg);
    const firstGraphObj = new InitiateGraph(svg,60,12);
    firstGraphObj.drawAxis();
    firstGraphObj.drawXAxisTics();
    firstGraphObj.drawXAxisLabel(1,60);
    firstGraphObj.drawYAxisTics();
    firstGraphObj.drawYAxisLabel(10,50);
    firstGraphObj.plotPoints(temperature,"green");
    firstGraphObj.plotPoints(voltage,"red");
}

export function drawAveragePointsGraph(svg , data) {
    clearGraph(svg);
    const secondGraphObj = new InitiateGraph(svg,60,12);
    secondGraphObj.drawAxis();
    secondGraphObj.drawXAxisTics();
    secondGraphObj.drawYAxisTics();
    secondGraphObj.drawXAxisLabel(1,60);
    const a = [];
    let count = 0;
    let sum = 0;
    for(let i=0;i<data.length;i++) {
        sum += data[i];
        count++;
        if(count === 5) {
            a.push(sum/5);
            sum = 0;
            count = 0;
        }
    }
    secondGraphObj.drawYAxisLabel(Math.floor(Math.min(...a)),Math.ceil(Math.max(...a)));
    secondGraphObj.plotPoints(a.slice(-60),"blue");
}