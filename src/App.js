import React, { useState } from "react";
import WizardModal from "./WizardModal";
import "./App.css";

function App() {
  const [showWizard, setShowWizard] = useState(false);
  const [finalData, setFinalData] = useState(null);

  return (
    <div className="App">
      <h1>Fixture Generator</h1>

      {/* Button to upload files */}
      <button onClick={() => setShowWizard(true)}>Add Teams / Players</button>

      {/* Show popup if true */}
      {showWizard && (
        <WizardModal
          onClose={() => setShowWizard(false)}
          onComplete={(data) => {
            setFinalData(data);
            setShowWizard(false);
          }}
        />
      )}

      {/* Show result preview */}
      {finalData && (
        <div className="preview">
          <h2>Final Data</h2>
          <p>Mode: {finalData.mode}</p>
          <p>Total Entries: {finalData.entries.length}</p>
          <ul>
            {finalData.entries.map((item, idx) => (
              <li key={idx}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
