import React, { useEffect, useState } from 'react';

const CinemaSeat = ({ seatNumber, isClickable, updateSeatState}) => {
  const [seatColor, setSeatColor] = useState('midnightblue');

useEffect(() => {
    if (isClickable === 2){
        setSeatColor('grey')
    }

}, [isClickable]);

  const handleClick = () => {
    if (isClickable===1) {
        if (seatColor==='green'){
            setSeatColor('midnightblue');
            updateSeatState(seatNumber, false);
        }
        else {
            setSeatColor('green');
            updateSeatState(seatNumber, true);
        }
    }
  };


  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="400">
      <g onClick={handleClick} style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}>
        <rect
          x={50 + (seatNumber % 10) * 40}
          y={70 + Math.floor(seatNumber / 10) * 50}
          width="30"
          height="40"
          fill={seatColor}
        />
        <text
          x={50 + (seatNumber % 10) * 40 + 15}
          y={70 + Math.floor(seatNumber / 10) * 50 + 25}
          textAnchor="middle"
          fill="white"
        >
          {seatNumber}
        </text>
      </g>
    </svg>
  );
};

export default CinemaSeat;
