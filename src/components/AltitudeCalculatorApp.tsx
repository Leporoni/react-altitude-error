import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Typography, Paper, Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AltitudeForm from './AltitudeForm';
import AltitudeResults from './AltitudeResults';

interface Results {
  ISA: string;
  PE: string;
  TE: string;
  CE: string;
  TA: string;
}

const createAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
    },
  });

const AltitudeCalculatorApp: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [pressureAltitude, setPressureAltitude] = useState('');
  const [qnh, setQnh] = useState('');
  const [flightLevel, setFlightLevel] = useState('');
  const [temperature, setTemperature] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  const isFormValid =
    pressureAltitude.trim() !== '' &&
    qnh.trim() !== '' &&
    flightLevel.trim() !== '' &&
    temperature.trim() !== '' &&
    !isNaN(Number(pressureAltitude)) &&
    !isNaN(Number(qnh)) &&
    !isNaN(Number(flightLevel)) &&
    !isNaN(Number(temperature));

  const handleChange = (field: string, value: string) => {
    switch (field) {
      case 'pressureAltitude':
        setPressureAltitude(value);
        break;
      case 'qnh':
        setQnh(value);
        break;
      case 'flightLevel':
        setFlightLevel(value);
        break;
      case 'temperature':
        setTemperature(value);
        break;
      default:
        break;
    }
  };

  const calculateErrors = () => {
    const PA = parseFloat(pressureAltitude);
    const QNH = parseFloat(qnh);
    const FL = parseFloat(flightLevel);
    const T = parseFloat(temperature);

    if ([PA, QNH, FL, T].some((v) => isNaN(v))) {
      setResults({
        ISA: 'NaN',
        PE: 'NaN',
        TE: 'NaN',
        CE: 'NaN',
        TA: 'NaN',
      });
      return;
    }

    const ISA = 15 - (2 * PA) / 1000;
    const QNE = 1013.2;
    const PE = (QNH - QNE) * 30;
    const TE = (T - ISA) * 0.4 * FL;
    const CE = PE + TE;
    const TA = PA + CE;

    setResults({
      ISA: ISA.toFixed(2),
      PE: PE.toFixed(2),
      TE: TE.toFixed(2),
      CE: CE.toFixed(2),
      TA: TA.toFixed(2),
    });
  };

  const handleReset = () => {
    setPressureAltitude('');
    setQnh('');
    setFlightLevel('');
    setTemperature('');
    setResults(null);
  };

  const theme = createAppTheme(darkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, position: 'relative' }}>
            <Box sx={{ position: 'absolute', right: 16, top: 16 }}>
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
            <Typography
              variant="h4"
              align="center"
              sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}
            >
              Altimetry Calculator
            </Typography>
            <AltitudeForm
              pressureAltitude={pressureAltitude}
              qnh={qnh}
              flightLevel={flightLevel}
              temperature={temperature}
              onChange={handleChange}
              onCalculate={calculateErrors}
              isFormValid={isFormValid}
            />
            {results && (
              <AltitudeResults results={results} onReset={handleReset} />
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AltitudeCalculatorApp;