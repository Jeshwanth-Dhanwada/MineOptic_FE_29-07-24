import React, { useState,useEffect } from "react";
import { FaXmark, FaCheck,FaSistrix,FaMinus } from "react-icons/fa6";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function Units() {

  const [unitDescription, setUnitDescription] = useState('');
  const [conversionRate, setconversionRate] = useState('');
  const [refUnitId, setrefUnitId] = useState('');
  const [unitsdata, setunitsdata] = useState([])

  

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/unitMaster`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setunitsdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function getUnitsdata(){
    const apiUrl =
      `${BASE_URL}/api/unitMaster`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setunitsdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }


  // Handling the handleunitDescription change
  const handleunitDescription = (e) => {
    setUnitDescription(e.target.value);
    // setSubmitted(false);
  };

  // Handling the handleunitconversionRate change
  const handleunitconversionRate = (e) => {
    setconversionRate(e.target.value);
    // setSubmitted(false);
  };
  // Handling the handlerefUnitId change
  const handlerefUnitId = (e) => {
    setrefUnitId(e.target.value);
    // setSubmitted(false);
  };

  function setDefault(){
    setUnitDescription("")
    setconversionRate("")
    setrefUnitId("")
    setShowForm1(true)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const drop = {
      branchId:"1001",
      unitDescription:unitDescription,
      conversionRate:conversionRate,
      refUnitId: refUnitId,
      userId:"1111"
    }

    axios.post(`${BASE_URL}/api/unitMaster`, drop)
      .then((response) => {
        console.log(response.data)
        console.log('New row added successfully');
        toast.success(
          <p><strong>Successfully</strong> Added Units.</p>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            // autoClose: 3000, // Optional: Set auto close time in milliseconds
            // closeButton: false, // Optional: Hide close button
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );

        // Reset the form after submission
        setDefault()
      })
      .catch((error) => {
        console.error('Error adding new row:', error);
      });
  };


  const [open, setOpen] = React.useState(false);
  const [opendeletepopup, setOpenDelete] = React.useState(false);
  const [searchInput, setSearchInput] = useState([])
  const [unitId, setUnitId] = useState()
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
    const filteredData = unitsdata.filter((item) => {
      const Id = String(item.unitId).toLowerCase()
      const branchId = item.branchId.toLowerCase()
      const unitDescription = item.unitDescription.toLowerCase()
      const conversionRate = item.conversionRate.toLowerCase()
      const refUnitId = item.refUnitId.toLowerCase()
      return branchId.includes(searchValue.toLowerCase()) 
            || Id.includes(searchValue.toLowerCase())
            || unitDescription.includes(searchValue.toLowerCase()) 
            || conversionRate.includes(searchValue.toLowerCase()) 
            || refUnitId.includes(searchValue.toLowerCase()) 
            
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

  function handleEdit(unitId){
    console.log(unitId,"unitId");
    setUnitId(unitId)
    setShowForm1(false)
    setOpen(false);
  }

  const [EditunitDescription, setEditunitDescription] = useState('');
  const [EditconversionRate, setEditconversionRate] = useState('');
  const [EditrefUnitId, setEditrefUnitId] = useState('');

  const handleEditunitDescription = (event) => {
    setEditunitDescription(event.target.value)
  }
  const handleEditconversionRate = (event) => {
    setEditconversionRate(event.target.value)
  }
  const handleEditrefUnitId = (event) => {
    setEditrefUnitId(event.target.value)
  }

  useEffect(() => {
    const description = unitsdata.filter(item => item.unitId == unitId)
    .map(item => item.unitDescription)
    const conversion = unitsdata.filter(item => item.unitId == unitId)
    .map(item => item.conversionRate)
    const redunitId = unitsdata.filter(item => item.unitId == unitId)
    .map(item => item.refUnitId)

    setEditunitDescription(description)
    setEditconversionRate(conversion)
    setEditrefUnitId(redunitId)

  },[unitId, unitsdata])
  

  function UpdateUnit(event){
    event.preventDefault()
    const payload = {
      branchId:"1001",
      unitDescription:EditunitDescription.toString(),
      conversionRate:EditconversionRate.toString(),
      refUnitId: EditrefUnitId.toString(),
      userId:"1111"
    }
    console.log(payload);

    axios.put(`${BASE_URL}/api/unitMaster/${unitId}`, payload)
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
        setShowForm1(true)
        getUnitsdata()
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });

  }

  function deleteUnits(){
      axios
        .delete(`${BASE_URL}/api/unitMaster/${unitId}`)
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
                    <TableCell style={{fontSize:'11px'}}>Unit ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Branch ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Unit Description</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Conversion Rate</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Reference Unit Id</TableCell>
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
                      <TableCell style={{fontSize:'11px'}} scope="row">{row.unitId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.unitDescription}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.conversionRate}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.refUnitId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.unitId)}
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
                  ))):
                  (unitsdata.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{fontSize:'11px'}} scope="row">{row.unitId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.unitDescription}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.conversionRate}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.refUnitId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{textAlign:'center',fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.unitId)}
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
          <Tooltip title="Search Shift" placement="right-start">
          <Button
            variant="contained"
            class="btn btn-primary btn-sm"
            onClick={handleClickOpen}
        >
          <FaSistrix />
        </Button>
          </Tooltip>
          {/* <h4 className="offset-0">Units Form</h4><br/> */}
          <div className="offset-0 row mt-3">
            <div className="col-2">
              <label htmlFor="BranchID">Unit Description:</label>
            </div>
            <div className="col-4">
            <input onChange={handleunitDescription} style={{fontSize:'11px'}} className="input form-control" placeholder=" Enter Unit Description"
                    value={unitDescription} type="text" required/>
            </div>
          </div>

          <div className="offset-0 row mt-2">
            <div className="col-2">
              <label htmlFor="ConversionRate">Conversion Rate:</label>
            </div>
            <div className="col-4">
            <input onChange={handleunitconversionRate} style={{fontSize:'11px'}} className="input form-control" placeholder="Enter Conversion Rate"
                    value={conversionRate} type="text" required />
            </div>
          </div>

          <div className="offset-0 row mt-2">
            <div className="col-2">
              <label htmlFor="ReferenceUnitID">Reference Unit ID:</label>
            </div>
            <div className="col-4">
            <input onChange={handlerefUnitId} style={{fontSize:'11px'}} className="input form-control" placeholder="Enter Reference Unit ID"
                    value={refUnitId} type="number" required/>
            </div>
          </div>

          <br/>
          <div className="offset-0 row">
            <div className="col-2">
            <button className=" btn btn-success btn-sm" type="submit">
            <FaCheck />
          </button>
          &nbsp;
          <a className="btn btn-danger btn-sm" onClick={setDefault} >
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
          <button className="btn btn-primary btn-sm" onClick={setDefault}>Go Back</button>
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
                  <Button onClick={deleteUnits} autoFocus>
                    Yes
                  </Button>
                  <Button onClick={handleDeleteClose}>No</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          {/* <h4 className="offset-0">Units Form</h4><br/> */}
          <div className="offset-0 row mt-3">
            <div className="col-2">
              <label htmlFor="BranchID">Unit ID:</label>
            </div>
            <div className="col-4">
            <input 
              onChange={handleEditunitDescription} 
              className="input form-control" 
              placeholder=" Enter Unit Description"
              value={unitId}
              style={{fontSize:'11px'}} 
              type="text" 
              disabled/>
            </div>
          </div>
          <div className="offset-0 row mt-3">
            <div className="col-2">
              <label htmlFor="BranchID">Unit Description:</label>
            </div>
            <div className="col-4">
            <input onChange={handleEditunitDescription} style={{fontSize:'11px'}} className="input form-control" placeholder=" Enter Unit Description"
                    value={EditunitDescription} type="text" required/>
            </div>
          </div>
          <div className="offset-0 row mt-2">
            <div className="col-2">
              <label htmlFor="ConversionRate">Conversion Rate:</label>
            </div>
            <div className="col-4">
            <input onChange={handleEditconversionRate} className="input form-control" placeholder="Enter Conversion Rate"
                    value={EditconversionRate} style={{fontSize:'11px'}} type="text" required />
            </div>
          </div>

          <div className="offset-0 row mt-2">
            <div className="col-2">
              <label htmlFor="ReferenceUnitID">Reference Unit ID:</label>
            </div>
            <div className="col-4">
            <input onChange={handleEditrefUnitId} style={{fontSize:'11px'}} className="input form-control" placeholder="Enter Reference Unit ID"
                    value={EditrefUnitId} type="number" required/>
            </div>
          </div>

          <br/>
          <div className="offset-0 row">
            <div className="col-2">
            <button 
              className="btn btn-success btn-sm" 
              onClick={UpdateUnit}
              type="submit">
              <FaCheck />
            </button>
            &nbsp;
            <a className="btn btn-danger btn-sm" onClick={setDefault} >
              <FaXmark />
            </a>
            </div>
          </div>
          </div>
        </div>
      </form> 
      }
      <ToastContainer />
    </div>
  );
}

export default Units;