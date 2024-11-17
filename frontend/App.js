import React, { useState } from "react";
import List, { teamsWithLogos } from "./List"; // Import teamsWithLogos from List.js
import "./App.css";

function App() {
    const [selectedTeam, setSelectedTeam] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [predictedAttendance, setPredictedAttendance] = useState(null);

    const handleTeamChange = async (event) => {
        const team = event.target.value;
        setSelectedTeam(team);

        if (team) {
            try {
                const response = await fetch(
                    `http://13.56.140.152:8080/schedule?team=${team}`
                );
                const data = await response.json();
                setSchedule(data);
            } catch (error) {
                console.error("Error fetching schedule:", error);
                setSchedule([]);
            }
        } else {
            setSchedule([]);
        }
    };

    const fetchPrediction = async (rowIndex) => {
        console.log("Fetching prediction for row:", rowIndex);
        try {
            const response = await fetch("http://13.56.140.152:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    team: selectedTeam,
                    row_index: rowIndex,
                }),
            });

            const data = await response.json();

            if (data.predicted_attendance) {
                console.log("Prediction fetched successfully:", data.predicted_attendance);
                setPredictedAttendance(data.predicted_attendance);
            } else {
                console.error("Failed to get prediction:", data.error);
                setPredictedAttendance("Error fetching prediction");
            }
        } catch (error) {
            console.error("Error fetching prediction:", error);
            setPredictedAttendance("Error fetching prediction");
        }
    };

    const getTeamLogo = (teamName) => {
        const team = teamsWithLogos.find((t) => t.name === teamName);
        return team ? team.logo : "";
    };

    return (
        <div>
            <header>
                <h1>NBA Game Attendance Predictor</h1>
                <hr />
                <p>Please Select Your NBA Team:</p>
                <select name="teams" id="teams" onChange={handleTeamChange}>
                    <option value="">Select a team</option>
                    {teamsWithLogos.map((team, index) => (
                        <option key={index} value={team.value}>
                            {team.name}
                        </option>
                    ))}
                </select>
                <hr />
                {selectedTeam && (
                    <div>
                        <h2>
                            Schedule for{" "}
                            {
                                teamsWithLogos.find((t) => t.value === selectedTeam)
                                    ?.name
                            }
                        </h2>
                        {schedule.length > 0 ? (
                            <div>
                                <table id="gamesTable">
                                    <thead>
                                        <tr>
                                            <th>Team</th>
                                            <th>Opponent Team</th>
                                            <th>Game Number</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.map((game, index) => (
                                            <tr
                                                key={index}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  console.log("Row clicked with index:", index);
                                                  fetchPrediction(index);
                                              }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <td>
                                                    <img
                                                        src={getTeamLogo(game.Team)}
                                                        alt={game.Team}
                                                        style={{
                                                            width: "20px",
                                                            marginRight: "10px",
                                                        }}
                                                    />
                                                    {game.Team}
                                                </td>
                                                <td>
                                                    <img
                                                        src={getTeamLogo(
                                                            game["Opponent Team"]
                                                        )}
                                                        alt={game["Opponent Team"]}
                                                        style={{
                                                            width: "20px",
                                                            marginRight: "10px",
                                                        }}
                                                    />
                                                    {game["Opponent Team"]}
                                                </td>
                                                <td>{game["Game Number"]}</td>
                                                <td>{game.Date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {predictedAttendance !== null && (
                                    <div style={{ marginTop: "20px" }}>
                                        <h3>Predicted Attendance:</h3>
                                        <p>{predictedAttendance*100}%</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>
                                Loading schedule for{" "}
                                {
                                    teamsWithLogos.find(
                                        (t) => t.value === selectedTeam
                                    )?.name
                                }
                                ...
                            </p>
                        )}
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
