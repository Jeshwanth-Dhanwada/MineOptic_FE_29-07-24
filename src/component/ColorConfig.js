import React, { useState, useCallback, useEffect } from "react";
import { FaXmark, FaCheck, FaSistrix, FaMinus } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";

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
import { BASE_URL } from "../constants/apiConstants";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function ColorConfig() {
  const [routedata, setroutedata] = useState([]);
  const [data, setData] = useState([]);

  const [ColorConfigdata, setColorConfigdata] = useState([])

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/colorconfig`;
    axios
      .get(apiUrl)
      .then((response) => {
        setColorConfigdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Route Master ---------

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/routeMaster`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setroutedata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/materialType`;
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

  function getColorConfig(){
    const apiUrl =
      `${BASE_URL}/api/colorconfig`;
      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data);
          setColorConfigdata(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  }

  const [State, setstate] = useState();
  const [StateColor, setStateColor] = useState([]);
  const [TypeDescription, setTypeDescription] = useState("");
  const [MaterialCategoryID, setMaterialCategoryID] = useState("");
  const [RouteID, setRouteID] = useState("");
  const [Specification, setSpecification] = useState("");

  const handleColorChange = (event, index,Id) => {
    const newColor = event.target.value;

    setStateColor(prevState => ({
      ...prevState,
      [Id]: newColor, // Update color for the specific row based on its Id
    }));

  };
  console.log(StateColor,"color")

  const handleRouteID = (event) => {
    setRouteID(event.target.value);
  };

  const [editingId, setEditingId] = useState(null)
  function handleEdit(colorId){
    setEditingId(colorId)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      colorconfig: ColorConfigdata.map((item) => ({
        branchId: item.branchId,
        stateName: item.stateName,
        colorCode:StateColor[item.Id] ? StateColor[item.Id] : item.colorCode,
        userId: item.userId,
      }))
    };
    console.log(payload,"update");
    axios
      .put(`${BASE_URL}/api/colorconfig/bulk`, payload)
      .then((response) => {
        console.log(response.data);
        console.log("New row added successfully");
        getColorConfig()
        emptyfields();
        toast.success(
          <span>
            <strong>Successfully</strong> Added.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
  };

  const emptyfields = () => {
    setRouteID("");
    setSpecification("");
    setMaterialCategoryID("");
    setTypeDescription("");
    setShowForm1(true)
  };

  const [open, setOpen] = React.useState(false);
  const [opendeletepopup, setOpenDelete] = React.useState(false);

  const [searchInput, setSearchInput] = useState([])
  const [materialTypeId, setmaterialTypeId] = useState()
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
      const unitDescription = item.typeDescription.toLowerCase()
      const conversionRate = item.routeId.toLowerCase()
      const refUnitId = item.nodeId.toLowerCase()
      const specification = item.specification.toLowerCase()
      const MaterialcatId = String(item.materialCategoryId).toLowerCase()
      const userId = item.userId.toLowerCase()
      return branchId.includes(searchValue.toLowerCase()) 
            || Id.includes(searchValue.toLowerCase())
            || unitDescription.includes(searchValue.toLowerCase()) 
            || conversionRate.includes(searchValue.toLowerCase()) 
            || refUnitId.includes(searchValue.toLowerCase()) 
            || specification.includes(searchValue.toLowerCase()) 
            || MaterialcatId.includes(searchValue.toLowerCase()) 
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

  function handleDelete(event){
    event.preventDefault()
      axios
        .delete(`${BASE_URL}/api/materialType/${materialTypeId}`)
        .then((response) => {
          console.log("Shift deleted successfully", response.data);
          getColorConfig()
          setShowForm1(true)
          toast.error(<span><strong>Deleted</strong> successfully.</span>);
        })
        .catch((error) => {
          console.error("Error deleting node:", error);
          toast.error(<span><strong>Cannot be</strong> deleted.</span>);
        });
    }

  return (
    <div style={{ width: "100%", height: "100%" }}>

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
                    <TableCell style={{fontSize:'11px'}}>ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Branch ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Type Description</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Route ID</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Node Id Unit Id</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Specification</TableCell>
                    <TableCell style={{fontSize:'11px'}}>Material Category ID</TableCell>
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
                      <TableCell style={{fontSize:'11px'}} scope="row">{row.id}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.typeDescription}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.routeId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.nodeId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.specification}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.materialCategoryId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>
                      <input
                        type="radio" 
                        // onClick={() => handleEdit(row.unitId)}
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
                  (data.map((row) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{fontSize:'11px'}} scope="row">{row.id}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.branchId }</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.typeDescription}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.routeId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.nodeId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.specification}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.materialCategoryId}</TableCell>
                      <TableCell style={{fontSize:'11px'}}>{row.userId}</TableCell>
                      <TableCell style={{textAlign:'center',fontSize:'11px'}}>
                      <input
                        type="radio" 
                        onClick={() => handleEdit(row.id)}
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

        <form onSubmit={handleSubmit} style={{fontSize:'11px'}}>
        <div className="container" >
        <div className="col-12 p-2">
          <div className="offset-0 row mt-3" style={{height:'330.5px',overflowY:'scroll'}}>
            <div className="col-2">
              <table className="table table-bordered tablestriped">
                <thead className="sticky-top">
                    <tr>
                      <th style={{width:'50px'}}>State</th>
                      <th style={{width:'50px'}}>Color</th>
                      {/* <th style={{width:'40px'}}>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                   {ColorConfigdata.map((item, index) => (
                      <tr key={item.Id}>
                        <td>{item.stateName}</td>
                        <td>
                          <input 
                            type="color" 
                            className="form-control" 
                            style={{height:'20px'}}
                            value={StateColor[item?.Id] || item?.colorCode} 
                            onChange={(event) => handleColorChange(event, index, item?.Id)}
                            // disabled={editingId !== item.Id} // Enable only if this row is being edited
                          />
                        </td>
                        {/* <td style={{ textAlign: 'center' }}>
                          <LiaEdit style={{ cursor: 'pointer' }} onClick={() => handleEdit(item.Id)} />
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="offset-0 row">
            <div className="col-2">
              <button
                className="btn btn-sm"
                type="submit"
                onClick={handleSubmit}
                id="Facheck"
              >
                Submit
              </button>
              &nbsp;
              <a className="btn btn-sm" id="FaXmark" onClick={emptyfields}>
                Cancel
              </a>
            </div>
          </div>
          </div>
          </div>
        </form>
      
      <ToastContainer />
    </div>
  );
}

export default ColorConfig;
