import Chart from './chart.es6';
import c from './classes.es6';
import graphChartTemplate from '../templates/area-chart-view.jade';
import tableTemplate from '../templates/table-view.jade';

class AreaChart extends Chart {
    constructor(data, id, keys) {
        super(data, id);  
 
        this.data = data;
        this.id = id;
        this.numAreas = 0;

        this.HEIGHT = 600;
        this.WIDTH = $('svg').width();
        this.MARGINS = {
                top: 20,
                right: 20, 
                bottom: 20,
                left: 25
            }
    }

    onClickOnToggler(event) {
        if ($(event.currentTarget).hasClass('.is-active')) { 
            return;
        }

        $('.graph-toggle.is-active').removeClass('is-active');
        $(event.currentTarget).addClass('is-active');

        if ($(event.currentTarget).hasClass('graph-toggle--graph')) {
            $('.graph-svg').removeClass('is-hidden');
            $('.graph-table').addClass('is-hidden');
        } else {
            $('.graph-svg').addClass('is-hidden');
            $('.graph-table').removeClass('is-hidden');
        }
    }

    addEventListeners() {
        $(document).on('click', '.graph-toggle', this.onClickOnToggler);
    }

    drawTable($element) {
        let id = this.id;
        var info = data[this.id];
        let keys = window.data[id].views;
        $($element).append(tableTemplate({data: info['data'], keys: keys}));
    }

    draw($element) {
        let id = this.id;
        let keys = this.keys = window.data[id].views;
        var info = data[this.id],
            xAxis,
            yAxis;
        
        $($element).html(graphChartTemplate({info: info, id: this.id}));
        this.WIDTH = $('svg').width();
        var vis = d3.select("#" + id);

        var labels = []
        info.data.map(function(obj) { 
            labels.push(obj.sprint.split(" ")[1]); 
        });

        this.xScale = d3.scale.ordinal()
                .domain(labels)
                .rangeRoundBands([this.MARGINS.left, this.WIDTH - this.MARGINS.right]);

        var max = 0;
        for (var key in window.data[this.id].data) {
            max = Math.max(window.data[this.id].data[key][keys[0]], max);
            max = Math.max(window.data[this.id].data[key][keys[1]], max); 
        }

        this.yScale = d3.scale.linear().range([this.HEIGHT - this.MARGINS.top, this.MARGINS.bottom]).domain([0, max]);
        
        xAxis = d3.svg.axis()
            .scale(this.xScale)
            .tickSize(0)
            .innerTickSize(-this.HEIGHT) 
            .orient("bottom");
      
        yAxis = d3.svg.axis()
            .scale(this.yScale)
            .tickSize(0)
            .innerTickSize(-this.WIDTH + 230)
            .tickFormat((d) => d === this.yScale.domain()[0] ? '' : d)
            .orient("left");

        vis.attr('width', this.WIDTH);
        vis.attr('height', this.HEIGHT);

        vis.append("svg:g")
            .attr("transform", "translate(-25," + (this.HEIGHT - this.MARGINS.bottom) + ")")
            .attr("class", "yaxis")
            .call(xAxis)
            .selectAll(".tick text")
                .style("text-anchor", "start")
                .attr("x", -70)
                .attr("y", 6);

        vis.selectAll(".tick line")
            .attr("transform", "translate(-66, 0)")
            .attr("class", "yaxis-line")
            

        vis.append("svg:g")
            .attr("transform", "translate(" + (this.MARGINS.left) + ", 0)")
            .call(yAxis)
            .selectAll(".tick text")
            .style("text-anchor", "end")
            .attr("class", "xaxis")
            .attr("x", -5)
               

        var tsv = data[this.id]['data']; 
        for (let key in keys) {
            this.drawArea(vis, tsv, labels)
        }

        this.drawLegend();
        this.drawTable($element);
        this.addEventListeners();
    }

    drawArea(graph, data, labels) {
        let newArea = d3.svg.area(),
            count = 0;

        newArea.x((d) =>this.xScale(labels[count++]))
            .y0(this.HEIGHT-this.MARGINS.bottom)
            .y1((d) => this.yScale(d[this.keys[this.numAreas]]))
            .interpolate("basis");
        
        graph.append('svg:path')
            .attr('d', newArea(data))
            .attr("class", "area area-" + this.numAreas);

        this.numAreas++;
    }

    drawLegend() {
        let $legend = $('<div>').addClass('graph-legend-items'),
            count = 0;
        for (var key in this.keys) {
            let $bullet = $('<div>').addClass('graph-legend-bullet area-' + count++);
            let $item = $('<div>').addClass('graph-legend-item').html(this.keys[key]);
            $legend.append($bullet, $item);
        }

        $('.graph-legend').append($legend);

    }
}

module.exports = AreaChart;