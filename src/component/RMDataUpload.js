// AnotherComponent.js
import React, { useState, useEffect, useContext } from "react";
import { FaXmark, FaCheck } from "react-icons/fa6";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../constants/apiConstants";
import { Form } from "react-bootstrap";
import AuthContext from "../context/AuthProvider";
import { getNodeMaster } from "../api/shovelDetails";

function RawMaterialData() {
    const { auth } = useContext(AuthContext)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const toggleSidebar = () => {
        setSidebarCollapsed((prevState) => !prevState);
        console.log(sidebarCollapsed);
    };

    const [inputData, setInputData] = useState({});
    const [NodeMaster, setgetNodeMaster] = useState();
    const [data, setData] = useState([]);

    // Employee data ------------inputData

    useEffect(() => {
        // Fetch data from the API when the component mounts
        const apiUrl =
            `${BASE_URL}/api/dataRecord`;
        axios
            .get(apiUrl)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                // const routedata.push(response.data)
                // console.log(routedata,"passing to the variable")
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        const apiUrl =
            `${BASE_URL}/api/nodeMaster`;
        axios
            .get(apiUrl)
            .then((response) => {
                console.log(response.data);
                setgetNodeMaster(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const getQuantity = (value) => {
        const itemCode = getItemCode(value);
        const item = data.filter((val) => val.IT_CODE === itemCode);
        return (value?.weight * 1000 / +item[0]?.meterWeight);
    };

    const getItemCode = (value) => {
        const item = data.filter((val) => val?.micronlevel === value?.micronlevel && val?.size === value?.size && val?.type === value?.type);
        console.log(item);
        return item[0]?.IT_CODE;
    };

    const getPayload = () => {
        if (!getItemCode(inputData)) return null;
        const dataPayload = [{
            activityId: inputData?.activityId,
            Availablequantity2: +inputData?.weight,
            Balancequantity2: +inputData?.weight,
            Consumedquantity1: 0,
            Consumedquantity2: 0,
            ItemCode: getItemCode(inputData),
            Availablequantity1: getQuantity(inputData),
            Balancequantity1: getQuantity(inputData),
            MaterialId: inputData.MaterialId,
            // consumedActivityId: null,
            // shift: null,
            // date: null,
            // MachinenodeId: null,
            // jobId: null,
            // FGID: null,
            // MaterialId: null,
            // units1: null,
            // units2: null,
            // userId: null,
            // branchId: null,
        }];

        return dataPayload;
    };

    const getBatchMasterPayload = () => {
        const meterQty = getQuantity(inputData);
        const dataPayload = [{
            branchId: '1001',
            activityId: inputData?.activityId,
            nodeId: inputData?.MaterialId,
            producedQty1: meterQty,
            consumedQty1: 0,
            balanceQty1: meterQty,
            units1: "1",
            producedQty2: +inputData?.weight,
            consumedQty2: 0,
            balanceQty2: +inputData?.weight,
            units2: "2",
            lastConsumedAt: null,
            conversionRate: +inputData?.weight / meterQty,
            userId: '',
        }]
        return dataPayload;
    };

    const createBatchMasterData = async () => {
        try {

            const payload = getBatchMasterPayload();
            if (payload == null) {
                toast.warning(
                    <span>Please enter valid details</span>,
                    {
                        position: toast.POSITION.TOP_RIGHT, // Set position to top center
                        // autoClose: 3000, // Optional: Set auto close time in milliseconds
                        // closeButton: false, // Optional: Hide close button
                        className: 'custom-toast' // Optional: Add custom CSS class
                    }
                );
                return;
            }
            const updatedData = {
                newBatch: payload
            }

            const response = await axios.put(`${BASE_URL}/api/batchMaster/bulk`, updatedData);
            toast.success(
                <p><strong>Data Saved</strong> Successfully.</p>,
                {
                    position: toast.POSITION.TOP_RIGHT, // Set position to top center
                    // autoClose: 3000, // Optional: Set auto close time in milliseconds
                    // closeButton: false, // Optional: Hide close button
                    className: 'custom-toast' // Optional: Add custom CSS class
                  }
            );
            console.log(response);
            console.log('Data saved Successfully');
            setInputData(null)
            return;

        } catch (error) {
            console.log('Error while submitting the Data', error);
            toast.error('Error while submitting the Data',
            {
                position: toast.POSITION.TOP_RIGHT, // Set position to top center
                // autoClose: 3000, // Optional: Set auto close time in milliseconds
                // closeButton: false, // Optional: Hide close button
                className: 'custom-toast' // Optional: Add custom CSS class
              }
        );
            return []
        }
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const payload = getPayload();
            if (payload == null) {
                toast.warning(
                    <span>Please enter valid details</span>,
                    {
                        position: toast.POSITION.TOP_RIGHT, // Set position to top center
                        // autoClose: 3000, // Optional: Set auto close time in milliseconds
                        // closeButton: false, // Optional: Hide close button
                        className: 'custom-toast' // Optional: Add custom CSS class
                      }
                );
                return;
            }
            const updatedData = {
                newBatch: payload
            }

            const response = await axios.put(`${BASE_URL}/api/batch/bulk`, updatedData);
            console.log(response);
            console.log('Data saved Successfully');
            createBatchMasterData();
            return;

        } catch (error) {
            console.log('Error while submitting the Data', error);
            toast.error('Error while submitting the Data',
            {
                position: toast.POSITION.TOP_RIGHT, // Set position to top center
                // autoClose: 3000, // Optional: Set auto close time in milliseconds
                // closeButton: false, // Optional: Hide close button
                className: 'custom-toast' // Optional: Add custom CSS class
              }
        );
            return []
        }
    };

    return (
        <div>
            <div
                style={{
                    width: sidebarCollapsed ? "5%" : "20%",
                    transition: "width 0.1s",
                    zIndex: 2,
                    overflow: "hidden",
                    backgroundColor: "red",
                }}
            >
                {/* <Sidebar onSidebarClick={toggleSidebar} /> */}
            </div>
            <div
                style={{ width: "100%", height: "100%" }}
            >
                <form onSubmit={handleSubmit}>
                    <div className="container-fluid">
                        <div className="col-12 p-2">
                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="row">
                                    <div className="offset-0 col-4">
                                            <label htmlFor="Type">Node Id:</label>
                                        </div>
                                        <div className="col-8">
                                            <Form.Select
                                                className="form-control mt-1"
                                                id="Node Id"
                                                name="Node Id"
                                                value={inputData?.MaterialId || ''}
                                                onChange={(e) => setInputData({ ...inputData, MaterialId: e.target.value })}
                                            >
                                                <option value="" hidden>Please Select</option>
                                                {NodeMaster?.filter((item)=>item.nodeCategory === 'Raw Material').map((item)=>
                                                <option value={item.nodeId}>{item.nodeId} - {item.nodeName}</option>
                                                )}
                                            </Form.Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="offset-0 col-4">
                                            <label htmlFor="userName">Batch / Activity Id:</label>
                                        </div>
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                id="activity"
                                                name="activity"
                                                class="form-control"
                                                value={inputData?.activityId || ''}
                                                onChange={(e) => setInputData({ ...inputData, activityId: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-4 ">
                                            <label htmlFor="size">Size:</label>
                                        </div>
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                id="size"
                                                name="size"
                                                className="form-control"
                                                value={inputData?.size || ""}
                                                onChange={(e) => setInputData({ ...inputData, size: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="offset-0 col-4">
                                            <label htmlFor="Type">Type:</label>
                                        </div>
                                        <div className="col-8">
                                            <Form.Select
                                                className="form-control mt-1"
                                                id="type"
                                                name="type"
                                                value={inputData?.type || ''}
                                                onChange={(e) => setInputData({ ...inputData, type: e.target.value })}
                                            >
                                                <option value="" hidden>Please Select</option>
                                                <option >GLOSS</option>
                                                <option >MATT</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="offset-0 col-4">
                                            <label htmlFor="EmployeeID">Micron Level:</label>
                                        </div>
                                        <div className="col-8">
                                            <Form.Select
                                                className="form-control mt-1"
                                                id="MicronLevel"
                                                name="MicronLevel"
                                                value={inputData?.micronlevel || ''}
                                                onChange={(e) => setInputData({ ...inputData, micronlevel: e.target.value })}
                                            >
                                                <option value="" hidden>Please Select</option>
                                                <option >15</option>
                                                <option >12</option>
                                            </Form.Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-4">
                                            <label htmlFor="branchID">Weight:</label>
                                        </div>
                                        <div className="col-8">
                                            <input
                                                type="text"
                                                id="Designation"
                                                name="Designation"
                                                className="form-control"
                                                value={inputData?.weight || ''}
                                                onChange={(e) => setInputData({ ...inputData, weight: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className=" row">
                                <div className="col-6">
                                    <div className=" offset-0 col-6">
                                        <button className=" btn btn-success" type="submit">
                                            <FaCheck />
                                        </button>
                                        &nbsp;
                                        <a onClick={""} className="btn btn-danger">
                                            <FaXmark />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default RawMaterialData;