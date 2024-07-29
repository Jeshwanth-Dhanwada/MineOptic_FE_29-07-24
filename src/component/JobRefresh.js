import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaXmark, FaCheck } from "react-icons/fa6";
import "./sidebar.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from "react-bootstrap";
import { BASE_URL } from "../constants/apiConstants";
import AuthContext from "../context/AuthProvider";

function JobRefresh() {
    const { auth } = useContext(AuthContext)
    const [OA_DETdata, setOA_DETdata] = useState([]);
    const [ERPData, setERPData] = useState([]);
    const [itemMaster, setitemMaster] = useState([]);

    // ERPData(OA_DET2)------
    useEffect(() => {
        // Fetch data from the API when the component mounts
        const apiUrl = `${BASE_URL}/api/OA_DETRoute2`;
        axios
            .get(apiUrl)
            .then((response) => {
                setERPData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // OA_DET------
    useEffect(() => {
        // Fetch data from the API when the component mounts
        const apiUrl = `${BASE_URL}/api/OA_DETRoute`;
        axios
            .get(apiUrl)
            .then((response) => {
                console.log(response.data);
                setOA_DETdata(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Item Master ------
    useEffect(() => {
        // Fetch data from the API when the component mounts
        const apiUrl = `${BASE_URL}/api/itemmaster`;
        axios
            .get(apiUrl)
            .then((response) => {
                // console.log(response.data);
                setitemMaster(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        const startTime = performance.now();
        console.log(startTime, "starttime");
        const itemstoAdd = ERPData.filter((item) =>
            !OA_DETdata.some((oaitem) => oaitem.jobId === item.Job_id)
        )
        setNewJobs(itemstoAdd)
        // Record the end time after the data is set
        const endTime = performance.now();
        console.log(endTime, "endtime");

        const executionTime = endTime - startTime;
        console.log(`Execution time: ${executionTime} milliseconds`);

    }, [ERPData]);

    function getOADetails() {
        const apiUrl = `${BASE_URL}/api/OA_DETRoute`;
        axios
            .get(apiUrl)
            .then((response) => {
                // console.log(response.data);
                setOA_DETdata(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    function getOA_Det2() {
        const apiUrl = `${BASE_URL}/api/OA_DETRoute2`;
        axios
            .get(apiUrl)
            .then((response) => {
                // console.log(response.data);
                setERPData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const [showNewJobs, setshowNewJobs] = useState(true)
    const [NewJobs, setNewJobs] = useState([])
    const [checkeddata, setcheck] = useState([]);
    const [statusForNewJob, setStatusForNewJob] = useState({});
    //let checkddata = []

    const getJobDescription = (Itcode) => {
        const name = itemMaster.filter((item) => item.IT_CODE == Itcode)
            .map(item => item.IT_NAME)
        return name
    }

    const HandleStatusForNewJob = (e, jobId) => {
        const updatedStatus = { ...statusForNewJob };
        updatedStatus[jobId] = e.target.value;
        setStatusForNewJob(updatedStatus);
    }

    const handleCheckBox = (e, item, type) => {
        const isChecked = e.target.checked;
        console.log(isChecked);
        if (!isChecked) {
            const checkddata = checkeddata.filter((item1) => item1?.Job_id !== item?.Job_id);
            setcheck(checkddata)
        } else {
            if (!statusForNewJob[item?.jobId]) {
                const updatedStatus = { ...statusForNewJob };
                updatedStatus[item?.jobId] = "Received";
                setStatusForNewJob(updatedStatus);
            }
            setcheck([...checkeddata, item]);
            // console.log(item);
        }
    }

    const selectAllJobs = (e) => {
        const isChecked = e.target.checked;

        // If the checkbox in the header is checked, select all jobs; otherwise, deselect all
        const checkddata = isChecked
            ? [...NewJobs]
            : [];
        setcheck(checkddata);
    };
    //console.log(selectedJobs);

    const handleSubmitNewJob = () => {

        const selectedJobs = ERPData.filter((item1) =>
            checkeddata.some((item2) => item2.Job_id == item1.Job_id));
        console.log(selectedJobs);

        if (selectedJobs.length > 0) {
            const updatedData = selectedJobs.map((item) => {
                const { DateTime, Status, Job_id, Liner, ...newObject } = item;
                const statusdata = statusForNewJob[item?.jobId];
                const liner = Liner ? Liner.toString() : '';
                return { ...newObject, Status: statusdata, jobId: Job_id, Liner: liner };
            })
            const payload = {
                "qadet": updatedData,
            }
            // console.log(payload);
            axios
                .put(`${BASE_URL}/api/OA_DETRoute/bulk`, payload)
                .then((res) => {
                    // console.log(res);
                    getOADetails()
                    getOA_Det2()
                    toast.success(<p><strong>Added</strong>Successfully.</p>);
                    setcheck([]);
                })
                .catch((err) => {
                    console.log(err, "Error");
                    toast.error(<span><strong>User</strong> is not authorized fot this action.</span>);
                    setcheck([]);
                });
        }
        else {
            toast.warning(<p><strong>Jobs</strong> are up to date</p>);
        }
    }
    return (
        <>
            <div className="d-flex container-fluid justify-content-center">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>JobId</th>
                                    {/* <th>Description</th> */}
                                    <th style={{ width: '100px' }}>Date</th>
                                    <th>IT_CODE</th>
                                    <th>Item Description</th>
                                    <th>Status</th>
                                    <th>
                                        <Form.Check.Input
                                            type="checkbox"
                                            name="Select"
                                            id="allocated"
                                            style={{ border: "1px solid #808080" }}
                                            onChange={selectAllJobs}
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {NewJobs.filter(
                                    (item) =>
                                        !OA_DETdata.some((dataItem) => dataItem.jobId === item.Job_id))
                                    .map((item, index) =>
                                        <tr key={index}>
                                            <td>{item?.Job_id}</td>
                                            {/* <td>{"Job Description"}</td> */}
                                            <td>{item?.DateTime?.split("T")[0]}</td>
                                            <td>{item?.IT_CODE}</td>
                                            <td>{getJobDescription(item?.IT_CODE)}</td>
                                            <td><Form.Select
                                                className="form-control mt-1 col-2"
                                                id="Job Status"
                                                name="Job Status"
                                                style={{ width: "200px" }}
                                                onChange={(event) => HandleStatusForNewJob(event, item?.jobId)}
                                                value={statusForNewJob[item.jobId] || "Received"}
                                                required
                                            >
                                                <option>{"Received"}</option>
                                                <option>{"Assigned"}</option>
                                                <option>{"In Progress"}</option>
                                                <option>{"Completed"}</option>
                                            </Form.Select></td>
                                            <td>
                                                <Form.Check.Input
                                                    type="checkbox"
                                                    name="Select"
                                                    id="allocated"
                                                    style={{ border: "1px solid #808080" }}
                                                    checked={checkeddata?.findIndex((item1) => item1?.Job_id === item?.Job_id) !== -1}
                                                    onChange={(e) => handleCheckBox(e, item, "select")}
                                                />
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                        <button className="btn btn-success" onClick={handleSubmitNewJob}><FaCheck /></button> &nbsp;
                        <button className="btn btn-danger"><FaXmark /></button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );

}
export default JobRefresh;