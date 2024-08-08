import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Marker, Popup, Tooltip } from "react-leaflet"
import { LeafIcon } from "./constants/maoConstants";
// import 'leaflet-rotatedmarker';
import { icon } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import {ICON_TYPES, TRUCK_STATUS} from "./constants/TruckIcons.js"

export default function DraggableMarker({ points,updateTruckCoordinates }) {
  const [position, setPosition] = useState(points);
  const [truckState, setTruckState] = useState(points.state);
  const [directionAngle, setDirection] = useState(points.direction);
  const markerRef = useRef(null);
  const isTipper = position.type ==="tipper";
  // const map = L.map('map').setView([51.505, -0.09], 13);
  // var greenIcon = new LeafIcon({ iconUrl: points.tipper_id === "B39" ? TRUCK_2 : points.tipper_id === "B09" ? TRUCK_1 : TRUCK_3});
  // var truckIcon = new LeafIcon({ iconUrl: isTipper ? truckSvg : excavatorkSvg})
  // var truckIcon = new LeafIcon({ iconUrl: isTipper ? ICON_TYPES.TRUCK : ICON_TYPES.EXCAVATOR})
  // console.log("Truck icon:",points)
  useEffect(() => {
    setPosition(points);
    if (isTipper){
      updateTruckCoordinates(points);
      setTruckState(points.state);
      
    }
  }, [points, isTipper, updateTruckCoordinates])

  const truckIcon = useMemo(() => {
    return new L.Icon({
      iconUrl: isTipper ? TRUCK_STATUS[truckState] : ICON_TYPES.EXCAVATOR,
      iconSize: [95, 81],
      // iconAnchor: [47.5, 20.5],
    });
  }, [isTipper, truckState]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setRotationAngle(isTipper? points.direction:0);
      markerRef.current.rotationOrigin="center"
    }
    console.log("Updated direction:", points.direction);
  }, [points.direction]);

  return (
    <Marker
      icon={truckIcon}
      label=""
      draggable={false}
      // style={{transform:"rotate(150deg)"}}
      className="icon-tool-tip-indicator-marker"
      eventHandlers={eventHandlers}
      position={position}
      openOn={(t) => console.log(t, "test datadsdsd")}
      // rotationAngle={Number(directionAngle)}
      rotationOrigin="center"
      ref={markerRef}>
      {/* <Tooltip className="icon-tool-tip-indicator ml-4" direction="right" opacity={1} permanent>
        {isTipper ? position.tipper_id: position.excavator_id}
      </Tooltip> */}
    </Marker>
  )
}