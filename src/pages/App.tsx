import React, { useEffect, useState } from "react";
import RightSide from "components/rightSide";
import MaxAndMinTemp from "components/maxAndMinTemp";
import Button from "components/button";
import "assets/css/home.css";

interface CoordsProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

interface CityData {
  name: string | undefined;
  main: {
    temp: number | undefined;
    temp_max: number | undefined;
    temp_min: number | undefined;
  };
  sys: {
    country: string | undefined;
  };
  weather: any;
}

const App: React.FC = () => {
  const [coords, setCoords] = useState<CoordsProps>();
  const [data, setData] = useState<CityData>();
  const [load, setLoad] = useState<boolean>(true);
  const [ask, setAsk] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<string>();

  function getLocation(): void {
    navigator.geolocation.getCurrentPosition(
      data => {
        setCoords({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        });
        setLoad(false);
        return;
      },
      error => {
        setAsk(true);
      }
    );
  }

  function getWheater() {
    fetch(
      `http://api.openweathermap.org/data/2.5/find?lat=${
        coords!.latitude
      }&lon=${coords!.longitude}&units=metric&cnt=15&APPID=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then(async (result: any) => {
        const cityData = await result.json().then((data: any) => data.list[0]);
        setData(cityData);
        currentTimeNow();
      })
      .catch(error => console.error(error));
  }

  function currentTimeNow() {
    var currentdate = new Date();
    setLastUpdate(
      currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds()
    );
  }

  function handlePermission() {
    navigator.permissions.query({ name: "geolocation" }).then(function(result) {
      result.onchange = function() {
        if (result.state == "granted") {
          setAsk(false);
          getLocation();
        } else if (result.state == "denied") {
          setAsk(true);
          setData(null);
        }
      };
    });
  }

  useEffect(() => {
    handlePermission();
    getLocation();
  }, [handlePermission]);

  useEffect(() => {
    if (load === false) {
      getWheater();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return (
    <div className="bg-animated">
      {data && (
        <div className="container-fluid">
          <RightSide city={data.name} country={data.sys.country} />
          <div className="center-xs center-sm center-md center-lg">
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt="Weather Icon"
            />

            <MaxAndMinTemp
              temp={data.main.temp}
              max={data.main.temp_max}
              min={data.main.temp_min}
            />

            <section>
              <h3>Última atualização:</h3>
              <p>{lastUpdate}</p>
            </section>

            <Button onClick={() => getWheater()} disabled={load} />
          </div>
        </div>
      )}

      {ask && (
        <div className="center-xs center-sm center-md center-lg">
          <img
            src={`https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather03-512.png`}
            alt="Weather Icon"
            width="200"
          />
          <h1>Opss!</h1>
          <p>Precisamos de sua localização para iniciar</p>
          <p>
            Acesse as configurações do seu navegador e autorize este site a
            visualizar sua localização
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
