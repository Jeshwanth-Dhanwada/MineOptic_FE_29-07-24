import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Edgesdata from "./edgesdata";
import StaffAllocation from "./tabStaffAllocation";
import DeviceMapping from "./tabsDeviceMapping";
import Nodesdata from "./Nodesdata";
import FGmapping from "./FGMapping";
import BottomFGmapping from "./BottomFGMapping";
// import Node
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
        <Box sx={{ p: 0 }}>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicConfigurationTabs({
  node,
  edge,
  onSaveEdge,
  onClose,
  onSaveNode,
  onCloseNode,
  selectedMenuItem,
  RoutedatafromEdge, 
  selectedId, 
  setSelectedId,
  sidetobottompanel,
  onClick,
  nodeIdselected,
  tableHeight
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleTableRowClick = (edgeId) => {
    console.log(edgeId);
    const edge = {edgeId}
    setSelectedId(edge)
  };
  
  useEffect(() => {
    // Set the initial tab value based on sidetobottompanel
    switch (sidetobottompanel) {
      case "Staff":
        setValue(1); // Staff Mapping tab
        break;
      case "Device":
        setValue(2); // Device Mapping tab
        break;
      // Add more cases for other values if needed
      default:
        setValue(1); // Default to Nodes tab
    }
  }, [sidetobottompanel]);

  const HandleBottomtoLeftSlide = (item) => {
    console.log(item);
    onClick(item);
  }
  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col-12 m-0 p-0">
          <Box sx={{ position: "relative" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                style={{background:'#09587c'}}
              >
                <Tab style={{fontSize:'10.5px',fontWeight:'bold',color:'#FFFFFF', backgroundColor: value === 0 ? "#fc9445" : "#09587c" }} onClick={() => HandleBottomtoLeftSlide("")} label="Nodes" {...a11yProps(0)} />
                <Tab style={{fontSize:'10.5px',fontWeight:'bold',color:'#FFFFFF', backgroundColor: value === 1 ? "#fc9445" : "#09587c" }} onClick={() => HandleBottomtoLeftSlide("Staff Mapping")} label="Staff Mapping" {...a11yProps(1)} />
                <Tab style={{fontSize:'10.5px',fontWeight:'bold',color:'#FFFFFF', backgroundColor: value === 2 ? "#fc9445" : "#09587c" }} onClick={() => HandleBottomtoLeftSlide("Device Mapping")} label="Device Mapping" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Nodesdata nodeIdselected={nodeIdselected}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <StaffAllocation/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            <DeviceMapping/>
            </CustomTabPanel>
          </Box>

          </div>
        </div>
    </div>
  );
}
