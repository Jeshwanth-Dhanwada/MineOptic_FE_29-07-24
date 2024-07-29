// AnotherComponent.js
import React, { useState, useEffect } from "react";
import { FaXmark, FaCheck } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaSistrix,FaMinus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { BASE_URL } from "../constants/apiConstants";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from '@mui/material/TextField';
import Tooltip from "@mui/material/Tooltip";
// Material UI for dialog box

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function Employee() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
    console.log(sidebarCollapsed);
  };
  const [empTypeId, setempTypeId] = useState();
  const [branchId, setbranchId] = useState();
  const [employeeName, setemployeeName] = useState();
  const [designation, setdesignation] = useState();
  const [grade, setgrade] = useState();
  const [dateOfJoining, setdateOfJoining] = useState();
  const [lastDate, setlastDate] = useState();
  const [user, setuser] = useState();
  const [userName, setuserName] = useState();
  const [password, setpassword] = useState();
  const [showForm1, setShowForm1] = useState(true);
  const [empId, setempId] = useState([]);


  const [data, setData] = useState([]);

  const [EditmployeeName, seteEditmployeeName] = useState();
  const [Editdesignation, seteEditdesignation] = useState();
  const [EdituserName, setEdituserName] = useState();
  const [Editpassword, setEditpassword] = useState();
  const [Editlastdate, setEditlastdate] = useState();
  const [Editgrade, setEditgrade] = useState();
  const [Editdateofjoining, setEditdateofjoining] = useState('');


  // Employee data ------------

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/employee`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        // const routedata.push(response.data)
        // console.log(routedata,"passing to the variable")
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  function getEmployee(){
    const apiUrl =
      `${BASE_URL}/api/employee`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        // const routedata.push(response.data)
        // console.log(routedata,"passing to the variable")
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }


  const handleempType = (event) => {
    setempTypeId(event.target.value);
    console.log("branch", empTypeId);
  };
  const handlbranchId = (event) => {
    setbranchId(event.target.value);
    console.log("branch", branchId);
  };
  const handleempName = (event) => {
    setemployeeName(event.target.value);
    console.log("branch", employeeName);
  };
  const handlDesignation = (event) => {
    setdesignation(event.target.value);
    console.log("branch", designation);
  };
  const handlgrade = (event) => {
    setgrade(event.target.value);
    console.log("branch", grade);
  };
  const handldateOfJoining = (event) => {
    setdateOfJoining(event.target.value);
    console.log("branch", dateOfJoining);
  };
  const handlelastDate = (event) => {
    setlastDate(event.target.value);
    console.log("branch", lastDate);
  };
  const handleuser = (event) => {
    setuser(event.target.value);
    console.log("branch", user);
  };
  const handleuserName = (event) => {
    setuserName(event.target.value);
    console.log("branch", userName);
  };
  const handlepassword = (event) => {
    setpassword(event.target.value);
    console.log("branch", password);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform actions like API calls or local storage here
    // Reset the form after submission
    const formData = {
      empTypeId: empTypeId,
      branchId: "1001",
      employeeName: employeeName,
      designation: designation,
      grade: grade,
      dateOfJoining: dateOfJoining.split("T")[0],
      lastDate: lastDate,
      isActive: true,
      // user:user,
      userName: userName,
      password: password,
      userId: "1111",
    };
    axios
      .post(
        `${BASE_URL}/api/employee`,
        formData
      )
      .then((response) => {
        console.log(response.data);
        console.log("New row added successfully");
        getEmployee()
        toast.success(
          <span>
            <strong>Successfully</strong> Employee Added.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            // autoClose: 3000, // Optional: Set auto close time in milliseconds
            // closeButton: false, // Optional: Hide close button
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
        setempTypeId("");
        setbranchId("");
        setemployeeName("");
        setdesignation("");
        setgrade("");
        setdateOfJoining("");
        setlastDate("");
        setuser("");
        setuserName("");
        setpassword("");
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
  };

  function emptyfields() {
    setempTypeId("");
    setbranchId("");
    setemployeeName("");
    setdesignation("");
    setgrade("");
    setdateOfJoining("");
    setlastDate("");
    setuser("");
    setuserName("");
    setpassword("");
    setShowForm1(true)
  }

  // Edit employee data feature
  
  useEffect(() => {
    const filteremployee = data.filter(item => item.empId == empId)
                               .map(item => item.employeeName)
    
    const filterdesignation = data.filter(item => item.empId == empId)
                                  .map(item => item.designation)
    
    const filteruserName = data.filter(item => item.empId == empId)
    .map(item => item.userName)
    
    const filterPassword = data.filter(item => item.empId == empId)
    .map(item => item.password)
    
    const filterlastdate = data.filter(item => item.empId == empId)
    .map(item => item.lastDate)

    const filterJoiningDate = data.filter(item => item.empId == empId)
    .map(item => item.dateOfJoining)

    

    const filtergrade = data.filter(item => item.empId == empId)
    .map(item => item.grade)

    seteEditdesignation(filterdesignation)
    setEdituserName(filteruserName)
    setEditlastdate(filterlastdate)
    setEditpassword(filterPassword)
    seteEditmployeeName(filteremployee )
    setEditgrade(filtergrade)
    setEditdateofjoining(filterJoiningDate)
  }, [data, empId]);
  

  const handleEditempName = (event) => {
    seteEditmployeeName(event.target.value);
  };
  
  const handleEditDesignation = (event) => {
    seteEditdesignation(event.target.value);
  };

  const handleEditUserName = (event) => {
    setEdituserName(event.target.value);
  };

  const handleEditpassword = (event) => {
    setEditpassword(event.target.value);
  };

  const handleEditlastDate = (event) => {
    setEditlastdate(event.target.value);
  };

  const handleEditgrade = (event) => {
    setEditgrade(event.target.value);
  };

  const handleEditDOJ = (event) => {
    setEditdateofjoining(event.target.value);
  };

  // Function to get today's date in the format 'YYYY-MM-DD'
  function getFormattedToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Correct format: YYYY-MM-DD
  }

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = React.useState(false);
  const [opendeletepopup, setOpenDelete] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSearchInput("")
  };

  const handleClickdeletepopup = () => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [editedIndex, setEditedIndex] = useState(null);

  function handleEdit(empId){
    console.log(empId,"EMPID");
    setempId(empId)
    setShowForm1(false)
    setOpen(false);
  }
  function UpdateEmployee(event){
    event.preventDefault()
        const payload = {
          // empId:48,
          empTypeId: "100",
          branchId: "1001",
          employeeName: EditmployeeName.toString(),
          designation: Editdesignation.toString(),
          grade: Editgrade.toString(),
          dateOfJoining: Editdateofjoining[0],
          lastDate: new Date(Editlastdate),
          isActive: true,
          // user:user,
          userName: EdituserName.toString(),
          password: Editpassword.toString(),
          userId: "1111",
    }
    console.log(payload,"payload");

    axios.put(`${BASE_URL}/api/employee/${empId}`, payload)
      .then((response) => {
        console.log('Data saved successfully', response.data);
        toast.success(
          <span><strong>successfully</strong> Updated.</span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            // autoClose: 3000, // Optional: Set auto close time in milliseconds
            // closeButton: false, // Optional: Hide close button
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
        getEmployee()
        setShowForm1(true)
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  }

  function handledelete(event){
    event.preventDefault()
      axios
        .delete(`${BASE_URL}/api/employee/${empId}`)
        .then((response) => {
          console.log("Node deleted successfully", response.data);
          getEmployee()
          setShowForm1(true)
          toast.error(
          <span><strong>Deleted</strong> successfully.</span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            // autoClose: 3000, // Optional: Set auto close time in milliseconds
            // closeButton: false, // Optional: Hide close button
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
        })
        .catch((error) => {
          console.error("Error deleting node:", error);
          toast.error(
          <span><strong>Cannot be</strong> deleted.</span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            // autoClose: 3000, // Optional: Set auto close time in milliseconds
            // closeButton: false, // Optional: Hide close button
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
        });
    }

  // search facility -------
  // Ramesh changes for filter & search

  const [searchInput, setSearchInput] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    const filteredData = data.filter((item) => {
      const name = item.employeeName.toLowerCase()
      const Id = String(item.empId).toLowerCase()
      const designation = item.designation.toLowerCase()
      return name.includes(searchValue.toLowerCase()) 
            || Id.includes(searchValue.toLowerCase())
            || designation.includes(searchValue.toLowerCase()) ;
    });
    setFilteredResults(filteredData);
  }
  // const useStyles = makeStyles(() => ({
  //   paper: { minWidth: "500px" },
  // }));

  return (
    <div>
      <div
        style={{
          width: sidebarCollapsed ? "5%" : "20%",
          transition: "width 0.1s",
          zIndex: 2,
          overflow: "hidden",
          backgroundColor: "red",
        }}
      >
        {/* <Sidebar onSidebarClick={toggleSidebar} /> */}
      </div>
      <div
        style={{ width: "100%", height: "100%" }}
      >
        {/* Dialog box */}
        <BootstrapDialog
          fullWidth
          maxWidth="lg"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {/* Employee List */}
                          
            <TextField id="filled-basic" label="Search" 
            onChange={(e) => searchItems(e.target.value)}
            value={searchInput}
            variant="filled" />

          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Paper sx={{ minWidth: '70px', overflowY: "scroll" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 465 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontSize: "11px"}}>Employee ID</TableCell>
                    <TableCell style={{fontSize: "11px"}}>Branch ID</TableCell>
                    <TableCell style={{fontSize: "11px"}}>Employee Name</TableCell>
                    <TableCell style={{fontSize: "11px"}}>Employee Designation</TableCell>
                    <TableCell style={{fontSize: "11px"}}>Employee Type ID</TableCell>
                    <TableCell style={{fontSize: "11px"}}>Grade</TableCell>
                    <TableCell style={{fontSize: "11px"}}>Date Of Joining</TableCell>
                    <TableCell style={{fontSize: "11px"}}>Last Date</TableCell>
                    <TableCell style={{width:'100px',fontSize: "11px"}}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchInput.length > 0 ? (
                  filteredResults.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{fontSize:'11px'}} scope="row">{row.empId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.employeeName}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.designation}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.empTypeId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.grade}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.dateOfJoining?.split("T")[0]}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.lastDate}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>
                      <input 
                          type="radio" 
                          onClick={() => handleEdit(row.empId)} 
                          style={{border:'none',backgroundColor:'transparent'}}
                      /> 
                      </TableCell>
                    </TableRow>
                  ))):
                  (data.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{fontSize:'11px'}} scope="row">{row.empId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.employeeName}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.designation}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.empTypeId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.grade}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.dateOfJoining?.split("T")[0]}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.lastDate}</TableCell>
                      <TableCell style={{textAlign:'center',fontSize:'11px'}}>
                      <input 
                          type="radio" 
                          onClick={() => handleEdit(row.empId)} 
                          style={{border:'none',backgroundColor:'transparent'}}
                      />
                      </TableCell>
                    </TableRow>
                  )))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <DialogActions>
            <Button autoFocus class="btn btn-danger btn-sm" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      {showForm1 ? (
        <form onSubmit={handleSubmit} style={{fontSize:'11px'}}>
          <div className="container">
            <div className="col-12 p-2">
            {/* <Tooltip title="Search Employee" placement="right-start"> */}
            <Button
              variant="contained"
              class="btn btn-primary btn-sm"
              title="Search Employee"
              onClick={handleClickOpen}
          >
            <FaSistrix />
          </Button>
            <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="offset-0 col-4">
                    <label htmlFor="userName">User Name:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      class="form-control"
                      value={userName}
                      onChange={handleuserName}
                      style={{fontSize:'11px'}}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-4 ">
                    <label htmlFor="password">Password:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={password}
                      style={{fontSize:'11px'}}
                      onChange={handlepassword}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="offset-0 col-4">
                    <label htmlFor="EmployeeID">Employee Type ID:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="number"
                      id="EmployeeID"
                      name="EmployeeID"
                      className="form-control"
                      value={empTypeId}
                      style={{fontSize:'11px'}}
                      onChange={handleempType}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-4">
                    <label htmlFor="EmpName">Employee Name:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      id="EmpName"
                      name="EmpName"
                      className="form-control"
                      value={employeeName}
                      style={{fontSize:'11px'}}
                      onChange={handleempName}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="col-4">
                    <label htmlFor="branchID">Designation:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      id="Designation"
                      name="Designation"
                      className="form-control"
                      value={designation}
                      style={{fontSize:'11px'}}
                      onChange={handlDesignation}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="offset-0 col-4">
                    <label htmlFor="branchID">Grade:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      id="Grade"
                      name="Grade"
                      className="form-control"
                      value={grade}
                      style={{fontSize:'11px'}}
                      onChange={handlgrade}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="col-4">
                    <label htmlFor="branchID">Date of Joining:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="date"
                      id="DOJ"
                      name="DOJ"
                      className="form-control"
                      value={dateOfJoining}
                      style={{fontSize:'11px'}}
                      onChange={handldateOfJoining}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="offset-0 col-4">
                    <label htmlFor="branchID">Last Date:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="date"
                      id="LastDate"
                      name="LastDate"
                      className="form-control"
                      value={lastDate ? lastDate : ""}
                      onChange={handlelastDate}
                      style={{fontSize:'11px'}}
                      min={getFormattedToday()}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className=" row">
              <div className="col-6">
                <div className=" offset-0 col-6">
                  <button className=" btn btn-success btn-sm" type="submit">
                    <FaCheck />
                  </button>
                  &nbsp;
                  <a onClick={emptyfields} className="btn btn-danger btn-sm">
                    <FaXmark />
                  </a>
                </div>
              </div>
            </div>
            </div>
          </div>
        </form>
      ) : (
        <form style={{fontSize:'11px'}}>
          <div className="container">
          <div className="col-12 p-2">
          <button onClick={emptyfields} className="btn btn-primary btn-sm">Go Back</button>
            <Button 
                class="btn btn-danger btn-sm" 
                onClick={handleClickdeletepopup}
                style={{position:'absolute',right:'10px',width:'50px'}}
                >
              <FaMinus/>
            </Button>
            <React.Fragment>
              <Dialog
                open={opendeletepopup}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                  style: {
                    marginTop: -350, // Adjust the marginTop value as needed
                    width:'40%'
                  },
                }}
              >
                <DialogTitle id="alert-dialog-title">
                  {/* {"Taxonalytica"} */}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handledelete} autoFocus>
                    Yes
                  </Button>
                  <Button onClick={handleDeleteClose}>No</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="offset-0 col-4">
                    <label htmlFor="userName">Employee ID:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      class="form-control"
                      style={{fontSize:'11px'}}
                      disabled
                      value={data
                            .filter(item => item.empId == empId)
                            .map(item => item.empId)
                            }
                    />
                  </div>
                </div>
              </div>
              
            </div>
            <br />
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="offset-0 col-4">
                    <label htmlFor="userName">User Name:</label>
                  </div>
                  <div className="col-8">
                    
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      class="form-control"
                      style={{fontSize:'11px'}}
                      value={EdituserName}
                      onChange={handleEditUserName}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-4 ">
                    <label htmlFor="password">Password:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      style={{fontSize:'11px'}}
                      value={Editpassword}
                      onChange={handleEditpassword}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="offset-0 col-4">
                    <label htmlFor="EmployeeID">Employee Type ID:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="number"
                      id="EmployeeID"
                      name="EmployeeID"
                      style={{fontSize:'11px'}}
                      className="form-control"
                      value={data
                            .filter(item => item.empId == empId)
                            .map(item => item.empTypeId)
                            }
                      onChange={handleempType}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-4">
                    <label htmlFor="EmpName">Employee Name:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      id="EmpName"
                      name="EmpName"
                      style={{fontSize:'11px'}}
                      className="form-control"
                      value={EditmployeeName}
                      onChange={handleEditempName}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="col-4 ">
                    <label htmlFor="branchID">Designation:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      id="Designation"
                      name="Designation"
                      style={{fontSize:'11px'}}
                      className="form-control"
                      value={Editdesignation}
                      onChange={handleEditDesignation}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="offset-0 col-4 ">
                    <label htmlFor="branchID">Grade:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      id="Grade"
                      style={{fontSize:'11px'}}
                      name="Grade"
                      className="form-control"
                      value={Editgrade}
                      onChange={handleEditgrade}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="row">
                  <div className="col-4 ">
                    <label htmlFor="branchID">Date of Joining:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="date"
                      id="DOJ"
                      name="DOJ"
                      style={{fontSize:'11px'}}
                      className="form-control"
                      value={Editdateofjoining}
                      onChange={handleEditDOJ}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="offset-0 col-4 ">
                    <label htmlFor="branchID">Last Date:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="date"
                      id="LastDate"
                      name="LastDate"
                      style={{fontSize:'11px'}}
                      className="form-control"
                      value={Editlastdate}
                      onChange={handleEditlastDate}
                      min={getFormattedToday()}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className=" row">
              <div className="col-6">
                <div className=" offset-0 col-6">
                  <button className="btn btn-success btn-sm" onClick={UpdateEmployee} type="submit">
                    <FaCheck />
                  </button>
                  &nbsp;
                  <button onClick={emptyfields} disabled className="btn btn-danger btn-sm">
                    <FaXmark />
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </form>
      )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Employee;
