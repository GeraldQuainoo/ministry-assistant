import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useReducer, useState } from "react";
// import Search from "./Search";
import AddTerritoryForm from "./AddTerritoryForm";
import Territories from "./Territories";

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}
const savedTerritories = localStorage.getItem("territories");

const initialState = {
  showForm: false,
  clickedPos: [],
  territories: !savedTerritories ? [] : JSON.parse(savedTerritories),
};

function reducer(state, action) {
  switch (action.type) {
    case "clickedPosition":
      return { ...state, showForm: true, clickedPos: action.payload };
    case "addTerritory":
      return {
        ...state,
        territories: [...state.territories, action.payload],
        showForm: false,
      };
    case "close":
      return { ...state, openAddTerritoryForm: false };
  }
}

function Territory() {
  const [position, setPosition] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showForm, clickedPos, territories } = state;

  function handleMapClick(latlng) {
    dispatch({ type: "clickedPosition", payload: latlng });
  }
  useEffect(
    function () {
      localStorage.setItem("territories", JSON.stringify(territories));
    },
    [territories],
  );
  useEffect(function () {
    function getPosition() {
      if (!navigator.geolocation) {
        alert("Browser doesnt support location");
      }
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        setPosition([latitude, longitude]);
      });
    }
    getPosition();
  }, []);
  // const position = getPosition();

  return (
    <div className="territoryBox">
      {/* <Search /> */}
      <div className="mapContainer">
        {
          <MapContainer
            className="map"
            center={position.length ? position : [5.6, -0.1]}
            zoom={18}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            <MapClickHandler onMapClick={handleMapClick} />
            {position.length && (
              <Marker position={position}>
                <Popup>Me</Popup>
              </Marker>
            )}
            {territories.map((territory) => (
              <Marker key={territory.id} position={territory.clickedPos}>
                <Popup>{territory.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        }
      </div>
      <div className="territoryContent">
        <h3 className="headingSecondary territoryNav">Territories</h3>
        {showForm && (
          <AddTerritoryForm clickedPos={clickedPos} dispatch={dispatch} />
        )}
        <Territories territories={territories} />
      </div>
    </div>
  );
}

export default Territory;
