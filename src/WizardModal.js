import React, { useState, useEffect  } from "react";
import Papa from "papaparse";
import "./WizardModal.css";
import InlineEditableList from "./InlineEditableList";
//import "./App.css";

function WizardModal({ onClose, onComplete, initialData, previewMode }) {
  const [step, setStep] = useState(previewMode ? 3 : 1);
  const [method, setMethod] = useState(initialData && initialData.method? initialData.method :null);
  const [csvData, setCsvData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [uniqueColumn, setUniqueColumn] = useState(initialData && initialData.uniqueColumn ? initialData.uniqueColumn : "");
  const [displayColumn, setDisplayColumn] = useState(initialData && initialData.displayColumn ? initialData.displayColumn : "");
  const [manualEntries, setManualEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [error, setError] = useState("");
  const [duplicateRows, setDuplicateRows] = useState([]);
  const [finalData, setFinalData] = useState(initialData || null);

  // Handle CSV Upload
  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // Clean rows: remove rows where all values are empty/whitespace
        const cleanedData = results.data.filter(row => {
          return Object.values(row).some(val => val && val.trim() !== "");
        });
        setHeaders(Object.keys(cleanedData[0] || {}));
        setCsvData({ fileName: file.name, data:cleanedData });
        setStep(2); // go to unique column validation step
      },
    });
  };

  useEffect(() => {
    if (previewMode && initialData) {
      setCsvData(initialData);
      setStep(3);
    }
  }, [previewMode, initialData]);

  useEffect(() => {
    if (method === "csv" && csvData) {
      setFinalData({
        method,
        fileName: csvData?.fileName,
        uniqueColumn,
        data: csvData?.data,
        displayColumn
      });
    } else if (method === "manual" && manualEntries.length > 0) {
      setFinalData({
        method,
        data: manualEntries,
      });
    }
  }, [method, csvData, manualEntries, uniqueColumn, displayColumn]);

  // Validate unique column
  const validateUniqueColumn = (dataOverride) => {
    const data = dataOverride && dataOverride.data ? dataOverride.data : csvData.data;
    if (!uniqueColumn) return;
  
    const seen = new Set();
    const duplicates = [];
  
    data.forEach((row, index) => {
      const value = row[uniqueColumn];
      if (seen.has(value)) {
        duplicates.push({ index, value, row });
      } else {
        seen.add(value);
      }
    });
  
    if (duplicates.length > 0) {
      setError(`Found ${duplicates.length} duplicates in column "${uniqueColumn}"`);
      setDuplicateRows(duplicates);
      return false;
    }
  
    // no duplicates -> move forward
    setError("");
    setDuplicateRows([]);
    setStep(3);
    return true;
  };
  

  //const columns = csvData ? Object.keys(csvData.data[0] || {}) : [];

  // Handle manual entry add
  const addManualEntry = () => {
    const trimmed = newEntry.trim();
    if (trimmed !== ""){
      if(manualEntries.some((entry) => entry.name.toLowerCase() === trimmed.toLowerCase())){
        setError(`Found duplicates entry "${trimmed}"`);
      } else {
        setManualEntries([...manualEntries, { name: trimmed }]);
        setNewEntry("");
        setError("");
      }
    }
  };

  const removeRow = (rowIndex) => {
    const updatedData = csvData.data.filter((_, idx) => idx !== rowIndex);
  
    const newCsvData = { ...csvData, data: updatedData };
    setCsvData(newCsvData);
  
    // Re-run validation on the updated data
    validateUniqueColumn(newCsvData);
  };
  

  return (
    <div role="dialog" aria-modal="true" aria-label="Wizard Modal" className="popup-overlay">
      <div className="popup-content">
        {/* Close button */}
        <button aria-label="Close" className="close-btn" onClick={onClose}>
          ✖
        </button>

        {/* Step 1: Choose method */}
        {step === 1 && (
          <div className="wizard-step">
            <h2>Step 1: Choose Input Method</h2>
            <button onClick={() => { setMethod("csv"); setStep(2); }}>
              Upload CSV
            </button>
            <button aria-label="Add Manual Entry" onClick={() => { setMethod("manual"); setStep(2); }}>
              Add Manually
            </button>
          </div>
        )}

        {/* Step 2: Input Data */}
        {step === 2 && method === "csv" && (
          <div className="wizard-step">
            <h2>Step 2: Upload CSV</h2>
            <input type="file" accept=".csv" onChange={handleCsvUpload} />
            {csvData && (
              <div>
                <p>File: {csvData.fileName}</p>
                <div>
                  <label>Choose Unique Column:</label>
                  <select
                    value={uniqueColumn}
                    onChange={(e) => setUniqueColumn(e.target.value)}
                  >
                    <option value="">--Select--</option>
                    {headers.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Choose Display Column:</label>
                  <select
                    value={displayColumn}
                    onChange={(e) => setDisplayColumn(e.target.value)}
                  >
                    <option value="">--Select--</option>
                    {headers.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {duplicateRows.length > 0 && (
              <div style={{ maxHeight: "200px", overflowY: "auto", marginTop: "10px" }}>
                <h4>Duplicate Rows:</h4>
                <p>Secound duplicate element will be listed below</p>
                <table border="1" width="100%">
                  <thead>
                    <tr>
                      <th>Row Index</th>
                      <th>Duplicate Value</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {duplicateRows.map((dup, i) => (
                      <tr key={i}>
                        <td>{dup.index + 1}</td>
                        <td>{dup.value}</td>
                        <td>
                          <button
                            onClick={() => removeRow(dup.index)}
                            style={{ color: "red" }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div style={{ marginTop: "20px" }}>
              <button onClick={validateUniqueColumn} disabled={!uniqueColumn}>
                Next
              </button>
              <button onClick={() => setStep(1)}>Back</button>
            </div>
            {/* <button disabled={!csvData} onClick={() => setStep(3)}>Next</button> */}
          </div>
        )}

        {step === 2 && method === "manual" && (
          <div className="wizard-step">
            <h2>Step 2: Add Manual Entries</h2>
            <input
              type="text"
              data-testid="player-input"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Enter player/team name"
            />
            <button aria-label="Add Individual Entry" onClick={addManualEntry}>Add</button>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <InlineEditableList entries={manualEntries} onChange={setManualEntries} />
            <button disabled={manualEntries.length === 0} onClick={() => setStep(3)}>
              Next
            </button>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === 3 && (
          <div className="wizard-step">
            <h2>Step 3: Preview Data</h2>
            <p>First 5 rows for preview</p>
            <div className="preview-box">
              {finalData.data && finalData.data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      {method === "csv"
                        ? <th> {finalData.displayColumn} </th>
                        : <th>Name</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {finalData.data.slice(0, 5).map((row, idx) => (
                      <tr key={idx}>
                        {method === "csv"
                          ? <th> {row[finalData.displayColumn] + " ("+ row[finalData.uniqueColumn]+")"} </th>
                          : <td>{row.name}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No data available</p>
              )}
            </div>
            <button onClick={() => setStep(4)}>Next</button>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="wizard-step">
            <h2>Step 4: Confirm</h2>
            <p>Are you sure you want to save?</p>
            <button onClick={() => setStep(3)}>Back</button>
            <button onClick={() => onComplete(finalData)}>✅ Confirm</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WizardModal;
