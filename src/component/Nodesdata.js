import React, { useEffect, useState } from "react";
import { getEdges, getNodeMaster, getRoutes } from "../api/shovelDetails";
import ShowRoutes from "./showRoutes";
import { FaCheck, FaMinus, FaXmark } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/apiConstants";
import axios from "axios";

function Nodesdata(nodeIdselected) {
  const [edgesdata, setedgesdata] = useState([]);
  const [Nodedata, setNodedata] = useState([]);
  const [Routedata, setRoutedata] = useState([]);

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
  }, []);

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
    return node ? node.nodeName : "Node Not Found";
  }
  return (
    <div>
      <div
        className="container-fluid"
        style={{ width: "100%", height: "450px", overflowX: "scroll" }}
      >
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered table-striped">
              <thead className="sticky-top">
                <tr>
                  <th style={{ fontSize: "11px" }}>Node Id</th>
                  <th style={{ fontSize: "11px" }}>Id</th>
                  <th style={{ fontSize: "11px" }}>Node Name</th>
                  <th style={{ fontSize: "11px" }}>Node type</th>
                  <th style={{ fontSize: "11px" }}>Width</th>
                  <th style={{ fontSize: "11px" }}>Height</th>
                  <th style={{ fontSize: "11px" }}>Border Color</th>
                  <th style={{ fontSize: "11px" }}>Border Width</th>
                  <th style={{ fontSize: "11px" }}>Border Style</th>
                  <th style={{ fontSize: "11px" }}>Font Color</th>
                  <th style={{ fontSize: "11px" }}>Font Style</th>
                  <th style={{ fontSize: "11px" }}>Font Size</th>
                  <th style={{ fontSize: "11px" }}>unit1 Measurable</th>
                  <th style={{ fontSize: "11px" }}>unit2 Mandatory</th>
                  <th style={{ fontSize: "11px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Nodedata.filter(
                  (item) => item.id == nodeIdselected.nodeIdselected
                ).map((item, index) => (
                  <tr style={{ cursor: "pointer" }}>
                    <td>{item.nodeId}</td>
                    <td>{item.id}</td>
                    <td>{item.nodeName}</td>
                    <td>{item.nodeType}</td>
                    <td>
                    {editedIndex === index ? (
                        <input
                          type="text"
                          value={item.width}
                          onChange={(e) => {
                            const newData = [...Nodedata];
                            newData[index].width = e.target.value;
                            setNodedata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "40px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        ></input>
                      ) : (
                        <div>{item.width}</div>
                      )}
                      </td>
                    <td>
                    {editedIndex === index ? (
                        <input
                          type="text"
                          value={item.height}
                          onChange={(e) => {
                            const newData = [...Nodedata];
                            newData[index].height = e.target.value;
                            setNodedata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "40px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        ></input>
                      ) : (
                        <div>{item.height}</div>
                      )}
                              </td>
                    <td>
                    {editedIndex === index ? (
                        <input
                          type="color"
                          value={item.borderColor}
                          onChange={(e) => {
                            const newData = [...Nodedata];
                            newData[index].borderColor = e.target.value;
                            setNodedata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "40px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        ></input>
                      ) : (
                        <div>{item.borderColor}</div>
                      )}
                              </td>
                    <td>
                      {editedIndex === index ? (
                        <input
                          type="text"
                          value={item.borderWidth}
                          onChange={(e) => {
                            const newData = [...Nodedata];
                            newData[index].borderWidth = e.target.value;
                            setNodedata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "40px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        ></input>
                      ) : (
                        <div>{item.borderWidth}</div>
                      )}
                    </td>
                    <td>
                      {editedIndex === index ? (
                        <select
                          value={item.borderStyle}
                          onChange={(e) => {
                            const newData = [...Nodedata];
                            newData[index].borderStyle = e.target.value;
                            setNodedata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "40px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>FontStyle</option>
                          <option value={"solid"}>solid</option>
                          <option value={"dashed"}>dashed</option>
                          <option value={"dotted"}>dotted</option>
                        </select>
                      ) : (
                        <div>{item.borderStyle}</div>
                      )}
                    </td>
                    <td>
                      {editedIndex === index ? (
                        <input
                          type="color"
                          value={item.FontColor}
                          onChange={(e) => {
                            const newData = [...Nodedata];
                            newData[index].FontColor = e.target.value;
                            setNodedata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "40px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        ></input>
                      ) : (
                        <div>{item.FontColor}</div>
                      )}
                    </td>
                    <td>
                      {editedIndex === index ? (
                        <select
                          value={item.FontStyle}
                          onChange={(e) => {
                            const newData = [...Nodedata];
                            newData[index].FontStyle = e.target.value;
                            setNodedata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "50px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>FontStyle</option>
                          <option>italic</option>
                          <option>normal</option>
                          <option>oblique</option>
                        </select>
                      ) : (
                        <div>{item.FontStyle}</div>
                      )}
                    </td>
                    <td>
                      {editedIndex === index ? (
                        <input
                          type="text"
                          value={item.FontSize}
                          onChange={(e) => {
                            const newData = [...Nodedata];
                            newData[index].FontSize = e.target.value;
                            setNodedata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "40px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        ></input>
                      ) : (
                        <div>{item.FontSize}</div>
                      )}
                    </td>
                    <td>
                      {editedIndex === index ? (
                        <select
                          value={item.unit1Measurable}
                          onChange={(e) => {
                            const newData = [...Nodedata];
                            newData[index].unit1Measurable = e.target.value;
                            setNodedata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "70px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>unit1Measurable</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : (
                        <div>{item.unit1Measurable}</div>
                      )}
                    </td>
                    <td>
                      {editedIndex === index ? (
                        <select
                          value={item.unit2Mandatory}
                          onChange={(e) => {
                            const newData = [...Nodedata];
                            newData[index].unit2Mandatory = e.target.value;
                            setNodedata(newData);
                          }}
                          style={{
                            border: "none",
                            width: "70px",
                            height: "20px",
                            backgroundColor: "whitesmoke",
                          }}
                        >
                          <option hidden>unit2Mandatory</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      ) : (
                        <div>{item.unit2Mandatory}</div>
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
    </div>
  );
}

export default Nodesdata;
