import { useState, useEffect } from "react";

export default function InlineEditableList({ entries = [], onChange }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const startEditing = (idx, currentValue) => {
    setEditingIndex(idx);
    setTempValue(currentValue);
  };

  const saveEdit = (idx) => {
    const updated = [...entries];
    updated[idx] = {name: tempValue};
    onChange(updated); // 🔄 push change to parent
    setEditingIndex(null);
    setTempValue("");
  };

  return (
    <div>
      <h3>Manual Entries</h3>
      <ul>
        {entries.map((entry, idx) => (
          <li key={idx}>
            {editingIndex === idx ? (
              <input
                type="text"
                value={tempValue}
                autoFocus
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => saveEdit(idx)} // save on blur
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(idx);
                  if (e.key === "Escape") setEditingIndex(null);
                }}
              />
            ) : (
              <span onClick={() => startEditing(idx, entry.name)}>{entry.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
