import React from 'react';
import { useTimer } from 'react-timer-hook';

const Timer= () => {
    const expiryTimestamp = new Date()
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds()+ 1200) //20min
  const {
    seconds,
    minutes,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div className='col' style={{textAlign: 'right'}}>
      <h4>voting ends in: </h4>
      <div style={{fontSize: '50px'}}>
        <span style={{color: '#f0d9b5'}}>{minutes}</span><span style={{color: 'rgb(170, 130, 90)'}}>:</span><span style={{color: '#f0d9b5'}}>{seconds}</span>
      </div>
    </div>
  );
}
export default Timer