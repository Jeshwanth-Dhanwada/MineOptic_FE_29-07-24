// import React from 'react';
import React, { useState, useEffect } from "react";
import { FaXmark, FaCheck } from "react-icons/fa6";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BASE_URL } from "../constants/apiConstants";
import { getNodeMaster } from "../api/shovelDetails";
import Switch from "@mui/material/Switch";
import { v4 as uuidv4 } from "uuid";
const labelSwitch = { inputProps: { "aria-label": "Switch demo" } };

const NodesPopup = ({ node, onClose, onSave, onClick }) => {
  const [data, setdata] = useState();
  const [nodeType, setNodeType] = useState(node?.nodeType);
  const [MachineType, setMachineType] = useState(node?.MachineType);
  const [nodeCategory, setNodeCategory] = useState(node?.nodeCategory);
  const [label, setLabel] = useState(node?.data.label);
  const [xPosition, setXPosition] = useState(node?.position.x);
  const [yPosition, setYPosition] = useState(node?.position.y);
  const [fontsize, setFontSize] = useState(node?.style.fontSize);
  const [width, setWidth] = useState(node?.style.width);
  const [height, setHeight] = useState(node?.style.height);
  const [borderRadius, setborderRadius] = useState(node?.style.borderRadius);
  const [itemDescription, setitemDescription] = useState(node?.itemDescription);
  const [unit1Measurable, setMeasurable] = useState(node?.unit1Measurable);
  const [unit2Mandatory, setMandatory] = useState(node?.unit2Mandatory);
  const [fontColor, setFontColor] = useState(node?.style.color);
  const [borderColor, setBorderColor] = useState(node?.style.borderColor);
  const [bgColor, setBgColor] = useState(node?.style.background);
  const [PerRejects, setPerRejects] = useState(node?.percentage_rejects);
  const [fontStyle, setFontStyle] = useState(node?.style.fontStyle);
  const [borderWidth, setBorderWidth] = useState(node?.style.borderWidth);
  const [borderStyle, setBorderStyle] = useState(node?.style.borderStyle);
  const [ImageStyle, setImageStyle] = useState(node?.type);
  const [file, setFile] = useState(node?.nodeImage);
  const [fileTODB, setFileTODB] = useState(node?.nodeImage);
  const [PNode, setparentNode] = useState(node?.parentNode);
  const [extent, setextent] = useState(node?.parentNode);
  const [sourcePosition, setsourcePosition] = useState(node?.sourcePosition);
  const [targetPosition, settargetPosition] = useState(node?.targetPosition);
  const [imagePreview, setPreview] = useState();

  const [Nodedata, setNodedata] = useState([]);
  const [Machinedata, setMachinedata] = useState([]);
  const [Materialdata, setMaterialdata] = useState([]);
  const showNodesdata = async (key) => {
    const responsedata = await getNodeMaster();
    setNodedata(responsedata, key);
  };
  // const showMaterialdata = async (key) => {
  //   const responsedata = await getMaterialTypeMaster();
  //   setMaterialdata(responsedata, key);
  // };
  // const showMachinedata = async (key) => {
  //   const responsedata = await getMachineTypeMaster();
  //   setMachinedata(responsedata, key);
  // };

  useEffect(() => {
    showNodesdata();
    // showMachinedata();
    // showMaterialdata();
  }, []);

  useEffect(() => {
    setNodeType(node?.nodeType);
    setMachineType(node?.MachineType)
    setNodeCategory(node?.nodeCategory);
    setLabel(node?.data.label);
    setXPosition(node?.position.x);
    setYPosition(node?.position.y);
    setFontSize(node?.style.fontSize);
    setWidth(node?.style.width);
    setHeight(node?.style.height);
    setborderRadius(node?.style.borderRadius);
    setitemDescription(node?.itemDescription);
    setMeasurable(node?.unit1Measurable);
    setMandatory(node?.unit2Mandatory);
    setFontColor(node?.style.color);
    setBorderColor(node?.style.borderColor);
    setBgColor(node?.style.background);
    setFontStyle(node?.style.fontStyle);
    setBorderWidth(node?.style.borderWidth);
    setBorderStyle(node?.style.borderStyle);
    setImageStyle(node?.type);
    setFile(node?.nodeImage);
    setFileTODB(node?.nodeImage);
    settargetPosition(node?.targetPosition)
    setsourcePosition(node?.sourcePosition)
    setPerRejects(node?.percentage_rejects)
  }, [node]);

  // Function to handle input changes
  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const handlesourcePosition = (event) => {
    if(nodeCategory === "Finished Goods"){
      setsourcePosition("")
    }
    else{
      setsourcePosition(event.target.value);
    }
  };

  const handletargetPosition = (event) => {
    if(nodeCategory === "Raw Material"){
      settargetPosition("")
    }
    else{
      settargetPosition(event.target.value);
    }
  };
  console.log(imagePreview,"imagePreview")
  const handleItemDescription = (event) => {
    setitemDescription(event.target.value);
  };

  const handleMeasurable = (event) => {
    setMeasurable(event.target.value);
  };

  const handleMandatory = (event) => {
    setMandatory(event.target.value);
  };

  const handleNodeTypeChange = (event) => {
    setNodeType(event.target.value);
    // console.log(nodeType)
    // Add code here to update width and height based on the new nodeType
    if (event.target.value === "Material" && nodeCategory !== "Waste") {
      setWidth("80px"); // Set the default width for Material
      setHeight("80px"); // Set the default height for Material
      setborderRadius("50%");
      setBgColor("#35ca5c")
      setFontColor("#000000")
    } else if (event.target.value === "Machine") {
      setWidth("300px");
      if(file){
        setHeight("220px");
      }
      else{
        setHeight("80px");
      }
      setborderRadius('10px');
      const color = "#CCCCCC";
      setBorderColor(color);
      setBorderWidth("1px");
      setMeasurable("No");
      setMandatory("No");
      setNodeCategory("");
      setBgColor("#EEEEEE")
      setFontColor("#000000")
    }
  };

  const handleNodeCategory = (event) => {
    const { value } = event.target; // Destructure value from event.target
    setNodeCategory(value);
    console.log(value, "Color");

    // Corrections made to if conditions
    if (nodeType === "Material" && value === "Waste" ) {
      setWidth("80px");
      setHeight("80px");
      setborderRadius("50%");
      const color = "#CCCCCC";
      setBorderColor(color);
      setBorderWidth("2px");
      setImageStyle("")
      setBgColor("#F97C1E")
      setFontColor("#000000")
  } 
    else if (value === "Waste") {
        setWidth("80px");
        setHeight("80px");
        setborderRadius("50%");
        const color = "#CCCCCC";
        setBorderColor(color);
        setBorderWidth("2px");
        setImageStyle("")
        setBgColor("#03FC37")
        setFontColor("#000000")
    } 
    else if (nodeType === "Material" && value === "Finished Goods") {
        const color = "#CCCCCC";
        setBorderColor(color);
        setWidth("80px");
        setHeight("80px");
        setborderRadius("50%");
        setBgColor("#FCDEDF")
        setFontColor("#000000")
        // setsourcePosition(""); // Moved inside this condition
        setImageStyle("output")
    } else if (nodeType === "Material" && value === "Raw Material") {
        const color = "#CCCCCC";
        setBorderColor(color);
        setWidth("80px");
        setHeight("80px");
        setborderRadius("50%");
        setBgColor("#9CDBB9")
        setFontColor("#000000")
        // settargetPosition(""); // Moved inside this condition
        // setsourcePosition("right")
        setImageStyle("input")
    } else if (nodeType === "Material" && value === "Work In Progress") {
        const color = "#CCCCCC"; // Consider adding specific color for this case
        setBorderColor(color);
        setWidth("80px");
        setHeight("80px");
        setborderRadius("50%");
        setImageStyle("")
        setBgColor("#9CDBB9")
        setFontColor("#000000")
    }
};
const handleMachineType = (event) => {
  setMachineType(event.target.value);
}

  const handleborderWidth = (event) => {
    setBorderWidth(event.target.value);
  };
  const handleborderStyle = (event) => {
    setBorderStyle(event.target.value);
  };
  
  const handleXPositionChange = (event) => {
    setXPosition(Number(event.target.value));
  };
  const handleYPositionChange = (event) => {
    setYPosition(Number(event.target.value));
  };
  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };
  const handleWidthChange = (event) => {
    setWidth(event.target.value);
  };
  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };
  const handleFontColor = (event) => {
    setFontColor(event.target.value);
  };
  const handleBackGroud = (event) => {
    setBgColor(event.target.value);
  };
  const handlePerRejects = (event) => {
    setPerRejects(event.target.value);
  };
  const handleBorderCOlor = (event) => {
    setBorderColor(event.target.value);
    console.log(borderColor);
  };
  const handleFontstyle = (event) => {
    setFontStyle(event.target.value);
  };
  const HandleImage = (event) => {
    setFile(event.target.files[0].name);
    setFileTODB(event.target.files[0]);
    // setImageStyle("MachineIcon")
    setPreview(URL.createObjectURL(event.target.files[0]))

    if(event.target.files){
      setHeight("220px")
      setWidth("300px")
    }
    else{
      setHeight("80px")
      setWidth("300px")
    }
  };
  console.log(PNode,"KKKK")
  const handleSave = async(event) => {
    setparentNode(node.id)
    setextent("Parent")
    event.preventDefault(); // Prevent default form submission behavior
    console.log(fileTODB,"save")
    // if(!fileTODB){
    //   console.log("No file Selected")
    //   return 
    // }

    const fd = new FormData();
    fd.append('file', fileTODB);
    console.log(fd,"save")
    await axios.post('http://localhost:5001/upload-image', fd,
     {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
       })
        .then(response => {
            console.log(response, "save")
        })
        .catch(err => console.log(err, "save"))

    // Calculate the center position for the label within the node
    const labelX = node.position.x + node.style.width / 2;
    const labelY = node.position.y + node.style.height / 2;
    console.log(file,"filename")
    console.log(fileTODB,"filename")
    console.log(Nodedata.map((item)=> item.nodeImage),"filename")
    // Call the onSave function with the updated no de object
    onSave({
      ...node,
      nodeType: nodeType,
      MachineType:MachineType,
      nodeCategory: nodeCategory,
      unit1Measurable: unit1Measurable,
      unit2Mandatory: unit2Mandatory,
      itemDescription: itemDescription,
      parentNode: PNode,
      extent:extent,
      type:ImageStyle,
      nodeImage:imagePreview,
      sourcePosition:sourcePosition,
      targetPosition:targetPosition,
      data: { ...node.data, label: label },
      position: { x: xPosition, y: yPosition },
      percentage_rejects:PerRejects,
      style: {
        fontSize: fontsize,
        width: width,
        height: height,
        color: fontColor,
        background: bgColor,
        borderColor: borderColor,
        fontStyle: fontStyle,
        borderWidth: borderWidth,
        borderStyle: borderStyle,
        borderRadius: borderRadius,
        // textAlign:'center',
        display: "flex",
        justifyContent: "center" /* Horizontally center */,
        alignItems: file ? '' : "center" /* Vertically center */,
      },
    });
    
    if (!Nodedata.some((item) => item.nodeImage === file) && file !== "") {
      console.log("filename Incoming")
      const NewImageNode = {
        parenId: "",
        id: uuidv4(),
        position: {
          x: Nodedata.some((item)=>item.nodeId == node.nodeId) ? 60 : 75,
          y: 40
        },
        nodeCategory: "",
        unit1Measurable: "",
        parentNode: node.id,
        extent: "parent",
        unit2Mandatory: "",
        itemDescription: "",
        nodeImage: file,
        nodeType: "MachineIcon",
        type: "MachineIcon",
        sourcePosition: "right",
        targetPosition: "left",
        iconId: '',
        percentage_rejects:0,
        style: {
          zIndex: 1001,
          // width: node.style.width,
          width: node.style.width,
          height: node.style.height+150,
          background: "",
          color: "",
          borderColor: "",
          borderStyle: "",
          borderWidth: "",
          fontSize: "",
          fontStyle: "",
          borderRadius: '10',
          display: "",
          alignItems: "",
          fontColor: "",
          justifycontent: 'center', /* Horizontally center */
          // alignitems: 'center',/* Vertically center */
          textAlign:'start'
        },
        data: { 
          label: file,
          node: {
              url:imagePreview,
            },
          onIconDoubbleClick: '' },
      };
      onClick(NewImageNode)
      console.log(NewImageNode,"imagePreview")
      console.log(node.nodeId,"imagePreview")
      console.log(Nodedata.filter((item)=>item.nodeId == node.nodeId) ? 60 : 75,"imagePreview")
    }
    console.log(node.position.x,"positions")
    console.log(node.position.y,"positions")

    // Set the position of the label to the center
    const updatedLabel = {
      ...node.data.label,
      position: { x: labelX, y: labelY },
    };
    setLabel(updatedLabel);
    onClose(); // Close the popup
  };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/nodeTypes`;
    axios
      .get(apiUrl)
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      className="edge-popup container-fluid"
      style={{
        position: "absolute",
      }}
    >
      <form action="" method="post" enctype="multipart/form-data" style={{ fontSize: "11px" }}>
        <div className="container-fluid">
          <div className="row" style={{ fontSize: "11px" }}>
            <div className="col-2 p-2">
              <label>Node ID</label>
              <input
                type="text"
                className="form-control"
                value={node?.nodeId}
                style={{ height: "32px" }}
              />
            </div>
            <div className="col-2 p-2">
              <label>Node Type</label>
              <select
                style={{ height: "32px" }}
                className="form-control"
                onChange={handleNodeTypeChange}
                value={nodeType}
              >
                <option hidden>Node Type</option>
                {data
                  ? data.map((item) => (
                      <option key={item.Type} value={item.Type}>
                        {item.Type}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
            <div className="col-2 p-2">
              <label>Node Category</label>
              {nodeType === "Material" ? (
                <select
                  style={{ height: "32px" }}
                  onChange={handleNodeCategory}
                  value={nodeCategory}
                  className="form-control"
                >
                  <option hidden>Please Select</option>
                  <option>Finished Goods</option>
                  <option>Work In Progress</option>
                  <option>Raw Material</option>
                  <option>Waste</option>
                </select>
              ) : (
                <select
                  style={{ height: "32px" }}
                  onChange={handleNodeCategory}
                  value={nodeCategory}
                  className="form-control"
                  disabled
                >
                  <option disabled>Please Select</option>
                </select>
              )}
            </div>
            <div className="col-2 p-2">
              <label>Source Position</label>
              <select
                style={{ height: "32px" }}
                value={sourcePosition}
                className="form-control"
                onChange={handlesourcePosition}
              >
                <option value={sourcePosition} hidden>
                  {sourcePosition}
                </option>
                <option>right</option>
                <option>bottom</option>
                <option>left</option>
                <option>top</option>
              </select>
            </div>
            <div className="col-2 p-2">
              <label>Font-Color</label>
              <input
                type="color"
                value={fontColor}
                className="form-control"
                onChange={handleFontColor}
                style={{ height: "32px" }}
              />
            </div>
            <div className="col-2 p-2">
              <label>Upload Image</label>
              <input
                type="file"
                className="form-control"
                style={{ height: "32px" }}
                onChange={HandleImage}
              />
            </div>
          </div>
          <div className="row" style={{ fontSize: "11px" }}>
            <div className="col-2 p-2">
              <label>Label:</label>
              <input
                type="text"
                className="form-control"
                value={label}
                style={{ height: "32px" }}
                onChange={handleLabelChange}
              />
            </div>
            <div className="col-2 p-2">
              <label>Item Description:</label>
              <input
                type="text"
                value={itemDescription}
                className="form-control"
                placeholder="description"
                style={{ height: "32px" }}
                onChange={handleItemDescription}
              />
            </div>
            <div className="col-2 p-2">
              <label>Unit1 Measurable</label>
              {nodeType === "Material" ? (
                <select
                  className="form-control"
                  onChange={handleMeasurable}
                  style={{ height: "32px" }}
                  value={unit1Measurable}
                >
                  <option hidden>Please Select</option>
                  <option value={"Yes"}>Yes</option>
                  <option value={"No"}>No</option>
                </select>
              ) : (
                <select
                  disabled
                  className="form-control"
                  onChange={handleMeasurable}
                  style={{ height: "32px" }}
                >
                  <option hidden>Please Select</option>
                </select>
              )}
            </div>
            <div className="col-2 p-2">
              <label>Target Position</label>
              <select
                style={{ height: "32px" }}
                value={targetPosition}
                onChange={handletargetPosition}
                className="form-control"
              >
                <option value={targetPosition} hidden>
                  {targetPosition}
                </option>
                <option>left</option>
                <option>top</option>
                <option>right</option>
                <option>bottom</option>
              </select>
            </div>
            <div className="col-2 p-2">
              <label>Bg-Color</label>
              <input
                type="color"
                style={{ height: "32px" }}
                className="form-control"
                value={bgColor}
                onChange={handleBackGroud}
              />
            </div>
            <div className="col-2 p-2">
              <label>Percentage Rejects</label>
              <input
                type="number"
                style={{ height: "32px" }}
                className="form-control"
                value={PerRejects}
                onChange={handlePerRejects}
              />
            </div>
          </div>
          <div className="row" style={{ fontSize: "11px" }}>
            <div className="col-2 p-2">
              <label>X-Position</label>
              <input
                type="text"
                className="form-control"
                value={xPosition}
                onChange={handleXPositionChange}
                style={{ height: "32px" }}
              />
            </div>
            <div className="col-2 p-2">
              <label>Y-Position</label>
              <input
                type="text"
                className="form-control"
                value={yPosition}
                onChange={handleYPositionChange}
                style={{ height: "32px" }}
              />
            </div>
            <div className="col-2 p-2">
              <label>Unit2 Mandatory</label>
              {nodeType === "Material" ? (
                <select
                  onChange={handleMandatory}
                  style={{ height: "32px" }}
                  value={unit2Mandatory}
                  className="form-control"
                >
                  <option hidden>Please Select</option>
                  <option value={"Yes"}>Yes</option>
                  <option value={"No"}>No</option>
                </select>
              ) : (
                <select
                  onChange={handleMandatory}
                  style={{ height: "32px" }}
                  value={unit2Mandatory}
                  className="form-control"
                  disabled
                >
                  <option hidden>Please Select</option>
                </select>
              )}
            </div>
            <div className="col-2 p-2">
              <label>Font Size</label>
              <input
                type="text"
                className="form-control"
                value={fontsize}
                onChange={handleFontSizeChange}
                style={{ height: "32px" }}
              />
            </div>
            <div className="col-2 p-2">
              <label>Border-Color</label>
              <input
                type="color"
                style={{ height: "32px" }}
                value={borderColor}
                className="form-control"
                onChange={handleBorderCOlor}
              />
            </div>
          </div>
          <div className="row" style={{ fontSize: "11px" }}>
            <div className="col-2 p-2">
              <label>Width</label>
              <input
                type="text"
                style={{ height: "32px" }}
                value={width}
                className="form-control"
                onChange={handleWidthChange}
              />
            </div>
            <div className="col-2 p-2">
              <label>Height</label>
              <input
                type="text"
                style={{ height: "32px" }}
                value={height}
                className="form-control"
                onChange={handleHeightChange}
              />
            </div>
            <div className="col-2 p-2">
              <label>Border Width</label>
              <select
                style={{ height: "32px" }}
                value={fontStyle}
                onChange={handleFontstyle}
                className="form-control"
              >
                <option value={fontStyle}>{fontStyle}</option>
                <option>italic</option>
                <option>normal</option>
                <option>oblique</option>
              </select>
            </div>
            <div className="col-2 p-2">
              <label>Font-Style</label>
              <input
                type="text"
                className="form-control"
                style={{ height: "32px" }}
                value={borderWidth}
                onChange={handleborderWidth}
              />
            </div>
            <div className="col-2 p-2">
              <label>Border Color</label>
              <select
                style={{ height: "32px" }}
                value={borderStyle}
                onChange={handleborderStyle}
                className="form-control"
              >
                <option value={borderStyle}>{borderStyle}</option>
                <option>solid</option>
                <option>dashed</option>
                <option>dotted</option>
              </select>
            </div>
          </div>
          {/* <div className="row" style={{ fontSize: "11px" }}>
          </div> */}
          <div className="row" style={{ fontSize: "11px" }}>
            <div className="col-3 p-2">
              <button className="btn" id="Facheck" onClick={handleSave}>
                {/* <FaCheck /> */}Submit
              </button>
              &nbsp;
              <button className="btn"id="FaXmark" onClick={onClose}>
                {/* <FaXmark /> */}Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NodesPopup;
