// import React from 'react';
import React, { useState, useEffect } from "react";
import { FaXmark, FaCheck } from "react-icons/fa6";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BASE_URL } from "../constants/apiConstants";
import { getMachineTypeMaster, getMaterialTypeMaster, getNodeMaster } from "../api/shovelDetails";
import Switch from '@mui/material/Switch';
import { v4 as uuidv4 } from 'uuid';
const labelSwitch = { inputProps: { 'aria-label': 'Switch demo' } };

const NodesPopup = ({ node, onClose, onSave,onClick }) => {
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
  const showMaterialdata = async (key) => {
    const responsedata = await getMaterialTypeMaster();
    setMaterialdata(responsedata, key);
  };
  const showMachinedata = async (key) => {
    const responsedata = await getMachineTypeMaster();
    setMachinedata(responsedata, key);
  };

  useEffect(() => {
    showNodesdata();
    showMachinedata();
    showMaterialdata();
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
      setFontColor("#FFFFFF")
    } else if (event.target.value === "Machine") {
      setWidth("180px");
      setHeight("60px");
      setborderRadius('10px');
      const color = "#000000";
      setBorderColor(color);
      setBorderWidth("1px");
      setMeasurable("No");
      setMandatory("No");
      setNodeCategory("");
      setBgColor("#dcdcdc")
      setFontColor("#09587C")
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
      const color = "#000000";
      setBorderColor(color);
      setBorderWidth("2px");
      setImageStyle("")
      setBgColor("#F97C1E")
      setFontColor("#FFFFFF")
  } 
    else if (value === "Waste") {
        setWidth("80px");
        setHeight("80px");
        setborderRadius("50%");
        const color = "#000000";
        setBorderColor(color);
        setBorderWidth("2px");
        setImageStyle("")
        setBgColor("#03FC37")
        setFontColor("#FFFFFF")
    } 
    else if (nodeType === "Material" && value === "Finished Goods") {
        const color = "#000";
        setBorderColor(color);
        setWidth("80px");
        setHeight("80px");
        setborderRadius("50%");
        // setsourcePosition(""); // Moved inside this condition
        setImageStyle("output")
    } else if (nodeType === "Material" && value === "Raw Material") {
        const color = "#000";
        setBorderColor(color);
        setWidth("80px");
        setHeight("80px");
        setborderRadius("50%");
        setBgColor("#1976D2")
        // settargetPosition(""); // Moved inside this condition
        // setsourcePosition("right")
        setImageStyle("input")
    } else if (nodeType === "Material" && value === "Work In Progress") {
        const color = "#000"; // Consider adding specific color for this case
        setBorderColor(color);
        setWidth("80px");
        setHeight("80px");
        setborderRadius("50%");
        setImageStyle("")
        setBgColor("#ebff00")
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
      setWidth("180px")
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
    await axios.post('http://localhost:5000/upload-image', fd,
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

  // const [imageSrc, setImageSrc] = useState(null);

  // useEffect(() => {
  //   // Define the image name you want to fetch
  //   const imageName = 'masterbatch.jpg'; // Replace 'example.jpg' with the actual image name

  //   // Fetch the image from your server
  //   fetch(`/get-image/${imageName}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Image not found');
  //       }
  //       return response.blob();
  //     })
  //     .then(blob => {
  //       // Convert the blob into a URL
  //       const imageUrl = URL.createObjectURL(blob);
  //       setImageSrc(imageUrl);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching image:', error);
  //     });

  //   // Cleanup function to revoke the object URL when component unmounts
  //   return () => {
  //     if (imageSrc) {
  //       URL.revokeObjectURL(imageSrc);
  //     }
  //   };
  // }, [imageSrc]);
  

  // useEffect(() => {
  //   console.log("1st")
  //   const fetchImage = async () => {
  //     console.log("2nd")
  //     try {
  //       console.log("3rd")
  //       // const imageUrl = 'http://localhost:5000/uploaded-images/example.jpg'; // Replace with the actual URL to your uploaded image
  //       const response = await axios.get('http://localhost:5000/api/shift/uploaded/1618366938-101006.png');
  //       setImageUrl(response.data);
  //     } catch (error) {
  //       console.error('Error fetching image:', error);
  //     }
  //   };

  //   fetchImage();
  // }, []);


  return (
    <div
      className="edge-popup container-fluid"
      style={{
        width: "1000px",
        height: "235px",
        // overflow:"scroll",
        position: "absolute",
        // top: "48px",
        // // right: "0px",
        // cursor:"pointer",
        // paddingLeft: "5px",
        // paddingTop: "5px",
        // // overflow:'hidden',
        // display:'flex',
        // backgroundColor: "white",
        // border:'1px solid black',
        // boxShadow: "2px 2px 10px 0.1px black"
      }}
    >
      {/* <div 
        onClick={onClose}
        style={{backgroundColor:'red',
                color:'whitesmoke',
                width:'20px',
                height:'20px',
                textAlign:'center',
                lineHeight:1,
                position:'absolute',
                right:'1px',
                top:'1px'
                }}>
                <FaXmark />
        </div> */}

      <form action="" method="post" enctype="multipart/form-data">
      <div className="row">

        <div className="col-3 p-2">
          <table style={{ fontSize: "11px" }}>
            <tr>
              <td>Node Id:</td>
              <td>{node?.nodeId}</td>
            </tr>
            <tr>
              <td>Node Type</td>
              <td>
                <select
                  style={{ width: "80px", height: "25px" }}
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
              </td>
            </tr>
            <tr>
              <td>Material Type</td>
              <td>
                {nodeType === "Material" ? (
                  <select
                    style={{ width: "80px", height: "25px" }}
                    onChange={handleNodeCategory}
                    value={nodeCategory}
                  >
                    <option hidden>Please Select</option>
                    {/* <option>Finished Goods</option>
                    <option>Work In Progress</option>
                    <option>Raw Material</option>
                    <option>Waste</option> */}
                    {Materialdata.map((item)=>
                      <option>{item.materialName}</option>
                    )}
                  </select>
                ) : (
                  <select
                    style={{ width: "80px", height: "30px" }}
                    onChange={handleNodeCategory}
                    value={nodeCategory}
                    disabled
                  >
                    <option disabled>Please Select</option>
                  </select>
                )}
              </td>
            </tr>
            <tr>
              <td>Machine Type</td>
              <td>
                {nodeType === "Machine" ? (
                  <select
                    style={{ width: "80px", height: "25px" }}
                    onChange={handleMachineType}
                    value={MachineType}
                  >
                    <option>{MachineType}</option>
                    {/* <option>Trucks</option>
                    <option>Excavators</option> */}
                    {Machinedata.map((item)=>
                      <option>{item.machineName}</option>
                    )}
                    {/* <option>Raw Material</option>
                    <option>Waste</option> */}
                  </select>
                ) : (
                  <select
                    style={{ width: "80px", height: "30px" }}
                    onChange={handleMachineType}
                    value={MachineType}
                    disabled
                  >
                    <option disabled>Please Select</option>
                  </select>
                )}
              </td>
            </tr>
            <tr>
              <td>Label:</td>

              <td>
                <input
                  type="text"
                  value={label}
                  style={{ width: "80px", height: "25px" }}
                  onChange={handleLabelChange}
                />
              </td>
            </tr>
            <tr>
              <td>Item Description:</td>
              <td>
                <input
                  type="text"
                  value={itemDescription}
                  placeholder="description"
                  style={{ width: "80px", height: "25px" }}
                  onChange={handleItemDescription}
                />
              </td>
            </tr>
            <div className="button-container pt-3">
              <button className="btn btn-success" onClick={handleSave}>
                <FaCheck />
              </button>
              &nbsp;
              <button className="btn btn-danger" onClick={onClose}>
                <FaXmark />
              </button>
            </div>
          </table>
        </div>
        <div className="col-3 p-2">
          <table style={{ fontSize: "11px" }}>
            <tr>
              <td>Unit1 Measurable:</td>
              <td>
                {nodeType === "Material" ? (
                  <select
                    onChange={handleMeasurable}
                    style={{ width: "80px", height: "25px" }}
                    value={unit1Measurable}
                  >
                    <option hidden>Please Select</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </select>
                ) : (
                  <select
                    disabled
                    onChange={handleMeasurable}
                    style={{ width: "80px", height: "30px" }}
                  >
                    <option hidden>Please Select</option>
                  </select>
                )}
              </td>
            </tr>
            <tr>
              <td>Unit2 Mandatory:</td>
              <td>
                {nodeType === "Material" ? (
                  <select
                    onChange={handleMandatory}
                    style={{ width: "80px", height: "25px" }}
                    value={unit2Mandatory}
                  >
                    <option hidden>Please Select</option>
                    <option value={"Yes"}>Yes</option>
                    <option value={"No"}>No</option>
                  </select>
                ) : (
                  <select
                    onChange={handleMandatory}
                    style={{ width: "80px", height: "25px" }}
                    value={unit2Mandatory}
                    disabled
                  >
                    <option hidden>Please Select</option>
                  </select>
                )}
              </td>
            </tr>
            <tr>
              <td>X-Position:</td>
              <td>
                <input
                  type="text"
                  value={xPosition}
                  onChange={handleXPositionChange}
                  style={{ width: "80px", height: "25px" }}
                />
              </td>
            </tr>
            <tr>
              <td>Y-Position:</td>
              <td>
                <input
                  type="text"
                  value={yPosition}
                  onChange={handleYPositionChange}
                  style={{ width: "80px", height: "25px" }}
                />
              </td>
            </tr>
            <tr>
              <td>Width:</td>
              <td>
                <input
                  type="text"
                  style={{ width: "80px", height: "25px" }}
                  value={width}
                  onChange={handleWidthChange}
                />
              </td>
            </tr>
            <tr>
              <td>Height:</td>
              <td>
                <input
                  type="text"
                  style={{ width: "80px", height: "25px" }}
                  value={height}
                  onChange={handleHeightChange}
                />
              </td>
            </tr>
          </table>
        </div>
        <div className="col-3 p-2">
          <table style={{ fontSize: "11px" }}>
            <tr>
              <td>Font-Style:</td>
              <td>
                <select
                  style={{ width: "80px", height: "25px" }}
                  value={fontStyle}
                  onChange={handleFontstyle}
                >
                  <option value={fontStyle}>{fontStyle}</option>
                  <option>italic</option>
                  <option>normal</option>
                  <option>oblique</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Font-Color:</td>
              <td>
                <input
                  type="color"
                  value={fontColor}
                  onChange={handleFontColor}
                  style={{ width: "80px", height: "25px" }}
                />
              </td>
            </tr>
            <tr>
              <td>Border-Color:</td>
              <td>
                <input
                  type="color"
                  style={{ width: "80px", height: "25px" }}
                  value={borderColor}
                  onChange={handleBorderCOlor}
                />
              </td>
            </tr>
            <tr>
              <td>Bg-Color:</td>
              <td>
                <input
                  type="color"
                  style={{ width: "80px", height: "25px" }}
                  value={bgColor}
                  onChange={handleBackGroud}
                />
              </td>
            </tr>
            <tr>
              <td>Source Position:</td>
              <td>
                <select
                  style={{ height: "25px", width: "80px" }}
                  value={sourcePosition}
                  onChange={handlesourcePosition}
                >
                  <option value={sourcePosition} hidden>{sourcePosition}</option>
                  <option>right</option>
                  <option>bottom</option>
                  <option>left</option>
                  <option>top</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Target Position:</td>
              <td>
                <select
                  style={{ height: "25px", width: "80px" }}
                  value={targetPosition}
                  onChange={handletargetPosition}
                >
                  <option value={targetPosition} hidden>{targetPosition}</option>
                  <option>left</option>
                  <option>top</option>
                  <option>right</option>
                  <option>bottom</option>
                </select>
              </td>
            </tr>
          </table>
        </div>
        <div className="col-3 p-2">
          <table style={{ fontSize: "11px" }}>
            <tr>
              <td>Font-Size:</td>
              <td>
                <input
                  type="text"
                  value={fontsize}
                  onChange={handleFontSizeChange}
                  style={{ width: "80px", height: "25px" }}
                />
              </td>
            </tr>
            <tr>
              <td>Border Width:</td>
              <td>
                <input
                  type="text"
                  style={{ width: "80px", height: "25px" }}
                  value={borderWidth}
                  onChange={handleborderWidth}
                />
              </td>
            </tr>
            <tr>
              <td>Border Color:</td>
              <td>
                <select
                  style={{ height: "25px", width: "80px" }}
                  value={borderStyle}
                  onChange={handleborderStyle}
                >
                  <option value={borderStyle}>{borderStyle}</option>
                  <option>solid</option>
                  <option>dashed</option>
                  <option>dotted</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Upload Image:</td>
              <td>
              {nodeType === "Machine" ? (
                    <input type="file" onChange={HandleImage}/>) :<input type="file" disabled onChange={HandleImage}/>}
                    {/* <input type="file" onChange={ (e) => { setFile(e.target.files[0]) } }/> */}
              </td>
            </tr>
          </table>
        </div>
      </div>
      </form>
    </div>
  );
};

export default NodesPopup;