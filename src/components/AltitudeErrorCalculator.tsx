import React, { useState, useMemo } from 'react';
import ResetButton from './ResetButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AltitudeErrorCalculator: React.FC = () => {
    const [pressureAltitude, setPressureAltitude] = useState('');
    const [flightLevel, setFlightLevel] = useState('');
    const [qnh, setQnh] = useState('');
    const [temperature, setTemperature] = useState('');
    const [results, setResults] = useState<{
        pressureError: number;
        temperatureError: number;
        combinedError: number;
        trueAltitude: number;
        isaTemp: number;
    } | null>(null);
    const [error, setError] = useState('');

    const isFormValid = useMemo(() => {
        const pa = Number(pressureAltitude);
        const fl = Number(flightLevel);
        const qnhVal = Number(qnh);
        const temp = Number(temperature);

        return (
            pressureAltitude.trim() !== '' &&
            flightLevel.trim() !== '' &&
            qnh.trim() !== '' &&
            temperature.trim() !== '' &&
            !isNaN(pa) &&
            !isNaN(fl) &&
            !isNaN(qnhVal) &&
            !isNaN(temp)
        );
    }, [pressureAltitude, flightLevel, qnh, temperature]);

    const calculateErrors = () => {
        const paNum = Number(pressureAltitude);
        const qnhNum = Number(qnh);
        const tempNum = Number(temperature);
        const flNum = Number(flightLevel);

        const QNE = 1013.2;
        const isaTemp = 15 - (2 * paNum) / 1000;

        const pressureError = (qnhNum - QNE) * 30;
        const temperatureError = (tempNum - isaTemp) * 0.4 * flNum;
        const combinedError = pressureError + temperatureError;
        const trueAltitude = paNum + combinedError;

        if ([pressureError, temperatureError, combinedError, trueAltitude].some(isNaN)) {
            setError('Erro no cálculo. Verifique os valores inseridos.');
            return null;
        }

        return { pressureError, temperatureError, combinedError, trueAltitude, isaTemp };
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResults(null);

        if (!isFormValid) {
            setError('Por favor, preencha todos os campos com valores numéricos válidos.');
            return;
        }

        const calculatedResults = calculateErrors();
        if (calculatedResults) {
            setResults(calculatedResults);
        }
    };

    const handleReset = () => {
        setPressureAltitude('');
        setFlightLevel('');
        setQnh('');
        setTemperature('');
        setResults(null);
        setError('');
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: '400px',
                margin: 'auto',
                padding: 3,
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 1,
                bgcolor: 'background.paper'
            }}
            autoComplete="off"
        >
            <Typography variant="h6" align="center">
                Calculadora de Erro Altimétrico
            </Typography>

            <TextField
                label="Pressure Altitude (ft)"
                type="number"
                variant="outlined"
                value={pressureAltitude}
                onChange={(e) => setPressureAltitude(e.target.value)}
                fullWidth
            />
            <TextField
                label="QNH (hPa)"
                type="number"
                variant="outlined"
                value={qnh}
                onChange={(e) => setQnh(e.target.value)}
                fullWidth
            />
            <TextField
                label="Flight Level (sem FL, ex: 250)"
                type="number"
                variant="outlined"
                value={flightLevel}
                onChange={(e) => setFlightLevel(e.target.value)}
                fullWidth
            />
            <TextField
                label="Temperatura (°C)"
                type="number"
                variant="outlined"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                fullWidth
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isFormValid}
                fullWidth
                sx={{ mt: 1 }}
            >
                Calcular
            </Button>

            {results && (
                <Box
                    sx={{
                        mt: 2,
                        p: 2,
                        border: '1px dashed grey',
                        borderRadius: '4px',
                        bgcolor: '#f9f9f9'
                    }}
                >
                    <Typography><strong>ISA:</strong> {results.isaTemp.toFixed(2)} °C</Typography>
                    <Typography><strong>Erro de Pressão:</strong> {results.pressureError.toFixed(2)} ft</Typography>
                    <Typography><strong>Erro de Temperatura:</strong> {results.temperatureError.toFixed(2)} ft</Typography>
                    <Typography><strong>Erro Combinado:</strong> {results.combinedError.toFixed(2)} ft</Typography>
                    <Typography><strong>Altitude Real:</strong> {results.trueAltitude.toFixed(2)} ft</Typography>
                    <ResetButton onReset={handleReset} />
                </Box>
            )}
        </Box>
    );
};

export default AltitudeErrorCalculator;