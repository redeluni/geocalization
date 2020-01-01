/**
 * ! Attenzione: non centra la mappa sulle coordinate date
 * Mostra il centro della mappa del indirizzo/posizione centrale/default
 * container: elemento html con id="map" che deve contenere la mappa
 * style: che tipo di mappa mostrare
 * zoom: zoom sulla mappa (1=tutto il mondo)
 * center: coordinate del centro della mappa
 */
mapboxgl.accessToken =
  'pk.eyJ1IjoicmVkZWx1bmkiLCJhIjoiY2p3NWc1aWNsMGpqczRhbXNrcDNod2ptYiJ9.iMyKBakvS8U-w7_r7y-OeQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 4,
  center: [40.853586, 14.1729673]
});

// Fetch stores from API
/**
 * Viene creato l'oggetto stores per contenere i dati di tutti gli indirizzi/documenti presi dal db
 * store viene poi passato alla funzione loadMap che mostrerà sulla mappa tutti gli indirizzi
 */
async function getStores() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();

  const stores = data.data.map(store => {
    console.log(store);
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    };
  });

  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getStores();
