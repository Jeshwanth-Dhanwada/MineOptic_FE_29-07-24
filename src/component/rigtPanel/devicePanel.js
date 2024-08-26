import "./rightpanel.css";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { getDeviceMaster } from "../../api/shovelDetails";
import { Backdrop, CircularProgress } from "@mui/material";
import AuthContext from "../../context/AuthProvider";

const DevicePanel = () => {
  const { auth } = useContext(AuthContext)
  const onDragStart = (event, job) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(job));
    event.dataTransfer.effectAllowed = "move";
  };

  const [devices, setDevices] = useState([])
  const [OpenLoader,setOpenLoader] = useState(false)
  useEffect(() => {
    showDevices()
  }, [])
  const showDevices = async (key) =>{
    setOpenLoader(true)
    const responsedata = await getDeviceMaster()
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setDevices(filteredData, key)
    setOpenLoader(false)
  }
  console.log(devices.map((item)=>item),"30004")
  return (
    <aside>
      <div className="employee-list-container">
        <table className="table table-bordered tablestriped">
          <thead style={{ fontSize: "small" }} className="sticky-top">
            <tr>
              <th style={{fontSize:'11px'}}>Id</th>
              <th style={{fontSize:'11px'}}>Device Name</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((item) => (
              <tr
                className="dndnode input employee-list-item"
                onDragStart={(event) => onDragStart(event, item)}
                draggable
              >
                <td>{item.deviceId}</td>
                <td>{item.deviceName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {OpenLoader && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={OpenLoader}
          // onClick={handleClose}
        >
          <CircularProgress size={80} color="inherit" />
        </Backdrop>
        )}
    </aside>
  );
};

export default DevicePanel;
