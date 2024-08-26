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

  // const handleColumncheck = (item, index) => {
  //   const newCheckedState = !checkedColumns[index];

  //   // Update checkedColumns state
  //   setCheckedColumns(prevState => ({
  //     ...prevState,
  //     [index]: newCheckedState  // Toggle the checked state
  //   }));

  //   // Save item, index, and checked state in columnData
  //   setColumnData(prevData => [
  //     ...prevData,
  //     { item, index, checked: newCheckedState }
  //   ]);

  //   // Save item, index, and checked state in columnData
  //   // setColumnData((prevData) => {
  //   //   const existingIndex = prevData.findIndex((data) => data.index === index);

  //   //   if (existingIndex !== -1) {
  //   //     const updatedData = [...prevData];
  //   //     updatedData[existingIndex] = { item, index, checked: newCheckedState };
  //   //     return updatedData;
  //   //   } else {
  //   //     return [...prevData, { index, checked: newCheckedState }];
  //   //   }
  //   // });
  // }

  const handleColumncheck = (item, index) => {
    const newCheckedState = !checkedColumns[index];

    // Update checkedColumns state
    setCheckedColumns(prevState => ({
      ...prevState,
      [index]: newCheckedState  // Toggle the checked state
    }));

    // Update columnData state
    setColumnData(prevData => {
      const existingIndex = prevData.findIndex(data => data.index === index);

      if (existingIndex !== -1) {
        // If the item already exists and the newCheckedState is false, remove it
        if (!newCheckedState) {
          return prevData.filter((_, i) => i !== existingIndex);
        } else {
          // If the item exists and newCheckedState is true, update it
          const updatedData = [...prevData];
          updatedData[existingIndex] = { item, index, checked: newCheckedState };
          return updatedData;
        }
      } else {
        // If the item doesn't exist, add it to the array
        return [...prevData, { item, index, checked: newCheckedState }];
      }
    });
};


  const handleInputChange = (e, index,Id) => {
    const newValue = e.target.value;
    // Update state or do something with the new value
    console.log(newValue,"input")
    setEntryField(prevState => ({
      ...prevState,
      [Id] : newValue
    }));
  };

  console.log(checkedColumns,"crosscheck")
  console.log(columnData,"crosscheck")

  return (
    <div style={{ width: "100%", height: "100%" }}>
        <form onSubmit={handleSubmit} style={{ fontSize: "11px" }}>
          <div className="container-fluid">
            {/* <div className="col-12 p-2"> */}
              <div className="offset-0 row mt-3">
                <div className="row">
                  {ToolTipdata.map((item,index)=>(
                  <div className="col-3">
                  <input 
                      type="checkbox"
                      style={{ width: '20px' }}
                      // checked={item.checkValue == 1 || !!checkedColumns[index]}
                      checked={checkedColumns[index] ?? item.checkValue == 1}
                      onChange={() => handleColumncheck(item, index)} 
                  /> &nbsp;
                  <span>{item.columnName ? item.columnName : item.Tcolumn}</span>&nbsp;
                  {item.checkValue != 1 && checkedColumns[index] &&  (
                    <input 
                      type="text" 
                      style={{height:'18px',width:'120px'}}
                      value={entryField[item.id]} // You can bind this to state if you want it editable
                      onChange={(e) => handleInputChange(e, index,item.Id)} // Add an onChange handler if needed
                    />
                  )
                  }
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
          {/* </div> */}
        </form>

      <ToastContainer />
    </div>
  );
}

export default ToolTipConfig;
