import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaCheck, FaPlus, FaMinus, } from "react-icons/fa";
import "./sidebar.css";
import { FaXmark } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../constants/apiConstants';
import  {
          MarkerType,
          useNodesState,
          useEdgesState,
        } from "reactflow";
import { AiFillDelete } from "react-icons/ai";
import { Backdrop, CircularProgress } from '@mui/material';
const RoutePopup = ({ onEdit, onSave, onCancel, onDelete, onClick,setDataCallback }) => {
  const [data, setData] = useState([]);
  const [editedIndex, setEditedIndex] = useState(null);
  const [isNewRowActive, setNewRowActive] = useState(false);
  const [OpenLoader, setOpenLoader] = useState(false)
  // const [isChecked, setIsClicked] = useState(Boolean(false));
  const [newRowData, setNewRowData] = useState({
    routeDescription: '',
    productCategory: '',
  });
  const [initialNodes] = useState([]);
  const [initialEdges] = useState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Fetch -----------------
  useEffect(() => {
    // Fetch data from the API when the component mounts
    setOpenLoader(true)
    const apiUrl = `${BASE_URL}/api/routeMaster`;
    axios.get(apiUrl)
      .then((response) => {
        // console.log(response.data)
        setData(response.data);
        setOpenLoader(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [checked, setRadioCheck] = useState(false)
  const sendDataToParent = (routeid) => {
    setRadioCheck(true)
    var Routedata = routeid
    const apiUrl = `${BASE_URL}/api/edgeMaster?routeId=${routeid}&_=${Date.now()}`;
    axios.get(apiUrl)
      .then((response) => {
        console.log(response.data,"--")
        const dataArray = response.data.map((data) => ({
          id: data.id,
          edgeId: data.edgeId,
          routeid:data.routeId,
          source: data.sourceId,
          target: data.targetId,
          type: data.edgeStyle,
          animated: data.animation,
          sourceNodeId:data.sourceNodeId,
          targetNodeId:data.targetNodeId,
          label: data.label,
          style: { strokeWidth: data.edgeThickness, stroke: data.edgeColor },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 15,
            height: 15,
            color: "#000",
            arrow: data.arrow,
          },
        }));
        setEdges(dataArray)
        console.log("Incoming")
        onClick(dataArray,Routedata); // Pass the array of objects to the onClick function
        // onCancel()
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      
  };
  

  const handleEdit = (index) => {
    setEditedIndex(index);
  };

  // Edit ------------------

  const handleSave = () => {
    // Make an API request to save the edited data here
    // Assuming you have an API endpoint to update the data
    const editedItem = data[editedIndex];
    const edite = {
      "branchId": editedItem.branchId,
      "routeDescription": editedItem.routeDescription,
      "optional": editedItem.optional,
      "productCategory": editedItem.productCategory,
      "userId":'1111'
    }
    console.log(edite.routeId,"edite")
    console.log(editedItem,"editedItem")
    
    // Update the edited item with the new values
    // You can use axios.put or a similar method to send the data to your API
    axios.put(`${BASE_URL}/api/routeMaster/${editedItem.routeId}`, edite)
      .then((response) => {
        console.log('Data saved successfully',response.data);
        // Clear the edited index
        setEditedIndex(null);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  };

  const handleCancel = () => {
    // Clear the edited index to cancel editing
    setEditedIndex(null);
  };

  // Delete ---------------------

  const handleDelete = (index) => {
    const itemToDelete = data[index];
    const apiUrl = `${BASE_URL}/api/routeMaster/${itemToDelete.routeId}`;

    axios.delete(apiUrl)
      .then((response) => {
        console.log('Data deleted successfully', response.data);
        // Remove the deleted item from the data array
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
        console.log("AWS checking")
      });
  };

  // ADD -----------------

  const handleAddNewRow = () => {
    setNewRowActive(true);
  };

  const handleNewRowInputChange = (e) => {
    const { name, value } = e.target;
    setNewRowData({ ...newRowData, [name]: value });
  };

  const handleNewRowSubmit = () => {

    // Prepare the data payload to send to the API
  const newDataPayload = {
    // Fields entered by the user
    // routeId: 2, // Example: Generate a new routeId
    branchId: "1001",
    routeDescription: newRowData.routeDescription,
    optional: "Optional Data",
    productCategory: newRowData.productCategory,
    userId:'1111'
    };
    // Make an API request to add the new row data to the database
    // Assuming you have an API endpoint to create new rows
    axios.post(`${BASE_URL}/api/routeMaster`,newDataPayload)
      .then((response) => {
        console.log('New row added successfully', response.data);
        toast.success(
                  <span><strong>Successfully! </strong> Added.</span>,
                  {
                    position: toast.POSITION.TOP_RIGHT, // Set position to top center
                    // autoClose: 3000, // Optional: Set auto close time in milliseconds
                    // closeButton: false, // Optional: Hide close button
                    className: 'custom-toast' // Optional: Add custom CSS class
                  }
                  );

        // Add the new row to the data array
        setData([...data, response.data]);
        // Clear the new row form and deactivate new row mode
        setNewRowData({ 
          routeDescription: '',
          productCategory: '',
         });
        setNewRowActive(false);
      })
      .catch((error) => {
        console.error('Error adding new row:', error);
      });
  };

  return (
    <div 
        className="node-editor" 
        style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '0%', 
                border: '1px solid black',
                backgroundColor:'whitesmoke'
              }}>
                {/* <KeyboardDoubleArrowRightIcon style={{cursor:'pointer'}} onClick={onCancel}/> */}
      <table class=""  style={{ paddingLeft: '20px',width:'368px' }} cellPadding={'5px'} border={'1px'}>
        <thead  border={'1px'} style={{fontSize:'small'}}>
          <tr className='table'>
            <th></th>
            <th>Route ID</th>
            <th>Route Name</th>
            <th>Material Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody border={'1px'}>
          {data.map((item, index) => (
            <tr key={item.routeId} style={{ cursor: 'pointer' }}>
              <td>
                <input 
                  type="radio" 
                  name="radio" 
                  value={item.routeId}
                  onChange={() => sendDataToParent(item.routeId)}
                  />
              </td>
              <td>{item.routeId}</td>
              <td>
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={item.routeDescription}
                    onChange={(e) => {
                      // Update the edited item with the new value
                      const newData = [...data];
                      newData[index].routeDescription = e.target.value;
                      setData(newData);
                    }}
                    style={{width:'100px', border: 'none', backgroundColor: 'whitesmoke' }}
                  />
                ) : (
                  <div style={{width:'100px'}}>
                      {item.routeDescription}
                  </div>
                )}
              </td>
              <td>
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={item.productCategory}
                    onChange={(e) => {
                      // Update the edited item with the new value
                      const newData = [...data];
                      newData[index].productCategory = e.target.value;
                      setData(newData);
                    }}
                    style={{width:'100px',border: 'none', backgroundColor: 'whitredesmoke' }}
                  />
                ) : (
                  <div style={{width:'100px'}}>{item.productCategory}</div>
                )}
              </td>
              <td className="">
                <button style={{width:'20px',border:'none',backgroundColor:'transparent'}} 
                onClick={() => handleDelete(index)}
                ><AiFillDelete style={{color:'red'}}/></button>
              </td>
              <td>
                {editedIndex === index ? (
                  <>
                    <button style={{width:'20px',border:'none', color:'green'}} onClick={handleSave}><FaCheck style={{color:'green'}}/></button>
                  </>
                ) : (
                  <button style={{width:'25px',border:'none',backgroundColor:'transparent'}} onClick={() => handleEdit(index)}><FaEdit style={{color:'blue'}}/></button>
                )}
              </td>
            </tr>
          ))}
          {isNewRowActive && (
              
              <tr>
                <td></td>
                <td></td>
                <td style={{textAlign:'left'}}>
                    <input
                    type="text"
                    name="routeDescription"
                    placeholder="Route Name"
                    required
                    value={newRowData.routeDescription}
                    onChange={handleNewRowInputChange}
                    style={{border:'none', width: '100px', backgroundColor: 'whitesmoke' }}
                  />
                </td>
                <td>
                    <input
                    type="text"
                    name="productCategory"
                    placeholder="Product Category"
                    required
                    value={newRowData.productCategory}
                    onChange={handleNewRowInputChange}
                    style={{border:'none', width: '100px', backgroundColor: 'whitesmoke' }}
                  />
                </td>
              <td>
                  <button style={{border:'none'}} onClick={handleNewRowSubmit}>
                    <FaCheck style={{color:'green'}}/>
                  </button>
              </td>
              <td>
                <button style={{border:'none'}} onClick={() => setNewRowActive(false)}>
                    <FaXmark style={{color:'red'}}/>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className=''>
        <Button onClick={handleAddNewRow} style={{ marginLeft: '5px',background:'#09587c' }}>
          <FaPlus />
        </Button>
      </div>
      <ToastContainer />
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
  );
};

export default RoutePopup;



