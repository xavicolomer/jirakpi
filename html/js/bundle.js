/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _areaChart = __webpack_require__(1);
	
	var _areaChart2 = _interopRequireDefault(_areaChart);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Init = (function () {
	    function Init() {
	        _classCallCheck(this, Init);
	
	        this.init();
	    }
	
	    _createClass(Init, [{
	        key: 'onClickOnMenuItem',
	        value: function onClickOnMenuItem(event) {
	            $('.menu-item.is-active').removeClass('is-active');
	            var id = $(event.currentTarget).attr('data-graph-id');
	            $(event.currentTarget).addClass('is-active');
	            var chart = new _areaChart2.default(window.data, id);
	            chart.draw('.column.graph');
	        }
	    }, {
	        key: 'addEventListeners',
	        value: function addEventListeners() {
	            $(document).on('click', '.menu-item', this.onClickOnMenuItem);
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            this.buildMenu();
	            this.addEventListeners();
	            $('.menu-item').first().click();
	        }
	    }, {
	        key: 'buildMenu',
	        value: function buildMenu() {
	            for (var key in window.data) {
	                var info = window.data[key];
	                var $menuItem = $('<li>').addClass('menu-item').attr('data-graph-id', key).text(info['title']);
	                $('.main-menu').append($menuItem);
	            }
	        }
	    }]);
	
	    return Init;
	})();
	
	$(document).ready(function () {
	    new Init();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _chart = __webpack_require__(2);
	
	var _chart2 = _interopRequireDefault(_chart);
	
	var _classes = __webpack_require__(3);
	
	var _classes2 = _interopRequireDefault(_classes);
	
	var _areaChartView = __webpack_require__(4);
	
	var _areaChartView2 = _interopRequireDefault(_areaChartView);
	
	var _tableView = __webpack_require__(7);
	
	var _tableView2 = _interopRequireDefault(_tableView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AreaChart = (function (_Chart) {
	    _inherits(AreaChart, _Chart);
	
	    function AreaChart(data, id, keys) {
	        _classCallCheck(this, AreaChart);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AreaChart).call(this, data, id));
	
	        _this.data = data;
	        _this.id = id;
	        _this.numAreas = 0;
	
	        _this.HEIGHT = 600;
	        _this.WIDTH = $('svg').width();
	        _this.MARGINS = {
	            top: 20,
	            right: 20,
	            bottom: 20,
	            left: 25
	        };
	        return _this;
	    }
	
	    _createClass(AreaChart, [{
	        key: 'onClickOnToggler',
	        value: function onClickOnToggler(event) {
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
	    }, {
	        key: 'addEventListeners',
	        value: function addEventListeners() {
	            $(document).on('click', '.graph-toggle', this.onClickOnToggler);
	        }
	    }, {
	        key: 'drawTable',
	        value: function drawTable($element) {
	            var id = this.id;
	            var info = data[this.id];
	            var keys = window.data[id].views;
	            $($element).append((0, _tableView2.default)({ data: info['data'], keys: keys }));
	        }
	    }, {
	        key: 'draw',
	        value: function draw($element) {
	            var _this2 = this;
	
	            var id = this.id;
	            var keys = this.keys = window.data[id].views;
	            var info = data[this.id],
	                xAxis,
	                yAxis;
	
	            $($element).html((0, _areaChartView2.default)({ info: info, id: this.id }));
	            this.WIDTH = $('svg').width();
	            var vis = d3.select("#" + id);
	
	            var labels = [];
	            info.data.map(function (obj) {
	                labels.push(obj.sprint.split(" ")[1]);
	            });
	
	            this.xScale = d3.scale.ordinal().domain(labels).rangeRoundBands([this.MARGINS.left, this.WIDTH - this.MARGINS.right]);
	
	            var max = 0;
	            for (var key in window.data[this.id].data) {
	                max = Math.max(window.data[this.id].data[key][keys[0]], max);
	                max = Math.max(window.data[this.id].data[key][keys[1]], max);
	            }
	
	            this.yScale = d3.scale.linear().range([this.HEIGHT - this.MARGINS.top, this.MARGINS.bottom]).domain([0, max]);
	
	            xAxis = d3.svg.axis().scale(this.xScale).tickSize(0).innerTickSize(-this.HEIGHT).orient("bottom");
	
	            yAxis = d3.svg.axis().scale(this.yScale).tickSize(0).innerTickSize(-this.WIDTH + 230).tickFormat(function (d) {
	                return d === _this2.yScale.domain()[0] ? '' : d;
	            }).orient("left");
	
	            vis.attr('width', this.WIDTH);
	            vis.attr('height', this.HEIGHT);
	
	            vis.append("svg:g").attr("transform", "translate(-25," + (this.HEIGHT - this.MARGINS.bottom) + ")").attr("class", "yaxis").call(xAxis).selectAll(".tick text").style("text-anchor", "start").attr("x", -70).attr("y", 6);
	
	            vis.selectAll(".tick line").attr("transform", "translate(-66, 0)").attr("class", "yaxis-line");
	
	            vis.append("svg:g").attr("transform", "translate(" + this.MARGINS.left + ", 0)").call(yAxis).selectAll(".tick text").style("text-anchor", "end").attr("class", "xaxis").attr("x", -5);
	
	            var tsv = data[this.id]['data'];
	            for (var _key in keys) {
	                this.drawArea(vis, tsv, labels);
	            }
	
	            this.drawLegend();
	            this.drawTable($element);
	            this.addEventListeners();
	        }
	    }, {
	        key: 'drawArea',
	        value: function drawArea(graph, data, labels) {
	            var _this3 = this;
	
	            var newArea = d3.svg.area(),
	                count = 0;
	
	            newArea.x(function (d) {
	                return _this3.xScale(labels[count++]);
	            }).y0(this.HEIGHT - this.MARGINS.bottom).y1(function (d) {
	                return _this3.yScale(d[_this3.keys[_this3.numAreas]]);
	            }).interpolate("basis");
	
	            graph.append('svg:path').attr('d', newArea(data)).attr("class", "area area-" + this.numAreas);
	
	            this.numAreas++;
	        }
	    }, {
	        key: 'drawLegend',
	        value: function drawLegend() {
	            var $legend = $('<div>').addClass('graph-legend-items'),
	                count = 0;
	            for (var key in this.keys) {
	                var $bullet = $('<div>').addClass('graph-legend-bullet area-' + count++);
	                var $item = $('<div>').addClass('graph-legend-item').html(this.keys[key]);
	                $legend.append($bullet, $item);
	            }
	
	            $('.graph-legend').append($legend);
	        }
	    }]);
	
	    return AreaChart;
	})(_chart2.default);
	
	module.exports = AreaChart;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Chart = function Chart() {
	    _classCallCheck(this, Chart);
	};
	
	module.exports = Chart;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (id, info) {
	buf.push("<header class=\"graph-content\"> <div class=\"graph-title\">" + (jade.escape((jade_interp = info['title']) == null ? '' : jade_interp)) + "<div class=\"graph-toggler\"> <div class=\"graph-toggle graph-toggle--graph is-active\"><i class=\"fa fa-bar-chart\"></i></div><div class=\"graph-toggle graph-toggle--table\"><i class=\"fa fa-table\"></i></div></div></div><div class=\"graph-description\">" + (jade.escape((jade_interp = info['description']) == null ? '' : jade_interp)) + "</div></header><div class=\"graph-svg\"><div class=\"graph-legend\"> </div><svg" + (jade.attr("id", "" + (id) + "", true, true)) + "></svg></div>");}.call(this,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"info" in locals_for_with?locals_for_with.info:typeof info!=="undefined"?info:undefined));;return buf.join("");
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	
	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(6).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(5);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (data, keys, undefined) {
	buf.push("<table cellspacing=\"0\" cellpadding=\"0\" class=\"graph-table is-hidden\"><tr><th> </th>");
	// iterate data
	;(function(){
	  var $$obj = data;
	  if ('number' == typeof $$obj.length) {
	
	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var item = $$obj[$index];
	
	buf.push("<th>" + (jade.escape((jade_interp = item['sprint']) == null ? '' : jade_interp)) + "</th>");
	    }
	
	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var item = $$obj[$index];
	
	buf.push("<th>" + (jade.escape((jade_interp = item['sprint']) == null ? '' : jade_interp)) + "</th>");
	    }
	
	  }
	}).call(this);
	
	buf.push("</tr>");
	// iterate keys
	;(function(){
	  var $$obj = keys;
	  if ('number' == typeof $$obj.length) {
	
	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var key = $$obj[$index];
	
	buf.push("<tr><td>" + (jade.escape((jade_interp = key) == null ? '' : jade_interp)) + "</td>");
	// iterate data
	;(function(){
	  var $$obj = data;
	  if ('number' == typeof $$obj.length) {
	
	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var item = $$obj[$index];
	
	buf.push("<td>" + (jade.escape((jade_interp = item[key]) == null ? '' : jade_interp)) + "</td>");
	    }
	
	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var item = $$obj[$index];
	
	buf.push("<td>" + (jade.escape((jade_interp = item[key]) == null ? '' : jade_interp)) + "</td>");
	    }
	
	  }
	}).call(this);
	
	buf.push("</tr>");
	    }
	
	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var key = $$obj[$index];
	
	buf.push("<tr><td>" + (jade.escape((jade_interp = key) == null ? '' : jade_interp)) + "</td>");
	// iterate data
	;(function(){
	  var $$obj = data;
	  if ('number' == typeof $$obj.length) {
	
	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var item = $$obj[$index];
	
	buf.push("<td>" + (jade.escape((jade_interp = item[key]) == null ? '' : jade_interp)) + "</td>");
	    }
	
	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var item = $$obj[$index];
	
	buf.push("<td>" + (jade.escape((jade_interp = item[key]) == null ? '' : jade_interp)) + "</td>");
	    }
	
	  }
	}).call(this);
	
	buf.push("</tr>");
	    }
	
	  }
	}).call(this);
	
	buf.push("</table>");}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined,"keys" in locals_for_with?locals_for_with.keys:typeof keys!=="undefined"?keys:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map