import * as React from "react";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DashboardDrawer from "../component/dashboardDrawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../component/profile";
import Stack from "@mui/material/Stack";
import { getJobAssign } from "../api/shovelDetails";
import { BASE_URL } from "../constants/apiConstants";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import "./slider.css";
import { getShifts } from "../api/shovelDetails";
import { format } from "date-fns";
import { IoFilterSharp } from "react-icons/io5";
import { AiFillCloseSquare } from "react-icons/ai";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AppBarContainer = () => {
  const navigate = useNavigate();
  const { auth } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setAuth } = React.useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [shiftData, setShiftMaster] = React.useState([]);

  const showShiftMaster = async (key) => {
    const responsedata = await getShifts();
    setShiftMaster(responsedata, key);
  };
  React.useEffect(() => {
    showShiftMaster();
  }, []);

  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // Update the current time every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const shiftST = shiftData.map((item) => item.startTime);
  const shiftET = shiftData.map((item) => item.endTime);

  console.log(shiftST, "shiftdata");
  console.log(shiftET, "shiftdata");
  console.log(formattedTime, "shiftdata");

  // function getShiftNumber() {
  //   if (formattedTime >= shiftST[0] && shiftET[0] >= formattedTime) {
  //     const firstShift = shiftData.map((item) => item.shiftNumber);
  //     console.log(firstShift[0],"shiftdata")
  //     return firstShift[0];
  //   } else {
  //     const SecondShift = shiftData.map((item) => item.shiftNumber);
  //     console.log(SecondShift[1],"shiftdata")
  //     // setShiftId(SecondShift[1]); // Update the shiftId state
  //     return SecondShift[1];
  //   }
  // }
  // getShiftNumber();
  const getCurrentShift = () => {
    const currentTimeStr = format(currentTime, "HH:mm:ss");

    const currentShift = shiftData.find((shift) => {
      const shiftStart = shift.startTime;
      const shiftEnd = shift.endTime;

      if (shiftStart <= shiftEnd) {
        // Normal shift that doesn't span midnight
        return currentTimeStr >= shiftStart && currentTimeStr < shiftEnd;
      } else {
        // Shift that spans midnight
        return currentTimeStr >= shiftStart || currentTimeStr < shiftEnd;
      }
    });

    return currentShift ? currentShift.shiftId : "No shift running";
  };

  const currentShiftName = getCurrentShift();
  console.log(currentShiftName, "shiftdata");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [selectedItem, setselectedItem] = React.useState();
  const HanldeSetting = (selecteditem) => {
    setselectedItem(selecteditem);
    if (selecteditem === "Dashboard") {
      navigate("/showRoutes");
    }
    if (selecteditem === "Logout") {
      // navigate("/Login")
      handleLogout();
    }
  };
  const handleLogout = async (event) => {
    // event.preventDefault();
    try {
      // Use async/await to wait for each request to complete
      const data = { userName: username, password: password };
      const response = await axios.post(`${BASE_URL}/api/auth/logout`, data, {
        withCredentials: true,
      });
      const { accessToken, designation, empId, empTypeId } = response?.data;
      setAuth({ username, accessToken, designation, empId, empTypeId });
      navigate("/Login");
      console.log(response);
    } catch (error) {
      toast.error(<span>{error.response.data.message}</span>);
      console.log("Error Logging in", error);
      return;
    }
    console.log(`Logged Out username: ${username} and password: ${password}`);
  };

  const HandleBoolean = (item) => {
    setselectedItem(item);
  };

  const [Icon1, setIcon1] = React.useState(false);
  const [Icon2, setIcon2] = React.useState(false);
  const [Icon3, setIcon3] = React.useState(false);
  const [Icon4, setIcon4] = React.useState(false);
  const [filterCont, setfilterCont] = React.useState(false);

  const handleFiltering = () => {
    setfilterCont(!filterCont);
    setIcon1(false)
    setIcon2(false)
    setIcon3(false)
    setIcon4(false)
  };
  const HandleCloseFilter = () => {
    setfilterCont(false)
  }

  const HandleFilterClick = (selectedItem) => {
    console.log(selectedItem,"selectedItem")
    if(selectedItem){
      setfilterCont(false)
    }
  }

  const handleIcon1Menu1 = () => {
    setIcon1(!Icon1);
    setIcon2(false);
    setIcon3(false);
    setIcon4(false);
    setfilterCont(false);
  };
  const handleIcon1Menu2 = () => {
    setIcon2(!Icon2);
    setIcon1(false);
    setIcon4(false);
    setIcon3(false);
    setfilterCont(false);
  };
  const handleIcon1Menu3 = () => {
    setIcon3(!Icon3);
    setIcon1(false);
    setIcon2(false);
    setIcon4(false);
    setfilterCont(false);
  };
  const handleIcon1Menu4 = () => {
    setIcon4(!Icon4);
    setIcon3(false);
    setIcon2(false);
    setIcon1(false);
    setfilterCont(false);
  };

  return (
    <AppBar
      style={{
        position: "fixed",
        height: "45px",
        // backgroundColor:'#fc9445'
        backgroundColor: "#ffffff",
      }}
    >
      <DashboardDrawer
        drawerOption="bottom"
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
      />
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex", paddingBottom: "17px" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }} // Flexbox styles
          >
            <Link to="/" style={{ cursor: "pointer" }}>
              <Box
                component="img"
                sx={{
                  height: 40,
                  // width: 125,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  marginLeft: -1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "10px",
                }}
                alt="logo."
                src="./Mineoptic Sticker.jpg"
              />
            </Link>
          </Box>{" "}
          &nbsp; &nbsp;
          {/* <Box sx={{ flexGrow: 0}} id="Marquee">
              <div className="marquee-content" style={{backgroundColor:'white',color:'white'}}>
                  Important Announcement: Please note that the system will be down for maintenance on Saturday from 3 PM to 6 PM.
              </div>
          </Box> */}
          {/* <Box sx={{ flexGrow: 0}}>
              <IoFilterSharp/>
          </Box> */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              position: "relative",
              left: "1%",
              color: "",
              backgroundColor: "transparent",
            }}
          >
            {/* {pages.map((page) => ( */}
            <MenuItem
              sx={{
                color: "white",
                display: "flex",
                fontWeight: 700,
                fontSize: "1rem",
              }}
              onClick={handleFiltering}
            >
              <Typography variant="body1" component="div">
                <Stack spacing={2} direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    component="span"
                    className="text-dark"
                  >
                    Filter &nbsp;
                    <IoFilterSharp />
                  </Typography>
                </Stack>
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{
                color: "white",
                display: "flex",
                fontWeight: 700,
                fontSize: "1rem",
              }}
              onClick={handleIcon1Menu1}
            >
              <Typography variant="body1" component="div">
                <Stack spacing={2} direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    component="span"
                    className="text-dark"
                    src="./manufacturing.png"
                  >
                    Production &nbsp;
                    <img
                      src="./manufacturing.png"
                      alt="img"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </Typography>
                </Stack>
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{
                color: "white",
                display: "flex",
                fontWeight: 700,
                fontSize: "1rem",
              }}
              onClick={handleIcon1Menu2}
            >
              <Typography variant="body1" component="div">
                <Stack spacing={2} direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    component="span"
                    className="text-dark"
                  >
                    equipment utilization &nbsp;
                    <img
                      src="./equipment.png"
                      alt="img"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </Typography>
                </Stack>
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{
                color: "white",
                display: "flex",
                fontWeight: 700,
                fontSize: "1rem",
              }}
              onClick={handleIcon1Menu3}
            >
              <Typography variant="body1" component="div">
                <Stack spacing={2} direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    component="span"
                    className="text-dark"
                  >
                    Total Lead &nbsp;
                    <img
                      src="./fast-delivery.png"
                      alt="img"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </Typography>
                </Stack>
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{
                color: "white",
                display: "flex",
                fontWeight: 700,
                fontSize: "1rem",
              }}
              onClick={handleIcon1Menu4}
            >
              <Typography variant="body1" component="div">
                <Stack spacing={2} direction="row" alignItems="center">
                  <Typography
                    variant="body1"
                    component="span"
                    className="text-dark"
                  >
                    Tons KMs &nbsp;
                    <img
                      src="./tonne.png"
                      alt="img"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </Typography>
                </Stack>
              </Typography>
            </MenuItem>
            {/* ))} */}
          </Box>
          <Box sx={{ flexGrow: 0, position: "relative", left: "4%" }}>
            <Stack spacing={1} direction="column" alignItems="flex-start">
              <Typography
                variant="body1"
                component="span"
                className="text-dark"
                style={{ fontSize: "12px" }}
              >
                Time:
              </Typography>
              <Typography
                variant="body1"
                component="span"
                className="text-dark"
                style={{ fontSize: "12px" }}
              >
                Refreshed At :
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 0, position: "relative", left: "10%" }}>
            <Stack spacing={1} direction="column" alignItems="flex-start">
              <Typography
                variant="body1"
                component="span"
                className="text-dark"
                style={{ fontSize: "12px" }}
              >
                Date:
              </Typography>
              <Typography
                variant="body1"
                component="span"
                className="text-dark"
                style={{ fontSize: "12px" }}
              >
                Shift : {currentShiftName}
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ flexGrow: 0, marginLeft: "200px" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => HanldeSetting(setting)}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {selectedItem === "Profile" && (
        <div
          style={{
            width: "500px",
            height: "300px",
            background: "whitesmoke",
            position: "fixed",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999, // Adjust the z-index as needed
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              right: "5px",
              color: "red",
              fontSize: "xx-large",
            }}
          >
            &times;
          </div>
          <Profile onclickclose={HandleBoolean} />
        </div>
      )}
      {Icon1 && <div id="Icons">Production</div>}
      {Icon2 && <div id="Icons">Equipment Utilization</div>}
      {Icon3 && <div id="Icons">Total Lead</div>}
      {Icon4 && <div id="Icons">Tons kms</div>}
      {filterCont && (
        <div id="FilterIcons">
          <li
          class="list-group-item"
          style={{cursor: "pointer"}}
        >
          <AiFillCloseSquare
            style={{ color: "red",fontSize:'20px',position:'relative',left:'88%'}}
            onClick={HandleCloseFilter}
          />
          </li>
          <ul class="list-group">
            <li id="listoptions" onClick={() => HandleFilterClick("Curret Shift")} class="list-group-item">Curret Shift</li>
            <li id="listoptions" onClick={() => HandleFilterClick("Today")} class="list-group-item">Today</li>
            <li id="listoptions" onClick={() => HandleFilterClick("Month to Day")} class="list-group-item">Month to Day</li>
            <li id="listoptions" onClick={() => HandleFilterClick("Year to Day")} class="list-group-item">Year to Day</li>
          </ul>
        </div>
      )}
    </AppBar>
  );
};

export default AppBarContainer;
