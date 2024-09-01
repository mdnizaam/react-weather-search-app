import React, { useState } from "react";
const apiKey = "8c7ddbb879ee3b0c6270df181b1918f2";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;
const Waether = () => {
  const [seachQuery, setSeachQuery] = useState("");
  const [weatherData, setWeatherData] = useState({
    data: [],
    loading: false,
    error: false,
  });
  console.log("weatherData", weatherData);
  // console.log("seachQuery", seachQuery);
  const fetchData = async () => {
    setWeatherData({
      data: [],
      loading: true,
      error: false,
    });
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${seachQuery}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) {
      setWeatherData({
        data: [],
        loading: false,
        error: true,
      });
    } else {
      const data = await res.json();
      setWeatherData({
        data: {
          location: data?.name,
          currentTime: data?.dt,
          temp: data?.main?.temp,
          weatherCondition: data?.weather[0]?.main,
          sunrise: data?.sys?.sunrise,
          wind: data?.wind?.speed,
          humidity: data?.main?.humidity,
        },
        loading: false,
        error: false,
      });
    }
  };
  const currentTime = new Date(weatherData?.data?.currentTime * 1000);
  const formatedCurrentTime = currentTime?.toLocaleString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const sunrise = new Date(weatherData?.data?.sunrise * 1000);
  const formatedSunrise = sunrise?.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const handleSearch = () => {
    fetchData();
    setSeachQuery("");
  };
  const getImageCondition = (img) => {
    if (img === "Clear") {
      return "../assets/sun.png";
    }
    if (img == "Clouds") {
      return "../assets/cloud.png";
    }
    if (img == "Drizzle") {
      return "../assets/heavy-rain.png";
    }
    if (img == "Haze") {
      return "../assets/fog.png";
    }
    if (img == "Rain") {
      return "../assets/heavy-rain.png";
    }
  };
  return (
    <div className="w-96 bg-white p-10 rounded-md shadow-md">
      <div className="flex border p-2 rounded-md">
        <input
          placeholder="search city name..."
          className="outline-none flex-1 "
          value={seachQuery}
          onChange={(e) => setSeachQuery(e.target.value)}
        />
        <img
          src="../assets/search.png"
          width={8}
          height={8}
          className="w-6 object-contain cursor-pointer"
          onClick={handleSearch}
        />
      </div>
      {weatherData?.loading ? (
        <div>Loading...</div>
      ) : weatherData?.error ? (
        <div>city not found</div>
      ) : (
        Object.keys(weatherData?.data)?.length > 0 && (
          <div>
            <div className="text-gray-500 uppercase mt-4">
              <h1>{weatherData?.data?.location}</h1>
              <h1>{formatedCurrentTime}</h1>
            </div>
            <div className="uppercase text-gray-500 flex justify-center mt-4">
              <div className="text-center">
                <img
                  width={100}
                  height={100}
                  className="w-24 mb-4"
                  src={getImageCondition(weatherData?.data?.weatherCondition)}
                />
                <h1>{weatherData?.data?.temp?.toFixed(0)}°C</h1>
                <h1>{weatherData?.data?.weatherCondition}</h1>
              </div>
            </div>
            <div className="flex justify-between uppercase text-gray-500 mt-4">
              <div className="flex flex-col justify-center items-center w-20">
                <img
                  width={8}
                  height={8}
                  className="w-6"
                  src="../assets/sunrise.png"
                />
                <h1>Sunrise</h1>
                <h1>{formatedSunrise}</h1>
              </div>
              <div className="flex flex-col justify-center items-center w-20">
                <img
                  width={8}
                  height={8}
                  className="w-6"
                  src="../assets/windy.png"
                />
                <h1>Wind</h1>
                <h1>{weatherData?.data?.wind} KM/h</h1>
              </div>
              <div className="flex flex-col justify-center items-center w-20">
                <img
                  width={8}
                  height={8}
                  className="w-6"
                  src="../assets/humidity.png"
                />
                <h1>Humidity</h1>
                <h1>{weatherData?.data?.humidity}</h1>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Waether;
