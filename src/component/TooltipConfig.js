import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { BASE_URL } from "../constants/apiConstants";

function ToolTipConfig() {
  const [ToolTipdata, setToolTipdata] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl =
      `${BASE_URL}/api/tooltipconfig`;
    axios
      .get(apiUrl)
      .then((response) => {
        setToolTipdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function getToolTipConfig() {
    const apiUrl = `${BASE_URL}/api/tooltipconfig`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setToolTipdata(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      tooltipconfig : columnData.map((item)=>({
        branchId: item.item.branchId,
        userId: item.item.userId,
        columnName:entryField[item.item.Id],
        index:item.index,
        Tcolumn:item.item.Tcolumn,
        checkValue:item.checked
      }))
    };
    axios
      .put(`${BASE_URL}/api/tooltipconfig/bulk`, payload)
      .then((response) => {
        console.log(response.data);
        console.log("New row added successfully");
        getToolTipConfig();
        emptyfields();
        toast.success(
          <span>
            <strong>Successfully</strong> Added.
          </span>,
          {
            position: toast.POSITION.TOP_RIGHT, // Set position to top center
            className: 'custom-toast' // Optional: Add custom CSS class
          }
        );
      })
      .catch((error) => {
        console.error("Error adding new row:", error);
      });
  };

  const emptyfields = () => {
    setCheckedColumns({});
    setColumnData([]);
    setEntryField([]);
  };


  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [checkedColumns, setCheckedColumns] = useState({});
  const [columnData, setColumnData] = useState([]);
  const [entryField,setEntryField] = useState([])

  const handleColumncheck = (item, index) => {
    const newCheckedState = !checkedColumns[index];

    // Update checkedColumns state
    setCheckedColumns(prevState => ({
      ...prevState,
      [index]: newCheckedState  // Toggle the checked state
    }));

    // Save item, index, and checked state in columnData
    setColumnData(prevData => [
      ...prevData,
      { item, index, checked: newCheckedState }
    ]);
  }

  const handleInputChange = (e, index,Id) => {
    const newValue = e.target.value;
    // Update state or do something with the new value
    console.log(newValue,"input")
    setEntryField(prevState => ({
      ...prevState,
      [Id] : newValue
    }));
  };

  console.log(checkedColumns,"showdata")
  console.log(columnData,"showdata")
  console.log(ToolTipdata,"showdata")

  return (
    <div style={{ width: "100%", height: "100%" }}>
        <form onSubmit={handleSubmit} style={{ fontSize: "11px" }}>
          <div className="container">
            <div className="col-12 p-2">
              <div className="offset-0 row mt-3">
                <div className="row">
                  {ToolTipdata.map((item,index)=>(
                  <div className="col-3">
                  <input 
                      type="checkbox"
                      style={{ width: '20px' }}
                      checked={item.columnName ? item.columnName :!!checkedColumns[index]}
                      // checked={!!checkedColumns[index]}
                      onChange={() => handleColumncheck(item, index)} 
                  /> &nbsp;
                  {checkedColumns[index] ? (
                    <input 
                      type="text" 
                      value={entryField[item.id]} // You can bind this to state if you want it editable
                      onChange={(e) => handleInputChange(e, index,item.Id)} // Add an onChange handler if needed
                    />
                  ) : (
                    <span>{item.columnName ? item.columnName : item.Tcolumn}</span>
                  )}
                </div>
                  ))}
                </div>
              </div>
              <div className="offset-0 row">
                <div className="col-2">
                  <button
                    className="btn btn-sm"
                    type="submit"
                    onClick={handleSubmit}
                    id="Facheck"
                  >
                    Submit
                  </button>
                  &nbsp;
                  <a className="btn btn-sm" id="FaXmark" onClick={emptyfields}>
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>

      <ToastContainer />
    </div>
  );
}

export default ToolTipConfig;
