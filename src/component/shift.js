import React, { useState, useEffect } from "react";
import { FaXmark, FaCheck, FaSistrix, FaMinus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../constants/apiConstants";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
// Material UI for dialog box

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function Shift() {
  const [data, setData] = useState([]);
  const [branchId, setBranchId] = useState();
  const [shiftName, setShiftName] = useState();
  const [shiftNumber, setShiftNumber] = useState();
  const [StartTime, setStartTime] = useState();
  const [EndTime, setEndTime] = useState();

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/shift`;
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

  function getShiftdata() {
    const apiUrl = `${BASE_URL}/api/shift`;
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

  const handleBranchIdChange = (event) => {
    setBranchId(event.target.value);
    console.log("branch", branchId);
  };
  const handleShiftNameChange = (event) => {
    setShiftName(event.target.value);
    console.log("shiftName", shiftName);
  };
  const handleShiftNumberChange = (event) => {
    setShiftNumber(event.target.value);
    console.log("shiftName", shiftNumber);
  };
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
    console.log("shiftstart", StartTime);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
    // console.log("shiftend", EndTime);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("start time:", StartTime);
    console.log("endtime", EndTime);

    const formData = {
      branchId: "1001",
      shiftName: shiftName,
      shiftNumber: shiftNumber,
      startTime: StartTime,
      endTime: EndTime,
      userId: "1111",
    };
    console.log(formData);

    axios
      .post(`${BASE_URL}/api/shift`, formData)
      .then((response) => {
        console.log(response.data);
        console.log("New row added successfully");
        getShiftdata();
        toast.success(
          <span>
            <strong>Successfully</strong> {shiftName} Shift Added.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            // autoClose: 3000, // Optional: Set auto close time in milliseconds
            // closeButton: false, // Optional: Hide close button
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
        setBranchId("");
        setShiftName("");
        setStartTime("");
        setEndTime("");
        setShiftNumber("");
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
  };

  function Emptyfields() {
    setBranchId("");
    setShiftName("");
    setStartTime("");
    setEndTime("");
    setShiftNumber("");
    setShowForm1(true);
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
  const [searchInput, setSearchInput] = useState([]);
  const [shiftId, setshiftId] = useState();
  const [filteredResults, setFilteredResults] = useState([]);
  const [showForm1, setShowForm1] = useState(true);
  const [editStartTIme, seteditStartTIme] = useState([]);
  const [editEndTIme, seteditEndTIme] = useState([]);
  const [editshiftName, seteditshiftName] = useState([]);
  const [editshiftNumber, seteditshiftNumber] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    const filteredData = data.filter((item) => {
      const name = item.shiftName.toLowerCase();
      const Id = String(item.shiftId).toLowerCase();
      const STime = item.startTime.toLowerCase();
      const ETime = item.endTime.toLowerCase();
      return (
        name.includes(searchValue.toLowerCase()) ||
        Id.includes(searchValue.toLowerCase()) ||
        STime.includes(searchValue.toLowerCase()) ||
        ETime.includes(searchValue.toLowerCase())
      );
    });
    setFilteredResults(filteredData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickdeletepopup = () => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  function handleEdit(shiftId) {
    console.log(shiftId, "shiftId");
    setshiftId(shiftId);
    setShowForm1(false);
    setOpen(false);
  }

  function handledelete() {
    axios
      .delete(`${BASE_URL}/api/shift/${shiftId}`)
      .then((response) => {
        console.log("Shift deleted successfully", response.data);
        getShiftdata();
        setShowForm1(true);
        toast.error(
          <span>
            <strong>Deleted</strong> successfully.
          </span>,
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
          <span>
            <strong>Cannot be</strong> deleted.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            // autoClose: 3000, // Optional: Set auto close time in milliseconds
            // closeButton: false, // Optional: Hide close button
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
      });
  }

  const handleEditShiftName = (event) => {
    seteditshiftName(event.target.value);
  };

  const handleEditStartTime = (event) => {
    seteditStartTIme(event.target.value);
  };

  const handleEditEndTime = (event) => {
    seteditEndTIme(event.target.value);
  };

  // Edit employee data feature

  useEffect(() => {
    const shiftName = data
      .filter((item) => item.shiftNumber == shiftId)
      .map((item) => item.shiftName);

    const startTime = data
      .filter((item) => item.shiftNumber == shiftId)
      .map((item) => item.startTime);

    const endTime = data
      .filter((item) => item.shiftNumber == shiftId)
      .map((item) => item.endTime);

    const shiftNumber = data
      .filter((item) => item.shiftNumber == shiftId)
      .map((item) => item.shiftNumber);

    // const shiftId = data.filter(item => item.shiftId == shiftId)
    // .map(item => item.shiftNumber)

    seteditshiftName(shiftName);
    seteditEndTIme(endTime);
    seteditStartTIme(startTime);
    seteditshiftNumber(shiftNumber);
  }, [data, shiftId]);

  function UpdateShift(event) {
    event.preventDefault();
    const payload = {
      shiftName: editshiftName.toString(),
      shiftNumber: editshiftNumber.toString(),
      startTime: editStartTIme.toString(),
      endTime: editEndTIme.toString(),
      branchId: "1001",
      userId: "1111",
    };
    console.log(payload, "payload");

    axios
      .put(`${BASE_URL}/api/shift/${shiftId}`, payload)
      .then((response) => {
        console.log("Data saved successfully", response.data);
        toast.success(
          <span>
            <strong>successfully</strong> Updated.
          </span>
        );
        setShowForm1(true);
        getShiftdata();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* Dialog box */}
      <BootstrapDialog
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {/* Employee List */}

          <TextField
            id="filled-basic"
            label="Search"
            onChange={(e) => searchItems(e.target.value)}
            value={searchInput}
            variant="filled"
          />
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
        <Paper sx={{ minWidth: "70px", overflowY: "scroll" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 465 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: "11px" }}>Shift ID</TableCell>
                  <TableCell style={{ fontSize: "11px" }}>Branch ID</TableCell>
                  <TableCell style={{ fontSize: "11px" }}>
                    Shift Number
                  </TableCell>
                  <TableCell style={{ fontSize: "11px" }}>Shift Name</TableCell>
                  <TableCell style={{ fontSize: "11px" }}>Start Time</TableCell>
                  <TableCell style={{ fontSize: "11px" }}>End Time</TableCell>
                  <TableCell style={{ width: "100px", fontSize: "11px" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {searchInput.length > 0
                  ? filteredResults.map((row) => (
                      <TableRow
                        style={{ fontSize: "11px" }}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.shiftId}</TableCell>
                        <TableCell>{row.branchId}</TableCell>
                        <TableCell>{row.shiftNumber}</TableCell>
                        <TableCell>{row.shiftName}</TableCell>
                        <TableCell>{row.startTime}</TableCell>
                        <TableCell>{row.endTime}</TableCell>
                        <TableCell>
                          <input
                            type="radio"
                            onClick={() => handleEdit(row.shiftNumber)}
                          ></input>
                          {/* <button 
                        style={{border:'none',backgroundColor:'transparent'}}
                        onClick={() => handledelete(row.shiftNumber)}
                          >
                        <FaMinus/>
                      </button>  */}
                        </TableCell>
                      </TableRow>
                    ))
                  : data.map((row) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell style={{fontSize:'11px'}} scope="row">{row.shiftId}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.branchId}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.shiftNumber}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.shiftName}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.startTime}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.endTime}</TableCell>
                        <TableCell style={{ textAlign: "center",fontSize:'11px' }}>
                          <input
                            type="radio"
                            onClick={() => handleEdit(row.shiftNumber)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
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
        <form onSubmit={handleSubmit} style={{ fontSize: "11px" }}>
          <div className="container">
            <div className="col-12 p-2">
              <Tooltip title="Search Shift" placement="right-start">
                <Button
                  variant="contained"
                  class="btn btn-primary btn-sm"
                  onClick={handleClickOpen}
                >
                  <FaSistrix />
                </Button>
              </Tooltip>
              {/* <h4 className="offset-0">Shift Form</h4><br/> */}
              <div className="offset-0 row mt-3">
                <div className="col-2">
                  <label htmlFor="ShiftName">Shift Name:</label>
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    id="ShiftName"
                    name="ShiftName"
                    className="form-control"
                    placeholder="Enter ShiftName"
                    value={shiftName}
                    style={{ fontSize: "11px" }}
                    onChange={handleShiftNameChange}
                    required
                  />
                </div>
              </div>
              <div className="offset-0 row mt-2">
                <div className="col-2">
                  <label htmlFor="ShiftName">Shift Number:</label>
                </div>
                <div className="col-4">
                  <input
                    type="number"
                    id="ShiftNumber"
                    name="ShiftNumber"
                    className="form-control"
                    placeholder="Enter ShiftNumber"
                    value={shiftNumber}
                    style={{ fontSize: "11px" }}
                    onChange={handleShiftNumberChange}
                    required
                  />
                </div>
              </div>
              <div className="offset-0 row mt-2">
                <div className="col-2">
                  <label htmlFor="StartTime">Start Time:</label>
                </div>
                <div className="col-4">
                  <input
                    type="time"
                    id="StartTime"
                    name="StartTime"
                    className="form-control"
                    value={StartTime}
                    onChange={handleStartTimeChange}
                    required
                    style={{ fontSize: "11px" }}
                    step={1}
                  />
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      label="Start Time Clock"
                      value={StartTime}
                      onChange={handleStartTimeChange}
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider> */}
                </div>
              </div>
              <div className="offset-0 row mt-2">
                <div className="col-2">
                  <label htmlFor="EndTime">End Time:</label>
                </div>
                <div className="col-4">
                  <input
                    type="time"
                    id="EndTime"
                    name="EndTime"
                    className="form-control"
                    value={EndTime}
                    style={{ fontSize: "11px" }}
                    onChange={handleEndTimeChange}
                    step={1}
                    required
                  />
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["TimePicker"]}>
                    <TimePicker
                      label="End Time Clock"
                      value={EndTime}
                      onChange={handleEndTimeChange}
                      viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                      }}
                      // onChange={handleStartTimeChange}
                    />
                  </DemoContainer>
                </LocalizationProvider> */}
                </div>
              </div>
              <br />
              <div className="offset-0 row">
                <div className="col-2">
                  <button className=" btn btn-success btn-sm" type="submit">
                    <FaCheck />
                  </button>
                  &nbsp;
                  <a className="btn btn-danger btn-sm" onClick={Emptyfields}>
                    <FaXmark />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form style={{fontSize:'11px'}}>
          <div className="container">
            <div className="col-12 p-2">
              <button onClick={Emptyfields} className="btn btn-primary btn-sm">
                Go Back
              </button>
              <button
                className="btn btn-danger btn-sm"
                style={{ position: "absolute", right: "10px", width: "50px" }}
                onClick={handleClickdeletepopup}
              >
                <FaMinus />
              </button>
              <React.Fragment>
                <Dialog
                  open={opendeletepopup}
                  onClose={handleDeleteClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  PaperProps={{
                    style: {
                      marginTop: -350, // Adjust the marginTop value as needed
                      width: "40%",
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
              <div className="offset-0 row mt-3">
                <div className="col-2">
                  <label htmlFor="ShiftName">Shift Name:</label>
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    id="ShiftName"
                    name="ShiftName"
                    className="form-control"
                    style={{fontSize:'11px'}}
                    placeholder="Enter ShiftName"
                    value={editshiftName}
                    onChange={handleEditShiftName}
                    required
                  />
                </div>
              </div>
              <div className="offset-0 row mt-2">
                <div className="col-2">
                  <label htmlFor="ShiftName">Shift Number:</label>
                </div>
                <div className="col-4">
                  <input
                    type="number"
                    id="ShiftNumber"
                    name="ShiftNumber"
                    className="form-control"
                    style={{fontSize:'11px'}}
                    placeholder="Enter ShiftNumber"
                    value={editshiftNumber}
                    // onChange={handleShiftNumberChange}
                    disabled
                    required
                  />
                </div>
              </div>
              <div className="offset-0 row mt-2">
                <div className="col-2">
                  <label htmlFor="StartTime">Start Time:</label>
                </div>
                <div className="col-4">
                  <input
                    type="time"
                    id="StartTime"
                    name="StartTime"
                    className="form-control"
                    style={{fontSize:'11px'}}
                    value={editStartTIme}
                    onChange={handleEditStartTime}
                    required
                    step={1}
                  />
                </div>
              </div>
              <div className="offset-0 row mt-2">
                <div className="col-2">
                  <label htmlFor="EndTime">End Time:</label>
                </div>
                <div className="col-4">
                  <input
                    type="time"
                    id="EndTime"
                    name="EndTime"
                    className="form-control"
                    style={{fontSize:'11px'}}
                    value={editEndTIme}
                    onChange={handleEditEndTime}
                    step={1}
                  />
                </div>
              </div>
              <br />
              <div className="offset-0 row">
                <div className="col-2">
                  <button
                    className=" btn btn-success bnt-sm"
                    type="submit"
                    onClick={UpdateShift}
                  >
                    <FaCheck />
                  </button>
                  &nbsp;
                  <a className="btn btn-danger btn-sm" onClick={Emptyfields}>
                    <FaXmark />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}

export default Shift;
