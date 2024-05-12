mapboxgl.accessToken = MAPBOX_TOKEN;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .addTo(map);
