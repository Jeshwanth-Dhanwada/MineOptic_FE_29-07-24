const getTimeparams = (dt) => {
    const day = dt.getDate();
    const month = dt.getMonth()+1;
    const year = dt.getFullYear();
    const mins = dt.getMinutes();
    const hour = dt.getHours();
    let seconds = dt.getSeconds();
    return {day, month, year, mins, hour, seconds }
}
export const todaysDateFormated = (initialDt) => {
    const {day, month, year, mins, hour } = getTimeparams(new Date(initialDt));
    return `${year}-${month}-${day}T${mins}:${hour}`
}

const addZeroForVal = (val) => {
    return val> 9 ? val : `0${val}`
}

export const getDateTimeViewFormat = (dateFormat, forAPI) => {
    let {day, month, year, mins, hour, seconds } = getTimeparams(new Date(dateFormat));
    seconds = addZeroForVal(seconds)
    mins = addZeroForVal(mins)
    month = addZeroForVal(month)
    day = addZeroForVal(day)
    if(forAPI) return `${year}-${month}-${day} ${hour}:${mins}:${seconds}`
    return `${year}-${month}-${day} ${hour} : ${mins} : ${seconds}`
}
export const getDateTimeViewFormatMin = (dateFormat, forAPI) => {
    let {day, month, year, mins, hour, seconds } = getTimeparams(new Date(dateFormat));
    // seconds = addZeroForVal(seconds)
    mins = addZeroForVal(mins)
    month = addZeroForVal(month)
    day = addZeroForVal(day)
    if(forAPI) return `${year}-${month}-${day} ${hour}:${mins}:${seconds}`
    return `${year}/${month}/${day} ${hour}:${mins}`
}

export const incrementDateTime = (dateToIncrease, increaseBy) => {
    let {day, month, year, mins, hour, seconds } = getTimeparams(new Date(dateToIncrease));
    // if(seconds < 56) seconds+=5;
    // else 
    if(mins < 59) {
        seconds = "00";
        mins++;
    } else {
        hour++;
        mins="00";
        seconds="00"
    }
    return new Date(year, month-1, day, hour, mins, seconds);
}

export const generateSeconds= (min=0, max=59) => { 
    min = Math.ceil(min);
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  } 