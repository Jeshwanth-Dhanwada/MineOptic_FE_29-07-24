import React, { useContext, useEffect, useState } from "react";
import { getActivities, getOADetails } from "../api/shovelDetails";
import { FaCheck, FaPlus, FaXmark } from "react-icons/fa6";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "../constants/apiConstants";
import AuthContext from "../context/AuthProvider";
import { toast } from "react-toastify";
import { FaArrowCircleRight } from "react-icons/fa";
import { Form } from "react-bootstrap";

function OperationsJobActivity({
  JobfromOperations,
  type = "New",
  activityData = {},
  onClick,
  setActivitydatatoInput,
  setSendToInput,
  setSendToOutput
}) {
  const [Activitydata, setActivity] = useState([]);
  const [Oadetails, setOadetails] = useState([]);
  console.log(JobfromOperations, "JobfromOperations");
  console.log(Activitydata.filter((item1) => item1?.jobId == JobfromOperations?.item
    // && item?.nodeId == JobfromOperations?.JobfromOperations?.nodeId
  )
    .map((item) => (item.id)), 'JobfromOperations');
  const showActivities = async (key) => {
    const responsedata = await getActivities();
    setActivity(responsedata, key);
  };
  const showOA_details = async (key) => {
    const responsedata = await getOADetails();
    setOadetails(responsedata, key);
  };
  useEffect(() => {
    showActivities();
    showOA_details();
  }, []);

  // Format the date and time
  const get24format = (date) => {
    const shiftStartTime = new Date(date);
    const formattedTime = shiftStartTime.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    });
    return formattedTime;
  };

  function getJobDescription(jobId) {
    const desc = Oadetails.find((item) => item.jobId == jobId);
    return desc ? desc.IT_NAME : "Node Not Found";
  }
  function getNodeDescription(nodeId) {
    const desc = nodedata.find((item) => item.nodeId == nodeId);
    return desc ? desc.nodeName : "Node Not Found";
  }
  function getFormattedToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`; // Correct format: YYYY-MM-DD
  }

  function formatIndianDate(dateString) {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const indianDateFormat = "en-IN"; // Use 'en-IN' for Indian English locale

    // Convert the input date string to a JavaScript Date object
    const dateObject = new Date(dateString);

    // Format the date using toLocaleDateString with the Indian locale
    return dateObject.toLocaleDateString(indianDateFormat, options);
  }


  // Adding new Activityrow -----
  const [isNewRowActive, setNewRowActive] = useState(false);
  const handleAddNewRow = () => {
    setNewRowActive(true);
  };

  const { auth } = useContext(AuthContext);
  const [shiftdata, setShiftdata] = useState([]);
  const [NodeAllocation, setNodeAllocation] = useState([]);
  const [JobAssign, setJobAssign] = useState([]);
  const [nodedata, setnodedata] = useState([]);
  const [itemmaster, setitemmaster] = useState([]);
  const [ActivityLog, setActivityLog] = useState([]);
  const [OA_details, setOA_details] = useState([]);
  const [ITMapping, setITMapping] = useState([]);
  const [OA_detailsJob, setOA_detailsForJob] = useState([]);
  const [Edgedetails, setEdgedetails] = useState([]);
  const [Employeedata, setEmployeedata] = useState([]);
  const [showForm1, setShowForm1] = useState(true);
  const [batchdetails, setbatchdetails] = useState([]);
  const [batchMasterdetails, setbatchMasterdetails] = useState([]);
  const [jobId, setjobId] = useState();
  const [rollSlitEnabled, setRollSlitEnable] = useState(false);
  const [batchCount, setBatchCount] = useState(1);
  const [conversionRate, setConversionRate] = useState(0);
  const [consumedDisabled, setConsumedDisabled] = useState(false);

  // Fetching shift data ----------
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/shift`;
    axios
      .get(apiUrl)
      .then((response) => {
        // console.log("shift data",response.data);
        setShiftdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetching Node data ----------
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/nodeMaster`;
    axios
      .get(apiUrl)
      .then((response) => {
        // console.log("shift data",response.data);
        setnodedata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetching Item Master data ----------
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/itemmaster`;
    axios
      .get(apiUrl)
      .then((response) => {
        // console.log("shift data",response.data);
        setitemmaster(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetching Employee data ----------
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/employee`;
    axios
      .get(apiUrl)
      .then((response) => {
        // console.log("shift data",response.data);
        setEmployeedata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetching NodeAllocation data --------

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/nodeAllocation`;
    axios
      .get(apiUrl)
      .then((response) => {
        setNodeAllocation(response.data);
        console.log("node allocation data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetching Job Assignment data --------

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/jobassign`;
    axios
      .get(apiUrl)
      .then((response) => {
        setJobAssign(response.data);
        console.log("**********", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetching Activity Log ----------
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/activitylog`;
    axios
      .get(apiUrl)
      .then((response) => {
        setActivityLog(response.data);
        console.log("***********", ActivityLog);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function getActivityLog() {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/activitylog`;
    axios
      .get(apiUrl)
      .then((response) => {
        setActivityLog(response.data);
        console.log("***********", ActivityLog);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  // Fetching OA Details ----------
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/OA_DETRoute`;
    axios
      .get(apiUrl)
      .then((response) => {
        setOA_details(response.data);
        console.log(OA_details);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //Fetching OA details for jobId
  useEffect(() => {
    if (jobId) {
      const apiUrl = `${BASE_URL}/api/OA_DETRoute/${jobId}`;
      axios
        .get(apiUrl)
        .then((response) => {
          setOA_detailsForJob(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
    }
  }, [jobId]);

  // Fetching FGMapping or Item Mapping Details ----------
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/mapping`;
    axios
      .get(apiUrl)
      .then((response) => {
        setITMapping(response.data);
        // console.log(response.data,"ITMapping");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetching Edge Details ----------
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/edgeMaster`;
    axios
      .get(apiUrl)
      .then((response) => {
        setEdgedetails(response.data);
        console.log(Edgedetails);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetching Batch or Item Mapping Details ----------
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/batch`;
    axios
      .get(apiUrl)
      .then((response) => {
        setbatchdetails(response.data);
        console.log(batchdetails, "Batchdetails");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [jobId]);

  const getBatchMasterData = async () => {
    try {
      // Use async/await to wait for each request to complete
      const response = await axios.get(`${BASE_URL}/api/batchMaster`);
      console.log('Data saved successfully for row', response.data);
      return response.data;
    } catch (error) {
      console.log('Error while submitting for row', error);
      return []
    }
    // const apiUrl = `${BASE_URL}/api/batchMaster`;
    // await axios
    //   .get(apiUrl)
    //   .then((response) => {
    //     console.log(response);
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //     return []
    //   });
  }

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const apiUrl = `${BASE_URL}/api/batchMaster`;
    axios
      .get(apiUrl)
      .then((response) => {
        setbatchMasterdetails(response.data);
        console.log(batchdetails, "Batchdetails");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [jobId]);

  const latestActivity = ActivityLog.map((item) => item);
  console.log(latestActivity);

  // Default date ---------------

  const [currentdate, setdate] = useState(getFormattedToday());
  const [Employee, setEmployee] = useState("Sandeep");
  const [nodeId, setNodeId] = useState();
  const [activityType, setactivity] = useState('ON');
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [enddateCheck, setenddateCheck] = useState();
  const [mappedItemData, setMappedItemData] = useState([]);
  const [EndShiftData, setEndShiftData] = useState([]);
  const [shiftData, setShiftData] = useState([]);
  const [inputsForCurrentNode, setInputsForCurrentNode] = useState([]);
  const [fgId, setFgId] = useState([]);
  const [routeId, setRouteId] = useState([]);
  const [inputsData, setInputsData] = useState([]);
  const [quantityValues, setQuantityValues] = useState([]);

  const Activity = {
    shiftNumber: shiftData, // selected shiftNumber
    currentdate: currentdate, //cuurent date is default machine date
    startShiftData:
      mappedItemData.length > 0
        ? `${currentdate} ${mappedItemData[0].startTime}`
        : "",
    // EmployeeID: Employee,            // from loggedin employee based on employee id
    EmployeeName: Employee, // from loggedin employee tabale
    nodeId: nodeId, //selected nodeid from nodeallocation
    // nodename: nodename,              //come from nodemaster
    activityType: activityType, // dropdown option
    enddate: enddate, // selected shift end date
    jobId: jobId,
    EndShiftData:
      mappedItemData.length > 0
        ? `${currentdate} ${mappedItemData[0].startTime}`
        : "", // after finging max of endshifttime
    // startShiftData: "",                 // shift startDateTime
  };

  console.log(currentdate.split("T")[0], "currentdate");
  console.log(inputsData,"setInputRowActive");

  // Function to get today's date in the format 'YYYY-MM-DD'
  function getFormattedToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Correct format: YYYY-MM-DD
  }

  function getFormatCurrentEndTime(dateString) {
    const currentDate = dateString ? new Date(dateString) : new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const getJobAssignId = () => {
    const jobs = JobAssign.filter(
      (item) =>
        item.shift.shiftNumber === shiftData &&
        item.node.nodeId === parseInt(nodeId) &&
        new Date(item.date).getTime() === new Date(currentdate).getTime() &&
        item.date.split("T")[0] === currentdate
    )
    //setjobId(jobs[0]);
    return jobs[0];
  }

  const HandleDate = (event) => {
    const dateString = event.target.value; // Assuming event.target.value is a valid date string
    setenddate(getFormatCurrentEndTime(dateString));
    setdate(dateString);
  };

  const HandleEmployee = (event) => {
    setEmployee(event.target.value);
  };

  useEffect(() => {
    if (activityType == 'ON' && type !== "edit") {
      setjobId(getJobAssignId()?.jobId)
    }
  }, [nodeId, activityType])

  useEffect(() => {
    setenddate(getFormatCurrentEndTime(currentdate) || getFormatCurrentEndTime())
  }, [currentdate]);

  useEffect(() => {
    handlequantityBasedOnRollSlit()
  }, [rollSlitEnabled])

  useEffect(() => {
    if (type === "edit") {
      setShiftData(activityData?.Shift);
      setNodeId(activityData?.nodeId);
      setactivity(activityData?.activityType);
      setenddate(activityData?.shiftEndTime);
      setenddateCheck(activityData?.shiftEndTime);
      setjobId(activityData?.jobId);

    }
  }, [])

  const HandlenodeId = (event) => {
    console.log(event.target.value.split('&&')[0], "nodeDescription");
    console.log(typeof event.target.value, "nodeDescription");
    let nodeid = nodedata?.filter((item) => item?.nodeName == (event.target.value).split('&&')[0])[0]?.nodeId;
    let lastOccurrenceOfShift = []
    ActivityLog.forEach((item, index) => {
      if (item?.Shift == shiftData && item?.nodeId == nodeid && item?.date.split("T")[0] == currentdate) {
        lastOccurrenceOfShift = [item, index];
      }
    })
    if (lastOccurrenceOfShift?.length > 0) {
      const index = lastOccurrenceOfShift[1];
      const endTime = formatShiftEnddate()[index];
      let actualShiftEndTime = ''
      if (shiftData == 1) {
        actualShiftEndTime = `${currentdate} ${shiftdata.filter((item) => item?.shiftNumber == '1')[0]?.endTime}`;
      } else {
        const currentDate = new Date(currentdate);
        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);

        const nextDayFormatted = nextDay.toISOString().split('T')[0];
        actualShiftEndTime = `${nextDayFormatted} ${shiftdata.filter((item) => item?.shiftNumber == '2')[0]?.endTime}`;
      }
      if (endTime > actualShiftEndTime) {
        toast.warning(<span><strong>Cannot</strong> assign the Node for currrent Shift as it already crossed shift End time</span>);
        setNodeId("");
        setjobId(getJobAssignId()?.jobId)
        return;
      }
    }
    setNodeId(nodeid?.toString());
  };

  const HandleActivity = (event) => {
    if (event.target.value != 'ON') {
      setjobId('');
    }
    setactivity(event.target.value);
  };

  const HandleStartDate = (event) => {
    setstartdate(event.target.value);
  };
  // console.log(startdate)

  const HandleEndDate = (event) => {
    setenddate(event.target.value);
    setenddateCheck(event.target.value);
  };
  // //console.log("before refreshed",enddate,"after refreshed",enddateCheck)
  const HandleJobId = (event) => {
    setjobId(event.target.value);
  };
  console.log("$$$", new Date(Activity.EndShiftData));


  const getBalanceQuantity = (value, materialId, index) => {
    const quantity = batchdetails.filter((item) => item.activityId == value && item.MaterialId == materialId);
    return index == 1 ? quantity[quantity.length - 1]?.Balancequantity1 : quantity[quantity.length - 1]?.Balancequantity2;
  }

  const isConsumedQtyEditable = (value, materialId) => {
    const quantity = batchdetails.filter((item) => item.activityId == value && item.MaterialId == materialId);
    return quantity[quantity.length - 1]?.consumedActivityId ? true : false;
  }

  const HandleItemCode = (event, materialId, index) => {
    const itemCode = itemmaster.filter((item) => item.IT_NAME === event.target.value)[0]?.IT_CODE
    const updatedData = inputsData.map((item) => {
      if (item?.materialId == materialId && item?.index - 1 == index) {
        return {
          ...item,
          batches: item?.batchDetails[event.target.selectedIndex - 1],
          itemCode: itemCode,
          availablequantity1: null,
          balanceQuantity1: null,
          consumedQty1: null,
        }
      }
      return item;
    });
    setInputsData(updatedData);
  }

  const HandleBatchId = (event, materialId, index) => {
    console.log(event)
    if (type === "edit") {
      if (isConsumedQtyEditable(event.target.value, materialId)) {
        toast.warning(<span>It cannot be editable as the batch is already consumed </span>);
        setConsumedDisabled(true);
      } else {
        setConsumedDisabled(false);
      }
    }
    const updatedData = inputsData.map((item) => {
      if (item?.materialId == materialId && item?.index - 1 == index) {
        return {
          ...item,
          //batchId: event?.target?.value,
          activityId: event?.target?.value,
          availablequantity1: getBalanceQuantity(event?.target?.value, materialId, 1),
          availablequantity2: getBalanceQuantity(event?.target?.value, materialId, 2),
          balanceQuantity1: getBalanceQuantity(event?.target?.value, materialId, 1),
          balanceQuantity2: getBalanceQuantity(event?.target?.value, materialId, 2),
        }
      }
      return item;
    });
    setInputsData(updatedData);
  }

  const HandleConsumedQty = (event, materialId, index, unitType) => {
    console.log(event, materialId, "consumed quantity");
    const updatedData = inputsData.map((item) => {
      if (item?.availablequantity - +event.target.value < 0) return item;
      if (item?.materialId == materialId && item?.index - 1 == index) {
        if (unitType == 1) {
          if (+event.target.value > item?.availablequantity1) return item;
          return {
            ...item,
            consumedQty1: +event.target.value,
            balanceQuantity1: item?.availablequantity1 - +event.target.value,
          }
        } else {
          if (+event.target.value > item?.availablequantity2) return item;
          if (isMeasurable(materialId, 2)) {
            let consumedQty1 = +event.target.value / getConversionRate(index);
            return {
              ...item,
              consumedQty1: +consumedQty1.toFixed(2),
              balanceQuantity1: +(item?.availablequantity1 - consumedQty1).toFixed(2),
              consumedQty2: +event.target.value,
              balanceQuantity2: (+item?.availablequantity2 - +event.target.value).toFixed(2),
            }
          }
          return {
            ...item,
            consumedQty2: +event.target.value,
            balanceQuantity2: (item?.availablequantity2 - +event.target.value).toFixed(2),
          }
        }
      }
      return item;
    });
    let totalConsumedQty1 = 0;
    let totalConsumedQty2 = 0;
    updatedData?.forEach((item) => totalConsumedQty1 += item?.consumedQty1);
    updatedData?.forEach((item) => totalConsumedQty2 += item?.consumedQty2);
    const conversionRate = totalConsumedQty2 / totalConsumedQty1;
    setInputsData(updatedData);
    setConversionRate(conversionRate ? conversionRate : 0);
  };

  // Assuming Updateddata is an array
  const Updateddata = [];
  // Push the Activity object to the array
  Updateddata.push(Activity);
  console.log(Updateddata);

  const isMeasurable = (nodeId, unitType) => {
    if (unitType == 3) {
      const value = nodedata?.filter((item) => item?.nodeId == nodeId && item?.unit1Measurable === 'Yes' && item?.unit2Mandatory === 'Yes');
      return value.length > 0;
    } else if (unitType == 1) {
      const value = nodedata?.filter((item) => item?.nodeId == nodeId && item?.unit1Measurable === 'Yes')
      return value.length > 0;
    } else {
      const value = nodedata?.filter((item) => item?.nodeId == nodeId && item?.unit2Mandatory === 'Yes')
      return value.length > 0;
    }
  }

  const getProducedQtySameJob = () => {
    const batchDetail = batchdetails.filter((item) => item?.jobId == jobId && item?.Consumedquantity1 == 0);
    let totalProducedQty = 0;
    batchDetail.forEach((item) => {
      totalProducedQty += item?.Availablequantity1;
    })
    return totalProducedQty;
  }

  const getTargetQty = () => {
    const targetQty = OA_details?.filter((item) => item?.jobId == jobId && item?.IT_CODE == fgId);
    return targetQty[0]?.TargetQty;
  }

  const getOutstandingQty = (quantity) => {
    const outstandingQty = (getTargetQty() * 1.08) - quantity + getProducedQtySameJob();
    return outstandingQty;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (type === "edit") {
      setShowForm1(false);
      return;
    }

    // if (!nodeId) {
    //   // alert("Please select a shift");
    //   document.getElementById("NodeId").focus()
    //   toast.warning(<span><strong>Please</strong> select the NodeId</span>);
    //   return; // Stop execution if shiftId is missing
    // }
    // if (!activityType) {
    //   // alert("Please select a shift");
    //   document.getElementById("activityType").focus()
    //   toast.warning(<span><strong>Please</strong> select the Activity Type</span>);
    //   return; // Stop execution if shiftId is missing
    // }
    // if (!enddate) {
    //   // alert("Please select a shift");
    //   document.getElementById("enddate").focus()
    //   toast.warning(<span><strong>Please</strong> select the enddate</span>);
    //   return; // Stop execution if shiftId is missing
    // }
    // if (!jobId && activityType === 'ON') {
    //   // alert("Please select a shift");
    //   document.getElementById("jobId").focus()
    //   toast.warning(<span><strong>Please</strong> select the JobId</span>);
    //   return; // Stop execution if shiftId is missing
    // }
    const data = {
      branchId: "1001",
      activityType: activityType,
      date: currentdate.split("T")[0],
      Shift: shiftData,
      // shiftStartTime: new Date(`${currentdate}T${mappedItemData[0].startTime}`),
      shiftStartTime: new Date(Activity.EndShiftData),
      shiftEndTime: new Date(enddate),
      nodeId: nodeId.toString(),
      employeeName: Employee,
      jobId: jobId,
    };
    console.log(data, "payload");
    axios
      .post(`${BASE_URL}/api/activitylog`, data)
      .then((res) => {
        console.log(res);
        getActivityLog();
      })
      .catch((err) => {
        console.log(err, "Error");
      });
    onClick({
      setvalue: 1,
      setrowActive: true
    })
    setActivitydatatoInput(data)
  };

  console.log(Activity.enddate, "enddate");
  const handleBatchSubmit = async (event) => {
    event.preventDefault();
    // Check if there is any row with a quantity greater than 0
    // const hasQuantity = quantityValues.some((quantity) => quantity?.quantity2 > 0 || quantity?.quantity1 > 0) && inputsData.some((item) => item?.consumedQty1 > 0);

    // if (!hasQuantity) {
    //   console.log('No quantity entered for any row. Aborting submission.');
    //   return;
    // }

    submitInputData();
    // Iterate through the rows and submit for each row with quantity
    for (let index = 0; index < quantityValues.length; index++) {
      const quantity = quantityValues[index];

      if (quantity) {
        const data = {
          branchId: "1001",
          MachinenodeId: parseInt(nodeId),
          jobId: jobId,
          shift: Activity.shiftNumber,
          MaterialId: quantity.nodeId.toString(),
          ItemCode: '',
          activityId: getRecentActivity().toString() + '-' + quantity?.index?.toString(),
          units1: "1",//quantity.units1, needs to be changed
          units2: "2",//quantity.units2,
          FGID: getProductName(),
          date: Activity.enddate,
          // MaterialId: getOutputsData()[index].toString(),
          Availablequantity1: quantity?.quantity1 ? quantity?.quantity1 : 0,
          Consumedquantity1: 0,
          Balancequantity1: quantity?.quantity1 ? quantity?.quantity1 : 0,
          Availablequantity2: quantity?.quantity2 ? quantity?.quantity2 : 0,
          Consumedquantity2: 0,
          Balancequantity2: quantity?.quantity2 ? quantity?.quantity2 : 0,
          userId: 1111
        };

        try {
          // Use async/await to wait for each request to complete
          const response = await axios.post(`${BASE_URL}/api/batch`, data);
          console.log('Data saved successfully for row', index, response.data);
          createBatchMasterData(quantity);
        } catch (error) {
          console.log('Error while submitting for row', index, error);
          return;
          // You can choose to handle errors as needed
        }
      }
    }
    toast.success(<span><strong>Saved </strong>Successfully.</span>);
  };

  const createBatchMasterData = async (quantity) => {
    const payload = {
      branchId: '1001',
      activityId: getRecentActivity().toString() + '-' + quantity?.index?.toString(),
      nodeId: quantity?.nodeId?.toString(),
      producedAt: new Date(currentdate),
      producedQty1: quantity?.quantity1 ? quantity?.quantity1 : null,
      consumedQty1: 0,
      balanceQty1: quantity?.quantity1 ? quantity?.quantity1 : 0,
      units1: "1",//quantity.units1, need to be changed
      producedQty2: quantity?.quantity2 ? quantity?.quantity2 : 0,
      consumedQty2: 0,
      balanceQty2: quantity?.quantity2 ? quantity?.quantity2 : 0,
      units2: "2",//quantity.units2,
      lastConsumedAt: null,
      fgId: getProductName(),
      producedJobId: jobId,
      lastConsumedJobId: '',
      consumedActivityId: '',
      conversionRate: isMeasurable(quantity?.nodeId, 3) ? quantity?.quantity2 / quantity?.quantity1 : null,
      totalProducedQty: quantity?.nodeCategory != 'Waste' ? quantity?.quantity1 + getProducedQtySameJob() : null,
      targetQty: quantity?.nodeCategory != 'Waste' ? getTargetQty() : null,
      outstandingQty: quantity?.nodeCategory != 'Waste' ? getOutstandingQty(quantity?.quantity1) : null,
      userId: '',
    }


    try {
      // Use async/await to wait for each request to complete
      const response = await axios.post(`${BASE_URL}/api/batchMaster`, payload);
      //updateOADETTable(quantity);
      // if (payload?.outstandingQty <= 0 && quantity?.nodeCategory != 'Waste') {
      updateJobAssign(payload);
      // }
      CancelSubmit()
      setShowForm1(true);
    } catch (error) {
      console.log('Error while submitting for row', error);
      return;
      // You can choose to handle errors as needed
    }
  }

  const updateJobAssign = async (quantity) => {
    let jobAssignData = JobAssign?.filter((item) => item?.node?.nodeId == nodeId && item?.jobId == quantity?.producedJobId && item?.shift?.shiftNumber == Activity?.shiftNumber && item?.date == currentdate && item?.status == 'Assigned');
    if (jobAssignData?.length > 0) {
      let { DateTime, shift, node, id, ...updatedObj } = jobAssignData[0];
      updatedObj = {
        ...updatedObj,
        node: nodeId,
        shift: Activity?.shiftNumber,
        status: "Completed",
      }

      try {
        // Use async/await to wait for each request to complete
        const response = await axios.put(`${BASE_URL}/api/jobAssign/${id}`, updatedObj);
        updateOADETTable()
      } catch (error) {
        console.log('Error while submitting for row', error);
        return;
        // You can choose to handle errors as needed
      }
    }
  }

  const updateOADETTable = async () => {
    const { DateTime, ...newObject } = OA_detailsJob;
    const payLoad = {
      ...newObject,
      Status: 'In Progress',
    }
    try {
      // Use async/await to wait for each request to complete
      const response = await axios.put(`${BASE_URL}/api/OA_DETRoute/${jobId}`, payLoad);
      CancelSubmit()
      setShowForm1(true);
    } catch (error) {
      console.log('Error while submitting for row', error);
      return;
      // You can choose to handle errors as needed
    }
  }

  const submitInputData = async () => {
    for (let index = 0; index < inputsData.length; index++) {

      const payLoad = {
        branchId: "1001",
        MachinenodeId: parseInt(nodeId),
        jobId: jobId,
        shift: Activity.shiftNumber,
        MaterialId: inputsData[index]?.materialId,
        ItemCode: inputsData[index]?.itemCode ? inputsData[index]?.itemCode : '',
        activityId: inputsData[index]?.activityId?.toString(),
        units1: "1", // need to be changed
        units2: "2",
        FGID: fgId,
        date: Activity.enddate,
        // MaterialId: inputsData[index]?.materialId,
        Availablequantity1: inputsData[index]?.availablequantity1,
        Consumedquantity1: inputsData[index]?.consumedQty1,
        Balancequantity1: inputsData[index]?.balanceQuantity1,
        Availablequantity2: inputsData[index]?.availablequantity2,
        Consumedquantity2: inputsData[index]?.consumedQty2,
        Balancequantity2: inputsData[index]?.balanceQuantity2,
        consumedActivityId: getRecentActivity().toString(),
        userId: 1111
      }

      try {
        // Use async/await to wait for each request to complete
        const response = await axios.post(`${BASE_URL}/api/batch`, payLoad);
        console.log('Data saved successfully for row', index, response.data);
        updateBatchMasterData(inputsData[index]);
      } catch (error) {
        console.log('Error while submitting for row', index, error);
        // You can choose to handle errors as needed
      }
    }
  }

  const updateBatchMasterData = async (inputValue) => {
    const getbatchMaster = await getBatchMasterData();
    const batchData = getbatchMaster.filter((item) => item?.activityId == inputValue?.activityId?.toString() && item?.nodeId == inputValue?.materialId)
    if (batchData?.length > 0) {
      const { createdDateTime, ...restBatchData } = batchData[0];
      const payLoad = {
        ...restBatchData,
        consumedQty1: inputValue?.consumedQty1,
        balanceQty1: inputValue?.balanceQuantity1,
        consumedQty2: inputValue?.consumedQty2,
        balanceQty2: inputValue?.balanceQuantity2,
        consumedActivityId: getRecentActivity().toString().split("-")[0],
        lastConsumedJobId: jobId,
      }

      const id = batchData[0]?.id
      try {
        // Use async/await to wait for each request to complete
        const response = await axios.put(`${BASE_URL}/api/batchMaster/${id}`, payLoad);
      } catch (error) {
        console.log('Error while submitting for row', error);
        return;
        // You can choose to handle errors as needed
      }
    }
  }

  const CancelSubmit = () => {
    setNewRowActive(false);
    setShiftData("");
    setenddate(getFormatCurrentEndTime(currentdate) || "");
    // setEmployee("")
    setNodeId("");
    setactivity("ON");
    setjobId("");
    setQuantityValues([]);
    setInputsData([]);
    setShowForm1(true);
    setRollSlitEnable(false);
    setBatchCount(1);
    setFilteredResults([]);
  };
  console.log("enddate:", new Date(enddate));

  // const [currentDate, setCurrentDate] = useState([])
  const handleShiftData = (e) => {
    setShiftData(e.target.value);
  };

  const today = new Date().toISOString().slice(0, 10);
  // console.log(today);

  const filteredItems = shiftdata.filter(
    (item) => String(item.shiftNumber) === shiftData
  );

  const jobs = JobAssign.filter(
    (item) =>
      item?.shift?.shiftNumber === shiftData &&
      item.node.nodeId === parseInt(nodeId)
    // && item.date.split('T')[0] === currentdate
  );
  // .map(item => item.id === jobId)

  // console.log("====", jobs);
  console.log("====", Activity.ShiftEndDate);

  // const filterEndshift = ActivityLog.filter(
  //   (item) =>
  //     item.nodeId === nodeId &&
  //     new Date(item.date).getDate() === new Date(currentdate).getDate()
  // );

  // console.log("nodeid:", nodeId, "shiftid:", typeof currentdate);

  const filtered = ActivityLog.filter(
    (item) => item.nodeId === Activity.nodeId && item?.date?.split('T')[0] == Activity.currentdate // item.date.split("T")[0] === currentdate &&
  );
  console.log("?????", filtered);

  const formatShiftEnddate = () => {
    const shiftEndDate = ActivityLog.map((item) => {
      // Assuming that item.shiftstarttime is in ISO 8601 format, e.g., "2023-10-13T13:30:09.000Z"
      const originalDatetime = new Date(item.shiftEndTime);

      // Subtract 5 hours and 30 minutes
      originalDatetime.setHours(
        originalDatetime.getHours() + 5,
        originalDatetime.getMinutes() + 30
      );

      // Convert the result back to ISO 8601 format
      const adjustedShiftStartTime = originalDatetime.toISOString();
      const inputDate = new Date(adjustedShiftStartTime); // Parse the input string as a Date
      // console.log("shift enddate:", inputDate)

      const year = inputDate.getUTCFullYear();
      const month = (inputDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
      const day = inputDate.getUTCDate().toString().padStart(2, "0");
      const hours = inputDate.getUTCHours().toString().padStart(2, "0");
      const minutes = inputDate.getUTCMinutes().toString().padStart(2, "0");
      const seconds = inputDate.getUTCSeconds().toString().padStart(2, "0");

      const formattedDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${inputDate.getMilliseconds()}`;

      return formattedDateTimeString;
    })
    return shiftEndDate;
  };

  const ShiftEndDate = formatShiftEnddate();

  if (ShiftEndDate.length > 0) {
    const maxShiftEndTime = ShiftEndDate.reduce((maxDate, currentDate) => {
      return currentDate > maxDate ? currentDate : maxDate;
    }, ShiftEndDate[0]);

    console.log(maxShiftEndTime);
    Activity.EndShiftData = maxShiftEndTime;
    // maxShiftEndTime is the maximum date in ShiftEndDate array
  }

  useEffect(() => {
    // if(shiftEndTime.length > 1){
    setEndShiftData(ShiftEndDate);
  }, []);

  console.log("shiftenddate", EndShiftData);

  useEffect(() => {
    getInputsData();
    setOutputQuantityValues();
  }, [fgId, routeId, nodeId]);

  useEffect(() => {
    const OADetail = OA_details.filter((item) => item.jobId === jobId);
    console.log(OADetail, "OADetail");
    setFgId(OADetail[0]?.IT_CODE);
  }, [jobId, OA_details]);

  useEffect(() => {
    const routeId = itemmaster.filter((item) => item.IT_CODE == fgId)[0]?.Route;
    setRouteId(routeId);
  }, [fgId])
  // function formatDate(Shiftstart) {
  //   const date = new Date(Shiftstart);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   const seconds = String(date.getSeconds()).padStart(2, '0');
  //   const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  // }
  // if (mappedItemData.length && filtered.length){
  //   const Shiftstart = new Date(`${currentdate}T${mappedItemData[0].startTime}`)
  //   const ShiftStartDate = formatDate(Shiftstart);
  //   // setStartShiftTime(...ShiftStartDate)
  //   if ( ShiftStartDate >  ShiftEndDate) {
  //     console.log('The maximum date is True:', ShiftStartDate);
  //   } else {
  //     console.log('The maximum date is: False', ShiftEndDate);
  //   }
  // }

  // console.log("ssss",startShift)
  // console.log("test1",startShift)
  console.log("test2", ShiftEndDate);

  // console.log("allocation data",  new Date(startShift),  new Date(formattedDateTimeString))

  // const maxShiftEndTime = new Date(Math.max(...ShiftEndDate));

  // const maxShiftEndTimeISOString = maxShiftEndTime.toISOString();

  // console.log("======",typeof formattedDateTimeString)

  // When the component mounts or when shiftData changes, update the state
  useEffect(() => {
    setMappedItemData(filteredItems);
  }, [shiftData]);

  const JobBatchArr = [];
  console.log(ActivityLog);

  JobBatchArr["shiftNumber"] = shiftData;
  JobBatchArr["startShiftData"] =
    mappedItemData.length > 0
      ? `${currentdate} ${mappedItemData[0].startTime}`
      : "";
  JobBatchArr["currentdate"] = currentdate;
  JobBatchArr["nodeId"] = nodeId;
  JobBatchArr["activityType"] = activityType;
  JobBatchArr["enddate"] = enddate;
  JobBatchArr["jobId"] = jobId;
  JobBatchArr["jobId"] =
    mappedItemData.length > 0
      ? `${currentdate} ${mappedItemData[0].startTime}`
      : "";
  JobBatchArr["ActivityLog"] = ActivityLog;
  console.log(JobBatchArr);

  const IT_CODE = itemmaster
    .filter((item) => parseInt(item.nodeId) === parseInt(nodeId))
    .map((item) => item.nodeName);

  console.log(IT_CODE);

  const getShiftId = () => {
    const shiftt = shiftdata
      .filter((item) => item.shiftId == shiftData)
      .map(item => item.shiftNumber);
    console.log(shiftt, "%%%%%%%%%%%%");
    // console.log(shiftdata, "%%%%%%%%%%%%");
    return shiftt
  };

  const getMaxStartTime = () => {
    //const activityDetail = ActivityLog.filter((item) => item?.)
    const lastShiftNumber = filtered[filtered.length - 1]?.Shift;
    const currrentShift = Activity?.shiftNumber;

    let lastOccurrenceOfShift = [];
    ActivityLog.forEach((item, index) => {
      if (item?.Shift == currrentShift && item?.date?.split('T')[0] == Activity?.currentdate && item?.nodeId == nodeId) {
        lastOccurrenceOfShift = [item, index];
      }
    })
    if (lastOccurrenceOfShift?.length > 0) {
      const index = lastOccurrenceOfShift[1];
      return formatShiftEnddate()[index];
    }
    if (lastShiftNumber < currrentShift) {
      return Activity.startShiftData > Activity.EndShiftData
        ? Activity.startShiftData
        : Activity.EndShiftData;
    } else {
      return Activity.startShiftData;
    }
  };

  const getRecentActivity = () => {
    const activityArr = JobBatchArr.ActivityLog.filter(
      (item) =>
        parseInt(item.jobId) === parseInt(jobId) &&
        parseInt(item.nodeId) === parseInt(nodeId)
    ).map((item) => item.id);
    return activityArr[activityArr.length - 1];
  };

  const getItemId = () => {
    const target = Edgedetails.filter((item) => parseInt(item.sourceNodeId) === parseInt(nodeId));
    console.log(target, "%%%%%%%%%%%%");
    console.log(Edgedetails, "%%%%%%%%%%%%");
    return target?.length ? target[0].targetNodeId.toString() : "";
  }

  const getProductName = () => {
    const product = OA_details.filter(
      (item) => item.jobId === jobId)
    // .map((item) => item.IT_CODE )
    // console.log(product)
    return product[0]?.IT_CODE.toString()
  }

  const getOutputsData = () => {
    console.log(Edgedetails)
    return Edgedetails.filter((item) => item.sourceNodeId == nodeId && item.routeId == routeId);
  }

  const setDataForInputs = () => {
    const inputValue = Edgedetails.filter((item) => item.targetNodeId == nodeId && item.routeId == routeId);
    const inputNodesFromEdge = inputValue.map((item) => item.sourceNodeId);
    let inputQty = inputNodesFromEdge.map((item) => {
      const matchingItems = ITMapping.filter((item1) => item1.nodeIdFG == fgId && item1.nodeId == item);
      return matchingItems.length > 0 ? matchingItems : item;
    });
    inputQty = inputQty[0]?.length ? inputQty[0] : inputQty
    const inputsData = inputQty?.map((item) => batchdetails.filter((item1) => item?.nodeIdRM == item1.ItemCode || (item == item1?.MaterialId && jobId == item1?.jobId)));
    const lastOccurrences = {}
    let inputData = inputsData.map(item => item.reverse().filter((item) => {
      if (!lastOccurrences[item.activityId]) {
        lastOccurrences[item.activityId] = item;
        if (item?.Balancequantity1 > 0 || item?.Balancequantity2 > 0) return true;
      }
      return false;
    }));

    if (inputQty[0]?.nodeCategory == "Raw Material" || inputQty[0]?.nodeCategory === "RM-Film" || inputQty[0]?.nodeCategory === "RM-Fabric") {
      inputData = inputData.filter((item) => item.length);
      inputData[0][0]['item'] = inputQty?.map((item) => item?.nodeIdRM);
      return [inputData]
    }
    return inputData;
  }

  const getInputsData = () => {
    const inputData = setDataForInputs();
    if (inputData[0]?.length && inputData[0][0]?.length) {
      setInputsData(inputData?.map((item) => ({
        materialId: item[0][0]?.MaterialId,
        item: item[0][0]?.item,
        itemCode: '',
        batchDetails: item,
        isPlus: true,
        isMinus: false,
        isPrimary: true,
        index: 1,
      })));
      setSendToInput(
        inputData?.map((item) => ({
          materialId: item[0][0]?.MaterialId,
          item: item[0][0]?.item,
          itemCode: '',
          batchDetails: item,
          isPlus: true,
          isMinus: false,
          isPrimary: true,
          index: 1,
        }))
      )
    } else {
      setInputsData(inputData?.map((item) => ({
        materialId: item[0]?.MaterialId,
        itemCode: item[0]?.item,
        batches: item,
        isPlus: true,
        isMinus: false,
        isPrimary: true,
        index: 1,
      })));
      setSendToInput(inputData?.map((item) => ({
        materialId: item[0]?.MaterialId,
        itemCode: item[0]?.item,
        batches: item,
        isPlus: true,
        isMinus: false,
        isPrimary: true,
        index: 1,
      })))
    }
    // setInputsForCurrentNode(inputData);
  }
  console.log(inputsData, "inputdata");
  // const getInputsDataforCurrentNode = () => {
  //   const inputData = setDataForInputs();
  //   return inputData;
  // }

  const getBatchDetailForMaterial = (item) => {
    const batchDetail = inputsData.filter((item1) => item1?.materialId == item?.materialId)[0];
    return batchDetail
    // return BatchDetails.filter((item1) => item1.id == batchId)[0];
  }
  const getDescription = (itemCode) => {
    const desc = itemmaster
      .filter((item) => item.IT_CODE === itemCode)
      .map((item) => (
        {
          'name': item.IT_NAME,
          'itemcode': item.IT_CODE
        }
      ));
    console.log(desc, nodeId, "@@@@@@@@@@@@@");
    return desc;
  }


  const getInputBatchDetail = (batches, index) => {
    const filteredBatches = batches?.filter(batch =>
      !inputsData.some(inputData => inputData?.activityId === batch?.activityId && inputData?.index - 1 !== index)
    );
    return filteredBatches;
  }

  const getNodeDetail = (item) => {
    return nodedata.filter(item1 => item1.nodeId === item.targetNodeId)[0];
  }

  // const getFGID = () => {
  //   const FGID = OA_details.filter(item => item.jobId == jobId)
  //                           .map(item => item.IT_CODE)
  //   const jsonString = JSON.stringify(FGID);
  //   console.log( typeof jsonString)
  //   const FGID1 = itemmaster.filter(item => item.IT_CODE === FGID)
  //                           // .map()
  //   console.log(FGID1)
  // }

  const a = JobAssign.filter(
    (item) =>
      item?.shift?.shiftNumber == shiftData &&
      item.date.split("T")[0] === currentdate
  ).map((item) => (
    item.node.nodeId
  ))
  console.log(a, "JObID");
  console.log(JobAssign, "JObID");

  const nodesBasedonShift = () => {
    const filteredItems = JobAssign.filter(
      (item) =>
        item?.shift?.shiftNumber == shiftData &&
        item.date.split("T")[0] === currentdate
    ).map((item) => (
      {
        "nodes": item.node.nodeName,
        "NODEID": item.node.nodeId
      }
    ))
    let unique = {}
    let uniqueItems = []
    // const uniqueItems = filteredItems.forEach((item,index) => filteredItems.indexOf(item) === index);
    filteredItems.forEach((item) => {
      if (!unique[item.NODEID]) {
        uniqueItems.push(item)
        unique[item.NODEID] = item.NODEID
      }
    })
    return uniqueItems;
  }

  const getUnits = (nodeId, unitType) => {
    const nodeDetail = nodedata?.filter((item) => item?.nodeId == nodeId);
    return unitType == 1 ? nodeDetail[0]?.units1 : nodeDetail[0]?.units2;
  }

  const getConversionRate = (index) => {
    const conversionRate = batchMasterdetails.filter((item) => item?.activityId == inputsData[index]?.activityId)[0]?.conversionRate;
    return conversionRate ? conversionRate : 0;

  }

  const getBatchCount = () => {
    let outputCount = [];
    for (let i = 1; i <= batchCount; i++) {
      outputCount.push(i);
    }
    return outputCount;
  }

  const setOutputQuantityValues = () => {
    const getNodeCategory = (item) => getNodeDetail({ targetNodeId: item?.targetNodeId })?.nodeCategory;
    const quantities = getOutputsData();
    const initialQuantityValues = getOutputsData().map((item, index) => ({
      nodeId: item?.targetNodeId,
      nodeCategory: getNodeCategory(item),
      //isPlus: getNodeCategory(item) != 'Waste' ? true : false,
      //isMinus: false, isPrimary: true,
      nodeName: getNodeDetail(item)?.nodeName,
      index: 1, //tells the no of batches added
      position: index, // tells the position of item in current array
      units1: getUnits(item?.targetNodeId, 1),
      units2: getUnits(item?.targetNodeId, 2),
      outputType: index + 1, // tells the no of outputs
    })); // Initialize with 0 for each row
    setQuantityValues(initialQuantityValues);
    setSendToOutput(initialQuantityValues);
  }

  const showConversionRate = (item) => {
    const conversionRate = getConversionRate();
    if (isMeasurable(item?.nodeId, 3) && item?.quantity1 && item?.quantity2) {
      return item?.quantity2 / item?.quantity1;
    }
    if (conversionRate) {
      return rollSlitEnabled ? conversionRate / 2 : conversionRate;
    }
    return 0;
  }


  const handleOnAddClickForInput = (index) => {
    let inputValues = [...inputsData];
    inputValues[index] = { ...inputValues[index], isPlus: false, isMinus: false }
    const indexVal = inputValues[index]?.index;
    let newValue = { ...inputValues[index], itemCode: '', isPlus: true, isMinus: true, isPrimary: false, index: indexVal + 1, activityId: '', availablequantity1: '', availablequantity2: '', balanceQuantity1: '', balanceQuantity2: '', consumedQty1: null, consumedQty2: null }
    inputValues.splice(index + 1, 0, newValue);
    setInputsData(inputValues);
  }

  const handleOnMinusClickForInput = (index) => {
    const inputValues = [...inputsData];
    const isPrimary = inputValues[index - 1]?.isPrimary;
    const indexVal = inputValues[index - 1]?.index;
    inputValues[index - 1] = { ...inputValues[index - 1], isPlus: true, isMinus: isPrimary ? false : true, index: indexVal }
    inputValues.splice(index, 1)
    let totalConsumedQty1 = 0;
    let totalConsumedQty2 = 0;
    inputValues?.forEach((item) => totalConsumedQty1 += item?.consumedQty1);
    inputValues?.forEach((item) => totalConsumedQty2 += item?.consumedQty2);
    const conversionRate = totalConsumedQty2 / totalConsumedQty1;
    setInputsData(inputValues);
    setConversionRate(conversionRate ? conversionRate : 0);
  }

  const handleOnAddClick = () => {
    let updatedQuantityValues = [...quantityValues];
    const length = updatedQuantityValues?.length;
    const outputValues = quantityValues.filter((item) => item?.nodeCategory != 'Waste' && item?.index == 1);
    outputValues.forEach((item, index) => {
      updatedQuantityValues.push({
        ...item,
        index: batchCount + 1,
        position: length + index,
        quantity1: '',
        quantity2: '',
      })
    })
    // updatedQuantityValues[index] = { ...updatedQuantityValues[index], isPlus: false, isMinus: false }
    // const indexVal = updatedQuantityValues[index]?.index;
    // let newValue = { ...updatedQuantityValues[index], isPlus: true, isMinus: true, isPrimary: false, index: indexVal + 1, quantity1: '', quantity2: '' }
    // updatedQuantityValues.splice(index + 1, 0, newValue);

    setQuantityValues(updatedQuantityValues);
    setBatchCount(batchCount + 1);
  }

  const handleOnMinusClick = () => {
    if (batchCount == 1) {
      return;
    }
    const updatedQuantityValues = quantityValues?.filter((item) => item?.index != batchCount);
    // const updatedQuantityValues = [...quantityValues];
    // const isPrimary = updatedQuantityValues[index - 1]?.isPrimary;
    // const indexVal = updatedQuantityValues[index - 1]?.index;
    // updatedQuantityValues[index - 1] = { ...updatedQuantityValues[index - 1], isPlus: true, isMinus: isPrimary ? false : true, index: indexVal - 1 }
    // updatedQuantityValues.splice(index, 1)
    setQuantityValues(updatedQuantityValues);
    setBatchCount(batchCount - 1)
  }

  const isDisableForOutput = (item, unitType) => {
    if (getNodeName(nodeId)?.includes("Slitting Machine") && item?.outputType != 1 && !rollSlitEnabled && item?.nodeCategory != 'Waste') {
      return true;
    } else if (unitType == 1) {
      return item?.nodeCategory == 'Waste' || !isMeasurable(item.nodeId, 1)
    } else if (unitType == 2) {
      return item?.nodeCategory != 'Waste' && !isMeasurable(item.nodeId, 2)
    }
  }

  const handlequantityBasedOnRollSlit = () => {
    let updatedQuantityValues = [...quantityValues];
    //let conversionRate = getConversionRate();
    let conversionrate = rollSlitEnabled ? conversionRate / 2 : conversionRate;
    updatedQuantityValues = updatedQuantityValues?.map((item) => {
      if (item?.nodeCategory != 'Waste' && item?.outputType == 1) {
        return {
          ...item,
          quantity1: (item?.quantity2 / conversionrate).toFixed(2)
        }
      } else if (item?.nodeCategory != 'Waste') {
        return {
          ...item,
          quantity1: '',
          quantity2: ''
        }
      }
      return item;
    })
    setQuantityValues(updatedQuantityValues);
  };

  const isConsumedQtyPresent = () => {
    return inputsData.some((item1) => item1?.consumedQty2 > 0 || item1?.consumedQty1 > 0);
  }

  const handlequantity = (event, item, unitType) => {
    // if (!isConsumedQtyPresent) {
    //   toast.warning(<span><strong>Please</strong> Enter Consumed quantity</span>);
    //   return;
    // }
    //Sum of all consumed quantities
    // let consumedQtySum = 0;
    // // inputsData.forEach((item) => consumedQtySum += item?.consumedQty);
    // inputsData.forEach((item) => item?.consumedQty ? consumedQtySum += item?.consumedQty : '');

    // const currValue = quantityValues[rowIndex]?.quantity ? quantityValues[rowIndex]?.quantity : '';
    // const newValue = +event.target.value == 0 ? '' : +event.target.value <= consumedQtySum ? +event.target.value : currValue;
    // //calculating Ouput quantity other than waste
    // let outputQty = 0;
    // quantityValues.forEach((value) => value?.nodeId != item?.targetNodeId && value?.nodeCategory != 'Waste' ? outputQty += value?.quantity : "");
    // //waste = consumed - outputqty
    // const wasteQty = consumedQtySum - outputQty - newValue;
    // Create a copy of the quantityValues array
    const updatedQuantityValues = [...quantityValues];
    // Update the quantity value for the specific row
    const rowIndex = item?.position;
    const nodeCategory = getNodeDetail({ targetNodeId: item?.nodeId })?.nodeCategory
    let quantity1;
    let quantity2;
    if (isMeasurable(item.nodeId, 3)) {
      if (unitType == 1) {    //needs to be changed
        quantity1 = +event.target.value;
        quantity2 = updatedQuantityValues[rowIndex]?.quantity2;
      } else {
        quantity2 = +event.target.value;
        quantity1 = updatedQuantityValues[rowIndex]?.quantity1;
      }
    } else if (nodeCategory == 'Waste') {
      quantity1 = ''; //needs to be changed
      quantity2 = +event.target.value;
    } else {
      let conversionrate = conversionRate;
      const isSlit = getNodeName(nodeId)?.includes("Slitting Machine") && item?.nodeCategory != 'Waste';
      if (isSlit && rollSlitEnabled) {
        conversionrate /= 2;
      }
      let value = +event.target.value / conversionrate
      quantity1 = getNodeDetail(item)?.nodeCategory != 'Waste' ? value.toFixed(2) : null;
      quantity2 = +event.target.value;
    }
    //updatedQuantityValues.forEach((item, index) => item?.nodeCategory == 'Waste' ? updatedQuantityValues[index] = { nodeId: item?.nodeId, quantity: wasteQty, nodeCategory: item?.nodeCategory } : '')
    updatedQuantityValues[rowIndex] = { ...updatedQuantityValues[rowIndex], quantity1: quantity1, quantity2: quantity2 }; // needs to be changed
    setQuantityValues(updatedQuantityValues);
  };

  const getOutputsValue = (item, index) => {
    const nodeDetail = getNodeDetail(item);
    let consumedQtySum = 0;
    inputsData.forEach((item) => consumedQtySum += item?.consumedQty);
    if (nodeDetail?.nodeCategory == 'Waste') {
      let outputQty = 0;
      quantityValues.forEach((value) => value?.nodeCategory != 'Waste' ? outputQty += value?.quantity : "");
      const wasteQty = consumedQtySum - outputQty;
      return wasteQty ? wasteQty : 0;
    } else {

    }
  }

  function getNodeName(nodeId) {
    const node = nodedata.find((item) => item.nodeId == nodeId);
    return node ? node.nodeName : 'Not Found';
  }

  function getShiftName(shiftId) {
    const shift = shiftdata.find((item) => item.shiftNumber == shiftId);
    return shift ? shift.shiftName : 'Not Found';
  }

  function getJobName(jobId) {
    const job = OA_details.find((item) => item.jobId == jobId);
    return job ? job.IT_NAME : 'Not Found';
  }

  function getproductName(FGID) {
    const fgid = OA_details.find((item) => item.jobId == jobId);
    return fgid ? fgid.IT_NAME : 'Not Found';
    // const product = OA_details.filter(
    //   (item) => item.jobId === jobId)    
    // .map((item) => item.IT_CODE )
    // console.log(product)
  }

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  // Ramesh changes
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    const searchDetails = itemmaster?.filter((item) => inputsData[0]?.item?.includes(item?.IT_CODE));
    const searchData = searchDetails.filter((item) => {
      const it_code = String(item.IT_CODE)?.toLowerCase() || '';
      const it_name = String(item.IT_NAME)?.toLowerCase() || '';
      // console.log(it_NAME,"ITCODE");
      // console.log(name)
      return it_code?.includes(searchValue?.toLowerCase())
        || it_name?.includes(searchValue?.toLowerCase())
    });
    const filteredData = searchData.map(item => item?.IT_CODE)
    setFilteredResults(filteredData);
  }
  console.log(filteredResults, "filteredResults");
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
    setSearchInput('')
    setFilteredResults([])
  };

  const handleWheel = (e) => {
    e.preventDefault()
  }
  console.log(inputsData);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th style={{ fontSize: '11px' }}>Activity Id</th>
                  <th style={{ fontSize: '11px' }}>Date</th>
                  <th style={{ fontSize: '11px' }}>Shift</th>
                  <th style={{ fontSize: '11px' }}>Node Id</th>
                  <th style={{ fontSize: '11px' }}>Description</th>
                  <th style={{ fontSize: '11px', width: '150px' }}>Activity Start Time</th>
                  <th style={{ fontSize: '11px' }} >Activity End Time</th>
                  <th style={{ fontSize: '11px' }}>Activity type</th>
                  <th style={{ fontSize: '11px' }}>Job Id</th>
                  <th style={{ fontSize: '11px' }}>Job Description</th>
                  <th style={{ fontSize: '11px' }}>Employee</th>
                  <th style={{ fontSize: '11px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Activitydata.filter(
                  (item) => item?.jobId == JobfromOperations?.item
                    && item?.nodeId == JobfromOperations?.nodeId
                ).map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{formatIndianDate(item.date)}</td>
                    <td>{item.Shift}</td>
                    <td>{item.nodeId}</td>
                    <td>{getNodeDescription(item.nodeId)}</td>
                    <td>{get24format(item.shiftStartTime)}</td>
                    <td>{get24format(item.shiftEndTime)}</td>
                    <td>{item.activityType}</td>
                    <td>{item.jobId}</td>
                    <td>{getJobDescription(item.jobId)}</td>
                    <td>{item.employeeName}</td>
                    <td></td>
                  </tr>
                ))}
                {isNewRowActive && (
                  <tr>
                    <td></td>
                    <td>
                      <input
                        type="date"
                        value={currentdate.split("T")[0]}
                        style={{ height: "20px", width: "90px" }}
                        onChange={HandleDate}
                        disabled={type === "edit" ? true : false}
                      />
                    </td>
                    <td>
                      <select
                        // className="form-control mt-1"
                        id="shift"
                        name="shift"
                        style={{ height: "20px", width: "50px" }}
                        onChange={handleShiftData}
                        value={shiftData}
                        disabled={type === "edit" ? true : false}
                        required
                      >
                        <option value="" hidden>
                          Shift
                        </option>
                        {shiftdata.map((item) => (
                          <option>{item.shiftNumber}</option>
                        ))}
                      </select>
                    </td>
                    <td colSpan={2}>
                      <select
                        // className="form-control mt-1"
                        id="NodeId"
                        name="NodeId"
                        onChange={HandlenodeId}
                        value={getNodeName(Activity.nodeId || nodeId)}
                        required
                        style={{ width: '130px', height: '20px' }}
                        disabled={type === "edit" ? true : false}
                      >
                        <option value="" hidden>Node</option>
                        {nodesBasedonShift()?.map((item) => (
                          <option key={item.nodes} value={item.nodes}>
                            {item.NODEID} - {item.nodes}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ width: '100px' }}>
                      {filtered.length > 0 ? (
                        // filtered
                        //   .map((item) => (
                        <input
                          // className="form-control mt-1"
                          disabled
                          value={getMaxStartTime()}
                          step={1}
                          style={{
                            border: 'none',
                            color: 'black',
                            width: '125px',
                            backgroundColor: 'transparent',
                          }}
                        />
                      ) : (
                        // ))
                        // mappedItemData.length >0?
                        mappedItemData.map((item) => (
                          <input
                            name="shiftStartTime"
                            disabled
                            // value={EndShiftData}
                            style={{
                              backgroundColor: "transparent",
                              border: 'none',
                              color: 'black',
                              width: '125px'
                            }}
                            value={
                              Activity.startShiftData ||
                              activityData?.shiftStartTime
                            }
                            step={1}
                          />
                        ))
                      )}
                    </td>
                    <td>
                      <input
                        type="datetime-local"
                        name="shiftEndTime"
                        id="enddate"
                        onChange={HandleEndDate}
                        value={enddate ? enddate : getFormatCurrentEndTime()}
                        step={1}
                        style={{ width: '148px', height: '20px' }}
                        disabled={type === "edit" ? true : false}
                      />
                    </td>
                    <td>
                      <select
                        id="activityType"
                        name="activityType"
                        onChange={HandleActivity}
                        style={{ width: "80px", height: "20px" }}
                        value={activityType}
                        disabled={type === "edit" ? true : false}
                        required
                      >
                        <option value="" hidden>
                          Please Select
                        </option>
                        <option value="ON">ON</option>
                        <option value="OFF">OFF</option>
                        <option value="Maintaince">MAINTENANCE</option>
                        <option value="BreakDown">BREAKDOWN</option>
                        <option value="Holiday">HOLIDAY</option>
                      </select>
                    </td>
                    <td colSpan={2}>
                      <select
                        type="number"
                        id="jobId"
                        name="jobId"
                        style={{ width: '80px', height: '20px' }}
                        onChange={HandleJobId}
                        disabled={type === "edit" ? true : false}
                        value={activityType == 'ON' ? jobId || '' : ''}
                      >
                        <option value="" hidden>Job Id</option>
                        {JobAssign.filter(
                          (item) =>
                            item?.shift?.shiftNumber === shiftData &&
                            item.node.nodeId === parseInt(nodeId) &&
                            new Date(item.date).getTime() === new Date(currentdate).getTime() &&
                            item.date.split("T")[0] === currentdate
                        ).map((item) => (
                          <option key={item.jobId} value={item.jobId}>
                            {item.jobId} - {getJobDescription(item.jobId)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>Sandeep</td>
                    
                    <td>
                      <button
                        style={{ border: "none", background: "transparent" }}
                        onClick={() => CancelSubmit()}
                      >
                        <FaXmark style={{ color: "red" }} />
                      </button>{" "}
                      &nbsp;
                      <button
                        style={{ border: "none", background: "transparent" }}
                        onClick={handleSubmit}
                      >
                        <FaArrowCircleRight style={{ color: "green" }} />
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="">
              <Button
                onClick={handleAddNewRow}
                style={{ marginLeft: "5px", background: "#09587c" }}
              >
                <FaPlus style={{ color: "white" }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperationsJobActivity;
