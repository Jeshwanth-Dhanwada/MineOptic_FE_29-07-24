import React, { useContext, useEffect, useState } from "react";
import { getTripperStateHistory } from "../api/shovelDetails";
import AuthContext from "../context/AuthProvider";
import { Backdrop, CircularProgress } from "@mui/material";

function EquipmentReport() {
  const { auth } = useContext(AuthContext);
  const [equipmentType, setEquipmentType] = useState("");
  const [tipperStateHis, setTipperStateHis] = useState([]);
  const [filteredTipper, setFilteredTipper] = useState([]);
  const [filteredExcavator, setFilteredExcavator] = useState([]);
  const [OpenLoader, setOpenLoader] = useState(false);

  const showTipperStateHisData = async (key) => {
    setOpenLoader(true);
    const responsedata = await getTripperStateHistory();
    //     const filteredData = responsedata.filter(
    //       (dbitem) => String(dbitem.branchId) === String(auth.branchId)
    //     );
    setTipperStateHis(responsedata, key);
    setOpenLoader(false);
  };

  useEffect(() => {
    showTipperStateHisData();
  }, []);
  console.log(tipperStateHis, "tipperStateHis");
  const handleTruckChange = () => {
    setEquipmentType("Truck");
  };

  const handleExcavatorChange = () => {
    setEquipmentType("Excavator");
  };

  useEffect(() => {
    if (equipmentType === "Truck") {
      setFilteredExcavator([]);
      const filteredTruck = tipperStateHis.filter(
        (item) =>
          item.tipper_id != "" && item.tipper_id != -1 && item.tipper_id != null
      );
      console.log(filteredTruck, "equipmentType");
      setFilteredTipper(filteredTruck);
    }
    if (equipmentType === "Excavator") {
      setFilteredTipper([]);
      const filteredExcavator = tipperStateHis.filter(
        (item) =>
          item.first_excavator_id != "" &&
          item.first_excavator_id != -1 &&
          item.first_excavator_id != null
      );
      console.log(filteredExcavator, "equipmentType");
      setFilteredExcavator(filteredExcavator);
    }
  }, [equipmentType, tipperStateHis]);

  console.log(filteredTipper.length, "equipmentType");
  console.log(filteredExcavator.length, "equipmentType");
  console.log(tipperStateHis.length, "equipmentType");

  //Converting UTC time to IST ----------

  function convertToIST(dateString) {
    const date = new Date(dateString);
    // Convert to IST
    const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000); // Add 5 hours 30 minutes
    // Format the IST date to dd-MM-yyyy hh:mm:ss
    const formattedDate = `${String(istDate.getDate()).padStart(
      2,
      "0"
    )}-${String(istDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${istDate.getFullYear()}`;
    const formattedTime = `${String(istDate.getHours()).padStart(
      2,
      "0"
    )}:${String(istDate.getMinutes()).padStart(2, "0")}:${String(
      istDate.getSeconds()
    ).padStart(2, "0")}`;

    return `${formattedDate}, ${formattedTime}`;
  }

  // Date filtering

  const [datefil, setdatefil] = useState();
  const HandleDateFilter = (event) => {
    setDateFilteredData([]);
    setdatefil(event.target.value);
  };

  // Get min and max dates from groupedTripDetails
  // const groupedDates = tipperStateHis.map(
  //   (date) => new Date(date.pdate.split("T")[0])
  // );
  const getDateSource = () => {
    if (filteredTipper.length > 0) {
      return filteredTipper;
    } else if (filteredExcavator.length > 0) {
      return filteredExcavator;
    } else {
      return tipperStateHis;
    }
  };
  
  const groupedDates = getDateSource().map(
    (date) => new Date(date.pdate.split("T")[0])
  );
  
  
  const minDate =
    groupedDates.length > 0 ? new Date(Math.min(...groupedDates)) : null;
  const maxDate =
    groupedDates.length > 0 ? new Date(Math.max(...groupedDates)) : null;

  const formatDateForInput = (date) => {
    const a = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`
      : "";
    return a;
  };
  const minDateFormatted = formatDateForInput(minDate);
  const maxDateFormatted = formatDateForInput(maxDate);
  const [DateFilteredData, setDateFilteredData] = useState([]);
  useEffect(() => {
    if (datefil) {
      if(filteredTipper?.length > 0){
        const getFilteredDateData = filteredTipper.filter(
          (item) => item.pdate.split("T")[0] == datefil
        );
        setDateFilteredData(getFilteredDateData);
      }
      if(filteredExcavator?.length > 0){
        const getFilteredDateData = filteredExcavator.filter(
          (item) => item.pdate.split("T")[0] == datefil
        );
        setDateFilteredData(getFilteredDateData);
      }
      else{
        const getFilteredDateData = tipperStateHis.filter(
          (item) => item.pdate.split("T")[0] == datefil
        );
        setDateFilteredData(getFilteredDateData);
      }
    }
  }, [tipperStateHis, datefil, filteredTipper, filteredExcavator]);

  console.log(equipmentType, "equipmentType");
  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-1">Equipment Type</div>
        <div className="col-3">
          <div>
            <input
              type="radio"
              name="equipmentType"
              value="Truck"
              onChange={handleTruckChange}
            />{" "}
            Truck
          </div>
          <div>
            <input
              type="radio"
              name="equipmentType"
              value="Excavator"
              onChange={handleExcavatorChange}
            />{" "}
            Excavator
          </div>
        </div>
      </div>
      <div className="row" style={{ height: "400px", overflowY: "scroll" }}>
        <table className="table table-bordered">
          <thead className="sticky-top">
            <tr>
              <th style={{ position: "relative", width: "90px" }}>
                Date
                <span
                  style={{
                    position: "absolute",
                    right: "22px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="date"
                    style={{
                      width: "20px",
                      height: "18px",
                      cursor: "pointer",
                    }}
                    min={minDateFormatted}
                    max={maxDateFormatted}
                    value={datefil}
                    onChange={HandleDateFilter}
                  />
                </span>
              </th>
              <th>From Time</th>
              <th>To Time</th>
              <th>Equipment</th>
              <th>State</th>
              <th>From Location</th>
              <th>To Location</th>
            </tr>
          </thead>
          <tbody>
            {DateFilteredData?.length > 0
              ? DateFilteredData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.pdate.split("T")[0].split("-").reverse().join("-")}
                    </td>
                    <td>{convertToIST(item.state_date)}</td>
                    <td></td>
                    <td></td>
                    <td>{item.new_state}</td>
                    <td></td>
                    <td></td>
                  </tr>
                ))
              : filteredTipper?.length > 0
              ? filteredTipper.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.pdate.split("T")[0].split("-").reverse().join("-")}
                    </td>
                    <td>{convertToIST(item.state_date)}</td>
                    <td></td>
                    <td>{item.new_state}</td>
                    <td></td>
                    <td></td>
                  </tr>
                ))
              : filteredExcavator?.length > 0
              ? filteredExcavator.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.pdate.split("T")[0].split("-").reverse().join("-")}
                    </td>
                    <td>{convertToIST(item.state_date)}</td>
                    <td></td>
                    <td>{item.new_state}</td>
                    <td></td>
                    <td></td>
                  </tr>
                ))
              : tipperStateHis.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.pdate.split("T")[0].split("-").reverse().join("-")}
                    </td>
                    <td>{convertToIST(item.state_date)}</td>
                    <td></td>
                    <td>{item.new_state}</td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {OpenLoader && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={OpenLoader}
          // onClick={handleClose}
        >
          <CircularProgress size={80} color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default EquipmentReport;
