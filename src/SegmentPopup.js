import React, { useState } from "react";
import Dropdown from "./Dropdown";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const SegmentPopup = ({ onClose, onSave }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleAddSchema = () => {
    if (selectedValue) {
      setSelectedSchemas([...selectedSchemas, selectedValue]);
      setSelectedValue("");
    }
  };

  const handleSave = () => {
    const formattedSchemas = selectedSchemas.map((value) => {
      const option = schemaOptions.find((opt) => opt.value === value);
      return { [value]: option.label };
    });

    const payload = {
      segment_name: segmentName,
      schema: formattedSchemas,
    };

    fetch("https://webhook.site/your-webhook-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(() => {
      alert("Segment saved successfully!");
      onClose();
    });
  };

  const availableOptions = schemaOptions.filter(
    (option) => !selectedSchemas.includes(option.value)
  );

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Create Segment</h2>
        <input
          type="text"
          placeholder="Segment Name"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />

        <Dropdown
          options={availableOptions}
          selectedValue={selectedValue}
          onChange={setSelectedValue}
        />
        <button onClick={handleAddSchema}>+ Add new schema</button>

        <div className="selected-schemas">
          {selectedSchemas.map((schema, index) => (
            <Dropdown
              key={index}
              options={schemaOptions}
              selectedValue={schema}
              onChange={(value) => {
                const updatedSchemas = [...selectedSchemas];
                updatedSchemas[index] = value;
                setSelectedSchemas(updatedSchemas);
              }}
            />
          ))}
        </div>

        <button onClick={handleSave}>Save Segment</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SegmentPopup;
