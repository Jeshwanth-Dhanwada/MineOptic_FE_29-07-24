import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import OperationsJobActivity from "./OperationsJobActivity";
import OperationsInput from "./OperationsInput";
import OperationsOutput from "./OperationsOutput";
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

export default function BottomOperationsTabs({
  node,
  JobfromOperations,
}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showRowboolean, setshowRowbooleanValue] = useState([]);
  const [RecentActvitydata, setRecentActvityData] = useState([]);
  const hanldeTabValue = (tabvalue) => {
    console.log(tabvalue);
    setValue(tabvalue.setvalue);
    setshowRowbooleanValue(tabvalue.setrowActive);
  }

  const HanldeActivityInput = (RecentActvityData) => {
    console.log(RecentActvityData);
    setRecentActvityData(RecentActvityData)
  }

  const [inputdatafromActivity, SetinputdatafromActivity] = useState([]);
  const [outputDatafromActivity, setOutputdatafromActivity] = useState([]);
  const HandlesetSendToInput = (inputdata) => {
    console.log(inputdata, "inputdata");
    SetinputdatafromActivity(inputdata)
  }

  const HandlesetSendToOutput = (outputData) => {
    console.log(outputData, 'OutputData');
    setOutputdatafromActivity(outputData);
  };
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
              <Tab style={{fontSize:'10.5px',fontWeight:'bold',color:'#FFFFFF', backgroundColor: value === 0 ? "#fc9445" : "#09587c"}} label="Activity Jobs" {...a11yProps(0)} />
              <Tab style={{fontSize:'10.5px',fontWeight:'bold',color:'#FFFFFF', backgroundColor: value === 1 ? "#fc9445" : "#09587c"}} label="Inputs" {...a11yProps(1)} />
              <Tab style={{fontSize:'10.5px',fontWeight:'bold',color:'#FFFFFF', backgroundColor: value === 2 ? "#fc9445" : "#09587c"}} label="Outputs" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <OperationsJobActivity
              JobfromOperations={JobfromOperations}
              setActivitydatatoInput={HanldeActivityInput}
              onClick={hanldeTabValue}
              setSendToInput={HandlesetSendToInput}
              setSendToOutput={HandlesetSendToOutput}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1} style={{ overflowY: "scroll" }}>
            <OperationsInput
              JobfromOperations={JobfromOperations}
              showRowboolean={showRowboolean}
              onClick={hanldeTabValue}
              RecentActvitydata={RecentActvitydata}
              inputdatafromActivity={inputdatafromActivity} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2} style={{ overflowY: "scroll" }}>
            <OperationsOutput
              JobfromOperations={JobfromOperations}
              RecentActvityData={RecentActvitydata}
              outputDatafromActivity={outputDatafromActivity}
              inputdatafromActivity={inputdatafromActivity}
            />
          </CustomTabPanel>
        </Box>
        </div>
      </div>
    </div>
  );
}
