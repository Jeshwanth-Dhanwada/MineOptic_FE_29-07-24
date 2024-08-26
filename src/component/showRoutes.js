/* eslint-disable import/no-anonymous-default-export */
import Dagre from "@dagrejs/dagre";
import React, { useCallback, useState, useEffect, useRef, useMemo, useContext } from "react";
import EdgeEditPopup from "./EdgeEditor.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Backdrop, Card, Slider } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getEmployees, getItemmaster, getOADetails, getDeviceMapping, getJobAssign, getShifts, getNodeMaster, getNodeAllocation, getbatch_master, getbatches, getEdges, getActivities } from "../api/shovelDetails.js";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { NODE_WIDTH, NODE_HEIGHT } from "../constants/chartlConstants.js";
import { ReactFlowProvider } from "react-flow-renderer"
import iconNode from "./nodeTypes/iconNode.js";
import graphNode from "./nodeTypes/graphNode.js";
import MachineNode from "./nodeTypes/MachineNode.js";
import MachinegraphNode from "./nodeTypes/MachinegraphNode.js";
import customNodeSelect from "./nodeTypes/customNodeSelect.js";
import ConfirmModal from "./commonComponents/confirmModal.js";
import Employees from "./rigtPanel/employees.js";
import AuthContext from "../context/AuthProvider.js";
import CircularProgress from '@mui/material/CircularProgress';
import ReactFlow, {
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
  MarkerType,
} from "reactflow";
import { BASE_URL } from "../constants/apiConstants.js";
import BasicTabs from "./tabs.js";
import RightOperationTabPanel from "./rigtPanel/rightOperationPanel.js";
import "reactflow/dist/style.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Tooltip from "react-bootstrap/Tooltip";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { v4 as uuidv4 } from 'uuid';
import {
  FaSave,
  FaCheck,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import NodeEditor from "./NodeEditor.js";
import DevicePanel from "./rigtPanel/devicePanel.js";
import RightSlider from "../layout/RightSlider.js";
import { BsPlusLg } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
let directionOn = "";

const connectionLineStyle = { stroke: "black" };
const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const getLayoutedElements = (nodes, edges, options, direction) => {
  // const isHorizontal = direction === "LR";
  // g.setGraph({ rankdir: direction });
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);
      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

// const nodeColor = (node) => {
//   switch (node.type) {
//     case "input":
//       return "#6ede87";
//     case "output":
//       return "#6865A5";
//     default:
//       return "#ff0072";
//   }
// };

let id = 1;
const getId = () => {
  const newId = id;
  id += 1; // Increment by 1
  return `${newId}`;
};


const proOptions = { hideAttribution: true };

const ShowRoutes = ({ 
  selectedNodes,
  setSelectedNodes,
  selectedEdge,
  setSelectedEdge,
  edgeData, nodeData,
  selectedMenuItem,
  showPopup,
  setShowPopup,
  showNodePopup,
  setNodeShowPopup,
  setRoutedatafromEdge,
  EdgefromEdgeComp,
  setEdgefromEdgeComp,
  selectedId,
  onClick,
  bottomtosidepanel,
  senddatatoNodes,
  sendtoPlanningtab,
  setSendtoPlanningtab,
  toRightOperationTabPanel,
  setJobfromOperations,
  setjobIdtoJobpriority,
  setMultiplejobIdtoJobpriority,
  setdataToBottomJobPriorPanel,
  sendtoRoutes,
  setSelectedId }) => {
  const { fitView, addNodes } = useReactFlow();
  const [selectedNodeForEdit, setSelectedNodeForEdit] = useState(null);
  const [showGraph, setshowGraph] = useState(false);
  const [selectedEdgeForEdit, setSelectedEdgeForEdit] = useState(null);
  const [sidebarCollapsed] = useState(false);
  const [data, setData] = useState([]);
  // const [Edgedata, setEdgeData] = useState([]);
  const [initialNodes] = useState([]);
  const [initialEdges] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes || nodeData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges || edgeData);
  const [newNode, setNewNode] = useState(null);
  const [StaffAllocation, setStaffAllocation] = useState([])
  const [DeviceMapping, setDeviceMapping] = useState([])
  const [JobMapping, setJobMapping] = useState([])
  const [Devicenode, setDevicenode] = useState([])
  const [shiftdata, setShiftdata] = useState([]);
  const [sendtoRoutess, setSendtoRoutes] = useState({sendtoRoutes});

  let computeNodeList = []
  // fetching Node data from database -----------
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    setSendtoRoutes(sendtoRoutes)
  },[sendtoRoutes])
  
  useEffect(() => {
    const updatedEdges = edges.map((existingEdge) =>
      existingEdge.id === edgeData.id ? { ...existingEdge, ...edgeData } : existingEdge
    );
    const updatedNodes = nodes.map((existingNode) =>
      existingNode.id === nodeData.id ? { ...existingNode, ...nodeData } : existingNode
    );
    setEdges(updatedEdges);
    setNodes(updatedNodes);
  }, [edgeData, nodeData])

  useEffect(() => {
    const NodeImages = nodes.map((item)=>item.nodeImage)
    if(NodeImages.length > 0){
      const empNode = {
        parenId: "",
        empId: "",
        nodedetails: "",
        id: uuidv4(), 
        position: { x: 110, y: 20 },
        nodeCategory: "",
        unit1Measurable: "",
        parentNode: "",
        extent: "parent",
        unit2Mandatory: "",
        itemDescription: "",
        nodeImage: "",
        nodeType: "MachineIcon",
        MachineType: "",
        type: "",
        sourcePosition: "right",
        targetPosition: "left",
        iconId: "",
        style: {
          zIndex: 1001,
          width: "20",
          height: "20",
          background: "",
          color: "",
          borderColor: "",
          borderStyle: "",
          borderWidth: "",
          fontSize: "",
          fontStyle: "",
          borderRadius: 10,
          display: "",
          alignItems: "",
          fontColor: ""
        },
        data: { label: "",UpdatedNodes:nodes},
      };
    }
  },[nodes])
  const [OpenLoader, setOpenLoader] = useState(false)

  console.log(auth.branchId,"auth")
  console.log(nodes,"auth")
  useEffect(() => {
    // Fetch data from the API when the component mounts
    setOpenLoader(true)
    const apiUrl = `${BASE_URL}/api/nodeMaster`;

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);

        console.log(response.data,"branch")
        let x = [];
        for (let index = 0; index < response.data.length; index++) {
          const data = response.data[index];
          // Filter based on auth.branchId and data.branchId
        if (data.branchId == auth.branchId) {
          x.push({
            nodeId: data.nodeId,
            // id: getId(),
            id: data.id,
            data: { label: data.nodeName },
            nodeType: data.nodeType,
            MachineType: data.MachineType,
            type: data.type,
            nodeCategory: data.nodeCategory,
            unit1Measurable: data.unit1Measurable,
            parentNode: data.parentNode,
            extent: data.extent,
            unit2Mandatory: data.unit2Mandatory,
            iconId: data.iconId,
            itemDescription: data.itemDescription,
            sourcePosition: data.sourcePosition,
            targetPosition: data.targetPosition,
            nodeImage: data.nodeImage,
            position: { x: data.xPosition, y: data.yPosition },
            style: {
              background: data.fillColor, // Set background color
              color: data.FontColor, // Set text color
              borderColor: data.borderColor,
              borderStyle: data.borderStyle,
              borderWidth: data.borderWidth,
              fontSize: data.FontSize, // Set the font size
              fontStyle: data.FontStyle, // Set the font style
              width: data.width,
              height: data.height,
              borderRadius: data.borderRadius,
              display: data.borderRadius ? 'flex' : '',
              alignItems: data.nodeImage === "" ? 'center' : "",
              justifyContent: 'center',
              // fontFamily:'Bold'
              // fontColor: data.FontColor,
            },
          });
        }
        setNodes(x);
      }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setOpenLoader(false)
  }, [auth.branchId, setNodes]);

  const [dataFromChild, setDataFromChild] = useState();
  const [route, setRoute] = useState([]);

  const handleChildClick = (data, routeid) => {
    setDataFromChild(data);
    setEdges(data)
    var routedata = { routeid }
    setRoute(routedata)
    setRoutedatafromEdge(routedata)
    setShowEdges(true);
    setNodeShowPopup(false)
  };

  const getsourcenodeId = (params) => {
    const nodedata = data.filter(item => item.id == params.source);
    return nodedata[0].nodeId
  }

  const gettargetnodeId = (params) => {
    const edgedata = data.filter(item => item.id == params.target);
    return edgedata[0].nodeId
  }
  //Add Edge connection logic ----------------------

  const onConnect = useCallback(
    (params) => {
      if (route && route.routeid) {
        const newEdge = {
          ...params,
          id: uuidv4(),
          edgeId: undefined,
          sourceNodeId: getsourcenodeId(params),
          targetNodeId: gettargetnodeId(params),
          routeId: route.routeid,
          type: "smoothstep",
          label: "",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 25,
            height: 25,
            color: "#000",
            arrow: true,
          },
          style: { strokeWidth: 1, stroke: "#000" },
          animated: false,
        };
        setEdges((edges) => addEdge(newEdge, edges));
      } else {
        // Handle the case when route.id is not present (e.g., show an error message)
        console.log("Cannot connect edges: route.id is not present.");
      }
    },
    [route, setEdges]
  );


  // Add Node --------------------------------------

  const onAddNode = useCallback(() => {
    const selectedNode = nodes.find((node) => node.selected);
    if (!selectedNode) {
      const newNode = {
        id: uuidv4(),
        nodeType: '',
        MachineType: "",
        nodeCategory: '',
        unit1Measurable: '',
        parentNode: '',
        extent: '',
        type: '',
        unit2Mandatory: '',
        iconId: '',
        itemDescription: '',
        nodeImage: '',
        height: '100px',
        width: '40px',
        position: {
          x: 0, // Generate a random x-coordinate within a reasonable range
          y: 0, // Generate a random y-coordinate within a reasonable range
        },
        data: {
          label: `Node ${getId()}`,
        },
        sourcePosition: 'right',
        targetPosition: 'left',
        style: {
          background: '#dcdcdc', // Set background color
          color: 'grey',     // Set text color
          borderColor: '#000',
          borderStyle: 'solid',
          borderWidth: '1px',
          fontSize: '14px', // Set the font size
          fontStyle: 'normal', // Set the font style
          width: '150px',
          height: '40px',
          justifycontent: 'center', /* Horizontally center */
          alignitems: 'center',/* Vertically center */
          borderRadius:'20'
        },
      };
      setNewNode(newNode)
      // computeNodeList.push(newNode)
      addNodes(newNode);
    }
    else {
      const xOffset = 200; // Initial x-offset
      const yOffset = 0; // Initial y-offset
      const offsetIncrement = 50; // Increase in offset for each new node

      const existingNodesAtPosition = (x, y) =>
        nodes.some((node) => node.position.x === x && node.position.y === y);

      const calculatePosition = (x, y, offset) => {
        while (existingNodesAtPosition(x, y)) {
          x += offset;
          y += offset;
        }
        return { x, y };
      };

      // console.log("something", initialNodes);

      // If a node is selected, add the new node and create a connection
      const newX = selectedNode.position.x + xOffset;
      const newY = selectedNode.position.y + yOffset;

      const { x: finalX, y: finalY } = calculatePosition(
        newX,
        newY,
        offsetIncrement
      );
      if (directionOn === 'TB') {
        const newNode = {
          id: uuidv4(),
          nodeType: '',
          MachineType: "",
          nodeCategory: '',
          unit1Measurable: '',
          parentNode: '',
          extent: '',
          type: '',
          unit2Mandatory: '',
          iconId: '',
          itemDescription: '',
          nodeImage: '',
          // nodeId:NodegetId(),
          position: { x: finalX, y: finalY },
          sourcePosition: 'right',
          targetPosition: 'left',
          data: {
            label: `Node ${getId()}`,
          },
          style: {
            background: '#dcdcdc', // Set background color
            color: 'grey',     // Set text color
            borderColor: '#000',
            borderStyle: 'solid',
            borderRadius:'20',
            borderWidth: '1px',
            fontSize: '14px', // Set the font size
            fontStyle: 'normal', // Set the font style
            width: '150px',
            height: '40px',
            justifycontent: 'center', /* Horizontally center */
            alignitems: 'center'/* Vertically center */
          },
        };
        setNewNode(newNode)
        computeNodeList.push(newNode)
        addNodes(newNode);
        setEdges((prevEdges) => [...prevEdges]);
      }
      else {
        const newNode = {
          id: uuidv4(),
          nodeType: '',
          MachineType: "",
          nodeCategory: '',
          unit1Measurable: '',
          parentNode: '',
          extent: '',
          type: '',
          unit2Mandatory: '',
          iconId: '',
          itemDescription: '',
          nodeImage: '',
          // nodeId:NodegetId(),
          position: { x: finalX, y: finalY },
          sourcePosition: 'right',
          targetPosition: 'left',
          data: {
            label: `Node ${getId()}`,
          },
          style: {
            background: '#dcdcdc', // Set background color
            color: 'grey',     // Set text color
            borderColor: '#000',
            borderStyle: 'solid',
            borderWidth: '1px',
            fontSize: '14px', // Set the font size
            fontStyle: 'normal', // Set the font style
            width: '150px',
            height: '40px',
            borderRadius:'20'
          },
        };
        setNewNode(newNode)
        computeNodeList.push(newNode)
        addNodes(newNode);
        setEdges((prevEdges) => [...prevEdges]);
      }
    }
  }, [addNodes, computeNodeList, initialNodes, nodes, setEdges]);

  // Delete Node -------------------------------

  const deleteEdges = useCallback(() => {
    const selectedEdge = edges.find((edge) => edge.selected);
    // const selectedEdge = edges.find((edge) => edge.selected)
    if (!selectedEdge) {
      // Display an alert or notification to the user
      alert("Please select a Edge to delete.");
      return;
    }

    axios
      .delete(`${BASE_URL}/api/edgeMaster/${selectedEdge.edgeId}`)
      .then((response) => {
        console.log("Edges deleted successfully", response.data);
        // alert("Node deleted successfully")
      })
      .catch((error) => {
        console.error("Error deleting node:", error);
      });

    const selectedEdgeIds = new Set();
    edges.forEach((edge) => {
      if (edge.selected) {
        selectedEdgeIds.add(edge.id);
      }
    });
    const filteredEdges = edges.filter((edge) => !selectedEdgeIds.has(edge.id));
    setEdges(filteredEdges);
  }, [edges, setEdges]);

  // const deletenodes = useCallback(() => {
  //   // setConsecutiveAddCounter(0);
  //   const selectedNode = nodes.find((node) => node.selected);
  //   // const selectedEdge = edges.find((edge) => edge.selected)
  //   if (!selectedNode ) {
  //     // Display an alert or notification to the user
  //     alert("Please select a Node to delete.");
  //     return;
  //   }

  //   // Make an Axios DELETE request to delete the selected node by its ID
  //   axios
  //     .delete(`${BASE_URL}/api/nodeMaster/${selectedNode.nodeId}`)
  //     .then((response) => {
  //       console.log("Node deleted successfully", response.data);
  //       const apiUrl = `${BASE_URL}/api/nodeMaster`;

  //         axios
  //           .get(apiUrl)
  //           .then((response) => {
  //             setData(response.data);
  //             let x = [];
  //             for (let index = 0; index < response.data.length; index++) {
  //               const data = response.data[index];
  //               x.push({
  //                 nodeId: data.nodeId,
  //                 id: data.id,
  //                 nodeType:data.nodeType,
  //                 nodeCategory: data.nodeCategory,
  //                 data: { label: data.nodeName },
  //                 sourcePosition: data.sourcePosition,
  //                 targetPosition: data.targetPosition,
  //                 position: { x: data.xPosition, y: data.yPosition },
  //                 style: {
  //                   background: data.fillColor, // Set background color
  //                   color: "#000", // Set text color
  //                   borderColor: data.borderColor,
  //                   borderStyle: data.borderStyle,
  //                   borderWidth: data.borderWidth,
  //                   fontSize: data.FontSize, // Set the font size
  //                   fontStyle: data.FontStyle, // Set the font style
  //                   width: data.width,
  //                   height: data.height,
  //                   borderRadius: data.borderRadius,
  //                   display: data.borderRadius ? 'flex' : '',
  //                   alignItems: 'center',
  //                   fontColor:data.FontColor
  //                 },
  //               });
  //             }
  //             setNodes(x);
  //           })
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting node:", error);
  //     });

  //   const selectedNodeIds = new Set();
  //   const selectedEdgeIds = new Set();
  //   nodes.forEach((node) => {
  //     if (node.selected) {
  //       selectedNodeIds.add(node.id);
  //       // Collect descendant nodes by traversing edges
  //       edges.forEach((edge) => {
  //         if (edge.source === node.id) {
  //           selectedNodeIds.add(edge.target);
  //         }
  //       });
  //     }
  //   });

  //   // Collect edges connected to the selected nodes
  //   edges.forEach((edge) => {
  //     if (
  //       selectedNodeIds.has(edge.source) ||
  //       selectedNodeIds.has(edge.target)


  //     ) {
  //       selectedEdgeIds.add(edge.id);
  //     }
  //   });

  //   const filteredNodes = nodes.filter((node) => !selectedNodeIds.has(node.id));
  //   console.log(filteredNodes);
  //   const filteredEdges = edges.filter((edge) => !selectedEdgeIds.has(edge.id));

  //   setNodes(filteredNodes);
  //   setEdges(filteredEdges);
  // }, [nodes, edges]);


  const deletenodes = useCallback(() => {
    // setConsecutiveAddCounter(0);
    const selectedNode = nodes.find((node) => node.selected);

    if (!selectedNode) {
      // Display an alert or notification to the user
      alert("Please select a Node to delete.");
      return;
    }

    // Make an Axios DELETE request to delete the selected node by its ID
    axios
      .delete(`${BASE_URL}/api/nodeMaster/${selectedNode.nodeId}`)
      .then((response) => {
        console.log("Node deleted successfully", response.data);

        // Collect the IDs of edges connected to the deleted node
        const edgeIdsToDelete = edges
          .filter((edge) => edge.source === selectedNode.id || edge.target === selectedNode.id)
          .map((edge) => edge.edgeId);

        // Make DELETE requests to delete the connected edges
        edgeIdsToDelete.forEach((edgeId) => {
          axios
            .delete(`${BASE_URL}/api/edgeMaster/${edgeId}`)
            .then((response) => {
              console.log("Edge deleted successfully", response.data);
            })
            .catch((error) => {
              console.error("Error deleting edge:", error);
            });
        });

        // Continue with updating the nodes and edges in your state as you did in your original code.
        const selectedNodeIds = new Set();
        const selectedEdgeIds = new Set();
        nodes.forEach((node) => {
          if (node.selected) {
            selectedNodeIds.add(node.id);
            // Collect descendant nodes by traversing edges
            edges.forEach((edge) => {
              if (edge.source === node.id) {
                selectedNodeIds.add(edge.target);
              }
            });
          }
        });

        // Collect edges connected to the selected nodes
        edges.forEach((edge) => {
          if (
            selectedNodeIds.has(edge.source) ||
            selectedNodeIds.has(edge.target)
          ) {
            selectedEdgeIds.add(edge.id);
          }
        });

        const filteredNodes = nodes.filter((node) => !selectedNodeIds.has(node.id));
        const filteredEdges = edges.filter((edge) => !selectedEdgeIds.has(edge.id));

        setNodes(filteredNodes);
        setEdges(filteredEdges);
      })
      .catch((error) => {
        console.error("Error deleting node:", error);
      });
  }, [nodes, edges]);


  function deleteSelectedElements() {
    const selectedEdge = edges.find((edge) => edge.selected);
    const selectedNode = nodes.find((node) => node.selected);
    if (selectedEdge) {
      deleteEdges()
    } else {
      deletenodes()
    }
  }

  // const deleteSelectedElements = useCallback(() => {
  //   setConsecutiveAddCounter(0);
  //   const selectedNode = nodes.find((node) => node.selected);
  //   if (!selectedNode) {
  //     // Display an alert or notification to the user
  //     alert("Please select a node to delete.");
  //     return;
  //   }
  //   const selectedNodeIds = new Set();
  //   const selectedEdgeIds = new Set();
  //   nodes.forEach((node) => {
  //     if (node.selected) {
  //       selectedNodeIds.add(node.id);
  //       // Collect descendant nodes by traversing edges
  //       edges.forEach((edge) => {
  //         if (edge.source === node.id) {
  //           selectedNodeIds.add(edge.target);
  //         }
  //       });
  //     }
  //   });

  //   // Collect edges connected to the selected nodes
  //   edges.forEach((edge) => {
  //     if (
  //       selectedNodeIds.has(edge.source) ||
  //       selectedNodeIds.has(edge.target)
  //     ) {
  //       selectedEdgeIds.add(edge.id);
  //     }
  //   });

  //   const filteredNodes = nodes.filter((node) => !selectedNodeIds.has(node.id));
  //   console.log(filteredNodes);
  //   const filteredEdges = edges.filter((edge) => !selectedEdgeIds.has(edge.id));

  //   setNodes(filteredNodes);
  //   setEdges(filteredEdges);
  // }, [nodes, edges, setNodes, setEdges]);

  const [layoutDirection, setLayoutDirection] = useState("TB"); // Default to "TB" (top-bottom) layout
  const onLayout = useCallback(
    (direction) => {
      const newDirection = layoutDirection === "TB" ? "LR" : "TB"; // Toggle the layout direction
      const layouted = getLayoutedElements(nodes, edges, {
        direction: newDirection,
      });
      setLayoutDirection(newDirection);
      // const layouted = getLayoutedElements(nodes, edges, { direction });
      directionOn = direction;

      // Set source and target positions based on the direction
      const updatedNodes = layouted.nodes.map((node) => ({
        ...node,
        sourcePosition: newDirection === "TB" ? "right" : "left",
        targetPosition: newDirection === "TB" ? "right" : "left",
      }));

      setNodes(updatedNodes);
      setEdges([...layouted.edges]);
      const fitViewOptions = { padding: 0.4 };
      window.requestAnimationFrame(() => {
        fitView(fitViewOptions);
      });
    },
    [layoutDirection, nodes, edges, setNodes, setEdges, fitView]
  );

  const handleEdgeSave = (editedEdge) => {
    const updatedEdges = edges.map((edge) =>
      edge.id === editedEdge.id ? editedEdge : edge
    );
    setNodes(updatedEdges);
    setSelectedEdgeForEdit(null);
  };

  const handleEdgeCancel = () => {
    setSelectedEdgeForEdit(null);
  };

  //Edit Node ------------

  const handleEditNode = (node) => {
    setSelectedNodeForEdit(node);
    console.log("******");
    // Set the selected property of the node to true
    const updatedNodes = nodes.map((n) => ({
      ...n,
      selected: n.id === node.id,

      // style: {
      //   // backgroundColor: 'red',
      //   border: '2px solid red',
      // },
    }));
    setNodes(updatedNodes);
  };

  const handleNodeSave = (editedNode) => {
    const updatedNodes = nodes.map((node) =>
      node.id === editedNode.id ? editedNode : node
    );
    setNodes(updatedNodes);
    setSelectedNodeForEdit(null);
  };

  const handleNodeCancel = () => {
    setSelectedNodeForEdit(null);
  };
  // Edges Popup --------------------

  const generateJSONDataForNodes = (nodes) => {
    // CreateImageNode(nodes)
    const jsonDatadummy = {
      nodes: nodes
      .filter((item)=>item.nodeType !== "GraphNode" && item.nodeType !== "MachineNode")
      .map((node) => ({
        nodeId: node.nodeId,
        id: node.id,
        branchId: auth.branchId,
        nodeCategory: node.nodeCategory,
        unit1Measurable: node.unit1Measurable,
        parentNode: node.parentNode,
        extent: node.extent,
        type: node.type,
        unit2Mandatory: node.unit2Mandatory,
        iconId: node.iconId,
        itemDescription: node.itemDescription,
        nodeImage: node.nodeImage,
        nodeCategoryId: "203",
        nodeType: node.nodeType,
        MachineType: node.MachineType,
        nodeName: node.data.label,
        width: node.style.width,
        height: node.style.height,
        borderRadius: node.style.borderRadius.toString(),
        xPosition: node.position.x,
        yPosition: node.position.y,
        borderColor: node.style.borderColor,
        borderWidth: node.style.borderWidth,
        borderStyle: node.style.borderStyle,
        fillColor: node.style.background,
        fillTransparency: "Fill Transparency Value",
        isRootNode: false,
        isParent: false,
        formula: "Formula Value",
        fuelUsed: "Fuel Used Value",
        fuelUnitsId: "Fuel Units ID",
        capacity: "Capacity Value",
        capacityUnitsId: "Capacity Units ID",
        sourcePosition: node.sourcePosition,
        targetPosition: node.targetPosition,
        FontColor: node.style.color,
        FontStyle: node.style.fontStyle,
        FontSize: node.style.fontSize,
        userId: '1111'
      })),
    };
    console.log(jsonDatadummy
      , "ImageStyle");
    return JSON.stringify(jsonDatadummy);
  };
  const generateJSONDataForEdges = (edges) => {
    const jsonData = {
      edges: edges.map((edge) => ({
        id: edge.id,
        branchId: auth.branchId,
        edgeId: edge.edgeId,
        edgeDescription: "edgeDescription",
        routeId: route.routeid.toString(),
        sequenceId: "YourSequenceId",
        sourceNodeType: "sourceNodeType",
        targetNodeType: "targetNodeType",
        sourceId: edge.source,
        targetId: edge.target,
        unitsId: "unitsId",
        materialType: "Material Type",
        edgeStyle: edge.type,
        edgeColor: edge.style.stroke,
        edgeThickness: edge.style.strokeWidth,
        animation: false,
        arrow: false,
        label: edge.label,
        userId: "1111",
        sourceNodeId: edge.sourceNodeId,
        targetNodeId: edge.targetNodeId
      })),
    };
    return JSON.stringify(jsonData); // Use null and 2 for pretty formatting
  };

  const handleSaveNode = () => {
    // Generate JSON data for nodes
    const nodesData = generateJSONDataForNodes(nodes);
    console.log(nodesData);
    // Send the parsedNodesData to the database via an API
    
    axios
      .put(`${BASE_URL}/api/nodeMaster/bulk/`, nodesData, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      })
      .then((response) => {
        if (response.status === 201) {
          const apiUrl = `${BASE_URL}/api/nodeMaster`;
          axios
            .get(apiUrl)
            .then((response) => {
              setData(response.data);
              let x = [];
              for (let index = 0; index < response.data.length; index++) {
                const data = response.data[index];
                if (data.branchId === auth.branchId) {
                  x.push({
                    nodeId: data.nodeId,
                    id: data.id,
                    nodeType: data.nodeType,
                    MachineType: data.MachineType,
                    nodeCategory: data.nodeCategory,
                    unit1Measurable: data.unit1Measurable,
                    unit2Mandatory: data.unit2Mandatory,
                    iconId: data.iconId,
                    itemDescription: data.itemDescription,
                    nodeImage: data.nodeImage,
                    type: data.type,
                    parentNode: data.parentNode,
                    extent: data.extent,
                    data: { label: data.nodeName },
                    sourcePosition: data.sourcePosition,
                    targetPosition: data.targetPosition,
                    position: { x: data.xPosition, y: data.yPosition },
                    style: {
                      background: data.fillColor, // Set background color
                      color: data.FontColor, // Set text color
                      borderColor: data.borderColor,
                      borderStyle: data.borderStyle,
                      borderWidth: data.borderWidth,
                      fontSize: data.FontSize, // Set the font size
                      fontStyle: data.FontStyle, // Set the font style
                      width: data.width,
                      height: data.height,
                      borderRadius: data.borderRadius,
                      display: data.borderRadius ? 'flex' : '',
                      alignItems: data.nodeImage === "" ? 'center' : "",
                      justifyContent: 'center',
                    },
                  });
                }
              }
              setNodes(x);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
        console.log("Data saved successfully", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const handleEdge = () => {
    const EdgesData = generateJSONDataForEdges(edges);
    console.log(EdgesData);
    // Send the parsedNodesData to the database via an API
    axios
      .put(`${BASE_URL}/api/edgeMaster/bulk`, EdgesData, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        }
      })
      .then((response) => {
        // if(response.status === 201){
        // const apiUrl = `${BASE_URL}/api/edgeMaster}`;
        // axios.get(apiUrl)
        //   .then((response) => {
        //     const dataArray = response.data.map((data) => ({
        //       id: data.id,
        //       edgeId: data.edgeId,
        //       routeid:data.routeId,
        //       source: data.sourceId,
        //       target: data.targetId,
        //       type: data.edgeStyle,
        //       animated: data.animation,
        //       sourceNodeId:data.sourceNodeId,
        //       targetNodeId:data.targetNodeId,
        //       label: data.label,
        //       style: { strokeWidth: data.edgeThickness, stroke: data.edgeColor },
        //       markerEnd: {
        //         type: MarkerType.ArrowClosed,
        //         width: 15,
        //         height: 15,
        //         color: "#000",
        //         arrow: data.arrow,
        //       },
        //     }));
        //     setEdges(dataArray)
        //     console.log(dataArray)
        //     console.log("Incoming")
        //   })
        //     .catch((error) => {
        //       console.error("Error fetching data:", error);
        //     });
        //   }
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });

  }

  function RetriveEmployeeNodeMapping() {
    const apiUrl = `${BASE_URL}/api/employeeNodeMapping`;
    axios
      .get(apiUrl)
      .then((response) => {
        const filteredData = response.data.filter(item => String(item.branchId) === String(auth.branchId));
        console.log(response.data);
        setempAllocation(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  function RetriveDeviceMapping() {
    const apiUrl = `${BASE_URL}/api/deviceMapping`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const filteredData = response.data.filter(item => String(item.branchId) === String(auth.branchId));
        setDeviceAllocation(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function getFormattedToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Correct format: YYYY-MM-DD
  }

  const handleEmployeeSubmit = () => {
    console.log(StaffAllocation, "StaffAllocation");
    if (StaffAllocation.length > 0) {
      const drop = {
        employeeNodeMapping: StaffAllocation.map((item, index) => (
          {
            branchId: auth.branchId,
            emp: item.empId,
            node: item.nodedetails.nodeId,
            nodeType: item.nodeType,
            MachineType: "",
            isActive: true,
            userId: "1111",
            default: "",
            primary: "",
            date:getFormattedToday().split(' ').toString()
          }
        ))
      }
      console.log(drop);

      axios
        .put(`${BASE_URL}/api/employeeNodeMapping/bulk`, drop)
        .then((response) => {
          RetriveEmployeeNodeMapping()
          console.log("New row added successfully", response.data);
        })
        .catch((error) => {
          console.error("Error adding new row:", error);
        });
    }
  }

  const handleDeviceSubmit = () => {
    console.log(DeviceMapping);
    if (DeviceMapping.length > 0) {
      const drop = {
        deviceMapping: DeviceMapping.map((item, index) => (
          {
            deviceId: item.deviceId.toString(),
            branchId: auth.branchId,
            nodeId: item.nodedetails.nodeId.toString(),
            userId: "1111",
          }
        ))
      }
      console.log(drop);
      axios
        .put(`${BASE_URL}/api/deviceMapping/bulk`, drop)
        .then((response) => {
          console.log("New row added successfully", response.data);
          RetriveDeviceMapping()
          setDeviceMapping([])
        })
        .catch((error) => {
          console.error("Error adding new row:", error);
        });
    }
  }

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // Update the current time every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  // const formattedTime = '20:01:00'

  const shiftST = shiftdata.map(item => item.startTime)
  const shiftET = shiftdata.map(item => item.endTime)

  function getShiftTime() {
    if (formattedTime >= shiftST[0] && shiftET[0] >= formattedTime) {
      const firstShift = shiftdata.map(item => item.shiftNumber)
      return firstShift[0]
    }
    else {
      const SecondShift = shiftdata.map(item => item.shiftNumber)
      return SecondShift[1]
    }
  }

  const handleNodeAllocationMapping = () => {
    console.log(NodeMapping);
    const drop = {
      nodeAllocation: NodeMapping.map((item, index) => (
        {
          empId: item.empId,
          nodeId: item.nodedetails.nodeId.toString(),
          branchId: auth.branchId,
          shiftNumber: getShiftTime(),
          date: getFormattedToday(indianFormattedDate),
          userId: "1111",
        }
      ))
    };
    console.log(drop);
    axios
      .put(`${BASE_URL}/api/nodeAllocation/bulk`, drop)
      .then((response) => {
        console.log("New row added successfully", response.data);
        setNodeMapping([]);
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
        setNodeMapping([])
      });
  }

  const today = new Date();

  // Define options for date formatting
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Kolkata', // Set the timezone to Indian Standard Time (IST)
  };

  // Format the date using toLocaleDateString
  const indianFormattedDate = today.toLocaleDateString('en-IN', options);
  function getFormattedToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Correct format: YYYY-MM-DD
  }

  const handleJobAssignSubmit = () => {
    console.log(JobMapping);
    if (JobMapping.length > 0) {
      const drop = {
        jobAssign: JobMapping.map((item, index) => (
          {
            branchId: auth.branchId,
            date: getFormattedToday(indianFormattedDate),
            routeId: "1",
            userId: "1111",
            shift: "1",
            jobId: item.iconId,
            node: item.nodedetails.nodeId.toString(),
            totalProducedQty: "",
            outstandingQty: "",
            targetQty: "",
            status: "Assigned"
          }
        ))
      };
      console.log(drop);
      axios
        .put(`${BASE_URL}/api/jobassign/bulk`, drop)
        .then((response) => {
          console.log("New row added successfully", response.data);
          RetriveDeviceMapping()
          setJobMapping([])
        })
        .catch((error) => {
          console.error("Error adding new row:", error);
        });
    }
  }

  const handleEdgesandNodes = (event) => {
    event.preventDefault()
    handleEdge()
    handleSaveNode()
    handleEmployeeSubmit()
    handleDeviceSubmit()
    handleJobAssignSubmit()
    handleNodeAllocationMapping()
    toast.success(
      <span>
        <strong>Saved</strong> Successfully.
      </span>,
      {
        position: toast.POSITION.TOP_RIGHT, // Set position to top center
        // autoClose: 3000, // Optional: Set auto close time in milliseconds
        // closeButton: false, // Optional: Hide close button
        className: 'custom-toast' // Optional: Add custom CSS class
      }
    );
  }

  const onEdgeContextMenu = (event, edge) => {
    event.preventDefault(); // Prevent the default context menu
    setSelectedEdge(edge);
    setShowPopup(true);
    setNodeShowPopup(false);
  };

  const onClosePopup = () => {
    setShowPopup(false);
    setSelectedEdge(null);
  };

  const onSavePopup = (edge) => {
    const updatedEdges = edges.map((existingEdge) =>
      existingEdge.id === edge.id ? { ...existingEdge, ...edge } : existingEdge
    );
    setEdges(updatedEdges);
    // onClosePopup();
  };
  // Nodes popup -----
  const [selectedNodeId, setSelectedNodeId] = useState(false); // New state for selected node ID
  const [selectedNodeIdtoNodeGrpah, setselectedNodeIdtoNodeGrpah] = useState([]); // New state for selected node ID

  const onNodeContextMenu = (event, node) => {
    event.preventDefault(); // Prevent the default context menu
    setSelectedNodes(node);
    setNodeShowPopup(true);
    setShowPopup(false);
    setShowRoutePopup(true);
    setSelectedNodeId(node.id);
    setselectedNodeIdtoNodeGrpah(node)
    
  };


  const onNodeClick = useCallback((event, node) => {
    // Update the selected node ID when a node is clicked
    setSelectedNodeId(node.id === selectedNodeId ? null : node.id);
  }, [selectedNodeId, setSelectedNodeId]);

  // const handleWheel = useCallback((event) => {
  //   console.log("Incoming 2704")
  //   // Check if shift key is pressed to allow zooming
  //     event.preventDefault();
  //     const zoomSpeed = 0.1;
  //     const { deltaX, deltaY } = event;

  //     if (Math.abs(deltaX) > Math.abs(deltaY)) {
  //       // Horizontal scroll
  //       flowRef.current.zoom(flowRef.current.getZoom() + (deltaX > 0 ? zoomSpeed : -zoomSpeed));
  //     } else {
  //       // Vertical scroll - prevent zooming
  //       flowRef.current.zoom(flowRef.current.getZoom());
  //     }
  // },[])
  const getNodeStyle = useCallback((node) => {
    // Dynamically update the node's style based on whether it's selected
    const isSelected = node.id === selectedNodeId;
    senddatatoNodes(selectedNodeId)
    return {
      ...node.style,
      borderWidth: isSelected ? '2px' : node?.style?.borderWidth,
      borderColor: isSelected ? '' : node?.style?.borderColor,
    };
  }, [selectedNodeId, senddatatoNodes]);

  const getEdgeStyle = useCallback((edge) => {
    const isSelected = String(edge.id) === String(selectedId.edgeId)
    return {
      ...edge.style,
      // style: { strokeWidth: edge.edgeThickness, stroke: edge.edgeColor },
      stroke: isSelected ? 'red' : 'black',
      strokeWidth: isSelected ? '3px' : edge.style.edgeThickness,
    }
  }, [selectedId])

  const onCloseNodePopup = () => {
    setNodeShowPopup(false);
    setSelectedNodes(null);
    setSelectedNodeId("")
  };

  const onSaveNodePopup = (node) => {
    const updateNodes = nodes.map(existingNode =>
      existingNode.id === node.id ? { ...existingNode, ...node } : existingNode
    )
    setNodes(updateNodes)
    onCloseNodePopup();
    
  };

  // Route popup ----------
  const [showRoutePopup, setShowRoutePopup] = useState(true);

  const handleRouteClick = () => {
    // setShowRoutePopup(true);
  };

  const onCloseRoute = () => {
    setShowRoutePopup(true);
    setNodeShowPopup(false)
  };

  const onSaveRoute = () => {
    onCloseRoute();
  };

  // to set edges edges to be shown are not ---------

  const [showEdges, setShowEdges] = useState(route); // State to control edges visibility

  // Function to toggle edges visibility
  const toggleEdgesVisibility = () => {
    setShowEdges(!showEdges);
    // setRadioChecked(!radioChecked);
  };
  // const toggleEMployeeMapping = () => {
  //   setShowEdges(!showEdges)
  // }

  // Fetching Employee the data from the database

  const [Employeesdata, setEmployees] = useState()
  const [droppedData, setDroppedData] = useState();

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/employee`;
    axios.get(apiUrl)
      .then((response) => {
        const filteredData = response.data.filter(item => String(item.branchId) === String(auth.branchId));
        setEmployees(filteredData)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const reactFlowWrapper = useRef(null);
  const [PopupEmp, setEmpPopup] = useState(false)
  // const dragDropped = (event) => {
  //   event.preventDefault(); // Allows the drop
  //   let dataTransferedData = event.dataTransfer.getData('empId'); // Use the same data type as set in dragStarted
  //   let dataTransfered = event.dataTransfer.getData('empName'); // Use the same data type as set in dragStarted
  //   setDroppedData({ empId: dataTransferedData, empName: dataTransfered })
  //   // Show the popup after setting the dropped data
  //   // setEmpPopup(true)


  // }
  const [shift, setShift] = useState(""); // State for the selected Shift
  const [startDate, setStartDate] = useState(""); // State for the Start Date

  const handleShiftChange = (e) => {
    setShift(e.target.value);
  };

  // Handle Start Date input
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleNewRowSubmit = () => {
    // Prepare the data payload to send to the API
    const newDataPayload = {
      branchId: auth.branchId,
      empId: droppedData.empId,
      nodeId: '1',
      startDate: startDate, // Use the Start Date state
      expiryDate: startDate,
      isActive: true,
      shiftId: shift // Use the selected Shift state
    };

    axios.post(`${BASE_URL}/api/employeeNodeMapping`, newDataPayload)
      .then((response) => {
        console.log('New row added successfully', response.data);
        // Add the new row to the data array
        setData([...data, response.data]);
        // Clear the new row form and deactivate the popup
        setStartDate(""); // Reset Start Date state
        setShift(""); // Reset Shift state
        setEmpPopup(false); // Close the popup
      })
      .catch((error) => {
        console.error('Error adding new row:', error);
      });
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect  = (() => {
  //   switch (bottomtosidepanel){
  //     case "Edges":
  //       setValue(0); // Staff Mapping tab
  //       break;
  //     case "Staff Mapping":
  //       setValue(1); // Device Mapping tab
  //       break;
  //     case "Raw Material":
  //       setValue(2); // Device Mapping tab
  //       break;
  //     case "Device Mapping":
  //       setValue(3); // Device Mapping tab
  //       break;
  //     default:
  //     setValue(0); // Default to Nodes tab
  //   }
  // }, [bottomtosidepanel]);

  useEffect(() => {
    switch (bottomtosidepanel) {
      
      case "Staff Mapping":
        setValue(0); // Device Mapping tab
        break;
      case "Device Mapping":
        setValue(1); // Device Mapping tab
        break;
      default:
        setValue(0); // Default to Nodes tab
    }
  }, [bottomtosidepanel]);

  // Define nodeTypes and edgeTypes outside the component
  
  const nodeTypes = useMemo(
    () => ({
      selectorNode: customNodeSelect,
      iconNode: iconNode,
      graphNode: graphNode,
      MachineNode:MachinegraphNode,
      MachineIcon:MachineNode,
    }),
    []
  );

  // useEffect(() => {
    
  // },[])


  const [Employeedata, setEmployeedata] = useState([]);
  const [Oadetails, setOadetails] = useState([]);
  const [ItemMaster, setItemMaster] = useState([]);
  const [Edgestabledata, setEdgestabledata] = useState([]);
  const [empAllocation, setempAllocation] = useState([]);
  const [NodeMapping, setNodeMapping] = useState([]);
  const [nodeAllocation, setNodeAllocation] = useState([]);
  const [deviceAllocation, setDeviceAllocation] = useState([]);
  const [jobAssignmentdata, setjobAssigndata] = useState([]);
  const [Activitydata, setActivitydata] = useState([]);
  const [batchdata, setbatchdata] = useState([]);
  const [batchMasterdata, setbatchMasterdata] = useState([]);
  const [Nodemasterdata, setNodemasterdata] = useState([]);


  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/employeeNodeMapping`;
    axios
      .get(apiUrl)
      .then((response) => {
        const filteredData = response.data.filter(item => String(item.branchId) === String(auth.branchId));
        setempAllocation(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const showgetEmployees = async (key) => {
    setOpenLoader(true)
    const responsedata = await getEmployees();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setEmployeedata(filteredData, key);
    setOpenLoader(false)
  };
  
  const showshiftdata = async (key) => {
    const responsedata = await getShifts();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setShiftdata(filteredData, key);
  };
  const showOA_details = async (key) => {
    const responsedata = await getOADetails();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setOadetails(filteredData, key);
  };
  const showItemmaster = async (key) => {
    setOpenLoader(true)
    const responsedata = await getItemmaster();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setItemMaster(filteredData, key);
    setOpenLoader(false)
  };
  const showDeviceMapping = async (key) => {
    const responsedata = await getDeviceMapping();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setDeviceAllocation(filteredData, key);
  };
  const showJobAssignMapping = async (key) => {
    const responsedata = await getJobAssign();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setjobAssigndata(filteredData, key);
  };

  const showNodeAllocation = async (key) => {
    const responsedata = await getNodeAllocation();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setNodeAllocation(filteredData, key);
  };
  const showbatchdata = async (key) => {
    const responsedata = await getbatches();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setbatchdata(filteredData, key);
  };
  const showbatchMasterdata = async (key) => {
    const responsedata = await getbatch_master();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setbatchMasterdata(filteredData, key);
  };
  const showNodemasterdata = async (key) => {
    const responsedata = await getNodeMaster();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setNodemasterdata(filteredData, key);
  };
  const showEdgedata = async (key) => {
    const responsedata = await getEdges();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setEdgestabledata(filteredData, key);
  };
  const showActivitydata = async (key) => {
    const responsedata = await getActivities();
    const filteredData = responsedata.filter((dbitem) => String(dbitem.branchId) === String(auth.branchId));
    setActivitydata(filteredData, key);
  };

  useEffect(() => {
    showgetEmployees();
    showOA_details();
    showItemmaster();
    showDeviceMapping();
    showJobAssignMapping();
    showshiftdata();
    showNodeAllocation();
    showbatchdata();
    showNodemasterdata();
    showEdgedata();
    showActivitydata();
    showbatchMasterdata()
  }, []);

  const [expanded, setExpanded] = useState(false);
  const [isExpandedFull, setIsExpandedFull] = React.useState(false)

  const handleExpandToggle = () => {
    setIsExpandedFull(!isExpandedFull);
    setExpanded(!expanded);
    setSize(384)
  };
  console.log(isExpandedFull,"rightslider")
  console.log(expanded,"rightslider")
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showAlert, setShowAlert] = useState(false)
  const [filteredEmps, setFilteredEmps] = useState([])

  const deleteNode = (nodeId) => {
    axios
      .delete(`${BASE_URL}/api/nodeMaster/${nodeId}`)
      .then((response) => {
        const apiUrl = `${BASE_URL}/api/nodeMaster`;

        axios
          .get(apiUrl)
          .then((response) => {
            const filteredData = response.data.filter(item => String(item.branchId) === String(auth.branchId));
            setData(filteredData);
            let x = [];
            for (let index = 0; index < response.data.length; index++) {
              const data = response.data[index];
              if (data.branchId === auth.branchId) {
              x.push({
                nodeId: data.nodeId,
                id: data.id,
                nodeType: data.nodeType,
                MachineType: data.MachineType,
                nodeCategory: data.nodeCategory,
                unit1Measurable: data.unit1Measurable,
                unit2Mandatory: data.unit2Mandatory,
                iconId: data.iconId,
                itemDescription: data.itemDescription,
                nodeImage: data.nodeImage,
                type: data.type,
                parentNode: data.parentNode,
                extent: data.extent,
                data: { label: data.nodeName },
                sourcePosition: data.sourcePosition,
                targetPosition: data.targetPosition,
                position: { x: data.xPosition, y: data.yPosition },
                style: {
                  background: data.fillColor, // Set background color
                  color: data.FontColor, // Set text color
                  borderColor: data.borderColor,
                  borderStyle: data.borderStyle,
                  borderWidth: data.borderWidth,
                  fontSize: data.FontSize, // Set the font size
                  fontStyle: data.FontStyle, // Set the font style
                  width: data.width,
                  height: data.height,
                  borderRadius: data.borderRadius,
                  display: data.borderRadius ? 'flex' : '',
                  alignItems: 'center',
                  fontColor: data.FontColor
                },
              });
            }
            }
            setNodes(x);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting node:", error);
      });
  }

  function getEmpNameById(empId) {
    const emp = Employeedata.find((item) => item.empId == empId);
    return emp ? emp.employeeName : 'Node Not Found';
  }

  const onIconDoubbleClick = (e, data,) => {
    console.log(data);
    const employee = Employeedata.find(a => a.empId == data.id);
    setFilteredEmps((emps) => ([...emps, { ...employee }]));
  }
  const onNodeDoubleClick = useCallback((event, node) => {
    console.log(node,"ondoubleclick");
    console.log(node.iconId,"ondoubleclick");
    const findEmp = empAllocation.filter((item) => item.emp.empId == node.iconId).map((item) => (item.empnodemapId))
    console.log(findEmp,"ondoubleclick");
    const finddevice = deviceAllocation.filter((item) => item.deviceId == node.iconId).map((item) => (item.Id))
    const findJob = jobAssignmentdata.filter((item) => item.jobId == node.iconId).map((item) => (item.id))
    const findNodeAllocation = nodeAllocation.filter((item) => item.empId == node.iconId).map((item) => (item.NodeAllocationId))
    console.log(findNodeAllocation);
    if (findEmp) {
      axios
        .delete(`${BASE_URL}/api/employeeNodeMapping/${findEmp}`)
        .then((response) => {
          if (node.nodeType === "employee") {
            deleteNode(node.nodeId)
          }
          console.log("employeeNodeMapping deleted successfully", response.data);
        })
        .catch((error) => {
          console.error("Error deleting node:", error);
        });
    }
    if (finddevice) {
      axios
        .delete(`${BASE_URL}/api/deviceMapping/${finddevice}`)
        .then((response) => {
          if (node.nodeType === "device") {
            deleteNode(node.nodeId)
          }
          console.log("DeviceMapping deleted successfully", response.data);
        })
        .catch((error) => {
          console.error("Error deleting node:", error);
        });
    }
    if (findJob) {
      axios
        .delete(`${BASE_URL}/api/jobassign/${findJob}`)
        .then((response) => {
          if (node.nodeType === "job") {
            deleteNode(node.nodeId)
          }
          console.log("DeviceMapping deleted successfully", response.data);
        })
        .catch((error) => {
          console.error("Error deleting node:", error);
        });
    }
    if (findNodeAllocation) {
      axios
        .delete(`${BASE_URL}/api/nodeAllocation/${findNodeAllocation}`)
        .then((response) => {
          if (node.nodeType === "employee") {
            deleteNode(node.nodeId)
          }
          console.log("DeviceMapping deleted successfully", response.data);
        })
        .catch((error) => {
          console.error("Error deleting node:", error);
        });
    }
  }, [deviceAllocation, empAllocation, jobAssignmentdata, nodeAllocation]);

  function getJobNameById(jobId) {
    const job = Oadetails.find((item) => item.jobId === jobId);
    return job ? job.IT_NAME : "Node Not Found";
  }

  const onDrop = (event) => {
    // event.preventDefault();
    // const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    // const empData = JSON.parse(event.dataTransfer.getData("application/reactflow") || "{}");
    // console.log(empData, "1804");
    // console.log(reactFlowBounds, "1804");
    // const { x, y } = reactFlowInstance.project({
    //   x: event.clientX - reactFlowBounds.left,
    //   y: event.clientY - reactFlowBounds.top,
    // });
    // const minX = -10, minY = -20, maxX = NODE_WIDTH - 20, maxY = 15;
    // const parentNode = nodes.find(({ position: { x: ox, y: oy } }) => x >= ox + minX && x <= ox + maxX && y >= oy + minY && y <= oy + maxY)

    // event.preventDefault();
    // const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    // const empData = JSON.parse(event.dataTransfer.getData("application/reactflow") || "{}");
    // console.log(empData, "1804");
    // console.log(reactFlowBounds, "1804");
    // const { x, y } = reactFlowInstance.project({
    //   x: event.clientX - reactFlowBounds.left,
    //   y: event.clientY - reactFlowBounds.top,
    // });
    // const parentNode = nodes.find(({ position }) => {
    //   const { x: parentX, y: parentY } = position;
    //   return x >= parentX && x <= parentX + NODE_WIDTH && y >= parentY && y <= parentY + NODE_HEIGHT;
    // });

    // if (parentNode) {
    //   // Calculate the coordinates relative to the parent node
    //   const { x: parentX, y: parentY } = parentNode.position;

    //   // Calculate the drop location within the parent node based on the mouse pointer's position relative to the parent node
    //   const dropX = x - parentX;
    //   const dropY = y - parentY;

    //   // Now you can use the dropX and dropY values to position the dropped item within the parent node

    //   console.log("Item dropped within parent node at coordinates:", dropX, dropY);
    // } else {
    //   console.log("No parent node found.");
    // }

    event.preventDefault();
  const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  const empData = JSON.parse(event.dataTransfer.getData("application/reactflow") || "{}");
  console.log(empData, "1804");
  console.log(reactFlowBounds, "1804");
  const { x, y } = reactFlowInstance.project({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  });
  const parentNode = nodes.find(({ position }) => {
    const { x: parentX, y: parentY } = position;
    return x >= parentX && x <= parentX + NODE_WIDTH + 100 && y >= parentY && y <= parentY + NODE_HEIGHT;
  });

if (parentNode) {
  // Calculate the coordinates relative to the parent node
  const { x: parentX, y: parentY } = parentNode.position;

  // Calculate the drop location within the parent node based on the mouse pointer's position relative to the parent node
  const dropX = x - parentX;
  const dropY = y - parentY;

  // Now you can use the dropX and dropY values to position the dropped item within the parent node
  console.log("Item dropped within parent node at coordinates:", dropX, dropY);
} else {
  console.log("No parent node found.");
}


    if (parentNode) {
      console.log(parentNode);
      const assignedUser = nodes.find(a => a.parenId === parentNode.id);
      // const jobAssigned = Oadetails.find()X & Y positions
      // console.log(assignedUser?.parenId,"assignedUser");
      // console.log(parentNode.id,"assignedUser");
      // if(assignedUser) {
      //   setShowAlert({empId:empData.empId, userName:empData.userName, parentId: parentNode.id, parentPos:{...parentNode.position}, 
      //     oldUserId:assignedUser.id, oldUserName:assignedUser.data.label, machineName:parentNode.data.label.split("(")[0]});
      // }
      // else {
      if (empData.empId && !empData.attendanceId) {
        const empNode = {
          parenId: parentNode.id,
          empId: empData.empId,
          nodedetails: parentNode,
          id: uuidv4(),  //empData.empId + "",
          position: { x: 0, y: -40 },
          nodeCategory: "",
          unit1Measurable: "",
          parentNode: parentNode.id,
          extent: "parent",
          unit2Mandatory: "",
          itemDescription: "",
          nodeImage: "",
          nodeType: "employee",
          MachineType: "",
          type: "iconNode",
          sourcePosition: "right",
          targetPosition: "left",
          iconId: empData.empId.toString(),
          style: {
            zIndex: 1001,
            width: "20",
            height: "20",
            background: "",
            color: "",
            borderColor: "",
            borderStyle: "",
            borderWidth: "",
            fontSize: "",
            fontStyle: "",
            borderRadius: "",
            display: "",
            alignItems: "",
            fontColor: ""
          },
          data: { label: empData?.userName, onIconDoubbleClick: onIconDoubbleClick },
        };
        console.log(empNode);

        setFilteredEmps((emps) => emps.filter(a => a.empId !== empData.empId));
        setNodes((es) => es.concat(empNode));
        // const node_EMployee = 
        setStaffAllocation([...StaffAllocation, empNode]);
      }
      // }
      if (empData.attendanceId && empData.empId) {
        const empNodeMap = {
          parenId: parentNode.id,
          empId: empData.empId,
          nodedetails: parentNode,
          id: uuidv4(),  //empData.empId + "",
          position: { x: 110, y: 20 },
          nodeCategory: "",
          unit1Measurable: "",
          parentNode: parentNode.id,
          extent: "parent",
          unit2Mandatory: "",
          itemDescription: "",
          nodeImage: "",
          nodeType: "employee",
          MachineType: "",
          type: "iconNode",
          sourcePosition: "right",
          targetPosition: "left",
          iconId: empData.empId.toString(),
          style: {
            zIndex: 1001,
            width: "20",
            height: "20",
            background: "",
            color: "",
            borderColor: "",
            borderStyle: "",
            borderWidth: "",
            fontSize: "",
            fontStyle: "",
            borderRadius: "",
            display: "",
            alignItems: "",
            fontColor: ""
          },
          data: { label: getEmpNameById(empData.empId), onIconDoubbleClick: onIconDoubbleClick },
        };
        console.log(empNodeMap, "********");
        setFilteredEmps((emps) => emps.filter(a => a.empId !== empData.empId));
        setNodes((es) => es.concat(empNodeMap));
        // const node_EMployee = 
        setNodeMapping([...NodeMapping, empNodeMap]);
      }
      if (empData.jobId) {
        console.log(empData);
        const jobNode = {
          parenId: parentNode.id,
          id: uuidv4(),
          position: { x: 75, y: 20 },
          type: "iconNode",
          parentNode: parentNode.id,
          nodedetails: parentNode,
          extent: "parent",
          sourcePosition: "right",
          targetPosition: "left",
          nodeCategory: "",
          unit1Measurable: "",
          unit2Mandatory: "",
          itemDescription: "",
          nodeImage: "",
          nodeType: "job",
          MachineType: "",
          height: 20,
          width: 20,
          iconId: empData.jobId.toString(),
          style: {
            zIndex: 1001,
            width: "20",
            height: "20",
            background: "",
            color: "",
            borderColor: "",
            borderStyle: "",
            borderWidth: "",
            fontSize: "",
            fontStyle: "",
            borderRadius: "",
            display: "",
            alignItems: "",
            fontColor: ""
          },
          data: { label: getJobNameById(empData.jobId), onIconDoubbleClick: onIconDoubbleClick },
        };
        console.log(jobNode, "JobDetails");
        // jobNode.position.x = parentNode.position.x+NODE_WIDTH+22;
        // jobNode.position.y = parentNode.position.y + NODE_HEIGHT-50;
        setOadetails((jobs) => jobs.filter(a => a.jobId !== empData.jobId));
        setNodes((es) => es.concat(jobNode));
        setJobMapping([...JobMapping, jobNode])
      }
      if (empData.deviceId) {
        console.log(empData);
        const deviceNode = {
          parenId: parentNode.id,
          id: uuidv4(), //empData.deviceName + "",
          deviceId: empData.deviceId,
          nodedetails: parentNode,
          nodeCategory: "",
          unit1Measurable: "",
          unit2Mandatory: "",
          itemDescription: "",
          nodeImage: "",
          nodeType: "device",
          MachineType: "",
          position: { x: 50, y: -40 },
          type: "iconNode",
          parentNode: parentNode.id,
          extent: "parent",
          sourcePosition: "right",
          targetPosition: "left",
          iconId: empData.deviceId.toString(),
          style: {
            zIndex: 1001,
            width: "20",
            height: "20",
            background: "",
            color: "",
            borderColor: "",
            borderStyle: "",
            borderWidth: "",
            fontSize: "",
            fontStyle: "",
            borderRadius: "",
            display: "",
            alignItems: "",
            fontColor: ""
          },
          data: { label: empData.deviceName, onIconDoubbleClick: onIconDoubbleClick },
        };
        console.log(deviceNode, "deviceNode");
        // deviceNode.position.x = parentNode.position.x / 2 + NODE_WIDTH /2
        // deviceNode.position.y = parentNode.position.y / 2 + NODE_HEIGHT /2 ;
        setOadetails((jobs) => jobs.filter(a => a.jobId !== empData.jobId));
        setNodes((es) => es.concat(deviceNode));
        // setDeviceMapping(deviceNode);
        setDeviceMapping([...DeviceMapping, deviceNode]);
        setDevicenode(deviceNode);
      }
      // if(empData.IT_CODE){
      //   console.log(empData);
      //   const deviceNode = {
      //     parenId:parentNode.id,
      //     id: empData.IT_CODE + "",
      //     position: {},
      //     type:"iconNode",
      //     sourcePosition: "right",
      //     targetPosition: "left",
      //     height:20,
      //     width:20,
      //     style:{
      //       zIndex:1001,
      //     },
      //     data: { label: empData.IT_NAME, onIconDoubbleClick: onIconDoubbleClick },
      //   };
      //   console.log(deviceNode,"JobDetails");
      //   console.log(nodes, "JobDetails");
      //   deviceNode.position.x = parentNode.position.x+NODE_WIDTH-110;
      //   deviceNode.position.y = parentNode.position.y + NODE_HEIGHT-10;
      //   setOadetails((jobs) => jobs.filter(a => a.jobId !== empData.jobId));
      //   setNodes((es) => es.concat(deviceNode));
      // }
    }
  };
  const onDragOver = (event) => {
    console.log("Start dragged over");
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const closeConfirmModal = (replaceEmployee) => {
    setShowAlert(null);
    if (replaceEmployee) {
      const oldEmp = Employeedata.find(a => showAlert.oldUserId == a.empId);
      setEmployeedata((emps) => emps.map(emp => {
        if (emp.empId === showAlert.empId) return { ...oldEmp }
        return emp;
      }))
      setNodes((nodes) => nodes.map((node) => {
        if (node.parentId == showAlert.parentId) {
          return {
            ...node,
            id: showAlert.empId + "",
            data: { label: showAlert.userName, onIconDoubbleClick: onIconDoubbleClick },
          }
        }
        return node
      }))
    }
  }

  const [active, setActive] = useState([]);
  const HandlebottomSlide = (item) => {
    setActive(item)
    onClick(item)
  }

  // const [sendtoPlanningtab,setSendtoPlanningtab] = useState([])
  const HandlesendtoPlanningtab = (item) => {
    setSendtoPlanningtab(item)
  }

  const HandleJobfromOperations = (job, nodeId) => {
    console.log(job, nodeId);
    setJobfromOperations(job, nodeId);
  }
  const [jobIdtopriority, setjobIdtopriority] = useState([])

  const HandleMachineGraph = (jobId) => {
    const getnodeIds = jobAssignmentdata.filter(item => item.jobId == jobId).map((item) => item.node.nodeId);
    const PlannedJobs = jobAssignmentdata.filter(item => item.jobId == jobId).filter((item)=>item.status === "Assigned").map((item) => (item))
    const completedJobs = Activitydata.filter(item => item.jobId == jobId).map((item) => (item))
    const combinedJobs = completedJobs.concat(PlannedJobs);

    const uniqueNodeIds = [...new Set(getnodeIds.map(node => node))];
    
       const correspondingIds = [];

      // Filter Nodemasterdata for unique nodeIds and get corresponding IDs
      uniqueNodeIds.forEach(nodeId => {
        const node = Nodemasterdata.find(item => item.nodeId == nodeId);
        if (node) {
          correspondingIds.push(node);
        }
      });
      // Filter out graph type nodes from the nodes state
      setNodes((existingNodes) => {
        // Filter out any graph-type nodes
        const filteredNodes = existingNodes.filter((node) => node.nodeType !== "MachineNode");
        // Concatenate the new MachineNode with the filtered nodes
        return filteredNodes;
      });
     correspondingIds.map((node) => {
     const MachineNode = {
      parenId: "",
      id: uuidv4(),
      position: {
              x:node.xPosition + 30,
              y:node.yPosition - 330
            },
      nodeCategory: "",
      unit1Measurable: "",
      parentNode: "",
      extent: "",
      unit2Mandatory: "",
      itemDescription: "",
      nodeImage: "",
      nodeType: "MachineNode",
      MachineType: "",
      type: "MachineNode",
      sourcePosition: "right",
      targetPosition: "left",
      iconId: "",
      style: {
        zIndex: 1001,
        width: "100",
        height: "100",
        background: "",
        color: "",
        borderColor: "",
        borderStyle: "",
        borderWidth: "",
        fontSize: "",
        fontStyle: "",
        borderRadius: "",
        display: "",
        alignItems: "",
        fontColor: "",
      },
      data: { data:combinedJobs,nodeId:node.nodeId, onIconDoubbleClick: onIconDoubbleClick },
    };
    setNodes((es) => es.concat(MachineNode));
  })
  }
  const HandleAllMachineGraph = (multipleJobs) => {
    console.log(multipleJobs,"160444")
    const getnodeIdss = jobAssignmentdata.filter(item => item.jobId == multipleJobs).map((item) => item.node.nodeId);
    console.log(getnodeIdss,"160444")
    let getnodeIds = []
    let combinedJobs = []
    multipleJobs.forEach((item1)=>{
      console.log(item1,"150444")
      getnodeIds = jobAssignmentdata.filter(item => item.jobId == multipleJobs).map((item) => item.node.nodeId);
      const PlannedJobs = jobAssignmentdata.filter(item => item.jobId == multipleJobs).filter((item)=>item.status === "Assigned").map((item) => (item))
      const completedJobs = Activitydata.filter(item => item.jobId == multipleJobs).map((item) => (item))
      combinedJobs = completedJobs.concat(PlannedJobs);
    })
    console.log(getnodeIds,"16044")
    const uniqueNodeIds = [...new Set(getnodeIds.map(node => node))];
    
    
       const correspondingIds = [];

      // Filter Nodemasterdata for unique nodeIds and get corresponding IDs
      uniqueNodeIds.forEach(nodeId => {
        const node = Nodemasterdata.find(item => item.nodeId == nodeId);
        if (node) {
          correspondingIds.push(node);
        }
      });
      // Filter out graph type nodes from the nodes state
      setNodes((existingNodes) => {
        // Filter out any graph-type nodes
        const filteredNodes = existingNodes.filter((node) => node.nodeType !== "MachineNode");
        // Concatenate the new MachineNode with the filtered nodes
        return filteredNodes;
      });
      console.log(correspondingIds,"150444")
     correspondingIds.map((node) => {
     const MachineNode = {
      parenId: "",
      id: uuidv4(),
      position: {
              x:node.xPosition + 30,
              y:node.yPosition - 330
            },
      nodeCategory: "",
      unit1Measurable: "",
      parentNode: "",
      extent: "",
      unit2Mandatory: "",
      itemDescription: "",
      nodeImage: "",
      nodeType: "MachineNode",
      MachineType: "",
      type: "MachineNode",
      sourcePosition: "right",
      targetPosition: "left",
      iconId: "",
      style: {
        zIndex: 1001,
        width: "100",
        height: "100",
        background: "",
        color: "",
        borderColor: "",
        borderStyle: "",
        borderWidth: "",
        fontSize: "",
        fontStyle: "",
        borderRadius: "",
        display: "",
        alignItems: "",
        fontColor: "",
      },
      data: { data:combinedJobs,nodeId:node.nodeId, onIconDoubbleClick: onIconDoubbleClick },
    };
    setNodes((es) => es.concat(MachineNode));
  })
  }
  

  // useEffect(() => {
    
  // },[])

  useEffect(() => {
    if (selectedMenuItem === "Priority Job") {
      // Filter batchdata for all material nodes
      const filteredNodes = batchdata.filter(node => node.MaterialId);
  
      // Get unique nodeIds
      const uniqueNodeIds = [...new Set(filteredNodes.map(node => node.MaterialId))];
      const correspondingIds = [];
  
      setNodes((existingNodes) => {
        const filteredNodes = existingNodes.filter((node) => node.nodeType !== "GraphNode");
        return filteredNodes;
      });
  
      uniqueNodeIds.forEach(nodeId => {
        const node = Nodemasterdata.find(item => item.nodeId == nodeId &&
          item.nodeCategory !== "Waste");
        if (node) {
          correspondingIds.push(node);
        }
      });
      console.log(correspondingIds,"today")
      const empNodeData = correspondingIds.map((node) => {
        const producedQty = batchMasterdata.filter((item)=>item.nodeId == node.nodeId).map((item)=>item.producedQty1)
        let a = 0
        producedQty.forEach((item) => {
          a += parseInt(item)
        })
        const target = batchMasterdata.filter((item) => item.nodeId == node.nodeId).map((item) => item.targetQty);
        let b = 0
        target.forEach((item)=>{
          b += parseInt(item)
        })

        const outstanding = batchMasterdata.filter((item) => item.nodeId == node.nodeId).map((item) => item.outstandingQty);
        let c = 0
        outstanding.forEach((item)=>{
          c += parseInt(item)
        })
        const empNodeMap = {
          parenId: "",
          id: uuidv4(),
          position: {
            x: node.xPosition + 5,
            y: node.yPosition - 350
          },
          nodeCategory: "",
          unit1Measurable: "",
          parentNode: "",
          extent: "",
          unit2Mandatory: "",
          itemDescription: "",
          nodeImage: "",
          nodeType: "GraphNode",
          MachineType: "",
          type: "graphNode",
          sourcePosition: "right",
          targetPosition: "left",
          iconId: node.nodeId,
          style: {
            zIndex: 1001,
            width: "100",
            height: "100",
            background: "",
            color: "",
            borderColor: "",
            borderStyle: "",
            borderWidth: "",
            fontSize: "",
            fontStyle: "",
            borderRadius: "",
            display: "",
            alignItems: "",
            fontColor: "",
          },
          data: { label: "", node: node.nodeId,allnodes:correspondingIds,producedQty:a,targetQty:b,outQty:c },
        };
        return empNodeMap;
      });
  
      setNodes((es) => es.concat(empNodeData));
      setdataToBottomJobPriorPanel(empNodeData)
    }
    if (selectedMenuItem === "Priority Job") {
      console.log(selectedMenuItem,"today")
      const getnodeIds = jobAssignmentdata.map((item) => item.node.nodeId);
      const PlannedJobs = jobAssignmentdata.filter((item)=>item.status === "Assigned").map((item) => (item))
      const completedJobs = Activitydata.map((item) => (item))
      const combinedJobs = completedJobs.concat(PlannedJobs);
  
      const uniqueNodeIds = [...new Set(getnodeIds.map(node => node))];
      
         const correspondingIds = [];
  
        // Filter Nodemasterdata for unique nodeIds and get corresponding IDs
        uniqueNodeIds.forEach(nodeId => {
          const node = Nodemasterdata.find(item => item.nodeId == nodeId);
          if (node) {
            correspondingIds.push(node);
          }
        });
        // Filter out graph type nodes from the nodes state
        setNodes((existingNodes) => {
          // Filter out any graph-type nodes
          const filteredNodes = existingNodes.filter((node) => node.nodeType !== "MachineNode");
          // Concatenate the new MachineNode with the filtered nodes
          return filteredNodes;
        });
       correspondingIds.map((node) => {
       const MachineNode = {
        parenId: "",
        id: uuidv4(),
        position: {
                x:node.xPosition + 30,
                y:node.yPosition - 330
              },
        nodeCategory: "",
        unit1Measurable: "",
        parentNode: "",
        extent: "",
        unit2Mandatory: "",
        itemDescription: "",
        nodeImage: "",
        nodeType: "MachineNode",
        MachineType: "",
        type: "MachineNode",
        sourcePosition: "right",
        targetPosition: "left",
        iconId: "",
        style: {
          zIndex: 1001,
          width: "100",
          height: "100",
          background: "",
          color: "",
          borderColor: "",
          borderStyle: "",
          borderWidth: "",
          fontSize: "",
          fontStyle: "",
          borderRadius: "",
          display: "",
          alignItems: "",
          fontColor: "",
        },
        data: { data:combinedJobs,nodeId:node.nodeId, onIconDoubbleClick: onIconDoubbleClick },
      };
      setNodes((es) => es.concat(MachineNode));
    })
    }
  }, [Nodemasterdata, batchdata, selectedMenuItem,Activitydata, Nodemasterdata, jobAssignmentdata]);
  // }, [batchdata,Nodemasterdata]);
  
  
  const HandleMaterialGraph = (jobId) => {
  console.log(jobId,"multipleJobs")
  if(jobId.length > 0){
    // Filter batchdata for jobId
    const filteredNodes = batchdata.filter(node => node.jobId == jobId);
    // Get unique nodeIds
    const uniqueNodeIds = [...new Set(filteredNodes.map(node => node.MaterialId))];

    // Initialize array to store corresponding IDs from Nodemasterdata
    const correspondingIds = [];

    setNodes((existingNodes) => {
      // Filter out any graph-type nodes
      const filteredNodes = existingNodes.filter((node) => node.nodeType !== "GraphNode");
      return filteredNodes;
    });
    console.log(uniqueNodeIds, 'checking')
    // Filter Nodemasterdata for unique nodeIds and get corresponding IDs
    uniqueNodeIds.forEach(nodeId => {
      const node = Nodemasterdata.find(item => item.nodeId == nodeId 
                                              && item.nodeCategory !== "Waste"
                                              // && item.nodeCategory !== "Raw Material"
                                              )
      if (node) {
        correspondingIds.push(node);
      }
    });
    // Do something with correspondingIds
    console.log(correspondingIds, 'today')
    const empNodeData = correspondingIds.map((node) => {
      const empNodeMap = {
        parenId: "",
        id: uuidv4(),
        position: {
          x: node.xPosition + 5,
          y: node.yPosition - 350
        },
        nodeCategory: "",
        unit1Measurable: "",
        parentNode: "",
        extent: "",
        unit2Mandatory: "",
        itemDescription: "",
        nodeImage: "",
        nodeType: "GraphNode",
        MachineType: "",
        type: "graphNode",
        sourcePosition: "right",
        targetPosition: "left",
        iconId: node.nodeId,
        style: {
          zIndex: 1001,
          width: "100",
          height: "100",
          background: "",
          color: "",
          borderColor: "",
          borderStyle: "",
          borderWidth: "",
          fontSize: "",
          fontStyle: "",
          borderRadius: "",
          display: "",
          alignItems: "",
          fontColor: "",
        },
        data: { label: jobId, node: node.nodeId, onIconDoubbleClick: onIconDoubbleClick },
      };
      return empNodeMap;
    });
    setNodes((es) => es.concat(empNodeData));
    setdataToBottomJobPriorPanel(empNodeData, jobId)
  }
  }

  const HandleAllMaterialGraph = (multipleJobs) => {
    if(multipleJobs.length > 0){
      // Filter batchdata for jobId
      const filteredNodes = [];

      multipleJobs.forEach(jobId => {
        const filtered = batchdata.filter(node => node.jobId === jobId);
        filteredNodes.push(...filtered);
      });
      // Get unique nodeIds
      const uniqueNodeIds = [...new Set(filteredNodes.map(node => node.MaterialId))];
  
      // Initialize array to store corresponding IDs from Nodemasterdata
      const correspondingIds = [];
  
      setNodes((existingNodes) => {
        // Filter out any graph-type nodes
        const filteredNodes = existingNodes.filter((node) => node.nodeType !== "GraphNode");
        return filteredNodes;
      });
      console.log(uniqueNodeIds, 'checking')
      // Filter Nodemasterdata for unique nodeIds and get corresponding IDs
      uniqueNodeIds.forEach(nodeId => {
        const node = Nodemasterdata.find(item => item.nodeId == nodeId 
                                                && item.nodeCategory !== "Waste"
                                                // && item.nodeCategory !== "Raw Material"
                                                )
        if (node) {
          correspondingIds.push(node);
        }
      });
      // Do something with correspondingIds
      console.log(correspondingIds, '1504')
      const empNodeData = correspondingIds.map((node) => {
        const producedQty = batchMasterdata.filter((item)=>item.nodeId == node.nodeId).map((item)=>item.producedQty1)
        let a = 0
        multipleJobs.forEach((item1)=>{
          const filteredproducedQty = batchMasterdata.filter((item)=>item.producedJobId == item1 && item.nodeId == node.nodeId).map((item)=>item.producedQty1) 
          filteredproducedQty.forEach((item) => {
            a += parseInt(item)
          })
        })
        const target = batchMasterdata.filter((item) => item.nodeId == node.nodeId).map((item) => item.targetQty);
        let b = 0
        target.forEach((item)=>{
          b += parseInt(item)
        })

        const outstanding = batchMasterdata.filter((item) => item.nodeId == node.nodeId).map((item) => item.outstandingQty);
        let c = 0
        outstanding.forEach((item)=>{
          c += parseInt(item)
        })
        const empNodeMap = {
          parenId: "",  
          id: uuidv4(),
          position: {
            x: node.xPosition + 5,
            y: node.yPosition - 350
          },
          nodeCategory: "",
          unit1Measurable: "",
          parentNode: "",
          extent: "",
          unit2Mandatory: "",
          itemDescription: "",
          nodeImage: "",
          nodeType: "GraphNode",
          MachineType: "",
          type: "graphNode",
          sourcePosition: "right",
          targetPosition: "left",
          iconId: node.nodeId,
          style: {
            zIndex: 1001,
            width: "100",
            height: "100",
            background: "",
            color: "",
            borderColor: "",
            borderStyle: "",
            borderWidth: "",
            fontSize: "",
            fontStyle: "",
            borderRadius: "",
            display: "",
            alignItems: "",
            fontColor: "",
          },
          data: { label: multipleJobs, node: node.nodeId,producedQty:a,targetQty:b,outQty:c },
        };
        return empNodeMap;
      });
      setNodes((es) => es.concat(empNodeData));
      setdataToBottomJobPriorPanel(empNodeData, multipleJobs)
    }
  }

  const HandleCreateNode = (jobId) => {
    HandleMaterialGraph(jobId);
    HandleMachineGraph(jobId)
};

  const HandleCreateNodeMultipleNodes = (multipleJobs) => {
    HandleAllMaterialGraph(multipleJobs);
    HandleAllMachineGraph(multipleJobs)
  }

  const HandleJobIdtoJobPriority = (jobId) => {
    HandleCreateNode(jobId)
    setshowGraph(true)
    setjobIdtopriority(jobId)
    setjobIdtoJobpriority(jobId)
    HandleshowEdgesbasedonJob(jobId)
  }

  const HandleMultipleJobs = (multipleJobs) => {
    setMultiplejobIdtoJobpriority(multipleJobs)
    HandleCreateNodeMultipleNodes(multipleJobs)
  }

  const EmptyEdges = () => {
    if (edges.length > 0) {
      setEdges([]);
    }
  }

  const HandleshowEdgesbasedonJob = (jobId) => {
    const getIT_Code = Oadetails.filter((item) => item.jobId == jobId)
                                .map((item) => item.IT_CODE) 
    
    const getRoute = ItemMaster.filter((item)=> item.IT_CODE == getIT_Code)
                                .map((item) => item.Route)
    const getEdges = Edgestabledata.filter((item)=> item.routeId == getRoute)
                                .map((item) => item)
        
    const dataArray = getEdges.map((data) => ({
      id: data?.id,
      edgeId: data?.edgeId,
      routeid:data?.routeId,
      source: data?.sourceId,
      target: data?.targetId,
      type: data?.edgeStyle,
      animated: data?.animation,
      sourceNodeId:data?.sourceNodeId,
      targetNodeId:data?.targetNodeId,
      label: data?.label,
      style: { strokeWidth: data?.edgeThickness, stroke: data?.edgeColor },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 15,
        height: 15,
        color: "#000",
        arrow: data?.arrow,
      },
    }));
    setEdges(dataArray)
    // if(getEdges){
    //   setEdges(getEdges)
    // }
  }

  // console.log(sendtoRoutess,"sendtoRoutess")
  // console.log(sendtoRoutes,"sendtoRoutess")
  // useEffect(() => {
  //   if (sendtoRoutes) {
  //     setNodes([...nodes, sendtoRoutes]);
  //     // console.log(nodes)
  //     // console.log(sendtoRoutes)
  //   }
  // }, [nodes,sendtoRoutes]);

  useEffect(() => {
    if (sendtoRoutes) {
    //   console.log("Incoming")
      // setNodes([...nodes, sendtoRoutes]);
      setNodes((nds) => nds.concat(sendtoRoutes));
    //   console.log(nodes)
    
    }
  }, [sendtoRoutes]);
  

  // useEffect(() => {
  //   if (sendtoRoutes) {
  //     const { x, y } = sendtoRoutes;
  //     // Check if x and y are defined
  //     if (x !== undefined && y !== undefined) {
  //       // Add sendtoRoutes to nodes if x and y are defined
  //       setNodes((nds) => nds.concat(sendtoRoutes));
  //     }
  //   }
  // }, [sendtoRoutes, setNodes]); // Only run the effect when sendtoRoutes changes
  // Define your second export function

  // const handleLinkClickName = (item) => {
  //   setActive(item);
  //   // handleLinkClick(item)
  // }
  const [size,setSize] = useState()
  const HandleIcon = (item) => {
    console.log(item,"KKKK")
    setSize(item)
  }

  const rfstyle = {
    height:window.outerHeight
  }

  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [nodePosition, setNodePosition] = useState({ x: 0, y: 0 });
  const [hoveredNodeIdPositionx, setHoveredNodeIdPositionx] = useState(null);
  const [hoveredNodeIdPositiony, setHoveredNodeIdPositiony] = useState(null);

  const onNodeMouseEnter = (event, node) => {
    console.log(node.position.x,node.position.y,"2704")
    if (node && node && node.position) {
      setHoveredNodeId(node.id);
      setNodePosition({ x: node.position.x, y: node.position.y });
    } else {
      console.error('Invalid node data:', node);
    }
    setHoveredNodeIdPositionx(node.position.x)
    setHoveredNodeIdPositiony(node.position.y)
  };
  console.log(nodePosition,"2704")
  const onNodeMouseLeave = () => {
    setHoveredNodeId(null);
  };

  const flowRef = useRef(null);

 
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: sidebarCollapsed ? "100%" : "100%",
          transition: "width 0.1s",
          zIndex: 1,
        }}
      >
        <ReactFlowProvider>
          <div
            style={{ height: 565, width: "100%", overflow: "hidden" }}
            ref={reactFlowWrapper}
            // onWheel={handleWheel}
          >
            <ReactFlow
              // panOnDrag={true}
              // panOnScroll={true}
              // panOnScrollSpeed={10}
              onLoad={(reactFlowInstance) => (flowRef.current = reactFlowInstance)}
              // zoomOnScroll={false} 
              // zoomOnDoubleClick={false} 
              // zoomOnPinch={false} 
              // panOnScrollMode={"horizontal"}
              ref={flowRef}
              nodesDraggable={selectedMenuItem === "Configuration"} // Disable dragging for nodes
              nodes={nodes.map((node) => ({
                ...node,
                style: getNodeStyle(node), // Apply the updated style
              }))}
              edges={edges.map((edge) => ({
                ...edge,
                style: getEdgeStyle(edge), // Apply the updated style
              }))}
              // edges={edges}
              onNodeClick={onNodeClick}
              onNodeDoubleClick={onNodeDoubleClick}
              elements={droppedData}
              proOptions={proOptions} // reactflow watermark remove
              onEdgeContextMenu={onEdgeContextMenu}
              onNodeContextMenu={onNodeContextMenu}
              onNodesChange={onNodesChange}
              // onNodeMouseEnter={onNodeMouseEnter}
              // onNodeMouseLeave={onNodeMouseLeave}
              onEdgesChange={onEdgesChange}
              onInit={setReactFlowInstance}
              // snapToGrid={true}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
              fitViewOptions={{ padding: 3, duration: 1000 }}
              style={ rfstyle }
              connectionLineStyle={connectionLineStyle}
              nodeTypes={nodeTypes}
            >
              {selectedMenuItem === "Configuration" && expanded && (
                <Card 
                    id="dasboard-right-container" 
                    style={{ position: 'fixed', top: '39px' }} 
                    // className={`dashboard-right-container sticky-top ${expanded ? 'expanded' : 'partial'}`}>
                    className={`dashboard-right-container sticky-top ${active === 'FG Mapping' ? (expanded ? 'expanded' : 'partial') : ''}`} >
                  {expanded ? (
                    <div className="pt-2" onClick={handleExpandToggle} >
                      <RightSlider active={active} isExpandedFull={isExpandedFull} setIsExpandedFull={setIsExpandedFull} onclick={HandleIcon}/>
                      <KeyboardDoubleArrowRightIcon 
                        style={{  
                          cursor: "pointer",
                          backgroundColor: "#09587C", 
                          color: '#ffffff',
                          position: "fixed",
                          right:size? size : '30%',
                          width:'25',
                          height:'47px',
                          top:'46px',
                          display: 'inline'
                        }} 
                        onClick={handleExpandToggle} />
                    </div>
                  ) : (
                    <div className="pt-2" onClick={handleExpandToggle} >
                      <KeyboardDoubleArrowLeftIcon 
                        style={{ cursor: 'pointer', color: '#09587C' }} 
                        onClick={handleExpandToggle} />
                    </div>
                  )}
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12 m-0 p-0">
                      <Box sx={{ position: "relative" }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs 
                              value={value} 
                              onChange={handleChange} 
                              aria-label="basic tabs example"
                              style={{background:'#ffffff'}}
                              >
                            <Tab style={{ fontSize: '10.5px', fontWeight: 'bold',color:'#727272', backgroundColor: value === 0 ? "#E6ECEF" : "#ffffff" }} onClick={() => HandlebottomSlide("Staff")} label="Staff" {...a11yProps(0)} />
                            <Tab style={{ fontSize: '10.5px', fontWeight: 'bold',color:'#727272', backgroundColor: value === 1 ? "#E6ECEF" : "#ffffff" }} onClick={() => HandlebottomSlide("Device")} label="Device" {...a11yProps(1)} />
                          </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                          <Employees />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                          <DevicePanel />
                        </CustomTabPanel>
                      </Box>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              {selectedMenuItem === "Configuration" &&  !expanded && (
                <div
                  id="dasboard-right-container"
                  style={{ position: "fixed", top: "45px" }}
                  className={`dashboard-right-container sticky-top partial`}
                >
                  <div className="pt-2" onClick={handleExpandToggle}>
                    <KeyboardDoubleArrowLeftIcon
                      style={{ cursor: "pointer", backgroundColor: "#09587C", 
                        color: '#ffffff',width:'25',height:'47px',position: "fixed",
                        right:'0%'
                      }}
                      onClick={handleExpandToggle}
                    />
                  </div>
                </div>
              )}
              {selectedMenuItem === "Planning" && expanded && (
                <Card 
                    id="dasboard-right-container" 
                    style={{ position: 'fixed', top: '39px' }} 
                    // className={`dashboard-right-container sticky-top ${expanded ? 'expanded' : 'partial'}`}>
                    className={`dashboard-right-container sticky-top ${active === 'FG Mapping' ? (expanded ? 'expanded' : 'partial') : ''}`} >
                  {expanded ? (
                    <div className="pt-2" onClick={handleExpandToggle} >
                      <RightSlider active={active} isExpandedFull={isExpandedFull} setIsExpandedFull={setIsExpandedFull} onclick={HandleIcon}/>
                      <KeyboardDoubleArrowRightIcon 
                        style={{  
                          cursor: "pointer",
                          backgroundColor: "#09587C", 
                          color: '#ffffff',
                          position: "fixed",
                          right:size? size : '30%',
                          width:'25',
                          height:'47px',
                          top:'46px',
                          display: 'inline'
                        }} 
                        onClick={handleExpandToggle} />
                    </div>
                  ) : (
                    <div className="pt-2" onClick={handleExpandToggle} >
                      <KeyboardDoubleArrowLeftIcon 
                        style={{ cursor: 'pointer', color: '#09587C' }} 
                        onClick={handleExpandToggle} />
                    </div>
                  )}
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12 m-0 p-0">
                      <RightOperationTabPanel
                       sendtoPlanningtab={HandlesendtoPlanningtab}
                       toRightOperationTabPanel={toRightOperationTabPanel}
                      />
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              {selectedMenuItem === "Planning" &&  !expanded && (
                <div
                  id="dasboard-right-container"
                  style={{ position: "fixed", top: "45px" }}
                  className={`dashboard-right-container sticky-top partial`}
                >
                  <div className="pt-2" onClick={handleExpandToggle}>
                    <KeyboardDoubleArrowLeftIcon
                      style={{ cursor: "pointer", backgroundColor: "#09587C", 
                        color: '#ffffff',width:'25',height:'47px',position: "fixed",
                        right:'0%'
                      }}
                      onClick={handleExpandToggle}
                    />
                  </div>
                </div>
              )}
              
              {/* {selectedMenuItem === "Operations" && selectedMenuItem !== "Planning" &&
                <RightTabPanel nodefromshowRoutes={selectedNodeId} setJobIdSidetoBottom={HandleJobfromOperations} />
              } */}
              {/* {selectedMenuItem === "Planning" && selectedMenuItem !== "Operations" &&
                <RightOperationTabPanel
                  sendtoPlanningtab={HandlesendtoPlanningtab}
                  toRightOperationTabPanel={toRightOperationTabPanel}
                />
              } */}
              {/* {selectedMenuItem === "Priority Job" && selectedMenuItem !== "Operations" &&
                <Priorityjobspanel
                  onClick={HandleJobIdtoJobPriority}
                  onDoubleClick = {HandleMultipleJobs}
                />
              } */}
              <Panel position="top-left">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    position: "fixed",
                    // left: 80,
                    top: 60,
                  }}
                >
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => <Tooltip {...props}>Add Node</Tooltip>}
                    placement="right"
                  >
                    <Button
                      style={{ width: "50px", border:'1px solid #ECECEF' }}
                      className="mt-2"
                      variant="white"
                      id="savebutton"
                      onClick={onAddNode}
                    >
                      <BsPlusLg id="icon" style={{fontSize:'20px',color:'7C7C7C'}}/>
                      {/* <FaPlus style={{color:'7C7C7C'}}/> */}
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => <Tooltip {...props}>Delete Node</Tooltip>}
                    placement="right"
                  >
                    <Button
                      style={{ width: "50px",border:'1px solid #ECECEF'}}
                      className="mt-2"
                      variant="white"
                      id="savebutton"
                      onClick={deleteSelectedElements}
                    >
                      <RiDeleteBinLine id="icon" style={{fontSize:'20px',color:'7C7C7C'}}/>
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => <Tooltip {...props}>Save</Tooltip>}
                    placement="right"
                  >
                    <Button
                      style={{ width: "50px", border:'1px solid #ECECEF'}}
                      className="mt-2"
                      id="savebutton"
                      variant="white"
                      onClick={handleEdgesandNodes}
                    >
                      <FaSave id="icon" style={{fontSize:'20px',color:'7C7C7C'}}/>
                    </Button>
                  </OverlayTrigger>
                </div>
                <div>
                  <div style={{ position: "absolute", top: 123, right: 0 }}>
                    {nodes.map((node) => (
                      <div key={node.id} className="node">
                        {node.selected && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "5px",
                              marginRight: "-5px",
                            }}
                          >
                            {/* <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                              <Tooltip {...props}>Update Node</Tooltip>
                            )}
                            placement="left"
                          >
                            <Button
                              className="edit-button mt-2"
                              variant="primary"
                              // size="sm"
                              style={{ width: "50px",background:'#09587c' }}
                              onClick={() => handleEditNode(node)}
                            >
                              <FaEdit/>
                            </Button>
                          </OverlayTrigger> */}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ position: "absolute", top: 165, right: 0 }}>
                    {/* {edges.map((edge) => (
                      <div key={edge.id} className="edge">
                       
                      </div>
                    ))} */}
                  </div>
                  <div style={{ position: "absolute", top: -22, right: -10 }}>
                    {selectedNodeForEdit && (
                      <NodeEditor
                        node={selectedNodeForEdit}
                        onCancel={handleNodeCancel}
                        onSave={handleNodeSave}
                      />
                    )}
                    {selectedEdgeForEdit && (
                      <EdgeEditPopup
                        // edge = {selectedEdgeForEdit}
                        onCancel={handleEdgeCancel}
                        onSave={handleEdgeSave}
                      />
                    )}

                  </div>
                </div>
              </Panel>
              <Panel>
                {/* {showGraph && (
                    <div
                    style={{position:'absolute',
                    top:'-250px',
                    left:'485px'}}
                    >
                    <JobPriorityGraphs jobIdtopriority={jobIdtopriority}/>
                    </div>
                  )} */}
              </Panel>
              {/* <Background variant="lines" /> */}
            </ReactFlow>
            {hoveredNodeId && (
              <div style={{ position: 'absolute', top: nodePosition.y+100, left: nodePosition.x, background: 'white', padding: '5px', border: '1px solid #ccc' }}>
                {/* Render data related to hovered node */}
                {/* Example: <p>{getDataForNodeId(hoveredNodeId)}</p> */}
                <p>{`Data for node ${hoveredNodeId}`}</p>
              </div>
            )}
            {selectedNodes && showNodePopup && (
              <BasicTabs
                node={selectedNodes}
                onClose={onCloseNodePopup}
                onSave={onSaveNodePopup}
                onNodeContextMenu={onNodeContextMenu}
              />
            )}
            {showPopup && (
              <BasicTabs
                edge={selectedEdge}
                onClose={onClosePopup}
                onSaveEdge={onSavePopup}
                onEdgeContextMenu={onEdgeContextMenu}
              />
            )}
            {/* {NodestoMachineGraph && NodestoMachineGraph.length > 0 && (
              <MachineNode/>
            )} */}
            {PopupEmp && (
              <div className="popup"
                style={{
                  border: '1px solid black',
                  position: 'absolute',
                  top: '220px',
                  left: '300px',
                  backgroundColor: 'whitesmoke'
                }}
              >
                <table border={'1px'} cellPadding={'5px'}>
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Start Date</th>
                      <th>ShiftId</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: 'center' }}>{droppedData.empId}</td>
                      <td>{droppedData.empName}</td>
                      <td>
                        <input
                          type="date"
                          value={startDate}
                          onChange={handleStartDateChange}
                        />
                      </td>
                      <td>

                        <select

                          value={shift}
                          onChange={handleShiftChange}
                        >
                          {data.map((item, index) => (
                            <option key={index} value={item.shiftId}>{item.shiftId}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="p-1">
                  <button className="btn btn-success" onClick={handleNewRowSubmit}><FaCheck /></button>&nbsp;&nbsp;
                  <button className="btn btn-danger" onClick={() => setEmpPopup(false)}><FaXmark /></button>
                </div>
              </div>
            )}
          </div>
        </ReactFlowProvider>
      </div>
      <ToastContainer />
      {/* {showAlert && <ConfirmModal nodeData={showAlert} closeConfirmModal={closeConfirmModal} />} */}
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

export default ShowRoutes;
