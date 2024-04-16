var map = L.map('map').setView([45.644, 13.756], 13);

//Different Tilelayers

// Open Street Map Tilelayer
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
// Terrain Tilelayer
var terrain = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});
// Topo Tilelayer
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
// dark Tilelayer
var dark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});
// googleStreets Tilelayer
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

osm.addTo(map);


// Layer Control
var baseMaps = {
    "Open Street Map": osm,
    "Terrain": terrain,
    "Topograpic": topo,
    "Dark Mode": dark,
    "Google Streets": googleStreets
};
L.control.layers(baseMaps).addTo(map);


// Fetch data from local geoJSON files

fetch('raw_points.geojson')
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})

// generate title cards and story on the side bar based on generic geojson data

.then(data => {
  var geoLayer = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        var title = feature.properties.title
        var description = 'demo description'
        document.getElementById('titleCard').innerHTML += generateTitleCard(title, description, feature)
        // console.log(title)
        //   layer.bindPopup(`title: ${feature.properties.title}`)
        layer.on({
          click: function(e){
            var title = e.target.feature.properties.title
            var img_url = e.target.feature.properties.img_url
            document.getElementById('side-bar').innerHTML = `<h1> Info about data </h1>
            <h3>${title}</h3>
            <img src='${img_url}' alt='image' style='width: 100%; height: auto;'>
            `
          }
      });
      }
  }).addTo(map)
  map.fitBounds(geoLayer.getBounds());
})

.catch(error => {
  console.error('Error:', error);
});

function generateTitleCard(title, description, f) {
return `<div class="col-md-3">
<h3 class="title ${title}" onClick=zoomInFunction('${JSON.stringify(f)}')>${title}</h3>
<p class="description">${description}</p>
</div>`

}

function zoomInFunction(f) {

console.log(f, 'feature')
f = JSON.parse(f)
var lat = f.geometry.coordinates[1]
var long = f.geometry.coordinates[0]

map.setView([lat, long], 10)

}

  // Data proxy for testing:



var marker = L.marker([45.6517535, 13.7685467]).addTo(map);

var circle = L.circle([45.644, 13.756], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);



var polygon = L.polygon([
    [45.6457326, 13.7585336],
    [45.6448621, 13.760036],
    [45.6513754, 13.7708966],
    [45.6579179, 13.7701668],
    [45.6605766, 13.7649838],
    [45.6528039, 13.7691906],
    [45.6458706, 13.7584589]
]).addTo(map);


var latlngs = [
    [45.6548683, 13.7680636],
    [45.4774642, 12.9235283],
    [41.8841982, 17.2331001],
    [40.0426438, 18.9117533],
    [37.7677536, 16.5160839],
    [37.895984, 15.5592594],
    [38.019657, 15.5281364],
    [38.1885588, 15.5963528],
    [38.2079523, 15.5728266],
    [38.1985051, 15.55909],
    [38.1881362, 15.5611585]
];

var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);

map.fitBounds(polyline.getBounds());


var polygon2 = L.polygon([
    [38.2107728, 15.5613711],
    [38.2071966, 15.5515838],
    [38.1873559, 15.5401652],
    [38.1746886, 15.5555587],
    [38.1825189, 15.5620836],
    [38.1928315, 15.5740128],
    [38.1977581, 15.5695484],
    [38.1967458, 15.5625084],
    [38.1964084, 15.5680031],
    [38.1939788, 15.5692909],
    [38.1880396, 15.5613923],
    [38.1904018, 15.5566703],
    [38.2063282, 15.5631094],
    [38.2106466, 15.5613064]
]).addTo(map);


