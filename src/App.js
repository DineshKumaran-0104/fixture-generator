import React, { useState } from "react";
import WizardModal from "./WizardModal";
import "./App.css";
import OptionWizard from "./OptionWizard";
import LeagueTable from "./LeagueTable";
import KnockoutBracket from "./KnockoutBracket";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [finalData, setFinalData] = useState(null);
  const [previewMode, setPreviewMode] = useState(false); // NEW → to know if user clicked Preview
  const [fixtureOption, setFixtureOption] = useState(null);
  const [dummyArray, setDummyArray] = useState([]);

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

        <OptionWizard onComplete={(data)=>{
          setFixtureOption(data);
        }}/>
        </div>
      )}

      {fixtureOption && fixtureOption.fixtureType === "league" && finalData && (
        <div>
          <LeagueTable teams={finalData.data}/>
          </div>
      )}

      {fixtureOption && fixtureOption.fixtureType === "knockout" && finalData && (
        <div>
          <KnockoutBracket teams={finalData.data} />
        </div>
      )}
    </div>
  );
}

export default App;
