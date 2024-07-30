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

function MaterialNodeType() {
  const [data, setData] = useState([]);
  const [MaterialCateData, setMaterialCateData] = useState([]);
  const [MaterialName, setMaterialName] = useState();
  const [MaterialCateID, setMaterialCateID] = useState();

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/materialnodetype`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data,"materialnodetype");
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/materialCategory`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data,"materialnodetype");
        setMaterialCateData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function getMaterialTypedata() {
    const apiUrl = `${BASE_URL}/api/materialnodetype`;
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const handleMaterialName = (event) => {
          setMaterialName(event.target.value);
  };

  const handleMaterialCateID = (event) => {
    setMaterialCateID(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      branchId: "1001",
      materialName: MaterialName,
      materialCategoryId:MaterialCateID,
      userId: "1111",
    };
    console.log(formData);

    axios
      .post(`${BASE_URL}/api/materialnodetype`, formData)
      .then((response) => {
        console.log(response.data);
        console.log("New row added successfully");
        getMaterialTypedata();
        toast.success(
          <span>
            <strong>Successfully</strong> {MaterialName} Added.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
        setMaterialName("");
        setMaterialCateID("")
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
  };

  function Emptyfields() {
    setMaterialName("");
    setMaterialCateID("")
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
  const [materialTypeId, setmaterialTypeId] = useState();
  const [filteredResults, setFilteredResults] = useState([]);
  const [showForm1, setShowForm1] = useState(true);
  const [editMaterialName, seteditMaterialName] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    const filteredData = data.filter((item) => {
      const name = item.materialName.toLowerCase();
      return (
        name.includes(searchValue.toLowerCase())
    )});
    setFilteredResults(filteredData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickdeletepopup = (event) => {
          event.preventDefault()
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  function handleEdit(item) {
    setmaterialTypeId(item)
    setShowForm1(false);
    setOpen(false);
  }

  function handledelete(event) {
          event.preventDefault()
    axios
      .delete(`${BASE_URL}/api/materialnodetype/${materialTypeId}`)
      .then((response) => {
        console.log("Shift deleted successfully", response.data);
        getMaterialTypedata();
        setShowForm1(true);
        toast.error(
          <span>
            <strong>Deleted</strong> successfully.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
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
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
      });
  }

  const handleEditMaterialName = (event) => {
          seteditMaterialName(event.target.value)
  };

  // Edit employee data feature

  useEffect(() => {
    const machineName = data
      .filter((item) => item.materialId == materialTypeId)
      .map((item) => item.materialName);

//     seteditshiftName(shiftName);
    seteditMaterialName(machineName)
  }, [data, materialTypeId]);

  function UpdateShift(event) {
    event.preventDefault();
    const payload = {
      materialName: editMaterialName.toString(),
      branchId: "1001",
      userId: "1111",
    };
    console.log(payload, "payload");
    console.log(materialTypeId, "payload");

    axios
      .put(`${BASE_URL}/api/materialnodetype/${materialTypeId}`, payload)
      .then((response) => {
        console.log("Data saved successfully", response.data);
        toast.success(
          <span>
            <strong>successfully</strong> Updated.
          </span>,
          {
                    position: toast.POSITION.TOP_RIGHT, // Set position to top center
                    className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
        setShowForm1(true);
        getMaterialTypedata();
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
                  <TableCell style={{ fontSize: "11px" }}>Material ID</TableCell>
                  <TableCell style={{ fontSize: "11px" }}>Material Name</TableCell>
                  <TableCell style={{ fontSize: "11px" }}>Branch ID</TableCell>
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
                        <TableCell>{row.materialId}</TableCell>
                        <TableCell>{row.materialName}</TableCell>
                        <TableCell>{row.branchId}</TableCell>
                        <TableCell>
                          <input
                            type="radio"
                            onClick={() => handleEdit(row.materialId)}
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
                        <TableCell style={{fontSize:'11px'}} scope="row">{row.materialId}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.materialName}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.branchId}</TableCell>
                        <TableCell style={{ textAlign: "center",fontSize:'11px' }}>
                          <input
                            type="radio"
                            onClick={() => handleEdit(row.materialId)}
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
              <Tooltip title="Search machineTypeId" placement="right-start">
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
                <div className="col-4">
                  <label htmlFor="MaterialName">Material Name:</label>
                  <input
                    type="text"
                    id="MaterialName"
                    name="MaterialName"
                    className="form-control"
                    placeholder="Enter MaterialName"
                    value={MaterialName}
                    style={{ fontSize: "11px" }}
                    onChange={handleMaterialName}
                    required
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="MaterialCategory">Material Category ID:</label>
                  <select className=" form-control" style={{ fontSize: "11px" }} onChange={handleMaterialCateID} value={MaterialCateID}>
                    <option hidden>Material Category ID</option>
                              {MaterialCateData?.map((item) =>
                                        <option value={item?.id}>{item?.id} - {item?.productTypeDescription}</option>
                              )}
                    </select>
                </div>
              </div>
              <br />
              <div className="offset-0 row">
                <div className="col-2">
                  <button className=" btn btn-sm" id="Facheck" type="submit">
                    Add
                  </button>
                  &nbsp;
                  <a className="btn btn-sm" id="FaXmark" onClick={Emptyfields}>
                    Cancel
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
                onClick={(event) => handleClickdeletepopup(event)}
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
                    <Button onClick={(event)=>handledelete(event)} autoFocus>
                      Yes
                    </Button>
                    <Button onClick={handleDeleteClose}>No</Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
              <div className="offset-0 row mt-3">
                <div className="col-4">
                  <label htmlFor="MaterialName">Material Name:</label>
                  <input
                    type="text"
                    id="MaterialName"
                    name="MaterialName"
                    className="form-control"
                    style={{fontSize:'11px'}}
                    placeholder="Enter MaterialName"
                    value={editMaterialName}
                    onChange={handleEditMaterialName}
                    required
                  />
                </div>
              </div><br/>
              <div className="offset-0 row">
                <div className="col-2">
                  <button
                    type="submit"
                    onClick={UpdateShift}
                    className="btn btn-sm"
                    id="Facheck"
                  >
                    Add
                  </button>
                  &nbsp;
                  <a className="btn btn-sm" id="FaXmark" onClick={Emptyfields}>
                    Cancel
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

export default MaterialNodeType;
