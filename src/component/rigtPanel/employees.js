import { getEmployees } from "../../api/shovelDetails";
import "./rightpanel.css";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { Backdrop, CircularProgress } from "@mui/material";

const Employees = () => {
  const onDragStart = (event, empData) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(empData)
    );
    event.dataTransfer.effectAllowed = "move";
  };
  const {auth} = useContext(AuthContext)
  const [OpenLoader,setOpenLoader] = useState(false)
  const [Employeedata,setEmployeedata] = useState([])
  const showgetEmployees = async (key) => {
    setOpenLoader(true)
    const responsedata = await getEmployees();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setEmployeedata(filteredData, key);
    setOpenLoader(false)
  };
  useEffect(()=>{
    showgetEmployees()
  },[])
  return (
    <aside>
      <div className="employee-list-container">
        {/* <div style={{ height: "350px", overflowY: "auto" }}> */}
        <table className="table table-bordered tablestriped">
          <thead className="sticky-top">
            <tr style={{ fontSize: "11px" }}>
              <th style={{ width: "55%",fontSize: "11px" }}>Employee</th>
              <th style={{ fontSize: "11px" }}>Designation</th>
            </tr>
          </thead>
          <tbody>
            {Employeedata.map((item) => (
              <tr
                onDragStart={(event) => onDragStart(event, item)}
                draggable
              >
                <td>
                  {item.empId} - {item.employeeName}
                </td>
                <td>{item.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {OpenLoader && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={OpenLoader}
          // onClick={handleClose}
        >
          <CircularProgress size={80} color="inherit" />
        </Backdrop>
        )}
      </div>
    </aside>
  );
};

export default Employees;
