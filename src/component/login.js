import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getEmployees } from "../api/shovelDetails";
import AuthContext from "../context/AuthProvider";
import { BASE_URL } from "../constants/apiConstants";

import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Button } from "react-bootstrap";
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
// import Visibility from '@mui/material/Visibility';
// import VisibilityOff from '@mui/material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
  FormControl,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Checkbox,
} from '@mui/material';

function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const [employeedata, setemployeedata] = useState([]);
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [name, setName] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [email, setEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleRegisterUsername = (event) => {
    setRegisterUsername(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleRegisterPassword = (event) => {
    setRegisterPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleClickShowRegisterPassword = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  const handleMouseDownRegisterPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    showEmployees();
    if (auth?.username) {
      navigate("/showRoutes");
    }
  }, [auth]);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const showEmployees = async (key) => {
    const responsedata = await getEmployees();
    setemployeedata(responsedata, key);
  };

  const handlename = (event) => {
    setUsername(event.target.value);
  };
  const handlepassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Use async/await to wait for each request to complete
      const data = { userName: username, password: password };
      const response = await axios.post(`${BASE_URL}/api/auth`, data, {
        withCredentials: true,
      });
      const { accessToken, designation, empId, empTypeId } = response?.data;
      setAuth({ username, accessToken, designation, empId, empTypeId });
      navigate("/ShowRoutes");
      console.log(response);
    } catch (error) {
      toast.error(<span>{error.response.data.message}</span>);
      console.log("Error Logging in", error);
      return;
    }
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handleLogout = async (event) => {
  //   event.preventDefault();
  //   try {
  //     // Use async/await to wait for each request to complete
  //     const data = { userName: username, password: password }
  //     const response = await axios.post("http://localhost:5000/api/auth/logout", data);
  //     const { accessToken, designation, empId } = response?.data;
  //     setAuth({ username, accessToken, designation, empId })
  //     navigate("/login");
  //     console.log(response);
  //   } catch (error) {
  //     toast.error(<span>{error.response.data.message}</span>)
  //     console.log('Error Logging in', error);
  //     return;
  //   }
  //   console.log(`Logged Out username: ${username} and password: ${password}`);
  // };
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100 mt-5">
        <div className="col-md-6 col-sm-12 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Login/Register</h2>
              <MDBTabs
                pills
                justify
                className="mb-3 d-flex flex-row justify-content-between"
              >
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleJustifyClick("tab1")}
                    active={justifyActive === "tab1"}
                    style={
                      justifyActive === "tab1"
                        ? { backgroundColor: "#034661", color: "#ffffff" }
                        : { backgroundColor: "#ffffff", color: "#034661" }
                    }
                  >
                    Login
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}
                    style={
                      justifyActive === "tab2"
                        ? { backgroundColor: "#034661", color: "#ffffff" }
                        : { backgroundColor: "#ffffff", color: "#034661" }
                    }
                  >
                    Register
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent>
                <MDBTabsPane show={justifyActive === "tab1"}>
                  <div className="form-group mb-4">
                    <FormControl sx={{ width: '30ch', height: '5ch' }} variant="outlined">
                      <TextField
                        required
                        value={username}
                        onChange={handlename}
                        id="outlined-required"
                        label="Username"
                      />
                    </FormControl>

                  </div>
                  <div className="form-group mb-4">
                    <FormControl sx={{ width: '30ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlepassword}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password*"
                      />
                    </FormControl>

                  </div>
                  <div className="d-flex flex-row justify-content-between">

                    <div className="mb-4">
                      <Checkbox />
                      <label className="form-label" htmlFor="remember">Remember me</label>
                    </div>
                    <div className="mt-2">
                      <a href="#" >Forgot Password?</a>
                    </div>
                  </div>
                </MDBTabsPane>
                <MDBTabsPane show={justifyActive === "tab2"}>
                  <div className="form-group mb-4">
                    <FormControl sx={{ width: '30ch', height: '5ch' }} variant="outlined">
                      <TextField
                        required
                        value={name}
                        onChange={handleName}
                        id="outlined-required"
                        label="Name"
                      />
                    </FormControl>
                  </div>
                  <div className="form-group mb-4">
                    <FormControl sx={{ width: '30ch' }} variant="outlined">
                      <TextField
                        required
                        value={registerUsername}
                        onChange={handleRegisterUsername}
                        id="outlined-required"
                        label="Username"
                      />
                    </FormControl>
                  </div>
                  <div className="form-group mb-4">
                    <FormControl sx={{ width: '30ch' }} variant="outlined">
                      <TextField
                        required
                        value={email}
                        onChange={handleEmail}
                        id="outlined-required"
                        label="Email"
                      />
                    </FormControl>
                  </div>
                  <div className="form-group mb-4">
                    <FormControl sx={{ width: '30ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={showRegisterPassword ? 'text' : 'password'}
                        value={registerPassword}
                        onChange={handleRegisterPassword}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowRegisterPassword}
                              onMouseDown={handleMouseDownRegisterPassword}
                              edge="end"
                            >
                              {showRegisterPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password*"
                      />
                    </FormControl>
                  </div>
                  <div className="form-group mb-4">
                    <FormControl sx={{ width: '30ch' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                      <OutlinedInput
                        required
                        id="outlined-adornment-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password*"
                      />
                    </FormControl>
                  </div>
                </MDBTabsPane>

                {/* <MDBTabsPane show={justifyActive === "tab2"}>
                  <div className="form-group mb-2">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                  </div>
                </MDBTabsPane> */}
              </MDBTabsContent>
              <div className="text-center ">
                <Button variant="outlined" color="error" className="mr-2"
                // className="btn btn-block mt-3 mb-2"
                // style={{ backgroundColor: "#034661", color: "#ffffff" }}
                // onClick={handleLogin}
                >
                  Cancel
                </Button>
                <Button variant="outlined" color="success"
                  // className="btn btn-block mt-3 mb-2"
                  // style={{ backgroundColor: "#034661", color: "#ffffff" }}
                  onClick={handleLogin}
                >
                  {justifyActive === "tab1" ? "LOG IN" : "Register"}
                </Button>
              </div>

            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>

  );
}

export default UserLogin;
