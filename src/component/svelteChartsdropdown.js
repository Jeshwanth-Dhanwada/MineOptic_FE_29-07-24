import {
  MomentSvelteGanttDateAdapter,
  SvelteGantt,
  SvelteGanttDependencies,
  SvelteGanttTable,
} from "svelte-gantt";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/apiConstants.js";
import { v4 as uuidv4 } from "uuid";
import { FaCheck, FaSistrix } from "react-icons/fa";
import { RiFilter3Fill } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import { AiFillCloseSquare } from "react-icons/ai";
import "./svelteCharts.css";
// import "./sidebar.css";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { Backdrop, Card, Slider } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SveltaWithDropDown = () => {
  const [newTaskDataa, setNewtaskData] = useState([]);
  const [Nodesdata, setNodesdata] = useState([]);
  const [locationdata, setLocationdata] = useState([]);
  const [FilteredTruckHistory, setFilteredTruckHistory] = useState([]);
  const [FilteredExcavatorHistory, setFilteredExcavatorHistory] = useState([]);
  const ganttRef = useRef(null); // Reference to store the Gantt chart instance
  const ganttRef1 = useRef(null); // Reference to store the Gantt chart instance
  const [OpenLoader, setOpenLoader] = useState(false)
  const [OpenLoader1, setOpenLoader1] = useState(false)

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/locations`)
      .then((response) => {
        setLocationdata(response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }, []);

  // Time
  function time(input) {
    return moment(input, "HH:mm");
  }

  function getLocationName(item) {
    const location = locationdata.find((loc) => loc.location_id == item);
    return location ? location.location_name : " ";
  }

  const createDateTime = (dateString, timeString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  const currentStart = time("05:00");
  const currentEnd = time("24:00");

  // Time ranges
  const timeRanges = [
    // {
    //   id: 0,
    //   from: time("13:00"),
    //   to: time("14:00"),
    //   classes: null,
    //   label: "Lunch",
    //   resizable: false,
    // },
    // {
    //   id: 1,
    //   from: time("21:00"),
    //   to: time("22:00"),
    //   classes: null,
    //   label: "Dinner",
    // },
  ];

  // Datas to load
  const ganttdata = {
    rows: [],
    tasks: [],
    dependencies: [],
  };

  const zoomLevels = [
    {
      headers: [
        { unit: "week", format: "w" },
        { unit: "day", format: "ddd - MMMM" },
        // { unit: "week", format: "w" },
        // { unit: "hour", format: "ddd, H" },
      ],
      minWidth: 3500,
      fitWidth: false,
    },
    {
      headers: [
        { unit: "week", format: "w" },
        { unit: "day", format: "MMMM Do" },
      ],
      minWidth: 5000,
      fitWidth: false,
    },
    {
      headers: [
        { unit: "day", format: "MMMM Do" },
        // { unit: "hour", format: "ddd D/M, H" }
        { unit: "hour", format: "H:00" },
      ],
      minWidth: 50000,
      fitWidth: false,
    },
    {
      headers: [
        { unit: "hour", format: "ddd D/MMMM" },
        { unit: "minute", format: "H:m" },
      ],
      minWidth: 1000000,
      fitWidth: false,
    },
    // {
    //   headers: [
    //     { unit: "minute",  format: "H:m", },
    //     { unit: "second", format: "m:s", classes: "gantt-header" },
    //   ],
    //   minWidth: 3000000,
    //   fitWidth: true,
    // },
  ];

  // Gantt options
  const options = {
    dateAdapter: new MomentSvelteGanttDateAdapter(moment),
    rows: ganttdata.rows,
    tasks: ganttdata.tasks,
    dependencies: ganttdata.dependencies,
    classes: "gantt-header",
    timeRanges,
    columnOffset: 15,
    magnetOffset: 15,
    rowHeight: 35,
    rowPadding: 5,
    fitWidth: true,
    minWidth: 1000,
    from: currentStart,
    headers: [
      { unit: "month", format: "m" },
      { unit: "week", format: "w" },
    ],
    to: currentEnd,
    // layout:'pack',
    tableHeaders: [
      {
        title: "Machines",
        property: "label",
        width: 100,
        type: "tree",
        color: "red",
      },
    ],
    tableWidth: 150,
    ganttTableModules: [SvelteGanttTable],
    ganttBodyModules: [SvelteGanttDependencies],
    zoomLevels: zoomLevels,
    zoomFactor: 50, // Increase or decrease this value to control zoom speed
    // enableCreateTask: true,
    onCreateTask: ({ from, to, resourceId }) => {
      // Return the new task model
      return {
        id: uuidv4(), // Generate a unique ID
        resourceId,
        label: "New Task",
        from,
        to,
        classes: "new-task-class",
      };
    },
    onCreatedTask: (task) => {
      // Handle the newly created task
      setNewtaskData([...newTaskDataa, task]);
    },
    //     onTaskButtonClick : OntaskClick,
    taskElementHook: taskHoverAction, // Use the custom action here
  };

  const [tooltipdata, setTooltipData] = useState();
  const [showDropdown, setshowDropdown] = useState(false);
  const [xPosition, setxPosition] = useState();
  const [yPosition, setyPosition] = useState();
  const [YPositionContext, setYPositionContext] = useState();
  const [XPositionContext, setXPositionContext] = useState();
  const [updateIdData, setUpdatelist] = useState();

  function taskHoverAction(node, task, row) {
    function handleMouseEnter(event) {
      const tooltipWidth = 220; // adjust according to your tooltip content width
      const tooltipHeight = 145; // adjust according to your tooltip content height

      let x = event.clientX;
      let y = event.clientY;

      // Check if the tooltip will overflow the right side of the viewport
      if (x + tooltipWidth > window.innerWidth) {
        x = window.innerWidth - tooltipWidth;
      }

      // Check if the tooltip will overflow the bottom side of the viewport
      if (y + tooltipHeight > window.innerHeight) {
        y = window.innerHeight - tooltipHeight;
      }

      setxPosition(x);
      setyPosition(y);
      setTooltipData(task);
      setUpdatelist("");
    }

    function handleMouseLeave() {
      // Handle the mouse leave event if needed (e.g., hiding a tooltip)
      setTooltipData("");
    }

    function handleContextClick(event) {
      const ContainerWidth = 400; // adjust according to your tooltip content width
      const ContainerHeight = 450; // adjust according to your tooltip content height

      let x = event.clientX;
      let y = event.clientY;

      // Check if the tooltip will overflow the right side of the viewport
      if (x + ContainerWidth > window.innerWidth) {
        x = window.innerWidth - ContainerWidth;
      }

      // Check if the tooltip will overflow the bottom side of the viewport
      if (y + ContainerHeight > window.innerHeight) {
        y = window.innerHeight - ContainerHeight;
      }
      // Prevent the default context menu from appearing
      event.preventDefault();
      setTooltipData("");
      setYPositionContext(x);
      setXPositionContext(y);
      setUpdatelist(task);
    }

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);
    node.addEventListener("contextmenu", handleContextClick);
    // node.addEventListener("click", handlePassid);

    return {
      destroy() {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
        node.removeEventListener("contextmenu", handleContextClick);
        // node.removeEventListener("click", handlePassid);
      },
    };
  }

  let counter = 0;

  function generateUniqueId() {
    return ++counter;
  }

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  
  const [Excavatordata, setExcavatordata] = useState([]);
  const [data3, setData3] = useState([]);

  const [maxTime, setMaxTime] = useState([]);
  const [minTime, setMinTime] = useState([]);
  const [mindate, setMinDate] = useState([]);
  const [maxdate, setMaxDate] = useState([]);

  const [Mergeddata,setMergeddata]= useState([])
  const [SortedData,setSortedData]= useState([])

  const [exadata1, setExaData1] = useState([]);
  const [exadata2, setExaData2] = useState([]);

  const [examaxTime, setExaMaxTime] = useState([]);
  const [examinTime, setExaMinTime] = useState([]);
  const [examindate, setExaMinDate] = useState([]);
  const [examaxdate, setExaMaxDate] = useState([]);

  const [minFilteringdate, setMinFilteringDate] = useState([]);
  const [maxFilteringdate, setMaxFilteringDate] = useState([]);

  const [checkedItems, setCheckedItems] = useState(new Set());
  const [checkedJobItems, setCheckedJobItems] = useState(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState(true);
  const [selectAllJobChecked, setSelectAllJobChecked] = useState(true);

  const getNodeNames = (nodeId) => {
    const node = Nodesdata.find((node) => node?.nodeId == nodeId);
    return node ? node.nodeName : "Node not found";
  };

  const [filtereddate, setfiltereddate] = useState();
  const handleFilterDate = (event) => {
    setshowDropdown(false);
    // Parse the date string
    const [year, month, day] = event.target.value.split("-");
    // Format the date to DD-MM-YYYY
    const indianDateFormat = `${day}-${month}-${year}`;
    setfiltereddate(indianDateFormat);
  };

  useEffect(() => {
    if (filtereddate) {
      setfiltereddate(filtereddate);
    }
  }, [filtereddate]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const [TipperStateHistory, Excavatorhistory] = await Promise.all([
          axios.get(`${BASE_URL}/api/tripstatehistory`),
          axios.get(`${BASE_URL}/api/excavatorhistory`),
        ]);
        console.log(Excavatorhistory.data,"Excavatorhistory")
        
        TipperStateHistory.data.sort((a, b) => {
          if (a.tipper_id < b.tipper_id) return -1;
          if (a.tipper_id > b.tipper_id) return 1;
          return 0;
        });

        Excavatorhistory.data.sort((a, b) => {
          if (a.excavator_id < b.excavator_id) return -1;
          if (a.excavator_id > b.excavator_id) return 1;
          return 0;
        });

        setData2(TipperStateHistory.data);
        setExcavatordata(Excavatorhistory.data)

        const startT = TipperStateHistory.data.map(
          (item) => new Date(item.state_date)
        );

        // Find the minimum date
        const minDate = new Date(
          Math.min(...startT.map((date) => date.getTime()))
        );

        const maxDate = new Date(
          Math.max(...startT.map((date) => date.getTime()))
        );
        // Format the date and time
        const date = minDate.toLocaleDateString("en-IN").replace(/\//g, "-"); // 'en-IN' for India Standard Time format
        const date1 = maxDate.toLocaleDateString("en-IN").replace(/\//g, "-"); // 'en-IN' for India Standard Time format

        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const datetofilter = minDate
          .toLocaleDateString("en-CA", options)
          .replace(/\//g, "-");
        const datetofilter1 = maxDate
          .toLocaleDateString("en-CA", options)
          .replace(/\//g, "-");

        const Mintime = minDate.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Set to true if you want 12-hour format
        });
        const Maxtime = maxDate.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Set to true if you want 12-hour format
        });

        if (filtereddate) {
          console.log("Filtered data");
          setMinDate(filtereddate);
          setMaxDate(filtereddate);
          setMaxTime("24:00");
          setMinTime("01:00");
        } else {
          console.log("Filtered No data");
          setMinDate(date);
          setMaxDate(date1);
          setMinTime(Mintime);
          setMaxTime(Maxtime);
          setfiltereddate("");
        }

        setMinFilteringDate(datetofilter);
        setMaxFilteringDate(datetofilter1);

        const uniqueAgentIDs = new Set();
        const rowsData = TipperStateHistory.data
          .filter((data) => {
            if (uniqueAgentIDs.has(data.tipper_id)) return false;
            uniqueAgentIDs.add(data.tipper_id);
            return true;
          })
          .map((data1) => ({
            id: data1.tipper_id,
            label: data1.tipper_id,
            enableDragging: true
          }));

        const uniqueShovels = new Set();
        const shoveldata = Excavatorhistory.data
        .filter((data) => {
          if (uniqueShovels.has(data.excavator_id)) return false;
          uniqueShovels.add(data.excavator_id);
          return true;
        })
        .map((data1) => ({
          id: data1.excavator_id,
          enableDragging: true
        }));
        console.log(shoveldata,"shoveldata")
        setData1(rowsData);
        setData3(shoveldata);
        // updateGanttChart(rowsData, parsedData2, checkedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filtereddate]);

  useEffect(() => {
    updateGanttChart(
      data1,
      data2,
      checkedItems,
      checkedJobItems,
      minTime,
      maxTime,
      mindate,
      maxdate,
      FilteredTruckHistory,
      exadata1,
      exadata2,
      SortedData
    );
  }, [checkedItems, data1, data2, checkedJobItems, minTime, maxTime, mindate, maxdate, FilteredTruckHistory, exadata1, exadata2, SortedData]);
  const updateGanttChart = (
    rowsData,
    parsedData2,
    checkedItems,
    checkedJobItems,
    minTime,
    maxTime,
    mindate,
    maxdate,
    exadata1,
    exadata2
  ) => {
    if (rowsData?.length > 0) {
      // if (rowsData?.length > 0 && parsedData2?.length > 0) {
      const uniqueData = [...new Set(checkedItems)];
      const uniqueJobData = [...new Set(checkedJobItems)];
      if (ganttRef && ganttRef.current) {
        // Destroy the existing Gantt instance before creating a new one
        ganttRef.current.$destroy();
      }

      if (
        uniqueData.length === checkedItems.size &&
        uniqueJobData.length === checkedJobItems.size
      ) {
        let allFilteredTasks = [];
        let filteredRowsdata = [];
        let filteredExaRowsdata = [];
        let allFilteredExaTasks = [];

        // Filtering Tasks to show in the charts --------
        setOpenLoader1(true)
        uniqueData.forEach((uniquItem) => {
          const filteredData = parsedData2.filter(
            (item) => item.tipper_id == uniquItem
          );
          // Sort filtered data by state_date
          const sortedData = filteredData.sort(
            (a, b) => new Date(a.state_date) - new Date(b.state_date)
          );
          
          const tasksData = FilteredTruckHistory
            .map((data, index, arr) => {
              try {
                const date = new Date(data.state_date);
                const options = {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                };
                const dateOptions = {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                };
                const ST = date.toLocaleTimeString([], options);
                const STdate = date
                  .toLocaleDateString([], dateOptions)
                  .replace(/\//g, "-");

                // Find the end time based on the next task's start time
                const nextData = arr[index + 1];
                const ET = nextData
                  ? new Date(nextData.state_date).toLocaleTimeString(
                      [],
                      options
                    )
                  : "";

                const ETdate = nextData
                  ? new Date(nextData.state_date)
                      .toLocaleDateString([], dateOptions)
                      .replace(/\//g, "-")
                  : maxdate;

                let taskClass = "";
                switch (data.new_state) {
                  case "TE":
                    taskClass = "TE-black";
                    break;
                  case "IE":
                    taskClass = "IE-orange";
                    break;
                  case "SE":
                    taskClass = "SE-red";
                    break;
                  case "SL":
                    taskClass = "SL-Dbrown";
                    break;
                  case "TL":
                    taskClass = "TL-Dgreen";
                    break;
                  case "LD":
                    taskClass = "LD-green";
                    break;
                  case "SP":
                    taskClass = "SP-bluegreen";
                    break;
                  case "WT":
                    taskClass = "WT-blue";
                    break;
                  case "WL":
                    taskClass = "WL-blue";
                    break;
                  case "IL":
                    taskClass = "IL-browngreen";
                    break;
                  default:
                    taskClass = "";
                }

                const task = {
                  id: generateUniqueId(),
                  resourceId: data.tipper_id,
                  label: " ",
                  data: "tipper",
                  from: createDateTime(STdate, ST),
                  to: createDateTime(ETdate, ET),
                  classes: taskClass,
                  enableResize: false,
                  enableDragging: false,
                  startTime: ST,
                  endTime: ET,
                  state: data.new_state,
                  firstExcavatorId:
                    data.first_excavator_id == -1
                      ? ""
                      : data.first_excavator_id,
                  stateDistance: data.stateDistance,
                  location_id: data.location_id == -1 ? "" : data.location_id,
                };
                return task;
              } catch (error) {
                console.error("Error processing task data:", data, error);
                return null;
              }
            })
            .filter((task) => task !== null);

          allFilteredTasks = allFilteredTasks.concat(tasksData);
        });
        console.log(FilteredExcavatorHistory)
        const tasksDataa = FilteredExcavatorHistory
              .map((data, index, arr) => {
                try {
                  const date = new Date(data.state_date);
                  const options = {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  };
                  const dateOptions = {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  };
                  const ST = date.toLocaleTimeString([], options);
                  const STdate = date
                    .toLocaleDateString([], dateOptions)
                    .replace(/\//g, "-");
  
                  // Find the end time based on the next task's start time
                  const nextData = arr[index + 1];
                  const ET = nextData
                    ? new Date(nextData.state_date).toLocaleTimeString(
                        [],
                        options
                      )
                    : "";
  
                  const ETdate = nextData
                    ? new Date(nextData.state_date)
                        .toLocaleDateString([], dateOptions)
                        .replace(/\//g, "-")
                    : maxdate;
  
                  let taskClass = "";
                  switch (data.new_state) {
                    case "0":
                      taskClass = "IdleEmpty";
                      break;
                    case "1":
                      taskClass = "Working";
                      break;
                    case "-1":
                      taskClass = "StopEmpty";
                      break;
                    default:
                      taskClass = "";
                  }
  
                  const task = {
                    id: generateUniqueId(),
                    resourceId: data.excavator_id,
                    label: " ",
                    data: "excavator",
                    from: createDateTime(STdate, ST),
                    to: createDateTime(ETdate, ET),
                    classes: taskClass,
                    enableResize: false,
                    enableDragging: false,
                    startTime: ST,
                    endTime: ET,
                    state: data.new_state,
                    firstExcavatorId:0,
                      // data.first_excavator_id == -1
                      //   ? ""
                      //   : data.first_excavator_id
                    stateDistance: 0,
                    location_id:0,
                  };
                  return task;
                } catch (error) {
                  console.error("Error processing task data:", data, error);
                  return null;
                }
              })
              .filter((task) => task !== null);
  
            allFilteredExaTasks = allFilteredExaTasks.concat(tasksDataa);
          
        const MergeExadata = allFilteredTasks.concat(allFilteredExaTasks)

        console.log(MergeExadata,"merge")

         // get unique lables(truck ids) ---------------

         const rowss = FilteredTruckHistory.map((item)=> item.tipper_id)

         const uniqueTipperIds = [...new Set(rowss)];
 
         console.log(uniqueTipperIds); 
 
        // Filtering rows to show in the charts --------
        const uniqueAgentIDs = new Set();
        const rowsDataa = FilteredTruckHistory
          .filter((data) => {
            if (uniqueAgentIDs.has(data.tipper_id)) return false;
            uniqueAgentIDs.add(data.tipper_id);
            return true;
          })
          .map((data1) => ({
            id: data1.tipper_id,
            label: data1.tipper_id,
            enableDragging: true
          }));

          const a = ExcavatorId.map((item)=>item.id)
          const b = TipperId.map((item)=>item.id)
          const uniqueExaIDs = new Set();
          const rowsDataaa = FilteredExcavatorHistory
            .filter((data) => {
              if (uniqueExaIDs.has(data.excavator_id)) return false;
              uniqueExaIDs.add(data.excavator_id);
              return true;
            })
            .map((data1) => ({
              id: data1.excavator_id,
              label: data1.excavator_id,
              enableDragging: true
            }));
            
        a.forEach((item) => {
          const filteredrows = rowsDataaa.filter((item1) => item1.id == item);
          filteredExaRowsdata.push(...filteredrows);
        });

        b.forEach((item) => {
          const filteredrows = rowsDataa.filter((item1) => item1.id == item);
          filteredRowsdata.push(...filteredrows);
        });
        
        // Using concat method
        let mergedArray2
        if(SortedData.length > 0){
          mergedArray2 = SortedData
          setMergeddata(mergedArray2)
        }
        else{
          mergedArray2 = filteredRowsdata.concat(filteredExaRowsdata);
          setMergeddata(mergedArray2)
        }
      setOpenLoader1(false)
        const { rows, tasks, from, to, ...restOptions } = options;
        ganttRef.current = new SvelteGantt({
          target: document.getElementById("example-gantt"),
          props: {
            ...restOptions,
            rows: mergedArray2,
            tasks: MergeExadata,
            from: createDateTime(mindate, minTime),
            to: createDateTime(maxdate, maxTime),
          },
        });
        
      } else if (!uniqueData?.length) {
        const tasksData = parsedData2
          .filter((item) => item?.id !== null)
          .map((data) => {
            try {
              if (!data.StartTime || !data.EndTime)
                throw new Error("Missing StartTime or EndTime");

              const startTime = data.StartTime.split(" ")[1];
              const endTime = data.EndTime.split(" ")[1];
              const fromTime = createDateTime("16-04-2024", startTime);
              const toTime = createDateTime("16-04-2024", endTime);

              if (!fromTime || !toTime) throw new Error("Invalid time format");

              let taskClass = "";
              switch (data.OperationType) {
                case "update":
                  taskClass = "task-update";
                  break;
                case "create":
                  taskClass = "task-create";
                  break;
                case "delete":
                  taskClass = "task-delete";
                  break;
                default:
                  taskClass = "";
              }

              const task = {
                id: generateUniqueId(),
                resourceId: data.AgentID,
                label: data.OperationType,
                from: fromTime,
                to: toTime,
                classes: taskClass,
                enableResize: false,
                enableDragging: false,
                missionId: data.MissionID,
              };
              return task;
            } catch (error) {
              console.error("Error processing task data:", data, error);
              return null;
            }
          })
          .filter((task) => task !== null);

        const { rows, tasks, ...restOptions } = options;

        ganttRef.current = new SvelteGantt({
          target: document.getElementById("example-gantt"),
          props: { ...restOptions, rows: rowsData, tasks: tasksData },
        });
      }
      
    }
  };


  // Excavator Gantt charts

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch data from the API
          const [ExcavatorStatehistory] = await Promise.all([
            axios.get(`${BASE_URL}/api/ExcavatorStatehistory`),
          ]);

          ExcavatorStatehistory.data.sort((a, b) => {
            if (a.excavator_id < b.excavator_id) return -1;
            if (a.excavator_id > b.excavator_id) return 1;
            return 0;
          });

          setExaData2(ExcavatorStatehistory.data);

          const startT = ExcavatorStatehistory.data.map(
            (item) => new Date(item.state_date)
          );

          // Find the minimum date
          const minDate = new Date(
            Math.min(...startT.map((date) => date.getTime()))
          );

          const maxDate = new Date(
            Math.max(...startT.map((date) => date.getTime()))
          );
          // Format the date and time
          const date = minDate.toLocaleDateString("en-IN").replace(/\//g, "-"); // 'en-IN' for India Standard Time format
          const date1 = maxDate.toLocaleDateString("en-IN").replace(/\//g, "-"); // 'en-IN' for India Standard Time format

          const options = { year: "numeric", month: "2-digit", day: "2-digit" };
          const datetofilter = minDate
            .toLocaleDateString("en-CA", options)
            .replace(/\//g, "-");
          const datetofilter1 = maxDate
            .toLocaleDateString("en-CA", options)
            .replace(/\//g, "-");

          const Mintime = minDate.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Set to true if you want 12-hour format
          });
          const Maxtime = maxDate.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Set to true if you want 12-hour format
          });

          if (filtereddate) {
            console.log("Filtered data");
            setExaMinDate(filtereddate);
            setExaMaxDate(filtereddate);
            setExaMaxTime("24:00");
            setExaMinTime("01:00");
          } else {
            console.log("Filtered No data");
            setExaMinDate(date);
            setExaMaxDate(date1);
            setExaMinTime(Mintime);
            setExaMaxTime(Maxtime);
            setfiltereddate("");
          }

          setMinFilteringDate(datetofilter);
          setMaxFilteringDate(datetofilter1);

          const uniqueAgentIDs = new Set();

          const rowsData = ExcavatorStatehistory.data
            .filter((data) => {
              if (uniqueAgentIDs.has(data.excavator_id)) return false;
              uniqueAgentIDs.add(data.excavator_id);
              return true;
            })
            .map((data1) => ({
              id: data1.excavator_id,
              label: data1.excavator_id,
            }));
            setExaData1(rowsData);

          // updateGanttChart(rowsData, parsedData2, checkedItems);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [filtereddate]);

    useEffect(() => {
      updateExaGanttChart(
        exadata1,
        exadata2,
        checkedItems,
        checkedJobItems,
        examinTime,
        examaxTime,
        examindate,
        examaxdate,
        FilteredExcavatorHistory
      );
    }, [checkedItems, exadata1, exadata2, checkedJobItems, examinTime, examaxTime, examindate, examaxdate, FilteredExcavatorHistory]);
  
    const updateExaGanttChart = (
      rowsData,
      parsedData2,
      checkedItems,
      checkedJobItems,
      minTime,
      maxTime,
      mindate,
      maxdate,
      FilteredExcavatorHistory
    ) => {
      console.log(FilteredExcavatorHistory,"search")
      if (rowsData?.length > 0) {
        // if (rowsData?.length > 0 && parsedData2?.length > 0) {
        const uniqueData = [...new Set(checkedItems)];
        const uniqueJobData = [...new Set(checkedJobItems)];
        if (ganttRef1 && ganttRef1.current) {
          // Destroy the existing Gantt instance before creating a new one
          ganttRef1.current.$destroy();
        }
  
        if (
          uniqueData.length === checkedItems.size &&
          uniqueJobData.length === checkedJobItems.size
        ) {
          let allFilteredExaTasks = [];
          let filteredExaRowsdata = [];
  
          // Filtering Tasks to show in the charts --------
          console.log(ExcavatorId.map((item)=>item.id),"ss")
          const a = ExcavatorId.map((item)=>item.id)
          console.log(uniqueData,"ss")
          console.log(parsedData2,"ss")
          a.forEach((uniquItem) => {
            const filteredData = parsedData2.filter(
              (item) => item.excavator_id == uniquItem
            );
            // Sort filtered data by state_date
            const sortedData = filteredData.sort(
              (a, b) => new Date(a.state_date) - new Date(b.state_date)
            );
  
            const tasksData = FilteredExcavatorHistory
              .map((data, index, arr) => {
                try {
                  const date = new Date(data.state_date);
                  const options = {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  };
                  const dateOptions = {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  };
                  const ST = date.toLocaleTimeString([], options);
                  const STdate = date
                    .toLocaleDateString([], dateOptions)
                    .replace(/\//g, "-");
  
                  // Find the end time based on the next task's start time
                  const nextData = arr[index + 1];
                  const ET = nextData
                    ? new Date(nextData.state_date).toLocaleTimeString(
                        [],
                        options
                      )
                    : "";
  
                  const ETdate = nextData
                    ? new Date(nextData.state_date)
                        .toLocaleDateString([], dateOptions)
                        .replace(/\//g, "-")
                    : maxdate;
  
                  let taskClass = "";
                  switch (data.new_state) {
                    case "0":
                      taskClass = "IdleEmpty";
                      break;
                    case "1":
                      taskClass = "Working";
                      break;
                    case "-1":
                      taskClass = "StopEmpty";
                      break;
                    default:
                      taskClass = "";
                  }
  
                  const task = {
                    id: generateUniqueId(),
                    resourceId: data.excavator_id,
                    label: " ",
                    from: createDateTime(STdate, ST),
                    to: createDateTime(ETdate, ET),
                    classes: taskClass,
                    enableResize: false,
                    enableDragging: false,
                    startTime: ST,
                    endTime: ET,
                    state: data.new_state,
                    firstExcavatorId:0,
                      // data.first_excavator_id == -1
                      //   ? ""
                      //   : data.first_excavator_id
                    stateDistance: 0,
                    location_id:0,
                  };
                  return task;
                } catch (error) {
                  console.error("Error processing task data:", data, error);
                  return null;
                }
              })
              .filter((task) => task !== null);
  
            allFilteredExaTasks = allFilteredExaTasks.concat(tasksData);
            console.log(allFilteredExaTasks)
          });
  
           // get unique lables(truck ids) -------------
           const rowss = FilteredExcavatorHistory.map((item)=> item.excavator_id)
  
           const uniqueTipperIds = [...new Set(rowss)];
   
           console.log(uniqueTipperIds,"search"); 
   
          // Filtering rows to show in the charts --------
          const uniqueExaIDs = new Set();
          const rowsDataa = FilteredExcavatorHistory
            .filter((data) => {
              if (uniqueExaIDs.has(data.excavator_id)) return false;
              uniqueExaIDs.add(data.excavator_id);
              return true;
            })
            .map((data1) => ({
              id: data1.excavator_id,
              label: data1.excavator_id,
            }));
            
            a.forEach((item) => {
              const filteredrows = rowsDataa.filter((item1) => item1.id == item);
              filteredExaRowsdata.push(...filteredrows);
            });
            // console.log(uniqueData,"search"); 
            console.log(rowsDataa,"search"); 
            console.log(FilteredExcavatorHistory,"search"); 
            console.log(filteredExaRowsdata,"search"); 
         
          const { rows, tasks, from, to, ...restOptions } = options;
          ganttRef1.current = new SvelteGantt({
            target: document.getElementById("example-gantt2"),
            props: {
              ...restOptions,
              rows: filteredExaRowsdata,
              tasks: allFilteredExaTasks,
              from: createDateTime(mindate, minTime),
              to: createDateTime(maxdate, maxTime),
            },
          });
        } else if (!uniqueData?.length) {
          const tasksData = parsedData2
            .filter((item) => item?.id !== null)
            .map((data) => {
              try {
                if (!data.StartTime || !data.EndTime)
                  throw new Error("Missing StartTime or EndTime");
  
                const startTime = data.StartTime.split(" ")[1];
                const endTime = data.EndTime.split(" ")[1];
                const fromTime = createDateTime("16-04-2024", startTime);
                const toTime = createDateTime("16-04-2024", endTime);
  
                if (!fromTime || !toTime) throw new Error("Invalid time format");
  
                let taskClass = "";
                switch (data.OperationType) {
                  case "update":
                    taskClass = "task-update";
                    break;
                  case "create":
                    taskClass = "task-create";
                    break;
                  case "delete":
                    taskClass = "task-delete";
                    break;
                  default:
                    taskClass = "";
                }
  
                const task = {
                  id: generateUniqueId(),
                  resourceId: data.AgentID,
                  label: data.OperationType,
                  from: fromTime,
                  to: toTime,
                  classes: taskClass,
                  enableResize: false,
                  enableDragging: false,
                  missionId: data.MissionID,
                };
                return task;
              } catch (error) {
                console.error("Error processing task data:", data, error);
                return null;
              }
            })
            .filter((task) => task !== null);
  
          const { rows, tasks, ...restOptions } = options;
  
          ganttRef1.current = new SvelteGantt({
            target: document.getElementById("example-gantt2"),
            props: { ...restOptions, rows: rowsData, tasks: tasksData },
          });
        }
      }
    };

  useEffect(() => {
    if (selectAllChecked) {
      setCheckedItems(new Set(data1?.map((item) => item.id)));
    }
  }, [data1]);

  useEffect(() => {
    if (selectAllJobChecked) {
      setCheckedJobItems(new Set(data3?.map((item) => item.jobId)));
    }
  }, [data3]);


  const handleClose = () => {
    setshowDropdown(false);
  };

  // Handler for individual checkboxes
  const handleCheckboxChange = (e, itemId) => {
    const newCheckedItems = new Set(checkedItems);
    if (e.target.checked) {
      newCheckedItems.add(itemId);
    } else {
      newCheckedItems.delete(itemId);
    }
    setCheckedItems(newCheckedItems);
    setSelectAllChecked(false);
  };

  // Handler for the "select all" checkbox
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Add all item IDs to the checkedItems set
      setCheckedItems(new Set(data1.map((item) => item.id)));
    } else {
      // Clear the checkedItems set
      setCheckedItems(new Set());
    }
    setSelectAllChecked(!selectAllChecked);
  };

  // Update usestate variables ------

  const [label, setLabel] = useState(updateIdData?.label);
  const [TaskId, settaskid] = useState(updateIdData?.TaskId);

  // Log checkedItems whenever it changes
  useEffect(() => {
    setLabel(updateIdData?.label);
    settaskid(updateIdData?.TaskId);
  }, [updateIdData]);

  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearchVisible, setSearchVisible] = useState(false);

  const [NodesearchInput, setNodeSearchInput] = useState("");
  const [NodefilteredResults, setNodeFilteredResults] = useState([]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    const filteredData = data1.filter((item) => {
      const Itemname = String(item.id).toLowerCase(); // Convert to string
      const nodename = String(getNodeNames(item.id)).toLowerCase(); // Convert to string
      return (
        Itemname.includes(searchValue.toLowerCase()) ||
        nodename.includes(searchValue.toLowerCase())
      );
    });
    setFilteredResults(filteredData);
  };

  // Jeshwanth changes for filter & search
  const searchNodesItems = (searchValue) => {
    setNodeSearchInput(searchValue);
    const filteredData = data3.filter((item) => {
      const Itemname = String(item.jobId).toLowerCase();
      return Itemname.includes(searchValue.toLowerCase());
    });
    setNodeFilteredResults(filteredData);
  };

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
    setSearchInput("");
  };

  const [TipperId, setTipperId] = useState([]);
  const [TipperIds, setTipperIds] = useState([]);
  const [ExcavatorId, setExcavatorId] = useState([]);
  const [selectedDate, setSelectedDate] = useState();


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTipperId(typeof value === "string" ? value.split(",") : value);
    const Tids = value.map((item)=>item.id)
    console.log(Tids,"234")
    setTipperIds(Tids)
  };

  const handleChangeExcavator = (event) => {
    const {
      target: { value },
    } = event;
    setExcavatorId(typeof value === "string" ? value.split(",") : value);
  };
  
  console.log(ExcavatorId,"ExcavatorId")
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    console.log("Selected Date and Time:", newValue.format());
  };

  const HandleGoButton = () => {
    if (selectedDate && ExcavatorId && TipperId) {
      // Extract Tipper IDs
      const tipperIds = TipperId.map((item) => item.id);
      console.log(tipperIds);

      const excavatorIds = ExcavatorId.map((item)=> item.id);
      console.log(excavatorIds,"search")
  
      // Format selected date for comparison
      const formattedSelectedDate = new Date(selectedDate.format())
        .toLocaleString('en-US', {
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
        .replace(/\//g, "-");

      // Filter data based on inserted_time and TipperId
      const filteredData = data2.filter((item) => {
        // Format the item's inserted_time for comparison
        const formattedInsertedTime = new Date(item.inserted_time)
          .toLocaleString('en-US', {
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
          .replace(/\//g, "-");
  
        // Check if the item's TipperId is in the list of selected tipperIds
        const isTipperIdMatch = tipperIds.includes(item.tipper_id);
  
        // Return true if both conditions are met
        return isTipperIdMatch && formattedInsertedTime >= formattedSelectedDate;
      });

       // Filter data based on inserted_time and ExcavatorId
       const filterExcavatordata = exadata2.filter((item)=>{
        const formattedInsertedTime = new Date(item.state_date)
          .toLocaleString('en-US', {
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })
          .replace(/\//g, "-");

          const isExcavatorIdMatch = excavatorIds.includes(item.excavator_id);
          // Return true if both conditions are met
        return isExcavatorIdMatch && formattedInsertedTime >= formattedSelectedDate;
      })
  
      setFilteredTruckHistory(filteredData)
      setFilteredExcavatorHistory(filterExcavatordata)
    }
  };
  
  const [Container,setContainer] = useState(false)

  const HandleSorting = () => {
      setContainer(true)
  }
  const HandleSortingClose = () =>{
    setContainer(false)
    const a = TipperId.map((item)=> item.id)  
    const e = ExcavatorId.map((item)=> item.id)
    // console.log(a,"sorting")
    // console.log(e,"sorting")
  }

  const [tipperValues, setTipperValues] = useState({});
  const [excavatorValues, setExcavatorValues] = useState({});
  

  // const handleTipperChange = (id, value) => {
  //   const newEntry = {
  //     token: value,
  //     tipper_id: id,
  //   };
  //   setTipperValues((prevValues) => ({
  //     ...prevValues,
  //     [id]: newEntry, // Store the object in the state
  //   }));
  // };

  // const handleExcavatorChange = (id, value) => {

  //   console.log(id, value, "Tipper");
  //   const newEntry = {
  //     token: value,
  //     excavator_id: id,
  //   };

  //   setTipperValues((prevValues) => ({
  //     ...prevValues,
  //     [id]: newEntry, // Store the object in the state
  //   }));
  // };

  // const HandleSortingTasks = () => {
  //   console.log('Tipper Values:', tipperValues);
  //   console.log('Tipper Values:', excavatorValues);

  //   // Iterate over all entries in excavatorValues
  //   Object.keys(excavatorValues).forEach((id) => {
  //     const { token,excavator_id } = excavatorValues[id];
  //     console.log(`Tipper Values`, token);
  //     console.log(`Tipper Values`, excavator_id);
  //   });
  //   // Iterate over all entries in excavatorValues
  //   Object.keys(tipperValues).forEach((id) => {
  //     const { token, tipper_id } = tipperValues[id];
  //     console.log(`Tipper Values`, token);
  //     console.log(`Tipper Values`, tipper_id);
  //   });
    
  // }

  const handleTipperChange = (id, value) => {
    const newEntry = {
      token: Number(value),
      id,
      type: 'tipper',
    };
    setTipperValues((prevValues) => ({
      ...prevValues,
      [id]: newEntry,
    }));
  };

  const handleExcavatorChange = (id, value) => {
    const newEntry = {
      token: Number(value),
      id,
      type: 'excavator',
    };
    setTipperValues((prevValues) => ({
      ...prevValues,
      [id]: newEntry,
    }));
  };

  const HandleSortingTasks = () => {
    // Convert combinedValues object into an array
    const sorted = Object.values(tipperValues).sort((a, b) => a.token - b.token);
    // Now you can use sorted data as needed
    // Find matching data from Mergeddata
    const matched = sorted.map(item => {
      const match = Mergeddata.find(data => data.id === item.id);
      return match ? match : null;
    }).filter(Boolean); // Remove null values if no match found
    setSortedData(matched);
    setContainer(false)
  };

  console.log(tooltipdata,"tooltipdata")
  return (
    <div>
      {/* GANTT CONTAINER */}
      <div className="row mt-2">
        <div style={{ display: "flex"}}>
          <FormControl sx={{ m: 1, width: 200}}>
            <InputLabel id="demo-multiple-checkbox-label" style={{marginTop:'-7px',fontSize:'15px'}}>Tippers</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={TipperId}
              style={{height:"35px"}}
              // value={personName.map((item)=>item.id)}
              onChange={handleChange}
              input={<OutlinedInput label="Tippers" />}
              renderValue={(selected) =>
                selected.map((item) => item.id).join(", ")
              }
              MenuProps={MenuProps}
            >
              {data1.map((name) => (
                <MenuItem key={name} value={name}>
                  {/* <Checkbox checked={TipperId.indexOf(name) > -1}/>
                  <ListItemText primary={name.id} /> */}
                  <Checkbox checked={TipperId.some((tipper) => tipper.id === name.id)} />
                  <ListItemText primary={name.id} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="demo-multiple-checkbox-label" style={{marginTop:'-7px',fontSize:'15px'}}>Excavators</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={ExcavatorId}
              // sx={{height:"35px"}}
              sx={{ maxHeight: 35,display: 'flex', 
                alignItems: 'center' }}
              onChange={handleChangeExcavator}
              input={<OutlinedInput label="Excavators" />}
              renderValue={(selected) =>
                selected.map((item) => item.id).join(", ")
              }
              MenuProps={MenuProps}
            >
              {data3.map((name) => (
                <MenuItem key={name} value={name}>
                  {/* <Checkbox checked={ExcavatorId.indexOf(name) > -1} />
                  <ListItemText primary={name.id} /> */}
                  <Checkbox checked={ExcavatorId.some((excavator) => excavator.id === name.id)} />
                  <ListItemText primary={name.id} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          &nbsp;
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            className="mt-0 mb-2"
            
          >
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]} style={{ height: '200px' }}>
              <DateTimePicker
                label="Start DateTime"
                value={selectedDate}
                onChange={handleDateChange}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                  seconds: renderTimeViewClock,
                }}
                style={{ height: '20px' }}
              />
            </DemoContainer>
          </LocalizationProvider>
          &nbsp;
          {TipperId && ExcavatorId && selectedDate ?
          <Button sx={{height:'35px'}} className="mt-2 mb-2" variant="contained" onClick={HandleGoButton}>
            Go
          </Button> :
          <Button sx={{height:'35px'}} className="mt-2 mb-2" variant="contained" disabled onClick={HandleGoButton}>
            Go
          </Button>
          }&nbsp;&nbsp;
          <Button sx={{height:'35px',textTransform: 'none' }} className="mt-2 mb-2" variant="contained" onClick={HandleSorting}>
            Sorting
          </Button> 
        </div>
      </div>
      
      <div id="example-gantt"></div>
      <div id="example-gantt2"></div>
      {tooltipdata && (
        <div
          style={{
            width: "350px",
            position: "absolute",
            display: "inline-flex",
            top: yPosition,
            zIndex: 1000,
            left: xPosition,
            textAlign: "left",
          }}
        >
          <ul class="list-group list-group-item-secondary">
              {tooltipdata.data === "tipper" && 
                <li class="list-group-item" style={{ height: "35px" }}>
                   Truck ID:
                &nbsp;{tooltipdata.resourceId}
              </li>
              }
              {tooltipdata.data === "excavator" && 
                <li class="list-group-item" style={{ height: "35px" }}>
                   Excavator ID:
                &nbsp;{tooltipdata.resourceId}
              </li>
              }
             
            <li class="list-group-item" style={{ height: "35px" }}>
              Start Time:&nbsp;{tooltipdata.startTime}
            </li>
            <li class="list-group-item" style={{ height: "35px" }}>
              End Time:&nbsp;{tooltipdata.endTime}
            </li>
            <li class="list-group-item" style={{ height: "35px" }}>
              State:&nbsp;{tooltipdata.state}
            </li>
            {tooltipdata.data === "tipper" && 
            <li class="list-group-item" style={{ height: "35px" }}>
              First Excavator ID:&nbsp;{tooltipdata.firstExcavatorId}
            </li>}
            {tooltipdata.data === "tipper" && 
            <li class="list-group-item" style={{ height: "35px" }}>
              Location:&nbsp;{getLocationName(tooltipdata.location_id)}
            </li>}
          </ul>
        </div>
      )}
      {showDropdown && (
        <div
          style={{
            width: "220px",
            height: "auto",
            border: "1px solid black",
            overflow: "auto",
            position: "absolute",
            top: "50px",
            right: "10px",
            fontSize: "14px",
            boxShadow: "0px 0px 10px",
            zIndex: 100,
          }}
        >
          <div style={{ zIndex: 100 }}>
            <ul class="list-group sticky-top">
              <li class="list-group-item" style={{ textAlign: "left" }}>
                Search &nbsp;&nbsp;
                {isSearchVisible ? (
                  <div
                    className="search-input-container"
                    style={{
                      position: "absolute",
                      top: "0px",
                      backgroundColor: "white",
                    }}
                  >
                    <input
                      type="text"
                      variant="outlined"
                      className=""
                      value={searchInput}
                      size="small"
                      style={{
                        width: "150px",
                        height: "30px",
                        fontSize: "10px",
                        borderRadius: "5px",
                        background: "whitesmoke",
                        marginLeft: "-10px",
                        marginTop: "2px",
                      }}
                      placeholder="Search Machine"
                      onChange={(e) => searchItems(e.target.value)}
                    />
                    <span
                      className="clear-button"
                      style={{
                        position: "absolute",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={toggleSearch}
                    >
                      <AiFillCloseSquare />
                    </span>
                  </div>
                ) : (
                  <span
                    className="search-icon-button"
                    style={{
                      marginLeft: "0px",
                      position: "absolute",
                    }}
                  >
                    <FaSistrix onClick={toggleSearch} />
                  </span>
                )}
                <div
                  style={{
                    position: "absolute",
                    right: "5px",
                    top: "-5px",
                    color: "red",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={handleClose}
                >
                  <IoCloseCircle />
                </div>
              </li>
              <li class="list-group-item">
                <span style={{ position: "absolute", left: "17px" }}>
                  SelectAll &nbsp;&nbsp;&nbsp;
                </span>
                <input
                  style={{ position: "relative", left: "65px" }}
                  type="checkbox"
                  onChange={handleSelectAllChange}
                  checked={checkedItems.size === data1.length}
                />
              </li>
            </ul>
            {searchInput.length > 0
              ? filteredResults.map((item, index) => (
                  <ul class="list-group">
                    <li class="list-group-item">
                      {item.id} &nbsp;
                      <input
                        type="checkbox"
                        value={item.id}
                        checked={checkedItems.has(item.id)}
                        onChange={(e) => handleCheckboxChange(e, item.id)}
                      />
                    </li>
                  </ul>
                ))
              : data1.map((item) => (
                  <div style={{ textAlign: "left" }}>
                    <ul class="list-group">
                      <li class="list-group-item">
                        {item.id} &nbsp;
                        <input
                          type="checkbox"
                          value={item.id}
                          checked={checkedItems.has(item.id)}
                          onChange={(e) => handleCheckboxChange(e, item.id)}
                        />
                      </li>
                    </ul>
                  </div>
                ))}
          </div>
        </div>
      )}
      {Container && (
        <div>
          <Modal
            open={Container}
            onClose={HandleSortingClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <AiFillCloseSquare onClick={HandleSortingClose} style={{color:'red',position:'absolute',right:'10px',top:'-10xp',fontSize:'x-large'}}/>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className="container ">
                {TipperId.map((item)=>(
                  <div className="row mt-2">
                    {/* <div className="col-2">
                     <input type="image" src="./Truck1.png" alt="img" width={100} height={100}/>
                    </div> */}
                    <div className="col-3 d-flex">
                    {item.id}
                    </div>
                    <div className="col-2">
                    <input 
                      type="number"
                      onChange={(e) => handleTipperChange(item.id, e.target.value)}
                    />
                    </div>
                  </div>))}
                {ExcavatorId.map((item)=>(
                  <div className="row mt-2">
                    {/* <div className="col-3">
                      <input type="image" src="./Excavator.png" alt="img"  width={50} height={50}/>
                    </div> */}
                    <div className="col-3">
                    {item.id}
                    </div>
                    <div className="col-2">
                    <input 
                      type="number"
                      onChange={(e) => handleExcavatorChange(item.id, e.target.value)}
                    />
                    </div>
                  </div>))}
                  &nbsp;
                </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="btn btn-success" onClick={HandleSortingTasks}>
                  <FaCheck/>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      )}
      {OpenLoader1 && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={OpenLoader1}
          // onClick={handleClose}
        >
          <CircularProgress size={80} color="inherit" />
        </Backdrop>
        )}
      
      {/* <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "20px",
                  opacity: 1,
                  display: "flex",
                }}
              >
                <div className="btn" onClick={handledropdown}>
                  Machine &nbsp;
                  <RiFilter3Fill />
                </div>
                <div className="btn">
                  Date &nbsp;
                  <input
                    type="date"
                    min={minFilteringdate}
                    max={maxFilteringdate}
                    onChange={handleFilterDate}
                    // value={}
                    style={{ width: '20px', height: '20px' }}
                  />
                </div> 
              </div> */}
    </div>
  );
};

export default SveltaWithDropDown;
