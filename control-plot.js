const svg = document.getElementById('svg3');
function drawPlot(voltage,temperature,timeStamp) {
    const xAxisMinLimit = 40;
    const xAxisMaxLimit = 1200;
    const yAxisMinLimit = 20;
    const yAxisMaxLimit = 380;
    const xAxisGap = (xAxisMaxLimit - xAxisMinLimit) / timeStamp.length;
    const yAxisGap = (yAxisMaxLimit - yAxisMinLimit) / 10;
    const minYAxisValue = Math.min(Math.min(...temperature),Math.min(...voltage));
    const maxYAxisValue = Math.max(Math.max(...temperature),Math.max(...voltage));
    const yAxisLabelGap = Math.ceil((maxYAxisValue-minYAxisValue)/10);
    let yLabel = maxYAxisValue+yAxisLabelGap;
    function drawAxis() {
        //X-Axis
        drawLine(svg, {
            x1: xAxisMinLimit,
            y1: yAxisMaxLimit,
            x2: xAxisMaxLimit,
            y2: yAxisMaxLimit,
            stroke: "black",
            strokeWidth: 1,
            strokeType: "solid"
        });

        //Y-Axis
        drawLine(svg, {
            x1: xAxisMinLimit,
            y1: yAxisMinLimit,
            x2: xAxisMinLimit,
            y2: yAxisMaxLimit,
            stroke: "black",
            strokeWidth: 1,
            strokeType: "solid"
        });
    }

    function drawTicsAndLabel() {
        // Label and Tics for X-Axis
        let idx = 1;
        for (let key in timeStamp) {
            //Axis-Tics
            drawLine(svg, {
                x1: xAxisMinLimit + (xAxisGap * (idx)),
                y1: yAxisMaxLimit,
                x2: xAxisMinLimit + (xAxisGap * (idx)),
                y2: yAxisMaxLimit + 5
            });

            //Axis-Label
            drawText(svg, { x: (xAxisMinLimit - 3) + xAxisGap * (idx), y: yAxisMaxLimit + 20, text: `${key}` });
            idx++;
        }

        // Label and Tics for Y-Axis
        for (let i = 0; i <= temperature.length ; i++) {
            //Axis - Tics
            drawLine(svg, {
                x1: xAxisMinLimit - 4,
                y1: yAxisMinLimit + yAxisGap * (i),
                x2: xAxisMinLimit,
                y2: yAxisMinLimit + yAxisGap * (i)
            });

            // Axis-labels
            drawText(svg, {
                x: xAxisMinLimit - 30,
                y: (yAxisMinLimit + 5) + yAxisGap * (i),
                text: `${yLabel}`
            });
            yLabel -= yAxisLabelGap;
        }
    }
    function plotDotsOnGraph(dataToBePlot,color) {
        let idx = 1;
        for (let key in dataToBePlot) {
            console.log(dataToBePlot[key]);
            drawCircle(svg,  {
                cx: xAxisMinLimit + (xAxisGap * (idx)),
                cy: yAxisMinLimit + ((maxYAxisValue+yAxisLabelGap - dataToBePlot[key])/yAxisLabelGap) * yAxisGap,
                r: 3,
                fill: color,
            });
            idx += 1;
        }

    }

    function drawControlChart() {
        drawAxis();
        drawTicsAndLabel();
        plotDotsOnGraph(temperature,"green");
        plotDotsOnGraph(voltage,"red");
    }
    drawControlChart();
}