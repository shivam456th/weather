import  { useState, useEffect } from "react";
import moment from "moment-timezone";

const WorldTime = () => {
  const [time, setTime] = useState({
    local: "",
    newYork: "",
    london: "",
    tokyo: "",
  });

  useEffect(() => {
    const updateTimes = () => {
      setTime({
        local: moment().format("MMMM Do YYYY, h:mm:ss A"), // Local time
        newYork: moment()
          .tz("America/New_York")
          .format("MMMM Do YYYY, h:mm:ss A"), // New York
        london: moment().tz("Europe/London").format("MMMM Do YYYY, h:mm:ss A"), // London
        india: moment().tz("Asia/India").format("MMMM Do YYYY, h:mm:ss A"), // London
        tokyo: moment().tz("Asia/Tokyo").format("MMMM Do YYYY, h:mm:ss A"), // Tokyo
      });
    };

    updateTimes();
    const intervalId = setInterval(updateTimes, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return (
    <div className="">
      <h1 className="text-white text-6xl font-semibold">World Time</h1> &nbsp;
      <p className="text-white text-xl">
        <strong>Local Time:</strong> {time.local}
      </p>
      {/* <p className="text-white text-xl">
        <strong>Tokyo:</strong> {time.tokyo}
      </p>
      <p className="text-white text-xl">
        <strong>london:</strong> {time.london}
      </p> */}
      <p className="text-white text-xl">
        <strong>India:</strong> {time.india}
      </p>
      {/* <p className="text-white text-xl">
        <strong>london:</strong> {time.london}
      </p>
      <p className="text-white text-xl">
        <strong>london:</strong> {time.london}
      </p>
      <p className="text-white text-xl">
        <strong>london:</strong> {time.london}
      </p>
      <p className="text-white text-xl">
        <strong>london:</strong> {time.london}
      </p> */}
      &nbsp;
    </div>
  );
};

export default WorldTime;
