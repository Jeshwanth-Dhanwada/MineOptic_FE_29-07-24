import React, { useEffect, useState } from "react";
import { getTripDetails } from "../api/shovelDetails";
import { IoFilterSharp } from "react-icons/io5";

function TripSummary() {
  const [OpenLoader, setOpenLoader] = useState(false);
  const [TripDetails, setTripDetails] = useState([]);

  const showTripDetails = async () => {
    setOpenLoader(true);
    const responsedata = await getTripDetails();
    setTripDetails(responsedata);
    setOpenLoader(false);
  };

  useEffect(() => {
    showTripDetails();
  }, []);

  // Converting UTC time to IST ----------
  const convertToIST = (dateString) => {
    const date = new Date(dateString);
    const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000); // Add 5 hours 30 minutes
    const formattedDate = `${String(istDate.getDate()).padStart(2, '0')}-${String(istDate.getMonth() + 1).padStart(2, '0')}-${istDate.getFullYear()}`;
    return formattedDate;
  };

  // Grouping and counting trip_no by pdate and shift_id
  // const groupedTripDetails = TripDetails.reduce((acc, item) => {
  //   const date = item.pdate.split("T")[0];
  //   if (!acc[date]) {
  //     acc[date] = { "1": 0, "2": 0, "3": 0, total: 0 }; // Initialize counters for each shift and total
  //   }
  //   if (item.shift_id === "1") acc[date]["1"] += 1;
  //   if (item.shift_id === "2") acc[date]["2"] += 1;
  //   if (item.shift_id === "3") acc[date]["3"] += 1;
  //   acc[date].total += 1; // Increment total count
  //   return acc;
  // }, {});

  // const uniqueTripDetails = Object.keys(groupedTripDetails).map(date => ({
  //   date,
  //   shift1: groupedTripDetails[date]["1"],
  //   shift2: groupedTripDetails[date]["2"],
  //   shift3: groupedTripDetails[date]["3"],
  //   total: groupedTripDetails[date].total
  // }));

  const groupedTripDetails = TripDetails.reduce((acc, item) => {
    const date = item.pdate.split("T")[0];
    if (!acc[date]) {
      acc[date] = { 
        "1": { count: 0, trip_no: 0 },
        "2": { count: 0, trip_no: 0 },
        "3": { count: 0, trip_no: 0 },
        total: { count: 0, trip_no: 0 }
      }; // Initialize counters for each shift and total
    }
    
    const shift = acc[date][item.shift_id];
    if (shift) {
      shift.count += 1;
      shift.trip_no += item.trip_no;
    }
  
    acc[date].total.count += 1;
    acc[date].total.trip_no += item.trip_no;
    
    return acc;
  }, {});
  
  const uniqueTripDetails = Object.keys(groupedTripDetails).map(date => ({
    date,
    shift1: groupedTripDetails[date]["1"].count,
    shift1TripNo: groupedTripDetails[date]["1"].trip_no,
    shift2: groupedTripDetails[date]["2"].count,
    shift2TripNo: groupedTripDetails[date]["2"].trip_no,
    shift3: groupedTripDetails[date]["3"].count,
    shift3TripNo: groupedTripDetails[date]["3"].trip_no,
    total: groupedTripDetails[date].total.count,
    totalTripNo: groupedTripDetails[date].total.trip_no
  }));
  
  console.log(uniqueTripDetails);

  // Calculate total counts for each shift
const totalShiftCounts = uniqueTripDetails.reduce((totals, item) => {
  totals.shift1 += item.shift1;
  totals.shift2 += item.shift2;
  totals.shift3 += item.shift3;
  totals.total += item.total;
  return totals;
}, { shift1: 0, shift2: 0, shift3: 0, total: 0 });
  


  // Get min and max dates from groupedTripDetails
  const groupedDates = Object.keys(groupedTripDetails).map(date => new Date(date));
  const minDate = groupedDates.length > 0 ? new Date(Math.min(...groupedDates)) : null;
  const maxDate = groupedDates.length > 0 ? new Date(Math.max(...groupedDates)) : null;

  const formatDateForInput = (date) => {
    return date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` : '';
  };

  const minDateFormatted = formatDateForInput(minDate);
  const maxDateFormatted = formatDateForInput(maxDate);


  // Date filtering

  const [datefil,setdatefil] = useState()
  const HandleDateFilter = (event) => {
    setdatefil(event.target.value)
    console.log(event.target.value,"date")
  }

  const filterDatedata = uniqueTripDetails.filter((item)=>item.date == datefil)

  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="offset-3 col-6">
          <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table className="table table-bordered table-striped">
              <thead className="sticky-top">
                <tr>
                  <th style={{ position: 'relative',width:'80px'}}>Date 
                    <span style={{ position: 'absolute', right: '5px',cursor:'pointer' }}>
                    <input  
                      type="date" 
                      style={{width:'20px',height:'18px',cursor:'pointer'}} 
                      min={minDateFormatted}
                      max={maxDateFormatted}
                      value={datefil}
                      onChange={HandleDateFilter}
                      />
                    </span>
                  </th>
                  <th colSpan="3" style={{textAlign:'center'}}>Shift</th>
                  <th style={{width:'80px'}}>Total Trips</th>
                </tr>
                <tr>
                  <th></th> {/* Empty cell for Date header alignment */}
                  <th style={{width:'70px',textAlign:'center'}}>1</th>
                  <th style={{width:'70px',textAlign:'center'}}>2</th>
                  <th style={{width:'70px',textAlign:'center'}}>3</th>
                  <th></th> {/* Empty cell for Total Trips header alignment */}
                </tr>
              </thead>
              <tbody>
                {filterDatedata && filterDatedata.length > 0 ? (
                  filterDatedata.map((item,index)=>
                    <tr key={index}> {/* Using index as key since item does not have a unique id */}
                    <td>{convertToIST(item.date)}</td>
                    <td style={{textAlign:'center'}}>{item.shift1}</td>
                    <td style={{textAlign:'center'}}>{item.shift2}</td>
                    <td style={{textAlign:'center'}}>{item.shift3}</td>
                    <td style={{textAlign:'center'}}>{item.total}</td>
                  </tr>
                  ))
                  : 
                  (
                   uniqueTripDetails.map((item, index) => (
                    <tr key={index}> {/* Using index as key since item does not have a unique id */}
                      <td>{convertToIST(item.date)}</td>
                      <td style={{textAlign:'center'}}>{item.shift1}</td>
                      <td style={{textAlign:'center'}}>{item.shift2}</td>
                      <td style={{textAlign:'center'}}>{item.shift3}</td>
                      <td style={{textAlign:'center'}}>{item.total}</td>
                    </tr>
                  )))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td style={{textAlign: 'center'}}>{totalShiftCounts.shift1}</td>
                  <td style={{textAlign: 'center'}}>{totalShiftCounts.shift2}</td>
                  <td style={{textAlign: 'center'}}>{totalShiftCounts.shift3}</td>
                  <td style={{textAlign: 'center'}}>{totalShiftCounts.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripSummary;
