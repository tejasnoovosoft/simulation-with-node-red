
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


    drawXAxisTics() {
        this.xAxisGap = (config.xAxisMaxLimit - config.xAxisMinLimit) / this.totalNumberXAxisData;
        for (let idx = 1; idx <= this.totalNumberXAxisData; idx++) {
            //Axis-Tics
            drawLine(this.svg, {
                x1: config.xAxisMinLimit + (this.xAxisGap * (idx)),
                y1: config.yAxisMaxLimit,
                x2: config.xAxisMinLimit + (this.xAxisGap * (idx)),
                y2: config.yAxisMaxLimit + 5,
            });
        }
    }

    drawXAxisLabel(timeStamp,maxData,minData) {
        this.xAxisMaxValue = maxData;
        this.xAxisMinValue = minData
        this.xAxisLabelGap = Math.ceil((this.xAxisMaxValue - this.xAxisMinValue) / this.totalNumberXAxisData);
        for(let idx = 1; idx <= this.totalNumberXAxisData; idx++) {
            const element  = document.getElementById(`${this.svg.id}-X-Label-${idx}`);
            if(element){
                element.remove();
            }
            const dt = new Date(parseInt(timeStamp[idx-1]));
            drawText(this.svg, {
                x: (config.xAxisMinLimit - 15) + this.xAxisGap * (idx),
                y:config.yAxisMaxLimit + 20,
                text: `${dt.getMinutes()}:${dt.getSeconds()}`,
                id: `${this.svg.id}-X-Label-${idx}`
            });
            minData += this.xAxisLabelGap;
        }
    }

    drawYAxisTics() {
        this.yAxisGap = (config.yAxisMaxLimit - config.yAxisMinLimit) / this.totalNumberYAxisData;
        for(let idx = 0; idx < this.totalNumberYAxisData; idx++) {
            drawLine(this.svg, {
                x1: config.xAxisMinLimit - 4,
                y1: config.yAxisMaxLimit - (this.yAxisGap * (idx+1)),
                x2: config.xAxisMinLimit,
                y2: config.yAxisMaxLimit - (this.yAxisGap * (idx+1)),
            });
        }
    }

    drawYAxisLabel(minData,maxData) {
        this.yAxisMaxValue = maxData;
        this.yAxisMinValue = minData
        this.yAxisLabelGap = Math.ceil((this.yAxisMaxValue - this.yAxisMinValue) / this.totalNumberYAxisData);

        for(let idx = 1; idx <= this.totalNumberYAxisData; idx++) {
            const element  = document.getElementById(`${this.svg.id}-Y-Label-${idx}`);
            if(element){
                element.remove();
            }
            drawText(this.svg, {
                x: config.xAxisMinLimit - 30,
                y: (config.yAxisMaxLimit + 5) - this.yAxisGap * (idx),
                text: `${minData}`,
                id: `${this.svg.id}-Y-Label-${idx}`
            });
            minData += this.yAxisLabelGap;
        }
    }

    plotPoints(data,color) {
        for(let key in data) {
            const x = config.xAxisMinLimit + (this.xAxisGap * (parseInt(key)+1));
            const y = config.yAxisMaxLimit - (this.yAxisGap * ((data[key] - this.yAxisMinValue)/(this.yAxisLabelGap)+1));
            const element = document.getElementById(`${color} ${key}`);
            if(element){
                element.remove();
            }
                drawCircle(this.svg, {
                    cx: x,
                    cy: y,
                    r: 3,
                    fill: color,
                    id : `${color} ${key}`
                });
            if (key > 0) {
                const element  = document.getElementById(`Line ${color} ${key}`);
                if(element){
                    element.remove();
                }
                drawLine(this.svg, {
                    x1: x,
                    y1: y,
                    x2: config.xAxisMinLimit + (this.xAxisGap * (parseInt(key))),
                    y2: config.yAxisMaxLimit - (this.yAxisGap * ((data[parseInt(key)-1] - this.yAxisMinValue)/(this.yAxisLabelGap)+1)),
                    stroke: color,
                    strokeWidth: 2,
                    id : `Line ${color} ${key}`
                })
            }
        }
    }
}