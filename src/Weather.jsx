import axios from "axios";
import { useEffect, useState } from "react";
import Error from "./Error";
import Lock from "./Lock";

function Weather() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(false);

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=0498080e1a5197f270b0caf571365be5&units=metric`;

  async function getWeather() {
    if (!location) {
      setError(true);
      return;
    }
    try {
      const response = await axios(URL);
      setData(response.data);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  useEffect(() => {
    if (location) {
      getWeather();
    }
  }, [location]);

  return (
    <>
      <div className="Imagebg min-h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col lg:flex-row z-10 backdrop-blur-sm max-w-screen-xl w-full">
          {/* Left Section */}
          <div className="lg:w-[70%] w-full h-full flex p-6 justify-center items-center">
            <div>
              <Lock />
              <div className="mt-6 flex justify-center">
                <img
                  className="w-24 lg:w-32 drop-shadow-md"
                  src={
                    data.weather
                      ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                      : null
                  }
                  alt="weather-icon"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-[33%] w-full lg:h-[88vh] h-full bg-gray-700 bg-opacity-30 p-6 m-4 lg:m-8 rounded-lg">
            {/* Search Box */}
            <div className="flex flex-row justify-center items-center mb-6">
              <input
                className={`w-64 sm:w-72 bg-slate-300 p-2 text-white placeholder-white rounded-md outline-none ${
                  error ? "border-red-500 border-2" : ""
                }`}
                value={location}
                type="text"
                placeholder="Enter city..."
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                onClick={getWeather}
                className="bg-gray-300 px-4 py-2 rounded-full ml-4 text-white transition-transform transform active:scale-90"
              >
                Search
              </button>
            </div>

            {/* Error Message */}
            {error && <Error />}

            {/* Weather Information */}
            {data.name && !error && (
              <>
                <p className="text-3xl lg:text-5xl text-white mb-4">City: {data.name}</p>
                <div className="w-full h-1 bg-white rounded-full opacity-35 mb-4"></div>
                <p className="text-lg lg:text-xl text-white mb-2">
                  Weather: {data.weather ? data.weather[0].description : null}
                </p>
                <p className="text-lg lg:text-xl text-white mb-2">
                  Main: {data.weather ? data.weather[0].main : null}
                </p>
                <p className="text-lg lg:text-xl text-white mb-2">
                  Speed: {data.wind ? data.wind.speed : null} m/s
                </p>
                <p className="text-lg lg:text-xl text-white mb-2">
                  Humidity: {data.main ? data.main.humidity : null}%
                </p>
                <p className="text-lg lg:text-xl text-white mb-2">
                  Temperature: {data.main ? Math.floor(data.main.temp) : null}°C
                </p>
                <p className="text-lg lg:text-xl text-white mb-2">
                  Pressure: {data.main ? data.main.pressure : null} hPa
                </p>
                <p className="text-lg lg:text-xl text-white mb-2">
                  Wind Direction: {data.wind ? data.wind.deg : null}°
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;