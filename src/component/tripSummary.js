import React, { useEffect, useState } from "react";
import { getTripDetails } from "../api/shovelDetails";

function TripSummary() {
  const [OpenLoader, setOpenLoader] = useState(false);
  const [TripDetails, setTripDetails] = useState([]);

  const showTripDetails = async (key) => {
    setOpenLoader(true);
    const responsedata = await getTripDetails();
    setTripDetails(responsedata, key);
    setOpenLoader(false);
  };

  useEffect(() => {
    showTripDetails();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered table-striped">
            <thead class="sticky-top">
              <tr>
                <th>Date</th>
                <th>Shift</th>
                <th>Trip Time</th>
              </tr>
            </thead>
            <tbody>
                    {TripDetails.map((item)=>
                    <tr>
                              <td>{(item.inserted_time).split("T")[0].split("-").reverse().join("-")}</td>
                              <td style={{ textAlign: "right" }}></td>
                              <td style={{ textAlign: "right" }}></td>
                    </tr>
                    )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TripSummary;
