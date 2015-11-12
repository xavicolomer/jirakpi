import AreaChart from './area-chart.es6';

class Init {
    constructor() {
        this.init();
    }

    onClickOnMenuItem(event) {
        $('.menu-item.is-active').removeClass('is-active');
        let id = $(event.currentTarget).attr('data-graph-id');
        $(event.currentTarget).addClass('is-active');
        let chart = new AreaChart(window.data, id);
        chart.draw('.column.graph');
        
    }

    addEventListeners() {
        $(document).on('click', '.menu-item', this.onClickOnMenuItem);
    }

    init() {
        this.buildMenu();
        this.addEventListeners();
        $('.menu-item').first().click();
    }

    buildMenu() {
        for (let key in window.data) {
            let info = window.data[key];
            let $menuItem = $('<li>').addClass('menu-item').attr('data-graph-id', key).text(info['title']);
            $('.main-menu').append($menuItem);
        }
    }
}

$(document).ready(function(){
    new Init();
});

