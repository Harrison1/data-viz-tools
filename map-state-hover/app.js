
var series = [["AZ",1],["CO",43],["DE",50],["FL",88],["GA",21],["HI",43],
["ID",21],["IL",19],["IN",60],["IA",4],["KS",44],["KY",38],
["LA",67],["MD",2],["ME",95],["MA",60],["MN",57],["MI",53],
["MS",59],["MO",24],["MT",4],["NC",21],["NE",42],["NV",65],
["NH",14],["NJ",47],["NY",15],["ND",19],["NM",63],["OH",56],
["OK",57],["OR",93],["PA",39],["RI",71],["SC",16],["SD",8],
["WA",15],["WV",52],["WY",19],["CA",69],["CT",37],["AK",44],
["AR",13],["AL",21],["TX", 40],["UT", 100],["TN", 10],["VA", 30],["VT", 80],["WI", 50]];

// Datamaps expect data in format:
// { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
//   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
var dataset = {};
// We need to colorize every country based on "numberOfWhatever"
// colors should be uniq for every value.
// For this purpose we create palette(using min/max series-value)
var onlyValues = series.map(function(obj){ return obj[1]; });
var minValue = Math.min.apply(null, onlyValues),
    maxValue = Math.max.apply(null, onlyValues);
// create color palette function
// color can be whatever you wish
var paletteScale = d3.scale.linear()
    .domain([minValue,maxValue])
    .range(["#EFEFFF","#02386F"]); // blue color
// fill dataset in appropriate format
series.forEach(function(item){ //
// item example value ["USA", 70]
var iso = item[0],
        value = item[1];
dataset[iso] = { electoralVotes: value, fillColor: paletteScale(value) };
});

// render map
var map = new Datamap({
element: document.getElementById('container'),
scope: 'usa',
responsive: true,
geographyConfig: {
    highlightBorderColor: '#ff0000',
    highlightFillColor: 'grey',

   	popupTemplate: function(geography, data) {
      return '<div class="hoverinfo">' + geography.properties.name + 'Electoral Votes:' +  data.electoralVotes + ' ';
    },

    highlightBorderWidth: 3
},

fills: {
  'Republican': '#CC4731',
  'Democrat': '#306596',
  'Heavy Democrat': '#667FAF',
  'Light Democrat': '#A9C0DE',
  'Heavy Republican': '#CA5E5B',
  'Light Republican': '#EAA9A8',
  defaultFill: '#EDDC4E'
},
data: dataset
});

// Draw a legend for this map
map.legend();
map.labels();

// Pure JavaScript
window.addEventListener('resize', function() {
map.resize();
});		
