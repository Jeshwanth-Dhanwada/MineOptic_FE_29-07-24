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
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Nav";


function UserLogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const [employeedata, setemployeedata] = useState([]);
  const [justifyActive, setJustifyActive] = useState("tab1");

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
      const data = { userName: username, password: password }
      const response = await axios.post(`${BASE_URL}/api/auth`, data, { withCredentials: true });
      const { accessToken, designation, empId, empTypeId } = response?.data;
      setAuth({ username, accessToken, designation, empId, empTypeId })
      navigate("/ShowRoutes");
      console.log(response);

    } catch (error) {
      toast.error(<span>{error.response.data.message}</span>)
      console.log('Error Logging in', error);
      return;
    }
    console.log(`Logging in with username: ${username} and password: ${password}`);
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
    <div className="container-fluid" style={{position:'absolute'}}>
      {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <form className="pt-5" onSubmit={handleLogin}>
              <div className="row">
                <div className="col-2">
                  <label>Email :</label>
                </div>
                <div className="col-6">
                  <input
                    type="email"
                    value={email}
                    onChange={handleemail}
                    className="form-control"
                    name="email"
                    id="email"
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-2">
                  <label>Password :</label>
                </div>
                <div className="col-6">
                  <input
                    type="password"
                    value={password}
                    onChange={handlepassword}
                    className="form-control"
                    name="password"
                    id="password"
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-2">
                  <button className="btn btn-success">Login</button>&nbsp;
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <MDBInput
              wrapperClass="mb-4"
              label="User Name"
              id="text"
              value={username}
              onChange={handlename}
              type="name"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              value={password}
              onChange={handlepassword}
              id="Password"
              type="password"
            />
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <MDBInput wrapperClass="mb-2" label="Name" id="form1" type="text" />
            <MDBInput
              wrapperClass="mb-2"
              label="Username"
              id="form1"
              type="text"
            />
            <MDBInput
              wrapperClass="mb-2"
              label="Email"
              id="form1"
              type="email"
            />
            <MDBInput
              wrapperClass="mb-2"
              label="Password"
              id="form1"
              type="password"
            />
          </MDBTabsPane>
        </MDBTabsContent>
        <button className="mb-2 w-100 btn btn-primary" onClick={handleLogin}>
          Log In
        </button>
      </MDBContainer>
      <ToastContainer />
    </div>
  );
}

export default UserLogin;
