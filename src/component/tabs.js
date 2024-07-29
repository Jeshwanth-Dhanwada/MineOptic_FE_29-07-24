import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import NodesPopup from "./NodePopup";
import EdgePopup from "./edgePopup";
import Shift from "./shift";
import Employee from "./Employees";
import DepartmentForm from "./department";
import Branch from "./branch";
import EmployeeType from "./EmployeeType";
import Material from "./material";
import MaterialCategory from "./materailcategory";
import MaterialType from "./materialType";
import Units from "./units";
import Section from "./section";
import Organisation from "./Organisation";
import MachineType from "./machineType";
import MaterialNodeType from "./materialNnodeType";
import MaterialsPanel from "./rigtPanel/MaterialPanel";
import MachineCategory from "./machineCategory";
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

export default function BasicTabs({
  node,
  edge,
  onSaveEdge,
  onClose,
  onSaveNode,
  onCloseNode,
  setsendtoRoutes,
  selectedMenuItem,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewImageNode = (newNode) => {
    setsendtoRoutes(newNode)
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 m-0 p-0">
          <Box sx={{ position: "relative" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              {(selectedMenuItem === "" ||
                selectedMenuItem === "Administration") && (
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  style={{background:'#09587c'}}
                >
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 0 ? "#fc9445" : "#09587c"}}
                    label="Properties"
                    {...a11yProps(0)}
                  />
                   <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 1 ? "#fc9445" : "#09587c" }}
                    label="Organisation"
                    {...a11yProps(1)}
                  />
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 2 ? "#fc9445" : "#09587c" }}
                    label="Branch"
                    {...a11yProps(2)}
                  />
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 3 ? "#fc9445" : "#09587c" }}
                    label="Machine Type"
                    {...a11yProps(3)}
                  /> 
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 4 ? "#fc9445" : "#09587c" }}
                    label="Material Type"
                    {...a11yProps(4)}
                  /> 
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 5 ? "#fc9445" : "#09587c" }}
                    label="Material Category"
                    {...a11yProps(5)}
                  /> 
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 6 ? "#fc9445" : "#09587c" }}
                    label="Machine Category"
                    {...a11yProps(6)}
                  /> 
                  {/*<Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 3 ? "#fc9445" : "#09587c" }}
                    label="Department"
                    {...a11yProps(3)}
                  />*/}
                  {/* <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 5 ? "#fc9445" : "#09587c" }}
                    label="Employee Category"
                    {...a11yProps(5)}
                  />
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 6 ? "#fc9445" : "#09587c" }}
                    label="Material"
                    {...a11yProps(6)}
                  />
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 7 ? "#fc9445" : "#09587c" }}
                    label="Material Category"
                    {...a11yProps(7)}
                  />
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 8 ? "#fc9445" : "#09587c" }}
                    label="Material Type"
                    {...a11yProps(8)}
                  />
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 9 ? "#fc9445" : "#09587c" }}
                    label="Units"
                    {...a11yProps(9)}
                  />
                  <Tab
                    style={{ fontSize: "10.5px", fontWeight: "bold",color:'#FFFFFF', backgroundColor: value === 10 ? "#fc9445" : "#09587c" }}
                    label="Section"
                    {...a11yProps(10)}
                  /> */}
                </Tabs>
              )}
            </Box>

            <CustomTabPanel
              value={value}
              index={0}
              style={{ overflowY: "scroll" }}
            >
              {node ? (
                <NodesPopup
                  node={node}
                  onSave={onSaveNode}
                  onClose={onCloseNode}
                  onClick={handleNewImageNode}
                />
              ) : edge ? (
                <EdgePopup edge={edge} onSave={onSaveEdge} onClose={onClose} />
              ) : (
                ""
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Organisation />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Branch />
            </CustomTabPanel>
             <CustomTabPanel value={value} index={3}>
              <MachineType />
            </CustomTabPanel>
             <CustomTabPanel value={value} index={4}>
              <MaterialNodeType />
            </CustomTabPanel>
             <CustomTabPanel value={value} index={5}>
              <MaterialCategory />
            </CustomTabPanel>
             <CustomTabPanel value={value} index={6}>
              <MachineCategory />
            </CustomTabPanel>
            {/*<CustomTabPanel value={value} index={2}>
              <Employee />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <DepartmentForm />
            </CustomTabPanel> */}
            {/* <CustomTabPanel value={value} index={5}>
              <EmployeeType />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={6}>
              <Material />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={7}>
              <MaterialCategory />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={8}>
              <MaterialType />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={9}>
              <Units />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={10}>
              <Section />
            </CustomTabPanel> */}
          </Box>
        </div>
       </div>
      </div>
  );
}
