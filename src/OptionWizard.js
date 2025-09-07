import React, { useState } from "react";

function OptionWizard() {
    const [step, setStep] = useState(1);
    const [fixtureType, setFixtureType] = useState(""); // league | knockout
    const [knockoutTeams, setKnockoutTeams] = useState([]); // teams selected
    const [knockoutAdvance, setKnockoutAdvance] = useState(false);
  
    const [leagueAdvance, setLeagueAdvance] = useState(false);
    const [leagueOption, setLeagueOption] = useState(""); // round robin | sequential | snake
    const [leagueMode, setLeagueMode] = useState(""); // time | group
    const [leagueTime, setLeagueTime] = useState({ total: "", perMatch: "" });

    return (
        <div>
            {/* Step 1: Fixture Settings - Basic */}
        {step === 1 && (
          <div className="wizard-step">
            <h2>Step 1: Fixture Settings</h2>
            <p>Choose type of tournament</p>
            <div>
              <label>
                <input
                  type="radio"
                  name="fixtureType"
                  value="knockout"
                  checked={fixtureType === "knockout"}
                  onChange={(e) => setFixtureType(e.target.value)}
                />
                Knockout Stage
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="fixtureType"
                  value="league"
                  checked={fixtureType === "league"}
                  onChange={(e) => setFixtureType(e.target.value)}
                />
                League
              </label>
            </div>

            <button disabled={!fixtureType} onClick={() => setStep(2)}>
              Next ➡
            </button>
          </div>
        )}

        {/* Step 2: Knockout Settings */}
        {step === 2 && fixtureType === "knockout" && (
          <div className="wizard-step">
            <h2>Step 2: Knockout Settings</h2>

            <div className="advance-box">
              <h3>Advance Options</h3>
              <p>Select teams for direct qualification:</p>
              <select
                multiple
                value={knockoutTeams}
                onChange={(e) =>
                  setKnockoutTeams(
                    Array.from(e.target.selectedOptions, (o) => o.value)
                  )
                }
              >
                <option value="2">2 Teams (Semi-Finals)</option>
                <option value="4">4 Teams (Quarter-Finals)</option>
                <option value="6">6 Teams (Pre-Quarter)</option>
                <option value="8">8 Teams (Pre-Quarter)</option>
              </select>
              <p>
                Only even numbers allowed. Chosen:{" "}
                {knockoutTeams.length > 0
                  ? knockoutTeams.join(", ")
                  : "None"}
              </p>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button onClick={() => setStep(1)}>⬅ Back</button>
              <button onClick={() => setStep(3)}>Next ➡</button>
            </div>
          </div>
        )}

        {/* Step 2: League Settings */}
        {step === 2 && fixtureType === "league" && (
          <div className="wizard-step">
            <h2>Step 2: League Settings</h2>

            <div className="advance-box">
              <h3>Advance Options</h3>
              <p>Select League Type:</p>
              <label>
                <input
                  type="radio"
                  name="leagueOption"
                  value="roundrobin"
                  checked={leagueOption === "roundrobin"}
                  onChange={(e) => setLeagueOption(e.target.value)}
                />
                Round Robin
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="leagueOption"
                  value="sequential"
                  checked={leagueOption === "sequential"}
                  onChange={(e) => setLeagueOption(e.target.value)}
                />
                Sequential
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="leagueOption"
                  value="snake"
                  checked={leagueOption === "snake"}
                  onChange={(e) => setLeagueOption(e.target.value)}
                />
                Snake
              </label>

              <h4>Create League Based On:</h4>
              <label>
                <input
                  type="radio"
                  name="leagueMode"
                  value="time"
                  checked={leagueMode === "time"}
                  onChange={(e) => setLeagueMode(e.target.value)}
                />
                Available Time
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="leagueMode"
                  value="group"
                  checked={leagueMode === "group"}
                  onChange={(e) => setLeagueMode(e.target.value)}
                />
                Groups
              </label>

              {leagueMode === "time" && (
                <div>
                  <p>Enter total time and match time:</p>
                  <input
                    type="number"
                    placeholder="Total time available (minutes)"
                    value={leagueTime.total}
                    onChange={(e) =>
                      setLeagueTime({ ...leagueTime, total: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Each match duration (minutes)"
                    value={leagueTime.perMatch}
                    onChange={(e) =>
                      setLeagueTime({
                        ...leagueTime,
                        perMatch: e.target.value,
                      })
                    }
                  />
                </div>
              )}
            </div>

            <div style={{ marginTop: "20px" }}>
              <button onClick={() => setStep(1)}>⬅ Back</button>
              <button onClick={() => setStep(3)}>Next ➡</button>
            </div>
          </div>
        )}

        {/* Step 3: Final Confirmation */}
        {step === 3 && (
          <div className="wizard-step">
            <h2>Step 3: Confirm Settings</h2>
            <pre style={{ textAlign: "left", background: "#f9f9f9", padding: "10px" }}>
              {JSON.stringify(
                {
                  fixtureType,
                  knockoutAdvance,
                  knockoutTeams,
                  leagueAdvance,
                  leagueOption,
                  leagueMode,
                  leagueTime,
                },
                null,
                2
              )}
            </pre>

            <div style={{ marginTop: "20px" }}>
              <button onClick={() => setStep(2)}>⬅ Back</button>
              {/* <button
                onClick={() =>
                  onComplete({
                    fixtureType,
                    knockoutAdvance,
                    knockoutTeams,
                    leagueAdvance,
                    leagueOption,
                    leagueMode,
                    leagueTime,
                  })
                }
              >
                ✅ Confirm
              </button> */}
            </div>
          </div>
          )}
        </div>
    );
}


export default OptionWizard;