
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
      // const totalSeconds = Math.floor(remainingTime / 1000);
      // const totalMinutes = Math.floor(totalSeconds / 60);
      // const totalHours = Math.floor(totalMinutes / 60);
      // const remainingDays = Math.floor(totalHours / 24);

      // const updatedDays = remainingDays % 100;
      // const updatedHours = totalHours % 24;
      // const updatedMinutes = totalMinutes % 60;
      // const updatedSeconds = totalSeconds % 60;

      // setDays(updatedDays);
      // setHours(updatedHours);
      // setMinutes(updatedMinutes);
      // setSeconds(updatedSeconds);

      setDays(Math.floor(remainingTime / (1000*60*60*24)));
      setHours(Math.floor(remainingTime / (1000*60*60)%24));
      setMinutes(Math.floor(remainingTime / 1000/60)%60);
      setSeconds(Math.floor((remainingTime / 1000%60)));

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
    console.log(targetDateTime);
    const remainingTime = targetDateTime - currentTime;
    console.log(remainingTime);

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
        <h4>Selected time is more than 99 days</h4>
      ) : (timerCompleted === true ? (
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
      ))}
    </div>
  );
}

export default App;
