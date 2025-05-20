import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

interface AltitudeFormProps {
  pressureAltitude: string;
  qnh: string;
  flightLevel: string;
  temperature: string;
  onChange: (field: string, value: string) => void;
  onCalculate: () => void;
  isFormValid: boolean;
}

const AltitudeForm: React.FC<AltitudeFormProps> = ({
  pressureAltitude,
  qnh,
  flightLevel,
  temperature,
  onChange,
  onCalculate,
  isFormValid,
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
        <TextField
          fullWidth
          label="Pressure Altitude (PA)"
          variant="outlined"
          value={pressureAltitude}
          onChange={(e) => onChange('pressureAltitude', e.target.value.replace(/[^0-9.]/g, ''))}
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
          onChange={(e) => onChange('qnh', e.target.value.replace(/[^0-9.]/g, ''))}
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
          onChange={(e) => onChange('flightLevel', e.target.value.replace(/[^0-9.]/g, ''))}
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
          onChange={(e) => onChange('temperature', e.target.value.replace(/[^0-9.]/g, ''))}
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
        onClick={onCalculate}
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
  </Box>
);

export default AltitudeForm;