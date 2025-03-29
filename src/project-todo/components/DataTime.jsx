import React, { useState, useEffect } from 'react';  // Added hooks import

export const DateTime = () => {  // Fixed component name
    const [dateTime, setDateTime] = useState("");
    
    const getDatetime = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();
        setDateTime(`${formattedDate} - ${formattedTime}`);  // Added space around dash
    };

    useEffect(() => {
        getDatetime(); // Call immediately to avoid initial empty state
        const intervalId = setInterval(getDatetime, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <h2 className="date-time">{dateTime}</h2> 
    );
}