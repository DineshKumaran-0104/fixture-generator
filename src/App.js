import React, { useState } from "react";
import WizardModal from "./WizardModal";
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [finalData, setFinalData] = useState(null);

  return (
    <div className="App">
      <h1>Fixture Generator</h1>

      {/* Button to open wizard modal */}
      <button onClick={() => setShowPopup(true)}>Add Teams/Players</button>

      {/* Wizard modal popup */}
      {showPopup && (
        <WizardModal
          onClose={() => setShowPopup(false)}
          onComplete={(data) => {
            setFinalData(data);
            setShowPopup(false);
          }}
        />
      )}

      {/* Preview icon on main page */}
      {finalData && (
        <div className="preview-container">
          <h2>Preview</h2>
          <button
            className="preview-btn"
            onClick={() => setShowPopup(true)}
          >
            👁 Preview Data
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
