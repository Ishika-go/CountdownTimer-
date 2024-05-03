// import React, { useState, useEffect } from "react";
// import "./App.css";

// function App() {
//   const [targetDate, setTargetDate] = useState("");
//   const [targetTime, setTargetTime] = useState("");
//   const [days, setDays] = useState(0);
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const [running, setRunning] = useState(false);
//   const [currentTime, setCurrentTime] = useState(false);

//   const handleOnClick = () => {
//     setRunning((prev) => !prev);
//   };

//   const handleAddMilliseconds = (dateTime) => {
//     const updatedDateTimeString = dateTime.toISOString().slice(0, 16);

//     const updatedDate = updatedDateTimeString.slice(0, 10);
//     const updatedTime = updatedDateTimeString.slice(11);

//     setTargetDate(updatedDate);
//     setTargetTime(updatedTime);
//   };

//   const formatTime = () => {
//     if (days < 33) {
//       setDays(Math.floor(currentTime / (1000 * 60 * 60 * 24)));
//       setHours(Math.floor((currentTime / (1000 * 60 * 60 * 24)) % 24));
//       setMinutes(Math.floor((currentTime / 1000 / 60) % 60));
//       setSeconds(Math.floor((currentTime / 1000) % 60));
//       const dateTime = new Date(currentTime);
//       handleAddMilliseconds(dateTime);
//     } else {
//       setRunning(false);
//     }
//   };

//   useEffect(() => {
//     let interval;
//     if (running) {
//       interval = setInterval(() => {
//         setCurrentTime((prevTime) => prevTime + 1);
//         formatTime();
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [running]);

//   return (
//     <div>
//       <div className="inputClass">
//         <input
//           type="date"
//           id="targetDate"
//           value={targetDate}
//           onChange={(e) => setTargetDate(e.target.value)}
//         />
//         <input
//           type="time"
//           id="targetTime"
//           value={targetTime}
//           onChange={(e) => setTargetTime(e.target.value)}
//         />
//       </div>

//       <button onClick={handleOnClick}>
//         {running ? "cancelTimer" : "start"}
//       </button>

//       <div className="containTime">
//         <div className="days">{days < 10 ? "0" + days : days}</div>
//         <div className="hours">{hours < 10 ? "0" + hours : hours}</div>
//         <div className="minutes">{minutes < 10 ? "0" + minutes : minutes}</div>
//         <div className="seconds">{seconds < 10 ? "0" + seconds : seconds}</div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  // const [exceedMessage, setExceedMessange] = useState("");
  const [timerCompleted, setTimerCompleted] = useState(false);
  const handleOnClick = () => {
    setRunning((prev) => !prev);
  };

  const formatTime = (remainingTime) => {
    if (remainingTime === 0) {
      setTimerCompleted(true);
    } else {
      const totalSeconds = Math.floor(remainingTime / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const remainingDays = Math.floor(totalHours / 24);

      const updatedDays = remainingDays % 30;
      const updatedHours = totalHours % 24;
      const updatedMinutes = totalMinutes % 60;
      const updatedSeconds = totalSeconds % 60;

      setDays(updatedDays);
      setHours(updatedHours);
      setMinutes(updatedMinutes);
      setSeconds(updatedSeconds);
    }
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const targetDateTime = new Date(`${targetDate}T${targetTime}:00`).getTime();
    const remainingTime = targetDateTime - currentTime;

    if (remainingTime > 0) {
      formatTime(remainingTime);
    } else {
      setRunning(false);
    }
  }, [targetDate, targetTime, currentTime]);

  return (
    <div className="allContenet">
      <h1>Countdown Timer</h1>
      {/* <div className="inputClass">
        <input
          type="date"
          id="targetDate"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
        <input
          type="time"
          id="targetTime"
          value={targetTime}
          onChange={(e) => setTargetTime(e.target.value)}
        />
      </div> */}
      <div className="inputClass">
        <input
          type="datetime-local"
          id="targetDateTime"
          value={`${targetDate}T${targetTime}`}
          onChange={(e) => {
            const dateTime = e.target.value.split("T");
            setTargetDate(dateTime[0]);
            setTargetTime(dateTime[1]);
          }}
        />
      </div>

      <button onClick={handleOnClick}>
        {running ? "Cancel Timer" : "Start"}
      </button>

      {days > 99 ? (
        <p>Selected time is more than 99 days</p>
      ) : timerCompleted === true ? (
        <p> 🎉 The countdown is over. what is next on your adventure 🎉</p>
      ) : (
        <div className="containTime">
          <div className="days">
            <div>{days < 10 ? "0" + days : days}</div>
            <h3>days</h3>
          </div>
          <div className="hours">
            <div>{hours < 10 ? "0" + hours : hours}</div>
            <h3>hours</h3>
          </div>

          <div className="minutes">
            <div> {minutes < 10 ? "0" + minutes : minutes}</div>
            <h3>minutes</h3>
          </div>
          <div className="seconds">
            <div>{seconds < 10 ? "0" + seconds : seconds}</div>
            <h3>seconds</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
