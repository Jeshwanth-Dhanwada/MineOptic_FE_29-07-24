import React, { memo,useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton, Tooltip } from '@mui/material';
import { BiSolidCalendarCheck } from "react-icons/bi";
import { MdDeviceHub } from "react-icons/md";
import { BsMinecartLoaded } from "react-icons/bs";
import { getOADetails,getEmployees, getItemmaster,getDeviceMaster } from '../../api/shovelDetails';
export default memo((props) => {
  const data = props.data;
  const [Oadetails, setOadetails] = React.useState([]);
  const [Employees, setEmployees] = React.useState([]);
  const [ItemMaster, setItemMaster] = React.useState([]);
  const [deviceMaster, setdeviceMaster] = React.useState([]);

  useEffect(() => {
    showOA_details();
    showEMployess();
    showItemMaster();
    showDeviceMaster();
  }, []);
  const showOA_details = async (key) => {
    const responsedata = await getOADetails();
    setOadetails(responsedata, key);
  };
  const showEMployess = async (key) => {
    const responsedata = await getEmployees();
    setEmployees(responsedata, key);
  }
  const showItemMaster = async (key) => {
    const responsedata = await getItemmaster();
    setItemMaster(responsedata, key);
  }
  const showDeviceMaster = async (key) => {
    const responsedata = await getDeviceMaster();
    setdeviceMaster(responsedata, key);
  }
  return (
    <div style={data.style}>
    {/* <div onDoubleClick={(e) => data.onIconDoubbleClick(e,props)} style={data.style}> */}
      <Tooltip title={data.label}>
        {Oadetails.some((item)=>item.IT_NAME == data.label ) && (
          <IconButton>
            <BiSolidCalendarCheck />
          </IconButton>
        )}
        {Employees.some((item)=>item.userName == data.label) && (
          // <IconButton>
          <div className='btn btn-white' style={{border:'1px solid grey'}}>
            <PersonIcon style={{fontSize:'23px'}}/>
          </div>
        // </IconButton>
        )}
        {deviceMaster.some((item)=>item.deviceName == data.label) && (
          // <IconButton>
          <div className='btn btn-white' style={{border:'1px solid grey'}}>
            <MdDeviceHub style={{fontSize:'23px'}}/>
          </div>
        )}
        {ItemMaster.some((item)=>item.IT_NAME == data.label && (item.Film_Name_ID == "" || item.Fabric_Name_ID == "")) && (
          <IconButton>
            <BsMinecartLoaded />
          </IconButton>
        )}
      </Tooltip>
    </div>
  );
});
