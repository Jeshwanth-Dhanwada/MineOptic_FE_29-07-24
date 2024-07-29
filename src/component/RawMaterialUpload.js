import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./sidebar.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../constants/apiConstants";
import { FaXmark, FaCheck } from "react-icons/fa6";
import Papa from "papaparse";
import AuthContext from "../context/AuthProvider";

function RawMaterialUpload() {
    const { auth } = useContext(AuthContext)
    const [data, setData] = useState([]);

    const [file, setFile] = useState("");

    const allowedExtensions = ['csv'];

    const handleFileChange = (e) => {

        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setFile("");
                return;
            }
            setFile(inputFile);
        }
    };

    const handleParse = () => {

        if (!file) return toast.error(<p>Please upload valid file</p>);;

        const reader = new FileReader();

        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, {
                header: true,
            });
            const parsedData = csv?.data;
            console.log(parsedData)
            const updatedData = parsedData.map(obj => {
                Object.keys(obj).forEach(key => {
                    if (obj[key] === '') {
                        obj[key] = null;
                    }
                })
                return obj;
            });
            setData(updatedData);
            const newparsedData = {
                newBatch: parsedData
            }
            console.log(newparsedData, "newparsedData");
            createBatch(newparsedData);
        };
        reader.readAsText(file);
    };

    const createBatch = async (parsedData) => {
        try {
            if (parsedData) {
                console.log("Incoming");
                const response = await axios.put(`${BASE_URL}/api/batch/bulk`, parsedData);
                toast.success(<p><strong>Data Saved</strong> Successfully.</p>);
                console.log(response);
                console.log('Data saved Successfully');
                return
            }
            else {
                toast.error(<p><strong>New Data</strong> not found.</p>);
                return
            }

        } catch (error) {
            console.log('Error while submitting the Data', error);
            toast.error('Error while submitting the Data');
            return []
        }
    }


    return (
        <>
            <div className="d-flex align-items-center flex-column m-4">
                <h5>Upload your CSV here</h5>
                <div className="d-flex flex-column align-items-center p-1 border">
                    <input
                        onChange={handleFileChange}
                        id="csvInput"
                        name="file"
                        type="File"
                        style={{ "padding": "30px 0px 30px 100px" }}
                    />
                    <div>
                        <button className="btn btn-success" onClick={handleParse}><FaCheck /></button> &nbsp;
                        {/* <button className="btn btn-danger" onClick={handleClear}><FaXmark /></button> */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );

}

export default RawMaterialUpload;