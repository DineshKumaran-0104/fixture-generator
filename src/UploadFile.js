import React, { useState } from "react";
import Papa from "papaparse";

function CsvUpload({ onClose, onComplete }) {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [uniqueColumn, setUniqueColumn] = useState("");

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
      Papa.parse(file, {
        header: true,       // Treat first row as headers
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data); // Save parsed rows in state
        },
      });
    }
  };

  const getDuplicates = () => {
    if (!uniqueColumn) return [];
    const seen = new Set();
    const duplicates = [];
    data.forEach((row) => {
      const val = row[uniqueColumn];
      if (seen.has(val)) duplicates.push(row);
      else seen.add(val);
    });
    return duplicates;
  };

  const handleDone = () => {
    onComplete({ fileName, uniqueColumn, data });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
        <h2 className="text-xl font-bold mb-4">Upload CSV</h2>

        <input type="file" accept=".csv" onChange={handleFileUpload} />

        {data.length > 0 && (
          <>
            <div className="mt-4">
              <label className="block mb-2 font-medium">Select Unique Column:</label>
              <select
                className="border rounded p-2 w-full"
                value={uniqueColumn}
                onChange={(e) => setUniqueColumn(e.target.value)}
              >
                <option value="">-- Select Column --</option>
                {Object.keys(data[0]).map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            {uniqueColumn && (
              <div className="mt-4">
                <h3 className="font-semibold">Preview (First 3 Rows)</h3>
                <table className="border-collapse border border-gray-400 mt-2 w-full text-sm">
                  <thead>
                    <tr>
                      {Object.keys(data[0]).map((key) => (
                        <th key={key} className="border p-1">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 3).map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="border p-1">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Show duplicates if any */}
                {getDuplicates().length > 0 && (
                  <p className="text-red-600 mt-2">
                    ⚠ Found {getDuplicates().length} duplicate rows for column "{uniqueColumn}"
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleDone} className="px-4 py-2 bg-blue-600 text-white rounded">
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CsvUpload;
