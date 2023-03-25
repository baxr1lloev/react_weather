import React, { useEffect, useRef, useState, CSSProperties } from "react";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import GridLoader from "react-spinners/GridLoader";

const api = {
  key: "cd3ac7b25e0f6dbd4acdef658e8d082d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const inputElement = useRef();

  const focusInput = () => {
    inputElement.current.focus();
  };

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [value, setValue] = useState("");
  const [img, setImg] = useState("./assets/sea.jpg");

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const app_style_white = {
    background: "white",
    width: "100%",
    height: "100vh",
  };

  const url = `${api.base}weather?q=${location}&units=metric&APPID=${api.key}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  const search = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation(value);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  useEffect(() => {
    loading === false ? setImg("/src/assets/sea.jpg") : setImg("");
  }, [loading]);


  return (
    <div
      className="app w-full"
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {loading ? (
        <div style={style}>
          <GridLoader color="#36d7b7" size={50} margin={10} loading />
        </div>
      ) : (
        <div>
          <center>
            <div className="search">
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder="Enter Location"
                type="text"
                ref={inputElement}
                onKeyUp={(e) => setValue(e.target.value)}
              />
              <BiSearch
                className="icon"
                value={location}
                onClick={search}
                // onKeyPress={searchLocation}
                size={"25px"}
                color="white"
              />
            </div>
          </center>
          <div className="container">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>

            {data.name !== undefined && (
              <div className="bottom">
                <div className="feels">
                  {data.main ? (
                    <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                  ) : null}
                  <p className="feels_like">Feels Like</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p className="feels_like">Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                  ) : null}
                  <p className="feels_like">Wind Speed</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
