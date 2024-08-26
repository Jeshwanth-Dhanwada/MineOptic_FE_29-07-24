import React, { useState, useCallback, useEffect } from "react";
import {FaSistrix,FaMinus } from "react-icons/fa6";

import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
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
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { EditLocation } from "@mui/icons-material";

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


function Branch() {

  const [data, setData] = useState([])
  const [OrgID, setOrgID] = useState()
  const [BranchName, setBranchName] = useState()
  const [Location, setLocation] = useState()
  const [Address, setAddress] = useState()
  const [ContactPerson, setContactPerson] = useState()
  const [ContactEmailID, setContactEmailID] = useState()
  const [Industry, setIndustry] = useState()
  const [ContactNumber, setContactNumber] = useState()

    // Branch data ------------

    useEffect(() => {
      // Fetch data from the API when the component mounts
      const apiUrl =
        `${BASE_URL}/api/branch`;
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

    function getbranchdata(){
      const apiUrl =
        `${BASE_URL}/api/branch`;
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


  // Handle input changes

  const handleOrgIdChange = (e) => {
   setOrgID(e.target.value)
  };
  const handleBranchName = (e) => {
    setBranchName(e.target.value)
   };

   const handleLocation = (e) => {
    setLocation(e.target.value)
   };

   const handlesetAddress = (e) => {
    setAddress(e.target.value)
   };

   const handlesetContactperson = (e) => {
    setContactPerson(e.target.value)
   };

   const handlesetContactEmail = (e) => {
    setContactEmailID(e.target.value)
   };

   const handlesetIndustry = (e) => {
    setIndustry(e.target.value)
   };

   const handlesetContactNumber = (e) => {
    setContactNumber(e.target.value)
   };

  
  function emptyfields(event){
      setOrgID("")
      setBranchName("")
      setLocation("")
      setAddress("")
      setContactPerson("")
      setContactEmailID("")
      setIndustry("")
      setContactNumber("")
      setShowForm1(true)
  }
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const drop = {
      orgId:OrgID,
      branchName:BranchName,
      location:Location,
      address:Address,
      contactPerson:ContactPerson,
      contactNumber:ContactNumber,
      contactEmail:ContactEmailID,
      industry:Industry,
      userId:'1111'
    }
    console.log(drop)

    axios.post(`${BASE_URL}/api/branch`, drop)
    .then((response) => {
      console.log(response.data)
      toast.success(
        <span><strong>successfully</strong> Added.</span>,
        {
          position: toast.POSITION.TOP_RIGHT,
          className: 'custom-toast' // Optional: Add custom CSS class
        }
      );
      emptyfields()
      getbranchdata()
    })
    .catch((error) => {
      console.error('Error adding new row:', error);
    });
  };

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

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [branchId, setbranchId] = useState([])
  const [searchInput, setSearchInput] = useState([])
  const [filteredResults, setFilteredResults] = useState([]);
  const [showForm1, setShowForm1] = useState(true);
  const [editIndustry, seteditIndustry] = useState([]);
  const [editOrganisation, seteditOrganisation] = useState([]);
  const [editbranchName, setediteditbranchName] = useState([]);
  const [editlocation, seteditlocation] = useState([]);
  const [editaddress, seteditaddress] = useState([]);
  const [editcontactperson, seteditcontactperson] = useState([]);
  const [editcontactNumber, seteditcontactNumber] = useState([]);
  const [editcontactEmail, seteditcontactEmail] = useState([]);

  const handleIndustry = (event) =>{
    seteditIndustry(event.target.value)
  }

  const handleorg = (event) =>{
    seteditOrganisation(event.target.value)
  }

  const handleEditBranchName = (event) =>{
    setediteditbranchName(event.target.value)
  }

  const handleEditlocation = (event) =>{
    seteditlocation(event.target.value)
  }

  const handleEditaddress = (event) =>{
    seteditaddress(event.target.value)
  }

  const handleEditcontactPerson = (event) =>{
    seteditcontactperson(event.target.value)
  }

  const handleEditcontactNumber = (event) =>{
    seteditcontactNumber(event.target.value)
  }

  const handleEditcontactEmail = (event) =>{
    seteditcontactEmail(event.target.value)
  }

  useEffect(() => {
    const industry = data.filter(item => item.branchId == branchId)
                        .map(item => item.industry)
    const org = data.filter(item => item.branchId == branchId)
                        .map(item => item.orgId)
    const branchName = data.filter(item => item.branchId == branchId)
                        .map(item => item.branchName)
    const location = data.filter(item => item.branchId == branchId)
                        .map(item => item.location)
    const address = data.filter(item => item.branchId == branchId)
                        .map(item => item.address)
    const contactperson = data.filter(item => item.branchId == branchId)
                        .map(item => item.contactPerson)
    const contactNumber = data.filter(item => item.branchId == branchId)
                        .map(item => item.contactNumber)
    const contactEmail = data.filter(item => item.branchId == branchId)
                        .map(item => item.contactEmail)
    
    seteditIndustry(industry)
    seteditOrganisation(org)
    setediteditbranchName(branchName)
    seteditlocation(location)
    seteditaddress(address)
    seteditcontactperson(contactperson)
    seteditcontactNumber(contactNumber)
    seteditcontactEmail(contactEmail)
  },[branchId, data])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    const filteredData = data.filter((item) => {
      const name = item.branchName.toLowerCase()
      const Id = String(item.branchId).toLowerCase()
      const orgId = item.orgId.toLowerCase()
      const location = item.location.toLowerCase()
      const address = item.address.toLowerCase()
      const contactPerson = item.contactPerson.toLowerCase()
      const contactNumber = item.contactNumber.toLowerCase()
      const contactEmail = item.contactEmail.toLowerCase()
      const industry = item.industry.toLowerCase()
      return name.includes(searchValue.toLowerCase()) 
            || Id.includes(searchValue.toLowerCase())
            || orgId.includes(searchValue.toLowerCase())
            || location.includes(searchValue.toLowerCase())
            || address.includes(searchValue.toLowerCase())
            || contactPerson.includes(searchValue.toLowerCase())
            || contactNumber.includes(searchValue.toLowerCase())
            || contactEmail.includes(searchValue.toLowerCase())
            || industry.includes(searchValue.toLowerCase())
    });
    setFilteredResults(filteredData);
  }

  function handleEdit(branchId){
    console.log(branchId,"branchId");
    setbranchId(branchId)
    setShowForm1(false)
    setOpen(false);
  }

  function UpdateBranch(event){
    event.preventDefault()
        const payload = {
          orgId:editOrganisation.toString(),
          branchName:editbranchName.toString(),
          location:editlocation.toString(),
          address:editaddress.toString(),
          contactPerson:editcontactperson.toString(),
          contactNumber:editcontactNumber.toString(),
          contactEmail:editcontactEmail.toString(),
          industry:editIndustry.toString(),
          userId:'1111'
    }
    console.log(payload,"payload");

      axios.put(`${BASE_URL}/api/branch/${branchId}`, payload)
      .then((response) => {
        console.log('Data saved successfully', response.data);
        emptyfields()
        getbranchdata()
        toast.success(
          <span><strong>successfully</strong> Updated.</span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            // autoClose: 3000, // Optional: Set auto close time in milliseconds
            // closeButton: false, // Optional: Hide close button
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  }

  function handledelete(event){
    event.preventDefault()
      axios
        .delete(`${BASE_URL}/api/branch/${branchId}`)
        .then((response) => {
          console.log("Node deleted successfully", response.data);
          getbranchdata()
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
                      <TableCell style={{fontSize:'11px'}}>Branch ID</TableCell>
                      <TableCell style={{fontSize:'11px'}}>Organisation ID</TableCell>
                      <TableCell style={{fontSize:'11px'}}>Branch Name</TableCell>
                      <TableCell style={{fontSize:'11px'}}>Location</TableCell>
                      <TableCell style={{fontSize:'11px'}}>Address</TableCell>
                      <TableCell style={{fontSize:'11px'}}>Contact Person</TableCell>
                      <TableCell style={{fontSize:'11px'}}>Contact Number</TableCell>
                      <TableCell style={{fontSize:'11px'}}>Contact Email</TableCell>
                      <TableCell style={{fontSize:'11px'}}>Industry</TableCell>
                      <TableCell style={{width:'100px',fontSize:'11px'}}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchInput.length > 0 ? (
                    filteredResults.map((row) => (
                      <TableRow
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell style={{fontSize:'11px'}} scope="row">{row.branchId}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.orgId }</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.branchName}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.location}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.address}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.contactPerson}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.contactNumber?.split("T")[0]}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.contactEmail}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.industry}</TableCell>
                        <TableCell style={{textAlign:'center',fontSize:'11px'}}>
                        <input
                          type="radio" 
                            onClick={() => handleEdit(row.branchId)} 
                            style={{border:'none',backgroundColor:'transparent'}}>
                        </input> 
                        </TableCell>
                      </TableRow>
                    ))):
                    (data.map((row) => (
                      <TableRow
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell style={{fontSize:'11px'}} scope="row">{row.branchId}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.orgId }</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.branchName}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.location}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.address}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.contactPerson}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.contactNumber?.split("T")[0]}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.contactEmail}</TableCell>
                        <TableCell style={{fontSize:'11px'}}>{row.industry}</TableCell>
                        <TableCell style={{textAlign:'center',fontSize:'11px'}}>
                        <input 
                          type="radio"
                          onClick={() => handleEdit(row.branchId)} 
                          >
                        </input> 
                        {/* <button 
                          
                          style={{border:'none',backgroundColor:'transparent'}}>
                          <FaMinus/>
                        </button>  */}
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
        <div className="container">
          <div className="col-12 p-2">
          {/* <Tooltip title="Search Branch" placement="right-start"> */}
            <Button
              variant="contained"
              class="btn btn-primary btn-sm"
              title="Search branch"
              onClick={handleClickOpen}
            >
            <FaSistrix />
            </Button>
            <br />
            <div className="row pt-3">
              <div className="col-4">
                    <label htmlFor="Industry">Industry</label>
                      <input
                        type="text"
                        id="Industry"
                        name="Industry"
                        className="form-control"
                        value={Industry}
                        onChange={handlesetIndustry}
                        style={{fontSize:'11px'}}
                        required
                        placeholder="Enter Industry"
                      />
              </div>
              <div className="col-4">
                    <label htmlFor="OrgID">Organisation ID</label>
                      <input
                        type="number"
                        id="OrgID"
                        name="OrgID"
                        className="form-control"
                        value={OrgID}
                        onChange={handleOrgIdChange}
                        style={{fontSize:'11px'}}
                        required
                        placeholder="Enter Organisation ID"
                      />
              </div>
              <div className="col-4">
                      <label htmlFor="BranchName">Branch Name:</label>
                      <input
                        type="text"
                        id="BranchName"
                        name="BranchName"
                        className="form-control"
                        value={BranchName}
                        style={{fontSize:'11px'}}
                        onChange={handleBranchName}
                        required
                        placeholder="Enter Branch Name"
                      />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-4">
                  <label htmlFor="Location">Location</label>
                    <input
                      type="text"
                      id="Location"
                      name="Location"
                      className="form-control"
                      value={Location}
                      onChange={handleLocation}
                      style={{fontSize:'11px'}}
                      required
                      placeholder="Enter Location"
                    />
                  </div>
                  <div className="col-4">
                  <label htmlFor="Address">Address</label>
                    <input
                      type="text"
                      id="Address"
                      name="Address"
                      className="form-control"
                      value={Address}
                      onChange={handlesetAddress}
                      style={{fontSize:'11px'}}
                      required
                      placeholder="Enter Address"
                    />
                  </div>
                  <div className="col-4">
                  <label htmlFor="ContactPerson">Contact Person</label>
                    <input
                      type="text"
                      id="ContactPerson"
                      name="ContactPerson"
                      className="form-control"
                      value={ContactPerson}
                      style={{fontSize:'11px'}}
                      onChange={handlesetContactperson}
                      required
                      placeholder="Enter Person Name"
                    />
                  </div>
            </div>
            
            <div className="row mt-3">
            <div className="col-4">
                  <label htmlFor="ContactNumber">Contact Number</label>
                    <input
                      type="tel"
                      id="ContactNumber"
                      name="ContactNumber"
                      className="form-control"
                      style={{fontSize:'11px'}}
                      value={ContactNumber}
                      onChange={handlesetContactNumber}
                      required
                      placeholder="Enter Contact Number"
                    />
                  </div>
                  <div className="col-4">
                  <label htmlFor="emailId">Contact Email ID</label>
                    <input
                      type="email"
                      id="emailId"
                      name="emailId"
                      className="form-control"
                      value={ContactEmailID}
                      style={{fontSize:'11px'}}
                      onChange={handlesetContactEmail}
                      required
                      placeholder="Enter Email"
                    />
                  </div>
            </div>
            <br />
            <div className=" row">
              <div className="col-6">
                <div className=" offset-0 col-6">
                  <button className=" btn btn-sm" id="Facheck" type="submit">
                    {/* <FaCheck /> */}Add
                  </button>
                  &nbsp;
                  <a className="btn btn-sm" id="FaXmark" onClick={emptyfields}>
                    {/* <FaXmark /> */}Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form> 
      :
      <form>
        <div className="container">
          <div className="col-12 pt-2">
          <button className="btn btn-primary btn-sm" onClick={emptyfields}>Go Back</button>
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
            </div>
            <br />
            <div className="row t-3">
            <div className="col-4">
                  <label htmlFor="Industry">Branch ID</label>
                    <input
                      type="text"
                      id="Industry"
                      name="Industry"
                      style={{fontSize:'11px'}}
                      className="form-control"
                      value={branchId}
                      // onChange={handleIndustry}
                      disabled
                    />
            </div>
            <div className="col-4">
                  <label htmlFor="Industry">Industry:</label>
                    <input
                      type="text"
                      id="Industry"
                      name="Industry"
                      className="form-control"
                      value={editIndustry}
                      style={{fontSize:'11px'}}
                      onChange={handleIndustry}
                      required
                      placeholder="Enter Industry"
                    />
            </div>
            <div className="col-4">
                  <label htmlFor="OrgID">Organisation ID</label>
                    <input
                      type="number"
                      id="OrgID"
                      name="OrgID"
                      className="form-control"
                      value={editOrganisation}
                      style={{fontSize:'11px'}}
                      onChange={handleorg}
                      disabled
                      placeholder="Enter Organisation ID"
                    />
                  </div>
            </div>
            <div className="row pt-3">
            <div className="col-4">
                  <label htmlFor="BranchName">Branch Name</label>
                    <input
                      type="text"
                      id="BranchName"
                      name="BranchName"
                      className="form-control"
                      style={{fontSize:'11px'}}
                      value={editbranchName}
                      onChange={handleEditBranchName}
                      required
                      placeholder="Enter Branch Name"
                    />
            </div>
            <div className="col-4">
                  <label htmlFor="Location">Location</label>
                    <input
                      type="text"
                      id="Location"
                      name="Location"
                      className="form-control"
                      style={{fontSize:'11px'}}
                      value={editlocation}
                      onChange={handleEditlocation}
                      required
                      placeholder="Enter Location"
                    />
            </div>
            <div className="col-4">
                  <label htmlFor="Address">Address</label>
                    <input
                      type="text"
                      id="Address"
                      name="Address"
                      className="form-control"
                      value={editaddress}
                      style={{fontSize:'11px'}}
                      onChange={handleEditaddress}
                      required
                      placeholder="Enter Address"
                    />
                  </div>
            </div>
            <div className="row mt-3">
            
                  <div className="col-4">
                  <label htmlFor="ContactPerson">Contact Person</label>
                    <input
                      type="text"
                      id="ContactPerson"
                      name="ContactPerson"
                      className="form-control"
                      value={editcontactperson}
                      style={{fontSize:'11px'}}
                      onChange={handleEditcontactPerson}
                      required
                      placeholder="Enter Person Name"
                    />
                  </div>
                  <div className="col-4">
                  <label htmlFor="ContactNumber">Contact Number</label>
                    <input
                      type="tel"
                      id="ContactNumber"
                      name="ContactNumber"
                      className="form-control"
                      style={{fontSize:'11px'}}
                      value={editcontactNumber}
                      onChange={handleEditcontactNumber}
                      required
                      placeholder="Enter Contact Number"
                    />
                  </div>
                  <div className="col-4">
                  <label htmlFor="emailId">Contact Email ID</label>
                    <input
                      type="email"
                      id="emailId"
                      name="emailId"
                      style={{fontSize:'11px'}}
                      className="form-control"
                      value={editcontactEmail}
                      onChange={handleEditcontactEmail}
                      required
                      placeholder="Enter Email"
                    />
                  </div>
            </div>
            <br />
            <div className=" row">
              <div className="col-6">
                <div className=" offset-0 col-6">
                  <button className=" btn btn-sm" id="Facheck" onClick={UpdateBranch}>
                    {/* <FaCheck /> */}update
                  </button>
                  &nbsp;
                  <a className="btn btn-sm" id="FaXmark" onClick={emptyfields}>
                    {/* <FaXmark /> */}Cancel
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

export default Branch;
