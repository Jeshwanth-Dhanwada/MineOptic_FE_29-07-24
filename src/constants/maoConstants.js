import L from "leaflet"
export var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [95, 81], // size of the icon
        iconAnchor: [47.5, 20.5],
    }
});