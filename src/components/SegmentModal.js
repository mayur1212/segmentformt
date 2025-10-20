import React, { useState, useEffect } from "react";
import "./SegmentModal.css";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

export default function SegmentModal({ onClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [currentSchema, setCurrentSchema] = useState("");
  const [savedSegments, setSavedSegments] = useState([]);

  // Load saved segments from localStorage
  useEffect(() => {
    const segments = JSON.parse(localStorage.getItem("segments") || "[]");
    setSavedSegments(segments);
  }, []);

  const handleAddSchema = () => {
    if (currentSchema && !selectedSchemas.includes(currentSchema)) {
      setSelectedSchemas([...selectedSchemas, currentSchema]);
      setCurrentSchema("");
    }
  };

  const handleSchemaChange = (index, newValue) => {
    const updated = [...selectedSchemas];
    updated[index] = newValue;
    setSelectedSchemas(updated);
  };

  const handleRemoveSchema = (index) => {
    const updated = selectedSchemas.filter((_, i) => i !== index);
    setSelectedSchemas(updated);
  };

  const handleSave = () => {
    if (!segmentName || selectedSchemas.length === 0) {
      alert("Please enter a segment name and select at least one schema.");
      return;
    }

    const formattedSchema = selectedSchemas.map((s) => {
      const label = schemaOptions.find((opt) => opt.value === s)?.label || "";
      return { [s]: label };
    });

    const newSegment = {
      segment_name: segmentName,
      schema: formattedSchema,
    };

    const updatedSegments = [...savedSegments, newSegment];
    localStorage.setItem("segments", JSON.stringify(updatedSegments));
    setSavedSegments(updatedSegments);

    alert("✅ Segment saved locally!");
    onClose();
  };

  const availableOptions = schemaOptions.filter(
    (opt) => !selectedSchemas.includes(opt.value)
  );

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Create Segment</h3>
        <label>Segment Name</label>
        <input
          type="text"
          placeholder="Enter segment name"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />

        <div className="schema-box">
          {selectedSchemas.map((schema, index) => (
            <div key={index} className="schema-item">
              <select
                value={schema}
                onChange={(e) => handleSchemaChange(index, e.target.value)}
              >
                {schemaOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <button
                className="remove-btn"
                onClick={() => handleRemoveSchema(index)}
              >
                -
              </button>
            </div>
          ))}
        </div>

        <div className="add-schema-section">
          <select
            value={currentSchema}
            onChange={(e) => setCurrentSchema(e.target.value)}
          >
            <option value="">Add schema to segment</option>
            {availableOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button className="add-schema-link" onClick={handleAddSchema}>
            + Add Schema
          </button>
        </div>

        <div className="button-row">
          <button className="save-btn" onClick={handleSave}>
            Save Segment
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>

        {savedSegments.length > 0 && (
          <div className="saved-segments">
            <h4>Saved Segments</h4>
            <ul>
              {savedSegments.map((seg, idx) => (
                <li key={idx}>
                  <strong>{seg.segment_name}</strong> -{" "}
                  {seg.schema.map((s) => Object.values(s)).join(", ")}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
