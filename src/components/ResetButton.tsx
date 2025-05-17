import React from 'react';
import Button from '@mui/material/Button';

interface ResetButtonProps {
    onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => (
    <Button onClick={onReset} color="secondary" variant="outlined" fullWidth>
        Limpar
    </Button>
);

export default ResetButton;