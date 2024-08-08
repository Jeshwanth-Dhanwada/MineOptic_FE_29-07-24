import React, { useEffect, useState } from 'react'
import { getLocationDetails, getTripDetails } from '../api/shovelDetails';
import { IoFilterSharp } from "react-icons/io5";
import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";
import { FaSortNumericDownAlt, FaSortNumericUp } from 'react-icons/fa';
import { AiFillCloseSquare } from 'react-icons/ai';

function TripDetails() {

  const [OpenLoader, setOpenLoader] = useState(false);
  const [TripDetails, setTripDetails] = useState([]);
  const [LocationDetails, setLocationDetails] = useState([]);

  const showTripDetails = async (key) => {
    setOpenLoader(true);
    const responsedata = await getTripDetails();
    setTripDetails(responsedata, key);
    setOpenLoader(false);
  };

  const showLocationDetails = async (key) => {
    setOpenLoader(true);
    const responsedata = await getLocationDetails();
    setLocationDetails(responsedata, key);
    setOpenLoader(false);
  };

  useEffect(() => {
    showTripDetails();
    showLocationDetails();
  }, []);

  const getLocationDesc = (location) => {
    const locName = LocationDetails.find((item)=>item.location_id == location)
    return locName
  }
  const [tipperContainer, setTipperContainer] = useState(false)
  const [excavatorContainer, setExcavatorContainer] = useState(false)
  const [shift, setShift] = useState(false)
  const  HandleTipper = () => {
    setTipperContainer(!tipperContainer)
    setExcavatorContainer(false)
    setShift(false)
  }

  const HandleExcavators = () => {
    setExcavatorContainer(!excavatorContainer)
    setTipperContainer(false)
    setShift(false)
  }
  const HandleShift = () => {
    setShift(!shift)
    setTipperContainer(false)
    setExcavatorContainer(false)
  }

  const HandleCloseTipper = () => {
    setTipperContainer(false)
  }
  const HandleCloseExcavator = () => {
    setExcavatorContainer(false)
  }
  const HandleCloseShift = () => {
    setShift(false)
  }

  //Finding Unique TipperIds ------------
  const uniqueIds = new Set();
  const uniqueIdsExa = new Set();
  const uniqueIdsShifts = new Set();
  const uniqueTipperIds = TripDetails
                          .filter((data) => {
                            if(uniqueIds.has(data.tipper_id)) return false;
                            uniqueIds.add(data.tipper_id)
                            return true
                          })
                          .map((data1) => 
                              ({
                                id:data1.tipper_id
                              }));
                              
  const uniqueExavatorIds = TripDetails
                              .filter((item)=>{
                                if(uniqueIdsExa.has(item.first_excavator_id)) return false;
                                uniqueIdsExa.add(item.first_excavator_id)
                                return true
                              })
                              .map((item2)=>({
                                id : item2.first_excavator_id
                              }))
  const uniqueShiftsIds = TripDetails
                              .filter((item)=>{
                                if(uniqueIdsShifts.has(item.shift_id)) return false;
                                uniqueIdsShifts.add(item.shift_id)
                                return true
                              })
                              .map((item2)=>({
                                id : item2.shift_id
                              }))

  const [checkedItems, setCheckedItems] = useState(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState([]);

  const [checkedExaItems, setCheckedExaItems] = useState(new Set());
  const [selectAllExaChecked, setSelectAllExaChecked] = useState([]);

  const [checkedShiftsItems, setCheckedShiftsItems] = useState(new Set());
  const [selectAllShiftsChecked, setSelectAllShiftdaChecked] = useState([]);

  
  const [data,setdata]=useState()
  const [data1,setdata1]=useState()
  const [data2,setdata2]=useState()

  const HandleCheckAll = (e) => {
    if(e.target.checked) {
      setCheckedItems(new Set(uniqueTipperIds.map((item)=>item.id)))
    }else {
      // Clear the checkedItems set
      setCheckedItems(new Set());
    }
    setSelectAllChecked(!selectAllChecked)
  }

  const handleAllExcavators = (e) => {
    console.log(e.target.checked,"checkbox")
    if(e.target.checked){
      setCheckedExaItems(new Set(uniqueExavatorIds.map((item)=>item.id)))
      console.log(e.target.checked,"checked")
    }else{
      setCheckedExaItems(new Set())
    }
    setSelectAllExaChecked(!selectAllExaChecked)
  }

  const handleAllShifts = (e) => {
    console.log(e.target.checked,"checkbox")
    if(e.target.checked){
      const a = new Set(uniqueShiftsIds.map((item)=>item.id))
      setCheckedShiftsItems(a)
    }else{
      const b = new Set()
      setCheckedShiftsItems(new Set())
    }
    setSelectAllShiftdaChecked(!selectAllShiftsChecked)
  }

  const checkedTipperdata = []
  const HandleCheckboxes = (e, itemId) => {
    const newCheckedItems = new Set(checkedItems);

    if(e.target.checked){
      newCheckedItems.add(itemId);
    }else{
      newCheckedItems.delete(itemId)
    }
    setCheckedItems(newCheckedItems)
    checkedTipperdata.push(...newCheckedItems)
    setSelectAllChecked(false)

    checkedTipperdata.forEach((item)=>{
      const da = TripDetails.filter((data)=>checkedTipperdata.includes(data.tipper_id))
      setdata1(da)
  })
  }
  const checkedExadata1 = []
  const HandleExaCheckboxes = (e, itemId) => {
    const newCheckedItems = new Set(checkedExaItems);

    if(e.target.checked){
      newCheckedItems.add(itemId);
    }else{
      newCheckedItems.delete(itemId)
    }
    setCheckedExaItems(newCheckedItems)
    checkedExadata1.push(...newCheckedItems)
    setSelectAllExaChecked(false)

    checkedExadata1.forEach((item)=>{
      const da = TripDetails.filter((data)=>checkedExadata1.includes(data.first_excavator_id))
      setdata(da)
  })
  }
  const checkedShiftdata1 = []
  const HandleShiftsCheckboxes = (e, itemId) => {
    const newCheckedItems = new Set(checkedShiftsItems);

    if(e.target.checked){
      newCheckedItems.add(itemId);
    }else{
      newCheckedItems.delete(itemId)
    }
    setCheckedShiftsItems(newCheckedItems)
    checkedShiftdata1.push(...newCheckedItems)
    setSelectAllShiftdaChecked(false)

    checkedShiftdata1.forEach((item)=>{
      const da = TripDetails.filter((data)=>checkedShiftdata1.includes(data.shift_id))
      setdata2(da)
  })
  }

  useEffect(() => {
    if (selectAllExaChecked) {
      setCheckedExaItems(new Set(TripDetails.map((item) => item.first_excavator_id)));
    }
  }, [TripDetails, selectAllExaChecked]);
  

  useEffect(() => {
    if(selectAllChecked) {
      setCheckedItems(new Set(TripDetails.map((item)=> item.tipper_id)))
    }
  }, [TripDetails, selectAllChecked]);

  useEffect(() => {
    if(selectAllShiftsChecked) {
      setCheckedShiftsItems(new Set(TripDetails.map((item)=> item.shift_id)))
    }
  }, [TripDetails, selectAllShiftsChecked]);

  const [showSort,setSort] = useState(true)
  const [showSort1,setSort1] = useState(false)

  const [tripdistance,setTripDistance] = useState(true)
  const [tripdistance1,setTripDistance1] = useState(false)

  const [startT,setstartT] = useState(true)
  const [startT1,setstartT1] = useState(false)

  const [endT,setendT] = useState(true)
  const [endT1,setendT1] = useState(false)

  const [date,setdate] = useState(true)
  const [date1,setdate1] = useState(false)

  const [lead,setlead] = useState(true)
  const [lead1,setlead1] = useState(false)

  const [unloadArea,setunloadArea] = useState(true)
  const [unloadArea1,setunloadArea1] = useState(false)

  const HandleAscSorting = (field) =>{
    const sortData = (data) => {
      return data.sort((a, b) => {

        if(field === "trip_duration"){
          setSort(false)
          setSort1(true)
          const tripcountA = Number(a.trip_duration);
          const tripcountB = Number(b.trip_duration);
          return tripcountA - tripcountB;
        }
        if(field === "trip_distance"){
          setTripDistance(false)
          setTripDistance1(true)
          const tripcountA = Number(a.trip_distance);
          const tripcountB = Number(b.trip_distance);
          return tripcountA - tripcountB;
        }
        if(field === "startDate"){
          setstartT(false)
          setstartT1(true)
          const startT = new Date(a.inserted_time);
          const endT = new Date(b.inserted_time);
          return startT - endT;
        }
        if(field === "endDate"){
          setendT(false)
          setendT1(true)
          const startT = new Date(a.te_start_time);
          const endT = new Date(b.te_start_time);
          return startT - endT;
        }
        if(field === "date"){
          setdate(false)
          setdate1(true)
          const startT = new Date(a.pdate);
          const endT = new Date(b.pdate);
          return startT - endT;
        }
        if(field === "lead"){
          setlead(false)
          setlead1(true)
          const leadA = Number(a.location_id);
          const leadB = Number(b.location_id);
          return leadA - leadB;
        }
        if(field === "Unload Area"){
          setunloadArea(false)
          setunloadArea1(true)
          const AreaA = String(getLocationDesc(a.location_id));
          const AreaB = String(getLocationDesc(b.location_id));
          return AreaA - AreaB;
        }
        return a[field] - b[field]
      });
    };
    if (data1?.length > 0) {
      setdata1(sortData([...data1]));
    } else if (data?.length > 0) {
      setdata(sortData([...data]));
    } else {
      setTripDetails(sortData([...TripDetails]));
    }
  }
  const HandleDscSorting = (field) =>{
    const sortData = (data) => {
      return data.sort((a, b) => {
        if(field === "trip_duration"){
          setSort(true)
          setSort1(false)
          const tripcountA = (a.trip_duration);
          const tripcountB = (b.trip_duration);
          return tripcountB - tripcountA;
        }
        if(field === "trip_distance"){
          setTripDistance(true)
          setTripDistance1(false)
          const tripcountA = Number(a.trip_distance);
          const tripcountB = Number(b.trip_distance);
          return tripcountB - tripcountA;
        }
        if(field === "startDate"){
          setstartT(true)
          setstartT1(false)
          const startT = new Date(a.inserted_time);
          const endT = new Date(b.inserted_time);
          return endT - startT;
        }
        if(field === "endDate"){
          setendT(true)
          setendT1(false)
          const startT = new Date(a.te_start_time);
          const endT = new Date(b.te_start_time);
          return endT - startT;
        }
        if(field === "date"){
          setdate(true)
          setdate1(false)
          const startT = new Date(a.pdate);
          const endT = new Date(b.pdate);
          return endT - startT;
        }
        if(field === "lead"){
          setlead(true)
          setlead1(false)
          const leadA = (a.location_id);
          const leadB = (b.location_id);
          return leadB - leadA;
        }
        if(field === "Unload Area"){
          setunloadArea(true)
          setunloadArea1(false)
          const AreaA = (getLocationDesc(a.location_id));
          const AreaB = (getLocationDesc(b.location_id));
          return AreaB - AreaA;
        }
        return b[field] - a[field]
      });
    };
    if (data1?.length > 0) {
      setdata1(sortData([...data1]));
    } else if (data?.length > 0) {
      setdata(sortData([...data]));
    } else {
      setTripDetails(sortData([...TripDetails]));
    }
  }

  //Converting UTC time to IST ----------

  function convertToIST(dateString) {
    const date = new Date(dateString);
    // Convert to IST
    const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000)); // Add 5 hours 30 minutes
    // Format the IST date to dd-MM-yyyy hh:mm:ss
    const formattedDate = `${String(istDate.getDate()).padStart(2, '0')}-${String(istDate.getMonth() + 1).padStart(2, '0')}-${istDate.getFullYear()}`;
    const formattedTime = `${String(istDate.getHours()).padStart(2, '0')}:${String(istDate.getMinutes()).padStart(2, '0')}:${String(istDate.getSeconds()).padStart(2, '0')}`;
  
  return `${formattedDate}, ${formattedTime}`;
  }

    // Date filtering

    const [datefil,setdatefil] = useState()
    const HandleDateFilter = (event) => {
      setdatefil(event.target.value)
      setDateFilteredData([])
    }

    // UnloadTIme filtering

    const [unloadFiltering,setunloadFiltering] = useState()
    const [UnloadDateFilteredData, setUnloadDateFilteredData] = useState([])

    const HandleUnloadFilter = (event) => {
      setUnloadDateFilteredData([])
      setunloadFiltering(event.target.value)
      if(event.target.value){
        const getFilteredDateData = TripDetails.filter(item => item.te_start_time.split("T")[0] == event.target.value);
        console.log(getFilteredDateData,"unload")
        setUnloadDateFilteredData(getFilteredDateData)
    }}

  // Get min and max dates from groupedTripDetails
  const groupedDates = TripDetails.map(date => new Date(date.pdate.split("T")[0]));
  const minDate = groupedDates.length > 0 ? new Date(Math.min(...groupedDates)) : null;
  const maxDate = groupedDates.length > 0 ? new Date(Math.max(...groupedDates)) : null;

  const groupedDatesUnload = TripDetails.map(date => new Date(date.te_start_time.split("T")[0]));
  const minDateUnload = groupedDatesUnload.length > 0 ? new Date(Math.min(...groupedDatesUnload)) : null;
  const maxDateUnload = groupedDatesUnload.length > 0 ? new Date(Math.max(...groupedDatesUnload)) : null;

  const formatDateForInput = (date) => {
    const a = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '';
    return a
  };

  const minDateFormatted = formatDateForInput(minDate);
  const maxDateFormatted = formatDateForInput(maxDate);

  const minUnloadDate = formatDateForInput(minDateUnload);
  const maxUnloadDate = formatDateForInput(maxDateUnload);

  
  const [DateFilteredData, setDateFilteredData] = useState([])

  useEffect(() => {
    if(datefil){
    const getFilteredDateData = TripDetails.filter(item => item.pdate.split("T")[0] == datefil);
    setDateFilteredData(getFilteredDateData)
  }
  }, [TripDetails, datefil]);
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-12">
          <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table className="table table-bordered table-striped">
              <thead className="sticky-top">
                <tr>
                  <th style={{ position: 'relative',width:'90px'}}>Date 
                  <span style={{ position: 'absolute', right: '22px',cursor:'pointer' }}>
                  <input  
                      type="date" 
                      style={{width:'20px',height:'18px',cursor:'pointer'}} 
                      min={minDateFormatted}
                      max={maxDateFormatted}
                      value={datefil}
                      onChange={HandleDateFilter}
                      />
                    </span>
                    <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                      {date === true &&
                      <FaSortNumericUp onClick={() => HandleAscSorting("date")}/>
                      }
                      {date1 === true &&
                      <FaSortNumericDownAlt onClick={() => HandleDscSorting("date")}/>
                      }
                    </span>
                  </th>
                  <th style={{ position: 'relative' }}>Shift
                    <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                      <IoFilterSharp onClick={HandleShift}/>
                    </span>
                  </th>
                  <th style={{ position: 'relative' }}>Start Time
                    
                    <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                      {startT === true &&
                      <FaSortNumericUp onClick={() => HandleAscSorting("startDate")}/>
                      }
                      {startT1 === true &&
                      <FaSortNumericDownAlt onClick={() => HandleDscSorting("startDate")}/>
                      }
                    </span>
                  </th>
                  <th style={{ position: 'relative' }}>Unload Time
                  <span style={{ position: 'absolute', right: '22px',cursor:'pointer' }}>
                  <input  
                      type="date" 
                      style={{width:'20px',height:'18px',cursor:'pointer'}} 
                      min={minUnloadDate}
                      max={maxUnloadDate}
                      value={unloadFiltering}
                      onChange={HandleUnloadFilter}
                      />
                    </span>
                  <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                      {endT === true &&
                      <FaSortNumericUp onClick={() => HandleAscSorting("endDate")}/>
                      }
                      {endT1 === true &&
                      <FaSortNumericDownAlt onClick={() => HandleDscSorting("endDate")}/>
                      }
                    </span>
                  </th>
                  <th style={{ position: 'relative' }}>
                    Excavator
                    <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                      <IoFilterSharp onClick={HandleExcavators}/>
                    </span>
                  </th>
                  <th style={{ position: 'relative' }}>
                    Tipper
                    <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                      <IoFilterSharp onClick={HandleTipper}/>
                    </span>
                  </th>
                  <th style={{ position: 'relative' }}>Trip Duration 
                    <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                      {showSort === true &&
                      <FaSortNumericUp onClick={() => HandleAscSorting("trip_duration")}/>
                      }
                      {showSort1 === true &&
                      <FaSortNumericDownAlt onClick={() => HandleDscSorting("trip_duration")}/>
                      }
                    </span>
                  </th>
                  <th style={{ position: 'relative' }}>Trip Distance
                  <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                      {tripdistance === true &&
                      <FaSortNumericUp onClick={() => HandleAscSorting("trip_distance")}/>
                      }
                      {tripdistance1 === true &&
                      <FaSortNumericDownAlt onClick={() => HandleDscSorting("trip_distance")}/>
                      }
                    </span>
                  </th>
                  <th style={{ position: 'relative' }}>Lead
                  <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                      {lead === true &&
                      <FaSortNumericUp onClick={() => HandleAscSorting("lead")}/>
                      }
                      {lead1 === true &&
                      <FaSortNumericDownAlt onClick={() => HandleDscSorting("lead")}/>
                      }
                    </span>
                  </th>
                  <th style={{ position: 'relative' }}>Unload Area
                  <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                      {unloadArea === true &&
                      <FaSortNumericUp onClick={() => HandleAscSorting("Unload Area")}/>
                      }
                      {unloadArea1 === true &&
                      <FaSortNumericDownAlt onClick={() => HandleDscSorting("Unload Area")}/>
                      }
                    </span>
                  </th>
                </tr>
                
              </thead>
              <tbody>
                {/* {data?.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id}> 
                      <td>{(item.pdate).split("T")[0].split("-").reverse().join("-")}</td>
                      <td>{item.shift_id}</td>
                      <td>{item.inserted_time}</td>
                      <td>{item.te_start_time}</td>
                      <td>{item.first_excavator_id}</td>
                      <td>{item.tipper_id}</td>
                      <td>{item.trip_duration}</td>
                      <td>{item.trip_distance}</td>
                      <td>{item.location_id === "-1" ? "" : item.location_id}</td>
                      <td>{getLocationDesc(item.location_id === "-1" ? "" : item.location_id)}</td>
                    </tr>
                  ))
                ) : (
                  TripDetails.map((item) => (
                    <tr key={item.id}>
                      <td>{(item.pdate).split("T")[0].split("-").reverse().join("-")}</td>
                      <td>{item.shift_id}</td>
                      <td>{item.inserted_time}</td>
                      <td>{item.te_start_time}</td>
                      <td>{item.first_excavator_id}</td>
                      <td>{item.tipper_id}</td>
                      <td>{item.trip_duration}</td>
                      <td>{item.trip_distance}</td>
                      <td>{item.location_id === "-1" ? "" : item.location_id}</td>
                      <td>{getLocationDesc(item.location_id === "-1" ? "" : item.location_id)}</td>
                    </tr>
                  ))
                )} */}
                {data1?.length > 0 ? (
                  data1?.map((item) => (
                    <tr key={item.id}> {/* Assuming each item has a unique id */}
                      <td>{(item.pdate).split("T")[0].split("-").reverse().join("-")}</td>
                      <td>{item.shift_id}</td>
                      <td>{convertToIST(item.inserted_time).replace(/\//g, "-")}</td>
                      <td>{convertToIST(item.te_start_time).replace(/\//g, "-")}</td>
                      <td>{item.first_excavator_id}</td>
                      <td>{item.tipper_id}</td>
                      <td>{item.trip_duration}</td>
                      <td>{item.trip_distance}</td>
                      <td>{item.location_id === "-1" ? "" : item.location_id}</td>
                      <td>{getLocationDesc(item.location_id === "-1" ? "" : item.location_id)}</td>
                    </tr>
                  ))
                ) : data?.length > 0 ? (
                  data?.map((item) => (
                    <tr key={item.id}> {/* Assuming each item has a unique id */}
                      <td>{(item.pdate).split("T")[0].split("-").reverse().join("-")}</td>
                      <td>{item.shift_id}</td>
                      <td>{convertToIST(item.inserted_time).replace(/\//g, "-")}</td>
                      <td>{convertToIST(item.te_start_time).replace(/\//g, "-")}</td>
                      <td>{item.first_excavator_id}</td>
                      <td>{item.tipper_id}</td>
                      <td>{item.trip_duration}</td>
                      <td>{item.trip_distance}</td>
                      <td>{item.location_id === "-1" ? "" : item.location_id}</td>
                      <td>{getLocationDesc(item.location_id === "-1" ? "" : item.location_id)}</td>
                    </tr>
                  ))
                ) : data2?.length > 0 ? (
                  data2?.map((item) => (
                    <tr key={item.id}> {/* Assuming each item has a unique id */}
                      <td>{(item.pdate).split("T")[0].split("-").reverse().join("-")}</td>
                      <td>{item.shift_id}</td>
                      <td>{convertToIST(item.inserted_time).replace(/\//g, "-")}</td>
                      <td>{convertToIST(item.te_start_time).replace(/\//g, "-")}</td>
                      <td>{item.first_excavator_id}</td>
                      <td>{item.tipper_id}</td>
                      <td>{item.trip_duration}</td>
                      <td>{item.trip_distance}</td>
                      <td>{item.location_id === "-1" ? "" : item.location_id}</td>
                      <td>{getLocationDesc(item.location_id === "-1" ? "" : item.location_id)}</td>
                    </tr>
                  ))
                )
                 :DateFilteredData?.length > 0 ? (
                  DateFilteredData?.map((item) => (
                    <tr key={item.id}> {/* Assuming each item has a unique id */}
                      <td>{(item.pdate).split("T")[0].split("-").reverse().join("-")}</td>
                      <td>{item.shift_id}</td>
                      <td>{convertToIST(item.inserted_time).replace(/\//g, "-")}</td>
                      <td>{convertToIST(item.te_start_time).replace(/\//g, "-")}</td>
                      <td>{item.first_excavator_id}</td>
                      <td>{item.tipper_id}</td>
                      <td>{item.trip_duration}</td>
                      <td>{item.trip_distance}</td>
                      <td>{item.location_id === "-1" ? "" : item.location_id}</td>
                      <td>{getLocationDesc(item.location_id === "-1" ? "" : item.location_id)}</td>
                    </tr>
                  )))
                :UnloadDateFilteredData?.length > 0 ? (
                  UnloadDateFilteredData?.map((item) => (
                    <tr key={item.id}> {/* Assuming each item has a unique id */}
                      <td>{(item.pdate).split("T")[0].split("-").reverse().join("-")}</td>
                      <td>{item.shift_id}</td>
                      <td>{convertToIST(item.inserted_time).replace(/\//g, "-")}</td>
                      <td>{convertToIST(item.te_start_time).replace(/\//g, "-")}</td>
                      <td>{item.first_excavator_id}</td>
                      <td>{item.tipper_id}</td>
                      <td>{item.trip_duration}</td>
                      <td>{item.trip_distance}</td>
                      <td>{item.location_id === "-1" ? "" : item.location_id}</td>
                      <td>{getLocationDesc(item.location_id === "-1" ? "" : item.location_id)}</td>
                    </tr>
                  )))
                : (
                  TripDetails.map((item) => (
                    <tr key={item.id}> {/* Assuming each item has a unique id */}
                      <td>{(item.pdate).split("T")[0].split("-").reverse().join("-")}</td>
                      <td>{item.shift_id}</td>
                      <td>{convertToIST(item.inserted_time).replace(/\//g, "-")}</td>
                      <td>{convertToIST(item.te_start_time).replace(/\//g, "-")}</td>
                      <td>{item.first_excavator_id}</td>
                      <td>{item.tipper_id}</td>
                      <td>{item.trip_duration}</td>
                      <td>{item.trip_distance}</td>
                      <td>{item.location_id === "-1" ? "" : item.location_id}</td>
                      <td>{getLocationDesc(item.location_id === "-1" ? "" : item.location_id)}</td>
                    </tr>
                  ))
                )}
                {tipperContainer === true &&
                  <div style={{width:'150px',
                               height:'auto',
                              //  border:'2px solid red',
                               position:'absolute',
                               top:'40px',
                               left:'653px',
                               backgroundColor:'whitesmoke',
                               overflow:'auto'
                  }}>
                    <li class="list-group-item" 
                      style={{textAlign:'right',cursor:'pointer'}}
                      >
                        <AiFillCloseSquare  style={{color:'red'}} onClick={HandleCloseTipper}/>
                      </li>
                    <ul class="list-group">
                    <li class="list-group-item"> 
                      <input 
                      type='checkbox'
                      onChange={HandleCheckAll}
                      checked={checkedItems.size === uniqueTipperIds.length}
                      /> &nbsp;Select All</li>
                      {uniqueTipperIds.map((item) => (
                        <li class="list-group-item">
                          <input 
                            type='checkbox' 
                            checked={checkedItems.has(item.id)}
                            onChange={(e) => HandleCheckboxes(e, item.id)}
                            />&nbsp;
                          {item.id}
                        </li>
                      ))}
                    </ul>
                  </div> 
                  }
                {excavatorContainer === true &&
                  <div style={{width:'150px',
                               height:'auto',
                              //  border:'2px solid red',
                               position:'absolute',
                               top:'40px',
                               left:'550px',
                               backgroundColor:'whitesmoke',
                               overflow:'auto'
                  }}>
                    <li class="list-group-item" 
                      style={{textAlign:'right',cursor:'pointer'}}
                      >
                      <AiFillCloseSquare  style={{color:'red'}} onClick={HandleCloseExcavator}/>
                    </li>
                    <ul class="list-group">
                    <li class="list-group-item"> 
                    <input 
                      type='checkbox' 
                      checked={checkedExaItems.size === uniqueExavatorIds.length} 
                      onChange={handleAllExcavators}/> 
                      &nbsp;
                      Select All
                    </li>
                    {uniqueExavatorIds.map((item) => (
                      <li class="list-group-item">
                        <input 
                          type='checkbox'
                          value={item.id}
                          checked={checkedExaItems.has(item.id)}
                          onChange={(e) => HandleExaCheckboxes(e, item.id)}
                          /> &nbsp;
                          {item.id}
                        </li>
                    ))}
                    </ul>
                  </div> 
                  }
                {shift === true &&
                  <div style={{width:'150px',
                               height:'auto',
                              //  border:'2px solid red',
                               position:'absolute',
                               top:'40px',
                               left:'100px',
                               backgroundColor:'whitesmoke',
                               overflow:'auto'
                  }}>
                    <li class="list-group-item" 
                      style={{textAlign:'right',cursor:'pointer'}}
                    >
                      <AiFillCloseSquare style={{color:'red'}} onClick={HandleCloseShift}/>
                    </li>
                    <ul class="list-group">
                    <li class="list-group-item"> 
                    <input 
                      type='checkbox' 
                      checked={checkedShiftsItems.size == uniqueShiftsIds.length} 
                      onChange={handleAllShifts}/> 
                      &nbsp;
                      Select All
                    </li>
                    {uniqueShiftsIds.map((item) => (
                      <li class="list-group-item">
                        <input 
                          type='checkbox'
                          value={item.id}
                          checked={checkedShiftsItems.has(item.id)}
                          onChange={(e) => HandleShiftsCheckboxes(e, item.id)}
                          /> &nbsp;
                          {item.id}
                        </li>
                    ))}
                    </ul>
                  </div> 
                  }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetails
