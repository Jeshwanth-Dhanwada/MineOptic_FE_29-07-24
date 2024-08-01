import { FeatureGroup,MapContainer, Polygon, Polyline, TileLayer, Tooltip, ZoomControl } from "react-leaflet";
import DraggableMarker from "../DraggableMarker";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { useEffect, useState } from "react";
import Timer from "./timer";
import { getDateTimeViewFormat } from "../commonFunctions/date";
// import { BoxesLoader } from "react-awesome-loaders";
import Stack from '@mui/material/Stack';
import { Skeleton } from 'primereact/skeleton';

const purpleOptions = { color: 'purple', fillColor: 'red' };
const redOptions = { color: 'red', fillColor: 'blue' };
const greenOptions = { color: 'green', fillColor: 'yellow' };
const grayOptions = { color: 'gray', fillColor: 'black' };
const pinkOptions = { color: 'pink', fillColor: 'aquamarine' };

const colorOptions = [redOptions, purpleOptions, greenOptions, grayOptions, pinkOptions]

const TipperMap = ({ data = [], initialx, initialy, zoom, locations, timerShow, time, setTruckCoordinates,truckCoordinates }) => {
  const [coordinates, setCoordinates] = useState([]);
  // const [truckCoordinates, setTruckCoordinates] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setCoordinates(locations.map(a => {
      a.polygonPos = a.polygon?.split(";").map(a => a.split(","))
      return a;
    }));
  }, [locations]);

  const updateTruckCoordinates = (newCoordinates) => {
    setTruckCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinates]);
  };

  return (
    <div className="w-full" style={{ width: 100 + "vw", height: 89 + "vh", marginTop: 70 + "px", overflowY: "hidden", scrollable: false, }}>

      <MapContainer
        style={{ width: 100 + "%", height: 100 + "%" }}
        center={[initialx, initialy]}
        zoom={6}
        bounds={coordinates}
        boundsOptions={{ padding: [1, 1] }}
        scrollWheelZoom={true}
        id="map"
      >
        {timerShow && time && <div className="timer-display" style={{ position: 'absolute', top: 6, left: 10, zIndex: 900 }}>
          <b>{getDateTimeViewFormat(time)}</b>
        </div>}
        <TileLayer
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates.map((pos, i) => <Polygon key={pos.location_id} pathOptions={colorOptions[i]} positions={pos.polygonPos}>
          <Tooltip className="icon-tool-tip-indicator" direction="bottom" opacity={1} permanent>
            {pos.location_name}
          </Tooltip>
        </Polygon>)}
        <FullscreenControl position="bottomright" style={{ right: 5 }} />
        {/* <ZoomControl position="bottomright" /> */}
        <FeatureGroup>
          {data?.map((points) => <DraggableMarker key={points.tipper_id} points={points} updateTruckCoordinates={updateTruckCoordinates} />)}
          {data?.map((points) => points.type === "tipper"?<Polyline key={points.tipper_id} positions={truckCoordinates} color="red" /> :"")}
        </FeatureGroup>
      </MapContainer>
      {/* <BoxesLoader
        boxColor={"#6366F1"}
        style={{ marginBottom: "20px" }}
        desktopSize={"128px"}
        mobileSize={"80px"}
      /> */}
    </div>
  )
}

export default TipperMap;