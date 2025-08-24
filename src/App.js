import React, { useState } from "react";
import WizardModal from "./WizardModal";
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [finalData, setFinalData] = useState(null);
  const [previewMode, setPreviewMode] = useState(false); // NEW → to know if user clicked Preview

  return (
    <div className="App">
      <h1>Fixture Generator</h1>

      {/* Button to open wizard modal */}
      <button onClick={() => {
        setPreviewMode(false);  // normal add flow
        setShowPopup(true)}}>
          Add Teams/Players
      </button>

      {/* Wizard modal popup */}
      {showPopup && (
        <WizardModal
          initialData={previewMode ? finalData : null} // pass finalData only when preview
          previewMode={previewMode}
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
            onClick={() => {
              setPreviewMode(true);
              setShowPopup(true)
            }}
          >
            👁 Preview Data
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
