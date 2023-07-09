import React, { useEffect, useState } from 'react';

export default function Timer({ timesUp }) {
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  function buzzer(){
    if (timer == '0') {
      timesUp()
    }
  }
  buzzer()

  return (
    <div>
      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
