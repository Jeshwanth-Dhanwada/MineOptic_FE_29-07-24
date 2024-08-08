import mineAxios from ".";
import * as XLSX from 'xlsx';
import { generateSeconds } from "../commonFunctions/date";

export const getTipperHistory = (startTime, endTime) => {
    return mineAxios.get("/triphistory", {
        params: { startTime, endTime },
    }).then(res => {
        console.log("get:", res.data)
        return res.data;
    })
        .catch((err) => console.log(err))
}


export const importTipperData = (f) => {
    //f = file
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => { // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        console.log("test excel:",data)
        /* Update state */
        localStorage.setItem("tripData", data.substring(0, data.length / 2))
        // console.log(arrays, "arrays");
    };
    console.log(reader.readAsBinaryString(f), "test data ");
}

export const formatTempData = (data) => {
    // const datas = data.split(",");
    const datas = data;
    /* Update state */
    const cols = 37;
    // cols
    let row = 37;
    let arrays = [];
    console.log(datas, "datas");
    for (let i = cols; i <= datas.length / 37; i++) {
        const latitude = datas[row + 5];
        const longitude = datas[row + 8];
        const tipper_id = datas[row + 14];
        const trackTime = `${datas[row + 15]}:${generateSeconds()}`;
        const direction = datas[row + 2];
        arrays.push({
            latitude,
            longitude,
            tipper_id,
            trackTime,
            direction
        })
        row += 37;
    }
    return arrays;
}

export const getExacavators = (startTime, endTime) => {
    return mineAxios.get("/excavatorhistory", {
        params: { startTime, endTime },
    }).then(res => {
        return res.data;
    })
        .catch((err) => console.log(err))
}

export const getAllLocations = (startTime, endTime) => {
    return mineAxios.get("/locations", {
        params: { startTime, endTime },
    }).then(res => {
        return res.data;
    })
        .catch((err) => console.log(err))
}