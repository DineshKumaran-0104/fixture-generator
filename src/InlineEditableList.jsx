import { useState, useEffect } from "react";

export default function InlineEditableList({ entries = [], onChange }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [error, setError] = useState("");

  const startEditing = (idx, currentValue) => {
    setEditingIndex(idx);
    setTempValue(currentValue);
  };

  const saveEdit = (idx) => {
    if(validEntry(idx)){
      const updated = [...entries];
      updated[idx] = {name: tempValue};
      onChange(updated); // 🔄 push change to parent
      setEditingIndex(null);
      setTempValue("");
    }
  };

  const validEntry = (idx) => {
    const trimmed = tempValue.trim();
    if (trimmed !== ""){
      if(entries.some((entry, index) => index!=idx && entry.name.toLowerCase() === trimmed.toLowerCase())){
        setError(`Found duplicates entry "${trimmed}"`);
        return false;
      } else {
        setError("");
        return true
      }
    }
    return false;
  }

  return (
    <div>
      <h3>Manual Entries</h3>
      <ul>
        {entries.map((entry, idx) => (
          <li key={idx}>
            {editingIndex === idx ? (
              <>
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
                {error && <p style={{ color: "red" }}>{error}</p>}
              </>
            ): (
              <span onClick={() => startEditing(idx, entry.name)}>{entry.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
