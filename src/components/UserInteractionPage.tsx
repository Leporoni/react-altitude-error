import React from 'react';
import AltitudeErrorCalculator from './AltitudeErrorCalculator';

const UserInteractionPage: React.FC = () => {
    return (
        <div className="user-interaction-page">
            <h1>Altitude Error Calculator</h1>
            <AltitudeErrorCalculator />
        </div>
    );
};

export default UserInteractionPage;