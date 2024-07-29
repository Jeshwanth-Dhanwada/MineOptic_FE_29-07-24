import React, { useState, useEffect } from "react";
import { FaXmark, FaCheck,FaSistrix,FaMinus } from "react-icons/fa6";
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

import _debounce from 'lodash/debounce';

function DepartmentForm() {

  const [data, setData] = useState([])

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/department`;
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

  function getDepartmentdata(){
    const apiUrl =
      `${BASE_URL}/api/department`;
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
  // Initialize state variables for form fields
  const [deptName, setdeptName] = useState()
  const [EditdeptName, setEditdeptName] = useState()
  
  // Handle input changes
  const handledeptName = (e) => {
    setdeptName(e.target.value)
  };
  const handleEditdeptName = (e) => {
    setEditdeptName(e.target.value)
  };

  function Emptyfields(){
    setdeptName("")
    setShowForm1(true)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        userId : "1111",
        branchId : "1001",
        deptName:deptName
    }

    axios
      .post(`${BASE_URL}/api/department`, payload)
      .then((response) => {
        console.log(response.data);
        console.log("New row added successfully");
        getDepartmentdata()
        toast.success(
          <span>
            <strong>Successfully</strong> Added.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            // autoClose: 3000, // Optional: Set auto close time in milliseconds
            // closeButton: false, // Optional: Hide close button
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
        Emptyfields()
        
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
  };

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
  const [departmentId, setdepartmentId] = useState()
  const [filteredResults, setFilteredResults] = useState([]);
  const [showForm1, setShowForm1] = useState(true);
  const [searchInput, setSearchInput] = useState([])


  

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    const filteredData = data.filter((item) => {
      const name = item.deptName.toLowerCase()
      const Id = String(item.deptId).toLowerCase()
      const userId = item.userId.toLowerCase()
      const branch = item.branchId.toLowerCase()
      return name.includes(searchValue.toLowerCase()) 
            || Id.includes(searchValue.toLowerCase())
            || name.includes(searchValue.toLowerCase()) 
            || userId.includes(searchValue.toLowerCase()) 
            || branch.includes(searchValue.toLowerCase())    
    });
    setFilteredResults(filteredData);
  }

  // // Debounced search function
  // const debouncedSearch = _debounce(searchItems, 1000); // Adjust the debounce delay as needed

  // // Effect to trigger the debounced search when searchInput changes
  // useEffect(() => {
  //   debouncedSearch(searchInput);
  // }, [searchInput, debouncedSearch]);

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

  function handleEdit(departmentId){
    console.log(departmentId,"departmentId");
    setdepartmentId(departmentId)
    setShowForm1(false)
    setOpen(false);
  }

  useEffect(() => {
    const name = data.filter(item => item.deptId == departmentId)
    .map(item => item.deptName)
    // const unitId = data.filter(item => item.deptId == departmentId)
    // .map(item => item.unitId)

    setEditdeptName(name)
    
  },[data, departmentId])

  function Updatefields(event){
    event.preventDefault();
    const payload = {
        userId : "1111",
        branchId : "1001",
        deptName:EditdeptName.toString()
    }

    axios
      .put(`${BASE_URL}/api/department/${departmentId}`, payload)
      .then((response) => {
        console.log(response.data);
        console.log("New row added successfully");
        getDepartmentdata()
        toast.success(
          <span>
            <strong>Successfully</strong> Updated.
          </span>
        );
        Emptyfields()
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
  }
  function handledelete(event){
    event.preventDefault()
    axios
      .delete(`${BASE_URL}/api/department/${departmentId}`)
      .then((response) => {
        console.log("Node deleted successfully", response.data);
        getDepartmentdata()
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
          maxWidth="md"
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
                    <TableCell style={{fontSize: "11px"}}>Department ID</TableCell>
                    <TableCell style={{fontSize: "11px"}}>Branch ID</TableCell>
                    <TableCell style={{fontSize: "11px"}}>Department Name</TableCell>
                    <TableCell style={{fontSize: "11px"}}>User Id</TableCell>
                    <TableCell style={{width:'100px',fontSize: "11px"}}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchInput.length > 0 ? (
                  filteredResults.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{fontSize:'11px'}}>{row.deptId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.deptName}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.deptId)}
                      >
                      </input> 
                      </TableCell>
                    </TableRow>
                  ))):
                  (data.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{fontSize:'11px'}}>{row.deptId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.deptName}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{textAlign:'center',fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.deptId)}
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
          <Tooltip title="Search Department" placement="right-start">
            <Button
                variant="contained"
                class="btn btn-primary btn-sm"
                onClick={handleClickOpen}
            >
              <FaSistrix />
            </Button>
          </Tooltip>
          {/* <h4 className="offset-0">Department Form</h4><br/> */}
          {/* <div className="offset-0 row mt-2">
            <div className="col-2">
              <label htmlFor="department">user ID:</label>
            </div>
            <div className="col-4">
              <input
                type="number"
                className="form-control"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="offset-0 row mt-2">
            <div className="col-2">
              <label htmlFor="branchID">Branch ID:</label>
            </div>
            <div className="col-4">
              <input
                type="number"
                id="branchID"
                name="branchID"
                className="form-control"
                value={formData.branchID}
                onChange={handleInputChange}
                required
              />
            </div>
          </div> */}
          <div className="offset-0 row mt-3">
            <div className="col-2">
              <label htmlFor="departmentName">Department Name:</label>
            </div>
            <div className="col-4">
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                className="form-control"
                value={deptName}
                placeholder="Enter Department Name"
                onChange={handledeptName}
                style={{fontSize:'11px'}}
                required
              />
            </div>
          </div>
          <div className="offset-0 row mt-3">
            <div className="col-2">
            <button className=" btn btn-success btn-sm" type="submit">
              <FaCheck />
            </button>
            &nbsp;
            <a onClick={Emptyfields} className="btn btn-danger btn-sm">
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
          <button onClick={Emptyfields} className="btn btn-primary btn-sm">GoBack</button>
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
          <div className="offset-0 row mt-3">
            <div className="col-2">
              <label htmlFor="branchID">Department ID:</label>
            </div>
            <div className="col-4">
              <input
                type="number"
                id="branchID"
                name="branchID"
                style={{fontSize:'11px'}}
                className="form-control"
                value={departmentId}
                // onChange={handleInputChange}
                disabled
              />
            </div>
          </div>
          <div className="offset-0 row mt-2">
            <div className="col-2">
              <label htmlFor="departmentName">Department Name:</label>
            </div>
            <div className="col-4">
              <input
                type="text"
                id="departmentName"
                name="departmentName"
                className="form-control"
                style={{fontSize:'11px'}}
                value={EditdeptName}
                placeholder="Enter Department Name"
                onChange={handleEditdeptName}
                required
              />
            </div>
          </div>
          <br/>
          <div className="offset-0 row">
            <div className="col-2">
            <button onClick={Updatefields} className=" btn btn-success btn-sm" type="submit">
              <FaCheck />
            </button>
            &nbsp;
            <button disabled className="btn btn-danger btn-sm">
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

export default DepartmentForm;
