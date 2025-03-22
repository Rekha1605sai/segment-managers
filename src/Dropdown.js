import React from "react";

const Dropdown = ({ options, selectedValue, onChange }) => {
  return (
    <select value={selectedValue} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
