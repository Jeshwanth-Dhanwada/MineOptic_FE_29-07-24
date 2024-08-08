import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Marker, Popup, Tooltip } from "react-leaflet"
import { LeafIcon } from "./constants/maoConstants";
// import 'leaflet-rotatedmarker';
import {ICON_TYPES, TRUCK_STATUS} from "./constants/TruckIcons.js"

export default function DraggableMarker({ points,updateTruckCoordinates }) {
  const [position, setPosition] = useState(points);
  const [truckState, setTruckState] = useState(points.state);
  const markerRef = useRef(null);
  const isTipper = position.type ==="tipper";
  // var greenIcon = new LeafIcon({ iconUrl: points.tipper_id === "B39" ? TRUCK_2 : points.tipper_id === "B09" ? TRUCK_1 : TRUCK_3});
  // var truckIcon = new LeafIcon({ iconUrl: isTipper ? truckSvg : excavatorkSvg})
  // var truckIcon = new LeafIcon({ iconUrl: isTipper ? ICON_TYPES.TRUCK : ICON_TYPES.EXCAVATOR})
  // console.log("Truck icon:",points)
  useEffect(() => {
    setPosition(points);
    updateTruckCoordinates(points);
    setTruckState(points.state);
  }, [points])

  const truckIcon = useMemo(() => {
    if (isTipper) {
      return new LeafIcon({
        iconUrl: TRUCK_STATUS[truckState], // use the truck state to determine the icon
      });
    } else {
      return new LeafIcon({
        iconUrl: ICON_TYPES.EXCAVATOR,
      });
    }
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

  return (
    <Marker
      icon={truckIcon}
      label=""
      draggable={false}
      // style={{transform:"rotate(150deg)"}}
      className="icon-tool-tip-indicator-marker"
      eventHandlers={eventHandlers}
      // title={position.tipper_id}
      // rotationAngle={+position.direction}
      position={position}
      openOn={(t) => console.log(t, "test datadsdsd")}
      ref={markerRef}>
      <Tooltip className="icon-tool-tip-indicator" direction="right" opacity={1} permanent>
        {isTipper ? position.tipper_id: position.excavator_id}
      </Tooltip>
    </Marker>
  )
}