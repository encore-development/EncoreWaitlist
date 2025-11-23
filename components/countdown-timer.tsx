'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimerUnit = ({ 
    number, 
    label, 
    isVisible 
  }: { 
    number: number; 
    label: string; 
    isVisible: boolean 
  }) => (
    <div
      className={`flex flex-col items-center justify-center transform transition-all duration-600 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        background: '#121212',
        width: 'clamp(70px, 20vw, 132px)',
        height: 'clamp(70px, 20vw, 96px)',
        borderRadius: '24px',
        gap: '0px'
      }}
    >
      <div
        className="font-inter font-semibold"
        style={{
          fontSize: 'clamp(20px, 5vw, 32px)',
          color: '#DEDEDE',
          lineHeight: '100%',
          letterSpacing: '0px'
        }}
      >
        {String(number).padStart(2, '0')}
      </div>
      <div
        className="font-inter font-light mt-2"
        style={{
          fontSize: 'clamp(8px, 2.5vw, 12px)',
          color: '#DEDEDE',
          lineHeight: '100%',
          letterSpacing: '0px'
        }}
      >
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center w-full px-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-8 w-full max-w-2xl justify-items-center">
        <TimerUnit number={timeLeft.days} label="Days" isVisible={isLoaded} />
        <TimerUnit number={timeLeft.hours} label="Hours" isVisible={isLoaded} />
        <TimerUnit number={timeLeft.minutes} label="Minutes" isVisible={isLoaded} />
        <TimerUnit number={timeLeft.seconds} label="Seconds" isVisible={isLoaded} />
      </div>
    </div>
  );
}
