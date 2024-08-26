import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../constants/apiConstants";
import { FaMinus, FaSistrix } from "react-icons/fa6";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { EditLocation } from "@mui/icons-material";

import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function EqpType() {
  const { auth } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [eqpTypeId, seteqpTypeId] = useState([]);
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/eqptypes`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [eqpType, setEqpType] = useState("");
  const [stateId, setStateId] = useState("");
  const [description, setDescription] = useState("");
  const [stateCategory, setStateCategory] = useState("");

  const [editeqpType, setEditEqpType] = useState("");
  const [editstateId, setEditStateId] = useState("");
  const [editdescription, setEditDescription] = useState("");
  const [editstateCategory, setEditStateCategory] = useState("");

  const handleEqpType = (e) => {
    setEqpType(e.target.value);
  };

  const handleStateId = (e) => {
    setStateId(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleStateCategory = (e) => {
    setStateCategory(e.target.value);
  };
  const handleEditEqpType = (e) => {
    setEditEqpType(e.target.value);
  };

  const handleEditStateId = (e) => {
    setEditStateId(e.target.value);
  };

  const handleEditDescription = (e) => {
    setEditDescription(e.target.value);
  };

  const handleEditStateCategory = (e) => {
    setEditStateCategory(e.target.value);
  };

  const handleDataToDb = (e) => {
    e.preventDefault();
    const drop = {
      branchId: String(auth.branchId),
      userId: String(auth.empId),
      stateId: stateId,
      Description: description,
      equipmentType: eqpType,
      stateCategory: stateCategory,
    };
    console.log(drop);
    axios
      .post(`${BASE_URL}/api/eqptypes`, drop)
      .then((response) => {
        console.log(response.data);
        toast.success(
          <span>
            <strong>successfully</strong> Added.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT,
            className: "custom-toast", // Optional: Add custom CSS class
          }
        );
        HandleEmptyFields();
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
  };

  const HandleEmptyFields = () => {
    setEqpType("");
    setStateId("");
    setDescription("");
    setStateCategory("");
    setEditEqpType("")
    setEditStateId("")
    setEditDescription("")
    setEditStateCategory("")
    setShowForm1(true);
  };

  const [open, setOpen] = React.useState(false);
  const [opendeletepopup, setOpenDelete] = React.useState(false);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSearchInput("");
  };
  const [searchInput, setSearchInput] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    const filteredData = data.filter((item) => {
      const Id = String(item.Id).toLowerCase();
      const branchId = item.branchId.toLowerCase();
      const Description = item.Description.toLowerCase();
      const equipmentType = item.equipmentType.toLowerCase();
      const stateCategory = item.stateCategory.toLowerCase();
      const stateId= item.stateId.toLowerCase();
      return (
        Id.includes(searchValue.toLowerCase()) ||
        branchId.includes(searchValue.toLowerCase()) ||
        Description.includes(searchValue.toLowerCase()) ||
        equipmentType.includes(searchValue.toLowerCase()) ||
        stateId.includes(searchValue.toLowerCase()) ||
        stateCategory.includes(searchValue.toLowerCase())
      );
    });
    setFilteredResults(filteredData);
  };

  const [showForm1, setShowForm1] = useState(true);
  function handleEdit(eqptypeId) {
    console.log(eqptypeId, "branchId");
    seteqpTypeId(eqptypeId);
    setShowForm1(false);
    setOpen(false);
  }

  const handleClickdeletepopup = () => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    const stateId = data
      .filter((item) => item.Id == eqpTypeId)
      .map((item) => item.stateId);
    const Description = data
      .filter((item) => item.Id == eqpTypeId)
      .map((item) => item.Description);
    const equipmentType = data
      .filter((item) => item.Id == eqpTypeId)
      .map((item) => item.equipmentType);
    const stateCategory = data
      .filter((item) => item.Id == eqpTypeId)
      .map((item) => item.stateCategory);

    setEditEqpType(equipmentType);
    setEditStateId(stateId);
    setEditDescription(Description);
    setEditStateCategory(stateCategory);
  }, [data, eqpTypeId]);

  function getEqpType() {
    const apiUrl = `${BASE_URL}/api/eqptypes`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function handledelete(event) {
    event.preventDefault();
    axios
      .delete(`${BASE_URL}/api/eqptypes/${eqpTypeId}`)
      .then((response) => {
        console.log("Node deleted successfully", response.data);
        getEqpType();
        setShowForm1(true);
        toast.error(
          <span>
            <strong>Deleted</strong> successfully.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            className: "custom-toast", // Optional: Add custom CSS class
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
            className: "custom-toast", // Optional: Add custom CSS class
          }
        );
      });
  }
  function UpdateEqpType(event) {
    event.preventDefault();
    const payload = {
          branchId: String(auth.branchId),
          userId: String(auth.empId),
          stateId: editstateId,
          Description: editdescription,
          equipmentType: editeqpType,
          stateCategory: editstateCategory,
    };
    console.log(payload, "payload");

    axios
      .put(`${BASE_URL}/api/eqptypes/${eqpTypeId}`, payload)
      .then((response) => {
        console.log("Data saved successfully", response.data);
        HandleEmptyFields();
        getEqpType();
        toast.success(
          <span>
            <strong>successfully</strong> Updated.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            className: "custom-toast", // Optional: Add custom CSS class
          }
        );
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }
  return (
    <div className="container-fluid">
      <div className="row mt-2">
        <div className="col-12">
          <BootstrapDialog
            fullWidth
            maxWidth="lg"
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
                      <TableCell style={{ fontSize: "11px" }}>ID</TableCell>
                      <TableCell style={{ fontSize: "11px" }}>
                        Branch ID
                      </TableCell>
                      <TableCell style={{ fontSize: "11px" }}>
                        State ID
                      </TableCell>
                      <TableCell style={{ fontSize: "11px" }}>
                        Description
                      </TableCell>
                      <TableCell style={{ fontSize: "11px" }}>
                        Equipment Type
                      </TableCell>
                      <TableCell style={{ fontSize: "11px" }}>
                        State Category
                      </TableCell>
                      <TableCell style={{ width: "100px", fontSize: "11px" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchInput.length > 0
                      ? filteredResults.map((row) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell style={{ fontSize: "11px" }} scope="row">
                              {row.Id}
                            </TableCell>
                            <TableCell style={{ fontSize: "11px" }}>
                              {row.branchId}
                            </TableCell>
                            <TableCell style={{ fontSize: "11px" }}>
                              {row.stateId}
                            </TableCell>
                            <TableCell style={{ fontSize: "11px" }}>
                              {row.Description}
                            </TableCell>
                            <TableCell style={{ fontSize: "11px" }}>
                              {row.equipmentType}
                            </TableCell>
                            <TableCell style={{ fontSize: "11px" }}>
                              {row.stateCategory}
                            </TableCell>
                            <TableCell
                              style={{ textAlign: "center", fontSize: "11px" }}
                            >
                              <input
                                type="radio"
                                onClick={() => handleEdit(row.Id)}
                                style={{
                                  border: "none",
                                  backgroundColor: "transparent",
                                }}
                              ></input>
                            </TableCell>
                          </TableRow>
                        ))
                      : data.map((row) => (
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell style={{ fontSize: "11px" }} scope="row">
                              {row.Id}
                            </TableCell>
                            <TableCell style={{ fontSize: "11px" }}>
                              {row.branchId}
                            </TableCell>
                            <TableCell style={{ fontSize: "11px" }}>
                              {row.stateId}
                            </TableCell>
                            <TableCell style={{ fontSize: "11px" }}>
                              {row.Description}
                            </TableCell>
                            <TableCell style={{ fontSize: "11px" }}>
                              {row.equipmentType}
                            </TableCell>
                            <TableCell style={{ fontSize: "11px" }}>
                              {row.stateCategory}
                            </TableCell>
                            <TableCell
                              style={{ textAlign: "center", fontSize: "11px" }}
                            >
                              <input
                                type="radio"
                                onClick={() => handleEdit(row.Id)}
                              ></input>
                              {/* <button 
                          
                          style={{border:'none',backgroundColor:'transparent'}}>
                          <FaMinus/>
                        </button>  */}
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <DialogActions>
              <Button
                autoFocus
                class="btn btn-danger btn-sm"
                onClick={handleClose}
              >
                Close
              </Button>
            </DialogActions>
          </BootstrapDialog>
          {showForm1 ? (
            <form onSubmit={handleDataToDb}>
              <div className="row">
                <div className="col-2">
                  <Button
                    variant="contained"
                    class="btn btn-primary btn-sm"
                    title="Search branch"
                    onClick={handleClickOpen}
                  >
                    <FaSistrix />
                  </Button>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <label htmlFor="eqpType" className="form-label">
                    Equipment Type
                  </label>
                  <select
                    id="eqpType"
                    onChange={handleEqpType}
                    value={eqpType}
                    required
                    className="form-select"
                  >
                    <option value="" disabled>
                      Select Equipment Type
                    </option>
                    <option value="Truck">Truck</option>
                    <option value="Excavator">Excavator</option>
                  </select>
                </div>
                <div className="col-4">
                  <label htmlFor="stateId" className="form-label">
                    State Id
                  </label>
                  <input
                    type="text"
                    id="stateId"
                    required
                    onChange={handleStateId}
                    value={stateId}
                    className="form-control"
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    required
                    onChange={handleDescription}
                    value={description}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-4">
                  <label htmlFor="stateCategory" className="form-label">
                    State Category
                  </label>
                  <select
                    id="stateCategory"
                    onChange={handleStateCategory}
                    required
                    value={stateCategory}
                    className="form-select"
                  >
                    <option value="" disabled>
                      Select State Category
                    </option>
                    <option value="Productive">Productive</option>
                    <option value="Non-Productive">Non-Productive</option>
                    <option value="Non-Value Adding">Non-Value Adding</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <button className="btn btn-sm" id="Facheck" type="submit">
                    Add
                  </button>
                  &nbsp;
                  <a
                    className="btn btn-sm"
                    id="FaXmark"
                    onClick={HandleEmptyFields}
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </form>
          ) : (
            <form>
              <div className="container">
                <div className="col-12 pt-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={HandleEmptyFields}
                  >
                    Go Back
                  </button>
                  <Button
                    class="btn btn-danger btn-sm"
                    onClick={handleClickdeletepopup}
                    style={{
                      position: "absolute",
                      right: "10px",
                      width: "50px",
                    }}
                  >
                    <FaMinus />
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
                </div>
                <br />
                <div className="row mb-3">
                  <div className="col-4">
                    <label htmlFor="stateId" className="form-label">
                      Id
                    </label>
                    <input
                      type="text"
                      id="stateId"
                      required
                      disabled
                      // onChange={handleEditStateId}
                      value={eqpTypeId}
                      className="form-control"
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="stateId" className="form-label">
                      State Id
                    </label>
                    <input
                      type="text"
                      id="stateId"
                      required
                      onChange={handleEditStateId}
                      value={editstateId}
                      className="form-control"
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      required
                      onChange={handleEditDescription}
                      value={editdescription}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label htmlFor="eqpType" className="form-label">
                      Equipment Type
                    </label>
                    <select
                      id="eqpType"
                      onChange={handleEditEqpType}
                      value={editeqpType}
                      required
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select Equipment Type
                      </option>
                      <option value="Truck">Truck</option>
                      <option value="Excavator">Excavator</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label htmlFor="stateCategory" className="form-label">
                      State Category
                    </label>
                    <select
                      id="stateCategory"
                      onChange={handleEditStateCategory}
                      required
                      value={editstateCategory}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select State Category
                      </option>
                      <option value="Productive">Productive</option>
                      <option value="Non-Productive">Non-Productive</option>
                      <option value="Non-Value Adding">Non-Value Adding</option>
                    </select>
                  </div>
                </div>
                <div className=" row">
                  <div className=" offset-0 col-6">
                    <button
                      className=" btn btn-sm"
                      id="Facheck"
                      onClick={UpdateEqpType}
                    >
                      update
                    </button>
                    &nbsp;
                    <a
                      className="btn btn-sm"
                      id="FaXmark"
                      onClick={HandleEmptyFields}
                    >
                      Cancel
                    </a>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default EqpType;
