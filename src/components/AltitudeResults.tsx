import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Results {
  ISA: string;
  PE: string;
  TE: string;
  CE: string;
  TA: string;
}

interface AltitudeResultsProps {
  results: Results;
  onReset: () => void;
}

const AltitudeResults: React.FC<AltitudeResultsProps> = ({ results, onReset }) => (
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
        onClick={onReset}
      >
        Reset
      </Button>
    </Box>
  </Box>
);

export default AltitudeResults;