import { useEffect, useState } from "react";
import TipperMap from "../component/tipperMap"
import { formatTempData, getAllLocations, getExacavators, getTipperHistory, importTipperData } from "../api/tipper";
import DateTimeRangeField from "../component/dateTimeRangeField";
import dayjs from 'dayjs';
import { getDateTimeViewFormat, todaysDateFormated, getDateTimeViewFormatMin } from "../commonFunctions/date";
// import Button from '@mui/material/Button';
import "./tipperMap.css"
import Timer from "../component/timer";
import useTimer from "../hooks/useTimer";
import { groupLocByTipperId } from "../commonFunctions/groupFunctions";
import InputSelect from "../component/commonComponents/inputSelect";
import CheckboxSelect from './checkBoxSelect';
import { MultiSelect } from 'primereact/multiselect';
// import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import { unstable_useNumberInput as useNumberInput } from '@mui/base';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from '@mui/material/CircularProgress';
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';



let cordinates = {};
const TipperView = () => {
  const [tipperData, setTipperData] = useState([]);
  const [exacavatorData, setExacavatorData] = useState([])
  const [tippersMovement, setTippersMovement] = useState([]);
  const [showMap, setShowMap] = useState(false)
  const [initialDate, setInitialDate] = useState("")
  const [groupedTippers, setGroupedTipppers] = useState({})
  const [groupedExacavators, setGroupedExacavators] = useState({})
  const [selectedTipper, setSelectedTipper] = useState('All');
  const [selectedEscavator, setSelectedEscavator] = useState('All');
  const [trucksSpeed, setTrucksSpeed] = useState(1)
  const [locations, setLocations] = useState([]);
  const [datestartRange, setdatestartRange] = useState();
  const [color, setColor] = useState();
  const [endTime, setEndTime] = useState();
  const [mapKey, setMapKey] = useState(0);
  const [dateRange, setDateRange] = useState([
    dayjs(todaysDateFormated('2021-06-24 15:14:16')),
    dayjs(todaysDateFormated('2021-06-28 08:51:03')),
  ]);
  const [minDateTime, setMinDateTime] = useState()
  const [timerShow, setTimerShow] = useState(false)
  const [open, setOpen] = useState(false);

  const availableTrippers = Object.keys(groupedTippers);
  const availableEscavators = Object.keys(groupedExacavators);

  const {
    renderedStreamDuration,
    isControlDisable,
    setisControlDisable,
    startHandler,
    stopHandler,
    pauseHandler,
    resumeHandler,
    setTimer,
    setTimerSpeed,
    isPlaying,
    prevHandler,
    ForwardHandler,
    setTruckCoordinates,
    truckCoordinates,
    // prevTimeref,

    index,
  } = useTimer(initialDate);

  useEffect(() => {
    setTimerSpeed(1000 / trucksSpeed);
  }, [trucksSpeed])

  const getDetails = async () => {
    // Check if all required fields have been filled
    if (!selectedTipper.tipperid || !selectedEscavator.excid || !trucksSpeed) {
      alert('Please fill all required fields');
      return;
    }
    getInitialData()

  }

  const getInitialData = async () => {
    setOpen(true);
    setLocations([]);
    setInitialDate([]);
    setMinDateTime([])
    setTipperData([]);
    setExacavatorData([]);
    setGroupedTipppers([]);
    setGroupedExacavators([]);
    setShowMap();
    let res = []
    if (true)
      res = await getTipperHistory(getDateTimeViewFormat(datestartRange, true), getDateTimeViewFormat(endTime, true));

    // else  
    else res = formatTempData(localStorage.getItem("tripData"));

    // else  res = formatTempData(localStorage.getItem("tripData"));
    const exacvtrData = await getExacavators(getDateTimeViewFormat(datestartRange, true), getDateTimeViewFormat(endTime, true))
    // const exacvtrData = await getExacavators(getDateTimeViewFormat(dateRange[0], true), getDateTimeViewFormat(dateRange[1], true))
    const locs = await getAllLocations();
    setLocations(locs);
    setInitialDate(res[0].trackTime);
    setMinDateTime(res[0].trackTime)
    const { formattedResp: groupedData, coverage } = groupLocByTipperId(res, "tipper_id");
    const { formattedResp: groupedExacavator, coverage: escCoverate } = groupLocByTipperId(exacvtrData, "excavator_id");
    cordinates = { x: Math.min(...[+coverage.x, escCoverate.x]), y: Math.max(...[+coverage.y, escCoverate.y]) };
    setTipperData(res.map(a => ({ ...a, lat: a.latitude, lng: a.longitude })));
    setExacavatorData(exacvtrData.map(a => ({ ...a, lat: a.latitude, lng: a.longitude })));
    setGroupedTipppers(groupedData);
    setGroupedExacavators(groupedExacavator);
    startHandler();
    setTimerShow(true)
    setisControlDisable(false)
    setOpen(false);
    setShowMap(true);

  }
  const getInitialDataSelect = async () => {
    let res = []
    if (true)
      res = await getTipperHistory(getDateTimeViewFormat(dateRange[0], true), getDateTimeViewFormat(dateRange[1], true));
    // else  
    else res = formatTempData(localStorage.getItem("tripData"));
    // else  res = formatTempData(localStorage.getItem("tripData"));
    const exacvtrData = await getExacavators(getDateTimeViewFormat(dateRange[0], true), getDateTimeViewFormat(dateRange[1], true))
    // const exacvtrData = await getExacavators(getDateTimeViewFormat(dateRange[0], true), getDateTimeViewFormat(dateRange[1], true))
    const locs = await getAllLocations();
    setLocations(locs);
    setInitialDate(res[0].trackTime);
    setMinDateTime(res[0].trackTime)
    const { formattedResp: groupedData, coverage } = groupLocByTipperId(res, "tipper_id");
    const { formattedResp: groupedExacavator, coverage: escCoverate } = groupLocByTipperId(exacvtrData, "excavator_id");
    cordinates = { x: Math.min(...[+coverage.x, escCoverate.x]), y: Math.max(...[+coverage.y, escCoverate.y]) };
    setTipperData(res.map(a => ({ ...a, lat: a.latitude, lng: a.longitude })));
    setExacavatorData(exacvtrData.map(a => ({ ...a, lat: a.latitude, lng: a.longitude })))

    setGroupedTipppers(groupedData);
    setGroupedExacavators(groupedExacavator);
    setShowMap(true);
  }

  useEffect(() => {
    getInitialDataSelect();
  }, [])

  useEffect(() => {
    if (availableTrippers.length) {
      // const prevTime = new Date(prevTimeref.current).getTime();
      let allTippers = []
      if (index === 0) {
        const tipper = tipperData[index];
        allTippers = tipperData.filter(a => {
          const truckTime = new Date(a.trackTime).getTime();
          const curTipperTime = new Date(tipper.trackTime).getTime();
          return truckTime === curTipperTime;
        })
      }
      else {
        const tippers = tipperData.filter((a) => new Date(a.trackTime).getTime() > renderedStreamDuration.getTime());
        const tipper = tippers[0];
        allTippers = tippers.filter(a => {
          const truckTime = new Date(a.trackTime).getTime();
          const curTipperTime = new Date(tipper.trackTime).getTime();
          return truckTime === curTipperTime;
        })
      }
      const result = availableTrippers.map(x => {
        if (allTippers.find(t => t.tipper_id === x)) return allTippers.find(t => t.tipper_id === x);
        else if (tippersMovement.find(t => t.tipper_id === x)) return tippersMovement.find(t => t.tipper_id === x);
      })
      let filterResult = result.filter((t) => t && selectedTipper?.tipperid.includes(t.tipper_id))
      const tippers = filterResult.map(a => ({ ...a, type: "tipper" }))
      // const tippers = result.filter((a) => a && (selectedTipper === "All" || a.tipper_id === selectedTipper)).map(a => ({ ...a, type: "tipper" }))
      const allExvacators = exacavatorData.filter((a, i) => i > index).map(a => ({ ...a, type: "exacavator" }))
      const resultEsc = availableEscavators.map(x => {
        if (allExvacators.find(t => t.excavator_id === x)) return allExvacators.find(t => t.excavator_id === x);
        else if (tippersMovement.find(t => t.excavator_id === x)) return tippersMovement.find(t => t.excavator_id === x);
      }).filter((a) => a && (selectedEscavator === "All" || selectedEscavator.excid.includes(a.excavator_id)))
      // filter((a) => a && (selectedEscavator === "All" || a.excavator_id === selectedEscavator))
      const excavator = exacavatorData[index];
      excavator.type = "excavator"
      if (excavator) {
        setTippersMovement([...tippers, ...resultEsc.map((x) => {
          if (x.excavator_id === "E69") {
            x.lat += 0.05
          }
          return x;
        })])
      }
      if (result.length) setTimer(result[0].trackTime)
      else pauseHandler(true)
    }
  }, [index])

  const timerProps = {
    renderedStreamDuration,
    isControlDisable,
    setisControlDisable,
    initialDate,
    startHandler,
    stopHandler,
    pauseHandler,
    resumeHandler,
    setTimer,
    isPlaying,
    prevHandler,
    ForwardHandler,
    timerShow,
    setTruckCoordinates,
    truckCoordinates
  }

  const handleChangeTipper = (e) => {
    setSelectedTipper({ tipperid: e.target.value });
  }

  const handleChangeTruckSpeed = (e) => {
    setTrucksSpeed(e.target.value)
  }

  const handleChangeEscavator = (e) => {
    setSelectedEscavator({ excid: e.target.value })
  }

  const tipperOptions = [...availableTrippers];
  const excavatorOptions = [...availableEscavators];
  const reloadMap = () => {
    setMapKey(mapKey + 1);
  };


  return <>
    <div className="container-fluid" style={{ overflowY: "hidden" }}>
      <div className="row d-flex flex-row" style={{
        position: 'fixed',
        background: '#fff',
        // zIndex: 1,
        marginRight:"0px",
        marginLeft:"0px",
        height: "11%",
        width: '100%',
        padding: '10px 0', // add some padding to make it look better
      }}>
        <div className="col-md-1 col-lg-2 text-center" style={{ marginTop: "5px" }}>
          <Timer {...timerProps} />
        </div>
        
        <div className="col-md-3 col-lg-3" >
        {/* <div className="card flex justify-content-center">
           
        </div> */}
          <div className="d-flex">
            <MultiSelect
              value={selectedTipper.tipperid}
              onChange={handleChangeTipper}
              options={tipperOptions}
              filter
              placeholder="Tippers"
              maxSelectedLabels={3}
              style={{
                height: "45px",
                width: "120px",
                marginTop: "8px",
                marginRight: "10px", // add some margin to separate it from the next element
              }}
            />
            <MultiSelect
              required
              value={selectedEscavator.excid}
              onChange={handleChangeEscavator}
              options={excavatorOptions}
              filter
              placeholder="Excavators"
              maxSelectedLabels={3}
              style={{
                height: "45px",
                width: "120px",
                marginTop: "8px",
                // marginRight: "10px", // add some margin to separate it from the next element
              }}
            />

            <InputSelect
              required
              type="number"
              labelId="tipper-speed-select-label"
              label="Speed"
              className="tippers-select"
              placeholder="Select Speed"
              selectedVal={trucksSpeed}
              handleSelect={handleChangeTruckSpeed}
              suffix="X"
              style={{
                height: "45px",
                width: "120px",
                marginRight: "10px", // add some margin to separate it from the next element
              }}
              options={Array(5).fill(1).map((a, i) => i + 1)}
            />
          </div>
        </div>
        <div className="col-md-4 col-lg-4" style={{height:"20px"}}>
          <DateTimeRangeField
            dateRange={datestartRange}
            setDateRange={setdatestartRange}
            minDateTime={minDateTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </div>
        <div className="col-md-1 col-lg-1 flex-row" style={{width: '150px'}}> 
          <div className="flex-column mt-2">
            <div>End Date Time</div>
            <div><b>{endTime && getDateTimeViewFormatMin(endTime)}</b></div>
          </div>
        </div>
        <div className="col-md-1 col-lg-1 mt-2" >
          <Button label="Go" style={{ height: "40px" }} loading={open} onClick={getDetails} />
        </div>
      </div>
      {showMap && <TipperMap key={mapKey} locations={locations} data={tippersMovement} initialx={tippersMovement[0]?.lat || cordinates.x} initialy={tippersMovement[0]?.lng || cordinates.y} timerShow={timerShow} time={renderedStreamDuration} open={open} setTruckCoordinates={setTruckCoordinates} truckCoordinates={truckCoordinates} />}
      {open && (
        <Backdrop
          sx={{ color: '#FFF', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        // onClick={handleClose}
        >
          <CircularProgress size={80} color="inherit" />
        </Backdrop>)}
      {/* rest of your code */}
    </div>
  </>
}

export default TipperView;