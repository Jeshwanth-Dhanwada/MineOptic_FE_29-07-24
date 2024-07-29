import React, { useState,useCallback, useEffect } from "react";
import { FaXmark, FaCheck,FaSistrix,FaMinus } from "react-icons/fa6";
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


function MachineCategory() {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/machineCategory`;
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
  

  function getMachineCategory(){
    const apiUrl =
      `${BASE_URL}/api/machineCategory`;
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

  const [open, setOpen] = React.useState(false);
  const [opendeletepopup, setOpenDelete] = React.useState(false);
  const [searchInput, setSearchInput] = useState([])
  const [MachineCateId, setMachineCateId] = useState()
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
      const Id = String(item.id).toLowerCase()
      const branchId = item.branchId.toLowerCase()
      const productTypeDescription = item.productTypeDescription.toLowerCase()
      const userId = item.userId.toLowerCase()
      return branchId.includes(searchValue.toLowerCase()) 
            || Id.includes(searchValue.toLowerCase())
            || branchId.includes(searchValue.toLowerCase()) 
            || productTypeDescription.includes(searchValue.toLowerCase()) 
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

  const [CategoryDesc, setCategoryDesc] = useState("")
  const [EditCategoryDesc, setEditCategoryDesc] = useState("")
  
  const handleMachineCategoryDesc = (event) => {
          setCategoryDesc(event.target.value)
  };

  const handleEditproductDesc = (event) => {
          setEditCategoryDesc(event.target.value)
  };

  useEffect(() => {
    const editPCD = data.filter(item => item.CategoryId == MachineCateId)
                        .map(item => item.CategoryDescription)
                        setEditCategoryDesc(editPCD)
  },[MachineCateId, data])

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      branchId : "1001",
      userId: "1111",
      CategoryDescription:CategoryDesc
    }
      
      axios
      .post(`${BASE_URL}/api/machineCategory`, payload)
      .then((response) => {
        console.log(response.data)
        console.log('New row added successfully');
        toast.success(
        <p><strong>Successfully</strong> Updated</p>,
        {
          position: toast.POSITION.TOP_RIGHT, // Set position to top center
          className: 'custom-toast' // Optional: Add custom CSS class
        }
      );
        getMachineCategory()
        Emptyfields()
      })
      .catch((error) => {
        console.error('Error adding new row:', error);
      });
  };

  function Emptyfields(){
          setCategoryDesc("")
    setShowForm1(true)
  }

  function handleEdit(id){
    console.log(id,"materialId");
    setMachineCateId(id)
    setShowForm1(false)
    setOpen(false);
  }

  function updateFields(event){
    event.preventDefault();  
    const payload = {
      branchId : "1001",
      userId: "1111",
      productTypeDescription:EditCategoryDesc.toString()
    }
      
      axios
      .put(`${BASE_URL}/api/materialCategory/${MachineCateId}`, payload)
      .then((response) => {
        console.log(response.data)
        console.log('New row added successfully');
        toast.success(
        <p><strong>Successfully</strong> Updated</p>,
        {
          position: toast.POSITION.TOP_RIGHT, // Set position to top center
          className: 'custom-toast' // Optional: Add custom CSS class
        }
      );
        getMachineCategory()
        Emptyfields()
      })
      .catch((error) => {
        console.error('Error adding new row:', error);
      });
  }

  function handledelete(){
    axios
          .delete(`${BASE_URL}/api/materialCategory/${MachineCateId}`)
          .then((response) => {
            console.log("Shift deleted successfully", response.data);
            setShowForm1(true)
            getMachineCategory()
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
                    <TableCell style={{fontSize:'11px'}}>Manchine Category ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Category Description</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Branch ID</TableCell>
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
                      <TableCell style={{fontSize:'11px'}} scope="row">{row.CategoryId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.CategoryDescription}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.CategoryId)}
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
                      <TableCell style={{fontSize:'11px'}} scope="row">{row.CategoryId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.CategoryDescription}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{textAlign:'center',fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.CategoryId)}
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
          <div className="offset-0 row mt-3">
            <div className="col-2">
              <label htmlFor="MachineCategory">Machine Category:</label>
            </div>
            <div className="col-4">
              <input
               id="MachineCategory"
               name="MachineCategory"
               className="form-control"
               value={CategoryDesc}
               placeholder="Enter MachineCategory"
               onChange={handleMachineCategoryDesc}
               required
               style={{fontSize:'11px'}}
              >
              </input>
              
            </div>
          </div>
          <br/>
          <div className="offset-0 row">
            <div className="col-2">
            <button className=" btn btn-success btn-sm">
            <FaCheck />
          </button>
          &nbsp;
          <a 
            className="btn btn-danger btn-sm"
            onClick={Emptyfields}
          >
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
            <button className="btn btn-primary btn-sm" onClick={Emptyfields}>Go Back</button>
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
              <label htmlFor="MaterialCategory">Material Category ID:</label>
            </div>
            <div className="col-4">
              <textarea
              id="ProductTypeDescription"
              name="ProductTypeDescription"
              className="form-control"
              value={MachineCateId}
              style={{fontSize:'11px'}}
              placeholder="Enter Product Type Description"
              // onChange={handleEditproductDesc}
              disabled
              >
              </textarea>
            </div>
          </div>
          <div className="offset-0 row mt-3">
            <div className="col-2">
              <label htmlFor="ProductTypeDescription">Product Type Description:</label>
            </div>
            <div className="col-4">
              <textarea
              id="ProductTypeDescription"
              name="ProductTypeDescription"
              className="form-control"
              value={EditCategoryDesc}
              style={{fontSize:'11px'}}
              placeholder="Enter Category Description"
              onChange={handleEditproductDesc}
              required
              >
              </textarea>
            </div>
          </div>
          <br/>
          <div className="offset-0 row">
            <div className="col-2">
            <button onClick={updateFields} className=" btn btn-success btn-sm">
            <FaCheck />
          </button>
          &nbsp;
          <button 
            disabled 
            className="btn btn-danger btn-sm"
            onClick={Emptyfields}
          >
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

export default MachineCategory;
