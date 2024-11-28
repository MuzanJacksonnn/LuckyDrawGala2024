import React, { useState, useEffect } from 'react';

const TimerComponent = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isAccessible, setIsAccessible] = useState(false);
  
  useEffect(() => {
    const targetDate = new Date('2024-11-29T22:30:00+09:00'); // Seoul time (UTC+9)
    
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        setIsAccessible(true);
        setTimeLeft('');
        return;
      }
      
      // Calculate remaining time
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      setIsAccessible(false);
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!isAccessible) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
        <div className="bg-black bg-opacity-50 p-8 rounded-lg backdrop-blur-sm max-w-lg w-full text-center">
          <h1 className="text-3xl font-bold mb-6">FKCCI Gala 2024 Lucky Draw</h1>
          <p className="text-xl mb-4">Results will be available at 22:30 on November 29th, 2024 (Seoul time)</p>
          <div className="text-2xl font-mono bg-red-900 rounded-lg p-4 mb-4">
            {timeLeft}
          </div>
          <p className="text-sm opacity-75">Please come back when the timer reaches zero.</p>
        </div>
      </div>
    );
  }
  
  return children;
};

export default TimerComponent;
