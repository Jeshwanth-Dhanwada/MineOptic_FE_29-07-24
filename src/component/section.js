import React, { useState, useEffect } from "react";
import { FaXmark, FaCheck,FaSistrix,FaMinus } from "react-icons/fa6";
import axios from "axios";
import { BASE_URL } from "../constants/apiConstants";

import { ToastContainer, toast } from "react-toastify";

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



function Section() {
  
  const [data, setData] = useState([])
  const [department, setdepartment] = useState([])
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/section`;
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

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/department`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setdepartment(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function getsectiondata(){
    const apiUrl =
      `${BASE_URL}/api/section`;
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

  const [sectionName, setsectionName] = useState("")
  const [deptId, setdeptId] = useState("")
  const [EditsectionName, setEditsectionName] = useState("")
  const [EditdeptId, setEditdeptId] = useState("")

  const handlesectionName = (e) => {
    setsectionName(e.target.value)
  }
  const handledeptId = (e) => {
    setdeptId(e.target.value)
  }
  const handleEditsectionName = (e) => {
    setEditsectionName(e.target.value)
  }
  const handleEditdeptId = (e) => {
    setEditdeptId(e.target.value)
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
  const [searchInput, setSearchInput] = useState([])
  const [sectionId, setsectionId] = useState()
  const [filteredResults, setFilteredResults] = useState([]);
  const [showForm1, setShowForm1] = useState(true);


  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    const filteredData = data.filter((item) => {
      const name = item.sectionName.toLowerCase()
      const Id = String(item.sectionId).toLowerCase()
      const deptId = String(item.deptId).toLowerCase()
      const userId = item.userId.toLowerCase()
      const branch = item.branchId.toLowerCase()
      return name.includes(searchValue.toLowerCase()) 
            || Id.includes(searchValue.toLowerCase())
            || name.includes(searchValue.toLowerCase()) 
            || userId.includes(searchValue.toLowerCase()) 
            || branch.includes(searchValue.toLowerCase())    
            || deptId.includes(searchValue.toLowerCase())    
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

  function handleEdit(sectionId){
    console.log(sectionId,"departmentId");
    setsectionId(sectionId)
    setShowForm1(false)
    setOpen(false);
  }

  function Emptyfields(){
    setsectionName("")
    setdeptId("")
    setShowForm1(true)
  }

  function Updatefields(event){
    event.preventDefault();
    const payload = {
        userId : "1111",
        branchId : "1001",
        deptId:EditdeptId.toString(),
        sectionName:EditsectionName.toString()
    }

    axios
      .put(`${BASE_URL}/api/section/${sectionId}`, payload)
      .then((response) => {
        console.log(response.data);
        console.log("New row added successfully");
        getsectiondata()
        toast.success(
          <span>
            <strong>Successfully</strong> Updated.
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
  }

  function handledelete(event){
    event.preventDefault()
    axios
      .delete(`${BASE_URL}/api/section/${sectionId}`)
      .then((response) => {
        console.log("Node deleted successfully", response.data);
        getsectiondata()
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      userId : "1111",
      branchId : "1001",
      deptId:deptId,
      sectionName:sectionName
    }

  axios
    .post(`${BASE_URL}/api/section`, payload)
    .then((response) => {
      console.log(response.data);
      console.log("New row added successfully");
      getsectiondata()
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

  useEffect(() => {
    const name = data.filter(item => item.sectionId == sectionId)
    .map(item => item.sectionName)
    const deptId = data.filter(item => item.sectionId == sectionId)
    .map(item => item.deptId)

    setEditdeptId(deptId)
    setEditsectionName(name)
    
  },[data, sectionId])  

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
                    <TableCell style={{fontSize:'11px'}}>Section ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Branch ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Department ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Section Name</TableCell>
                    <TableCell style={{fontSize:'11px'}}>User Id</TableCell>
                    <TableCell style={{width:'100px',fontSize:'1px'}}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchInput.length > 0 ? (
                  filteredResults.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{fontSize:'11px'}}>{row.sectionId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.deptId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.sectionName}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.sectionId)}
                      >
                      </input> 
                      </TableCell>
                    </TableRow>
                  ))):
                  (data.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{fontSize:'11px'}}>{row.sectionId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.deptId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.sectionName}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{textAlign:'center',fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.sectionId)}
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
        <div className="container">
        <div className="col-12 p-2">
          <Tooltip title="Search Material" placement="right-start">
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
              <label htmlFor="DeptID">Department ID:</label>
            </div>
            <div className="col-4">
              <select
                id="DeptID"
                name="DeptID"
                style={{fontSize:'11px'}}
                className="form-control"
                value={deptId}
                onChange={handledeptId}
              >
                <option hidden>Please Select</option>
                {department.map((item) => (
                  <option>{item.deptId}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="offset-0 row mt-2">
            <div className="col-2">
              <label htmlFor="SectionName">Section Name:</label>
            </div>
            <div className="col-4">
              <input
                type="text"
                id="SectionName"
                name="SectionName"
                className="form-control"
                value={sectionName}
                style={{fontSize:'11px'}}
                onChange={handlesectionName}
                placeholder="Enter Section Name"
                required
              />
            </div>
          </div>
          <br/>
          <div className="offset-0 row">
            <div className="col-2">
            <button className=" btn btn-success btn-sm" type="submit">
            <FaCheck />
          </button>
          &nbsp;
          <button onClick={Emptyfields} className="btn btn-danger btn-sm" type="submit">
            <FaXmark />
          </button>
            </div>
          </div>
        </div>
       </div>
      </form>
      :
      <form>
        <div className="container ">
        <div className="col-12 p-2">
            <button className="btn btn-primary btn-sm" onClick={Emptyfields}>GoBack</button>
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
              <label htmlFor="BranchID">Section ID:</label>
            </div>
            <div className="col-4">
              <input
                type="text"
                id="BranchID"
                name="BranchID"
                className="form-control"
                value={sectionId}
                style={{fontSize:'11px'}}
          //       onChange={handleInputChange}
                // style={{border:'0.5px solid black'}}
                disabled
              />
            </div>
          </div>
          <div className="offset-0 row mt-2">
            <div className="col-2">
              <label htmlFor="DeptID">Department ID:</label>
            </div>
            <div className="col-4">
              <select
                id="DeptID"
                name="DeptID"
                className="form-control"
                value={EditdeptId}
                style={{fontSize:'11px'}}
                onChange={handleEditdeptId}
              >
                <option hidden>Please Select</option>
                {department.map((item) => (
                  <option>{item.deptId}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="offset-0 row mt-2">
            <div className="col-2">
              <label htmlFor="SectionName">Section Name:</label>
            </div>
            <div className="col-4">
              <input
                type="text"
                id="SectionName"
                name="SectionName"
                className="form-control"
                value={EditsectionName}
                style={{fontSize:'11px'}}
                onChange={handleEditsectionName}
                placeholder="Enter Section Name"
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
            <button disabled className="btn btn-danger btn-sm" >
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

export default Section;
