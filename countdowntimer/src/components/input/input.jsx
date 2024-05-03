import React, { useState } from "react";

function Countdown() {
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("");
  const [countdown, setCountdown] = useState("");

  function updateCountdown() {
    const targetDateObj = new Date(targetDate + " " + targetTime);
    const now = new Date();
    const diffMs = (targetDateObj - now);
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    setCountdown(diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes");
  }

  return (
    <div>
      <label htmlFor="targetDate">Target Date:</label>
      <input type="date" id="targetDate" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
      <label htmlFor="targetTime">Target Time:</label>
      <input type="time" id="targetTime" value={targetTime} onChange={(e) => setTargetTime(e.target.value)} />
      <div>{countdown}</div>
    </div>
  );
}

export default Countdown;