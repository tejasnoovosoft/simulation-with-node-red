
export class InitiateGraph {
    xAxisGap;
    yAxisGap;
    xAxisLabelGap;
    yAxisLabelGap;
    xAxisMinValue;
    xAxisMaxValue;
    yAxisMinValue;
    yAxisMaxValue
    constructor(svg,numberOfTicsOfX,numberOfTicsOfY){
        this.svg = svg;
        this.totalNumberXAxisData = numberOfTicsOfX;
        this.totalNumberYAxisData = numberOfTicsOfY;
    }

    drawAxis() {
        //X-Axis
        drawLine(this.svg, {
            x1: config.xAxisMinLimit,
            y1: config.yAxisMaxLimit,
            x2: config.xAxisMaxLimit,
            y2: config.yAxisMaxLimit,
            stroke: "black",
            strokeWidth: 1,
            strokeType: "solid"
        });

        //Y-Axis
        drawLine(this.svg, {
            x1: config.xAxisMinLimit,
            y1: config.yAxisMinLimit,
            x2: config.xAxisMinLimit,
            y2: config.yAxisMaxLimit,
            stroke: "black",
            strokeWidth: 1,
            strokeType: "solid"
        });
    }

    clearLabel(svg) {

    }

    drawXAxisTics() {
        this.xAxisGap = (config.xAxisMaxLimit - config.xAxisMinLimit) / this.totalNumberXAxisData;
        for (let idx = 1; idx <= this.totalNumberXAxisData; idx++) {
            //Axis-Tics
            drawLine(this.svg, {
                x1: config.xAxisMinLimit + (this.xAxisGap * (idx)),
                y1: config.yAxisMaxLimit,
                x2: config.xAxisMinLimit + (this.xAxisGap * (idx)),
                y2: config.yAxisMaxLimit + 5
            });
        }
    }

    drawXAxisLabel(minData,maxData) {
        this.xAxisMaxValue = maxData;
        this.xAxisMinValue = minData
        this.xAxisLabelGap = Math.ceil((this.xAxisMaxValue - this.xAxisMinValue) / this.totalNumberXAxisData);
        for(let idx = 1; idx <= this.totalNumberXAxisData; idx++) {
            drawText(this.svg, {x: (config.xAxisMinLimit - 5) + this.xAxisGap * (idx), y:config.
                    yAxisMaxLimit + 20, text: `${minData}`});
            minData += this.xAxisLabelGap;
        }
    }

    drawYAxisTics() {
        this.yAxisGap = (config.yAxisMaxLimit - config.yAxisMinLimit) / this.totalNumberYAxisData;
        for(let idx = 0; idx < this.totalNumberYAxisData; idx++) {
            drawLine(this.svg, {
                x1: config.xAxisMinLimit - 4,
                y1: config.yAxisMinLimit + this.yAxisGap * (idx),
                x2: config.xAxisMinLimit,
                y2: config.yAxisMinLimit + this.yAxisGap * (idx)
            });
        }
    }

    drawYAxisLabel(minData,maxData) {
        this.yAxisMaxValue = maxData;
        this.yAxisMinValue = minData
        this.yAxisLabelGap = Math.ceil((this.yAxisMaxValue - this.yAxisMinValue) / this.totalNumberYAxisData);
        for(let idx = 1; idx <= this.totalNumberYAxisData; idx++) {
            drawText(this.svg, {
                x: config.xAxisMinLimit - 30,
                y: (config.yAxisMaxLimit + 5) - this.yAxisGap * (idx),
                text: `${minData}`
            });
            minData += this.yAxisLabelGap;
        }
    }

    clearGraph() {
        const myNode = document.getElementById("svg3").getElementsByTagNameNS("","circle");
        myNode.remove();
    }

    plotPoints(data,color) {
        if(data.length >= 61) {
            data.forEach((ele,idx) => data[idx] = data[idx+1]);
            data.pop();
            console.log(data.length);
        }
        for(let key in data) {
            drawCircle(this.svg, {
                cx: config.xAxisMinLimit + (this.xAxisGap * (parseInt(key)+1)),
                cy: config.yAxisMinLimit + ((this.yAxisMaxValue+this.yAxisLabelGap - data[key]) / this.yAxisLabelGap) * this.yAxisGap,
                r: 3,
                fill: color,
            });
            if (key > 0) {
                drawLine(this.svg, {
                    x1: config.xAxisMinLimit + (this.xAxisGap * (parseInt(key)+1)),
                    y1: config.yAxisMinLimit + ((this.yAxisMaxValue+this.yAxisLabelGap - data[key]) / this.yAxisLabelGap) * this.yAxisGap,
                    x2: config.xAxisMinLimit + (this.xAxisGap * (parseInt(key))),
                    y2: config.yAxisMinLimit + ((this.yAxisMaxValue+this.yAxisLabelGap - data[(parseInt(key)-1)]) / this.yAxisLabelGap) * this.yAxisGap,
                    stroke: color,
                    strokeWidth: 2
                })
            }
        }
    }
}