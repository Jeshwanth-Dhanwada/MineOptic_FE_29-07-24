import React, { useEffect, useState } from 'react'
import { getEmpNodeMapping, getEmployees,getNodeMaster } from '../api/shovelDetails';
import { FaCheck, FaMinus, FaPlus, FaXmark } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { BASE_URL } from '../constants/apiConstants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Backdrop, CircularProgress } from '@mui/material';

function StaffAllocation() {

  const [EmpNodeMapping, setEmpNodeMapping] = useState([]);
  const [Employeedata, setEmployeedata] = useState([]);
  const [nodedata, setnodedata] = useState([]);

  const [OpenLoader, setOpenLoader] = useState(false);

  const showEmpNodeMapping = async (key) => {
    setOpenLoader(true)
    const responsedata = await getEmpNodeMapping();
    setEmpNodeMapping(responsedata, key);
    setOpenLoader(false)
  };
  const showEmployees = async (key) => {
    const responsedata = await getEmployees();
    setEmployeedata(responsedata, key);
  };
  const showNodes = async (key) => {
    const responsedata = await getNodeMaster();
    setnodedata(responsedata, key);
  };

  useEffect(() => {
          showEmpNodeMapping();
          showEmployees();
          showNodes();
  }, []);

  const getEmployeeNamebyId = (empId) => {
    const emp = Employeedata.find((item)=> item.empId == empId)
    return emp? emp.employeeName : 'Node Not Found'
  }

  const getParentNode = (nodeId) => {
    const node = nodedata.find((item) => item.nodeId == nodeId);
    return node? node.id : 'Node Not Found';
  }

  const getNodeDescbyId = (nodeId) => {
    const node = nodedata.find((item) => item.nodeId == nodeId)
    return node ? node.nodeName : 'Node Not Found'
  }

  const [editedIndex, setEditedIndex] = useState(null);
  const handleEdit = (index) => {
    setEditedIndex(index);
  };
  const removeEdit = (index) => {
    setEditedIndex(null);
  };

  const handleSave = () => {
    const editedItem = EmpNodeMapping[editedIndex];
    const edite = {
              empnodemapId:editedItem.empnodemapId,
              emp:editedItem.emp.empId,
              node:editedItem.node.nodeId,
              branchId: "1001",
              isActive:editedItem.isActive,
              userId:editedItem.userId,
              nodeType:editedItem.nodeType,
              default:editedItem.default,
              primary:editedItem.primary,
    }
    console.log(edite);
    axios
      .put(`${BASE_URL}/api/employeeNodeMapping/${editedItem.empnodemapId}`, edite)
      .then((response) => {
                console.log('Data saved successfully',response.data);
                setEditedIndex(null);
        toast.success(
          <span>
            <strong>Successfully</strong> Updated.
          </span>
        );
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        setEditedIndex(null);
      });
  };

  const deleteNode = (nodeId) =>{
    console.log(nodeId);
    axios
      .delete(`${BASE_URL}/api/nodeMaster/${nodeId}`)
      .then((response) => {
        console.log("deleted successfully",response.data);
      })
    .catch((error) => {
      console.error("Error deleting node:", error);
    });
  }

  const handleDeleteStaffMapping = (empnodeId) => {
    console.log(empnodeId);
    const findEmpId = EmpNodeMapping.filter((item) => item.empnodemapId == empnodeId).map((item) => item.emp.empId)
    console.log(findEmpId);
    const findNodeId = nodedata.filter((item) => item.iconId == findEmpId).map((item) => item.nodeId)
    console.log(findNodeId);
    deleteNode(findNodeId);
    axios
        .delete( `${BASE_URL}/api/employeeNodeMapping/${empnodeId}`,)
        .then((response) => {
          console.log("Node deleted successfully", response.data);
          toast.success(<span><strong>Deleted</strong> successfully.</span>);
          setOpenDelete(false);
        })
        .catch((error) => {
          console.error("Error deleting node:", error);
          // toast.error(<span><strong>User</strong> is not authorized fot this action.</span>);
        });
  }

  const [opendeletepopup, setOpenDelete] = useState(false);
  const handleClickdeletepopup = () => {
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const [isNewRowActive, setNewRowActive] = useState(false);
  const handleAddNewRow = () => {
    setNewRowActive(true);
  };

  const [empId , setempId] = useState([])
  const [nodeId , setnodeId] = useState([])
  const [branchId , setbranchId] = useState([])
  const [userId , setuserId] = useState([])
  const [defaultkey , setdefaultkey] = useState([])
  const [primary , setprimary] = useState([])

  const handleEmpId = (e) => {
    setempId(e.target.value);
  }
  const handlenodeId = (e) => {
    setnodeId(e.target.value);
  }
  const handlebranchId = (e) => {
    setbranchId(e.target.value);
  }
  const handleuserId = (e) => {
    setuserId(e.target.value);
  }
  const handledefaultkey = (e) => {
    setdefaultkey(e.target.value);
  }
  const handleprimary = (e) => {
    setprimary(e.target.value);
  }

  const handleCreateNode = (nodeId,empId) => {
    const deviceNode = {
      id: uuidv4(), //empData.deviceName + "",
      nodeCategory : "",
      nodeCategoryId: "203",
      unit1Measurable : "",
      unit2Mandatory : "",
      itemDescription : "",
      nodeType:"employee",
      nodeName:getEmployeeNamebyId(empId),
      xPosition:110,
      yPosition:20,
      type:"iconNode",
      parentNode: getParentNode(nodeId),
      extent:"parent",
      sourcePosition: "right",
      targetPosition: "left",
      iconId:empId,
      width:"10",
      height:"10",
      borderColor:"",
      borderStyle:"",
      borderWidth:"",
      FontSize:"",
      FontStyle:"",
      borderRadius:"",
      FontColor:"",
      branchId: "1001",
      userId :"1111",
      isRootNode:false,
      fillColor:"",
      fillTransparency:"",
      isParent: false,
      formula: "Formula Value",
      fuelUsed: "Fuel Used Value",
      fuelUnitsId: "Fuel Units ID",
      capacity: "Capacity Value",
      capacityUnitsId: "Capacity Units ID",
    };
    console.log(deviceNode);
    axios
    .post(`${BASE_URL}/api/nodeMaster`, deviceNode)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  const handleNewRowSubmit = () => {
    const payload = {
      emp:empId,
      node:nodeId,
      branchId: "1001",
      isActive:'true',
      userId:"1111",
      nodeType:"Machine",
      default:"No",
      primary:"Secondary",
    }
    console.log(payload);
    axios
      .post(`${BASE_URL}/api/employeeNodeMapping`,payload)
      .then((response) => {
        console.log('New row added successfully', response.data);
        toast.success(<span><strong>Successfully! </strong> Added.</span>);
        setNewRowActive(false);
        handleCreateNode(nodeId,empId)
        showEmpNodeMapping(response)
        setnodeId("");
        setempId("")
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding new row:', error);
      });
  }
  return (
      <div
          className="container-fluid"
          style={{ width: "100%", height: "450px",overflowY:'auto' }}
        >
          <table className="table table-bordered table-striped">
            <thead className="sticky-top">
              <tr>
                <th style={{fontSize: "11px"}}>Id</th>
                <th style={{fontSize: "11px"}}>Employee Id</th>
                <th style={{fontSize: "11px"}}>Employee Name</th>
                <th style={{fontSize: "11px"}}>Node Id</th>
                <th style={{fontSize: "11px"}}>Node Description</th>
                <th style={{fontSize: "11px"}}>Default</th>
                <th style={{fontSize: "11px"}}>Primary</th>
                <th style={{fontSize: "11px"}}>Node Type</th>
                <th style={{fontSize: "11px"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {EmpNodeMapping.map((item,index) => (
                <tr>
                  <td style={{ textAlign: "center" }}>{item.empnodemapId}</td>
                  <td style={{ textAlign: "center" }}>
                  {editedIndex === index ? (
                        <select
                          value={item.emp.empId}
                          onChange={(e) => {
                            const newData = [...EmpNodeMapping];
                            newData[index].emp.empId = e.target.value;
                            setEmpNodeMapping(newData);
                          }}
                          style={{
                            border: "none",
                            width: "70px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>Edge Style</option>
                          {Employeedata.map((item) => (
                            <option>{item.empId}</option>
                          ))}
                        </select>
                      ) : (
                        <div>{item.emp.empId}</div>
                      )}
                  </td>
                  <td style={{ textAlign: "center" }}>{getEmployeeNamebyId(item.emp.empId)}</td>
                  <td style={{ textAlign: "center" }}>
                  {editedIndex === index ? (
                        <select
                          value={item.node.nodeId}
                          onChange={(e) => {
                            const newData = [...EmpNodeMapping];
                            newData[index].node.nodeId = e.target.value;
                            setEmpNodeMapping(newData)
                          }}
                          style={{
                            border: "none",
                            width: "70px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>Node Id</option>
                          {nodedata.map((item)=>(
                          <option >{item.nodeId}</option>
                          ))}
                        </select>
                      ) : (
                        <div>{item.node.nodeId}</div>
                      )}
                  </td>
                  <td style={{ textAlign: "center" }}>{getNodeDescbyId(item.node.nodeId)}</td>
                  <td>
                  {editedIndex === index ? (
                        <select
                          value={item.primary}
                          onChange={(e) => {
                            const newData = [...EmpNodeMapping];
                            newData[index].primary = e.target.value;
                            setEmpNodeMapping(newData)
                          }}
                          style={{
                            border: "none",
                            width: "70px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>Primary</option>
                          <option value="True">Primary</option>
                          <option value="False">Secondary</option>
                        </select>
                      ) : (
                        <div>{item.primary}</div>
                      )}
                    </td>
                  <td>
                  {editedIndex === index ? (
                        <select
                          value={item.default}
                          onChange={(e) => {
                            const newData = [...EmpNodeMapping];
                            newData[index].default = e.target.value;
                            setEmpNodeMapping(newData)
                          }}
                          style={{
                            border: "none",
                            width: "70px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>Primary</option>
                          <option value="True">Yes</option>
                          <option value="False">No</option>
                        </select>
                      ) : (
                        <div>{item.default}</div>
                      )}
                    </td>
                  <td>{item.nodeType}</td>
                  <td>
                  {editedIndex === index ? (
                            <>
                              <button
                                style={{
                                  border: "none",
                                  backgroundColor: "transparent",
                                }}
                                onClick={removeEdit}
                              >
                                <FaXmark />
                              </button>
                            </>
                          ) : (
                            <span>
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
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
                                <Button 
                                    onClick={() => handleDeleteStaffMapping(item.empnodemapId)} 
                                  >
                                  Yes
                                </Button>
                                <Button onClick={handleDeleteClose}>No</Button>
                              </DialogActions>
                            </Dialog>
                          </React.Fragment>
                          </span>
                          )}
                          &nbsp;&nbsp;
                          {editedIndex === index ? (
                            <>
                              <button
                                style={{
                                  border: "none",
                                  backgroundColor: "transparent",
                                }}
                                onClick={(event) => handleSave()}
                              >
                                <FaCheck />
                              </button>
                            </>
                          ) : (
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                              onClick={() => handleEdit(index)}
                            >
                              <FaEdit />
                            </button>
                          )}
                  </td>
                </tr>
              ))}
              {isNewRowActive && (
                <tr>
                  <td></td>
                  <td style={{}} colSpan={2}>
                    <select style={{
                            border: "none",
                            width: "200px",
                            height: "20px",
                            backgroundColor: "whitesmoke"}}
                            value={empId}
                            onChange={handleEmpId}
                    >
                    <option hidden>Employee Id</option>
                    {Employeedata.map((item) =>(
                      <option value={item.empId}>{item.empId} - {item.employeeName}</option>
                    ))}
                    </select>
                  </td>
                  <td colSpan={2}>
                  <select 
                  style={{
                    border: "none",
                    width: "200px",
                    height: "20px",
                    backgroundColor: "whitesmoke"
                  }}
                    value={nodeId}
                    onChange={handlenodeId}
                    >
                    <option hidden>Node Id</option>
                    {nodedata
                    .filter((item) =>(item.nodeType === "Machine"))
                    .map((item) =>(
                      <option value={item.nodeId}>{item.nodeId} - {item.nodeName}</option>
                    ))}
                    </select>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                  <button style={{border:'none',background: 'transparent'}} 
                  onClick={handleNewRowSubmit}
                  >
                    <FaCheck style={{color:'green'}}/>
                  </button> &nbsp;
                  <button style={{border:'none',background: 'transparent'}} onClick={() => setNewRowActive(false)}>
                    <FaXmark style={{color:'red'}}/>
                </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className=''>
            <Button onClick={handleAddNewRow} style={{ marginLeft: '5px',background:'#09587c' }}>
              <FaPlus style={{color:'white'}}/>
            </Button>
          </div>
          {OpenLoader && (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={OpenLoader}
            // onClick={handleClose}
          >
            <CircularProgress size={80} color="inherit" />
          </Backdrop>
          )}
        </div>
  )
}

export default StaffAllocation
