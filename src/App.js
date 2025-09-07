import React, { useState } from "react";
import WizardModal from "./WizardModal";
import "./App.css";
import OptionWizard from "./OptionWizard";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [finalData, setFinalData] = useState(null);
  const [previewMode, setPreviewMode] = useState(false); // NEW → to know if user clicked Preview
  const [fixtureType, setFixtureType] = useState(""); // league | knockout
  const [knockoutTeams, setKnockoutTeams] = useState([]); // teams selected
  const [knockoutAdvance, setKnockoutAdvance] = useState(false);

  const [leagueAdvance, setLeagueAdvance] = useState(false);
  const [leagueOption, setLeagueOption] = useState(""); // round robin | sequential | snake
  const [leagueMode, setLeagueMode] = useState(""); // time | group
  const [leagueTime, setLeagueTime] = useState({ total: "", perMatch: "" });

  const [step, setStep] = useState(1);

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
        <div>
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

        <OptionWizard />
        </div>
      )}
    </div>
  );
}

export default App;
