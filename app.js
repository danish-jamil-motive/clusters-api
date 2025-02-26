const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

app.use(cors());

// Sample Countries Data
const countries = [
  {
    clusterLevel: "country",
    coordinates: { lat: "37.0902", lng: "-95.7129" },
    count: Math.floor(Math.random() * 100) + 1,
    id: uuidv4(),
    name: "USA",
    type: "cluster",
  },
  {
    clusterLevel: "country",
    coordinates: { lat: "56.1304", lng: "-106.3468" },
    count: Math.floor(Math.random() * 100) + 1,
    id: uuidv4(),
    name: "Canada",
    type: "cluster",
  },
];

// Sample States Data
const states = [
  { name: "California", lat: 36.7783, lng: -119.4179 },
  { name: "Texas", lat: 31.9686, lng: -99.9018 },
  { name: "Florida", lat: 27.9944024, lng: -81.7602544 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "Illinois", lat: 40.6331, lng: -89.3985 },
  { name: "Pennsylvania", lat: 41.2033, lng: -77.1945 },
  { name: "Ohio", lat: 40.4173, lng: -82.9071 },
  { name: "Georgia", lat: 32.1656, lng: -82.9001 },
  { name: "North Carolina", lat: 35.7596, lng: -79.0193 },
  { name: "Michigan", lat: 44.3148, lng: -85.6024 },
  { name: "New Jersey", lat: 40.0583, lng: -74.4057 },
  { name: "Virginia", lat: 37.4316, lng: -78.6569 },
  { name: "Washington", lat: 47.7511, lng: -120.7401 },
  { name: "Arizona", lat: 34.0489, lng: -111.0937 },
  { name: "Massachusetts", lat: 42.4072, lng: -71.3824 },
];

const stateClusters = states.map((state) => ({
  clusterLevel: "state",
  coordinates: { lat: state.lat.toString(), lng: state.lng.toString() },
  count: Math.floor(Math.random() * 50) + 1,
  id: uuidv4(),
  name: state.name,
  type: "cluster",
}));

// Sample Cities in California
const cities = [
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194 },
  { name: "San Diego", lat: 32.7157, lng: -117.1611 },
  { name: "San Jose", lat: 37.3382, lng: -121.8863 },
  { name: "Sacramento", lat: 38.5816, lng: -121.4944 },
  { name: "Fresno", lat: 36.7378, lng: -119.7871 },
  { name: "Oakland", lat: 37.8044, lng: -122.2711 },
  { name: "Bakersfield", lat: 35.3733, lng: -119.0187 },
  { name: "Anaheim", lat: 33.8366, lng: -117.9143 },
  { name: "Santa Ana", lat: 33.7455, lng: -117.8677 },
];

const cityClusters = cities.map((city) => ({
  clusterLevel: "city",
  coordinates: { lat: city.lat.toString(), lng: city.lng.toString() },
  count: Math.floor(Math.random() * 30) + 1,
  id: uuidv4(),
  name: city.name,
  type: "cluster",
}));

// Generate 145 street-level markers in Los Angeles
const generateMarkers = () => {
  const latMin = 33.7,
    latMax = 34.3;
  const lngMin = -118.7,
    lngMax = -118.1;

  const names = [
    "John", "Emma", "Michael", "Sophia", "William", "Olivia", "James", "Isabella",
    "Benjamin", "Mia", "Ethan", "Charlotte", "Alexander", "Amelia", "Daniel"
  ];

  let markers = [];
  for (let i = 0; i < 145; i++) {
    markers.push({
      clusterLevel: "street",
      coordinates: {
        lat: (Math.random() * (latMax - latMin) + latMin).toFixed(6),
        lng: (Math.random() * (lngMax - lngMin) + lngMin).toFixed(6),
      },
      count: 1,
      id: uuidv4(),
      name: `${names[Math.floor(Math.random() * names.length)]}'s vehicle`,
      type: "marker",
    });
  }
  return markers;
};

// Routes
app.get("/api/clusters", (req, res) => {
  res.json(countries);
});

app.get("/api/clusters/states", (req, res) => {
  res.json(stateClusters);
});

app.get("/api/clusters/cities", (req, res) => {
  res.json(cityClusters);
});

app.get("/api/clusters/markers", (req, res) => {
  res.json(generateMarkers());
});

// Start Server
app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
