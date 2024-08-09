import React, {useState} from 'react';
import { Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel } from '@mui/material';
const CheckboxSelect = ({
    label,
    options,
    selectedValues,
    handleSelect,
}) => {

    const [selectAll, setSelectAll] = useState(false);
    const [selectAllOption, setselectAllOption] = useState('Select All');

    const handleSelectChange = (event) => {
        let newSelectedValues = event.target.value;
        console.log("event target:",event.target.value)
        console.log("selected values:",selectedValues)

        if (newSelectedValues.includes("All")) {
            handleSelect(options.map((m)=>m));
        } else {
            handleSelect([]);
            console.log("unSelect",selectedValues)
            handleSelect(newSelectedValues);

        }
    };


    const renderValue = (selected) => {
        if (selected.length === 0) {
            return <em>{label}</em>;
        }
        return selected.join(', ');
    };

    return (
        <div style={{ marginTop: "10px" }}>
            <FormControl size='small'  >
                <InputLabel>{label}</InputLabel>
                <Select
                    multiple
                    displayEmpty
                    label="Tippers"
                    placeholder="Select Tipper"
                    value={selectedValues}
                    onChange={handleSelectChange}
                    renderValue={renderValue}
                >
                    {/* <MenuItem key={selectAllOption} value={selectAllOption}>
                        <Checkbox checked={selectAll} />
                        <ListItemText primary={selectAll ? "Unselect All" : "Select All"} />
                    </MenuItem> */}
                    {options.map((option,index) => (
                        <MenuItem key={option} value={option}>
                            <Checkbox checked={selectedValues.includes(option)} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>

    );
};

export default CheckboxSelect;