import React, { useState } from 'react';
import dayjs from 'dayjs';
import './dateTime.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { IconButton, TextField } from '@mui/material';

export default function DateTimeRangeField({ dateRange, setDateRange, minDateTime, endTime, setEndTime, style }) {
  // const [minDate, setMinTime] = useState(date)
  // const [maxTime, setMaxTime] = useState(parsedDateTime)
  // const [selectedDateTime, setSelectedDateTime] = useState(dateRange)
  // => {
  //   const parsedDateTime = dayjs(dateRange);
  //   // console.log(parsedDateTime,dateRange)
  //   return parsedDateTime
  //   // return parsedDateTime;
  // });
  // const date = dayjs(dateRange, 'DD/MM/YYYY');
  // console.log("date", dateRange)

  // const [open, setOpen] = useState(false);
  const [timeDifference, setTimeDifference] = useState('');
  const [duration, setDuration] = useState();

  const getMinDate = () => {
    const moment = require('moment');
    const date = moment(dateRange, "DD-MMTHH:mm:ss.SSSZ");

    const formattedDate = date.format("DD/MM/YYYY");
    return formattedDate
  }

  const handleStartDateTimeChange = (date) => {
    setDateRange(date.toISOString())
    // const parsedDate = dayjs(date);
    // setEndTime(dayjs(date))
  };
  // const hasTime = parsedDate.hour() !== 0 || parsedDate.minute() !== 0;

  const handleEndTimeChange = (value) => {
    const durationInMinutes = value.minute();
    setDuration(durationInMinutes);
    const endTimecal = dayjs(dateRange).add(durationInMinutes, 'minutes');
    setEndTime(endTimecal.toISOString());
  };

  const minDate = dayjs('2021-06-24 16:31');

  return (
    <div className="d-flex flex-row">
      <div className="date-time-wrapper" style={{ height: "10px !important", overflow: 'hidden' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateTimePicker']}>
            <div className="d-flex flex-row justify-content-between">
              <DateTimePicker
                label="Start DateTime"
                value={dateRange ? dayjs(dateRange) : ''}
                inputFormat="YYYY/MM/DD HH:mm"
                ampm={false} // Add AM/PM make true
                minDate={minDate}
                // maxTime={dayjs(dateRange)}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
                onChange={handleStartDateTimeChange}
                format="YYYY/MM/DD HH:mm"
                style={style}
              /> <span style={{ marginTop: '30px' }}> - </span>
              {/* <IconButton fontSize='40px' onClick={() => setOpen(true)}>
              <AccessTimeIcon />
            </IconButton> */}
              <TimePicker
                // open={open}
                // onClose={() => setOpen(false)}
                // value={endTime ? dayjs(endTime) : null}
                value={duration ? dayjs().minute(duration) : null}
                onChange={handleEndTimeChange}
                ampm={false}
                views={['minutes']}
                format='mm'
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
                label="Duration in Minutes"
                maxTime={dayjs(dateRange).add(1, 'hour')}
              />
              {/* <TimePicker
              viewRenderers={{
                // hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                // seconds: renderTimeViewClock,
              }}
              views={['hours', 'minutes']}
              label="End Time in Minutes"
              ampm={false}
              value={endTime ? dayjs(endTime) : ''}
              maxTime={dayjs(dateRange).add(1, 'hour')}
              onChange={handleEndTimeChange}
              format='HH:mm'
            /> */}
            </div>
          </DemoContainer>
        </LocalizationProvider>

      </div>
      
    </div>
  );
}