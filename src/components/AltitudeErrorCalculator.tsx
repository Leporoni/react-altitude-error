import React, { useState } from 'react';

const AltitudeErrorCalculator: React.FC = () => {
    const [pressureAltitude, setPressureAltitude] = useState<number>(0);
    const [qnh, setQnh] = useState<number>(1013.25);
    const [flightLevel, setFlightLevel] = useState<number>(0);
    const [temperature, setTemperature] = useState<number>(15);

    const calculateErrors = () => {
        const pressureError = (pressureAltitude - (qnh * 30)) / 30;
        const temperatureError = (temperature - 15) * 0.1;
        const combinedError = pressureError + temperatureError;
        const trueAltitude = pressureAltitude + combinedError;

        return { pressureError, temperatureError, combinedError, trueAltitude };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors = calculateErrors();
        alert(`Pressure Error: ${errors.pressureError.toFixed(2)}\nTemperature Error: ${errors.temperatureError.toFixed(2)}\nCombined Error: ${errors.combinedError.toFixed(2)}\nTrue Altitude: ${errors.trueAltitude.toFixed(2)}`);
    };

    return (
        <div>
            <h2>Altitude Error Calculator</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Pressure Altitude (ft):</label>
                    <input type="number" value={pressureAltitude} onChange={(e) => setPressureAltitude(Number(e.target.value))} />
                </div>
                <div>
                    <label>QNH (hPa):</label>
                    <input type="number" value={qnh} onChange={(e) => setQnh(Number(e.target.value))} />
                </div>
                <div>
                    <label>Flight Level (ft):</label>
                    <input type="number" value={flightLevel} onChange={(e) => setFlightLevel(Number(e.target.value))} />
                </div>
                <div>
                    <label>Temperature (°C):</label>
                    <input type="number" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} />
                </div>
                <button type="submit">Calculate</button>
            </form>
        </div>
    );
};

export default AltitudeErrorCalculator;