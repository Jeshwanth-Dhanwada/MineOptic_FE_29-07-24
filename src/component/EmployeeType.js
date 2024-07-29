import { FaXmark, FaCheck,FaSistrix,FaMinus } from "react-icons/fa6";
import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
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

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function EmployeeType() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/empType`;
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

  function getUnitsdata(){
    const apiUrl =
      `${BASE_URL}/api/empType`;
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

  const [EmpType, setEmpType] = useState();
  const [EmpRole, setEmpRole] = useState();

  // Handle input changes
  const handleEmpType = (event) => {
    setEmpType(event.target.value)
  };

  const handleEmpRole = (event) => {
    setEmpRole(event.target.value)
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  
    const payload = {
      branchId : "1001",
      userId: "1111",
      empType:EmpType
    }
      
      axios
      .post(`${BASE_URL}/api/empType`, payload)
      .then((response) => {
        console.log(response.data)
        console.log('New row added successfully');
        toast.success(
        <p><strong>Successfully</strong> Added</p>,
        {
          position: toast.POSITION.TOP_RIGHT, // Set position to top center
          // autoClose: 3000, // Optional: Set auto close time in milliseconds
          // closeButton: false, // Optional: Hide close button
          className: 'custom-toast' // Optional: Add custom CSS class
        }
      );
        getUnitsdata()
        // Reset the form after submission
        Emptyfields()
      })
      .catch((error) => {
        console.error('Error adding new row:', error);
      });
  }
  
  function Emptyfields(){
    setEmpRole("")
    setEmpType("")
    setShowForm1(true)
  }

  const [open, setOpen] = React.useState(false);
  const [opendeletepopup, setOpenDelete] = React.useState(false);
  const [searchInput, setSearchInput] = useState([])
  const [EmployeeTypeId, setEmpTypeId] = useState()
  const [filteredResults, setFilteredResults] = useState([]);
  const [showForm1, setShowForm1] = useState(true);
  
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    const filteredData = data.filter((item) => {
      const Id = String(item.empTypeId).toLowerCase()
      const branchId = item.branchId.toLowerCase()
      const emptype = item.empType.toLowerCase()
      const userId = item.userId.toLowerCase()
      return branchId.includes(searchValue.toLowerCase()) 
            || Id.includes(searchValue.toLowerCase())
            || branchId.includes(searchValue.toLowerCase()) 
            || emptype.includes(searchValue.toLowerCase()) 
            || userId.includes(searchValue.toLowerCase()) 
            
    });
    setFilteredResults(filteredData);
  }

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

  function handleEdit(MaterailCatId){
    console.log(MaterailCatId,"MaterailCatId");
    setEmpTypeId(MaterailCatId)
    setShowForm1(false)
    setOpen(false);
  }

  const [EditEmpType, setEditEmpType] = useState();
  const [EditEmpRole, setEditEmpRole] = useState();
  
  // Handle input changes
  const handleEditEmpType = (event) => {
    setEditEmpType(event.target.value)
  };

  const handleEditEmpRole = (event) => {
    setEditEmpRole(event.target.value)
  };

  useEffect(() => {
    const emptype = data.filter(item => item.empTypeId == EmployeeTypeId)
    .map(item => item.empType)
    const emprole = data.filter(item => item.empTypeId == EmployeeTypeId)
    .map(item => item.unitDescription)
    
    setEditEmpType(emptype)
    setEditEmpRole(emprole)
  },[EmployeeTypeId, data])

  function updateEmployeeType(event){
    event.preventDefault();  
    const payload = {
      branchId : "1001",
      userId: "1111",
      empType:EditEmpType.toString()
    }
      
      axios
      .put(`${BASE_URL}/api/empType/${EmployeeTypeId}`, payload)
      .then((response) => {
        console.log(response.data)
        console.log('New row added successfully');
        toast.success(
        <p><strong>Successfully</strong> Updated</p>,
        {
          position: toast.POSITION.TOP_RIGHT, // Set position to top center
          // autoClose: 3000, // Optional: Set auto close time in milliseconds
          // closeButton: false, // Optional: Hide close button
          className: 'custom-toast' // Optional: Add custom CSS class
        }
      );
        getUnitsdata()
        Emptyfields()
      })
      .catch((error) => {
        console.error('Error adding new row:', error);
      });
  }

  function handledelete(event){
      event.preventDefault()
      axios
        .delete(`${BASE_URL}/api/empType/${EmployeeTypeId}`)
        .then((response) => {
          console.log("Shift deleted successfully", response.data);
          getUnitsdata()
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

  return (
    <div style={{ width: "100%", height: "100%" }}>

      <BootstrapDialog
          fullWidth
          maxWidth="sm"
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
                    <TableCell style={{fontSize:'11px'}}>Employee Type ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Branch ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Employee Type</TableCell>
                    <TableCell style={{fontSize:'11px'}}>User Id</TableCell>
                    <TableCell style={{width:'100px',fontSize:'11px'}}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchInput.length > 0 ? (
                  filteredResults.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{fontSize:'11px'}} scope="row">{row.empTypeId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.empType}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.empTypeId)}
                      >
                      </input> 
                      {/* <button 
                        style={{border:'none',backgroundColor:'transparent'}}
                        onClick={() => handledelete(row.shiftNumber)}
                          >
                        <FaMinus/>
                      </button>  */}
                      </TableCell>
                    </TableRow>
                  )))
                  :
                  (data.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{fontSize:'11px'}} scope="row">{row.empTypeId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.empType}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{textAlign:'center',fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.empTypeId)}
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

      {showForm1 ? 
        <form onSubmit={handleSubmit} style={{fontSize:'11px'}}>
          <div className="container" >
            <div className="col-12 p-2">
            <Tooltip title="Search Employee Type" placement="right-start">
              <Button
                variant="contained"
                class="btn btn-primary btn-sm"
                onClick={handleClickOpen}
              >
              <FaSistrix />
              </Button>
            </Tooltip>
            {/* <h4 className="offset-0">Employee Type Form</h4><br/> */}
            {/* <div className="offset-0 row mt-2">
              <div className="col-2">
                <label htmlFor="BranchID">Branch ID:</label>
              </div>
              <div className="col-4">
                <input
                  type="number"
                  id="BranchID"
                  name="BranchID"
                  placeholder="branchId"
                  className="form-control"
                  required
                />
              </div>
            </div> */}
            <div className="offset-0 row mt-3">
              <div className="col-2">
                <label htmlFor="EmpType">Employee Type:</label>
              </div>
              <div className="col-4">
                <input
                  type="text"
                  id="EmpType"
                  name="EmpType"
                  className="form-control"
                  placeholder="Type of Employee"
                  onChange={handleEmpType}
                  value={EmpType}
                  style={{fontSize:'11px'}}
                  required
                />
              </div>
            </div>
            {/* <div className="offset-0 row mt-2">
              <div className="col-2">
                <label htmlFor="EmpRole">Employee Role:</label>
              </div>
              <div className="col-4">
                <input
                  type="text"
                  id="EmpRole"
                  name="EmpRole"
                  placeholder="Role Of Employee"
                  className="form-control"
                  onChange={handleEmpRole}
                  value={EmpRole}
                  required
                />
              </div>
            </div> */}
            <div className="offset-0 row mt-3">
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
        :
        <form>
          <div className="container" >
            <div className="col-12 p-2">
            <button className="btn btn-primary btn-sm" 
              onClick={Emptyfields}
              >
                Go Back
            </button>
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
            <div className="offset-0 row mt-2">
            <div className="row">
              <div className="col-2">
                <label htmlFor="EmpType">Employee Type ID:</label>
              </div>
              <div className="col-4">
                <input
                  type="text"
                  id="EmpType"
                  name="EmpType"
                  className="form-control"
                  placeholder="Type of Employee"
                  onChange={handleEditEmpType}
                  value={EmployeeTypeId}
                  style={{fontSize:'11px'}}
                  disabled
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-2">
                <label htmlFor="EmpType">Employee Type:</label>
              </div>
              <div className="col-4">
                <input
                  type="text"
                  id="EmpType"
                  name="EmpType"
                  className="form-control"
                  placeholder="Type of Employee"
                  onChange={handleEditEmpType}
                  value={EditEmpType}
                  style={{fontSize:'11px'}}
                  required
                />
              </div>
              </div>
            </div>
            {/* <div className="offset-0 row mt-2">
              <div className="col-2">
                <label htmlFor="EmpRole">Employee Role:</label>
              </div>
              <div className="col-4">
                <input
                  type="text"
                  id="EmpRole"
                  name="EmpRole"
                  placeholder="Role Of Employee"
                  className="form-control"
                  onChange={handleEmpRole}
                  value={EmpRole}
                  required
                />
              </div>
            </div> */}
            <br/>
            <div className="offset-0 row">
              <div className="col-2">
              <button 
                  className="btn btn-success btn-sm"
                  type="submit"
                  onClick={updateEmployeeType}
                  >
              <FaCheck />
            </button>
            &nbsp;
            <button disabled className="btn btn-danger btn-sm" onClick={Emptyfields}>
              <FaXmark />
            </button>
              </div>
            </div>
            </div>
          </div>
        </form>
      }
      <ToastContainer/>
    </div>
  );
}

export default EmployeeType;
