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
        import { FaSistrix } from "react-icons/fa";
        import { RiFilter3Fill } from "react-icons/ri";
        import { IoCloseCircle } from "react-icons/io5";
        import { AiFillCloseSquare } from "react-icons/ai";
        import "./svelteCharts.css";
        // import "./sidebar.css";

        import * as React from 'react';
        import Box from '@mui/material/Box';
        import InputLabel from '@mui/material/InputLabel';
        import MenuItem from '@mui/material/MenuItem';
        import FormControl from '@mui/material/FormControl';
        import Select from '@mui/material/Select';

        import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
        import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
        import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
        import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
        import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

        import Button from '@mui/material/Button';
        
        const SveltaWithDropDown = () => {
          const [newTaskDataa, setNewtaskData] = useState([]);
          const [Nodesdata, setNodesdata] = useState([]);
          const [locationdata, setLocationdata] = useState([]);
          const ganttRef = useRef(null); // Reference to store the Gantt chart instance
        
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
            const [hours, minutes] = timeString.split(":").map(Number);;
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
                { unit: "day", format: "ddd - MMMM" }
                // { unit: "week", format: "w" },
                // { unit: "hour", format: "ddd, H" },
              ],
              minWidth: 3500,
              fitWidth: false
            },
            {
              headers: [
                { unit: "week", format: "w" },
                { unit: "day", format: "MMMM Do" },
              ],
              minWidth: 5000,
              fitWidth: false
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
            rowHeight: 50,
            rowPadding: 10,
            fitWidth: true,
            minWidth: 1000,
            from: currentStart,
            headers: [{ unit: 'month', format: 'm' }, { unit: 'week', format: 'w' }],
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
          const [showJobDropdown, setshowJobDropdown] = useState(false);
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
          const [data3, setData3] = useState([]);
        
          const [maxTime, setMaxTime] = useState([]);
          const [minTime, setMinTime] = useState([]);
          const [mindate, setMinDate] = useState([]);
          const [maxdate, setMaxDate] = useState([]);
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
        
          const [filtereddate,setfiltereddate] = useState()
          const handleFilterDate = (event) => {
            setshowDropdown(false);
            // Parse the date string
            const [year, month, day] = event.target.value.split('-');
            // Format the date to DD-MM-YYYY
            const indianDateFormat = `${day}-${month}-${year}`;
            setfiltereddate(indianDateFormat)
          }
        
          useEffect(() => {
            if (filtereddate) {
              setfiltereddate(filtereddate);
            }
          }, [filtereddate]);
        
          useEffect(() => {
            const fetchData = async () => {
              try {
                // Fetch data from the API
                const [TipperStateHistory, tasksResponse] = await Promise.all([
                  axios.get(`${BASE_URL}/api/tripstatehistory`),
                  axios.get(`${BASE_URL}/api/tasks`),
                ]);
                const [ActivityLog, nodesdata] = await Promise.all([
                  axios.get(`${BASE_URL}/api/activitylog`),
                  axios.get(`${BASE_URL}/api/nodemaster`),
                ]);
                setNodesdata(nodesdata.data);
        
                TipperStateHistory.data.sort((a, b) => {
                  if (a.tipper_id < b.tipper_id) return -1;
                  if (a.tipper_id > b.tipper_id) return 1;
                  return 0;
                });
        
                setData2(TipperStateHistory.data);
        
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
        
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                const datetofilter = minDate.toLocaleDateString('en-CA',options).replace(/\//g, "-");
                const datetofilter1 = maxDate.toLocaleDateString('en-CA',options).replace(/\//g, "-");
        
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
        
                let Fdata = filtereddate
        
                if(filtereddate){
                  console.log("Filtered data")
                  setMinDate(filtereddate)
                  setMaxDate(filtereddate)
                  setMaxTime("24:00")
                  setMinTime("01:00")
                }
                else{
                  console.log("Filtered No data")
                  setMinDate(date)
                  setMaxDate(date1)
                  setMinTime(Mintime)
                  setMaxTime(Maxtime)
                  setfiltereddate("")
                }
        
                // setMinDate(filtereddate ? filtereddate : date);
                // setMaxDate(filtereddate ? filtereddate: date1);
        
                // setMinDate(date);
                // setMaxDate(date1);
        
                // setMaxTime(Mintime);
                // setMinTime(Mintime);
        
                // setMaxTime(filtereddate ? "23:00" : Maxtime);
                // setMinTime(filtereddate ? "01:00" : Mintime);
        
                setMinFilteringDate(datetofilter)
                setMaxFilteringDate(datetofilter1)
        
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
                  }));
        
                const uniqueJobIDs = new Set();
                const jobsData = ActivityLog.data
                  .filter((data) => {
                    if (uniqueJobIDs.has(data.jobId)) return false;
                    uniqueJobIDs.add(data.jobId);
                    return true;
                  })
                  .map((data1) => ({
                    id: data1.nodeId,
                    label: data1.nodeId,
                    jobId: data1.jobId,
                    nodeName: "",
                  }));
        
                setData1(rowsData);
                setData3(jobsData);
        
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
              maxdate
            );
          }, [checkedItems, data1, data2, checkedJobItems, minTime, maxTime, mindate, maxdate]);
        
          const updateGanttChart = (
            rowsData,
            parsedData2,
            checkedItems,
            checkedJobItems,
            minTime,
            maxTime,
            mindate,
            maxdate
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
        
                // Filtering Tasks to show in the charts --------
        
                uniqueData.forEach((uniquItem) => {
                  const filteredData = parsedData2.filter(
                    (item) => item.tipper_id == uniquItem
                  );
                  // Sort filtered data by state_date
                  const sortedData = filteredData.sort(
                    (a, b) => new Date(a.state_date) - new Date(b.state_date)
                  );
        
                  // Function to generate a unique color
                  // function generateColor() {
                  //   const letters = "0123456789ABCDEF";
                  //   let color = "#";
                  //   for (let i = 0; i < 6; i++) {
                  //     color += letters[Math.floor(Math.random() * 16)];
                  //   }
                  //   return color;
                  // }
        
                  // Map to store new_state to color mapping
                  // const newStateToColorMap = new Map();
        
                  // Create a style element
                  // const styleElement = document.createElement("style");
                  // document.head.appendChild(styleElement);
                  // const styleSheet = styleElement.sheet;
        
                  const tasksData = sortedData
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
                          ? new Date(nextData.state_date).toLocaleDateString(
                            [],
                            dateOptions
                          ).replace(/\//g, "-")
                          :maxdate
        
                        // let color;
                        // let className;
        
                        // if (newStateToColorMap.has(data.new_state)) {
                        //   const colorInfo = newStateToColorMap.get(data.new_state);
                        //   color = colorInfo.color;
                        //   className = colorInfo.className;
                        // } else {
                        //   color = generateColor();
                        //   className = `newState-${data.new_state}`;
                        //   newStateToColorMap.set(data.new_state, { color, className });
        
                        //   // Add the CSS rule for the new class
                        //   styleSheet.insertRule(
                        //     `.${className} { background-color: ${color}; }`,
                        //     styleSheet.cssRules.length
                        //   );
                        //   styleSheet.insertRule(
                        //     `.${className}:hover { background-color: ${color}; }`,
                        //     styleSheet.cssRules.length
                        //   );
                        // }
        
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
                          location_id : data.location_id == -1 ? "" : data.location_id
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
        
                // Filtering rows to show in the charts --------
        
                uniqueData.forEach((item) => {
                  const filteredrows = rowsData.filter((item1) => item1.id == item);
                  filteredRowsdata.push(...filteredrows);
                });
        
                const { rows, tasks, from, to, ...restOptions } = options;
                ganttRef.current = new SvelteGantt({
                  target: document.getElementById("example-gantt"),
                  props: {
                    ...restOptions,
                    rows: filteredRowsdata,
                    tasks: allFilteredTasks,
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
        
          const handleSave = () => {
        
            // const Rowspayload = {
            //   rowMaster:ganttdata.rows.map((item, index) => (
            //     {
            //       id:item.id.toString(),
            //       enableDragging :true,
            //       enableResize :true,
            //       label : item.label,
            //       class: item.class,
            //       children  :'',
            //       expanded  :true,
            //       iconClass :item.iconClass,
            //       userId: "1111",
            //   }
            // ))
            // };
            // console.log(Rowspayload, "payload");
            function ConvertInToHours(item) {
              const fromtimestamp = item;
              const date = new Date(fromtimestamp);
        
              const hours = date.getUTCHours();
              const minutes = date.getUTCMinutes();
        
              const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}`;
              console.log(formattedTime);
              return formattedTime;
            }
            const Taskspayload = {
              taskMaster: newTaskDataa.map((item, index) => ({
                amountDone: item.model.amountDone,
                from: "7:00",
                to: "8:00",
                //         from: ConvertInToHours(item.model.from),
                //         to: ConvertInToHours(item.model.to),
                label: item.model.label,
                enableDragging: item.model.enableDragging,
                enableResize: item.model.enableResize,
                resourceId: item.model.resourceId,
                classes: item.model.classes,
                userId: "1111",
                id: item.model.id,
                OperationType: "create",
        
                // amountDone : item.amountDone,
                // from : item.from._i,
                // to : item.to._i,
                // label : item.label,
                // enableDragging : item.enableDragging,
                // enableResize : item.enableResize,
                // resourceId : item.resourceId,
                // classes : item.classes,
                // userId : item.userId,
                // id : item.id.toString(),
              })),
            };
        
            // axios
            //   .put(`${BASE_URL}/api/rows/bulk`, Rowspayload)
            //   .then((response) => {
            //     console.log("Data saved successfully", response.data);
            //     toast.success(
            //       <span>
            //         <strong>successfully</strong> Updated.
            //       </span>,
            //       {
            //         position: toast.POSITION.TOP_RIGHT, // Set position to top center
            //         className: 'custom-toast' // Optional: Add custom CSS class
            //       }
            //     );
            //   })
            //   .catch((error) => {
            //     console.error("Error saving data:", error);
            //   });
        
            axios
              .put(`${BASE_URL}/api/tasks/bulk`, Taskspayload)
              .then((response) => {
                toast.success(
                  <span>
                    <strong>successfully</strong> Updated.
                  </span>,
                  {
                    position: toast.POSITION.TOP_RIGHT, // Set position to top center
                    className: "custom-toast", // Optional: Add custom CSS class
                  }
                );
              })
              .catch((error) => {
                console.error("Error saving data:", error);
              });
          };
        
          const handleUpdate = (event) => {
            // event.preventDefault();
            // axios
            //   .delete(`${BASE_URL}/api/tasks/${TaskId}`)
            //   .then((response) => {
            //     console.log("Task deleted successfully", response.data);
            //     const apiUrl = `${BASE_URL}/api/tasks`;
            //     axios
            //       .get(apiUrl)
            //       .then((response) => {
            //                 console.log(response.data)
            //       })
            //       .catch((error) => {
            //         console.error("Error fetching data:", error);
            //       });
            //   })
            //   .catch((error) => {
            //     console.error("Error deleting node:", error);
            //   });
          };
        
          const HandleCancelUpdate = (event) => {
            setUpdatelist("");
          };
        
          const handleDelete = (taskid) => {
        
            //     axios
            //       .delete(`${BASE_URL}/api/tasks/${taskid}`)
            //       .then((response) => {
            //         console.log("Task deleted successfully", response.data);
            //         const apiUrl = `${BASE_URL}/api/tasks`;
            //         axios
            //           .get(apiUrl)
            //           .then((response) => {
            //                     console.log(response.data)
            //           })
            //           .catch((error) => {
            //             console.error("Error fetching data:", error);
            //           });
            //       })
            //       .catch((error) => {
            //         console.error("Error deleting node:", error);
            //       });
          };
        
          const handledropdown = () => {
            setshowDropdown(!showDropdown);
            setshowJobDropdown(false);
          };
        
          const handleJobdropdown = () => {
            setshowJobDropdown(!showJobDropdown);
            setshowDropdown(false);
          };
        
          const handleClose = () => {
            setshowDropdown(false);
          };
        
          const handleJobClose = () => {
            setshowJobDropdown(false);
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
        
          // Handler for individual checkboxes
          const handleJobCheckboxChange = (e, itemId) => {
            const newCheckedItems = new Set(checkedJobItems);
            if (e.target.checked) {
              newCheckedItems.add(itemId);
            } else {
              newCheckedItems.delete(itemId);
            }
            setCheckedJobItems(newCheckedItems);
            setSelectAllJobChecked(false);
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
        
          // Handler for the "select all" checkbox
          const handleSelectAllJobChange = (e) => {
            if (e.target.checked) {
              // Add all item IDs to the checkedJobsItems set
              setCheckedJobItems(new Set(data3.map((item) => item.jobId)));
            } else {
              // Clear the checkedJobItems set
              setCheckedJobItems(new Set());
            }
            setSelectAllJobChecked(!selectAllJobChecked);
          };
        
          // Update usestate variables ------
        
          const [label, setLabel] = useState(updateIdData?.label);
          const [TaskId, settaskid] = useState(updateIdData?.TaskId);
        
          // Log checkedItems whenever it changes
          useEffect(() => {
            setLabel(updateIdData?.label);
            settaskid(updateIdData?.TaskId);
          }, [updateIdData]);
        
          const HandleLabelChange = (event) => {
            setLabel(event.target.value);
          };
        
          const ConvertIntotime = (item) => {
            const Mintime = item.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // Set to true if you want 12-hour format
            });
            return Mintime;
          };
        
          const [searchInput, setSearchInput] = useState("");
          const [filteredResults, setFilteredResults] = useState([]);
          const [isSearchVisible, setSearchVisible] = useState(false);
        
          const [NodesearchInput, setNodeSearchInput] = useState("");
          const [NodefilteredResults, setNodeFilteredResults] = useState([]);
          const [isNodeSearchVisible, setNodeSearchVisible] = useState(false);
        
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
        
          // Ramesh changes for filter & search
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
        
          const toggleNodeSearch = () => {
            setNodeSearchVisible(!isNodeSearchVisible);
            setNodeSearchInput("");
          };

          const [age, setAge] = React.useState('');

          const handleChange = (event) => {
            setAge(event.target.value);
          };
        console.log(data1,"data2")
          return (
            <div>
              {/* GANTT CONTAINER */}
              <div className="row">
                <div style={{display:'flex'}}>
                  <Box sx={{ minWidth: 120 }} className="mt-2 mb-2">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Tippers</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                      >
                        {data1.map((item)=> 
                          <MenuItem value={item.id}>{item.id}</MenuItem>
                        )}
                      </Select>
                    </FormControl> 
                  </Box> &nbsp;
                  <Box sx={{ minWidth: 120 }} className="mt-2 mb-2">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Excavators</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> &nbsp;
                  <LocalizationProvider dateAdapter={AdapterDayjs}  className="mt-0 mb-2">
                    <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                      <DateTimePicker
                        label="Start DateTime"
                        viewRenderers={{
                          hours: renderTimeViewClock,
                          minutes: renderTimeViewClock,
                          seconds: renderTimeViewClock,
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>&nbsp;
                  <Button className="mt-2 mb-2" variant="contained">Go</Button>
                </div>
              </div>
              <div id="example-gantt"></div>
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
                    <li class="list-group-item" style={{height:'35px'}}>
                      Truck ID:&nbsp;{tooltipdata.resourceId}
                    </li>
                    <li class="list-group-item" style={{height:'35px'}}>
                      Start Time:&nbsp;{tooltipdata.startTime}
                    </li>
                    <li class="list-group-item" style={{height:'35px'}}>
                      End Time:&nbsp;{tooltipdata.endTime}
                    </li>
                    <li class="list-group-item" style={{height:'35px'}}>State:&nbsp;{tooltipdata.state}</li>
                    <li class="list-group-item" style={{height:'35px'}}>
                      First Excavator ID:&nbsp;{tooltipdata.firstExcavatorId}
                    </li>
                    <li class="list-group-item" style={{height:'35px'}}>
                      Location:&nbsp;{getLocationName(tooltipdata.location_id)}
                    </li>
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
                  <div style={{zIndex:100}}>
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
        