import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

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

  const theme = createAppTheme(darkMode ? 'dark' : 'light');

  const formatDecimalInput = (value: string) =>
    value.replace(/[^0-9.]/g, '');

  const isFormValid =
    pressureAltitude.trim() !== '' &&
    qnh.trim() !== '' &&
    flightLevel.trim() !== '' &&
    temperature.trim() !== '' &&
    !isNaN(Number(pressureAltitude)) &&
    !isNaN(Number(qnh)) &&
    !isNaN(Number(flightLevel)) &&
    !isNaN(Number(temperature));

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

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Pressure Altitude (PA)"
                    variant="outlined"
                    value={pressureAltitude}
                    onChange={(e) => setPressureAltitude(formatDecimalInput(e.target.value))}
                    inputProps={{
                      inputMode: 'decimal',
                      pattern: '[0-9]*[.,]?[0-9]*',
                    }}
                    InputProps={{
                      endAdornment: <Typography variant="body2">ft</Typography>,
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="QNH"
                    variant="outlined"
                    value={qnh}
                    onChange={(e) => setQnh(formatDecimalInput(e.target.value))}
                    inputProps={{
                      inputMode: 'decimal',
                      pattern: '[0-9]*[.,]?[0-9]*',
                    }}
                    InputProps={{
                      endAdornment: <Typography variant="body2">hPa</Typography>,
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Flight Level (FL)"
                    variant="outlined"
                    value={flightLevel}
                    onChange={(e) => setFlightLevel(formatDecimalInput(e.target.value))}
                    inputProps={{
                      inputMode: 'decimal',
                      pattern: '[0-9]*[.,]?[0-9]*',
                    }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                  <TextField
                    fullWidth
                    label="Temperature on FL"
                    variant="outlined"
                    value={temperature}
                    onChange={(e) => setTemperature(formatDecimalInput(e.target.value))}
                    inputProps={{
                      inputMode: 'decimal',
                      pattern: '[0-9]*[.,]?[0-9]*',
                    }}
                    InputProps={{
                      endAdornment: <Typography variant="body2">°C</Typography>,
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={calculateErrors}
                  disabled={!isFormValid}
                  sx={{
                    px: 6,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  Calculate
                </Button>
              </Box>

              {results && (
                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    bgcolor: 'rgba(25, 118, 210, 0.05)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                    Results
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    <Box sx={{ flex: '1 1 200px' }}>
                      <Typography>ISA Temperature: {results.ISA} °C</Typography>
                      <Typography>Pressure Error: {results.PE} ft</Typography>
                      <Typography>Temperature Error: {results.TE} ft</Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 200px' }}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Combined Error: {results.CE} ft
                      </Typography>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        True Altitude: {results.TA} ft
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      onClick={handleReset}
                    >
                      Limpar
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AltitudeCalculatorApp />
  </React.StrictMode>
);