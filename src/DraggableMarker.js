import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Marker, Popup, Tooltip } from "react-leaflet"
import { LeafIcon } from "./constants/maoConstants";
// import 'leaflet-rotatedmarker';
import truckSvg from "./assets/images/Truck1.png"
import excavatorkSvg from "./assets/images/Excavator.png"
export default function DraggableMarker({ points,updateTruckCoordinates }) {
  const [position, setPosition] = useState(points);
  const markerRef = useRef(null);
  const isTipper = position.type ==="tipper";
  // var greenIcon = new LeafIcon({ iconUrl: points.tipper_id === "B39" ? TRUCK_2 : points.tipper_id === "B09" ? TRUCK_1 : TRUCK_3});
  var truckIcon = new LeafIcon({ iconUrl: isTipper ? truckSvg : excavatorkSvg})
  console.log("Truck icon:",points)
  useEffect(() => {
    setPosition(points);
    updateTruckCoordinates(points);
    console.log("get lat lang:",points)
  }, [points])

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
      title={position.tipper_id}
      // rotationAngle={+position.direction}
      position={position}
      openOn={(t) => console.log(t, "test datadsdsd")}
      ref={markerRef}>
      <Tooltip className="icon-tool-tip-indicator" direction="bottom" opacity={1} permanent>
        {isTipper ? position.tipper_id: position.excavator_id}
      </Tooltip>
    </Marker>
  )
}