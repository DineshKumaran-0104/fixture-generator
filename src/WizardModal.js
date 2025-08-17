// WizardModal.js
import React, { useState } from "react";
import "./WizardModal.css";
import CsvUpload from "./UploadFile";

function WizardModal({ onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(null); // "csv" or "manual"
  const [entries, setEntries] = useState([]);

  // Manual entry state
  const [manualName, setManualName] = useState("");
  const [manualList, setManualList] = useState([]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>X</button>

        {/* Step 1: Choose Mode */}
        {step === 1 && (
          <div>
            <h2>Select Input Method</h2>
            <button onClick={() => { setMode("csv"); handleNext(); }}>
              Upload CSV
            </button>
            <button onClick={() => { setMode("manual"); handleNext(); }}>
              Manual Entry
            </button>
          </div>
        )}

        {/* Step 2: Based on Mode */}
        {step === 2 && mode === "csv" && (
          <div>
            {/* <h2>Upload CSV</h2> */}
            <CsvUpload
              onClose={onClose}
              onComplete={(data) => {
                setEntries(data.data);
                setMode("csv");
                handleNext();
              }}
            />
            <button onClick={handleBack}>Back</button>
          </div>
        )}

        {step === 2 && mode === "manual" && (
          <div>
            <h2>Manual Entry</h2>
            <input
              type="text"
              placeholder="Enter team/player name"
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
            />
            <button
              onClick={() => {
                if (manualName.trim()) {
                  setManualList([...manualList, { name: manualName }]);
                  setManualName("");
                }
              }}
            >
              Add
            </button>

            <ul>
              {manualList.map((item, idx) => (
                <li key={idx}>{item.name}</li>
              ))}
            </ul>

            <button onClick={handleBack}>Back</button>
            <button
              onClick={() => {
                setEntries(manualList);
                handleNext();
              }}
              disabled={manualList.length === 0}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === 3 && (
          <div>
            <h2>Preview Entries</h2>
            <ul>
              {entries.map((item, idx) => (
                <li key={idx}>{item.name || JSON.stringify(item)}</li>
              ))}
            </ul>
            <button onClick={handleBack}>Back</button>
            <button
              onClick={() => onComplete({ mode, entries })}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WizardModal;
