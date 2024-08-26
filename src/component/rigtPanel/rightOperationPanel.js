import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useContext, useEffect, useState } from "react";
import { getAttendance, getEmpNodeMapping, getEmployees, getOADetails, getStaffAllocation } from "../../api/shovelDetails";
import AllJobs from "./allJobsPanel";
import NodeState from "./AttendancePanel";
import NodeAllocation from "./nodeAllocation";
import AuthContext from "../../context/AuthProvider";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RightOperationTabPanel({ selectedMenuItem, sendtoPlanningtab, toRightOperationTabPanel }) {
  const [value, setValue] = useState(0);
  const {auth} = useContext(AuthContext)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [Oadetails, setOadetails] = useState([]);
  const [Employeedata, setEmployeedata] = useState([]);
  const [staffAllocation, setstaffAllocation] = useState([]);
  const [employeeNodeMap, setemployeeNodeMap] = useState([]);
  const [attendancedata, setattendancedata] = useState([]);
  useEffect(() => {
    showOA_details();
    showgetEmployees();
    showgetStaffAllocation();
    showemployeeNodeMap();
    showAttendance();
  }, []);

 const [OpenLoader,setOpenLoader] = useState(false)

  const showOA_details = async (key) => {
    setOpenLoader(true)
    const responsedata = await getOADetails();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setOadetails(filteredData, key);
    setOpenLoader(false)
  };

  const showgetEmployees = async (key) => {
    const responsedata = await getEmployees();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setEmployeedata(filteredData, key);
  };

  const showgetStaffAllocation = async (key) => {
    const responsedata = await getStaffAllocation();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setstaffAllocation(filteredData, key);
  };

  const showemployeeNodeMap = async (key) => {
    const responsedata = await getEmpNodeMapping();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setemployeeNodeMap(filteredData, key);
  };

  const showAttendance = async (key) => {
    const responsedata = await getAttendance();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setattendancedata(filteredData, key);
  };

  
  let Attend = [];

  for (let i = 0; i < Employeedata.length; i++) {
    const empNodeVal = employeeNodeMap.filter(
      (item) => Employeedata[i].empId == item?.emp?.empId
    );
    Attend.push({
      ...Employeedata[i],
      ...empNodeVal[0],
    });
  }

  const newAttendData = [];
  // Iterate through the Attend data
  Attend.forEach((item) => {
    // Check if the empId is not present in the AttendanceData
    if (
      !attendancedata.some(
        (dataItem) =>
          parseInt(dataItem.empId) === parseInt(item.empId) &&
          dataItem.shiftId == item.shiftId
      )
    ) {
      // If it doesn't match, add it to the newAttendData
      newAttendData.push(item);
    }
  });

  const handlelabel = (label) => {
    sendtoPlanningtab(label)
    console.log(label);
  }

  useEffect(() => {
    switch (toRightOperationTabPanel) {
      case "Job Mapping":
        setValue(1); // Staff Mapping tab
        break;
      case "Staff Mapping":
        setValue(2); // Staff Mapping tab
        break;
      // Add more cases for other values if needed
      default:
        setValue(0); // Default to Nodes tab
    }
  }, [toRightOperationTabPanel])
  
  return (
    
//     <Card 
//     id="dasboard-right-container" 
//     style={{ position: 'fixed', top: '45px' }} 
//     // className={`dashboard-right-container sticky-top ${expanded ? 'expanded' : 'partial'}`}>
//     className={`dashboard-right-container sticky-top ${expanded ? 'expanded' : 'partial'}`} >
//   {expanded ? (
//     <div className="pt-2">
//     {/* <div className="pt-2" onClick={handleExpandToggle}> */}
//       <RightSlider isExpandedFull={isExpandedFull} setIsExpandedFull={setIsExpandedFull} onclick={HandleIcon} />
//       <KeyboardDoubleArrowRightIcon
//               style={{  
//                 cursor: "pointer",
//                 backgroundColor: "#09587C", 
//                 color: '#ffffff',
//                 position: "fixed",
//                 right:size? size : '30%',
//                 width:'25',
//                 height:'47px',
//                 top:'46px',
//                 display: 'inline'
//               }} 
//               onClick={handleExpandToggle}
//             />
//     </div>
//   ) : (
//     <div className="pt-2" onClick={handleExpandToggle}>
//       <KeyboardDoubleArrowLeftIcon
//             style={{ cursor: "pointer", backgroundColor: "#09587C", 
//             color: '#ffffff',width:'25',height:'47px',position: "fixed",
//             right:'0%'}}
//             onClick={handleExpandToggle}
//           />
//     </div>
//   )}
// </Card> 
  <div >
    <Box sx={{ position: "relative" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab style={{ fontSize: '10.5px', fontWeight: 'bold', color:'#727272', backgroundColor: value === 0 ? "#E6ECEF" : "#FFFFFF" }} onClick={() => handlelabel("")} label="Attendance" {...a11yProps(0)} />
        <Tab style={{ fontSize: '10.5px', fontWeight: 'bold', color:'#727272', backgroundColor: value === 1 ? "#E6ECEF" : "#FFFFFF" }} onClick={() => handlelabel("Job Mapping")} label="Job Assignment" {...a11yProps(1)} />
        <Tab style={{ fontSize: '10.5px', fontWeight: 'bold', color:'#727272', backgroundColor: value === 2 ? "#E6ECEF" : "#FFFFFF" }} onClick={() => handlelabel("Staff Mapping")} label="Staff Allocation" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <NodeState />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AllJobs Oadetails={Oadetails} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <NodeAllocation />
      </CustomTabPanel>
    </Box>
  </div>
  )}

 // expanded ? (

    //   <div>
    //       <div className="pt-2" onClick={handleExpandToggle}>
    //         <KeyboardDoubleArrowRightIcon
    //           style={{  
    //             cursor: "pointer",
    //             backgroundColor: "#09587C", 
    //             color: '#ffffff',
    //             position: "fixed",
    //             right:size? size : '30%',
    //             width:'25',
    //             height:'47px',
    //             top:'46px',
    //             display: 'inline'
    //           }} 
    //           onClick={handleExpandToggle}
    //         />
    //       </div>
    //   <Card
    //     id="dasboard-right-container"
    //     style={{ position: 'fixed', top: '45px' }}
    //     className={`dashboard-right-container sticky-top ${expanded ? 'expanded' : 'partial'}`}>
    //     <RightSlider isExpandedFull={isExpandedFull} setIsExpandedFull={setIsExpandedFull} onclick={HandleIcon}/>
    //     <Box sx={{ position: "relative" }}>
    //       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    //         <Tabs
    //           value={value}
    //           onChange={handleChange}
    //           aria-label="basic tabs example"
    //           style={{background:'#FFFFFF'}}
    //         >
    //           <Tab style={{ fontSize: '10.5px', fontWeight: 'bold', color:'#727272', backgroundColor: value === 0 ? "#E6ECEF" : "#FFFFFF" }} onClick={() => handlelabel("")} label="Attendance" {...a11yProps(0)} />
    //           <Tab style={{ fontSize: '10.5px', fontWeight: 'bold', color:'#727272', backgroundColor: value === 1 ? "#E6ECEF" : "#FFFFFF" }} onClick={() => handlelabel("Job Mapping")} label="Job Assignment" {...a11yProps(1)} />
    //           <Tab style={{ fontSize: '10.5px', fontWeight: 'bold', color:'#727272', backgroundColor: value === 2 ? "#E6ECEF" : "#FFFFFF" }} onClick={() => handlelabel("Staff Mapping")} label="Staff Allocation" {...a11yProps(2)} />
    //         </Tabs>
    //       </Box>
    //       <CustomTabPanel value={value} index={0}>
    //         <NodeState />
    //       </CustomTabPanel>
    //       <CustomTabPanel value={value} index={1}>
    //         <AllJobs Oadetails={Oadetails} />
    //       </CustomTabPanel>
    //       <CustomTabPanel value={value} index={2}>
    //         <NodeAllocation />
    //       </CustomTabPanel>
    //     </Box>
    //   </Card>
    //   </div>
    // ) : (
    //   <div
    //     id="dasboard-right-container"
    //     style={{ position: "fixed", top: "45px" }}
    //     className={`dashboard-right-container sticky-top partial`}>
    //     <div className="pt-2" onClick={handleExpandToggle}>
    //       <KeyboardDoubleArrowLeftIcon
    //         style={{ cursor: "pointer", backgroundColor: "#09587C", 
    //         color: '#ffffff',width:'25',height:'47px',position: "fixed",
    //         right:'0%'  }}
    //         onClick={handleExpandToggle}
    //       />
    //     </div>
    //     {OpenLoader && (
    //     <Backdrop
    //       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //       open={OpenLoader}
    //       // onClick={handleClose}
    //     >
    //       <CircularProgress size={80} color="inherit" />
    //     </Backdrop>
    //     )}
    //   </div>
    // )