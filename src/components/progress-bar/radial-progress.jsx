// src/components/RadialProgressBar.js
import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import RadialSeparators from './radial-seperater';
import 'react-circular-progressbar/dist/styles.css';

const RadialProgressBar = ({ percentage }) => {
  return (
    <div style={{ position: 'relative', width: 120, height: 120 }}>
      <CircularProgressbarWithChildren
        value={percentage}
        text={percentage}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: `rgba(0, 0, 0, ${percentage / 100})`,
          trailColor: '#d3d3d3',
        })}
      >
        <RadialSeparators
          count={12}
          style={{
            background: "#e7e7e7",
            width: "2px",
            // This needs to be equal to props.strokeWidth
            height: `${10}%`
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%',
            backgroundColor: '#fff',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '80%',
              height: '80%',
              backgroundColor: '#000',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              fontSize: '16px',
            }}
          >
            {percentage}
          </div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default RadialProgressBar;
