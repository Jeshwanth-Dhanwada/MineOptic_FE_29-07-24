
// import truckSvg from "./assets/images/Truck1.png"
// import excavatorkSvg from "./assets/images/Excavator.png"
import truckSvg from "../assets/images/Truck1.png"
import excavatorSvg from "../assets/images/Excavator.png"
import IdleEmpty from "../assets/images/TruckIdleEmpty.png"
import IdleLoad from "../assets/images/TruckIdleLoad.png"
import Loading from "../assets/images/TruckLoading.png"
import Spotting from "../assets/images/TruckSpotting.png"
import StopEmpty from "../assets/images/TruckStopEmpty.png"
import StopLoad from "../assets/images/TruckStopLoad.png"
import TravelEmpty from "../assets/images/TruckTravelEmpty.png"
import TravelLoad from "../assets/images/TruckTravelLoad.png"
import Unloading from "../assets/images/TruckUnloading.png"
import WaitingForLoad from "../assets/images/TruckWaitingForLoad.png"

export const ICON_TYPES = {
    TRUCK: truckSvg,
    EXCAVATOR: excavatorSvg,

}

export const TRUCK_STATUS = {
    SE: StopEmpty,
    IE: IdleEmpty,
    TE: TravelEmpty,
    WL: WaitingForLoad,
    SP: Spotting,
    LD: Loading,
    IL: IdleLoad,
    TL: TravelLoad,
    UL: Unloading,
    SL: StopLoad,
    
}
