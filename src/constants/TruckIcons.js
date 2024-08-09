
// import truckSvg from "./assets/images/Truck1.png"
// import excavatorkSvg from "./assets/images/Excavator.png"
import truckSvg from "../assets/images/truck1.svg"
import excavatorSvg from "../assets/images/Excavator.png"
import IdleEmpty from "../assets/images/TruckIdleEmpty.svg"
import IdleLoad from "../assets/images/TruckIdleLoad.svg"
import Loading from "../assets/images/TruckLoading.svg"
import Spotting from "../assets/images/TruckSpotting.svg"
import StopEmpty from "../assets/images/TruckStopEmpty.svg"
import StopLoad from "../assets/images/TruckStopLoad.svg"
import TravelEmpty from "../assets/images/TruckTravelEmpty.svg"
import TravelLoad from "../assets/images/TruckTravelLoad.svg"
import Unloading from "../assets/images/TruckUnloading.svg"
import WaitingForLoad from "../assets/images/TruckWaitingForLoad.svg"

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
    SS:Spotting
    
}
