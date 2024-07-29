import React, { useEffect, useState } from "react";
// import {ProSidebar,Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter} from "react-pro-sidebar"
import { Menu, MenuItem, } from "react-pro-sidebar";
import { RiMenuLine, RiSettings2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "reactflow/dist/style.css";
import "./sidebar.css";
import "reactflow/dist/style.css";
import { MdAnalytics } from "react-icons/md";
import { FcDataConfiguration } from "react-icons/fc";
import { Tooltip } from "@mui/material";
// import {"../component/"}
function Sidebar({ isExpanded, setIsExpanded, handleLinkClick }) {

  const [active, setActive] = useState("");
  const handleLinkClickName = (item) => {
    setActive(item);
    handleLinkClick(item)
  }
  const handleToggler = (event) => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }
    setIsExpanded(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if Ctrl key and B key are pressed
      if (event.ctrlKey && event.key === '1') {
        // Perform your action here
        console.log('Ctrl + 1 pressed');
        if (isExpanded) {
          setIsExpanded(false);
          return;
        }
        setIsExpanded(true);
        // You can replace the console.log with your desired action
      }
    };
    // Attach event listener when component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpanded, setIsExpanded]); // Empty dependency array ensures this effect runs only once on mount

  const getEmpTypebyId = () => {
    return "Admin";
  };

  return (
    <div className={isExpanded ? "sidebar" : "sidebar collapsed"}>
      <div className="sidebar-header">
        <RiMenuLine
          onClick={() => {
            handleToggler();
          }}
          className="sidebar-icon"
        />
        {/* <h1 className="sidebar-logo pt-1" style={{ fontFamily: 'monospace',paddingLeft:'10px' }}>
          <img src="./Machoptic logo.jpg" className="" alt=""  style={{height:'30px',width:'80px'}}/>
        </h1> */}
      </div>
      <div className="sidebar-items">
        <Menu style={{ backgroundColor: "#09587c" }}
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
          class="sidebar-item">
          {!isExpanded ? (
            <div>
              <Tooltip title="Administration" placement="right">
                <Link
                  to="/showRoutes"
                  onClick={() => handleLinkClickName("Administration")}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MenuItem
                    style={active === 'Administration' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                    className="label"
                    icon={<RiSettings2Fill className="sidebar-icon" />}
                  >
                    <span
                      className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    >
                      Administration
                    </span>
                  </MenuItem>
                </Link>
              </Tooltip>
              <Tooltip title="Configuration" placement="right">
                <Link
                  to="/showRoutes"
                  onClick={() => handleLinkClickName("Configuration")}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MenuItem
                    style={active === 'Configuration' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                    className="label"
                    icon={<FcDataConfiguration className="sidebar-icon" />}
                  >
                    <span
                      className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    >
                      Configuration
                    </span>
                  </MenuItem>
                </Link>
              </Tooltip>
              {/* <Tooltip title="Planning" placement="right">
                <Link
                  to="/showRoutes"
                  onClick={() => handleLinkClickName("Planning")}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MenuItem
                    style={active === 'Planning' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                    className="label"
                    icon={<FcPlanner className="sidebar-icon" />}
                  >
                    <span
                      className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    >
                      Planning
                    </span>
                  </MenuItem>
                </Link>
              </Tooltip>
              <Tooltip title="Operations" placement="right">
                <Link
                  to="/showRoutes"
                  onClick={() => handleLinkClickName("Operations")}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MenuItem
                    style={active === 'Operations' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                    className="label"
                    icon={<SiRedhatopenshift className="sidebar-icon" />}
                  >
                    <span
                      className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    >
                      Operations
                    </span>
                  </MenuItem>
                </Link>
              </Tooltip>*/}
              <Tooltip title="Analytics" placement="right">
                <Link
                  to="/sveltCharts"
                  onClick={() => handleLinkClickName("Analytics")}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MenuItem
                    style={active === 'Analytics' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                    className="label"
                    icon={<MdAnalytics className="sidebar-icon" />}
                  >
                    <span
                      className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    >
                      Analytics
                    </span>
                  </MenuItem>
                </Link>
              </Tooltip>
              {/*<Tooltip title="Optimization" placement="right">
                <Link
                  to=""
                  onClick={() => handleLinkClickName("Optimization")}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MenuItem
                    style={active === 'Optimization' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                    className="label"
                    icon={<GrOptimize className="sidebar-icon" />}
                  >
                    <span
                      className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    >
                      Optimization
                    </span>
                  </MenuItem>
                </Link>
              </Tooltip>
              <Tooltip title="Reports" placement="right">
                <SubMenu
                  label="Reports"
                  icon={<TbReportSearch className="sidebar-icon" />}
                  style={{ backgroundColor: "#09587c" }} // Add this style
                >
                  <MenuItem className="menu-item" style={active === 'job Status' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                    <Link
                      to="/job_status"
                      onClick={() => handleLinkClickName('Job Status')}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <span className="sidebar-text-show">Job Status</span>
                    </Link>
                  </MenuItem>
                  <MenuItem className="menu-item" style={active === 'Machine Wise Report' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                    <Link
                      to="/MachinewiseReport"
                      onClick={() => handleLinkClickName('Machine Wise Report')}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <span className="sidebar-text-show">Machine Wise Report</span>
                    </Link>
                  </MenuItem>
                  <MenuItem className="menu-item" style={active === 'Material Data Report' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                    <Link
                      to="/MaterialWiseReport"
                      onClick={() => handleLinkClickName('Material Data Report')}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <span className="sidebar-text-show">Material Data Report</span>
                    </Link>
                  </MenuItem>
                  <MenuItem className="menu-item" style={active === 'Material Production Report' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                    <Link
                      to="/MaterialProductionReport"
                      onClick={() => handleLinkClickName('Material Production Report')}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <span className="sidebar-text-show">Material Production Report</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
              </Tooltip>
              <Tooltip title="Reports" placement="right">
              <SubMenu
                label="Data Import"
                icon={<FiUpload className="sidebar-icon" />}
                style={{ backgroundColor: "#09587c" }} // Add this style
              >
                <MenuItem className="menu-item" style={active === 'Raw Material Upload' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/RawMaterialUpload"
                    onClick={() => handleLinkClickName('Raw Material Upload')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Raw Material Upload</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'RMDataUpload' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/RMDataUpload"
                    onClick={() => handleLinkClickName('Raw Material Data')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Raw Material Data</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Raw Material Fabric Data' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/RMFabricUpload"
                    onClick={() => handleLinkClickName('Raw Material Fabric Data')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Raw Material Fabric Data</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Item Refresh' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/itemRefresh"
                    onClick={() => handleLinkClickName('Item Refresh')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Item Refresh</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Job Refresh' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/jobRefresh"
                    onClick={() => handleLinkClickName('Job Refresh')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Job Refresh</span>
                  </Link>
                </MenuItem>
              </SubMenu>
              </Tooltip>
              <Tooltip title="Priority Job" placement="right">
                <Link
                  to="/showRoutes"
                  onClick={() => handleLinkClickName("Priority Job")}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <MenuItem
                    style={active === 'Priority Job' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                    className="label"
                    icon={<BiTask className="sidebar-icon" />}
                  >
                    <span
                      className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    >
                      Priority Job
                    </span>
                  </MenuItem>
                </Link>
              </Tooltip> */}
            </div>
          ) :
            <div>
              <Link
                to="/showRoutes"
                onClick={() => handleLinkClickName("Administration")}
                style={{ textDecoration: "none", color: "white" }}
                className="link-item" // Add a class for styling
              >
                <MenuItem
                  style={active === 'Administration' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                  className="label"
                  icon={<RiSettings2Fill className="sidebar-icon" />}
                >
                  <span
                    className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                  >
                    Administration
                  </span>
                </MenuItem>
              </Link>
              <Link
                to="/showRoutes"
                onClick={() => handleLinkClickName("Configuration")}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem
                  style={active === 'Configuration' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                  className="label"
                  icon={<FcDataConfiguration className="sidebar-icon" />}
                >
                  <span
                    className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                  >
                    Configuration
                  </span>
                </MenuItem>
              </Link>
              <Link
                to="/sveltCharts"
                onClick={() => handleLinkClickName("Analytics")}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem
                  style={active === 'Analytics' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                  className="label"
                  icon={<MdAnalytics className="sidebar-icon" />}
                >
                  <span
                    className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                  >
                    Analytics
                  </span>
                </MenuItem>
              </Link>
              {/* <Link
                to="/showRoutes"
                onClick={() => handleLinkClickName("Planning")}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem
                  style={active === 'Planning' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                  className="label"
                  icon={<FcPlanner className="sidebar-icon" />}
                >
                  <span
                    className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                  >
                    Planning
                  </span>
                </MenuItem>
              </Link>
              <Link
                to="/showRoutes"
                onClick={() => handleLinkClickName("Operations")}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem
                  style={active === 'Operations' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                  className="label"
                  icon={<SiRedhatopenshift className="sidebar-icon" />}
                >
                  <span
                    className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                  >
                    Operations
                  </span>
                </MenuItem>
              </Link>
              
              <Link
                to=""
                onClick={() => handleLinkClickName("Optimization")}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem
                  style={active === 'Optimization' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                  className="label"
                  icon={<GrOptimize className="sidebar-icon" />}
                >
                  <span
                    className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                  >
                    Optimization
                  </span>
                </MenuItem>
              </Link>
              <SubMenu
                label="Reports"
                icon={<TbReportSearch className="sidebar-icon" />}
                style={{ backgroundColor: "#09587c" }} // Add this style
              >
                <MenuItem className="menu-item" style={active === 'Job Status' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/job_status"
                    onClick={() => handleLinkClickName('Job Status')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Job Status</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Machine Wise Report' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/MachinewiseReport"
                    onClick={() => handleLinkClickName('Machine Wise Report')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Machine Wise Report</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Material Data Report' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/MaterialWiseReport"
                    onClick={() => handleLinkClickName('Material Data Report')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Material Data Report</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Material Production Report' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/MaterialProductionReport"
                    onClick={() => handleLinkClickName('Material Production Report')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Material Production Report</span>
                  </Link>
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="Data Import"
                icon={<FiUpload className="sidebar-icon" />}
                style={{ backgroundColor: "#09587c" }} // Add this style
              >
                <MenuItem className="menu-item" style={active === 'Raw Material Upload' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/RawMaterialUpload"
                    onClick={() => handleLinkClickName('Raw Material Upload')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Raw Material Upload</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'RMDataUpload' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/RMDataUpload"
                    onClick={() => handleLinkClickName('Raw Material Data')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Raw Material Data</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Raw Material Fabric Data' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/RMFabricUpload"
                    onClick={() => handleLinkClickName('Raw Material Fabric Data')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Raw Material Fabric Data</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Item Refresh' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/itemRefresh"
                    onClick={() => handleLinkClickName('Item Refresh')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Item Refresh</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Job Refresh' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}>
                  <Link
                    to="/jobRefresh"
                    onClick={() => handleLinkClickName('Job Refresh')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show">Job Refresh</span>
                  </Link>
                </MenuItem>
              </SubMenu>
              <Link
                to="/showRoutes"
                onClick={() => handleLinkClickName("Priority Job")}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem
                  style={active === 'Priority Job' ? { backgroundColor: "#fc9445" } : { backgroundColor: "#09587c" }}
                  className="label"
                  icon={<GrOptimize className="sidebar-icon" />}
                >
                  <span
                    className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                  >
                    Priority Job
                  </span>
                </MenuItem>
              </Link> */}
            </div>
          }
        </Menu>
      </div>
    </div>
  );
}
export default Sidebar;
