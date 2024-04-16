// API Fetch TEST

const apiUrl = 'https://thanados.openatlas.eu/api/0.4/system_class/move?format=lp&column=name&sort=asc&search={%22typeName%22:[{%22operator%22:%22like%22,%22values%22:[%22Novara%22]}]}&limit=0';
const apiGEO = 'https://thanados.openatlas.eu/api/entity/196366?format=geojson';
// Make a GET request using the Fetch API

fetch(apiGEO)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })

  .then(geojsonData => {
    L.geoJSON(geojsonData).addTo(map)
})

  .catch(error => {
    console.error('Error:', error);
  });