import React, { useEffect, useState } from "react";
// import {ProSidebar,Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter} from "react-pro-sidebar"
import { Menu, MenuItem, SubMenu, } from "react-pro-sidebar";
import { RiMenuLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "reactflow/dist/style.css";
import "./sidebar.css";
import "reactflow/dist/style.css";
import { Tooltip } from "@mui/material";
import { SlArrowLeft } from "react-icons/sl";
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
      {isExpanded == false && (
          <RiMenuLine
          onClick={() => {
            handleToggler();
          }}
          className="sidebar-icon"
          style={{color:'#505050'}}
        />
        )}
        {isExpanded == true && (
          <SlArrowLeft
            onClick={() => {
              handleToggler();
            }}
            className="sidebar-icon"
            style={{color:'#505050'}}
          />
        )}
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
                    style={active === 'Administration' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}
                    className="label"
                    // icon={<RiSettings2Fill className="sidebar-icon" style={{color:'#505050'}}/>}
                    icon={<svg className="sidebar-icon" style={{color:'#505050'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.5153 9.72843L13.0153 2.65218C13.0116 2.64898 13.0082 2.64554 13.005 2.64187C12.7289 2.39074 12.369 2.25159 11.9958 2.25159C11.6225 2.25159 11.2627 2.39074 10.9866 2.64187L10.9763 2.65218L3.48469 9.72843C3.33187 9.86895 3.20989 10.0397 3.12646 10.2298C3.04303 10.4199 2.99997 10.6252 3 10.8328V19.5C3 19.8978 3.15804 20.2793 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H9C9.39782 21 9.77936 20.842 10.0607 20.5607C10.342 20.2793 10.5 19.8978 10.5 19.5V15H13.5V19.5C13.5 19.8978 13.658 20.2793 13.9393 20.5607C14.2206 20.842 14.6022 21 15 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2793 21 19.8978 21 19.5V10.8328C21 10.6252 20.957 10.4199 20.8735 10.2298C20.7901 10.0397 20.6681 9.86895 20.5153 9.72843ZM19.5 19.5H15V15C15 14.6022 14.842 14.2206 14.5607 13.9393C14.2794 13.658 13.8978 13.5 13.5 13.5H10.5C10.1022 13.5 9.72064 13.658 9.43934 13.9393C9.15804 14.2206 9 14.6022 9 15V19.5H4.5V10.8328L4.51031 10.8234L12 3.74999L19.4906 10.8216L19.5009 10.8309L19.5 19.5Z" fill="black"/>
                      </svg>
                      }
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
                    style={active === 'Configuration' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}
                    className="label"
                    icon={<svg className="sidebar-icon" style={{color:'#505050'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7.50004C11.11 7.50004 10.24 7.76396 9.49998 8.25843C8.75995 8.7529 8.18318 9.4557 7.84259 10.278C7.50199 11.1002 7.41288 12.005 7.58651 12.8779C7.76014 13.7509 8.18873 14.5527 8.81806 15.182C9.4474 15.8114 10.2492 16.2399 11.1221 16.4136C11.9951 16.5872 12.8998 16.4981 13.7221 16.1575C14.5444 15.8169 15.2472 15.2401 15.7417 14.5001C16.2361 13.7601 16.5 12.8901 16.5 12C16.4988 10.8069 16.0243 9.66308 15.1807 8.81943C14.337 7.97579 13.1931 7.50128 12 7.50004ZM12 15C11.4067 15 10.8267 14.8241 10.3333 14.4945C9.83998 14.1648 9.45547 13.6963 9.2284 13.1481C9.00134 12.5999 8.94193 11.9967 9.05769 11.4148C9.17344 10.8328 9.45916 10.2983 9.87872 9.87872C10.2983 9.45916 10.8328 9.17344 11.4148 9.05769C11.9967 8.94193 12.5999 9.00134 13.1481 9.2284C13.6963 9.45547 14.1648 9.83998 14.4945 10.3333C14.8241 10.8267 15 11.4067 15 12C15 12.7957 14.684 13.5588 14.1214 14.1214C13.5588 14.684 12.7957 15 12 15ZM20.25 12.2025C20.2538 12.0675 20.2538 11.9325 20.25 11.7975L21.6488 10.05C21.7221 9.95829 21.7729 9.85059 21.797 9.73563C21.8211 9.62067 21.8179 9.50165 21.7875 9.38817C21.5582 8.52623 21.2152 7.69865 20.7675 6.92723C20.7089 6.82628 20.6275 6.7404 20.5299 6.67644C20.4322 6.61248 20.321 6.57219 20.205 6.55879L17.9813 6.31129C17.8888 6.21379 17.795 6.12004 17.7 6.03004L17.4375 3.80067C17.424 3.68462 17.3836 3.57332 17.3195 3.47566C17.2554 3.37801 17.1693 3.29668 17.0682 3.23817C16.2965 2.79131 15.4689 2.44864 14.6072 2.21911C14.4937 2.18891 14.3746 2.18583 14.2596 2.21009C14.1447 2.23435 14.037 2.28529 13.9454 2.35879L12.2025 3.75004C12.0675 3.75004 11.9325 3.75004 11.7975 3.75004L10.05 2.35411C9.95829 2.28076 9.85059 2.23 9.73563 2.2059C9.62067 2.1818 9.50165 2.18504 9.38817 2.21536C8.52637 2.44507 7.69884 2.78806 6.92723 3.23536C6.82628 3.29397 6.7404 3.37535 6.67644 3.473C6.61248 3.57065 6.57219 3.68189 6.55879 3.79785L6.31129 6.02535C6.21379 6.11848 6.12004 6.21223 6.03004 6.3066L3.80067 6.56254C3.68462 6.57604 3.57332 6.61647 3.47566 6.6806C3.37801 6.74473 3.29668 6.83079 3.23817 6.93192C2.79131 7.70363 2.44864 8.53114 2.21911 9.39286C2.18891 9.50641 2.18583 9.62547 2.21009 9.74044C2.23435 9.8554 2.28529 9.96306 2.35879 10.0547L3.75004 11.7975C3.75004 11.9325 3.75004 12.0675 3.75004 12.2025L2.35411 13.95C2.28076 14.0418 2.23 14.1495 2.2059 14.2645C2.1818 14.3794 2.18504 14.4984 2.21536 14.6119C2.44466 15.4739 2.78767 16.3014 3.23536 17.0729C3.29397 17.1738 3.37535 17.2597 3.473 17.3236C3.57065 17.3876 3.68189 17.4279 3.79785 17.4413L6.02161 17.6888C6.11473 17.7863 6.20848 17.88 6.30286 17.97L6.56254 20.1994C6.57604 20.3155 6.61647 20.4268 6.6806 20.5244C6.74473 20.6221 6.83079 20.7034 6.93192 20.7619C7.70363 21.2088 8.53114 21.5514 9.39286 21.781C9.50641 21.8112 9.62547 21.8143 9.74044 21.79C9.8554 21.7657 9.96306 21.7148 10.0547 21.6413L11.7975 20.25C11.9325 20.2538 12.0675 20.2538 12.2025 20.25L13.95 21.6488C14.0418 21.7221 14.1495 21.7729 14.2645 21.797C14.3794 21.8211 14.4984 21.8179 14.6119 21.7875C15.4739 21.5582 16.3014 21.2152 17.0729 20.7675C17.1738 20.7089 17.2597 20.6275 17.3236 20.5299C17.3876 20.4322 17.4279 20.321 17.4413 20.205L17.6888 17.9813C17.7863 17.8888 17.88 17.795 17.97 17.7L20.1994 17.4375C20.3155 17.424 20.4268 17.3836 20.5244 17.3195C20.6221 17.2554 20.7034 17.1693 20.7619 17.0682C21.2088 16.2965 21.5514 15.4689 21.781 14.6072C21.8112 14.4937 21.8143 14.3746 21.79 14.2596C21.7657 14.1447 21.7148 14.037 21.6413 13.9454L20.25 12.2025ZM18.7407 11.5932C18.7566 11.8642 18.7566 12.1359 18.7407 12.4069C18.7295 12.5925 18.7876 12.7755 18.9038 12.9207L20.2341 14.5829C20.0815 15.068 19.886 15.5386 19.65 15.9891L17.5313 16.2291C17.3468 16.2496 17.1764 16.3378 17.0532 16.4766C16.8727 16.6796 16.6805 16.8718 16.4775 17.0522C16.3387 17.1755 16.2505 17.3458 16.23 17.5304L15.9947 19.6472C15.5443 19.8833 15.0736 20.0788 14.5885 20.2313L12.9254 18.901C12.7923 18.7946 12.627 18.7368 12.4566 18.7369H12.4116C12.1406 18.7529 11.8689 18.7529 11.5979 18.7369C11.4123 18.7257 11.2292 18.7839 11.0841 18.9L9.41723 20.2313C8.9321 20.0786 8.4615 19.8832 8.01098 19.6472L7.77098 17.5313C7.7505 17.3468 7.66231 17.1764 7.52348 17.0532C7.32052 16.8727 7.12831 16.6805 6.94785 16.4775C6.8246 16.3387 6.65424 16.2505 6.46973 16.23L4.35286 15.9938C4.11679 15.5433 3.92132 15.0727 3.76879 14.5875L5.0991 12.9244C5.21527 12.7793 5.2734 12.5962 5.26223 12.4107C5.24629 12.1397 5.24629 11.8679 5.26223 11.5969C5.2734 11.4114 5.21527 11.2283 5.0991 11.0832L3.76879 9.41723C3.92144 8.9321 4.1169 8.4615 4.35286 8.01098L6.46879 7.77098C6.65331 7.7505 6.82367 7.66231 6.94692 7.52348C7.12738 7.32052 7.31958 7.12831 7.52254 6.94785C7.66193 6.82452 7.75048 6.65377 7.77098 6.46879L8.00629 4.35286C8.45676 4.11679 8.92737 3.92132 9.41254 3.76879L11.0757 5.0991C11.2208 5.21527 11.4039 5.2734 11.5894 5.26223C11.8604 5.24629 12.1322 5.24629 12.4032 5.26223C12.5887 5.2734 12.7718 5.21527 12.9169 5.0991L14.5829 3.76879C15.068 3.92144 15.5386 4.1169 15.9891 4.35286L16.2291 6.46879C16.2496 6.65331 16.3378 6.82367 16.4766 6.94692C16.6796 7.12738 16.8718 7.31958 17.0522 7.52254C17.1755 7.66137 17.3458 7.74956 17.5304 7.77004L19.6472 8.00535C19.8833 8.45583 20.0788 8.92644 20.2313 9.4116L18.901 11.0747C18.7837 11.2211 18.7255 11.406 18.7379 11.5932H18.7407Z" fill="black"/>
                    </svg>
                    }
                  >
                    <span
                      className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    >
                      Configuration
                    </span>
                  </MenuItem>
                </Link>
              </Tooltip>
              <Tooltip title="Planning" placement="right">
                <SubMenu
                  label="Planning"
                  icon={<svg className="sidebar-icon" style={{color:'#505050'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 3H17.25V2.25C17.25 2.05109 17.171 1.86032 17.0303 1.71967C16.8897 1.57902 16.6989 1.5 16.5 1.5C16.3011 1.5 16.1103 1.57902 15.9697 1.71967C15.829 1.86032 15.75 2.05109 15.75 2.25V3H8.25V2.25C8.25 2.05109 8.17098 1.86032 8.03033 1.71967C7.88968 1.57902 7.69891 1.5 7.5 1.5C7.30109 1.5 7.11032 1.57902 6.96967 1.71967C6.82902 1.86032 6.75 2.05109 6.75 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM6.75 4.5V5.25C6.75 5.44891 6.82902 5.63968 6.96967 5.78033C7.11032 5.92098 7.30109 6 7.5 6C7.69891 6 7.88968 5.92098 8.03033 5.78033C8.17098 5.63968 8.25 5.44891 8.25 5.25V4.5H15.75V5.25C15.75 5.44891 15.829 5.63968 15.9697 5.78033C16.1103 5.92098 16.3011 6 16.5 6C16.6989 6 16.8897 5.92098 17.0303 5.78033C17.171 5.63968 17.25 5.44891 17.25 5.25V4.5H19.5V7.5H4.5V4.5H6.75ZM19.5 19.5H4.5V9H19.5V19.5Z" fill="black"/>
                          </svg>}
                  style={{ backgroundColor: "#FFFFFF" }} // Add this style
                >
                  <MenuItem className="menu-item" style={active === 'Excavator Allocation' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                    <Link
                      to=""
                      onClick={() => handleLinkClickName('Excavator Allocation')}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <span className="sidebar-text-show">Excavator Allocation
                      </span>
                    </Link>
                  </MenuItem>
                  <MenuItem className="menu-item" style={active === 'Truck-Excavator Allocation' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                    <Link
                      to=""
                      onClick={() => handleLinkClickName('Truck-Excavator Allocation')}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <span className="sidebar-text-show">Truck-Excavator Allocation</span>
                    </Link>
                  </MenuItem>
                </SubMenu>
              </Tooltip>
              <Tooltip title="Analytics" placement="right">
                <SubMenu
                  label="Analytics"
                  icon={<svg className="sidebar-icon" style={{color:'#505050'}}viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.75 19.5C21.75 19.6989 21.671 19.8897 21.5303 20.0303C21.3897 20.171 21.1989 20.25 21 20.25H3C2.80109 20.25 2.61032 20.171 2.46967 20.0303C2.32902 19.8897 2.25 19.6989 2.25 19.5V4.5C2.25 4.30109 2.32902 4.11032 2.46967 3.96967C2.61032 3.82902 2.80109 3.75 3 3.75C3.19891 3.75 3.38968 3.82902 3.53033 3.96967C3.67098 4.11032 3.75 4.30109 3.75 4.5V13.3472L8.50594 9.1875C8.63535 9.07421 8.79978 9.00885 8.97165 9.00236C9.14353 8.99587 9.31241 9.04866 9.45 9.15188L14.9634 13.2872L20.5059 8.4375C20.5786 8.36556 20.6652 8.30925 20.7605 8.27201C20.8557 8.23478 20.9575 8.21741 21.0597 8.22097C21.1619 8.22454 21.2623 8.24896 21.3547 8.29275C21.4471 8.33653 21.5296 8.39875 21.5971 8.47558C21.6645 8.5524 21.7156 8.64222 21.7471 8.7395C21.7786 8.83678 21.7899 8.93948 21.7802 9.04128C21.7706 9.14307 21.7402 9.24182 21.691 9.33146C21.6418 9.42109 21.5748 9.49972 21.4941 9.5625L15.4941 14.8125C15.3646 14.9258 15.2002 14.9912 15.0283 14.9976C14.8565 15.0041 14.6876 14.9513 14.55 14.8481L9.03656 10.7147L3.75 15.3403V18.75H21C21.1989 18.75 21.3897 18.829 21.5303 18.9697C21.671 19.1103 21.75 19.3011 21.75 19.5Z" fill="black"/>
                          </svg>
                      }
                  style={{ backgroundColor: "#FFFFFF" }} // Add this style
                >
                  <MenuItem className="menu-item" style={active === 'Reply Analysis' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                    <Link
                      to=""
                      onClick={() => handleLinkClickName('Reply Analysis')}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <span className="sidebar-text-show">Reply Analysis</span>
                    </Link>
                  </MenuItem>
                  <MenuItem className="menu-item" style={active === 'Activity Analysis' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                    <Link
                      to="/sveltCharts"
                      onClick={() => handleLinkClickName('Activity Analysis')}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <span className="sidebar-text-show">Activity Analysis</span>
                    </Link>
                  </MenuItem>
                  </SubMenu>
              </Tooltip>
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
                  style={active === 'Administration' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}
                  className="label"
                  // icon={<RiSettings2Fill className="sidebar-icon" style={{color:'#505050'}}/>}
                  icon={<svg className="sidebar-icon"
                    style={active === 'Administration' ? { color: "#034661" } : { color: "#505050" }}
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5153 9.72843L13.0153 2.65218C13.0116 2.64898 13.0082 2.64554 13.005 2.64187C12.7289 2.39074 12.369 2.25159 11.9958 2.25159C11.6225 2.25159 11.2627 2.39074 10.9866 2.64187L10.9763 2.65218L3.48469 9.72843C3.33187 9.86895 3.20989 10.0397 3.12646 10.2298C3.04303 10.4199 2.99997 10.6252 3 10.8328V19.5C3 19.8978 3.15804 20.2793 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H9C9.39782 21 9.77936 20.842 10.0607 20.5607C10.342 20.2793 10.5 19.8978 10.5 19.5V15H13.5V19.5C13.5 19.8978 13.658 20.2793 13.9393 20.5607C14.2206 20.842 14.6022 21 15 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2793 21 19.8978 21 19.5V10.8328C21 10.6252 20.957 10.4199 20.8735 10.2298C20.7901 10.0397 20.6681 9.86895 20.5153 9.72843ZM19.5 19.5H15V15C15 14.6022 14.842 14.2206 14.5607 13.9393C14.2794 13.658 13.8978 13.5 13.5 13.5H10.5C10.1022 13.5 9.72064 13.658 9.43934 13.9393C9.15804 14.2206 9 14.6022 9 15V19.5H4.5V10.8328L4.51031 10.8234L12 3.74999L19.4906 10.8216L19.5009 10.8309L19.5 19.5Z" fill="black"/>
                    </svg>
                      }
                >
                  <span
                    className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    // style={{color:'#8C8C8C'}}
                    style={active === 'Administration' ? { color: "#034661" } : { color: "#8C8C8C" }}
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
                  style={active === 'Configuration' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}
                  className="label"
                  // icon={<FcDataConfiguration className="sidebar-icon" style={{color:'#505050'}}/>}
                  icon={<svg className="sidebar-icon" style={{color:'#505050'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7.50004C11.11 7.50004 10.24 7.76396 9.49998 8.25843C8.75995 8.7529 8.18318 9.4557 7.84259 10.278C7.50199 11.1002 7.41288 12.005 7.58651 12.8779C7.76014 13.7509 8.18873 14.5527 8.81806 15.182C9.4474 15.8114 10.2492 16.2399 11.1221 16.4136C11.9951 16.5872 12.8998 16.4981 13.7221 16.1575C14.5444 15.8169 15.2472 15.2401 15.7417 14.5001C16.2361 13.7601 16.5 12.8901 16.5 12C16.4988 10.8069 16.0243 9.66308 15.1807 8.81943C14.337 7.97579 13.1931 7.50128 12 7.50004ZM12 15C11.4067 15 10.8267 14.8241 10.3333 14.4945C9.83998 14.1648 9.45547 13.6963 9.2284 13.1481C9.00134 12.5999 8.94193 11.9967 9.05769 11.4148C9.17344 10.8328 9.45916 10.2983 9.87872 9.87872C10.2983 9.45916 10.8328 9.17344 11.4148 9.05769C11.9967 8.94193 12.5999 9.00134 13.1481 9.2284C13.6963 9.45547 14.1648 9.83998 14.4945 10.3333C14.8241 10.8267 15 11.4067 15 12C15 12.7957 14.684 13.5588 14.1214 14.1214C13.5588 14.684 12.7957 15 12 15ZM20.25 12.2025C20.2538 12.0675 20.2538 11.9325 20.25 11.7975L21.6488 10.05C21.7221 9.95829 21.7729 9.85059 21.797 9.73563C21.8211 9.62067 21.8179 9.50165 21.7875 9.38817C21.5582 8.52623 21.2152 7.69865 20.7675 6.92723C20.7089 6.82628 20.6275 6.7404 20.5299 6.67644C20.4322 6.61248 20.321 6.57219 20.205 6.55879L17.9813 6.31129C17.8888 6.21379 17.795 6.12004 17.7 6.03004L17.4375 3.80067C17.424 3.68462 17.3836 3.57332 17.3195 3.47566C17.2554 3.37801 17.1693 3.29668 17.0682 3.23817C16.2965 2.79131 15.4689 2.44864 14.6072 2.21911C14.4937 2.18891 14.3746 2.18583 14.2596 2.21009C14.1447 2.23435 14.037 2.28529 13.9454 2.35879L12.2025 3.75004C12.0675 3.75004 11.9325 3.75004 11.7975 3.75004L10.05 2.35411C9.95829 2.28076 9.85059 2.23 9.73563 2.2059C9.62067 2.1818 9.50165 2.18504 9.38817 2.21536C8.52637 2.44507 7.69884 2.78806 6.92723 3.23536C6.82628 3.29397 6.7404 3.37535 6.67644 3.473C6.61248 3.57065 6.57219 3.68189 6.55879 3.79785L6.31129 6.02535C6.21379 6.11848 6.12004 6.21223 6.03004 6.3066L3.80067 6.56254C3.68462 6.57604 3.57332 6.61647 3.47566 6.6806C3.37801 6.74473 3.29668 6.83079 3.23817 6.93192C2.79131 7.70363 2.44864 8.53114 2.21911 9.39286C2.18891 9.50641 2.18583 9.62547 2.21009 9.74044C2.23435 9.8554 2.28529 9.96306 2.35879 10.0547L3.75004 11.7975C3.75004 11.9325 3.75004 12.0675 3.75004 12.2025L2.35411 13.95C2.28076 14.0418 2.23 14.1495 2.2059 14.2645C2.1818 14.3794 2.18504 14.4984 2.21536 14.6119C2.44466 15.4739 2.78767 16.3014 3.23536 17.0729C3.29397 17.1738 3.37535 17.2597 3.473 17.3236C3.57065 17.3876 3.68189 17.4279 3.79785 17.4413L6.02161 17.6888C6.11473 17.7863 6.20848 17.88 6.30286 17.97L6.56254 20.1994C6.57604 20.3155 6.61647 20.4268 6.6806 20.5244C6.74473 20.6221 6.83079 20.7034 6.93192 20.7619C7.70363 21.2088 8.53114 21.5514 9.39286 21.781C9.50641 21.8112 9.62547 21.8143 9.74044 21.79C9.8554 21.7657 9.96306 21.7148 10.0547 21.6413L11.7975 20.25C11.9325 20.2538 12.0675 20.2538 12.2025 20.25L13.95 21.6488C14.0418 21.7221 14.1495 21.7729 14.2645 21.797C14.3794 21.8211 14.4984 21.8179 14.6119 21.7875C15.4739 21.5582 16.3014 21.2152 17.0729 20.7675C17.1738 20.7089 17.2597 20.6275 17.3236 20.5299C17.3876 20.4322 17.4279 20.321 17.4413 20.205L17.6888 17.9813C17.7863 17.8888 17.88 17.795 17.97 17.7L20.1994 17.4375C20.3155 17.424 20.4268 17.3836 20.5244 17.3195C20.6221 17.2554 20.7034 17.1693 20.7619 17.0682C21.2088 16.2965 21.5514 15.4689 21.781 14.6072C21.8112 14.4937 21.8143 14.3746 21.79 14.2596C21.7657 14.1447 21.7148 14.037 21.6413 13.9454L20.25 12.2025ZM18.7407 11.5932C18.7566 11.8642 18.7566 12.1359 18.7407 12.4069C18.7295 12.5925 18.7876 12.7755 18.9038 12.9207L20.2341 14.5829C20.0815 15.068 19.886 15.5386 19.65 15.9891L17.5313 16.2291C17.3468 16.2496 17.1764 16.3378 17.0532 16.4766C16.8727 16.6796 16.6805 16.8718 16.4775 17.0522C16.3387 17.1755 16.2505 17.3458 16.23 17.5304L15.9947 19.6472C15.5443 19.8833 15.0736 20.0788 14.5885 20.2313L12.9254 18.901C12.7923 18.7946 12.627 18.7368 12.4566 18.7369H12.4116C12.1406 18.7529 11.8689 18.7529 11.5979 18.7369C11.4123 18.7257 11.2292 18.7839 11.0841 18.9L9.41723 20.2313C8.9321 20.0786 8.4615 19.8832 8.01098 19.6472L7.77098 17.5313C7.7505 17.3468 7.66231 17.1764 7.52348 17.0532C7.32052 16.8727 7.12831 16.6805 6.94785 16.4775C6.8246 16.3387 6.65424 16.2505 6.46973 16.23L4.35286 15.9938C4.11679 15.5433 3.92132 15.0727 3.76879 14.5875L5.0991 12.9244C5.21527 12.7793 5.2734 12.5962 5.26223 12.4107C5.24629 12.1397 5.24629 11.8679 5.26223 11.5969C5.2734 11.4114 5.21527 11.2283 5.0991 11.0832L3.76879 9.41723C3.92144 8.9321 4.1169 8.4615 4.35286 8.01098L6.46879 7.77098C6.65331 7.7505 6.82367 7.66231 6.94692 7.52348C7.12738 7.32052 7.31958 7.12831 7.52254 6.94785C7.66193 6.82452 7.75048 6.65377 7.77098 6.46879L8.00629 4.35286C8.45676 4.11679 8.92737 3.92132 9.41254 3.76879L11.0757 5.0991C11.2208 5.21527 11.4039 5.2734 11.5894 5.26223C11.8604 5.24629 12.1322 5.24629 12.4032 5.26223C12.5887 5.2734 12.7718 5.21527 12.9169 5.0991L14.5829 3.76879C15.068 3.92144 15.5386 4.1169 15.9891 4.35286L16.2291 6.46879C16.2496 6.65331 16.3378 6.82367 16.4766 6.94692C16.6796 7.12738 16.8718 7.31958 17.0522 7.52254C17.1755 7.66137 17.3458 7.74956 17.5304 7.77004L19.6472 8.00535C19.8833 8.45583 20.0788 8.92644 20.2313 9.4116L18.901 11.0747C18.7837 11.2211 18.7255 11.406 18.7379 11.5932H18.7407Z" fill="black"/>
                    </svg>
                    }
                >
                  <span
                    className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    // style={{color:'#8C8C8C'}}
                    style={active === 'Configuration' ? { color: "#034661" } : { color: "#8C8C8C" }}
                  >
                    Configuration
                  </span>
                </MenuItem>
              </Link>
              <Link
                to=""
                onClick={() => handleLinkClickName("Planning")}
                style={{ textDecoration: "none", color: "white" }}
              >
                <MenuItem
                  style={active === 'Planning' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}
                  className="label"
                  // icon={<FcDataConfiguration className="sidebar-icon" style={{color:'#505050'}}/>}
                  icon={<svg className="sidebar-icon" style={{color:'#505050'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 3H17.25V2.25C17.25 2.05109 17.171 1.86032 17.0303 1.71967C16.8897 1.57902 16.6989 1.5 16.5 1.5C16.3011 1.5 16.1103 1.57902 15.9697 1.71967C15.829 1.86032 15.75 2.05109 15.75 2.25V3H8.25V2.25C8.25 2.05109 8.17098 1.86032 8.03033 1.71967C7.88968 1.57902 7.69891 1.5 7.5 1.5C7.30109 1.5 7.11032 1.57902 6.96967 1.71967C6.82902 1.86032 6.75 2.05109 6.75 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM6.75 4.5V5.25C6.75 5.44891 6.82902 5.63968 6.96967 5.78033C7.11032 5.92098 7.30109 6 7.5 6C7.69891 6 7.88968 5.92098 8.03033 5.78033C8.17098 5.63968 8.25 5.44891 8.25 5.25V4.5H15.75V5.25C15.75 5.44891 15.829 5.63968 15.9697 5.78033C16.1103 5.92098 16.3011 6 16.5 6C16.6989 6 16.8897 5.92098 17.0303 5.78033C17.171 5.63968 17.25 5.44891 17.25 5.25V4.5H19.5V7.5H4.5V4.5H6.75ZM19.5 19.5H4.5V9H19.5V19.5Z" fill="black"/>
                          </svg>}
                >
                  <span
                    className={isExpanded ? "sidebar-text-show" : "sidebar-text"}
                    // style={{color:'#8C8C8C'}}
                    style={active === 'Planning' ? { color: "#034661" } : { color: "#8C8C8C" }}
                  >
                    Planning
                  </span>
                </MenuItem>
              </Link>
              {/* <SubMenu
                label="Planning"
                // icon={<TbReportSearch className="sidebar-icon" style={{color:'#505050'}}/>}
                icon={<svg className="sidebar-icon" style={{color:'#505050'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 3H17.25V2.25C17.25 2.05109 17.171 1.86032 17.0303 1.71967C16.8897 1.57902 16.6989 1.5 16.5 1.5C16.3011 1.5 16.1103 1.57902 15.9697 1.71967C15.829 1.86032 15.75 2.05109 15.75 2.25V3H8.25V2.25C8.25 2.05109 8.17098 1.86032 8.03033 1.71967C7.88968 1.57902 7.69891 1.5 7.5 1.5C7.30109 1.5 7.11032 1.57902 6.96967 1.71967C6.82902 1.86032 6.75 2.05109 6.75 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM6.75 4.5V5.25C6.75 5.44891 6.82902 5.63968 6.96967 5.78033C7.11032 5.92098 7.30109 6 7.5 6C7.69891 6 7.88968 5.92098 8.03033 5.78033C8.17098 5.63968 8.25 5.44891 8.25 5.25V4.5H15.75V5.25C15.75 5.44891 15.829 5.63968 15.9697 5.78033C16.1103 5.92098 16.3011 6 16.5 6C16.6989 6 16.8897 5.92098 17.0303 5.78033C17.171 5.63968 17.25 5.44891 17.25 5.25V4.5H19.5V7.5H4.5V4.5H6.75ZM19.5 19.5H4.5V9H19.5V19.5Z" fill="black"/>
                          </svg>}
                style={{ backgroundColor: "#ffffff",color:'#8C8C8C' }} // Add this style
              >
                <MenuItem className="menu-item" style={active === 'Excavator Allocation' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                  <Link
                    to=""
                    onClick={() => handleLinkClickName('Excavator Allocation')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show" style={active === 'Excavator Allocation' ? { color: "#034661" } : { color: "#8C8C8C" }}>Excavator Allocation</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Truck-Excavator Allocation' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                  <Link
                    to=""
                    onClick={() => handleLinkClickName('Truck-Excavator Allocation')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show" style={active === 'Truck-Excavator Allocation' ? { color: "#034661" } : { color: "#8C8C8C" }}>Truck-Excavator Allocation</span>
                  </Link>
                </MenuItem>
              </SubMenu> */}
              <SubMenu
                label="Operations"
                // icon={<TbReportSearch className="sidebar-icon" style={{color:'#505050'}}/>}
                icon={<svg className="sidebar-icon" style={{color:'#505050'}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.5316 17.4722C18.6715 17.6127 18.7501 17.803 18.7501 18.0014C18.7501 18.1998 18.6715 18.3901 18.5316 18.5306C18.4294 18.6309 16.0144 21 12 21C8.49469 21 5.95031 18.9 4.5 17.2641V19.5C4.5 19.6989 4.42098 19.8897 4.28033 20.0303C4.13968 20.171 3.94891 20.25 3.75 20.25C3.55109 20.25 3.36032 20.171 3.21967 20.0303C3.07902 19.8897 3 19.6989 3 19.5V15C3 14.8011 3.07902 14.6103 3.21967 14.4697C3.36032 14.329 3.55109 14.25 3.75 14.25H8.25C8.44891 14.25 8.63968 14.329 8.78033 14.4697C8.92098 14.6103 9 14.8011 9 15C9 15.1989 8.92098 15.3897 8.78033 15.5303C8.63968 15.671 8.44891 15.75 8.25 15.75H5.1975C6.3525 17.1891 8.71875 19.5 12 19.5C15.375 19.5 17.4506 17.4881 17.4713 17.4675C17.6125 17.3276 17.8035 17.2495 18.0024 17.2503C18.2012 17.2512 18.3915 17.331 18.5316 17.4722ZM20.25 3.75C20.0511 3.75 19.8603 3.82902 19.7197 3.96967C19.579 4.11032 19.5 4.30109 19.5 4.5V6.73594C18.0497 5.1 15.5053 3 12 3C7.98563 3 5.57063 5.36906 5.46938 5.46938C5.3284 5.60986 5.249 5.80059 5.24865 5.99961C5.24829 6.19863 5.32702 6.38965 5.4675 6.53063C5.60798 6.6716 5.79871 6.751 5.99774 6.75135C6.19676 6.75171 6.38777 6.67298 6.52875 6.5325C6.54938 6.51187 8.625 4.5 12 4.5C15.2812 4.5 17.6475 6.81094 18.8025 8.25H15.75C15.5511 8.25 15.3603 8.32902 15.2197 8.46967C15.079 8.61032 15 8.80109 15 9C15 9.19891 15.079 9.38968 15.2197 9.53033C15.3603 9.67098 15.5511 9.75 15.75 9.75H20.25C20.4489 9.75 20.6397 9.67098 20.7803 9.53033C20.921 9.38968 21 9.19891 21 9V4.5C21 4.30109 20.921 4.11032 20.7803 3.96967C20.6397 3.82902 20.4489 3.75 20.25 3.75Z" fill="black"/>
                      </svg>
                      }
                style={{ backgroundColor: "#ffffff",color:'#8C8C8C' }} // Add this style
              >
                <MenuItem className="menu-item" style={active === ' Monitoring' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                  <Link
                    to=""
                    onClick={() => handleLinkClickName(' Monitoring')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show" style={active === ' Monitoring' ? { color: "#034661" } : { color: "#8C8C8C" }}>Monitoring</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Equipment Status' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                  <Link
                    to=""
                    onClick={() => handleLinkClickName('Equipment Status')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show" style={active === 'Equipment Status' ? { color: "#034661" } : { color: "#8C8C8C" }}>Equipment Status</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Production Status' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                  <Link
                    to=""
                    onClick={() => handleLinkClickName('Production Status')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show" style={active === 'Production Status' ? { color: "#034661" } : { color: "#8C8C8C" }}>Production Status                    </span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Dashboard' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                  <Link
                    to=""
                    onClick={() => handleLinkClickName('Dashboard')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show" style={active === 'Dashboard' ? { color: "#034661" } : { color: "#8C8C8C" }}>Dashboard</span>
                  </Link>
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="Analytics"
                // icon={<TbReportSearch className="sidebar-icon" style={{color:'#505050'}}/>}
                icon={<svg className="sidebar-icon" style={{color:'#505050'}}viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.75 19.5C21.75 19.6989 21.671 19.8897 21.5303 20.0303C21.3897 20.171 21.1989 20.25 21 20.25H3C2.80109 20.25 2.61032 20.171 2.46967 20.0303C2.32902 19.8897 2.25 19.6989 2.25 19.5V4.5C2.25 4.30109 2.32902 4.11032 2.46967 3.96967C2.61032 3.82902 2.80109 3.75 3 3.75C3.19891 3.75 3.38968 3.82902 3.53033 3.96967C3.67098 4.11032 3.75 4.30109 3.75 4.5V13.3472L8.50594 9.1875C8.63535 9.07421 8.79978 9.00885 8.97165 9.00236C9.14353 8.99587 9.31241 9.04866 9.45 9.15188L14.9634 13.2872L20.5059 8.4375C20.5786 8.36556 20.6652 8.30925 20.7605 8.27201C20.8557 8.23478 20.9575 8.21741 21.0597 8.22097C21.1619 8.22454 21.2623 8.24896 21.3547 8.29275C21.4471 8.33653 21.5296 8.39875 21.5971 8.47558C21.6645 8.5524 21.7156 8.64222 21.7471 8.7395C21.7786 8.83678 21.7899 8.93948 21.7802 9.04128C21.7706 9.14307 21.7402 9.24182 21.691 9.33146C21.6418 9.42109 21.5748 9.49972 21.4941 9.5625L15.4941 14.8125C15.3646 14.9258 15.2002 14.9912 15.0283 14.9976C14.8565 15.0041 14.6876 14.9513 14.55 14.8481L9.03656 10.7147L3.75 15.3403V18.75H21C21.1989 18.75 21.3897 18.829 21.5303 18.9697C21.671 19.1103 21.75 19.3011 21.75 19.5Z" fill="black"/>
                          </svg>
                      }
                style={{ backgroundColor: "#ffffff",color:'#8C8C8C' }} // Add this style
              >
                <MenuItem className="menu-item" style={active === 'Replay Analysis' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                  <Link
                    to="/TipperView"
                    onClick={() => handleLinkClickName('Replay Analysis')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show" style={active === 'Replay Analysis' ? { color: "#034661" } : { color: "#8C8C8C" }}>Replay Analysis</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" style={active === 'Activity Analysis' ? { backgroundColor: "#E6ECEF" } : { backgroundColor: "#ffffff" }}>
                  <Link
                    to="/SveltaWithDropDown" //sveltCharts
                    onClick={() => handleLinkClickName('Activity Analysis')}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <span className="sidebar-text-show" style={active === 'Activity Analysis' ? { color: "#034661" } : { color: "#8C8C8C" }}>Activity Analysis</span>
                  </Link>
                </MenuItem>
              </SubMenu>
            </div>
          }
        </Menu>
      </div>
    </div>
  );
}
export default Sidebar;
