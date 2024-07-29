import React, { useEffect, useState } from "react";
import { getEdges, getNodeMaster, getRoutes } from "../api/shovelDetails";
import ShowRoutes from "./showRoutes";
import { FaCheck, FaMinus, FaXmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/apiConstants";
import axios from "axios";

function Edgesdata({RoutedatafromEdge,onClick,tableHeight} ) {
  const [edgesdata, setedgesdata] = useState([]);
  const [Nodedata, setNodedata] = useState([]);
  const [Routedata, setRoutedata] = useState([]);
  const [tableHeightt, settableHeightt] = useState();

  const showEdges = async (key) => {
    const responsedata = await getEdges();
    setedgesdata(responsedata, key);
  };

  const showNodes = async (key) => {
    const responsedata = await getNodeMaster();
    setNodedata(responsedata, key);
  };

  const showRoutes = async (key) => {
    const responsedata = await getRoutes();
    setRoutedata(responsedata, key);
  };

  useEffect(() => {
    showEdges();
    showNodes();
    showRoutes();
    settableHeightt(tableHeight)
  }, [tableHeight]);

  console.log(RoutedatafromEdge);
  console.log(edgesdata);
  const sendDataToParent = (selectededge) => {
    onClick(selectededge)    
  };

  const [editedIndex, setEditedIndex] = useState(null);
  const handleEdit = (index) => {
    setEditedIndex(index);
    console.log();
  };
  const removeEdit = (index) => {
    setEditedIndex(null);
  };
  const handleSave = () => {
    const editedItem = edgesdata[editedIndex];
    console.log(editedItem);
    const edite = {
      id: editedItem.id,
      edgeId: editedItem.edgeId,
      routeId: editedItem.routeId,
      edgeStyle: editedItem.edgeStyle,
      sourceId: editedItem.sourceId,
      targetId: editedItem.targetId,
      animation: editedItem.animation,
      sourceNodeId: editedItem.sourceNodeId,
      targetNodeId: editedItem.targetNodeId,
      label: editedItem.label,
      edgeColor: editedItem.edgeColor,
      edgeThickness: editedItem.edgeThickness,
      // type:editedItem.ArrowClosed,
      // width:15,
      // height:15,
      // color:"#000",
      arrow: editedItem.arrow,
      branchId: "1001",
      sequenceId: "sequenceId",
      sourceNodeType: "sourceNodeType",
      targetNodeType: "targetNodeType",
      edgeDescription: "edgeDescription",
      unitsId: "unitsId",
      materialType: "materialType",
      userId: "1111",
    };
    console.log(edite);
    axios
      .put(`${BASE_URL}/api/edgeMaster/${editedItem.edgeId}`, edite)
      .then((response) => {
        console.log("Data saved successfully", response.data);
        setEditedIndex(null);
        toast.success(
          <span>
            <strong>Successfully</strong> Updated.
          </span>
        );
        showEdges();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        setEditedIndex(null);
      });
  };
  function getNodeNameById(nodeId) {
    const node = Nodedata.find((item) => item.nodeId === nodeId);
    return node ? node.nodeName : 'Node Not Found';
  }

  const handelheight = () =>{
    if(tableHeightt){
      if(tableHeight > 400){
        return '500px'
      }
      else{
        return tableHeightt 
      }
    }
    else{
      return '500px'
    }
  }
  return (
    // <div className="container-fluid" style={{ width: "100%", height: '400px' }}>
    <div className="container-fluid" style={{ width: "100%", height: handelheight() }}>
       {/* <div className="container-fluid" style={{ width: "100%", height: tableHeightt ? (tableHeightt > 400 ? '400px' : `${tableHeightt}px`) : '100px' }}>  */}
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered table-striped">
            <thead className="sticky-top" >
              <tr>
                <th style={{fontSize: "11px"}}>EdgeId</th>
                <th style={{fontSize: "11px"}}>Id</th>
                <th style={{fontSize: "11px"}}>Description</th>
                <th style={{fontSize: "11px"}}>Route</th>
                <th style={{fontSize: "11px"}}>Source Node</th>
                <th style={{fontSize: "11px"}}>Source Description</th>
                <th style={{fontSize: "11px"}}>Target Node</th>
                <th style={{fontSize: "11px"}}>Target Description</th>
                <th style={{fontSize: "11px"}}>Style</th>
                <th style={{fontSize: "11px"}}>Color</th>
                <th style={{fontSize: "11px"}}>Thickness</th>
                <th style={{fontSize: "11px"}}>Animation</th>
                <th style={{fontSize: "11px"}}>Arrow</th>
                <th style={{fontSize: "11px"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {edgesdata
                      .filter(
                        (item1,index) =>
                          item1.routeId == RoutedatafromEdge?.routeid)
                .map((item, index) => (
                  <tr
                    key={item.edgeId}
                    style={{ cursor: "pointer", }}
                    onClick={() => sendDataToParent(item.id)}
                  >
                    <td style={{ textAlign: "center", }}>{item.edgeId}</td>
                    <td style={{  }}>{item.id}</td>
                    <td style={{}}>
                    {editedIndex === index ? (
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const newData = [...edgesdata];
                            newData[index].label = e.target.value;
                            setedgesdata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "60px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        ></input>
                      ) : (
                        <div>{item.label}</div>
                      )}
                      </td>
                    <td style={{ textAlign: "center" }}>
                    {editedIndex === index ? (
                        <select
                          value={item.routeId}
                          onChange={(e) => {
                            const newData = [...edgesdata];
                            newData[index].routeId = e.target.value;
                            setedgesdata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "45px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>Route Id</option>
                          {Routedata.map((item) => (
                           <option value={item.routeId}>{item.routeId}</option>
                          ))}
                        </select>
                      ) : (
                        <div>{item.routeId}</div>
                      )}
                      </td>
                    <td style={{ textAlign: "center" }}>{item.sourceNodeId}</td>
                    <td style={{ textAlign: "center" }}>{getNodeNameById(item.sourceNodeId)}</td>
                    <td style={{ textAlign: "center" }}>{item.targetNodeId}</td>
                    <td style={{ textAlign: "center" }}>{getNodeNameById(item.targetNodeId)}</td>
                    <td>
                      {editedIndex === index ? (
                        <select
                          value={item.edgeStyle}
                          onChange={(e) => {
                            const newData = [...edgesdata];
                            newData[index].edgeStyle = e.target.value;
                            setedgesdata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "70px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>Edge Style</option>
                          <option value="smoothstep">smoothstep</option>
                          <option value="step">step</option>
                          <option value="straight">straight</option>
                          <option value="bezier">bezier</option>
                        </select>
                      ) : (
                        <div>{item.edgeStyle}</div>
                      )}
                    </td>
                    <td>
                      {editedIndex === index ? (
                        <input
                          type="color"
                          value={item.edgeColor}
                          onChange={(e) => {
                            const newData = [...edgesdata];
                            newData[index].edgeColor = e.target.value;
                            setedgesdata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "35px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        ></input>
                      ) : (
                        <div>{item.edgeColor}</div>
                      )}
                    </td>
                    <td>
                      {editedIndex === index ? (
                        <input
                          type="number"
                          value={item.edgeThickness}
                          onChange={(e) => {
                            const newData = [...edgesdata];
                            newData[index].edgeThickness = e.target.value;
                            setedgesdata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "60px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        ></input>
                      ) : (
                        <div>{item.edgeThickness}</div>
                      )}
                    </td>
                    <td>
                      {editedIndex === index ? (
                        <select
                          value={item.animation}
                          onChange={(e) => {
                            const newData = [...edgesdata];
                            newData[index].animation = e.target.value;
                            setedgesdata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "50px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>Animation</option>
                          <option value="True">True</option>
                          <option value="False">False</option>
                        </select>
                      ) : (
                        <div>{item.animation}</div>
                      )}
                    </td>
                    <td>
                      {editedIndex === index ? (
                        <select
                          value={item.arrow}
                          onChange={(e) => {
                            const newData = [...edgesdata];
                            newData[index].arrow = e.target.value;
                            setedgesdata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "35px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>Arrow</option>
                          <option value="True">True</option>
                          <option value="False">False</option>
                        </select>
                      ) : (
                        <div>{item.arrow}</div>
                      )}
                    </td>
                    <td>
                      <td>
                        <div style={{ display: "flex" }}>
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
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                              //         onClick={() => handleDeleteFGMapping(item.id)}
                            >
                              <FaMinus />
                            </button>
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
                        </div>
                      </td>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Edgesdata;
