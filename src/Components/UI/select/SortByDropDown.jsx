import React from 'react';
import "../../../style_components/UI/select/sortbydropdown.css";


const SortByDropDown = ({options, value, onChange}) => {
    return (
            <select value={value} onChange={event => onChange(event.target.value)} className="sort-by-drop-down" name="Sort by">
                {options.map(option => <option key={option.id} value={option.value}>{option.name}</option>)}
            </select>
    );
};

export default SortByDropDown;